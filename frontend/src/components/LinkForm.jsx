/**
 * Link form component for URL shortening.
 * Follows Single Responsibility Principle - only handles form input and submission.
 */

import { useState } from "react";

/**
 * LinkForm component for URL input and submission.
 * @param {Object} props - Component props
 * @param {Function} props.onSubmit - Callback when form is submitted with URL string
 * @param {boolean} [props.loading=false] - Loading state
 * @param {string|null} [props.error=null] - Error message to display
 */
const LinkForm = ({ onSubmit, loading = false, error = null }) => {
  if (typeof onSubmit !== "function") {
    throw new Error(
      "LinkForm: onSubmit prop is required and must be a function"
    );
  }

  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    onSubmit(url.trim());
    setUrl("");
  };

  return (
    <div>
      <form className="flex flex-col sm:flex-row gap-3" onSubmit={handleSubmit}>
        <input
          type="url"
          placeholder="Enter your URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !url.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Shortening..." : "Shorten"}
        </button>
      </form>
      {error && (
        <p className="text-red-500 mt-2 text-sm" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default LinkForm;
