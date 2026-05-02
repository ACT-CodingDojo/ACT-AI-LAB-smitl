## ADDED Requirements

### Requirement: Wine Recommendation from Dish Profile
The system SHALL use Gemini LLM to match the recognized dish profile (name, ingredients, preparation) with the most suitable Italian wine from the curated database, considering occasion and season inputs.

#### Scenario: Recommendation reasoning
- **WHEN** user has submitted a dish photo, occasion, and season
- **THEN** system sends a prompt to Gemini containing: {dish_profile, occasion, season, available_wines_list}
- **AND** Gemini returns a structured response with: {primary_wine, reasoning, confidence_score}

#### Scenario: Contextual weighting
- **WHEN** occasion is "formal dinner" and season is "winter"
- **THEN** system biases recommendation toward fuller-bodied, structured reds (e.g., Barolo, Barbaresco)

#### Scenario: Seasonal pairing
- **WHEN** season is "summer" and dish is fish-based
- **THEN** system prioritizes light, crisp whites (e.g., Vermentino, Pinot Grigio)

#### Scenario: Invalid dish handling
- **WHEN** Gemini cannot confidently identify the dish
- **THEN** system returns recommendation with low confidence score (<70%) and includes a disclaimer

### Requirement: Wine Database Integration
The system SHALL reference a static JSON file (~20 curated Italian wines) to ensure recommendations are limited to available wines and contain metadata (region, type, tasting notes).

#### Scenario: Wine database lookup
- **WHEN** system needs to recommend a wine
- **THEN** system queries the local JSON wine database for metadata on that wine

#### Scenario: Database structure
- **WHEN** system loads the wine database
- **THEN** each wine record contains: {name, region, type (rosso/bianco/rosato), body, acidity, tasting_notes, typical_pairings}

