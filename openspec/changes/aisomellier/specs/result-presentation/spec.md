## ADDED Requirements

### Requirement: Recommendation Display with Confidence Tiers
The system SHALL present three wine recommendations (1 primary + 2 alternatives) ranked by confidence score, with visual indicators for confidence levels and warnings for low-confidence suggestions.

#### Scenario: Primary recommendation display
- **WHEN** recommendation is complete
- **THEN** system displays the highest-confidence wine prominently with: wine_name, confidence_percentage, reasoning_text, and visual emphasis (e.g., star rating or highlight color)

#### Scenario: Alternative recommendations
- **WHEN** recommendation is complete
- **THEN** system displays 2 alternative wines ranked by confidence, with same metadata as primary but visually de-emphasized

#### Scenario: High confidence (>=80%)
- **WHEN** confidence >= 80%
- **THEN** system displays a checkmark or "Recommended with confidence" label

#### Scenario: Medium confidence (70-79%)
- **WHEN** confidence is 70-79%
- **THEN** system displays a neutral label (e.g., "Good match" or "Suggested pairing")

#### Scenario: Low confidence (<70%)
- **WHEN** confidence < 70%
- **THEN** system displays a warning icon and text: "⚠️ Low confidence. Based on incomplete or ambiguous information. Consider refining your input."

### Requirement: Contextual Explanation
The system SHALL provide human-readable explanations for each recommendation, explaining why that wine pairs with the dish.

#### Scenario: Explanation content
- **WHEN** wine is recommended
- **THEN** explanation includes: dish characteristics (e.g., "fatty, savory"), wine characteristics (e.g., "high acidity, subtle tannins"), and pairing logic (e.g., "acidity cuts through richness")

#### Scenario: Global low-confidence warning
- **WHEN** primary recommendation confidence < 70%
- **THEN** system displays banner at top of results: "⚠️ Insufficient information. Wine suggestion is purely indicative. Please refine your input (better photo, more context) for a more reliable recommendation."

### Requirement: Mobile-Responsive Presentation
The system SHALL render recommendations in a clear, touch-friendly format optimized for mobile screens while remaining usable on desktop browsers.

#### Scenario: Mobile layout
- **WHEN** displayed on device with width < 768px
- **THEN** system uses single-column layout with large touch targets (buttons, cards)

#### Scenario: Desktop layout
- **WHEN** displayed on screen with width >= 768px
- **THEN** system may use multi-column layout or side-by-side panels for primary and alternatives

#### Scenario: Touch-friendly interactive elements
- **WHEN** user is on mobile
- **THEN** clickable areas are minimum 44x44 pixels, spacing is adequate, and text is readable without zooming

