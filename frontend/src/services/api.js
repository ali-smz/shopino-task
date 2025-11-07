/**
 * Base API client for making HTTP requests.
 * Follows Single Responsibility Principle by centralizing API communication.
 * Follows Dependency Inversion Principle by providing a base client that can be extended.
 */

import axios from "axios";
import { API_CONFIG } from "../constants/config";

/**
 * Create axios instance with base configuration
 */
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding common headers or handling auth
api.interceptors.request.use(
  (config) => {
    // Add any common request modifications here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors here
    if (error.response) {
      // Server responded with error status
      const message =
        error.response.data?.detail ||
        error.response.data?.message ||
        "An error occurred";
      return Promise.reject(new Error(message));
    } else if (error.request) {
      // Request made but no response received
      return Promise.reject(
        new Error("Network error. Please check your connection.")
      );
    } else {
      // Something else happened
      return Promise.reject(
        new Error(error.message || "An unexpected error occurred")
      );
    }
  }
);

export default api;
