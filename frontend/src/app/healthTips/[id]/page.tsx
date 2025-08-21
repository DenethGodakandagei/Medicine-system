'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'

interface HealthTip {
  _id: string
  title: string
  description: string
  longDescription?: string
  category?: string
  createdAt?: string
  image?: string
}

const ViewSingleHealthTip = () => {
  const params = useParams() as Record<string, string | string[]>
  const idParam = params?.id
  const id = Array.isArray(idParam) ? idParam[0] : idParam

  const [tip, setTip] = useState<HealthTip | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const sampleLongDescription = `Maintaining good health involves a combination of balanced nutrition, regular physical activity, quality sleep, and effective stress management. Aim to fill half your plate with colorful vegetables and fruits, incorporate lean proteins, whole grains, and healthy fats, and stay hydrated throughout the day. Even short, consistent bouts of movement—like brisk walking, stretching, or bodyweight exercises—can contribute to improved cardiovascular health and overall wellbeing.

Consistency is key. Build small, sustainable habits such as taking the stairs, setting reminders to stand and stretch, and preparing simple, nutrient-dense meals. Pair these with 7–9 hours of restorative sleep and mindfulness practices like deep breathing or journaling to support mental clarity. Always consult a qualified healthcare professional for guidance tailored to your personal health needs.`

  const resolvedLongDescription = tip?.longDescription || sampleLongDescription

  useEffect(() => {
    const fetchTip = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`http://localhost:5000/api/healthTips/${id}`)
        setTip(response.data?.data || null)
      } catch (err) {
        setError('Error fetching health tip')
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchTip()
  }, [id])

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="px-[1in]">
        <div className="w-full max-w-5xl mx-auto">
          {loading && (
            <p className="text-center text-gray-600">Loading health tip...</p>
          )}

          {error && <p className="text-center text-red-600">{error}</p>}

          {!loading && !error && tip && (
            <article className="flex flex-col gap-8">
              {/* Hero Image */}
              <div className="w-full">
                <img
                  src={tip.image || 'https://via.placeholder.com/1200x600?text=No+Image'}
                  alt={tip.title}
                  className="w-full h-[28rem] md:h-[34rem] object-cover rounded-xl"
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://via.placeholder.com/1200x600?text=No+Image'
                  }}
                />
              </div>

              {/* Content */}
              <div className="w-full">
                <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-3">
                  {tip.title}
                </h1>
                {tip.category && (
                  <p className="text-sm text-blue-700 font-medium mb-5">
                    {tip.category}
                  </p>
                )}

                {/* Short description (kept as-is) */}
                <section className="space-y-2 mb-6">
                  <h2 className="text-xl font-semibold text-blue-900">Summary</h2>
                  <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line text-justify">
                    {tip.description}
                  </p>
                </section>

                {/* Detailed description (sample if none provided) */}
                <section className="space-y-2">
                  <h2 className="text-xl font-semibold text-blue-900">Detailed Information</h2>
                  <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line text-justify">
                    {resolvedLongDescription}
                  </p>
                </section>

                {tip.createdAt && (
                  <p className="text-xs text-gray-500 mt-6">
                    Published on {new Date(tip.createdAt).toLocaleDateString()}
                  </p>
                )}

                {/* Back Button */}
                <div className="mt-6">
                  <a
                    href="/healthTips"
                    className="inline-block bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    ← Back to Tips
                  </a>
                </div>
              </div>
            </article>
          )}
        </div>
      </div>
    </div>
  )
}

export default ViewSingleHealthTip


