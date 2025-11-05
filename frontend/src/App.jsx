import { useState, useEffect } from "react";
import { linkService } from "./services/api";

function App() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    slug: "",
  });
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadLinks();
    loadStats();
  }, []);

  const loadLinks = async () => {
    try {
      setLoading(true);
      const data = await linkService.getAllLinks();
      setLinks(data.results || data);
      setError(null);
    } catch (err) {
      setError(
        "Failed to load links. Please make sure the backend is running on http://localhost:8000"
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const data = await linkService.getStats();
      setStats(data);
    } catch (err) {
      console.error("Failed to load stats:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      await linkService.createLink(formData);
      setFormData({ name: "", url: "", slug: "" });
      setShowForm(false);
      loadLinks();
      loadStats();
    } catch (err) {
      const errorMessage = err.response?.data
        ? Object.values(err.response.data).flat().join(", ")
        : "Failed to create link";
      setError(errorMessage);
    }
  };

  const handleDelete = async (slug) => {
    if (window.confirm("Are you sure you want to delete this link?")) {
      try {
        await linkService.deleteLink(slug);
        loadLinks();
        loadStats();
      } catch (err) {
        setError("Failed to delete link");
        console.error(err);
      }
    }
  };

  const handleRedirect = async (slug) => {
    try {
      const data = await linkService.getRedirectUrl(slug);
      window.open(data.url, "_blank");
      loadLinks();
      loadStats();
    } catch (err) {
      setError("Failed to redirect");
      console.error(err);
    }
  };

  const getShortUrl = (slug) => {
    return `${window.location.origin}/${slug}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Bitly Clone</h1>
          <p className="text-gray-600 text-lg">Shorten your URLs with ease</p>
        </header>

        {stats && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Links</p>
                <p className="text-3xl font-bold text-blue-600">
                  {stats.total_links}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Clicks</p>
                <p className="text-3xl font-bold text-green-600">
                  {stats.total_clicks}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">Links</h2>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
            >
              {showForm ? "Cancel" : "+ New Link"}
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {showForm && (
            <form
              onSubmit={handleSubmit}
              className="mb-6 p-4 bg-gray-50 rounded-lg"
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter link name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.url}
                    onChange={(e) =>
                      setFormData({ ...formData, url: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Custom Slug (optional)
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="custom-slug"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
                >
                  Create Link
                </button>
              </div>
            </form>
          )}

          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Loading links...</p>
            </div>
          ) : links.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">
                No links yet. Create your first link!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {links.map((link) => (
                <div
                  key={link.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {link.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {link.url}
                        </a>
                      </p>
                      <p className="text-sm text-gray-500">
                        Short URL:{" "}
                        <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                          {getShortUrl(link.slug)}
                        </code>
                      </p>
                    </div>
                    <div className="ml-4">
                      <span className="inline-block rounded-full bg-green-200 px-4 py-1 text-sm font-medium text-green-800">
                        {link.clicks} clicks
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => handleRedirect(link.slug)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors font-medium"
                    >
                      Open Link
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(getShortUrl(link.slug));
                        alert("Short URL copied to clipboard!");
                      }}
                      className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors font-medium"
                    >
                      Copy Short URL
                    </button>
                    <button
                      onClick={() => handleDelete(link.slug)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition-colors font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <footer className="text-center text-gray-600 text-sm mt-8">
          <p>Bitly Clone - URL Shortener</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
