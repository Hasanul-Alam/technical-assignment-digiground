# Match List Mobile App

A React Native mobile application for displaying sports matches with live countdown timers, infinite scrolling, and tournament filtering.

## Overview

This app displays a list of upcoming and live sports matches with the following features:
- **Match List Screen**: Displays matches with team logos, names, and countdown timers
- **Infinite Scroll**: Loads matches incrementally using limit/offset pagination
- **Tournament Filters**: Multi-select filter by tournament in a bottom sheet UI
- **Countdown Timer**: Live countdown to match start time for each match
- **Optimized Performance**: Smooth scrolling with FlatList optimizations

## Tech Stack

- **Framework**: React Native with Expo
- **Routing**: Expo Router (file-based routing)
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **State Management**: React Query (server state), Context API (filter state)
- **HTTP Client**: Axios
- **UI Components**: @gorhom/bottom-sheet for filter modal
- **Date Handling**: date-fns with timezone support

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (macOS) or Android Emulator

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd technical-assignment-digiground
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npx expo start
   ```

4. Run on your preferred platform:
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Scan QR code with Expo Go app on physical device

## Project Structure

```
app/
├── components/
│   ├── match/           # Match-related components
│   │   ├── MatchCard.tsx
│   │   ├── MatchList.tsx
│   │   ├── MatchSkeleton.tsx
│   │   └── CountdownTimer.tsx
│   ├── filter/          # Filter components
│   │   ├── FilterSheet.tsx
│   │   └── SportSection.tsx
│   └── common/          # Shared components
│       ├── EmptyState.tsx
│       ├── ErrorState.tsx
│       └── LoadingSpinner.tsx
├── hooks/               # Custom React hooks
│   ├── useMatches.ts
│   ├── useTournaments.ts
│   └── useCountdown.ts
├── services/            # API services
│   ├── api.ts
│   ├── matchApi.ts
│   └── tournamentApi.ts
├── types/               # TypeScript types
│   ├── match.ts
│   ├── tournament.ts
│   └── api.ts
├── utils/               # Utilities
│   ├── constants.ts
│   ├── dateUtils.ts
│   ├── formatters.ts
│   └── haptics.ts
├── context/             # React Context
│   └── FilterContext.tsx
├── _layout.tsx          # Root layout with providers
└── index.tsx            # Main Match List screen
```

## API Integration

### Match List API
- **Endpoint**: `GET https://au.testing.smartb.com.au/api/sports/matchList`
- **Parameters**: timezone, status, tournament_ids, limit, offset

### Tournaments API
- **Endpoint**: `GET https://au.testing.smartb.com.au/api/sports/AllSportsAndLeagues`
- **Parameters**: search, limit, offset

### Media Base URL
- **URL**: `https://media.smartb.com.au/`

## Features Implemented

### Core Features
- ✅ Match list with infinite scroll
- ✅ Live countdown timers for upcoming matches
- ✅ Tournament filter with multi-select
- ✅ Loading, empty, and error states
- ✅ Pull-to-refresh
- ✅ Responsive design for all screen sizes

### Performance Optimizations
- ✅ FlatList with `removeClippedSubviews`, `maxToRenderPerBatch`, `windowSize`
- ✅ Memoized components with `React.memo`
- ✅ Optimized countdown timer using `requestAnimationFrame`
- ✅ Image caching with expo-image
- ✅ Haptic feedback on interactions

## Assumptions & Decisions

1. **Default Timezone**: Australia/Sydney is used as the default timezone
2. **Supported Sports**: Only Cricket (4), Soccer (8), Australian Rules (9), Basketball (10), and Rugby League (12) are handled
3. **Match Status**: "all" status returns both upcoming and live matches
4. **Image Handling**: Team logos are loaded from the media base URL with fallbacks to initials
5. **Countdown**: Shows "Started" when match time has passed, "LIVE" for live matches

## Trade-offs

1. **FlatList vs FlashList**: Used FlatList (built-in) instead of FlashList to avoid additional dependency
2. **Context vs Zustand**: Used Context API for filter state as it's simple enough for this use case
3. **Bottom Sheet**: Used @gorhom/bottom-sheet for better UX than standard modal
4. **React Query vs SWR**: Chose React Query for better TypeScript support and built-in infinite scroll

## Building for Production

### Android APK

1. Install EAS CLI:
   ```bash
   npm install -g eas-cli
   ```

2. Configure build:
   ```bash
   eas build:configure
   ```

3. Build APK:
   ```bash
   eas build --platform android --profile preview
   ```

### iOS (requires Apple Developer account)

```bash
eas build --platform ios
```

## Testing

### Manual Testing Checklist
- [ ] Infinite scroll loads more matches
- [ ] Countdown timer updates every second
- [ ] Filter applies correctly and refreshes list
- [ ] Pull-to-refresh works
- [ ] Empty state displays when no matches
- [ ] Error state displays on API failure
- [ ] Responsive on different screen sizes

### API Testing
```bash
# Test Match List API
curl "https://au.testing.smartb.com.au/api/sports/matchList?timezone=Australia/Sydney&status=all&limit=20&offset=0"

# Test Tournaments API
curl "https://au.testing.smartb.com.au/api/sports/AllSportsAndLeagues?limit=10&offset=0"
```

## License

This project is created for technical assessment purposes.
