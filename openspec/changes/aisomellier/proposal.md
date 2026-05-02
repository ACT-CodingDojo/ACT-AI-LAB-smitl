## Why

Wine selection is intimidating for non-experts. AiSomellier democratizes this by leveraging computer vision and LLM intelligence to suggest Italian wines automatically based on the meal being consumed. The app is free, minimal, and mobile-first—designed for casual sharing among friends who want smart wine pairing without enological expertise.

## What Changes

- **New web application** delivering photo-based wine recommendations via a simple, mobile-responsive interface
- **Integration with Google Gemini API** for photo recognition and intelligent wine-pairing reasoning
- **Confidence scoring system** that rates recommendation certainty (0-100%) and warns users when suggestions are speculative
- **Support for contextual input** (photo + optional text/voice) to enrich the recommendation engine
- **Curated Italian wine database** (~20 signature Italian wines) as the source of truth for recommendations
- **Minimal backend** (Next.js API routes) to securely manage Gemini API keys and handle recommendation logic

## Capabilities

### New Capabilities

- `photo-recognition`: Analyzes food photos via Gemini Vision API to identify dishes, ingredients, and preparation styles
- `wine-recommendation`: Matches dish profiles and context (occasion, season) to Italian wines with LLM-driven reasoning
- `confidence-scoring`: Generates 0-100% confidence percentages for each recommendation based on input quality and certainty
- `contextual-input`: Accepts photo (required), text notes, voice input (Web Speech API), occasion, and season parameters to refine recommendations
- `result-presentation`: Displays 3 ranked wine suggestions (primary + 2 alternatives) with reasoning, confidence scores, and low-confidence warnings

### Modified Capabilities

<!-- None: this is a new product -->

## Impact

- **Frontend**: New Next.js + TypeScript application, responsive design for mobile browsers
- **Backend**: Next.js API routes (`/api/recommend`, `/api/recognize`, etc.) for Gemini orchestration and confidence calculation
- **External Dependencies**: Google Gemini API (free tier sufficient for MVP), Web Speech API (browser-native)
- **Deployment**: Vercel (zero-config, production-ready within hours)
- **Data**: Static JSON file for Italian wine catalog (no database required)

