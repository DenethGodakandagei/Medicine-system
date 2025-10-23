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

  if (loading) return <p className="py-12 text-center">Loading...</p>;
  if (!medicine) return <p className="py-12 text-center">Medicine not found</p>;

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex flex-col gap-6 md:flex-row">
        <img
          src={medicine.image}
          alt={medicine.name}
          className="object-cover w-full h-64 rounded-lg md:w-64"
        />
        <div className="flex-1">
          <h1 className="mb-2 text-3xl font-bold">{medicine.name}</h1>
          <p className="mb-1 text-gray-600">
            <span className="font-semibold">Brand:</span> {medicine.brand}
          </p>
          <p className="mb-1 text-gray-600">
            <span className="font-semibold">Category:</span> {medicine.category}
          </p>
          <p className="mb-1 text-gray-600">
            <span className="font-semibold">Dosage:</span> {medicine.dosage} mg
          </p>
          <p className="mb-1 text-gray-600">
            <span className="font-semibold">Price:</span> ${medicine.price}
          </p>
          <p className="mb-1 text-gray-600">
            <span className="font-semibold">Stock:</span> {medicine.stock}
          </p>
          <p className="mb-1 text-gray-600">
            <span className="font-semibold">Expiry Date:</span>{" "}
            {new Date(medicine.expiryDate).toLocaleDateString()}
          </p>
          <p className="mb-1 text-gray-600">
            <span className="font-semibold">Prescription Required:</span>{" "}
            {medicine.prescriptionRequired ? "Yes" : "No"}
          </p>
          {medicine.description && (
            <p className="mt-4 text-gray-700">{medicine.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
