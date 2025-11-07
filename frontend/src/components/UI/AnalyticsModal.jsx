/**
 * Analytics modal component for displaying detailed analytics.
 * Follows Single Responsibility Principle by only handling modal display.
 */

/**
 * AnalyticsModal component for displaying detailed analytics in a modal.
 * @param {Object} props - Component props
 * @param {boolean} props.open - Whether the modal is open
 * @param {Function} props.onClose - Callback when modal is closed
 * @param {Object|null} props.analytics - Analytics data object
 * @param {boolean} props.loading - Whether analytics are loading
 * @param {string|null} props.error - Error message if any
 */
const AnalyticsModal = ({
  open,
  onClose,
  analytics,
  loading = false,
  error = null,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Escape") onClose();
        }}
        aria-label="Close modal"
      />

      <div className="bg-white p-6 rounded-lg w-full max-w-lg relative z-10 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-600 hover:text-black transition text-4xl leading-none"
          type="button"
          aria-label="Close modal"
        >
          ×
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">Link Information</h2>

        {loading && (
          <div className="text-center py-8">
            <p className="text-gray-500">Loading analytics...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <p className="text-red-500">Error: {error}</p>
          </div>
        )}

        {!loading && !error && analytics && (
          <>
            <div className="flex gap-1 mb-2">
              <p className="font-semibold">Link:</p>
              <p className="text-blue-600 break-all">
                {analytics.original_url}
              </p>
            </div>

            <div className="flex gap-1 mb-4">
              <p className="font-semibold">Total Clicks:</p>
              <p>{analytics.total_clicks}</p>
            </div>

            <h3 className="font-bold mb-2 text-center text-xl">
              Click Details
            </h3>

            <div className="max-h-64 overflow-y-auto border p-3 rounded-lg bg-gray-50">
              {analytics.clicks && analytics.clicks.length > 0 ? (
                analytics.clicks.map((click, index) => (
                  <div
                    key={index}
                    className="mb-4 p-2 border-b last:border-b-0"
                  >
                    <p>
                      <strong>IP:</strong> {click.ip_address}
                    </p>
                    <p>
                      <strong>User Agent:</strong> {click.user_agent}
                    </p>
                    <p>
                      <strong>Time:</strong>{" "}
                      {new Date(click.timestamp).toLocaleString()}
                    </p>
                    {click.referrer && (
                      <p>
                        <strong>Referrer:</strong> {click.referrer}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No clicks recorded...</p>
              )}
            </div>
          </>
        )}

        <button
          onClick={onClose}
          className="mt-4 w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          type="button"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AnalyticsModal;
