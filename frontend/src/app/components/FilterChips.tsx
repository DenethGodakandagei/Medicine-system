'use client'

import React from 'react'
interface FilterOption {
  id: string
  label: string
}
interface FilterChipsProps {
  options: FilterOption[]
  activeFilter: string
  onFilterChange: (filter: string) => void
}
export function FilterChips({
  options,
  activeFilter,
  onFilterChange,
}: FilterChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onFilterChange(option.label)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${activeFilter === option.label ? 'bg-blue-100 text-blue-800 border border-blue-200' : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'}`}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
