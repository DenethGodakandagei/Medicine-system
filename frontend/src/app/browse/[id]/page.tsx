"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import API from "@/services/api";
import toast from "react-hot-toast";

interface Medicine {
  id: string;
  name: string;
  brand: string;
  description: string;
  category: string;
  dosage: string;
  price: number;
  stock: number;
  expiryDate: string;
  prescriptionRequired: boolean;
  image: string;
}

export default function MedicineDetailsPage() {
  const { id } = useParams();
  const [medicine, setMedicine] = useState<Medicine | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/medicines/${id}`);

        // API returns medicine inside data.data
        setMedicine({
          id: res.data.data._id,
          name: res.data.data.name,
          brand: res.data.data.brand,
          description: res.data.data.description,
          category: res.data.data.category,
          dosage: res.data.data.dosage,
          price: res.data.data.price,
          stock: res.data.data.stock,
          expiryDate: res.data.data.expiryDate,
          prescriptionRequired: res.data.data.prescriptionRequired,
          image: res.data.data.image,
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch medicine details");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchMedicine();
  }, [id]);

  if (loading) return <p className="py-12 text-lg text-center text-gray-600">Loading...</p>;
  if (!medicine) return <p className="py-12 text-lg text-center text-gray-600">Medicine not found</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container max-w-6xl px-4 py-12 mx-auto">
        <div className="overflow-hidden bg-white shadow-xl rounded-2xl">
          <div className="flex flex-col gap-8 p-8 lg:flex-row">
            {/* Image Section */}
            <div className="lg:w-2/5">
              <div className="relative group">
                <img
                  src={medicine.image}
                  alt={medicine.name}
                  className="object-cover w-full transition-transform duration-300 shadow-lg h-80 rounded-xl group-hover:scale-105"
                />
                <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl group-hover:opacity-100"></div>
              </div>
            </div>

            {/* Details Section */}
            <div className="flex flex-col justify-between lg:w-3/5">
              <div>
                <h1 className="mb-4 text-4xl font-bold leading-tight text-gray-900">
                  {medicine.name}
                </h1>

                <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2">
                  <div className="p-4 border border-blue-200 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100">
                    <span className="text-sm font-medium tracking-wide text-blue-600 uppercase">Brand</span>
                    <p className="mt-1 text-lg font-semibold text-gray-800">{medicine.brand}</p>
                  </div>

                  <div className="p-4 border border-purple-200 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100">
                    <span className="text-sm font-medium tracking-wide text-purple-600 uppercase">Category</span>
                    <p className="mt-1 text-lg font-semibold text-gray-800">{medicine.category}</p>
                  </div>

                  <div className="p-4 border border-green-200 rounded-lg bg-gradient-to-br from-green-50 to-green-100">
                    <span className="text-sm font-medium tracking-wide text-green-600 uppercase">Dosage</span>
                    <p className="mt-1 text-lg font-semibold text-gray-800">{medicine.dosage} mg</p>
                  </div>

                  <div className="p-4 border rounded-lg bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
                    <span className="text-sm font-medium tracking-wide uppercase text-amber-600">Price</span>
                    <p className="mt-1 text-lg font-semibold text-gray-800">${medicine.price}</p>
                  </div>

                  <div className="p-4 border border-indigo-200 rounded-lg bg-gradient-to-br from-indigo-50 to-indigo-100">
                    <span className="text-sm font-medium tracking-wide text-indigo-600 uppercase">Stock</span>
                    <p className="mt-1 text-lg font-semibold text-gray-800">{medicine.stock}</p>
                  </div>

                  <div className="p-4 border rounded-lg bg-gradient-to-br from-rose-50 to-rose-100 border-rose-200">
                    <span className="text-sm font-medium tracking-wide uppercase text-rose-600">Expiry Date</span>
                    <p className="mt-1 text-lg font-semibold text-gray-800">
                      {new Date(medicine.expiryDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className={`inline-flex items-center px-4 py-2 rounded-full mb-6 ${
                  medicine.prescriptionRequired 
                    ? 'bg-red-100 text-red-700 border border-red-200' 
                    : 'bg-green-100 text-green-700 border border-green-200'
                }`}>
                  <span className="text-sm font-semibold tracking-wide uppercase">
                    Prescription Required: {medicine.prescriptionRequired ? "Yes" : "No"}
                  </span>
                </div>

                {medicine.description && (
                  <div className="p-6 border border-gray-200 rounded-lg bg-gray-50">
                    <h2 className="mb-2 text-sm font-semibold tracking-wide text-gray-700 uppercase">Description</h2>
                    <p className="leading-relaxed text-gray-700">{medicine.description}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}