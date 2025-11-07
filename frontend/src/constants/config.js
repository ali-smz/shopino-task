/**
 * Application configuration constants.
 * Centralizes configuration to follow Single Responsibility Principle.
 */

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  ENDPOINTS: {
    LINKS: '/api/links/',
    SHORTEN: '/api/shorten/',
    ANALYTICS: '/api/analytics',
  },
};

export const APP_CONFIG = {
  SHORT_URL_BASE: import.meta.env.VITE_SHORT_URL_BASE || 'http://localhost:8000',
};

