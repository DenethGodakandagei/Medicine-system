"use client";

import { useState, useContext, ChangeEvent, FormEvent } from "react";
import { AuthContext } from "../../context/AuthContext";

interface FormDataType {
  name: string;
  brand: string;
  dosage: string;
  price: number | "";
  stock: number | "";
  expiryDate: string;
  description: string;
  category: "Tablet" | "Capsule" | "Syrup" | "Injection" | "Other";
  prescriptionRequired: boolean;
}

export default function AddMedicine() {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    brand: "",
    dosage: "",
    price: "",
    stock: "",
    expiryDate: "",
    description: "",
    category: "Tablet",
    prescriptionRequired: false,
  });

  const [image, setImage] = useState<File | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const checked = (e.target as HTMLInputElement).type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setFormData(prev => ({
      ...prev,
      [name]: checked !== undefined ? checked : value,
    }));
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => form.append(key, value.toString()));
    if (user?._id) form.append("userId", user._id);
    if (image) form.append("image", image);

    try {
      const res = await fetch("http://localhost:5000/api/medicines", {
        method: "POST",
        body: form,
      });

      const data = await res.json();
      if (res.ok) {
        alert("Medicine added successfully!");
        console.log(data);
      } else {
        alert(data.message || "Error adding medicine");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Add New Medicine</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
        <input
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          name="name"
          placeholder="Medicine Name"
          onChange={handleChange}
          value={formData.name}
        />
        <input
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          name="brand"
          placeholder="Brand"
          onChange={handleChange}
          value={formData.brand}
        />
        <input
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          name="dosage"
          placeholder="Dosage (e.g., 500mg)"
          onChange={handleChange}
          value={formData.dosage}
        />
        <div className="flex gap-4">
          <input
            className="w-1/2 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            name="price"
            placeholder="Price"
            type="number"
            onChange={handleChange}
            value={formData.price}
          />
          <input
            className="w-1/2 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            name="stock"
            placeholder="Stock Quantity"
            type="number"
            onChange={handleChange}
            value={formData.stock}
          />
        </div>
        <input
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          name="expiryDate"
          type="date"
          onChange={handleChange}
          value={formData.expiryDate}
        />
        <textarea
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          name="description"
          placeholder="Description"
          onChange={handleChange}
          value={formData.description}
          rows={3}
        />
        <select
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          name="category"
          onChange={handleChange}
          value={formData.category}
        >
          <option value="Tablet">Tablet</option>
          <option value="Capsule">Capsule</option>
          <option value="Syrup">Syrup</option>
          <option value="Injection">Injection</option>
          <option value="Other">Other</option>
        </select>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="prescriptionRequired"
            checked={formData.prescriptionRequired}
            onChange={handleChange}
            className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
          />
          Prescription Required
        </label>
        <input
          type="file"
          name="image"
          onChange={handleImage}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-200"
        >
          Add Medicine
        </button>
      </form>
    </div>
  );
}
