# AiSomellier

AI-powered Italian wine recommendation app that uses Google Gemini API to suggest wines based on food photos.

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Google Gemini API key

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```
Add your Gemini API key to `.env.local`

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Architecture

- **Frontend**: Next.js 14 with TypeScript and Tailwind CSS
- **Backend**: Next.js API Routes
- **AI**: Google Gemini API (Vision + LLM)
- **Voice**: Web Speech API (browser-native)
- **Deployment**: Vercel

## Project Structure

```
/app            - Next.js App Router pages and layouts
/components     - Reusable React components
/public         - Static assets (wines.json, etc.)
/api            - API route handlers
```

## Features

- 📸 Photo-based food recognition
- 🎤 Voice input support (Web Speech API)
- 🍷 Italian wine recommendations with confidence scoring
- 📱 Mobile-responsive design
- ⚠️ Low-confidence warnings
