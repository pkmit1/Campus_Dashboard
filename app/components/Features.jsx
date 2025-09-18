"use client";
import { Home, Users, Search, FileText, BookOpen, Mic } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Mic,
      title: "AI Mock Interview",
      desc: "Revolutionary AI-powered interview system with intelligent feedback, performance analysis, and personalized improvement suggestions.",
    },
    {
      icon: Search,
      title: "Profile Analysis AI",
      desc: "Advanced AI system that analyzes student profiles, identifies strengths, and provides personalized career recommendations.",
    },
    {
      icon: FileText,
      title: "Smart Attendance",
      desc: "Automated facial recognition attendance tracking that saves time and ensures accuracy.",
    },
    {
      icon: Home,
      title: "AI Career Insights",
      desc: "Leverage AI-driven insights to help students plan better career paths and job readiness.",
    },
    {
      icon: BookOpen,
      title: "Campus ERP Academics",
      desc: "Comprehensive academic management with assignments, class scheduling, notes, attendance tracking, and file management.",
    },
    {
      icon: Users,
      title: "Student & Faculty Management",
      desc: "Unified dashboard for all departments: academics, placement, HRMS, hostel, library, IT, and admin management.",
    },
  ];

  const gradients = [
    "from-pink-500 to-purple-500",
    "from-blue-500 to-cyan-500",
    "from-green-500 to-emerald-500",
    "from-yellow-500 to-orange-500",
  ];

  return (
    <section id="features" className="mt-20 px-6">
      {/* Section Header */}
      <div className="text-center">
        {/* Transparent Gradient Badge */}
        <div className="inline-block relative group">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 p-[2px] blur-md opacity-70 group-hover:opacity-100 transition"></div>
          <div className="relative px-6 py-2 rounded-full bg-transparent border border-cyan-400/40 backdrop-blur-md text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 font-medium text-sm tracking-wide">
            AI-POWERED FEATURES
          </div>
        </div>

        <h1 className="font-bold text-4xl md:text-5xl text-white mt-6">
          AI-First Feature Breakdown
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mt-3">
          Discover the powerful AI-powered features that make CampusDice.ai the
          ultimate campus management solution.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          const gradient =
            gradients[index % gradients.length]; // rotate colors instead of random

          return (
            <div
              key={index}
              className="relative p-6 min-h-[250px] rounded-xl border border-gray-700 bg-gray-900/60 hover:shadow-[0_0_25px_rgba(0,255,255,0.3)] transition"
            >
              {/* AI Powered Badge */}
              <span
                className={`absolute top-4 right-4 bg-gradient-to-r ${gradient} text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md`}
              >
                AI POWERED
              </span>

              {/* Icon */}
              <div
                className={`w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-r ${gradient} shadow-md`}
              >
                {Icon && <Icon className="w-7 h-7 text-white" />}
              </div>

              {/* Text */}
              <h2 className="text-xl font-semibold mt-6 text-white">
                {feature.title}
              </h2>
              <p className="text-gray-300 mt-2">{feature.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Explore Button */}
      <div className="mt-12 text-center">
        <button className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-medium hover:scale-105 transition transform">
          Explore All AI Features →
        </button>
      </div>
    </section>
  );
};

export default Features;
