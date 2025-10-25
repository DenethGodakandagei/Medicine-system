"use client"

import React from "react"
import { useRouter } from "next/navigation"

interface MedicineCardProps {
  medicine: {
    id: string
    name: string
    category: string
    expiryDate: string
    quantity: number
    location: string
    distance: string
    image: string
  }
  isRequested: boolean
  onRequest: () => void
  isExpiringSoon?: boolean
  isExpired?: boolean
}

export const MedicineCard: React.FC<MedicineCardProps> = ({
  medicine,
  isRequested,
  onRequest,
  isExpiringSoon,
  isExpired,
}) => {
  const router = useRouter()

  // Navigate to medicine detail page
  const handleViewDetails = () => {
    router.push(`/browse/${medicine.id}`)
  }

  return (
    <div
      className={`border rounded-lg shadow-sm p-4 bg-white transition hover:shadow-md ${
        isExpired ? "opacity-50" : ""
      }`}
    >
      <img
        src={medicine.image}
        alt={medicine.name}
        className="object-cover w-full h-40 mb-3 rounded-md"
      />
      <h3 className="text-lg font-semibold text-gray-800">{medicine.name}</h3>
      <p className="text-sm text-gray-600">{medicine.category}</p>
      <p className="mt-1 text-sm text-gray-500">
        {medicine.location} • {medicine.distance} km
      </p>

      {isExpiringSoon && !isExpired && (
        <p className="mt-1 text-sm text-yellow-600">⚠️ Expiring Soon</p>
      )}
      {isExpired && <p className="mt-1 text-sm text-red-600">❌ Expired</p>}

      {/* Buttons */}
      <div className="flex flex-col gap-2 mt-3">
        {/* Request Medicine Button */}
        <button
          onClick={onRequest}
          className={`w-full py-2 rounded-md font-medium transition ${
            isRequested
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {isRequested ? "Requested" : "Request Medicine"}
        </button>

        {/* View Details Button */}
        <button
          onClick={handleViewDetails}
          className="w-full py-2 font-medium text-gray-800 transition bg-gray-200 rounded-md hover:bg-gray-300"
        >
          View Details
        </button>
      </div>
    </div>
  )
}
