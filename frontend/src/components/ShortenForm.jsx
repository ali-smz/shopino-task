/**
 * Main container component for URL shortening functionality.
 * Follows Single Responsibility Principle by orchestrating child components.
 */

import { useState, useCallback } from "react";
import { useLinks } from "../hooks/useLinks";
import LinkForm from "./LinkForm";
import LinksList from "./LinksList";

/**
 * ShortenForm component - main container for URL shortening.
 * Orchestrates form submission and links display.
 * Follows Single Responsibility Principle by coordinating child components.
 */
const ShortenForm = () => {
  const { links, loading, error, createLink } = useLinks();
  const [submitError, setSubmitError] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleSubmit = useCallback(
    async (url) => {
      try {
        setSubmitLoading(true);
        setSubmitError(null);
        await createLink(url);
      } catch (err) {
        setSubmitError(err.message || "Failed to shorten URL");
      } finally {
        setSubmitLoading(false);
      }
    },
    [createLink]
  );

  return (
    <div>
      <LinkForm
        onSubmit={handleSubmit}
        loading={submitLoading}
        error={submitError || error}
      />
      <LinksList links={links} loading={loading} />
    </div>
  );
};

export default ShortenForm;
