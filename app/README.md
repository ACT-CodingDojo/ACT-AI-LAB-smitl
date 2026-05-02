# AiSomellier MVP

Minimal web app for Italian wine recommendations based on multimodal input.

## Features

- Required dish image input
- Optional text context
- Optional voice file context
- Gemini-driven top 3 results
- Confidence as integer percentage (0-100)
- Risk label for any result below 70%
- Global advisory when highlighted result is below 70%
- Backend-only secret handling for Gemini API key
- No user preference persistence

## Quick start

1. Install dependencies:
   npm install
2. Copy environment file:
   copy .env.example .env
3. For local testing without external API, keep:
   MOCK_RECOMMENDER=true
4. Start app:
   npm start

Server runs on http://localhost:3000 by default.

## API

POST /api/recommend (multipart/form-data)

Fields:
- image: required file
- contextText: optional text
- audio: optional file

Response shape:
- topPick
- alternatives (2 items)
- globalAdvisory
- generatedAt

## Tests

Run:

npm test

Covers:
- missing image validation
- top-3 response contract
- confidence/risk behavior
- low-confidence advisory behavior
- Italian-only recommendation validation in mock flow
