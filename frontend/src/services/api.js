import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const linkService = {
  // Get all links
  getAllLinks: async () => {
    const response = await api.get("/links/"); // make sure this matches urls.py
    return response.data;
  },

  // Get a single link by slug
  getLinkBySlug: async (slug) => {
    const response = await api.get(`/links/${slug}/`);
    return response.data;
  },

  // Create a new link
  createLink: async (linkData) => {
    const response = await api.post("/shorten/", linkData); // matches ShortURLCreateAPIView
    return response.data;
  },

  // Update a link
  updateLink: async (slug, linkData) => {
    const response = await api.patch(`/links/${slug}/`, linkData);
    return response.data;
  },

  // Delete a link
  deleteLink: async (slug) => {
    await api.delete(`/links/${slug}/`);
  },

  // Get redirect URL
  getRedirectUrl: async (slug) => {
    const response = await api.get(`/redirect/${slug}/`);
    return response.data;
  },

  // Get stats
  getAnalytics: async (slug) => {
    const response = await api.get(`/analytics/${slug}/`);
    return response.data;
  },
};

export default api;
