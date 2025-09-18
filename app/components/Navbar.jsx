"use client";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Features", href: "#features" },
    { name: "Process", href: "#process" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-black border-b border-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            className="h-10"
            src="https://campusdice.ai/_next/image?url=%2Fimages%2FCampus%20Dice%20logo.svg&w=384&q=75"
            alt="logo"
          />
          <h1 className="text-xl font-semibold">CampusDice.ai</h1>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-6 text-lg font-medium">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a href={link.href} className="hover:text-blue-500 transition">
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <span className="cursor-pointer hover:text-blue-500">
            Request Demo
          </span>
          <button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold py-2 px-6 rounded-lg hover:shadow-lg hover:from-cyan-600 hover:to-purple-700">
            Dashboard
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <ul className="flex flex-col gap-4 px-6 py-4 font-medium">
            {navLinks.map((link) => (
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
              <span className="block hover:text-blue-500">Request Demo</span>
            </li>
            <li>
              <button className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold py-2 px-6 rounded-lg">
                Dashboard
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
