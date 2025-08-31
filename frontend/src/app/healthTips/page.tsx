'use client'

import { useState, useEffect, useRef } from 'react'
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

const Page = () => {
  const [healthTips, setHealthTips] = useState<HealthTip[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [limit, setLimit] = useState(2) // load 2 at first
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const fetchHealthTips = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/healthTips')
        const tips = Array.isArray(response.data) ? response.data : response.data.data || []
        setHealthTips(tips)
      } catch (err) {
        setError('Failed to fetch health tips')
      } finally {
        setLoading(false)
      }
    }
    fetchHealthTips()
  }, [])

 
  useEffect(() => {
    if (!loadMoreRef.current) return
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setLimit((prev) => (prev < healthTips.length ? prev + 1 : prev))
      }
    })
    observer.observe(loadMoreRef.current)
    return () => observer.disconnect()
  }, [healthTips])

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-28 pb-16 px-6">
      <div className="max-w-5xl w-full">
        <h1 className="text-4xl font-bold text-blue-900 mb-12 text-center">
          Health Tips
        </h1>

        {loading && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-900 mx-auto"></div>
            <p className="mt-4 text-gray-600 text-lg">Loading health tips...</p>
          </div>
        )}

        {error && <p className="text-center text-red-600 text-lg">{error}</p>}

        {!loading && !error && healthTips.length === 0 && (
          <p className="text-center text-gray-600 text-lg">
            No health tips available.
          </p>
        )}

        {!loading && !error && healthTips.length > 0 && (
          <div className="space-y-12">
            {healthTips.slice(0, limit).map((tip) => (
              <article
                key={tip._id}
                className="grid md:grid-cols-2 gap-8 items-center  pb-10"
              >
                
                <div>
                  <img
                    src={tip.image}
                    alt={tip.title}
                    className="w-full h-100 object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.src =
                        'https://via.placeholder.com/600x400?text=No+Image'
                    }}
                  />
                </div>

                
                <div>
                  <h2 className="text-3xl font-semibold text-blue-800 mb-4">
                    {tip.title}
                  </h2>
                  <p className="text-gray-700 leading-relaxed line-clamp-4 mb-4">
                    {tip.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                    {tip.category && (
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                        {tip.category}
                      </span>
                    )}
                    {tip.createdAt && (
                      <span>
                        Posted on {new Date(tip.createdAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  
                  <Link
                    href={`/healthTips/${tip._id}`}
                    className="inline-block bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
                  >
                    Learn More
                  </Link>
                </div>
              </article>
            ))}
            <div ref={loadMoreRef} className="h-10" />
          </div>
        )}
      </div>
    </div>
  )
}

export default Page
