'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'

interface HealthTip {
  _id: string
  title: string
  description: string
  category?: string
  createdAt?: string
  image?: string
}

const HealthTipPage = () => {
  const { id } = useParams()
  const [healthTip, setHealthTip] = useState<HealthTip | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTip = async () => {
      if (!id) return
      setLoading(true)
      try {
        const response = await axios.get(
          `http://localhost:4000/api/healthTips/${id}`
        )
        setHealthTip(response.data.data)
      } catch (err) {
        console.error(err)
        setError('Failed to load health tip')
      } finally {
        setLoading(false)
      }
    }

    fetchTip()
  }, [id])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-900"></div>
        <p className="mt-4 text-gray-600 text-lg">Loading health tip...</p>
      </div>
    )
  }

  if (error || !healthTip) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-red-600 text-lg">
        {error || 'Health tip not found'}
        <Link
          href="/healthTips"
          className="mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Back to Health Tips
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-28 pb-16 px-6">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-10 items-start">
        {/* Left side: Image with fixed back button */}
        <div className="relative w-full h-96">
          {/* Back button */}
          <Link
            href="/healthTips"
            className="absolute top-4 left-4 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
          >
            ←
          </Link>

          <img
            src={healthTip.image}
            alt={healthTip.title}
            className="w-full h-full object-cover rounded-lg"
            onError={(e) => {
              e.currentTarget.src =
                'https://via.placeholder.com/800x400?text=No+Image'
            }}
          />
        </div>

        <div>
          {/* Title */}
          <h1 className="text-4xl font-bold text-blue-900 mb-6">
            {healthTip.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
            {healthTip.category && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                {healthTip.category}
              </span>
            )}
            {healthTip.createdAt && (
              <span>
                Posted on {new Date(healthTip.createdAt).toLocaleDateString()}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line mb-6">
            {healthTip.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default HealthTipPage
