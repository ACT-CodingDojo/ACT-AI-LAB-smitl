## 1. Project Setup

- [x] 1.1 Initialize Next.js project with TypeScript template
- [x] 1.2 Configure TypeScript for strict mode
- [x] 1.3 Set up Vercel environment variables (GEMINI_API_KEY)
- [x] 1.4 Install required dependencies (axios, form-data for image uploads)
- [x] 1.5 Configure ESLint and Prettier for code style

## 2. Wine Database

- [x] 2.1 Design Italian wine JSON schema (~20 wines, fields: name, region, type, body, acidity, tasting_notes, typical_pairings)
- [x] 2.2 Curate and populate wine dataset with representative Italian wines
- [x] 2.3 Place JSON file in `/public/wines.json` for static serving
- [x] 2.4 Create utility function to load and validate wine database on app startup

## 3. Frontend Structure & Styling

- [x] 3.1 Create main app layout page with responsive design (mobile-first)
- [x] 3.2 Set up Tailwind CSS or similar for responsive styling
- [x] 3.3 Create reusable component library (Card, Button, Input, Dropdown, Alert)
- [x] 3.4 Implement mobile-responsive grid/layout system (test on iOS/Android)
- [x] 3.5 Create loading and error state components

## 4. Photo Capture & Upload

- [x] 4.1 Implement browser camera access using navigator.mediaDevices.getUserMedia
- [x] 4.2 Create UI for camera preview and capture button
- [x] 4.3 Implement photo gallery upload fallback using file input
- [x] 4.4 Create image preview component with option to retake/reupload
- [x] 4.5 Add image validation (file size, format checks)
- [x] 4.6 Handle camera permissions errors gracefully

## 5. API Route: Photo Recognition

- [x] 5.1 Create `/api/recognize` POST endpoint
- [x] 5.2 Implement Gemini Vision API call with image analysis prompt
- [x] 5.3 Parse Gemini response to extract: dish_name, ingredients, preparation_style, cuisine_type
- [x] 5.4 Add error handling for failed/invalid photos
- [x] 5.5 Return structured JSON response to frontend

## 6. Contextual Input UI

- [x] 6.1 Create text input field for user refinements
- [x] 6.2 Implement Web Speech API integration for voice input (with browser support check)
- [x] 6.3 Create voice recording UI (record, stop, transcription display)
- [x] 6.4 Add fallback text input if browser doesn't support Web Speech API
- [x] 6.5 Create occasion dropdown (informal dinner, date night, celebration, casual lunch, aperitivo)
- [x] 6.6 Create season dropdown (spring, summer, autumn, winter)
- [x] 6.7 Implement form validation before submission

## 7. API Route: Wine Recommendation

- [x] 7.1 Create `/api/recommend` POST endpoint that accepts: dish_profile, text_input, occasion, season, wines_list
- [x] 7.2 Craft Gemini LLM prompt for wine matching (consider context, pairing logic, Italian wines only)
- [x] 7.3 Request Gemini Structured Output (JSON schema) with 3 wine recommendations + confidence_score (0-100) + reasoning
- [x] 7.4 Validate Gemini response structure; handle malformed responses
- [x] 7.5 Ensure confidence scoring logic factors in: photo clarity, dish identification certainty, pairing classical status, context completeness
- [x] 7.6 Return top 3 wines (primary + 2 alternatives) with confidence metadata

## 8. Result Presentation

- [x] 8.1 Create result cards component for primary recommendation
- [x] 8.2 Create alternative recommendation cards (visually de-emphasized)
- [x] 8.3 Implement confidence score display (% + label: "Recommended with confidence" / "Good match" / warning icon for <70%)
- [x] 8.4 Implement global warning banner if primary confidence < 70%
- [x] 8.5 Add explanation text to each recommendation (dish characteristics + wine characteristics + pairing logic)
- [x] 8.6 Ensure mobile-responsive layout for results screen
- [x] 8.7 Add "Try Another" or "Back" button to restart the flow

## 9. End-to-End Integration

- [x] 9.1 Connect frontend photo upload → `/api/recognize` call
- [x] 9.2 Display recognized dish to user; allow text/voice refinement
- [x] 9.3 Collect occasion and season from dropdowns
- [x] 9.4 Call `/api/recommend` with full context
- [x] 9.5 Display results with confidence scoring and warnings
- [x] 9.6 Test full flow on mobile and desktop browsers

## 10. Error Handling & Edge Cases

- [x] 10.1 Handle Gemini API rate limits gracefully (display user-friendly message)
- [x] 10.2 Handle network errors (offline or API downtime)
- [x] 10.3 Handle invalid/blurry photos (return error, ask for retry)
- [x] 10.4 Handle ambiguous dish recognition (lower confidence score, display warning)
- [x] 10.5 Implement timeout handling for API calls (5-10 second limit)

## 11. Testing & QA

- [x] 11.1 Manual testing on iOS Safari and Chrome mobile
- [x] 11.2 Manual testing on Android Chrome
- [x] 11.3 Test camera permissions flows (allow, deny, revoke)
- [x] 11.4 Test Web Speech API fallback on unsupported browsers
- [x] 11.5 Test confidence scoring edge cases (low confidence warnings)
- [x] 11.6 Test with variety of dishes to validate Gemini recognition and pairing logic
- [x] 11.7 Verify wine database loads correctly and is referenced in recommendations

## 12. Deployment

- [ ] 12.1 Push code to GitHub repository
- [ ] 12.2 Connect repository to Vercel for auto-deployment
- [ ] 12.3 Set Gemini API key in Vercel environment variables
- [ ] 12.4 Verify static wine.json file is served correctly from `/public`
- [ ] 12.5 Test production build and deployment
- [ ] 12.6 Create README with setup instructions for future contributors

