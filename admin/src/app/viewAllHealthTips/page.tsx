"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface HealthTip {
  _id: string;
  title: string;
  category: string;
  description: string;
  image?: string;
}

export default function ViewHealthTipsPage() {
  const [healthTips, setHealthTips] = useState<HealthTip[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const router = useRouter();

  const fetchHealthTips = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/healthTips");
      const data = await res.json();
      if (res.ok) {
        setHealthTips(data.data || []);
      } else {
        setMessage(data.message || "Failed to fetch health tips.");
        setIsSuccess(false);
      }
    } catch (error) {
      setMessage("Server error. Please try again.");
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealthTips();
  }, []);


  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          📋 All Health Tips
        </h1>

        {/* Message */}
        {message && (
          <p
            className={`mb-4 text-center text-sm font-medium ${
              isSuccess ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Title
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Category
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Description
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Image
                </th>
                <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    Loading...
                  </td>
                </tr>
              ) : healthTips.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    No health tips found.
                  </td>
                </tr>
              ) : (
                healthTips.map((tip) => (
                  <tr key={tip._id}>
                    <td className="px-4 py-2">{tip.title}</td>
                    <td className="px-4 py-2">{tip.category}</td>
                    <td className="px-4 py-2">
                    {tip.description.length > 50
                      ? tip.description.slice(0, 50) + "…"
                      : tip.description}
                    </td>

                    <td className="px-4 py-2">
                      {tip.image ? (
                        <img
                          src={tip.image}
                          alt={tip.title}
                          className="w-20 h-12 object-cover rounded-md"
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td className="px-4 py-2 flex justify-center gap-2">
                     <button
                onClick={() => router.push(`/viewAllHealthTips/${tip._id}`)}
                className="px-3 py-1 rounded-lg bg-blue-500 text-white text-sm hover:bg-blue-600 transition"
              >
                View
              </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
