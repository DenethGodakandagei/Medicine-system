'use client'

import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

interface HealthTip {
  id: string
  title: string
  description: string
  category?: string
  createdAt?: string
  image?: string
}

const Page = () => {
  const [healthTips, setHealthTips] = useState<HealthTip[]>([])
  const [visibleTips, setVisibleTips] = useState<HealthTip[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  // Fetch all health tips from the endpoint
  useEffect(() => {
    const fetchHealthTips = async () => {
      try {
        setLoading(true)
        const response = await axios.get('http://localhost:5000/api/healthTips', {
          headers: {
            'Content-Type': 'application/json',
          },
        })

        const tips = Array.isArray(response.data) ? response.data : response.data.data || []
        if (!Array.isArray(tips)) {
          throw new Error('Unexpected response format: Expected an array of health tips')
        }

        setHealthTips(tips)
        // Show the first tip initially if available
        if (tips.length > 0) {
          setVisibleTips([tips[0]])
        }
      } catch (err) {
        console.error('Error fetching health tips:', err)
        setError(
          err instanceof Error
            ? err.message
            : 'An error occurred while fetching health tips'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchHealthTips()
  }, [])

  // Set up Intersection Observer to load more tips on scroll
  useEffect(() => {
    if (healthTips.length === 0 || loading || error) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && currentIndex < healthTips.length - 1) {
          setCurrentIndex((prev) => prev + 1)
          setVisibleTips((prev) => [...prev, healthTips[currentIndex + 1]])
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the loadMoreRef div is visible
    )

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current)
    }

    return () => {
      if (loadMoreRef.current && observerRef.current) {
        observerRef.current.unobserve(loadMoreRef.current)
      }
    }
  }, [healthTips, currentIndex, loading, error])

  return (
    
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12">
      <div className="max-w-2xl w-full px-4">
        <h1 className="text-4xl font-bold text-center text-blue-900 mb-8">
          Health Tips
        </h1>

        {loading && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-900 mx-auto"></div>
            <p className="mt-4 text-gray-600 text-lg">Loading health tips...</p>
          </div>
        )}

        {error && (
          <p className="text-center text-red-600 text-lg">{error}</p>
        )}

        {!loading && !error && healthTips.length === 0 && (
          <p className="text-center text-gray-600 text-lg">
            No health tips available.
          </p>
        )}

        {!loading && !error && visibleTips.length > 0 && (
          <div className="space-y-6">
            {visibleTips.map((tip) => (
              <div
                key={tip.id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                {tip.image ? (
                  <img
                    src={tip.image}
                    alt={tip.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/300x200?text=No+Image'
                    }}
                  />
                ) : (
                  <img
                    src="https://via.placeholder.com/300x200?text=No+Image"
                    alt="Placeholder"
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <h2 className="text-2xl font-semibold text-blue-800 mb-2">
                  {tip.title}
                </h2>
                <p className="text-gray-600 mb-4">{tip.description}</p>
                {tip.category && (
                  <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                    {tip.category}
                  </span>
                )}
                {tip.createdAt && (
                  <p className="text-sm text-gray-500 mt-2">
                    Posted on {new Date(tip.createdAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))}
            <div ref={loadMoreRef} className="h-10" />
          </div>
        )}
      </div>
    </div>
  )
}

export default Page