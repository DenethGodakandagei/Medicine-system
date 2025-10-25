"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface FormDataType {
  name: string;
  brand: string;
  dosage: string;
  price: string;
  stock: string;
  expiryDate: string;
  description: string;
  category:
    | "Tablet"
    | "Capsule"
    | "Syrup"
    | "Injection"
    | "Other"
    | "Antibiotics"
    | "Painkillers"
    | "Cholesterol"
    | "Antihistamines"
    | "Diabetes";
  prescriptionRequired: boolean;
}

export default function AddMedicine() {
  const router = useRouter();

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
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const categories = [
    { value: "Antibiotics", color: "bg-blue-100 text-blue-800" },
    { value: "Painkillers", color: "bg-gray-100 text-gray-800" },
    { value: "Cholesterol", color: "bg-green-100 text-green-800" },
    { value: "Antihistamines", color: "bg-orange-100 text-orange-800" },
    { value: "Diabetes", color: "bg-purple-100 text-purple-800" },
    { value: "Tablet", color: "bg-indigo-100 text-indigo-800" },
    { value: "Capsule", color: "bg-pink-100 text-pink-800" },
    { value: "Syrup", color: "bg-yellow-100 text-yellow-800" },
    { value: "Injection", color: "bg-red-100 text-red-800" },
    { value: "Other", color: "bg-gray-100 text-gray-800" },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const checked =
      (e.target as HTMLInputElement).type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: checked !== undefined ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      if (errors.image) setErrors((prev) => ({ ...prev, image: "" }));

      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) newErrors.name = "Medicine name is required";
    if (!formData.brand.trim()) newErrors.brand = "Brand is required";
    if (!formData.price || Number(formData.price) <= 0)
      newErrors.price = "Valid price is required";
    if (formData.stock === "" || Number(formData.stock) < 0)
      newErrors.stock = "Valid stock quantity is required";
    if (formData.name.length > 100)
      newErrors.name = "Medicine name must be less than 100 characters";
    if (formData.brand.length > 50)
      newErrors.brand = "Brand must be less than 50 characters";
    if (formData.description.length > 500)
      newErrors.description = "Description must be less than 500 characters";
    if (formData.price && Number(formData.price) > 999999.99)
      newErrors.price = "Price must be less than $999,999.99";

    if (formData.expiryDate) {
      const expiryDate = new Date(formData.expiryDate);
      const today = new Date();
      if (expiryDate <= today) {
        newErrors.expiryDate = "Expiry date must be in the future";
      }
    }

    if (image) {
      if (image.size > 10 * 1024 * 1024) newErrors.image = "Image must be <10MB";
      if (!image.type.startsWith("image/")) newErrors.image = "Invalid image file";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value.toString());
      });
      if (image) formDataToSend.append("image", image);

      const res = await fetch("http://localhost:4000/api/medicines", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to add medicine");

      alert("Medicine added successfully!");
      setFormData({
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
      setImage(null);
      setImagePreview(null);
      setErrors({});
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "Failed to add medicine");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="max-w-4xl px-4 mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center mb-4 text-blue-600 transition-colors hover:text-blue-800"
            disabled={isLoading}
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Medicines
          </button>
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Add New Medicine
          </h1>
          <p className="text-gray-600">
            Fill in the details to add a new medicine to the inventory
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 rounded-lg shadow-sm"
        >
          <div className="p-8 space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Name */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Medicine Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter medicine name"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  disabled={isLoading}
                  maxLength={100}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Brand */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Brand <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  placeholder="Enter brand name"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.brand ? "border-red-500" : "border-gray-300"
                  }`}
                  disabled={isLoading}
                  maxLength={50}
                />
                {errors.brand && (
                  <p className="mt-1 text-sm text-red-600">{errors.brand}</p>
                )}
              </div>
            </div>

            {/* Dosage and Category */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Dosage
                </label>
                <input
                  type="text"
                  name="dosage"
                  value={formData.dosage}
                  onChange={handleChange}
                  placeholder="e.g., 500mg, 10ml"
                  className="w-full px-4 py-3 transition-colors border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={isLoading}
                  maxLength={50}
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 transition-colors border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={isLoading}
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.value}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Price and Stock */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Price ($) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.price ? "border-red-500" : "border-gray-300"
                  }`}
                  disabled={isLoading}
                  min="0"
                  step="0.01"
                  max="999999.99"
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600">{errors.price}</p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Stock Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="0"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.stock ? "border-red-500" : "border-gray-300"
                  }`}
                  disabled={isLoading}
                  min="0"
                  max="999999"
                />
                {errors.stock && (
                  <p className="mt-1 text-sm text-red-600">{errors.stock}</p>
                )}
              </div>
            </div>

            {/* Expiry Date */}
            <div className="md:w-1/2">
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Expiry Date
              </label>
              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.expiryDate ? "border-red-500" : "border-gray-300"
                }`}
                disabled={isLoading}
                min={new Date().toISOString().split("T")[0]}
              />
              {errors.expiryDate && (
                <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter medicine description, usage instructions, side effects, etc."
                rows={4}
                maxLength={500}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
                disabled={isLoading}
              />
              <div className="flex justify-between mt-1">
                {errors.description && (
                  <p className="text-sm text-red-600">{errors.description}</p>
                )}
                <p className="ml-auto text-sm text-gray-500">
                  {formData.description.length}/500
                </p>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Medicine Image
              </label>
              <div className="flex items-center space-x-6">
                <div className="shrink-0">
                  {imagePreview ? (
                    <Image
                      className="object-cover w-24 h-24 border border-gray-300 rounded-lg"
                      src={imagePreview}
                      alt="Medicine preview"
                      width={96}
                      height={96}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-24 h-24 bg-gray-100 border border-gray-300 rounded-lg">
                      <svg
                        className="w-8 h-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <input
                    type="file"
                    name="image"
                    onChange={handleImage}
                    accept="image/*"
                    className="block w-full text-sm text-gray-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    disabled={isLoading}
                  />
                  <p className="mt-1 text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  {errors.image && (
                    <p className="mt-1 text-sm text-red-600">{errors.image}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Prescription Required */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="prescriptionRequired"
                checked={formData.prescriptionRequired}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                disabled={isLoading}
              />
              <label className="ml-3 text-sm font-semibold text-gray-700">
                Prescription Required
              </label>
            </div>

            {/* Submit Buttons */}
            <div className="pt-6 border-t border-gray-200">
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center px-8 py-3 font-semibold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading && (
                    <svg
                      className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                  )}
                  {isLoading ? "Adding..." : "Add Medicine"}
                </button>
                <button
                  type="button"
                  onClick={() => router.back()}
                  disabled={isLoading}
                  className="flex items-center px-8 py-3 font-semibold text-gray-700 transition-colors bg-gray-200 rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
