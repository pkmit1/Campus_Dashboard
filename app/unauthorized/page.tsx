"use client"
import React from "react"
import { useRouter } from "next/navigation"

export default function UnauthorizedPage() {
  const router = useRouter()

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-black text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">⛔ Access Denied</h1>
      <p className=" mb-6 text-white">
        You don’t have permission to view this page. Please login with the correct account.
      </p>
      <button
        onClick={() => router.push("/login")}
        className="px-6 py-3 rounded-lg bg-red-600 text-white font-medium shadow hover:bg-red-700 transition"
      >
        Go to Login
      </button>
    </div>
  )
}
