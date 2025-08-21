import React from 'react'
interface SortOption {
  value: string
  label: string
}
interface SortDropdownProps {
  options: SortOption[]
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}
export function SortDropdown({ options, value, onChange }: SortDropdownProps) {
  return (
    <div className="flex items-center">
      <label htmlFor="sort" className="mr-2 text-sm font-medium text-gray-700">
        Sort by:
      </label>
      <select
        id="sort"
        value={value}
        onChange={onChange}
        className="bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
