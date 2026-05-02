import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'

interface Wine {
  id: number
  name: string
  region: string
  type: string
  description: string
  tasting_notes: string
  typical_pairings: string[]
}

interface RecommendationRequest {
  dishProfile: {
    dish_name: string
    ingredients: string[]
    preparation_style: string
    cuisine_type: string
  }
  textRefinement: string
  voiceTranscription: string
  occasion: string
  season: string
  availableWines: Wine[]
}

interface WineRecommendation {
  wine_id: number
  wine_name: string
  confidence_score: number
  confidence_level: 'high' | 'medium' | 'low'
  reasoning: string
}

interface RecommendationResponse {
  recommendations: WineRecommendation[]
  error?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: RecommendationRequest = await request.json()

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      )
    }

    const client = new GoogleGenerativeAI(apiKey)
    const model = client.getGenerativeModel({ model: 'gemini-2.0-flash' })

    // Build the context string
    const contextParts = [
      `Dish: ${body.dishProfile.dish_name}`,
      `Ingredients: ${body.dishProfile.ingredients.join(', ')}`,
      `Preparation: ${body.dishProfile.preparation_style}`,
      `Cuisine: ${body.dishProfile.cuisine_type}`,
      body.textRefinement ? `User notes: ${body.textRefinement}` : '',
      body.voiceTranscription ? `Voice input: ${body.voiceTranscription}` : '',
      `Occasion: ${body.occasion}`,
      `Season: ${body.season}`,
    ]
      .filter(Boolean)
      .join('\n')

    const wineListJson = body.availableWines
      .map(
        (w) =>
          `- ${w.name} (${w.region}, ${w.type}): ${w.description}. Pairing: ${w.typical_pairings.join(', ')}`
      )
      .join('\n')

    const prompt = `You are an expert Italian wine sommelier. Based on the following dish and context, recommend exactly 3 Italian wines from the provided list.

DISH & CONTEXT:
${contextParts}

AVAILABLE WINES:
${wineListJson}

For each wine, provide:
1. Wine name (exact match from list)
2. Confidence score (0-100, where 100 is perfect match)
3. Reasoning (2-3 sentences explaining why this wine pairs well)

Consider:
- Flavor profiles matching the dish
- Seasonal appropriateness
- Occasion suitability
- Classic Italian pairings
- Dish weight matching wine body

Return a JSON array with exactly 3 recommendations:
[
  {
    "wine_name": "Wine Name",
    "confidence_score": 85,
    "reasoning": "Brief explanation of pairing logic"
  },
  ...
]

IMPORTANT: Return ONLY valid JSON, no other text.`

    const response = await model.generateContent(prompt)
    const text = response.response.text()

    // Parse JSON response
    const jsonMatch = text.match(/\[[\s\S]*\]/)
    if (!jsonMatch) {
      console.error('Failed to extract JSON from response:', text)
      return NextResponse.json(
        { error: 'Failed to parse recommendation response' },
        { status: 500 }
      )
    }

    const rawRecommendations = JSON.parse(jsonMatch[0])

    // Map recommendations to include wine IDs and confidence levels
    const recommendationsWithNulls: (WineRecommendation | null)[] = rawRecommendations.map(
      (rec: any) => {
        const wine = body.availableWines.find(
          (w) => w.name.toLowerCase() === rec.wine_name.toLowerCase()
        )
        if (!wine) return null

        const confidence = Math.min(Math.max(rec.confidence_score, 0), 100)
        return {
          wine_id: wine.id,
          wine_name: wine.name,
          confidence_score: confidence,
          confidence_level: (
            confidence >= 80
              ? 'high'
              : confidence >= 70
                ? 'medium'
                : 'low'
          ) as 'high' | 'medium' | 'low',
          reasoning: rec.reasoning || 'Pairs well with your dish',
        }
      }
    )

    const recommendations: WineRecommendation[] = recommendationsWithNulls
      .filter((r): r is WineRecommendation => r !== null)
      .sort((a, b) => b.confidence_score - a.confidence_score)
      .slice(0, 3)

    if (recommendations.length === 0) {
      return NextResponse.json(
        {
          error:
            'Could not find suitable wine matches. Please try again with different input.',
        },
        { status: 400 }
      )
    }

    return NextResponse.json({ recommendations })
  } catch (error) {
    console.error('Recommendation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate wine recommendations' },
      { status: 500 }
    )
  }
}
