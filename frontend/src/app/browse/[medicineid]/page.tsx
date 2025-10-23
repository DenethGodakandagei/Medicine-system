"use client"

import React, { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import API from "@/services/api"
import toast from "react-hot-toast"

interface Medicine {
  id: string
  name: string
  category: string
  expiryDate: string
  quantity: number
  location: string
  distance: string
  image: string
  description?: string
}

export default function MedicineDetailsPage() {
  const { id } = useParams()
  const [medicine, setMedicine] = useState<Medicine | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        setLoading(true)
        const res = await API.get(`/medicines/${id}`)
        setMedicine(res.data.data)
        console.log(res.data.data)
      } catch (err) {
        console.error(err)
        toast.error("Failed to fetch medicine details")
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchMedicine()
  }, [id])

  if (loading) return <p className="py-12 text-center">Loading...</p>
  if (!medicine) return <p className="py-12 text-center">Medicine not found</p>

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
            <span className="font-semibold">Category:</span> {medicine.category}
          </p>
          <p className="mb-1 text-gray-600">
            <span className="font-semibold">Expiry Date:</span> {medicine.expiryDate}
          </p>
          <p className="mb-1 text-gray-600">
            <span className="font-semibold">Quantity:</span> {medicine.quantity}
          </p>
          <p className="mb-1 text-gray-600">
            <span className="font-semibold">Location:</span> {medicine.location}
          </p>
          <p className="mb-1 text-gray-600">
            <span className="font-semibold">Distance:</span> {medicine.distance} km
          </p>
          {medicine.description && (
            <p className="mt-4 text-gray-700">{medicine.description}</p>
          )}
        </div>
      </div>
    </div>
  )
}
