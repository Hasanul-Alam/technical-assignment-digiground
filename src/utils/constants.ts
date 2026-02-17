export const API_BASE_URL = "https://au.testing.smartb.com.au/soc-api/sports";
export const MEDIA_BASE_URL = "https://media.smartb.com.au/";

export const DEFAULT_TIMEZONE = "Australia/Sydney";
export const DEFAULT_PAGE_SIZE = 20;
export const INITIAL_OFFSET = 0;

export const SPORTS = {
  CRICKET: 4,
  SOCCER: 8,
  AUSTRALIAN_RULES: 9,
  BASKETBALL: 10,
  RUGBY_LEAGUE: 12,
} as const;

export const SPORT_NAMES: Record<number, string> = {
  [SPORTS.CRICKET]: "Cricket",
  [SPORTS.SOCCER]: "Soccer",
  [SPORTS.AUSTRALIAN_RULES]: "Australian Rules",
  [SPORTS.BASKETBALL]: "Basketball",
  [SPORTS.RUGBY_LEAGUE]: "Rugby League",
};

export const MATCH_STATUS = {
  ALL: "all",
  UPCOMING: "upcoming",
  LIVE: "live",
  COMPLETED: "completed",
} as const;

export const COUNTDOWN_UPDATE_INTERVAL = 1000; // 1 second
export const STALE_TIME = 5 * 60 * 1000; // 5 minutes
export const CACHE_TIME = 10 * 60 * 1000; // 10 minutes

export const ANIMATION_DURATION = 300;
export const DEBOUNCE_DELAY = 300;

export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your connection.",
  SERVER_ERROR: "Server error. Please try again later.",
  NO_DATA: "No matches found.",
  LOAD_MORE_ERROR: "Failed to load more matches.",
  FILTER_ERROR: "Failed to load filters.",
} as const;
