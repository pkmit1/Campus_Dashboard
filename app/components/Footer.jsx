"use client";

import { Twitter, Instagram, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 relative text-white">
      {/* Gradient Top Border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500"></div>

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Left Section */}
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
            CampusDice.ai
          </h2>
          <p className="mt-3 text-gray-400">Your Partner in Campus Excellence</p>

          {/* Newsletter */}
          <div className="mt-6">
            <p className="text-sm font-medium">Subscribe to our newsletter</p>
            <div className="mt-3 flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 w-full rounded-l-lg bg-gray-800 text-white focus:outline-none"
              />
              <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-r-lg font-medium">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Product Links */}
        <div>
          <h3 className="font-semibold text-white mb-3">PRODUCT</h3>
          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-white cursor-pointer">Features</li>
            <li className="hover:text-white cursor-pointer">Book Demo</li>
            <li className="hover:text-white cursor-pointer">How It Works</li>
            <li className="hover:text-white cursor-pointer">Demo</li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="font-semibold text-white mb-3">COMPANY</h3>
          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-white cursor-pointer">About Us</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer">Terms & Conditions</li>
          </ul>
        </div>

        
      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-6 pb-6 flex flex-col md:flex-row justify-between items-center border-t border-gray-800 pt-6 text-gray-500 text-sm">
        <div>© 2025 CampusDice.ai. All rights reserved.</div>
        {/* Social Links */}
        <div>
          
          <div className="flex gap-4">
            <a
              href="https://twitter.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition"
            >
              <Twitter className="w-6 h-6" />
            </a>
            <a
              href="https://instagram.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-400 transition"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="mailto:youremail@example.com"
              className="hover:text-green-400 transition"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
