# Project Overview

<cite>
**Referenced Files in This Document**
- [README.md](file://README.md)
- [package.json](file://package.json)
- [app/_layout.tsx](file://app/_layout.tsx)
- [app/index.tsx](file://app/index.tsx)
- [app/components/match/MatchList.tsx](file://app/components/match/MatchList.tsx)
- [app/components/match/CountdownTimer.tsx](file://app/components/match/CountdownTimer.tsx)
- [app/components/filter/FilterSheet.tsx](file://app/components/filter/FilterSheet.tsx)
- [app/context/FilterContext.tsx](file://app/context/FilterContext.tsx)
- [app/hooks/useMatches.ts](file://app/hooks/useMatches.ts)
- [app/hooks/useTournaments.ts](file://app/hooks/useTournaments.ts)
- [app/hooks/useCountdown.ts](file://app/hooks/useCountdown.ts)
- [app/services/matchApi.ts](file://app/services/matchApi.ts)
- [app/services/tournamentApi.ts](file://app/services/tournamentApi.ts)
- [app/types/match.ts](file://app/types/match.ts)
- [app/types/tournament.ts](file://app/types/tournament.ts)
- [app/utils/constants.ts](file://app/utils/constants.ts)
- [app/utils/dateUtils.ts](file://app/utils/dateUtils.ts)
</cite>

## Table of Contents
1. [Introduction](#introduction)
2. [Project Structure](#project-structure)
3. [Core Components](#core-components)
4. [Architecture Overview](#architecture-overview)
5. [Detailed Component Analysis](#detailed-component-analysis)
6. [Dependency Analysis](#dependency-analysis)
7. [Performance Considerations](#performance-considerations)
8. [Troubleshooting Guide](#troubleshooting-guide)
9. [Conclusion](#conclusion)

## Introduction
This React Native sports match listing application is a mobile-first platform designed to deliver a seamless live sports experience. Its core purpose is to centralize match schedules, provide real-time countdowns, and enable efficient discovery through intelligent filtering. The app targets sports fans who want quick access to upcoming and live matches across supported sports, with a focus on smooth performance and intuitive navigation.

Key value propositions:
- Real-time engagement: Live countdown timers and “LIVE” indicators keep users informed about match timing.
- Efficient discovery: Multi-select tournament filtering allows users to focus on their favorite competitions.
- Scalable browsing: Infinite scroll ensures a continuous stream of matches without manual pagination.
- Reliable performance: Optimized rendering and caching reduce latency and improve responsiveness.

Target audience:
- Casual and die-hard sports fans
- Commuters and users seeking quick match updates
- Viewers who prefer mobile-first consumption of sports content

## Project Structure
The application follows a modular, feature-driven structure with clear separation of concerns:
- Components: Reusable UI elements for matches, filters, and loading states
- Hooks: Custom React Query and utility hooks encapsulating data fetching and countdown logic
- Services: API clients for match and tournament data
- Types: Strongly typed interfaces for data contracts
- Utils: Constants, date/time helpers, and formatters
- Context: Filter state management for multi-select tournament selection
- Layout: Root providers for React Query, gesture handling, and bottom sheet modals

```mermaid
graph TB
subgraph "Presentation Layer"
A_Index["app/index.tsx"]
A_MatchList["components/match/MatchList.tsx"]
A_Countdown["components/match/CountdownTimer.tsx"]
A_FilterSheet["components/filter/FilterSheet.tsx"]
end
subgraph "State & Logic"
B_UseMatches["hooks/useMatches.ts"]
B_UseTournaments["hooks/useTournaments.ts"]
B_UseCountdown["hooks/useCountdown.ts"]
B_FilterCtx["context/FilterContext.tsx"]
end
subgraph "Services & Data"
C_MatchApi["services/matchApi.ts"]
C_TournApi["services/tournamentApi.ts"]
end
subgraph "Shared"
D_Types["types/*.ts"]
D_Utils["utils/*.ts"]
E_Layout["app/_layout.tsx"]
end
A_Index --> A_MatchList
A_Index --> A_FilterSheet
A_MatchList --> A_Countdown
A_FilterSheet --> B_FilterCtx
A_MatchList --> B_UseMatches
A_FilterSheet --> B_UseTournaments
A_Countdown --> B_UseCountdown
B_UseMatches --> C_MatchApi
B_UseTournaments --> C_TournApi
A_Index --> E_Layout
A_MatchList --> D_Types
A_Countdown --> D_Types
A_FilterSheet --> D_Types
B_UseMatches --> D_Types
B_UseTournaments --> D_Types
B_UseCountdown --> D_Utils
C_MatchApi --> D_Types
C_TournApi --> D_Types
D_Types --> D_Utils
```

**Diagram sources**
- [app/index.tsx](file://app/index.tsx#L1-L108)
- [app/components/match/MatchList.tsx](file://app/components/match/MatchList.tsx#L1-L117)
- [app/components/match/CountdownTimer.tsx](file://app/components/match/CountdownTimer.tsx#L1-L43)
- [app/components/filter/FilterSheet.tsx](file://app/components/filter/FilterSheet.tsx#L1-L128)
- [app/hooks/useMatches.ts](file://app/hooks/useMatches.ts#L1-L56)
- [app/hooks/useTournaments.ts](file://app/hooks/useTournaments.ts#L1-L45)
- [app/hooks/useCountdown.ts](file://app/hooks/useCountdown.ts#L1-L54)
- [app/context/FilterContext.tsx](file://app/context/FilterContext.tsx#L1-L72)
- [app/services/matchApi.ts](file://app/services/matchApi.ts#L1-L36)
- [app/services/tournamentApi.ts](file://app/services/tournamentApi.ts#L1-L35)
- [app/types/match.ts](file://app/types/match.ts#L1-L46)
- [app/types/tournament.ts](file://app/types/tournament.ts#L1-L31)
- [app/utils/constants.ts](file://app/utils/constants.ts#L1-L38)
- [app/utils/dateUtils.ts](file://app/utils/dateUtils.ts#L1-L64)
- [app/_layout.tsx](file://app/_layout.tsx#L1-L35)

**Section sources**
- [README.md](file://README.md#L54-L92)
- [app/_layout.tsx](file://app/_layout.tsx#L1-L35)

## Core Components
- Match List Screen: Presents matches with team branding, match metadata, and countdown timers. Implements pull-to-refresh, infinite scroll, and responsive layouts.
- Countdown Timer: Provides live countdowns for upcoming matches and “LIVE” indicators for ongoing matches using optimized animation frames.
- Tournament Filter: Bottom sheet with multi-select filters grouped by sport, enabling users to narrow down matches by competition.
- Data Fetching: React Query-powered hooks manage pagination, caching, and stale-while-revalidate behavior for match and tournament lists.
- Filter Context: Manages temporary selections and applies filters to the match list via controlled state transitions.

Practical examples:
- Viewing upcoming matches in a specific tournament: Open filter, select desired tournaments, apply, and browse the filtered list.
- Monitoring match countdowns: Navigate to the match list and observe the countdown timer updating every second until kickoff.
- Discovering live matches: Switch to “live” status via filters or rely on automatic “LIVE” indicators for ongoing matches.

**Section sources**
- [README.md](file://README.md#L7-L13)
- [app/index.tsx](file://app/index.tsx#L11-L107)
- [app/components/match/MatchList.tsx](file://app/components/match/MatchList.tsx#L27-L114)
- [app/components/match/CountdownTimer.tsx](file://app/components/match/CountdownTimer.tsx#L13-L42)
- [app/components/filter/FilterSheet.tsx](file://app/components/filter/FilterSheet.tsx#L16-L125)
- [app/hooks/useMatches.ts](file://app/hooks/useMatches.ts#L13-L55)
- [app/hooks/useTournaments.ts](file://app/hooks/useTournaments.ts#L11-L44)
- [app/context/FilterContext.tsx](file://app/context/FilterContext.tsx#L20-L71)

## Architecture Overview
The app employs a layered architecture:
- Presentation layer: Screens and components render UI and orchestrate user interactions.
- Domain layer: Hooks encapsulate business logic for data fetching, filtering, and countdown calculations.
- Data layer: Services abstract HTTP requests and normalize API responses.
- Shared layer: Types, constants, and utilities provide cross-cutting concerns.

```mermaid
graph TB
UI_Index["Index Screen<br/>app/index.tsx"] --> UI_MatchList["MatchList<br/>components/match/MatchList.tsx"]
UI_Index --> UI_FilterSheet["FilterSheet<br/>components/filter/FilterSheet.tsx"]
UI_MatchList --> Hook_Matches["useMatches<br/>hooks/useMatches.ts"]
UI_FilterSheet --> Hook_Tournaments["useTournaments<br/>hooks/useTournaments.ts"]
UI_MatchList --> Hook_Countdown["useCountdown<br/>hooks/useCountdown.ts"]
Hook_Matches --> Service_MatchApi["matchApi<br/>services/matchApi.ts"]
Hook_Tournaments --> Service_TournApi["tournamentApi<br/>services/tournamentApi.ts"]
Hook_Countdown --> Util_Date["dateUtils<br/>utils/dateUtils.ts"]
UI_Index --> Provider_Layout["Root Providers<br/>app/_layout.tsx"]
UI_MatchList --> Types_Match["types/match.ts"]
UI_FilterSheet --> Types_Tournament["types/tournament.ts"]
Hook_Matches --> Types_Match
Hook_Tournaments --> Types_Tournament
Hook_Countdown --> Types_Match
Util_Constants["constants.ts"] --> UI_MatchList
Util_Constants --> UI_FilterSheet
Util_Constants --> UI_Index
```

**Diagram sources**
- [app/index.tsx](file://app/index.tsx#L11-L107)
- [app/components/match/MatchList.tsx](file://app/components/match/MatchList.tsx#L27-L114)
- [app/components/filter/FilterSheet.tsx](file://app/components/filter/FilterSheet.tsx#L16-L125)
- [app/hooks/useMatches.ts](file://app/hooks/useMatches.ts#L21-L41)
- [app/hooks/useTournaments.ts](file://app/hooks/useTournaments.ts#L14-L28)
- [app/hooks/useCountdown.ts](file://app/hooks/useCountdown.ts#L10-L53)
- [app/services/matchApi.ts](file://app/services/matchApi.ts#L4-L35)
- [app/services/tournamentApi.ts](file://app/services/tournamentApi.ts#L4-L34)
- [app/utils/dateUtils.ts](file://app/utils/dateUtils.ts#L22-L63)
- [app/_layout.tsx](file://app/_layout.tsx#L19-L34)
- [app/types/match.ts](file://app/types/match.ts#L16-L45)
- [app/types/tournament.ts](file://app/types/tournament.ts#L6-L20)
- [app/utils/constants.ts](file://app/utils/constants.ts#L1-L38)

## Detailed Component Analysis

### Match List and Infinite Scroll
The match list integrates React Query’s infinite scroll with a FlatList to provide smooth, memory-efficient rendering. It supports:
- Pull-to-refresh for immediate data reload
- End-of-list detection triggering incremental loads
- Loading skeletons during initial fetch
- Empty/error states with actionable messages

```mermaid
sequenceDiagram
participant User as "User"
participant Screen as "Index Screen"
participant List as "MatchList"
participant Hook as "useMatches"
participant API as "matchApi"
participant Types as "types/match.ts"
User->>Screen : Open app
Screen->>Hook : Initialize with timezone/status/tournamentIds
Hook->>API : fetchMatches(limit, offset)
API-->>Hook : MatchListResponse
Hook-->>List : pages -> flattened matches
List-->>User : Render FlatList with MatchCards
User->>List : Scroll to end
List->>Hook : fetchNextPage()
Hook->>API : fetchMatches(next offset)
API-->>Hook : Next page
Hook-->>List : Append matches
List-->>User : Continue rendering
```

**Diagram sources**
- [app/index.tsx](file://app/index.tsx#L15-L25)
- [app/components/match/MatchList.tsx](file://app/components/match/MatchList.tsx#L83-L107)
- [app/hooks/useMatches.ts](file://app/hooks/useMatches.ts#L21-L41)
- [app/services/matchApi.ts](file://app/services/matchApi.ts#L4-L35)
- [app/types/match.ts](file://app/types/match.ts#L40-L45)

**Section sources**
- [app/components/match/MatchList.tsx](file://app/components/match/MatchList.tsx#L27-L114)
- [app/hooks/useMatches.ts](file://app/hooks/useMatches.ts#L13-L55)
- [app/services/matchApi.ts](file://app/services/matchApi.ts#L1-L36)
- [app/types/match.ts](file://app/types/match.ts#L31-L45)

### Tournament Filtering Workflow
The filter sheet enables multi-select tournament filtering with a bottom sheet UI:
- Loads sports and tournaments via useTournaments
- Maintains pending selections until applied
- Applies filters to the match list via FilterContext

```mermaid
sequenceDiagram
participant User as "User"
participant Screen as "Index Screen"
participant Sheet as "FilterSheet"
participant Hook as "useTournaments"
participant Ctx as "FilterContext"
participant List as "MatchList"
User->>Screen : Tap Filter
Screen->>Sheet : Open bottom sheet
Sheet->>Hook : Fetch sports/tournaments
Hook-->>Sheet : Sports with tournaments
User->>Sheet : Toggle tournaments
Sheet->>Ctx : toggleTournament/pendingIds
User->>Sheet : Apply
Sheet->>Ctx : applyFilters()
Ctx-->>Screen : selectedTournamentIds
Screen->>List : Re-fetch matches with filters
```

**Diagram sources**
- [app/index.tsx](file://app/index.tsx#L13-L25)
- [app/components/filter/FilterSheet.tsx](file://app/components/filter/FilterSheet.tsx#L17-L50)
- [app/hooks/useTournaments.ts](file://app/hooks/useTournaments.ts#L14-L28)
- [app/context/FilterContext.tsx](file://app/context/FilterContext.tsx#L26-L43)
- [app/components/match/MatchList.tsx](file://app/components/match/MatchList.tsx#L83-L107)

**Section sources**
- [app/components/filter/FilterSheet.tsx](file://app/components/filter/FilterSheet.tsx#L16-L125)
- [app/hooks/useTournaments.ts](file://app/hooks/useTournaments.ts#L11-L44)
- [app/context/FilterContext.tsx](file://app/context/FilterContext.tsx#L20-L71)

### Countdown Timer Logic
The countdown timer updates every second using requestAnimationFrame and switches to “LIVE” when appropriate:
- Calculates time differences using date-fns and timezone-aware formatting
- Formats display based on remaining time (days/hours/minutes/seconds)
- Handles expired states and live match indicators

```mermaid
flowchart TD
Start(["Timer Mount"]) --> Init["Initialize RAF loop<br/>requestAnimationFrame(update)"]
Init --> Tick["On tick: check 1s threshold"]
Tick --> Calc["Compute time delta<br/>getCountdownParts()"]
Calc --> Expired{"Expired or Live?"}
Expired --> |Yes| SetExpired["Set isExpired=true<br/>Display 'Started' or 'LIVE'"]
Expired --> |No| Format["formatCountdown(parts)"]
Format --> Update["Update display state"]
SetExpired --> Loop["Continue RAF until unmount"]
Update --> Loop
Loop --> End(["Unmount cancels RAF"])
```

**Diagram sources**
- [app/hooks/useCountdown.ts](file://app/hooks/useCountdown.ts#L17-L50)
- [app/utils/dateUtils.ts](file://app/utils/dateUtils.ts#L22-L51)
- [app/components/match/CountdownTimer.tsx](file://app/components/match/CountdownTimer.tsx#L13-L38)

**Section sources**
- [app/hooks/useCountdown.ts](file://app/hooks/useCountdown.ts#L10-L53)
- [app/utils/dateUtils.ts](file://app/utils/dateUtils.ts#L22-L63)
- [app/components/match/CountdownTimer.tsx](file://app/components/match/CountdownTimer.tsx#L13-L42)

### Data Models Overview
The application relies on strongly typed contracts for matches and tournaments:
- Match: Includes identifiers, team info, tournament linkage, status, and scheduling metadata
- Tournament: Sport association and tournament metadata
- Query Params/Responses: Consistent pagination and filtering parameters

```mermaid
erDiagram
MATCH {
int id
int matchId
string matchName
string matchStatus
string matchDate
string matchTime
string startTime
string timezone
string venue
}
TEAM {
int id
string name
string shortName
string logo
string score
}
TOURNAMENT {
int id
string name
int sportId
string sportName
}
MATCH ||--|| TOURNAMENT : "belongs_to"
MATCH ||--o{ TEAM : "homeTeam"
MATCH ||--o{ TEAM : "awayTeam"
```

**Diagram sources**
- [app/types/match.ts](file://app/types/match.ts#L16-L29)
- [app/types/match.ts](file://app/types/match.ts#L9-L14)
- [app/types/tournament.ts](file://app/types/tournament.ts#L1-L10)

**Section sources**
- [app/types/match.ts](file://app/types/match.ts#L1-L46)
- [app/types/tournament.ts](file://app/types/tournament.ts#L1-L31)

## Dependency Analysis
External libraries and their roles:
- React Query: Server state management, caching, pagination, and stale-while-revalidate
- Expo Router: File-based routing and navigation
- NativeWind/Tailwind: Utility-first styling for responsive UI
- Bottom Sheet: Modal-like filter UI with gesture support
- date-fns/date-fns-tz: Robust date parsing and timezone formatting
- Axios: HTTP client for API communication

```mermaid
graph LR
RN["React Native + Expo"] --> Router["Expo Router"]
RN --> UI["NativeWind"]
RN --> Gesture["Gesture Handler"]
RN --> Reanimated["Reanimated"]
RN --> BottomSheet["@gorhom/bottom-sheet"]
UI --> Components["Custom Components"]
Components --> Hooks["React Query Hooks"]
Hooks --> Services["Axios Services"]
Services --> APIs["External APIs"]
Utils["date-fns / date-fns-tz"] --> Hooks
Utils --> Components
```

**Diagram sources**
- [package.json](file://package.json#L13-L49)
- [app/_layout.tsx](file://app/_layout.tsx#L1-L35)

**Section sources**
- [package.json](file://package.json#L13-L49)
- [README.md](file://README.md#L14-L22)

## Performance Considerations
- Rendering optimizations: FlatList with removeClippedSubviews, maxToRenderPerBatch, windowSize, and initialNumToRender tuned for smooth scrolling
- Memory efficiency: React Query garbage collection and staleTime/gcTime configurations
- Network efficiency: Limit/offset pagination and controlled re-fetch triggers
- Visual responsiveness: requestAnimationFrame-based countdown updates and haptic feedback integration
- Asset delivery: Image caching and fallbacks for team logos

[No sources needed since this section provides general guidance]

## Troubleshooting Guide
Common issues and resolutions:
- Infinite scroll not triggering: Verify hasNextPage and isFetchingNextPage flags and ensure onEndReached threshold is appropriate
- Filters not applying: Confirm selectedTournamentIds propagation from FilterContext to useMatches and that queryKey includes filter parameters
- Countdown not updating: Ensure requestAnimationFrame loop runs and date parsing succeeds; check timezone parameter alignment
- API failures: Inspect error states and implement retry actions; validate endpoint URLs and query parameters

**Section sources**
- [app/components/match/MatchList.tsx](file://app/components/match/MatchList.tsx#L83-L107)
- [app/context/FilterContext.tsx](file://app/context/FilterContext.tsx#L41-L43)
- [app/hooks/useCountdown.ts](file://app/hooks/useCountdown.ts#L17-L50)
- [app/services/matchApi.ts](file://app/services/matchApi.ts#L4-L35)
- [app/services/tournamentApi.ts](file://app/services/tournamentApi.ts#L4-L34)

## Conclusion
This React Native sports match listing application delivers a modern, performant, and user-centric mobile experience for discovering and following live sports events. By combining robust data fetching, intelligent filtering, and real-time countdowns, it enhances engagement and accessibility for sports fans. The modular architecture and strong typing ensure maintainability and scalability for future enhancements.