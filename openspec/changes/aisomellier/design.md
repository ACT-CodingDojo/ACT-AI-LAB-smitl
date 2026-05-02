## Context

AiSomellier is a net-new web application targeting non-expert wine enthusiasts. The product requires minimal infrastructure to reduce operational overhead and enable rapid sharing among friends. The primary technical challenge is orchestrating two LLM calls (photo recognition → wine recommendation) with confidence scoring to ensure the system communicates uncertainty honestly.

**Constraints:**
- Free tier deployment (Vercel)
- Google Gemini API for both vision and reasoning tasks
- Italian wines only (curated dataset)
- Mobile-first, responsive design
- Zero persistent user data (stateless per session)

## Goals / Non-Goals

**Goals:**
- Deliver a mobile-friendly web app that recognizes food photos and recommends Italian wines
- Provide transparent confidence scoring so users understand recommendation reliability
- Keep the backend minimal (Next.js API routes only, no databases)
- Support contextual input (photo + optional text/voice + occasion + season)
- Generate intelligent, human-readable explanations for wine recommendations

**Non-Goals:**
- User authentication or accounts
- Persistent user preference learning
- Global wines; limited to Italy initially
- Admin dashboards or analytics
- Offline functionality

## Decisions

### 1. **Framework: Next.js + TypeScript**
**Why:** Full-stack TypeScript enables fast iteration, type safety across client/API, and zero-config deployment to Vercel. Mobile responsiveness is built-in via Next.js layout system.

**Alternatives considered:**
- React + Express: More boilerplate, separate frontend/backend
- Vue + Flask: Smaller ecosystem for this use case
- Svelte + Hono: Lighter, but Vercel integration less seamless

### 2. **Photo Recognition: Gemini Vision API**
**Why:** Single API for both dish identification and wine recommendation reasoning. Structured output (JSON) ensures reliable confidence scoring. Free tier supports MVP traffic.

**Alternatives considered:**
- TensorFlow.js on-device: Lighter, but model download overhead on mobile; less flexible
- Google Cloud Vision API: Simpler for photo only, but requires second LLM for recommendation

### 3. **Confidence Scoring: Gemini Structured Output**
**Why:** Request JSON schema from Gemini; responses enforce confidence_score as integer 0-100. LLM includes reasoning for the score in structured format.

**Alternatives considered:**
- Manual prompt parsing: Fragile, prone to hallucination
- Separate scoring model: Over-engineered for MVP

### 4. **Wine Database: Static JSON File**
**Why:** No database complexity, no schema migrations, 100% client-queryable after initial load. ~20 curated Italian wines sufficient for MVP.

**Alternatives considered:**
- SQLite embedded: Adds build/runtime complexity
- Firebase Firestore: Introduces authentication requirement
- CSV lookup: Harder to maintain structure

### 5. **Voice Input: Web Speech API**
**Why:** Browser-native, zero external dependencies. Works offline. User empowerment without server transcription costs.

**Alternatives considered:**
- Google Cloud Speech-to-Text API: Costs money, requires auth key exposure
- AssemblyAI: Same cost/complexity issue

### 6. **Backend Communication: API Routes with Secrets**
**Why:** Next.js API routes run on Vercel serverless. Environment variables protect Gemini key. Single `/api/recommend` endpoint orchestrates photo → recognition → wine matching.

**Alternatives considered:**
- No backend (client-side direct Gemini call): Exposes API key to browser, violates security
- Separate Express server: Adds deployment complexity

## Risks / Trade-offs

| Risk | Mitigation |
|------|-----------|
| **Gemini API rate limits on free tier** | MVP targets <1000 requests/month. Monitor usage; implement client-side caching of recent results. Escalate to paid tier if needed. |
| **Photo recognition failures** (blurry, obscured food) | Confidence scoring detects this; warn user "insufficient clarity, consiglio indicativo". Recommend photo retake. |
| **Wine match hallucination** | Confidence threshold: flag <70% as speculative. Dataset constraints (only 20 wines) reduce combinatorial explosion. |
| **Mobile experience: photo upload** | Test camera access on iOS/Android. Use native file picker. Progressive enhancement: allow URL paste as fallback. |
| **Voice input browser support** | Web Speech API polyfill recommended. Text input always available as fallback. |
| **Cold start latency** (Vercel serverless) | Acceptable for MVP (~500ms). Monitor with user telemetry. |

## Migration Plan

**Initial launch (MVP):**
1. Deploy to Vercel (main branch → auto-deploy)
2. Set Gemini API key in Vercel environment secrets
3. Static wine JSON served from `/public`
4. No downtime concerns (greenfield product)

**Future scaling (if needed):**
- If rate limits hit: Enable response caching in Redis/Edge
- If confidence scoring unreliable: A/B test with additional signal (user feedback)

## Open Questions

1. **Wine dataset expansion:** Do we start with 20 wines or 50? (Trade-off: completeness vs. manageability)
2. **Multi-language support:** Italian-only for MVP, or localization from day 1?
3. **Analytics:** Do we want anonymous event tracking (e.g., "recommendation clicked") via Vercel Analytics, or stay fully stateless?

