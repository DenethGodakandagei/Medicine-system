// MedicineCard.tsx
"use client"

import React from "react"

interface MedicineCardProps {
  medicine: {
    id: string // ✅ changed from number → string
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
  return (
    <div
      className={`border rounded-lg shadow-sm p-4 bg-white transition hover:shadow-md ${
        isExpired ? "opacity-50" : ""
      }`}
    >
      <img
        src={medicine.image}
        alt={medicine.name}
        className="w-full h-40 object-cover rounded-md mb-3"
      />
      <h3 className="font-semibold text-lg text-gray-800">{medicine.name}</h3>
      <p className="text-sm text-gray-600">{medicine.category}</p>
      <p className="text-sm text-gray-500 mt-1">
        {medicine.location} • {medicine.distance} km
      </p>

      {isExpiringSoon && !isExpired && (
        <p className="text-yellow-600 text-sm mt-1">⚠️ Expiring Soon</p>
      )}
      {isExpired && (
        <p className="text-red-600 text-sm mt-1">❌ Expired</p>
      )}

      <button
        onClick={onRequest}
        className={`mt-3 w-full py-2 rounded-md font-medium transition ${
          isRequested
            ? "bg-green-100 text-green-700 border border-green-300"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {isRequested ? "Requested" : "Request Medicine"}
      </button>
    </div>
  )
}
