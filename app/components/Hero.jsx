"use client";
import Typewriter from "typewriter-effect";
import { Brain } from "lucide-react";

export default function Hero() {
  return (
    <div className="pt-24 px-10 flex flex-col md:flex-row items-center justify-between gap-10 relative">
      {/* Left Content */}
      <div className="max-w-xl space-y-6">
        {/* Gradient Badge with Brain Icon + Text */}
        <div className="relative inline-block group">
          {/* Glow Effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 p-[2px] blur-md opacity-70 group-hover:opacity-100 transition"></div>
          
          {/* Transparent Badge Content */}
          <div className="relative flex items-center gap-2 px-5 py-2 rounded-full bg-transparent border border-cyan-400/40 backdrop-blur-md">
            {/* Brain Icon Inside Badge */}
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 p-[2px]">
              <Brain className="w-4 h-4 text-white" />
            </span>
            <span className="text-sm font-medium tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
              AI-FIRST CAMPUS MANAGEMENT
            </span>
          </div>
        </div>

        {/* Heading */}
        <h1 className="font-bold text-3xl md:text-4xl text-white mt-6">
          Transform Your Campus with
        </h1>

        {/* Typewriter */}
        <h1 className="font-bold text-5xl md:text-6xl bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          <Typewriter
            options={{
              strings: ["AI-Driven Excellence"],
              autoStart: true,
              loop: true,
              delay: 50,
              deleteSpeed: 30,
            }}
          />
        </h1>

        {/* Subtext */}
        <p className="text-lg text-gray-300">
          Advanced AI-powered automation system to revolutionize campus
          operations and unlock unprecedented efficiency.
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-6 mt-6">
          <button className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:scale-105 transition transform font-semibold">
            Start Your Free Trial →
          </button>
          <button className="border border-gray-400 text-gray-200 px-6 py-3 rounded-lg hover:border-cyan-400 hover:text-cyan-400 transition">
            Request a Demo ▶
          </button>
        </div>
      </div>

      {/* Right Side Image */}
      <div className="flex-shrink-0 relative">
        <img
          className="max-h-[600px] rounded-lg "
          src="https://campusdice.ai/_next/image?url=%2Fimages%2FGemini_Generated_Image_5x4eau5x4eau5x4e.png&w=1920&q=75"
          alt="Hero"
        />
      </div>
    </div>
  );
}
