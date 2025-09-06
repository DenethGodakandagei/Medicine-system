"use client"

import React, { useEffect, useState } from "react"
import SearchBar from "@/app/components/SearchBar"
import { FilterChips } from "@/app/components/FilterChips"
import { SortDropdown } from "@/app/components/SortDropdown"
import { MedicineCard } from "@/app/components/MedicineCard"
import { MapIcon, ListFilter } from "lucide-react"

// Mock medicine data
const MOCK_MEDICINES = [
  {
    id: 1,
    name: "Paracetamol",
    category: "Painkillers",
    expiryDate: "2024-12-20",
    quantity: 50,
    location: "Central Pharmacy",
    distance: "0.5 miles",
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 2,
    name: "Amoxicillin",
    category: "Antibiotics",
    expiryDate: "2023-09-15",
    quantity: 30,
    location: "City Hospital",
    distance: "1.2 miles",
    image:
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 3,
    name: "Ibuprofen",
    category: "Painkillers",
    expiryDate: "2024-03-10",
    quantity: 100,
    location: "Downtown Clinic",
    distance: "0.8 miles",
    image:
      "https://images.unsplash.com/photo-1550572017-edd951b55104?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 4,
    name: "Loratadine",
    category: "Antihistamines",
    expiryDate: "2025-06-30",
    quantity: 25,
    location: "Health Center",
    distance: "1.5 miles",
    image:
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 5,
    name: "Metformin",
    category: "Diabetes",
    expiryDate: "2023-08-22",
    quantity: 60,
    location: "Medical Plaza",
    distance: "2.0 miles",
    image:
      "https://images.unsplash.com/photo-1576602976047-174e57a47881?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 6,
    name: "Atorvastatin",
    category: "Cholesterol",
    expiryDate: "2024-10-15",
    quantity: 90,
    location: "Community Pharmacy",
    distance: "0.3 miles",
    image:
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  },
]

// Get all unique categories
const getAllCategories = (medicines: typeof MOCK_MEDICINES) => {
  const categories = medicines.map((med) => med.category)
  return ["All", ...new Set(categories)]
}

export default function BrowseMedicines() {
  const [medicines, setMedicines] = useState(MOCK_MEDICINES)
  const [filteredMedicines, setFilteredMedicines] = useState(MOCK_MEDICINES)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("All")
  const [sortOption, setSortOption] = useState("name")
  const [requestedMedicines, setRequestedMedicines] = useState<number[]>([])
  const [viewMode, setViewMode] = useState("grid") // grid or map

  const categories = getAllCategories(medicines)

  // Filter options
  const filterOptions = [
    { id: "all", label: "All" },
    { id: "expiry-soon", label: "Expiry Soon" },
    { id: "nearby", label: "Nearby" },
    ...categories
      .filter((cat) => cat !== "All")
      .map((cat) => ({ id: cat.toLowerCase(), label: cat })),
  ]

  // Sort options
  const sortOptions = [
    { value: "name", label: "Name (A-Z)" },
    { value: "name-desc", label: "Name (Z-A)" },
    { value: "expiry", label: "Expiry Date (Earliest)" },
    { value: "distance", label: "Distance (Nearest)" },
  ]

  // Helpers
  const isExpiringSoon = (expiryDate: string) => {
    const expiry = new Date(expiryDate)
    const today = new Date()
    const threeMonthsFromNow = new Date()
    threeMonthsFromNow.setMonth(today.getMonth() + 3)
    return expiry <= threeMonthsFromNow && expiry >= today
  }

  const isExpired = (expiryDate: string) => {
    const expiry = new Date(expiryDate)
    const today = new Date()
    return expiry < today
  }

  // Apply filters + sorting
  useEffect(() => {
    let result = [...medicines]

    if (searchQuery) {
      result = result.filter(
        (med) =>
          med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          med.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

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

  // Request handler
  const handleRequestMedicine = (medicineId: number) => {
    if (requestedMedicines.includes(medicineId)) {
      setRequestedMedicines(requestedMedicines.filter((id) => id !== medicineId))
    } else {
      setRequestedMedicines([...requestedMedicines, medicineId])
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Explore Available Medicines</h1>

        {/* Search + Filters */}
        <div className="mb-6 space-y-4">
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
                onChange={(e) => setSortOption(e.target.value)}
              />
              <button
                className={`p-2 rounded-md ${viewMode === "grid" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"}`}
                onClick={() => setViewMode("grid")}
                title="Grid View"
              >
                <ListFilter size={20} />
              </button>
              <button
                className={`p-2 rounded-md ${viewMode === "map" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"}`}
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

        {/* Grid / Map */}
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
            <p className="text-gray-600">Map view will be available in a future update</p>
          </div>
        )}
      </div>
    </div>
  )
}
