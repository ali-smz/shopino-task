/**
 * Custom hook for managing analytics data.
 * Follows Single Responsibility Principle by encapsulating analytics-related logic.
 */

import { useState, useEffect, useCallback } from "react";
import { analyticsApi } from "../services/analyticsApi";

/**
 * Custom hook for fetching analytics data.
 * @param {string} slug - The link slug
 * @param {boolean} enabled - Whether to fetch analytics on mount
 * @returns {Object} Analytics state and operations
 */
export const useAnalytics = (slug, enabled = true) => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch analytics data for a link.
   */
  const fetchAnalytics = useCallback(async () => {
    if (!slug) {
      setError("Slug is required");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await analyticsApi.getAnalytics(slug);
      setAnalytics(data);
    } catch (err) {
      setError(err.message || "Failed to fetch analytics");
      setAnalytics(null);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    if (enabled && slug) {
      fetchAnalytics();
    }
  }, [enabled, slug]);

  return {
    analytics,
    loading,
    error,
    fetchAnalytics,
  };
};
