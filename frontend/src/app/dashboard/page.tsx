'use client'

import React, { useContext } from 'react'
import AddMedicine from '../components/AddMedicine'
import { AuthContext } from '../../context/AuthContext';

const Page = () => {
  const {  user } = useContext(AuthContext);

  return (
    <div className="max-w-2xl mx-auto mt-12 p-8 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-900">Dashboard</h1>

      {!user ? (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4 text-center font-semibold">
          Please log in to view your dashboard.
        </div>
      ) : user.role === 'pharmacist' ? (
        <div>
          <div className="bg-teal-100 text-teal-800 p-4 rounded mb-6 text-center font-semibold">
            Welcome, {user.name || 'Pharmacist'}! You can add new medicines below.
          </div>
          <AddMedicine />
        </div>
      ) : (
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded text-center font-semibold">
          Welcome{user.name ? `, ${user.name}` : ''}!<br />
          You have access to the normal dashboard.
        </div>
      )}
    </div>
  )
}

export default Page