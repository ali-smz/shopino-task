import { useEffect, useState } from "react";
import { linkService } from "../services/api";

const Analytics = ({ slug }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const result = await linkService.getAnalytics(slug);
        setData(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [slug]);

  if (loading)
    return <p className="mt-2 text-gray-500">Loading analytics...</p>;
  if (!data)
    return <p className="mt-2 text-red-500">No analytics available.</p>;

  return (
    <div className="mt-4 p-3 bg-white border border-gray-200 rounded-lg">
      <p className="font-medium">
        Total Clicks: <span className="text-blue-600">{data.total_clicks}</span>
      </p>
      <p className="text-gray-600 break-all">
        Original URL: {data.original_url}
      </p>
    </div>
  );
};

export default Analytics;
