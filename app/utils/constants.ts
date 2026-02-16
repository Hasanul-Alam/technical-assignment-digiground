export const API_BASE_URL = 'https://au.testing.smartb.com.au/api';
export const MEDIA_BASE_URL = 'https://media.smartb.com.au/';
export const DEFAULT_TIMEZONE = 'Australia/Sydney';
export const DEFAULT_PAGE_SIZE = 20;

export const COLORS = {
  primary: '#22c065',
  primaryDark: '#1a9c4f',
  secondary: '#f5f5f5',
  background: '#ffffff',
  surface: '#f8f9fa',
  text: '#1a1a1a',
  textSecondary: '#666666',
  textMuted: '#999999',
  border: '#e5e5e5',
  error: '#dc2626',
  success: '#22c065',
  live: '#ef4444',
  upcoming: '#f59e0b',
  completed: '#6b7280',
} as const;

export const SPORT_COLORS: Record<number, string> = {
  4: '#22c065',  // Cricket - Green
  8: '#3b82f6',  // Soccer - Blue
  9: '#f59e0b',  // Australian Rules - Amber
  10: '#f97316', // Basketball - Orange
  12: '#8b5cf6', // Rugby League - Purple
};

export const SPORT_ICONS: Record<number, string> = {
  4: 'cricket',
  8: 'soccer',
  9: 'football',
  10: 'basketball',
  12: 'rugby',
};
