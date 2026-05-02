## Why

Users who enjoy wine but are not experts often struggle to choose an appropriate Italian wine quickly in everyday situations. A lightweight, free web app that turns multimodal meal context into understandable suggestions can reduce decision friction and improve confidence while staying simple enough to share with friends.

## What Changes

- Introduce a multimodal recommendation flow that accepts a meal image (required), optional text context, and optional voice context.
- Use Google Gemini API to interpret meal context and rank wine matches.
- Return exactly three Italian wine suggestions, with one highlighted result and two alternatives.
- Attach numeric confidence percentages (0-100) to each suggestion and classify results below 70% as at-risk.
- Show a global advisory when the highlighted result is below 70% confidence, indicating that the recommendation is purely indicative due to insufficient information.
- Add a minimal backend layer for secret management so API keys are never exposed in the client.
- Enforce a no-preference-storage policy for user personalization data.

## Capabilities

### New Capabilities
- `wine-recommendation-multimodal`: Multimodal input processing and Gemini-driven top-3 Italian wine recommendations with confidence and risk signaling.

### Modified Capabilities
- None.

## Impact

- Affected systems: frontend upload/input flow, backend orchestration API, LLM prompt/response contracts, recommendation presentation UI.
- Affected integrations: Google Gemini API for multimodal understanding and ranking.
- Affected data contracts: recommendation response schema now includes highlighted result, alternatives, confidence percentage, risk flag, and advisory text.
- Security and privacy impact: API keys moved server-side; no persistent user preference storage.
