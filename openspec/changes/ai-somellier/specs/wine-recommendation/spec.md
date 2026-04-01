## ADDED Requirements

### Requirement: Accept user context input
The system SHALL accept input parameters: mealType (carne, pesce, vegetariano, dessert), occasion (cena informale, appuntamento, festa), season (estate, inverno, primavera, autunno).

#### Scenario: Valid input submission
- **WHEN** user submits form with valid mealType, occasion, season
- **THEN** system processes the input and returns wine recommendations

### Requirement: Provide wine recommendations
The system SHALL return one or more wine suggestions based on static rules matching input parameters, each with name, description, and reason for the match.

#### Scenario: Recommendation for carne in inverno
- **WHEN** mealType=carne, season=inverno
- **THEN** system suggests robust red wines like Chianti with reason "Ideale per carni rosse invernali"

#### Scenario: Recommendation for pesce in estate
- **WHEN** mealType=pesce, season=estate
- **THEN** system suggests fresh white wines with reason "Perfetto per pesce fresco estivo"

### Requirement: Handle no matches gracefully
The system SHALL return a default suggestion if no exact match is found, with a note on limited data.

#### Scenario: Uncommon combination
- **WHEN** input parameters don't match any rule
- **THEN** system returns a generic wine suggestion with reason "Suggerimento base, catalogo limitato"</content>
<parameter name="filePath">/home/daniel/Workspaces/ACT-AI-LAB-smitl/openspec/changes/ai-somellier/specs/wine-recommendation/spec.md