import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'

interface RecognitionRequest {
  imageData: string // base64 encoded image
  mimeType: string
}

interface RecognitionResponse {
  dish_name: string
  ingredients: string[]
  preparation_style: string
  cuisine_type: string
  error?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: RecognitionRequest = await request.json()

    if (!body.imageData || !body.mimeType) {
      return NextResponse.json(
        { error: 'Missing imageData or mimeType' },
        { status: 400 }
      )
    }

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      )
    }

    const client = new GoogleGenerativeAI(apiKey)
    const model = client.getGenerativeModel({ model: 'gemini-2.0-flash' })

    const prompt = `Analyze this food image and provide:
1. The name of the dish
2. Main ingredients visible
3. Preparation style (e.g., grilled, boiled, fried, raw)
4. Cuisine type (e.g., Italian, Asian, Mediterranean)

Format your response as JSON only with keys: dish_name, ingredients (array), preparation_style, cuisine_type

If the image doesn't contain food or is unclear, respond with exactly:
{"error": "Unable to identify food in the image"}
`

    const imageDataParts = body.imageData.split(',')
    const base64Data = imageDataParts.length === 2 ? imageDataParts[1] : body.imageData
    if (!base64Data) {
      return NextResponse.json(
        { error: 'Invalid imageData format' },
        { status: 400 }
      )
    }

    const imageBuffer = Buffer.from(base64Data, 'base64')
    if (imageBuffer.length === 0) {
      return NextResponse.json(
        { error: 'Invalid image data' },
        { status: 400 }
      )
    }

    const response = await model.generateContent([
      {
        inlineData: {
          data: imageBuffer.toString('base64'),
          mimeType: body.mimeType as
            | 'image/jpeg'
            | 'image/png'
            | 'image/webp'
            | 'image/heic',
        },
      },
      { text: prompt },
    ])

    const text = response.response.text()
    if (!text || !text.trim()) {
      console.error('Recognition empty response:', text)
      return NextResponse.json(
        { error: 'Empty recognition response from model' },
        { status: 500 }
      )
    }

    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      console.error('Recognition parse failed, raw response:', text)
      return NextResponse.json(
        { error: 'Failed to parse recognition response', details: 'Raw model output logged on server' },
        { status: 500 }
      )
    }

    let result: RecognitionResponse
    try {
      result = JSON.parse(jsonMatch[0])
    } catch (parseError) {
      console.error('Recognition JSON parse error:', parseError, 'raw response:', text)
      return NextResponse.json(
        { error: 'Failed to parse recognition response', details: 'Raw model output logged on server' },
        { status: 500 }
      )
    }

    if (result.error) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      )
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Recognition error:', error)
    const errorMessage = error instanceof Error ? error.message : String(error)
    return NextResponse.json(
      { error: 'Failed to recognize food in image', details: errorMessage },
      { status: 500 }
    )
  }
}
