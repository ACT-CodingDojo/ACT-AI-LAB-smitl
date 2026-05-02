'use client'

import { useState, useEffect } from 'react'
import { PhotoCapture } from '@/components/PhotoCapture'
import { ContextualInput, ContextData } from '@/components/ContextualInput'
import { ResultsDisplay } from '@/components/ResultsDisplay'
import { Alert, Loading, Error } from '@/components'
import { Wine, loadWines } from '@/lib/wines'

type PageStep = 'upload' | 'context' | 'loading' | 'results' | 'error'

interface WineRecommendation {
  wine_id: number
  wine_name: string
  confidence_score: number
  confidence_level: 'high' | 'medium' | 'low'
  reasoning: string
}

interface DishProfile {
  dish_name: string
  ingredients: string[]
  preparation_style: string
  cuisine_type: string
}

export default function Home() {
  const [step, setStep] = useState<PageStep>('upload')
  const [wines, setWines] = useState<Wine[]>([])
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [dishProfile, setDishProfile] = useState<DishProfile | null>(null)
  const [context, setContext] = useState<ContextData>({
    textRefinement: '',
    voiceTranscription: '',
    occasion: 'informal dinner',
    season: 'spring',
  })
  const [recommendations, setRecommendations] = useState<WineRecommendation[]>(
    []
  )
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadWines().then(setWines)
  }, [])

  const handlePhotoCapture = async (file: File, preview: string) => {
    setPhotoFile(file)
    setPhotoPreview(preview)
    setError(null)
    setStep('loading')

    // Send to recognition API
    try {
      const reader = new FileReader()
      reader.onload = async (e) => {
        const imageData = e.target?.result as string

        const response = await fetch('/api/recognize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            imageData,
            mimeType: file.type,
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          const errorMsg =
            typeof errorData.error === 'string'
              ? errorData.error
              : 'Failed to recognize food in photo'
          setError(errorMsg)
          setStep('error')
          return
        }

        const result = await response.json()
        setDishProfile(result)
        setStep('context')
      }
      reader.readAsDataURL(file)
    } catch (err) {
      let errorMsg = 'Failed to process photo'
      if (err instanceof Error) {
        errorMsg = (err as Error).message
      }
      setError(errorMsg)
      setStep('error')
    }
  }

  const handleGetRecommendations = async () => {
    if (!dishProfile) {
      setError('Dish profile missing')
      return
    }

    setError(null)
    setStep('loading')

    try {
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dishProfile,
          textRefinement: context.textRefinement,
          voiceTranscription: context.voiceTranscription,
          occasion: context.occasion,
          season: context.season,
          availableWines: wines,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        const errorMsg =
          typeof errorData.error === 'string'
            ? errorData.error
            : 'Failed to generate wine recommendations'
        setError(errorMsg)
        setStep('error')
        return
      }

      const result = await response.json()
      setRecommendations(result.recommendations)
      setStep('results')
    } catch (err) {
      let errorMsg = 'Failed to get recommendations'
      if (err instanceof Error) {
        errorMsg = (err as Error).message
      }
      setError(errorMsg)
      setStep('error')
    }
  }

  const handleNewSearch = () => {
    setPhotoFile(null)
    setPhotoPreview(null)
    setDishProfile(null)
    setContext({
      textRefinement: '',
      voiceTranscription: '',
      occasion: 'informal dinner',
      season: 'spring',
    })
    setRecommendations([])
    setError(null)
    setStep('upload')
  }

  const handleError = (msg: string) => {
    setError(msg)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-2xl mx-auto px-4 py-6 sm:py-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            🍷 AiSomellier
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            AI-Powered Italian Wine Recommendations
          </p>
        </header>

        {error && step === 'error' && (
          <Error
            message={error}
            onRetry={() => {
              setError(null)
              setStep('upload')
            }}
          />
        )}

        {step === 'upload' && (
          <PhotoCapture
            onPhotoCapture={handlePhotoCapture}
            onError={handleError}
          />
        )}

        {step === 'context' && dishProfile && (
          <div className="space-y-4">
            <ContextualInput
              dishName={dishProfile.dish_name}
              onContextUpdate={setContext}
              onError={handleError}
            />

            <div className="flex gap-3">
              <button
                onClick={handleNewSearch}
                className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                ← Back
              </button>
              <button
                onClick={handleGetRecommendations}
                className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Get Recommendations →
              </button>
            </div>
          </div>
        )}

        {step === 'loading' && (
          <Loading message="Analyzing your meal and finding the perfect wine..." />
        )}

        {step === 'results' && recommendations.length > 0 && (
          <ResultsDisplay
            recommendations={recommendations}
            wines={wines}
            onNewSearch={handleNewSearch}
          />
        )}
      </div>
    </main>
  )
}

