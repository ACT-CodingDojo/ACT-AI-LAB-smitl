## 1. Specification and data contracts

- [x] 1.1 Define the request/response schema for multimodal input and top-3 recommendation output.
- [x] 1.2 Define confidence normalization rules (0-100 integer) and risk labeling (<70 at-risk).
- [x] 1.3 Define the global advisory rule for low-confidence highlighted result.

## 2. Italian wine grounding

- [x] 2.1 Compile an initial Italian wine dataset from MASAF references.
- [x] 2.2 Define dataset fields required for ranking prompts and output formatting.
- [x] 2.3 Validate dataset consistency and add verification checks against eAmbrosia references where needed.

## 3. Backend orchestration and security

- [x] 3.1 Create a minimal backend recommendation endpoint for image, text, and optional voice payloads.
- [x] 3.2 Implement server-side Gemini API integration for multimodal interpretation and ranking.
- [x] 3.3 Add server-side secret handling for API keys and ensure no key exposure in client artifacts.
- [x] 3.4 Add basic request rate limiting and failure handling for free-tier cost control.

## 4. Input processing pipeline

- [x] 4.1 Implement optional voice transcription step and merge transcription with optional text context.
- [x] 4.2 Implement multimodal prompt assembly and structured JSON response parsing.
- [x] 4.3 Implement deterministic sorting and selection of one highlighted result plus two alternatives.

## 5. Frontend experience

- [x] 5.1 Build input flow for image upload/camera capture with optional text and optional voice.
- [x] 5.2 Build results UI showing highlighted suggestion, two alternatives, and confidence percentages.
- [x] 5.3 Add at-risk labels for results below 70 confidence.
- [x] 5.4 Add insufficiency advisory banner when highlighted result is below 70 confidence.

## 6. Privacy and validation

- [x] 6.1 Enforce no persistence of user preferences across sessions.
- [x] 6.2 Minimize temporary retention of media and transcription data.
- [x] 6.3 Add acceptance tests for multimodal input, top-3 output, risk threshold, advisory behavior, and Italian-only filtering.
