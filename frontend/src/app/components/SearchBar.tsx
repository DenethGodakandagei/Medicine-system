'use client'

// components/SearchBar.tsx
import React from 'react'
import { SearchIcon } from 'lucide-react'

interface SearchBarProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
}) => {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <SearchIcon className="w-5 h-5 text-gray-400" />
      </div>
      <input
        type="text"
        className="w-full p-3 pl-10 text-sm text-gray-900 bg-white border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default SearchBar
