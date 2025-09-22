"use client"
import Image from "next/image"

export default function Navbar() {
  return (
    <div className="flex fixed top-0 left-0 right-0 justify-between items-center px-6 py-4 border-b border-gray-700 w-full z-20 bg-gray-900">
      <div className="flex items-center gap-3">
        <img
          className="h-10 w-10"
          src="https://campusdice.ai/_next/image?url=%2Fimages%2FCampus%20Dice%20logo.svg&w=384&q=75"
          alt="logo"
          width={40}
          height={40}
        />
        <span className="text-xl font-bold">Admin Dashboard</span>
      </div>
    </div>
  )
}
