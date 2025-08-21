'use client'

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface HealthTip {
  _id: string
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

  useEffect(() => {
    const fetchHealthTips = async () => {
      try {
        setLoading(true)
        const response = await axios.get('http://localhost:5000/api/healthTips')
        const tips = Array.isArray(response.data) ? response.data : response.data.data || []
        setHealthTips(tips)
        if (tips.length > 0) {
          setVisibleTips([tips[0]])
        }
      } catch (err) {
        setError('Error fetching health tips')
      } finally {
        setLoading(false)
      }
    }
    fetchHealthTips()
  }, [])

  useEffect(() => {
    if (healthTips.length === 0 || loading || error) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && currentIndex < healthTips.length - 1) {
          setCurrentIndex((prev) => prev + 1)
          setVisibleTips((prev) => [...prev, healthTips[currentIndex + 1]])
        }
      },
      { threshold: 0.5 }
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
    <div className="min-h-screen bg-white py-12">
   
      <div className="px-[1in]">
        <div className="w-full max-w-7xl mx-auto">

          {loading && (
            <p className="text-center text-gray-600">Loading health tips...</p>
          )}

          {error && <p className="text-center text-red-600">{error}</p>}

          {!loading && !error && visibleTips.length > 0 && (
            <div className="space-y-10">
              {visibleTips.map((tip) => (
                <article 
                  key={tip._id} 
                  className="flex flex-col md:flex-row items-start gap-6 pb-8"
                >
                  {/* Left side: Image */}
                  <div className="w-full md:w-1/3">
                    <img
                      src={tip.image || 'https://via.placeholder.com/300x200?text=No+Image'}
                      alt={tip.title}
                      className="w-full h-70 object-cover rounded-md"
                      onError={(e) => {
                        e.currentTarget.src =
                          'https://via.placeholder.com/300x200?text=No+Image'
                      }}
                    />
                  </div>

                  {/* Right side: Content */}
                  <div className="w-full md:w-2/3 flex flex-col">
                    <h2 className="text-2xl font-bold text-blue-900 mb-2">
                      {tip.title}
                    </h2>
                    {tip.category && (
                      <p className="text-sm text-blue-700 font-medium mb-3">
                        {tip.category}
                      </p>
                    )}
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {tip.description}
                    </p>
                    
                   
                   <div>
                    <Link
                      href={`/healthTips/${tip._id}`}
                      className="inline-block bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
                    >
                      Learn More
                    </Link>
                  </div>
                  </div>
                </article>
              ))}
              <div ref={loadMoreRef} className="h-10" />
            </div>
          )}

          {!loading && !error && healthTips.length === 0 && (
            <p className="text-center text-gray-600">No health tips available.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Page
