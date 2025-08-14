"use client";

import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { accessToken, user, logout } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!accessToken || !user) {
      router.push("/login");
    }
  }, [accessToken, user, router]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (!accessToken || !user) return null; 

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-2xl text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          Welcome, {user.name}!
        </h1>
        <p className="text-gray-600 mb-6">
          You are successfully logged in. Explore your dashboard and manage your account.
        </p>
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
