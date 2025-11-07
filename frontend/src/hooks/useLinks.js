/**
 * Custom hook for managing links.
 * Follows Single Responsibility Principle by encapsulating link-related logic.
 */

import { useState, useEffect, useCallback } from "react";
import { linkApi } from "../services/linkApi";

/**
 * Custom hook for fetching and managing links.
 * @returns {Object} Links state and operations
 */
export const useLinks = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetch all links from the API.
   */
  const fetchLinks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await linkApi.getAllLinks();
      setLinks(Array.isArray(data.results) ? data.results : data);
    } catch (err) {
      setError(err.message || "Failed to fetch links");
      setLinks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Create a new shortened link.
   * @param {string} originalUrl - The URL to shorten
   * @returns {Promise<Object>} Created link data
   */
  const createLink = useCallback(async (originalUrl) => {
    try {
      setError(null);
      const data = await linkApi.createLink({ original_url: originalUrl });
      setLinks((prev) => [data, ...prev]);
      return data;
    } catch (err) {
      const errorMessage = err.message || "Failed to shorten URL";
      setError(errorMessage);
      throw err;
    }
  }, []);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  return {
    links,
    loading,
    error,
    fetchLinks,
    createLink,
  };
};
