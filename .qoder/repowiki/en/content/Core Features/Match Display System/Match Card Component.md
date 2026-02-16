# Match Card Component

<cite>
**Referenced Files in This Document**
- [MatchCard.tsx](file://app/components/match/MatchCard.tsx)
- [CountdownTimer.tsx](file://app/components/match/CountdownTimer.tsx)
- [useCountdown.ts](file://app/hooks/useCountdown.ts)
- [match.ts](file://app/types/match.ts)
- [constants.ts](file://app/utils/constants.ts)
- [dateUtils.ts](file://app/utils/dateUtils.ts)
- [formatters.ts](file://app/utils/formatters.ts)
- [MatchList.tsx](file://app/components/match/MatchList.tsx)
- [MatchSkeleton.tsx](file://app/components/match/MatchSkeleton.tsx)
- [matchApi.ts](file://app/services/matchApi.ts)
- [useMatches.ts](file://app/hooks/useMatches.ts)
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

The Match Card component is a core UI element designed to display individual match information in a visually appealing and responsive layout. It presents team information with logos, match status indicators, and integrates a live countdown timer for upcoming matches. The component follows modern React Native patterns with memoization for performance optimization and comprehensive TypeScript typing for type safety.

## Project Structure

The Match Card component is part of a larger sports match tracking application with the following key architectural patterns:

```mermaid
graph TB
subgraph "Match Module"
MC[MatchCard.tsx]
CT[CountdownTimer.tsx]
ML[MatchList.tsx]
MS[MatchSkeleton.tsx]
end
subgraph "Hooks"
UC[useCountdown.ts]
UM[useMatches.ts]
end
subgraph "Utilities"
DU[dateUtils.ts]
FM[formatters.ts]
CN[constants.ts]
end
subgraph "Services"
MA[matchApi.ts]
end
subgraph "Types"
MT[match.ts]
end
MC --> CT
MC --> UC
MC --> DU
MC --> FM
MC --> CN
MC --> MT
ML --> MC
ML --> MS
ML --> UM
UM --> MA
UM --> MT
UC --> DU
UC --> CN
```

**Diagram sources**
- [MatchCard.tsx](file://app/components/match/MatchCard.tsx#L1-L142)
- [CountdownTimer.tsx](file://app/components/match/CountdownTimer.tsx#L1-L43)
- [useCountdown.ts](file://app/hooks/useCountdown.ts#L1-L54)
- [match.ts](file://app/types/match.ts#L1-L46)

**Section sources**
- [MatchCard.tsx](file://app/components/match/MatchCard.tsx#L1-L142)
- [MatchList.tsx](file://app/components/match/MatchList.tsx#L1-L117)

## Core Components

### MatchCard Component Structure

The MatchCard component is implemented as a memoized functional component that renders a complete match display interface. It utilizes Tailwind CSS classes for styling and React Native's built-in components for layout and interaction.

#### Component Props Interface

The component accepts a strongly-typed interface with the following properties:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `match` | `Match` | Yes | Complete match data object containing teams, status, and timing information |
| `onPress` | `(match: Match) => void` | No | Optional callback function for handling card press events |

#### Match Data Structure

The `Match` interface defines the complete match information structure:

```mermaid
classDiagram
class Match {
+number id
+number matchId
+string matchName
+Tournament tournament
+Team homeTeam
+Team awayTeam
+string matchStatus
+string matchDate
+string matchTime
+string startTime
+string timezone
+string venue
}
class Team {
+number id
+string name
+string shortName
+string logo
+string score
}
class Tournament {
+number id
+string name
+number sportId
+string sportName
}
Match --> Team : "homeTeam"
Match --> Team : "awayTeam"
Match --> Tournament : "tournament"
```

**Diagram sources**
- [match.ts](file://app/types/match.ts#L16-L29)

**Section sources**
- [MatchCard.tsx](file://app/components/match/MatchCard.tsx#L10-L13)
- [match.ts](file://app/types/match.ts#L1-L46)

## Architecture Overview

The Match Card component integrates with several supporting systems to provide a complete match viewing experience:

```mermaid
sequenceDiagram
participant User as "User"
participant Card as "MatchCard"
participant Timer as "CountdownTimer"
participant Hook as "useCountdown"
participant Utils as "Utility Functions"
participant API as "matchApi"
User->>Card : Tap Match Card
Card->>Card : handlePress()
Card->>Card : onPress(match)
Note over Card : Navigation Callback
Card->>Timer : Render CountdownTimer
Timer->>Hook : useCountdown(targetDate, timezone)
Hook->>Utils : getCountdownParts()
Utils-->>Hook : {days, hours, minutes, seconds}
Hook->>Utils : formatCountdown()
Utils-->>Hook : Formatted String
Hook-->>Timer : {display, isExpired}
Timer-->>Card : Render Timer Display
Card->>Utils : getStatusColor(matchStatus)
Utils-->>Card : Color Value
Card->>Utils : getStatusLabel(matchStatus)
Utils-->>Card : Status Text
Card->>Utils : formatMatchDate(startTime, timezone)
Utils-->>Card : Formatted Date
Card->>Utils : formatMatchTime(startTime, timezone)
Utils-->>Card : Formatted Time
```

**Diagram sources**
- [MatchCard.tsx](file://app/components/match/MatchCard.tsx#L15-L137)
- [CountdownTimer.tsx](file://app/components/match/CountdownTimer.tsx#L13-L38)
- [useCountdown.ts](file://app/hooks/useCountdown.ts#L10-L53)
- [dateUtils.ts](file://app/utils/dateUtils.ts#L22-L51)

## Detailed Component Analysis

### Card Layout Design

The Match Card implements a responsive three-section layout designed for optimal mobile viewing:

#### Header Section
- **Tournament Information**: Displays tournament name with truncation support for long names
- **Status Indicator**: Dynamic badge showing match status with color-coded background and text
- **Responsive Typography**: Uses `text-xs` for compact display on small screens

#### Main Content Area
- **Team Layout**: Two-column design with centered team information
- **Team Display**: Each team shows logo or initials with score display when available
- **Versus/Countdown**: Dynamic content switching between "VS" during live matches and countdown timer otherwise

#### Footer Section
- **Date and Time**: Shows formatted date and time with timezone consideration
- **Separator Dot**: Visual divider between date and time components

### Team Logo Loading and Fallback Mechanisms

The component implements robust fallback mechanisms for team logos:

```mermaid
flowchart TD
Start([Team Logo Request]) --> CheckLogo{"Has Team Logo?"}
CheckLogo --> |Yes| BuildURL["Build Media URL<br/>${MEDIA_BASE_URL}${logo}"]
CheckLogo --> |No| ShowInitials["Show Team Initials<br/>Fallback Circle"]
BuildURL --> LoadImage["Load Image with Expo Image"]
LoadImage --> ImageSuccess{"Image Loaded?"}
ImageSuccess --> |Yes| DisplayLogo["Display Team Logo"]
ImageSuccess --> |No| ShowInitials
ShowInitials --> InitialsCircle["Rounded Circle Background"]
InitialsCircle --> InitialsText["Team Initials Text"]
InitialsText --> DisplayInitials["Display Team Initials"]
DisplayLogo --> End([Complete])
DisplayInitials --> End
```

**Diagram sources**
- [MatchCard.tsx](file://app/components/match/MatchCard.tsx#L20-L79)
- [constants.ts](file://app/utils/constants.ts#L2-L2)

#### Logo Loading Features
- **Base URL Integration**: Uses `MEDIA_BASE_URL` constant for consistent media loading
- **Expo Image Optimization**: Implements smooth transitions and placeholder support
- **Fallback Strategy**: Automatic initials display when images fail to load
- **Performance Optimization**: Memoization prevents unnecessary re-renders

### Countdown Timer Integration

The CountdownTimer component provides real-time match scheduling information:

#### Timer States and Behavior

| State | Condition | Display |
|-------|-----------|---------|
| Live | `isMatchLive(matchStatus)` | Red pulsing dot + "LIVE" text |
| Expired | `isExpired` | "Started" text |
| Active | Countdown > 0 | Formatted countdown display |

#### Timer Update Mechanism

```mermaid
flowchart TD
Init([Timer Mount]) --> RAF["requestAnimationFrame(updateCountdown)"]
RAF --> CheckTime["Check 1-second Interval"]
CheckTime --> |1 second elapsed| CalcDiff["Calculate Time Difference"]
CalcDiff --> DiffPositive{"Difference > 0?"}
DiffPositive --> |No| MarkExpired["Set isExpired = true"]
DiffPositive --> |Yes| CalcParts["Calculate Days/Hours/Minutes/Seconds"]
CalcParts --> FormatDisplay["Format Countdown String"]
FormatDisplay --> UpdateState["Update React State"]
UpdateState --> RAF
MarkExpired --> UpdateState
RAF --> Cleanup["Cancel Animation Frame on Unmount"]
```

**Diagram sources**
- [useCountdown.ts](file://app/hooks/useCountdown.ts#L17-L40)
- [CountdownTimer.tsx](file://app/components/match/CountdownTimer.tsx#L13-L38)

**Section sources**
- [MatchCard.tsx](file://app/components/match/MatchCard.tsx#L83-L92)
- [CountdownTimer.tsx](file://app/components/match/CountdownTimer.tsx#L13-L38)
- [useCountdown.ts](file://app/hooks/useCountdown.ts#L1-L54)

### Responsive Design Patterns

The component implements comprehensive responsive design for various screen sizes and orientations:

#### Screen Size Adaptations
- **Mobile First**: Base styles optimized for small screens
- **Flexible Layout**: Uses flexbox for adaptive team positioning
- **Typography Scaling**: Responsive text sizing with `text-sm` and `text-xs`
- **Padding Adjustments**: Consistent spacing with `mx-4 my-2` margins

#### Orientation Considerations
- **Portrait Mode**: Optimized for vertical scrolling
- **Landscape Mode**: Maintains readable text sizes and logo proportions
- **Safe Area Support**: Automatic margin adjustments for device notches

### Accessibility Implementation

The component incorporates several accessibility features:

#### Touch Target Sizing
- **Minimum 44px**: Pressable area ensures adequate touch targets
- **Visual Feedback**: Shadow and elevation provide tactile indication
- **Focus Management**: Proper component hierarchy for screen readers

#### Visual Accessibility
- **Color Contrast**: Sufficient contrast ratios for text and backgrounds
- **Text Truncation**: Prevents overflow with ellipsis for long team names
- **Alternative Text**: Team initials serve as accessible fallback

### Integration with MatchList Component

The Match Card works seamlessly within the broader match listing system:

```mermaid
graph LR
subgraph "MatchList Container"
ML[MatchList.tsx]
FL[FlatList]
end
subgraph "Match Card System"
MC[MatchCard]
CT[CountdownTimer]
UC[useCountdown]
end
subgraph "Data Layer"
UM[useMatches]
MA[matchApi]
TR[match.ts]
end
ML --> FL
FL --> MC
MC --> CT
CT --> UC
ML --> UM
UM --> MA
MC --> TR
CT --> TR
```

**Diagram sources**
- [MatchList.tsx](file://app/components/match/MatchList.tsx#L27-L40)
- [MatchCard.tsx](file://app/components/match/MatchCard.tsx#L15-L18)
- [useMatches.ts](file://app/hooks/useMatches.ts#L13-L55)

**Section sources**
- [MatchList.tsx](file://app/components/match/MatchList.tsx#L27-L40)
- [MatchSkeleton.tsx](file://app/components/match/MatchSkeleton.tsx#L4-L56)

## Dependency Analysis

The Match Card component has well-defined dependencies that promote maintainability and testability:

```mermaid
graph TD
subgraph "External Dependencies"
EX[expo-image]
RN[react-native]
TS[typescript]
end
subgraph "Internal Dependencies"
MC[MatchCard]
CT[CountdownTimer]
UC[useCountdown]
DU[dateUtils]
FM[formatters]
CN[constants]
MT[match types]
end
subgraph "Utility Dependencies"
DF[date-fns]
TZ[date-fns-tz]
end
MC --> EX
MC --> RN
MC --> CT
MC --> UC
MC --> DU
MC --> FM
MC --> CN
MC --> MT
CT --> UC
CT --> DU
CT --> CN
UC --> DU
UC --> DF
UC --> TZ
DU --> DF
DU --> TZ
```

**Diagram sources**
- [MatchCard.tsx](file://app/components/match/MatchCard.tsx#L1-L8)
- [CountdownTimer.tsx](file://app/components/match/CountdownTimer.tsx#L1-L5)
- [useCountdown.ts](file://app/hooks/useCountdown.ts#L1-L2)

### Component Coupling Analysis

The component maintains low coupling through:
- **Interface-based Prop Passing**: Strongly typed props minimize direct implementation dependencies
- **Utility Function Separation**: Business logic isolated in dedicated utility modules
- **Hook Abstraction**: Complex state management encapsulated in reusable hooks
- **Constant Centralization**: Configuration values managed in single constants file

**Section sources**
- [MatchCard.tsx](file://app/components/match/MatchCard.tsx#L1-L8)
- [CountdownTimer.tsx](file://app/components/match/CountdownTimer.tsx#L1-L5)
- [useCountdown.ts](file://app/hooks/useCountdown.ts#L1-L2)

## Performance Considerations

### Optimization Strategies

The component implements several performance optimization techniques:

#### Memoization
- **Component Level**: `React.memo()` prevents unnecessary re-renders
- **Callback Optimization**: `useCallback` in parent components reduces prop changes
- **Stable References**: Consistent key extraction prevents list item remounting

#### Rendering Efficiency
- **FlatList Integration**: Efficient virtualized rendering for large match lists
- **Skeleton Loading**: Placeholder components improve perceived performance
- **Conditional Rendering**: Dynamic content switching based on match status

#### Memory Management
- **Animation Cleanup**: Proper cancellation of animation frames on unmount
- **Query Caching**: React Query manages data caching and garbage collection
- **Image Optimization**: Expo Image handles efficient image loading and caching

### Best Practices for Implementation

1. **Prop Stability**: Ensure match objects maintain stable references when possible
2. **Key Extraction**: Use unique combination keys for match list items
3. **State Management**: Leverage React Query for efficient data fetching
4. **Error Boundaries**: Implement proper error handling for network failures

## Troubleshooting Guide

### Common Issues and Solutions

#### Team Logo Loading Failures
**Problem**: Team logos not displaying despite valid URLs
**Solution**: Verify `MEDIA_BASE_URL` configuration and network connectivity
**Prevention**: Implement proper error boundaries and fallback mechanisms

#### Countdown Timer Synchronization
**Problem**: Timer displays incorrect time or stops updating
**Solution**: Check timezone configuration and ensure proper date parsing
**Prevention**: Validate target dates and implement proper cleanup in hooks

#### Performance Degradation
**Problem**: Slow rendering in large match lists
**Solution**: Optimize FlatList configuration and implement proper pagination
**Prevention**: Use memoization and avoid unnecessary prop drilling

#### Accessibility Issues
**Problem**: Poor touch target sizing or insufficient color contrast
**Solution**: Review component dimensions and color contrast ratios
**Prevention**: Test with accessibility tools and screen readers

**Section sources**
- [MatchCard.tsx](file://app/components/match/MatchCard.tsx#L54-L60)
- [useCountdown.ts](file://app/hooks/useCountdown.ts#L42-L50)
- [MatchList.tsx](file://app/components/match/MatchList.tsx#L89-L113)

## Conclusion

The Match Card component represents a well-architected solution for displaying match information in a mobile-first environment. Its implementation demonstrates excellent separation of concerns through utility functions, hooks, and TypeScript interfaces. The component successfully balances visual appeal with performance optimization while maintaining accessibility standards.

Key strengths include:
- **Type Safety**: Comprehensive TypeScript implementation prevents runtime errors
- **Performance**: Strategic memoization and efficient rendering patterns
- **Accessibility**: Thoughtful design considerations for diverse user needs
- **Maintainability**: Clear separation of concerns and modular architecture

The component serves as an excellent foundation for sports applications requiring dynamic match display with real-time updates and responsive design capabilities.