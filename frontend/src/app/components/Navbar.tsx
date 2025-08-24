"use client";

import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Navbar() {
  const { accessToken, user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center">
      {/* Left Side - Logo & Links */}
      <div className="flex items-center space-x-6">
        <Link href="/" className="text-lg font-bold hover:text-gray-300">
          MyApp
        </Link>
        {accessToken && user && (
          <>
            <Link href="/dashboard" className="hover:text-gray-300">
              Dashboard
            </Link>
            <Link href="/profile" className="hover:text-gray-300">
              Profile
            </Link>
            <Link href="/healthTips" className="hover:text-gray-300">
              Health Tips
            </Link>
          </>
        )}
      </div>

      {/* Right Side - Auth Buttons */}
      <div className="flex items-center space-x-4">
        {accessToken && user ? (
          <>
            <span className="text-sm">Hi, {user.name}</span>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
