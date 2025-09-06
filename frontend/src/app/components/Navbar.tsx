"use client";

import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Navbar() {
  const { accessToken, user, logout } = useContext(AuthContext);

  return (
    <nav className="container mx-auto px-6 lg:px-10 py-4 flex items-center justify-between bg-white">
      {/* Left Side - Logo */}
      <div className="flex items-center gap-3">
        <svg
          className="text-teal-500 h-8 w-8 transition-transform duration-300 hover:rotate-12"
          fill="none"
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"
            fill="currentColor"
          ></path>
        </svg>
        <h2 className="text-gray-800 text-xl font-bold">MediLink</h2>
      </div>

      {/* Center - Navigation Links */}
      <div className="hidden md:flex items-center gap-8">
        <Link
          href="/"
          className="text-gray-600 hover:text-blue-500 font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-500 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
        >
          Home
        </Link>
        <Link
          href="/browse"
          className="text-gray-600 hover:text-blue-500 font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-500 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
        >
          Browse
        </Link>
        
        {accessToken && user && (
          <>
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-blue-500 font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-500 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              Dashboard
            </Link>
            <Link
              href="/profile"
              className="text-gray-600 hover:text-blue-500 font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-500 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              Profile
            </Link>
            <Link
              href="/healthTips"
              className="text-gray-600 hover:text-blue-500 font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-500 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              Health Tips
            </Link>
          </>
        )}
      </div>

      {/* Right Side - Auth Buttons */}
      <div className="flex items-center gap-4">
        {accessToken && user ? (
          <>
            <span className="text-gray-800 font-medium">Hi, {user.name}</span>
            <button
              onClick={logout}
              className="bg-transparent border border-blue-500 text-blue-500 font-semibold py-2 px-6 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out transform hover:shadow-lg"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="bg-transparent border border-blue-500 text-blue-500 font-semibold py-2 px-6 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out transform hover:shadow-lg"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-blue-400 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:shadow-xl"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
