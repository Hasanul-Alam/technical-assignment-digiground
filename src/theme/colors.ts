export const colors = {
  primary: {
    main: "#4F46E5",
    dark: "#4338CA",
    light: "#6366F1",
    lighter: "#818CF8",
  },
  secondary: {
    main: "#10B981",
    dark: "#059669",
    light: "#34D399",
  },
  background: {
    primary: "#FFFFFF",
    secondary: "#F9FAFB",
    tertiary: "#F3F4F6",
    dark: "#1F2937",
  },
  text: {
    primary: "#111827",
    secondary: "#6B7280",
    tertiary: "#9CA3AF",
    white: "#FFFFFF",
  },
  border: {
    main: "#E5E7EB",
    light: "#F3F4F6",
    dark: "#D1D5DB",
  },
  status: {
    error: "#EF4444",
    success: "#10B981",
    warning: "#F59E0B",
    info: "#3B82F6",
  },
  overlay: {
    light: "rgba(0, 0, 0, 0.3)",
    medium: "rgba(0, 0, 0, 0.5)",
    dark: "rgba(0, 0, 0, 0.7)",
  },
} as const;

export type ColorTheme = typeof colors;
