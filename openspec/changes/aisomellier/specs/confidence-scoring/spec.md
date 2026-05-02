## ADDED Requirements

### Requirement: Confidence Score Generation
The system SHALL generate a numeric confidence score (0-100%) for each wine recommendation, reflecting the certainty of the match based on input quality and pairing logic clarity.

#### Scenario: High confidence recommendation
- **WHEN** photo is clear, dish is unambiguous, and pairing is classic (e.g., steak + Barolo)
- **THEN** system returns confidence_score >= 80%

#### Scenario: Medium confidence recommendation
- **WHEN** photo is adequate but dish has variations, or pairing is less obvious
- **THEN** system returns confidence_score between 70-79%

#### Scenario: Low confidence recommendation
- **WHEN** photo is ambiguous, dish is unclear, or context (occasion/season) is incomplete
- **THEN** system returns confidence_score < 70%

#### Scenario: Confidence reasoning
- **WHEN** score is generated
- **THEN** system includes a confidence_reasoning field explaining key factors (e.g., "clear photo, classic pairing" or "blurry image, less certain match")

### Requirement: Confidence Scoring Rules
The system SHALL base confidence scores on measurable factors: photo clarity, dish identification certainty, pairing rule directness, and context completeness.

#### Scenario: Scoring factor: Photo clarity
- **WHEN** photo is well-lit and focused
- **THEN** confidence increases by +15 points

#### Scenario: Scoring factor: Dish ambiguity
- **WHEN** dish is a common item (e.g., "pasta carbonara")
- **THEN** confidence increases by +20 points

#### Scenario: Scoring factor: Pairing classic status
- **WHEN** pairing is a classic combination in enology (e.g., Chianti + Tuscan meat)
- **THEN** confidence increases by +15 points

#### Scenario: Scoring factor: Missing context
- **WHEN** user provides only photo, no occasion/season
- **THEN** confidence decreases by -10 points

