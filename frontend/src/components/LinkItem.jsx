/**
 * Link item component for displaying a single shortened link.
 * Follows Single Responsibility Principle - only handles display of a single link.
 */

import Analytics from "./Analytics";
import { APP_CONFIG } from "../constants/config";

/**
 * LinkItem component for displaying a single link.
 * @param {Object} props - Component props
 * @param {Object} props.link - Link object with slug, original_url, etc.
 * @param {string} props.link.slug - The unique slug for the shortened URL
 * @param {string} props.link.original_url - The original URL
 * @param {number} [props.link.click_count=0] - Number of clicks on the link
 */
const LinkItem = ({ link }) => {
  if (!link || !link.slug) {
    console.warn(
      "LinkItem: link prop is required and must have a slug property"
    );
    return null;
  }

  const shortUrl = `${APP_CONFIG.SHORT_URL_BASE}/${link.slug}`;

  return (
    <li className="mb-4">
      <div className="p-4 bg-gray-50 rounded-lg shadow-inner">
        <p className="mb-2">
          <span className="font-medium">Short URL: </span>
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline break-all hover:text-blue-800"
          >
            {shortUrl}
          </a>
        </p>
        <Analytics slug={link.slug} />
      </div>
    </li>
  );
};

export default LinkItem;
