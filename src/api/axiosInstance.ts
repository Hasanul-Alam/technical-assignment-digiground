import { ApiError } from "@/types/api.types";
import { API_BASE_URL } from "@/utils/constants";
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

/**
 * Create axios instance with default configuration
 */
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/**
 * Request interceptor
 */
axiosInstance.interceptors.request.use(
  (config: any) => {
    // Log request in development
    if (__DEV__) {
      console.log(
        `[API Request] ${config.method?.toUpperCase()} ${config.url}`,
        config.params,
      );
    }
    return config;
  },
  (error: AxiosError) => {
    if (__DEV__) {
      console.error("[API Request Error]", error);
    }
    return Promise.reject(error);
  },
);

/**
 * Response interceptor
 */
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log response in development
    if (__DEV__) {
      console.log(`[API Response] ${response.config.url}`, response.status);
    }
    return response;
  },
  (error: AxiosError) => {
    const apiError: ApiError = {
      message: "An unexpected error occurred",
      status: 500,
    };

    if (error.response) {
      // Server responded with error status
      apiError.status = error.response.status;
      apiError.message = error.response.data?.message || error.message;

      if (__DEV__) {
        console.error("[API Response Error]", {
          url: error.config?.url,
          status: error.response.status,
          data: error.response.data,
        });
      }
    } else if (error.request) {
      // Request made but no response
      apiError.message = "Network error. Please check your connection.";
      apiError.status = 0;

      if (__DEV__) {
        console.error("[API Network Error]", error.message);
      }
    } else {
      // Error in request configuration
      apiError.message = error.message;

      if (__DEV__) {
        console.error("[API Config Error]", error.message);
      }
    }

    return Promise.reject(apiError);
  },
);

export default axiosInstance;
