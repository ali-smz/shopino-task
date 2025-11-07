/**
 * Analytics component for displaying link analytics.
 * Follows Single Responsibility Principle by focusing on analytics display.
 */

import { useState } from "react";
import { useAnalytics } from "../hooks/useAnalytics";
import AnalyticsModal from "./UI/AnalyticsModal";

/**
 * Analytics component for displaying link analytics.
 * @param {Object} props - Component props
 * @param {string} props.slug - The link slug
 */
const Analytics = ({ slug }) => {
  const { analytics, loading, error, fetchAnalytics } = useAnalytics(
    slug,
    true
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);

  const handleOpenModal = async () => {
    try {
      setIsLoadingModal(true);
      if (!analytics || error) {
        await fetchAnalytics();
      }
      setModalOpen(true);
    } catch (err) {
      console.error("Failed to fetch analytics for modal:", err);
    } finally {
      setIsLoadingModal(false);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="mt-4 p-3 bg-white border border-gray-200 rounded-lg">
      {loading && !analytics ? (
        <p className="text-gray-500 text-sm">Loading analytics...</p>
      ) : error ? (
        <p className="text-red-500 text-sm">Failed to load analytics</p>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <p className="font-medium">
              Total Clicks:{" "}
              <span className="text-blue-600">
                {analytics?.total_clicks ?? 0}
              </span>
            </p>
            <button
              onClick={handleOpenModal}
              disabled={isLoadingModal}
              className="text-blue-500 underline mb-2 hover:text-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              type="button"
            >
              {isLoadingModal ? "Loading..." : "more information >"}
            </button>
          </div>
          {analytics && (
            <p className="text-gray-600 break-all mt-2">
              <span className="font-medium">Original URL: </span>
              {analytics.original_url}
            </p>
          )}
        </>
      )}
      <AnalyticsModal
        open={modalOpen}
        onClose={handleCloseModal}
        analytics={analytics}
        loading={isLoadingModal}
        error={error}
      />
    </div>
  );
};

export default Analytics;
