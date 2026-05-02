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

Format your response as JSON with keys: dish_name, ingredients (array), preparation_style, cuisine_type

If the image doesn't contain food or is unclear, respond with:
{"error": "Unable to identify food in the image"}
`

    // Convert base64 to Uint8Array
    const imageBuffer = Buffer.from(body.imageData.split(',')[1], 'base64')

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

    // Parse JSON response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      return NextResponse.json(
        { error: 'Failed to parse recognition response' },
        { status: 500 }
      )
    }

    const result: RecognitionResponse = JSON.parse(jsonMatch[0])

    if (result.error) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      )
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Recognition error:', error)
    return NextResponse.json(
      { error: 'Failed to recognize food in image' },
      { status: 500 }
    )
  }
}
