import axios, { AxiosError, AxiosInstance } from 'axios';
import { API_BASE_URL } from '../utils/constants';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const responseData = error.response?.data as { message?: string } | undefined;
    const errorMessage = responseData?.message || error.message || 'An error occurred';
    const statusCode = error.response?.status;
    
    console.error('API Error:', { message: errorMessage, status: statusCode, url: error.config?.url });
    
    return Promise.reject({
      message: errorMessage,
      status: statusCode,
      code: error.code,
    });
  }
);

export default apiClient;
