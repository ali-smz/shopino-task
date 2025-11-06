import React, { useState, useEffect } from "react";
import { linkService } from "../services/api";
import Analytics from "./Analytics";

const ShortenForm = () => {
  const [url, setUrl] = useState("");
  const [shortURL, setShortURL] = useState(null);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all links from backend on mount
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const data = await linkService.getAllLinks();
        setLinks(Array.isArray(data.results) ? data.results : []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLinks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!url) return;

    try {
      setLoading(true);
      const data = await linkService.createLink({ original_url: url });

      setShortURL(data);
      setLinks((prev) => [data, ...prev]); // prepend new link
      setUrl("");
    } catch (err) {
      console.error(err);
      setError("Failed to shorten URL.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Input Form */}
      <form className="flex flex-col sm:flex-row gap-3" onSubmit={handleSubmit}>
        <input
          type="url"
          placeholder="Enter your URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Shortening..." : "Shorten"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* Newly created link card */}
      {shortURL && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-inner">
          <p className="mb-2">
            Short URL:{" "}
            <a
              href={`http://localhost:8000/${shortURL.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              http://localhost:8000/{shortURL.slug}
            </a>
          </p>
          <Analytics slug={shortURL.slug} />
        </div>
      )}

      {/* Persistent Links List */}
      <div className="mt-6">
        <h2 className="font-bold mb-2 text-lg">All Links</h2>
        {Array.isArray(links) && links.length > 0 ? (
          <ul className="space-y-4">
            {links.map((link) => (
              <li
                key={link.slug}
                className="p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition"
              >
                <p className="mb-1">
                  <a
                    href={`http://localhost:8000/${link.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {link.slug}
                  </a>
                  {" → "}
                  {link.original_url}
                </p>
                <p className="text-gray-600">Clicks: {link.click_count || 0}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No links created yet.</p>
        )}
      </div>
    </div>
  );
};

export default ShortenForm;
