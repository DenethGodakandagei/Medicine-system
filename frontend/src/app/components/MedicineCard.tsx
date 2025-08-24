"use client"; 

import React from "react";
import { MapPinIcon, Clock, AlertCircleIcon } from "lucide-react";

interface MedicineCardProps {
  medicine: {
    id: number;
    name: string;
    category: string;
    expiryDate: string;
    quantity: number;
    location: string;
    distance: string;
    image: string;
  };
  isRequested: boolean;
  onRequest: () => void;
  isExpiringSoon: boolean;
  isExpired: boolean;
}

export function MedicineCard({
  medicine,
  isRequested,
  onRequest,
  isExpiringSoon,
  isExpired,
}: MedicineCardProps) {
  const formattedExpiryDate = new Date(medicine.expiryDate).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-100">
      {/* Medicine Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={medicine.image}
          alt={medicine.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          {isExpired ? (
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
              <AlertCircleIcon size={12} className="mr-1" />
              Expired
            </span>
          ) : isExpiringSoon ? (
            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
              <Clock size={12} className="mr-1" />
              Expiring Soon
            </span>
          ) : null}
        </div>
      </div>

      {/* Medicine Info */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {medicine.name}
            </h3>
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full mt-1">
              {medicine.category}
            </span>
          </div>
          <div className="text-right">
            <span className="text-sm font-medium text-gray-900">
              {medicine.quantity} units
            </span>
          </div>
        </div>

        {/* Expiry + Location */}
        <div className="mt-3 space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <Clock size={16} className="mr-1.5" />
            <span>Expires: {formattedExpiryDate}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPinIcon size={16} className="mr-1.5" />
            <span>
              {medicine.location} ({medicine.distance})
            </span>
          </div>
        </div>

        {/* Request Button */}
        <button
          onClick={onRequest}
          className={`mt-4 w-full py-2 px-4 rounded-md transition-colors ${
            isRequested
              ? "bg-green-50 text-green-700 border border-green-300"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {isRequested ? "Requested" : "Request Medicine"}
        </button>
      </div>
    </div>
  );
}
