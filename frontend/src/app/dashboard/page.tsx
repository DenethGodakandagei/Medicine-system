'use client'

import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import AddMedicine from '../components/AddMedicine'

const Page = () => {
  const { user } = useContext(AuthContext)
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E3F2FD] via-[#E8F0FE] to-[#F3F8FF] p-6">
      <div className="max-w-7xl mx-auto mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Sidebar / Profile Card */}
        <div className="backdrop-blur-lg bg-white/70 border border-white/40 shadow-xl rounded-2xl p-6">
          <h2 className="text-xl font-bold text-[#1A237E] mb-6">👤 Profile</h2>

          {!user ? (
            <div className="bg-red-100 text-red-700 p-4 rounded-md text-center font-medium">
              Please log in to view your dashboard.
            </div>
          ) : (
            <div className="space-y-4 text-gray-700">
              <div className="flex items-center gap-4">
                <img
                  src="https://randomuser.me/api/portraits/men/46.jpg"
                  alt="User Avatar"
                  className="w-16 h-16 rounded-full border-2 border-blue-500 shadow-md"
                />
                <div>
                  <p className="text-lg font-semibold text-[#0D47A1]">{user.name || 'Guest User'}</p>
                  <p className="text-sm text-gray-600 capitalize">{user.role}</p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-4 rounded-md border border-blue-200">
                <p className="font-medium text-blue-800 text-center">Status: Active</p>
              </div>
            </div>
          )}
        </div>

        {/* Main Dashboard Section */}
        <div className="lg:col-span-2 backdrop-blur-lg bg-white/70 border border-white/40 shadow-xl rounded-2xl p-8">
          <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-700 to-indigo-600 text-transparent bg-clip-text">
            Dashboard
          </h1>

          {/* ---------------- Pharmacist View ---------------- */}
          {user && user.role === 'pharmacist' ? (
            <div>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-blue-900 p-4 rounded-lg mb-6 text-center font-medium shadow-sm">
                Welcome, <span className="font-semibold">{user.name || 'Pharmacist'}</span> — Manage your medicines below.
              </div>

              {/* Add Medicine Button */}
              <div className="flex justify-center mb-6">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-200"
                >
                   Add New Medicine
                </button>
              </div>

              {/* Medicine List */}
              <h2 className="text-xl font-semibold mb-4 text-[#0D47A1]">Recent Medicines</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'Paracetamol 500mg', stock: 120 },
                  { name: 'Amoxicillin 250mg', stock: 80 },
                  { name: 'Cetirizine 10mg', stock: 45 },
                  { name: 'Vitamin C 1000mg', stock: 200 },
                ].map((med, i) => (
                  <div
                    key={i}
                    className="p-4 bg-gradient-to-r from-blue-50 to-white border border-blue-100 rounded-lg shadow-sm flex justify-between items-center hover:shadow-md transition-all"
                  >
                    <span className="font-medium text-gray-800">{med.name}</span>
                    <span className="text-sm text-blue-700">Stock: {med.stock}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : user ? (
            /* ---------------- Normal User View ---------------- */
            <div>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-blue-900 p-4 rounded-lg mb-6 text-center font-medium shadow-sm">
                Welcome{user.name ? `, ${user.name}` : ''}! Enjoy personalized health tips below.
              </div>

              <h2 className="text-xl font-semibold mb-4 text-[#0D47A1]">💡 Health Tips</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="p-3 rounded-md bg-gradient-to-r from-white to-blue-50 border border-blue-100">
                  🩺 Drink at least 8 glasses of water daily
                </li>
                <li className="p-3 rounded-md bg-gradient-to-r from-white to-blue-50 border border-blue-100">
                  🚴 Exercise 30 minutes a day for better health
                </li>
                <li className="p-3 rounded-md bg-gradient-to-r from-white to-blue-50 border border-blue-100">
                  🥗 Eat more fruits and vegetables to boost immunity
                </li>
              </ul>

              <div className="mt-10 bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl border border-indigo-100 text-center">
                <p className="font-medium text-gray-700 mb-2">Need personalized advice?</p>
                <button className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow hover:scale-105 transition-transform">
                  Contact Our Health Experts
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500">
              Please log in to access your dashboard.
            </div>
          )}
        </div>
      </div>

      {/* Add Medicine Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col relative overflow-hidden">
            
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <h2 className="text-lg font-semibold">Add Medicine</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-white hover:text-red-300 transition"
              >
                ✖
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto max-h-[80vh]">
              <AddMedicine />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Page
