# SSC Master

Maharashtra State Board SSC (Standard 10) exam-preparation mobile app built with Expo, React Native and TypeScript.

## Run

```bash
npm install
npx expo start
```

Then press `a` for Android, `i` for iOS, or scan the Expo QR code.

## Current milestone

- Expo + TypeScript foundation
- Bottom navigation: Home, Study, Tests, Progress, Profile
- Full SSC subject structure for Marathi, English, Hindi, Mathematics Part 1 & 2, Science & Technology Part 1 & 2, History, Political Science and Geography
- Chapter-wise Maharashtra SSC curriculum structure
- Chapter-level study-resource model for notes, important points, definitions, formulas, question bank and previous-year practice
- Question-bank architecture with subject, chapter, type, difficulty, marks and tags
- Daily, weekly and monthly test models
- Demo MCQs mapped to real curriculum chapters
- Study-plan task model
- Demo content is clearly separated from future verified study material

## Architecture

`src/models` contains domain interfaces, `src/data` contains curriculum and mock data, `src/theme` contains design tokens, `src/navigation` contains navigation, and `src/screens` contains UI screens.

The curriculum structure is based on Maharashtra SSC / Balbharati subject and chapter references. Only chapter titles are represented in the app; textbook content should be added separately and reviewed for licensing/compliance before release.

## Next milestone

Build the chapter reader, question-bank browser, persisted quiz attempts, local progress tracking, authenticated student profiles, and then connect Firebase for synced content, results, notifications and an admin workflow.
