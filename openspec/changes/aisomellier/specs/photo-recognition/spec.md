## ADDED Requirements

### Requirement: Photo Upload and Processing
The system SHALL accept food photos via browser camera or gallery upload and analyze them using Google Gemini Vision API to identify the dish, ingredients, and preparation style.

#### Scenario: Camera capture successful
- **WHEN** user clicks "Capture Photo" on a mobile device
- **THEN** system opens the native camera interface and captures an image

#### Scenario: Gallery upload successful
- **WHEN** user clicks "Upload Photo" on desktop
- **THEN** system opens the file picker, user selects an image, and the photo is processed

#### Scenario: Photo transmission to Gemini
- **WHEN** user submits a photo
- **THEN** system sends the image to Google Gemini Vision API for analysis via secure backend endpoint

#### Scenario: Dish recognition response
- **WHEN** Gemini processes the photo
- **THEN** system receives structured JSON containing: dish_name, ingredients, preparation_style, cuisine_type

#### Scenario: Recognition failure handling
- **WHEN** photo is blurry, obscured, or contains no identifiable food
- **THEN** system returns a clear error message and asks the user to retake the photo

