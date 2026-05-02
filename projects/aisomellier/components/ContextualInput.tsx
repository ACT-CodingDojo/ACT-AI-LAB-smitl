'use client'

import React, { useRef, useState } from 'react'
import { Card, CardBody, Input, Dropdown, Button, Alert } from '@/components'

interface ContextualInputProps {
  dishName: string
  onContextUpdate: (context: ContextData) => void
  onError: (error: string) => void
}

export interface ContextData {
  textRefinement: string
  voiceTranscription: string
  occasion: string
  season: string
}

const occasionOptions = [
  { value: 'informal dinner', label: 'Informal Dinner' },
  { value: 'formal dinner', label: 'Formal Dinner' },
  { value: 'date night', label: 'Date Night' },
  { value: 'celebration', label: 'Celebration' },
  { value: 'casual lunch', label: 'Casual Lunch' },
  { value: 'aperitivo', label: 'Aperitivo' },
]

const seasonOptions = [
  { value: 'spring', label: '🌱 Spring' },
  { value: 'summer', label: '☀️ Summer' },
  { value: 'autumn', label: '🍂 Autumn' },
  { value: 'winter', label: '❄️ Winter' },
]

export const ContextualInput: React.FC<ContextualInputProps> = ({
  dishName,
  onContextUpdate,
  onError,
}) => {
  const [context, setContext] = useState<ContextData>({
    textRefinement: '',
    voiceTranscription: '',
    occasion: 'informal dinner',
    season: 'spring',
  })

  const [isRecording, setIsRecording] = useState(false)
  const [voiceSupported, setVoiceSupported] = useState(
    typeof window !== 'undefined' &&
      ('webkitSpeechRecognition' in window ||
        'SpeechRecognition' in window)
  )
  const recognitionRef = useRef<any>(null)

  const handleTextChange = (value: string) => {
    const newContext = { ...context, textRefinement: value }
    setContext(newContext)
    onContextUpdate(newContext)
  }

  const handleOccasionChange = (value: string) => {
    const newContext = { ...context, occasion: value }
    setContext(newContext)
    onContextUpdate(newContext)
  }

  const handleSeasonChange = (value: string) => {
    const newContext = { ...context, season: value }
    setContext(newContext)
    onContextUpdate(newContext)
  }

  const startVoiceInput = () => {
    if (!voiceSupported) {
      onError('Speech recognition not supported in your browser')
      return
    }

    const SpeechRecognition =
      (window as any).webkitSpeechRecognition ||
      (window as any).SpeechRecognition

    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = true
      recognitionRef.current.language = 'en-US'
    }

    recognitionRef.current.onstart = () => {
      setIsRecording(true)
    }

    recognitionRef.current.onresult = (event: any) => {
      let interimTranscript = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          const newContext = {
            ...context,
            voiceTranscription: context.voiceTranscription
              ? context.voiceTranscription + ' ' + transcript
              : transcript,
          }
          setContext(newContext)
          onContextUpdate(newContext)
        } else {
          interimTranscript += transcript
        }
      }
    }

    recognitionRef.current.onerror = (event: any) => {
      onError(`Speech recognition error: ${event.error}`)
      setIsRecording(false)
    }

    recognitionRef.current.onend = () => {
      setIsRecording(false)
    }

    recognitionRef.current.start()
  }

  const stopVoiceInput = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsRecording(false)
    }
  }

  const clearVoiceTranscription = () => {
    const newContext = { ...context, voiceTranscription: '' }
    setContext(newContext)
    onContextUpdate(newContext)
  }

  return (
    <Card>
      <CardBody>
        <h3 className="text-lg font-semibold mb-4">
          Tell us more about your meal
        </h3>

        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">
              Dish Identified: <span className="text-purple-600">{dishName}</span>
            </p>
          </div>

          <Input
            label="Add details (optional)"
            placeholder="e.g., 'seared rare, black pepper sauce'"
            value={context.textRefinement}
            onChange={(e) => handleTextChange(e.target.value)}
            helperText="Describe cooking style, sauce, or special preparation"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Voice Input {voiceSupported ? '(Optional)' : '(Not supported)'}
            </label>
            {context.voiceTranscription && (
              <div className="mb-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-semibold">Transcribed:</span>{' '}
                  {context.voiceTranscription}
                </p>
                <button
                  onClick={clearVoiceTranscription}
                  className="text-xs text-blue-600 hover:text-blue-800"
                >
                  Clear
                </button>
              </div>
            )}
            {voiceSupported && (
              <button
                onClick={isRecording ? stopVoiceInput : startVoiceInput}
                className={`w-full py-2.5 px-4 rounded-lg font-semibold transition-colors ${
                  isRecording
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isRecording ? '🎤 Stop Recording' : '🎤 Start Recording'}
              </button>
            )}
          </div>

          <Dropdown
            label="Occasion"
            options={occasionOptions}
            value={context.occasion}
            onChange={(e) => handleOccasionChange(e.target.value)}
          />

          <Dropdown
            label="Season"
            options={seasonOptions}
            value={context.season}
            onChange={(e) => handleSeasonChange(e.target.value)}
          />
        </div>
      </CardBody>
    </Card>
  )
}
