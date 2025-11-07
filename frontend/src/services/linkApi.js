/**
 * Link API service for link-related operations.
 * Follows Single Responsibility Principle by separating link API calls.
 */

import api from "./api";

/**
 * Link API service
 */
export const linkApi = {
  /**
   * Get all links.
   * @returns {Promise<Object>} Response data containing links
   */
  getAllLinks: async () => {
    const response = await api.get("/api/links/");
    return response.data;
  },

  /**
   * Get a single link by slug.
   * @param {string} slug - The link slug
   * @returns {Promise<Object>} Link data
   */
  getLinkBySlug: async (slug) => {
    const response = await api.get(`/api/links/${slug}/`);
    return response.data;
  },

  /**
   * Create a new shortened link.
   * @param {Object} linkData - Link data containing original_url
   * @returns {Promise<Object>} Created link data
   */
  createLink: async (linkData) => {
    const response = await api.post("/api/shorten/", linkData);
    return response.data;
  },
};
