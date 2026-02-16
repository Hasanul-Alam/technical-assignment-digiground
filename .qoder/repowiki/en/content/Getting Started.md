# Getting Started

<cite>
**Referenced Files in This Document**
- [package.json](file://package.json)
- [README.md](file://README.md)
- [app.json](file://app.json)
- [metro.config.js](file://metro.config.js)
- [babel.config.js](file://babel.config.js)
- [tsconfig.json](file://tsconfig.json)
- [tailwind.config.js](file://tailwind.config.js)
- [global.css](file://global.css)
- [app/index.tsx](file://app/index.tsx)
- [app/_layout.tsx](file://app/_layout.tsx)
- [app/context/FilterContext.tsx](file://app/context/FilterContext.tsx)
- [app/hooks/useMatches.ts](file://app/hooks/useMatches.ts)
- [app/services/matchApi.ts](file://app/services/matchApi.ts)
- [app/utils/constants.ts](file://app/utils/constants.ts)
</cite>

## Table of Contents
1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Running the Application](#running-the-application)
5. [Project Structure](#project-structure)
6. [Environment Verification](#environment-verification)
7. [Troubleshooting](#troubleshooting)
8. [Initial Exploration](#initial-exploration)
9. [Conclusion](#conclusion)

## Introduction
This guide helps you set up and run the React Native sports match application locally. It covers prerequisites, installation, platform-specific running instructions, environment verification, and initial project exploration. The app uses Expo for cross-platform development, React Query for data fetching, and NativeWind (Tailwind CSS) for styling.

## Prerequisites
Before installing the project, ensure your development environment meets the following requirements:

- Node.js: Version 18 or higher
- Package manager: npm or yarn
- Expo CLI: Installed globally or run via npx
- Platform-specific tools:
  - iOS Simulator: macOS with Xcode and iOS Simulator
  - Android Emulator: Android Studio AVD or connected Android device
- Optional: Physical device with the Expo Go app installed

These requirements are confirmed by the project’s documentation and configuration files.

**Section sources**
- [README.md](file://README.md#L24-L29)
- [package.json](file://package.json#L13-L49)

## Installation
Follow these steps to install and run the project locally:

1. **Clone the repository**
   - Use your preferred Git client to clone the repository and navigate into the project directory.

2. **Install dependencies**
   - Run your package manager to install all project dependencies. The scripts section defines commands for starting the app on different platforms.

3. **Start the development server**
   - Launch the Expo development server using the provided script or npx command.

4. **Run on your preferred platform**
   - Choose one of the following options:
     - Press i for iOS Simulator
     - Press a for Android Emulator
     - Scan the QR code with the Expo Go app on a physical device

These steps align with the project’s documented workflow and scripts.

**Section sources**
- [README.md](file://README.md#L31-L53)
- [package.json](file://package.json#L5-L12)

## Running the Application
After starting the development server, you can target different platforms:

- **iOS Simulator**: Press i or run the iOS script
- **Android Emulator**: Press a or run the Android script
- **Web**: Run the web script
- **Physical Device**: Open the Expo Go app and scan the QR code displayed in the terminal or browser

The project configuration enables platform-specific builds and web bundling.

**Section sources**
- [README.md](file://README.md#L49-L52)
- [package.json](file://package.json#L5-L12)
- [app.json](file://app.json#L24-L28)

## Project Structure
The project follows a modular structure organized by features and concerns:

- app/: Main application code
  - components/: Reusable UI components (match cards, filters, loading states)
  - hooks/: Custom React hooks for data fetching and state logic
  - services/: API clients and service utilities
  - types/: TypeScript type definitions
  - utils/: Constants, formatters, and helpers
  - context/: React Context providers for global state
  - _layout.tsx: Root layout with providers and navigation setup
  - index.tsx: Entry screen for the match list
- assets/: Static assets (images, icons)
- Configuration files: package.json, app.json, metro.config.js, babel.config.js, tsconfig.json, tailwind.config.js, global.css

This structure supports scalable development and clear separation of concerns.

**Section sources**
- [README.md](file://README.md#L54-L92)
- [app/index.tsx](file://app/index.tsx#L1-L108)
- [app/_layout.tsx](file://app/_layout.tsx#L1-L35)

## Environment Verification
Verify your environment by checking the following:

- Node.js and npm/yarn versions meet the prerequisites
- Expo CLI is available (either globally or via npx)
- Metro bundler starts without errors
- Platform emulators are running and accessible
- The app opens in the chosen platform (iOS Simulator, Android Emulator, or web)

If you encounter issues, refer to the Troubleshooting section below.

**Section sources**
- [README.md](file://README.md#L24-L29)
- [package.json](file://package.json#L5-L12)

## Troubleshooting
Common setup issues and resolutions:

- **Metro bundler fails to start**
  - Clear caches and reinstall dependencies
  - Verify Metro configuration and Babel preset settings
  - Ensure the correct Node.js version is active

- **iOS Simulator not launching**
  - Confirm Xcode and Simulator are installed and accessible
  - Restart the iOS Simulator and try again
  - Check that the project’s iOS configuration is valid

- **Android Emulator not responding**
  - Verify Android Studio and AVD are configured
  - Try restarting the emulator or creating a new virtual device
  - Ensure the project’s Android configuration is valid

- **Web build issues**
  - Confirm the web bundler setting in app.json
  - Check Tailwind and NativeWind configuration files

- **TypeScript or ESLint errors**
  - Review tsconfig.json and ESLint configuration
  - Ensure all paths and compiler options are correct

- **Network/API issues**
  - Verify API endpoints and base URLs
  - Check network connectivity and CORS settings

**Section sources**
- [app.json](file://app.json#L24-L28)
- [babel.config.js](file://babel.config.js#L1-L10)
- [metro.config.js](file://metro.config.js#L1-L7)
- [tsconfig.json](file://tsconfig.json#L1-L18)
- [tailwind.config.js](file://tailwind.config.js#L1-L21)
- [app/utils/constants.ts](file://app/utils/constants.ts#L1-L5)

## Initial Exploration
Explore the application’s core functionality and architecture:

- Entry point and layout
  - The root layout sets up providers for React Query, Bottom Sheet modals, gesture handling, safe areas, and the filter context. It also configures the navigation stack.
  - The main screen renders the match list, filter controls, and bottom sheet filter UI.

- Data fetching and state
  - The custom hook integrates React Query for infinite scrolling and caching. It constructs query keys and parameters based on filters and pagination.
  - The API service builds query parameters and calls the backend endpoint for match lists.

- Styling and theming
  - Global styles are defined via Tailwind CSS with NativeWind. The Tailwind configuration specifies content paths and custom colors.

- Filtering and context
  - The filter context manages selected tournament IDs, pending selections, and applies filters. It exposes utilities to toggle, select, clear, and apply filters.

- Types and constants
  - Type definitions for match and tournament data, along with constants for API base URLs, media base URLs, default timezone, and default page size, centralize configuration.

**Section sources**
- [app/_layout.tsx](file://app/_layout.tsx#L1-L35)
- [app/index.tsx](file://app/index.tsx#L1-L108)
- [app/hooks/useMatches.ts](file://app/hooks/useMatches.ts#L1-L56)
- [app/services/matchApi.ts](file://app/services/matchApi.ts#L1-L36)
- [global.css](file://global.css#L1-L4)
- [tailwind.config.js](file://tailwind.config.js#L1-L21)
- [app/context/FilterContext.tsx](file://app/context/FilterContext.tsx#L1-L72)
- [app/utils/constants.ts](file://app/utils/constants.ts#L1-L38)

## Conclusion
You now have the essential steps to install, run, and explore the React Native sports match application. Use the platform-specific instructions to launch on iOS, Android, or web, and leverage the troubleshooting section for common issues. Dive into the project structure and core components to understand how data flows, styling is applied, and filtering is implemented.