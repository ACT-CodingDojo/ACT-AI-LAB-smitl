## ADDED Requirements

### Requirement: Multi-Modal Input Acceptance
The system SHALL accept food context through multiple input modalities: photo (required), optional text notes, optional voice input, and structured fields (occasion, season).

#### Scenario: Photo-only input
- **WHEN** user submits only a food photo
- **THEN** system processes the recommendation with available context and may return lower confidence

#### Scenario: Photo with text refinement
- **WHEN** user submits photo + text notes (e.g., "seared rare, black pepper sauce")
- **THEN** system includes the text in the Gemini prompt to refine pairing logic

#### Scenario: Photo with voice input
- **WHEN** user records voice description using Web Speech API
- **THEN** system transcribes voice to text via Web Speech API (client-side) and includes transcription in Gemini prompt

#### Scenario: Occasion dropdown
- **WHEN** user selects occasion from dropdown (informal dinner, date night, celebration, casual lunch, aperitivo)
- **THEN** system passes occasion to Gemini for context weighting

#### Scenario: Season dropdown
- **WHEN** user selects season (spring, summer, autumn, winter)
- **THEN** system passes season to Gemini to bias toward seasonal wines

### Requirement: Web Speech API Integration
The system SHALL use browser-native Web Speech API for voice input, converting user speech to text without external API dependencies.

#### Scenario: Voice capture on supported browsers
- **WHEN** user clicks "Record Voice" on Chrome, Safari, or Edge (supported browsers)
- **THEN** system initiates microphone capture and streams audio to Web Speech API

#### Scenario: Voice capture fallback
- **WHEN** user's browser does not support Web Speech API
- **THEN** system hides the voice input button and displays text input as the primary alternative

#### Scenario: Voice transcription
- **WHEN** user finishes speaking
- **THEN** system transcribes voice to text and displays the transcription for user review/edit before submission

