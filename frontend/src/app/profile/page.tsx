"use client";

import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { accessToken, user } = useContext(AuthContext);
  const router = useRouter();

  if (!accessToken || !user) {
    router.push("/login");
    return null;
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-xl mt-10">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
      <p>
        <span className="font-medium">Name: </span>
        {user.name}
      </p>
      <p>
        <span className="font-medium">Email: </span>
        {user.email}
      </p>
      <p>
        <span className="font-medium">Role: </span>
        {user.role}
      </p>
    </div>
  );
}
