"use client";

import { useState, useContext } from "react";
import API from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const { login } = useContext(AuthContext); // use login function from context
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "user",
    pharmacyName: "",
    licenseNumber: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await API.post("/auth/register", form);

      // Save tokens and user info in context & localStorage
      login(data);

      alert("Registered successfully!");
      router.push("/dashboard");
    } catch (err: any) {
      alert(err.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-2xl">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Create Account
        </h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            name="firstName"
            placeholder="First Name"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            name="lastName"
            placeholder="Last Name"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <select
            name="role"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="user">User</option>
            <option value="pharmacist">Pharmacist</option>
          </select>

          {form.role === "pharmacist" && (
            <>
              <input
                name="pharmacyName"
                placeholder="Pharmacy Name"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                name="licenseNumber"
                placeholder="License Number"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold shadow-md transition-colors duration-300 disabled:opacity-60"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-500">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
