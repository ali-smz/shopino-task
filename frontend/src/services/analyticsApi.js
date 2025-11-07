/**
 * Analytics API service for analytics-related operations.
 * Follows Single Responsibility Principle by separating analytics API calls.
 */

import api from "./api";

/**
 * Analytics API service
 */
export const analyticsApi = {
  /**
   * Get analytics for a link.
   * @param {string} slug - The link slug
   * @returns {Promise<Object>} Analytics data
   */
  getAnalytics: async (slug) => {
    const response = await api.get(`/api/analytics/${slug}/`);
    return response.data;
  },
};
