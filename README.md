# SSC Master

Maharashtra State Board SSC (Standard 10) exam-preparation mobile app built with Expo, React Native and TypeScript.

## Run

```bash
npm install
npx expo start
```

Then press `a` for Android, `i` for iOS, or scan the Expo QR code.

## MVP

- Expo + TypeScript foundation
- Bottom navigation: Home, Study, Tests, Progress, Profile
- Student dashboard with preparation and streak cards
- Seven Maharashtra SSC subject entries
- Demo study-plan data and task model
- Daily, weekly and monthly test data models
- Sample MCQ question model
- Reusable theme and domain models
- Demo content is explicitly marked as sample; official syllabus/content is not invented

## Architecture

`src/models` contains domain interfaces, `src/data` contains mock/demo data, `src/theme` contains design tokens, `src/navigation` contains navigation, and `src/screens` contains UI screens.

## Next milestone

Add nested Study/Test navigation, a persisted quiz attempt engine, local storage, chapter-level content, authenticated student profiles, and then connect Firebase or Supabase.
