import { TournamentSearchParams } from "@/types/api.types";
import { Sport, Tournament } from "@/types/tournament.types";
import axiosInstance from "./axiosInstance";

/**
 * Fetch all sports and tournaments
 */
export const fetchSportsAndTournaments = async (
  params?: TournamentSearchParams,
): Promise<Sport[]> => {
  try {
    const response = await axiosInstance.get<{ data: Sport[] }>(
      "/AllSportsAndLeagues",
      {
        params: {
          ...(params?.search && { search: params.search }),
          ...(params?.limit && { limit: params.limit }),
          ...(params?.offset && { offset: params.offset }),
        },
      },
    );

    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching sports and tournaments:", error);
    throw error;
  }
};

/**
 * Search tournaments by sport and query
 */
export const searchTournaments = async (
  sportId: number,
  query: string,
  limit: number = 10,
): Promise<Tournament[]> => {
  try {
    const searchParam = `${sportId}[${query}]`;
    const response = await axiosInstance.get<{ data: Sport[] }>(
      "/AllSportsAndLeagues",
      {
        params: {
          search: searchParam,
          limit,
        },
      },
    );

    const sports = response.data.data || [];
    const sport = sports.find((s) => s.id === sportId);

    return sport?.tournaments || [];
  } catch (error) {
    console.error("Error searching tournaments:", error);
    throw error;
  }
};

/**
 * Fetch tournaments for specific sports
 */
export const fetchTournamentsBySports = async (
  sportIds: number[],
  limit: number = 50,
): Promise<Sport[]> => {
  try {
    // For initial load without search, we just fetch all
    const response = await axiosInstance.get<{ data: Sport[] }>(
      "/AllSportsAndLeagues",
      {
        params: {
          limit,
        },
      },
    );

    const allSports = response.data.data || [];

    // Filter only the sports we support
    return allSports.filter((sport) => sportIds.includes(sport.id));
  } catch (error) {
    console.error("Error fetching tournaments by sports:", error);
    throw error;
  }
};
