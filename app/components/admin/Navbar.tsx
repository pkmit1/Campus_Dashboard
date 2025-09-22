"use client"

import { useRouter } from "next/navigation"
import { Users, MessageCircle, LogOut, Menu, X } from "lucide-react"
import { useState } from "react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const navLink = [
    { name: "User", href: "/adminDashboard/user" },
    { name: "Message", href: "/adminDashboard/message" }
  ]

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      localStorage.removeItem("token");
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-20 bg-gray-900 border-b border-gray-700">
      <div className="flex items-center justify-between px-6 py-4 relative">
        {/* Left: Logo */}
        <div
          onClick={() => router.push("/adminDashboard")}
          className="flex items-center gap-3 cursor-pointer bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text text-transparent"
        >
          <img
            src="https://campusdice.ai/_next/image?url=%2Fimages%2FCampus%20Dice%20logo.svg&w=384&q=75"
            alt="logo"
            width={40}
            height={40}
            className="rounded-md"
          />
          <span className="text-xl font-bold">Admin Dashboard</span>
        </div>

        {/* Center: Nav links */}
        <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 items-center gap-8 text-xl font-bold text-gray-200">
          <div
            className="flex items-center gap-2 cursor-pointer text-cyan-200 hover:text-cyan-500"
            onClick={() => router.push("/adminDashboard/user")}
          >
            <Users size={20} />
            <span>User</span>
          </div>
          <div
            className="flex items-center gap-2 cursor-pointer text-purple-300 hover:text-purple-500"
            onClick={() => router.push("/adminDashboard/message")}
          >
            <MessageCircle size={20} />
            <span>Message</span>
          </div>
        </div>

        {/* Right: Logout + Mobile Menu Button */}
        <div className="flex items-center gap-4">
          <div
            className="hidden lg:flex items-center gap-2 cursor-pointer text-red-400 hover:text-red-600"
            onClick={handleLogout}
          >
            <LogOut size={20} />
            <span>Logout</span>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-200"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-gray-900 border-t border-gray-800">
          <ul className="flex flex-col gap-4 px-6 py-4 font-medium">
            {navLink.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="block hover:text-blue-500 transition"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))}
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-400 hover:text-red-600 transition"
              >
                <LogOut size={20} /> Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
