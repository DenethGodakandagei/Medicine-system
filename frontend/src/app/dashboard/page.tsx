"use client";

import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import AddMedicine from "../components/AddMedicine";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
      <div className="max-w-7xl mx-auto mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar / Profile Section */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 lg:col-span-1">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile</h2>
          {!user ? (
            <div className="bg-red-50 text-red-700 p-4 rounded-md text-center font-medium">
              Please log in to view your dashboard.
            </div>
          ) : (
            <div className="space-y-3 text-gray-700">
              <p>
                <span className="font-medium">Name:</span>{" "}
                {user.name || "Guest"}
              </p>
              <p>
                <span className="font-medium">Role:</span> {user.role}
              </p>
              <div className="mt-4 p-3 rounded-md bg-gray-50 text-sm text-gray-600 border">
                Status: Active
              </div>
              <div
                className="mt-4 p-3 rounded-md bg-gray-800 text-sm text-white text-gray-600 border text-center cursor-pointer"
                onClick={() => router.push("/dashboard/requests")}
              >
                <h4>View Requests</h4>
              </div>
            </div>
          )}
        </div>

        {/* Main Dashboard Section */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 lg:col-span-2">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">
            Dashboard
          </h1>

          {!user ? (
            <div className="text-center text-gray-500">
              Please log in to access dashboard features.
            </div>
          ) : user.role === "pharmacist" ? (
            <div>
              {/* Pharmacist Section */}
              <div className="bg-gray-50 text-gray-700 p-4 rounded-md mb-6 text-center font-medium border">
                Welcome, {user.name || "Pharmacist"} — you can manage medicines
                below.
              </div>

              {/* Add Medicine Button */}
              <div className="flex justify-center mb-6">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-5 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow hover:scale-105 transition-transform"
                >
                  Add New Medicine
                </button>
              </div>

              {/* Example Filled Content: Recent Medicines */}
              <h2 className="text-lg font-semibold mb-3 text-gray-800">
                Recent Medicines
              </h2>
              <ul className="space-y-3">
                <li className="p-3 rounded-md border bg-gray-50 flex justify-between">
                  <span>Paracetamol 500mg</span>
                  <span className="text-gray-500 text-sm">Stock: 120</span>
                </li>
                <li className="p-3 rounded-md border bg-gray-50 flex justify-between">
                  <span>Amoxicillin 250mg</span>
                  <span className="text-gray-500 text-sm">Stock: 80</span>
                </li>
                <li className="p-3 rounded-md border bg-gray-50 flex justify-between">
                  <span>Cetirizine 10mg</span>
                  <span className="text-gray-500 text-sm">Stock: 45</span>
                </li>
              </ul>
            </div>
          ) : (
            <div>
              {/* Normal User Section */}
              <div className="bg-gray-50 text-gray-700 p-4 rounded-md mb-6 text-center font-medium border">
                Welcome{user.name ? `, ${user.name}` : ""}. You have access to
                the normal dashboard.
              </div>

              {/* Example Filled Content: Health Tips */}
              <h2 className="text-lg font-semibold mb-3 text-gray-800">
                Health Tips
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Drink at least 8 glasses of water a day</li>
                <li>Exercise for 30 minutes, 5 times a week</li>
                <li>Maintain a balanced diet with fruits & vegetables</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Add Medicine Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col relative">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold text-gray-800">
                Add Medicine
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-red-500"
              >
                ✖
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto">
              <AddMedicine />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
