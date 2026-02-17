/**
 * Format team name for display
 */
export const formatTeamName = (
  name: string,
  maxLength: number = 20,
): string => {
  if (name.length <= maxLength) return name;
  return `${name.substring(0, maxLength - 3)}...`;
};

/**
 * Get image URL with base URL
 */
export const getImageUrl = (path: string, baseUrl: string): string => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  return `${baseUrl}${path.startsWith("/") ? path.slice(1) : path}`;
};

/**
 * Format tournament IDs for API
 */
export const formatTournamentIds = (ids: number[]): string => {
  return ids.join(",");
};

/**
 * Format score display
 */
export const formatScore = (score?: number): string => {
  return score !== undefined && score !== null ? score.toString() : "-";
};

/**
 * Truncate text
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Capitalize first letter
 */
export const capitalizeFirst = (text: string): string => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
};

/**
 * Format number with commas
 */
export const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

/**
 * Remove duplicates from array
 */
export const removeDuplicates = <T extends { id: number }>(array: T[]): T[] => {
  const seen = new Set<number>();
  return array.filter((item) => {
    if (seen.has(item.id)) {
      return false;
    }
    seen.add(item.id);
    return true;
  });
};

/**
 * Safely parse JSON
 */
export const safeJSONParse = <T>(json: string, fallback: T): T => {
  try {
    return JSON.parse(json);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return fallback;
  }
};
