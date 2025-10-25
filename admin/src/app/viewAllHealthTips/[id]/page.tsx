"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface HealthTip {
  _id: string;
  title: string;
  category: string;
  description: string;
  image?: string;
}

export default function UpdateHealthTipPage() {
  const router = useRouter();
  const { id } = useParams(); // /updateHealthTip/[id]
  const [healthTip, setHealthTip] = useState<HealthTip | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchHealthTip = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/healthTips/${id}`);
        const data = await res.json();
        if (res.ok) {
          setHealthTip(data.data);
          setTitle(data.data.title);
          setCategory(data.data.category);
          setDescription(data.data.description);
        } else {
          setMessage(data.message || "Failed to fetch health tip");
          setIsSuccess(false);
        }
      } catch (err) {
        setMessage("Server error. Please try again.");
        setIsSuccess(false);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchHealthTip();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!healthTip) return;

    setSubmitLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("description", description);
    if (image) formData.append("image", image);

    try {
      const res = await fetch(`http://localhost:4000/api/healthTips/${healthTip._id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Health tip updated successfully!");
        setIsSuccess(true);
        setHealthTip(data.data); // update state with latest data
      } else {
        setMessage((data.message || "Failed to update health tip."));
        setIsSuccess(false);
      }
    } catch (err) {
      setMessage("Server error. Please try again.");
      setIsSuccess(false);
    } finally {
      setSubmitLoading(false);
    }
  };

  //delete health tip
  // Add this inside your component, above the return statement
const handleDelete = async () => {
  if (!healthTip) return;
  if (!confirm("Are you sure you want to delete this health tip?")) return;

  try {
    const res = await fetch(`http://localhost:4000/api/healthTips/${healthTip._id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (res.ok) {
      alert("Health tip deleted successfully!");
      router.push("/viewAllHealthTips");
    } else {
      setMessage(data.message || "Failed to delete health tip.");
      setIsSuccess(false);
    }
  } catch (err) {
    setMessage("Server error. Please try again.");
    setIsSuccess(false);
  }
};


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  if (!healthTip) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 text-lg">{message || "Health tip not found"}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50 flex justify-center">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Edit Health Tip
        </h1>

        {/* Message */}
        {message && (
          <p
            className={`text-center text-sm font-medium ${
              isSuccess ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring focus:ring-green-200"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-purple-500 focus:ring focus:ring-purple-200"
              required
            />
          </div>

          {/* Current Image */}
          {healthTip.image && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Image
              </label>
              <img
                src={healthTip.image}
                alt={healthTip.title}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          )}

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Replace Image (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="mt-1 block w-full text-sm text-gray-600 
                        file:mr-4 file:py-2 file:px-4 
                        file:rounded-lg file:border-0 
                        file:text-sm file:font-semibold 
                        file:bg-blue-50 file:text-blue-700 
                        hover:file:bg-blue-100"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitLoading}
            className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {submitLoading ? "Updating..." : "Update Health Tip"}
          </button>
        </form>

      <div className="flex justify-between mt-4">
        <button
            onClick={() => router.back()}
            className="w-full py-2 mr-3 rounded-lg bg-gray-300 text-gray-800 hover:bg-gray-400 transition"
        >
            ← Back
        </button>

        <button
            onClick={handleDelete}
            className="w-full py-2 ml-3 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
        >
            Delete
        </button>
        </div>

        

      </div>
    </div>
  );
}
