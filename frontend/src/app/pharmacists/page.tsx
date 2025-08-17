"use client";

import { useState, useEffect, useContext } from "react";
import API from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function PharmacistsPage() {
  const { accessToken, refreshAccessToken } = useContext(AuthContext);
  const router = useRouter();
  const [pharmacists, setPharmacists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!accessToken) {
      router.push("/login");
      return;
    }

    const fetchPharmacists = async () => {
      try {
        const { data } = await API.get("/pharmacists", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setPharmacists(data);
      } catch (err: any) {
        // If token expired, try refreshing it
        if (err.response?.status === 401) {
          try {
            await refreshAccessToken();
            const { data } = await API.get("/pharmacists", {
              headers: { Authorization: `Bearer ${accessToken}` },
            });
            setPharmacists(data);
          } catch {
            router.push("/login");
          }
        } else {
          alert(err.response?.data?.message || "Error fetching pharmacists");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPharmacists();
  }, [accessToken, router, refreshAccessToken]);

  if (loading) return <div>Loading pharmacists...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pharmacists List</h1>
      {pharmacists.length === 0 && <p>No pharmacists found.</p>}
      {pharmacists.map((p: any) => (
        <div
          key={p._id}
          className="p-4 mb-2 border border-gray-300 rounded-lg shadow-sm"
        >
          <p className="font-medium">
            {p.user.firstName} {p.user.lastName}
          </p>
          <p className="text-gray-600">{p.pharmacyName}</p>
        </div>
      ))}
    </div>
  );
}
