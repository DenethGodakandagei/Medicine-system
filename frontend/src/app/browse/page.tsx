"use client"

import React, { useEffect, useState } from "react"
import API from "../../services/api"
import SearchBar from "@/app/components/SearchBar"
import { FilterChips } from "@/app/components/FilterChips"
import { SortDropdown } from "@/app/components/SortDropdown"
import { MedicineCard } from "@/app/components/MedicineCard"
import { MapIcon, ListFilter } from "lucide-react"

// ------------------- Types -------------------
interface Medicine {
  id: string
  name: string
  category: string
  expiryDate: string
  quantity: number
  location: string
  distance: string
  image: string
}

interface FilterOption {
  id: string
  label: string
}

interface SortOption {
  value: string
  label: string
}

// ------------------- Component -------------------
export default function BrowseMedicines() {
  const [medicines, setMedicines] = useState<Medicine[]>([])
  const [filteredMedicines, setFilteredMedicines] = useState<Medicine[]>([])
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [activeFilter, setActiveFilter] = useState<string>("All")
  const [sortOption, setSortOption] = useState<string>("name")
  const [requestedMedicines, setRequestedMedicines] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid")
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>("")

  // ------------------- Fetch Medicines -------------------
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        setLoading(true)
        const res = await API.get("/medicines")
        const data = res.data
        
        const formattedData: Medicine[] = data.map((med: any) => ({
          id: med._id,
          name: med.name,
          category: med.category,
          expiryDate: med.expiryDate,
          quantity: med.stock,
          location: med.pharmacist?.pharmacyName || "Unknown Pharmacy",
          distance: med.distance || "1.0",
          image: med.image?.startsWith("http")
            ? med.image
            : `${process.env.NEXT_PUBLIC_API_BASE_URL}/${med.image}`,
        }))

        setMedicines(formattedData)
        setFilteredMedicines(formattedData)
      } catch (err) {
        console.error("Error fetching medicines:", err)
        setError("Failed to load medicines. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchMedicines()
  }, [])

  // ------------------- Helpers -------------------
  const getAllCategories = (list: Medicine[]): string[] => {
    const categories = list.map((med) => med.category)
    return ["All", ...new Set(categories)]
  }

  const categories = getAllCategories(medicines)

  const filterOptions: FilterOption[] = [
    { id: "all", label: "All" },
    { id: "expiry-soon", label: "Expiry Soon" },
    { id: "nearby", label: "Nearby" },
    ...categories
      .filter((cat) => cat !== "All")
      .map((cat) => ({ id: cat.toLowerCase(), label: cat })),
  ]

  const sortOptions: SortOption[] = [
    { value: "name", label: "Name (A-Z)" },
    { value: "name-desc", label: "Name (Z-A)" },
    { value: "expiry", label: "Expiry Date (Earliest)" },
    { value: "distance", label: "Distance (Nearest)" },
  ]

  const isExpiringSoon = (expiryDate: string): boolean => {
    const expiry = new Date(expiryDate)
    const today = new Date()
    const threeMonthsFromNow = new Date()
    threeMonthsFromNow.setMonth(today.getMonth() + 3)
    return expiry <= threeMonthsFromNow && expiry >= today
  }

  const isExpired = (expiryDate: string): boolean => {
    const expiry = new Date(expiryDate)
    const today = new Date()
    return expiry < today
  }

  // ------------------- Filter + Sort -------------------
  useEffect(() => {
    let result = [...medicines]

    // Search
    if (searchQuery) {
      result = result.filter(
        (med) =>
          med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          med.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filters
    if (activeFilter !== "All") {
      if (activeFilter === "Expiry Soon") {
        result = result.filter(
          (med) => isExpiringSoon(med.expiryDate) && !isExpired(med.expiryDate)
        )
      } else if (activeFilter === "Nearby") {
        result = result.filter((med) => parseFloat(med.distance) < 1.0)
      } else {
        result = result.filter((med) => med.category === activeFilter)
      }
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortOption) {
        case "name":
          return a.name.localeCompare(b.name)
        case "name-desc":
          return b.name.localeCompare(a.name)
        case "expiry":
          return new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime()
        case "distance":
          return parseFloat(a.distance) - parseFloat(b.distance)
        default:
          return 0
      }
    })

    setFilteredMedicines(result)
  }, [medicines, searchQuery, activeFilter, sortOption])

  // ------------------- Handlers -------------------
  const handleRequestMedicine = (medicineId: string): void => {
    setRequestedMedicines((prev) =>
      prev.includes(medicineId)
        ? prev.filter((id) => id !== medicineId)
        : [...prev, medicineId]
    )
  }

  // ------------------- Render -------------------
  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Browse Medicines</h1>

        {/* Loading & Error States */}
        {loading ? (
          <div className="text-center text-gray-600 py-20">Loading medicines...</div>
        ) : error ? (
          <div className="text-center text-red-600 py-20">{error}</div>
        ) : (
          <>
            {/* Search + Filters */}
            <div className="mb-6 space-y-4">
              <SearchBar
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchQuery(e.target.value)
                }
                placeholder="Search medicines by name or category..."
              />

              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <FilterChips
                  options={filterOptions}
                  activeFilter={activeFilter}
                  onFilterChange={setActiveFilter}
                />

                <div className="flex items-center gap-4">
                  <SortDropdown
                    options={sortOptions}
                    value={sortOption}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setSortOption(e.target.value)
                    }
                  />
                  <button
                    className={`p-2 rounded-md ${
                      viewMode === "grid"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                    onClick={() => setViewMode("grid")}
                    title="Grid View"
                  >
                    <ListFilter size={20} />
                  </button>
                  <button
                    className={`p-2 rounded-md ${
                      viewMode === "map"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                    onClick={() => setViewMode("map")}
                    title="Map View"
                  >
                    <MapIcon size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Request Summary */}
            {requestedMedicines.length > 0 && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-blue-800">
                  <span className="font-medium">{requestedMedicines.length}</span>{" "}
                  medicine(s) added to your request list
                </p>
                <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                  Review Request
                </button>
              </div>
            )}

            {/* Grid / Map View */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredMedicines.length > 0 ? (
                  filteredMedicines.map((medicine) => (
                    <MedicineCard
                      key={medicine.id}
                      medicine={medicine}
                      isRequested={requestedMedicines.includes(medicine.id)}
                      onRequest={() => handleRequestMedicine(medicine.id)}
                      isExpiringSoon={isExpiringSoon(medicine.expiryDate)}
                      isExpired={isExpired(medicine.expiryDate)}
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12 text-gray-500">
                    No medicines found matching your criteria.
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
                <p className="text-gray-600">
                  Map view will be available in a future update.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
