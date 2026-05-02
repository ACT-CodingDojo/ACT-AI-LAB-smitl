'use client'

import React from 'react'
import { Card, CardBody, CardHeader, CardFooter, Button, Alert } from '@/components'
import { Wine } from '@/lib/wines'

interface WineRecommendation {
  wine_id: number
  wine_name: string
  confidence_score: number
  confidence_level: 'high' | 'medium' | 'low'
  reasoning: string
}

interface ResultsDisplayProps {
  recommendations: WineRecommendation[]
  wines: Wine[]
  onNewSearch: () => void
}

const confidenceLabels = {
  high: '✓ Recommended with confidence',
  medium: '≈ Good match',
  low: '⚠️ Low confidence - Indicative only',
}

const confidenceColors = {
  high: 'text-green-700',
  medium: 'text-blue-700',
  low: 'text-yellow-700',
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  recommendations,
  wines,
  onNewSearch,
}) => {
  const primaryRec = recommendations[0]
  const alternativeRecs = recommendations.slice(1, 3)
  const showGlobalWarning =
    primaryRec && primaryRec.confidence_score < 70

  const getWineDetails = (wineId: number): Wine | undefined => {
    return wines.find((w) => w.id === wineId)
  }

  return (
    <div className="space-y-4">
      {showGlobalWarning && (
        <Alert
          type="warning"
          title="Insufficient Information"
          message="Wine suggestion is based on limited information. Consider refining your input (better photo, more context) for a more reliable recommendation."
        />
      )}

      {/* Primary Recommendation */}
      {primaryRec && (
        <Card className="border-2 border-purple-500">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {primaryRec.wine_name}
                </h2>
                <p className="text-sm text-gray-600 mt-1">Our Top Recommendation</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-purple-600">
                  {primaryRec.confidence_score}%
                </div>
                <p
                  className={`text-sm font-semibold mt-1 ${
                    confidenceColors[primaryRec.confidence_level]
                  }`}
                >
                  {confidenceLabels[primaryRec.confidence_level]}
                </p>
              </div>
            </div>
          </CardHeader>

          <CardBody>
            {(() => {
              const wine = getWineDetails(primaryRec.wine_id)
              if (!wine) return null

              return (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      Why This Wine?
                    </h3>
                    <p className="text-gray-700">{primaryRec.reasoning}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Region</p>
                      <p className="font-semibold text-gray-800">
                        {wine.region}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Type</p>
                      <p className="font-semibold text-gray-800">{wine.type}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Body</p>
                      <p className="font-semibold text-gray-800 capitalize">
                        {wine.body}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Acidity</p>
                      <p className="font-semibold text-gray-800 capitalize">
                        {wine.acidity}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-600 text-sm mb-1">Tasting Notes</p>
                    <p className="text-gray-700 text-sm">
                      {wine.tasting_notes}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-600 text-sm mb-1">Pairs Well With</p>
                    <div className="flex flex-wrap gap-2">
                      {wine.typical_pairings.map((pairing) => (
                        <span
                          key={pairing}
                          className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                        >
                          {pairing}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })()}
          </CardBody>
        </Card>
      )}

      {/* Alternative Recommendations */}
      {alternativeRecs.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-800">
            Alternative Suggestions
          </h3>

          {alternativeRecs.map((rec, index) => {
            const wine = getWineDetails(rec.wine_id)
            if (!wine) return null

            return (
              <Card key={rec.wine_id}>
                <CardBody>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">
                        {rec.wine_name}
                      </h4>
                      <p className="text-sm text-gray-600">{wine.region}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-600">
                        {rec.confidence_score}%
                      </div>
                      <p
                        className={`text-xs font-semibold ${
                          confidenceColors[rec.confidence_level]
                        }`}
                      >
                        {confidenceLabels[rec.confidence_level]}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-700 mb-3">{rec.reasoning}</p>

                  <p className="text-xs text-gray-600">
                    <span className="font-semibold">{wine.tasting_notes}</span>
                  </p>
                </CardBody>
              </Card>
            )
          })}
        </div>
      )}

      <Button onClick={onNewSearch} fullWidth>
        Try Another Dish
      </Button>
    </div>
  )
}
