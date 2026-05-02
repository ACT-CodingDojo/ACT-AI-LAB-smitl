## Context

The product target is a wine enthusiast with limited technical wine knowledge who wants quick, understandable suggestions. The MVP must stay minimal, free, and easy to share. The recommendation engine uses Google Gemini API for both context interpretation and matching. Recommendations are restricted to Italian wines. User preference persistence is explicitly out of scope to reduce privacy complexity.

## Goals / Non-Goals

**Goals:**
- Accept multimodal context: required image plus optional text and optional voice input.
- Produce exactly three ranked Italian wine suggestions.
- Highlight one primary result and provide two alternatives.
- Return confidence as a numeric percentage for each result.
- Apply a risk threshold where confidence below 70% is treated as at-risk.
- Show an explicit insufficiency advisory when the primary result is at-risk.
- Keep secrets server-side through a minimal backend layer.
- Avoid persistent storage of user preference data.

**Non-Goals:**
- User accounts, profiles, or history-based personalization.
- Guaranteed sommelier-grade precision.
- Inventory, pricing, or e-commerce integration.
- Long-term media retention and analytics-heavy tracking.

## Decisions

1. Multimodal fusion through Gemini
- Decision: Use Gemini with image plus optional textual context (raw text + voice transcription) as a single prompt context.
- Rationale: Minimizes architecture complexity and avoids separate model orchestration for the MVP.
- Alternatives considered: Separate vision and ranking models; custom classifier plus rules engine.

2. Fixed top-3 response contract
- Decision: Return one highlighted suggestion and two alternatives for every successful recommendation call.
- Rationale: Improves user trust and fallback clarity versus single-result output.
- Alternatives considered: Single result only; variable-length list.

3. Confidence normalization to percent
- Decision: Normalize confidence to integer percentage 0-100 at API boundary.
- Rationale: Simple UX communication and deterministic thresholding.
- Alternatives considered: Decimal confidence 0-1; confidence buckets only.

4. Risk threshold at 70%
- Decision: Mark each item below 70% as at-risk and show global advisory when the highlighted item is below 70%.
- Rationale: Matches product requirement for explicit uncertainty communication.
- Alternatives considered: 60% or 75% thresholds; advisory only at list level.

5. Italian-wine-only catalog grounding
- Decision: Constrain candidate recommendations to an Italian wine dataset sourced from official references (MASAF and verification with eAmbrosia where needed).
- Rationale: Prevents off-scope recommendations and reduces hallucination space.
- Alternatives considered: Open-ended model output without grounding.

6. Minimal backend for secret isolation
- Decision: Client sends inputs to backend; backend calls Gemini with server-side API key.
- Rationale: Prevents key exposure and supports basic rate limiting and observability.
- Alternatives considered: Direct client-to-Gemini calls.

## Risks / Trade-offs

- [Ambiguous meal photos] -> Use optional text/voice enrichment and confidence-based advisory.
- [LLM hallucination in wine naming] -> Restrict generation to grounded Italian catalog candidates.
- [Latency from multimodal inference] -> Keep prompt concise, apply response schema constraints, and avoid unnecessary retries.
- [Higher inference costs] -> Add backend-side rate limiting and basic request caps for free usage.
- [Voice transcription errors] -> Treat transcription as optional signal and reduce confidence when conflicting with image context.

## Migration Plan

- Deploy backend endpoint and environment variable secret handling first.
- Roll out response schema with backward-compatible frontend fallback during transition.
- Activate confidence/risk labels in UI after contract validation.
- Rollback path: disable multimodal endpoint and revert to static placeholder recommendations if Gemini integration fails.

## Open Questions

- Should voice transcription be handled by Gemini directly or by a dedicated speech-to-text service before Gemini ranking?
- What initial size of the Italian wine catalog best balances quality and token cost?
- What daily cap is acceptable for free usage while preserving user experience?
