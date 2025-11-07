/**
 * Links list component for displaying all shortened links.
 * Follows Single Responsibility Principle - only handles display of links list.
 */

import LinkItem from "./LinkItem";

/**
 * LinksList component for displaying a list of links.
 * @param {Object} props - Component props
 * @param {Array<Object>} [props.links=[]] - Array of link objects
 * @param {boolean} [props.loading=false] - Loading state
 */
const LinksList = ({ links = [], loading = false }) => {
  if (!Array.isArray(links)) {
    console.warn("LinksList: links prop must be an array");
    return null;
  }
  if (loading) {
    return (
      <div className="mt-6" role="status" aria-live="polite">
        <p className="text-gray-500">Loading links...</p>
      </div>
    );
  }

  if (links.length === 0) {
    return (
      <div className="mt-6">
        <p className="text-gray-500">No links created yet.</p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h2 className="font-bold mb-4 text-lg">All Links</h2>
      <ul className="space-y-4">
        {links.map((link) => (
          <LinkItem key={link.slug} link={link} />
        ))}
      </ul>
    </div>
  );
};

export default LinksList;
