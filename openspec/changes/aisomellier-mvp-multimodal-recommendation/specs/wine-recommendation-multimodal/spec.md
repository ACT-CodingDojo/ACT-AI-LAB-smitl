## ADDED Requirements

### Requirement: Multimodal recommendation input
The system SHALL accept a meal image as mandatory input and SHALL accept optional text and optional voice context for each recommendation request.

#### Scenario: Image-only request
- **WHEN** a user submits a request with only a valid meal image
- **THEN** the system processes the request and returns ranked wine recommendations

#### Scenario: Image with optional context
- **WHEN** a user submits a valid meal image with text and/or voice context
- **THEN** the system fuses all provided signals during recommendation generation

### Requirement: Voice context transcription
The system SHALL transcribe voice context into text before recommendation ranking whenever a voice input is provided.

#### Scenario: Voice provided
- **WHEN** a request includes voice context
- **THEN** the system generates transcription text and includes it in model context

### Requirement: Italian-only wine suggestions
The system SHALL return only Italian wine suggestions.

#### Scenario: Recommendation candidate filtering
- **WHEN** ranking candidate wines for a request
- **THEN** the system limits candidates to the Italian wine dataset configured for the service

### Requirement: Ranked top-3 response
The system SHALL return exactly three ranked wine suggestions for each successful recommendation request.

#### Scenario: Standard successful response
- **WHEN** recommendation generation succeeds
- **THEN** the response includes exactly one highlighted result and two alternatives in descending confidence order

### Requirement: Confidence percentage per result
The system SHALL provide a numeric confidence percentage from 0 to 100 for each returned suggestion.

#### Scenario: Response confidence fields
- **WHEN** recommendation results are returned
- **THEN** each result includes an integer confidence percentage value between 0 and 100

### Requirement: At-risk labeling threshold
The system SHALL label any recommendation with confidence below 70 as at-risk.

#### Scenario: Recommendation below threshold
- **WHEN** a recommendation confidence is less than 70
- **THEN** that recommendation is marked as at-risk in the response

### Requirement: Insufficiency advisory for low-confidence top result
The system SHALL show an explicit insufficiency advisory when the highlighted result is below 70 confidence.

#### Scenario: Low-confidence highlighted recommendation
- **WHEN** the highlighted recommendation has confidence below 70
- **THEN** the response includes a global advisory stating that information is insufficient and the advice is purely indicative

### Requirement: Secret management through backend
The system SHALL call Gemini API only from backend components and SHALL keep API keys out of client-side code.

#### Scenario: Client request path
- **WHEN** the user submits a recommendation request from the web app
- **THEN** the client sends data to backend and the backend invokes Gemini using server-side secrets

### Requirement: No user preference persistence
The system SHALL NOT persist user preference profiles or recommendation history for personalization.

#### Scenario: New session behavior
- **WHEN** a user starts a new session
- **THEN** recommendation generation does not rely on persisted user preference data
