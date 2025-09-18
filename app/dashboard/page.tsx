"use client";

import Image from "next/image";
import { Home, User, Search, icons,Mic } from "lucide-react";

import Typewriter from "typewriter-effect";


export default function Dashboard() {
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
    icon: User,
    title: "Smart Attendance",
    desc: "Automated facial recognition attendance tracking that saves time and ensures accuracy.",
  },
  {
    icon: Home,
    title: "AI Career Insights",
    desc: "Leverage AI-driven insights to help students plan better career paths and job readiness.",
  },
  {
    icon: Home,
    title: "Campus ERP Academics",
    desc: "Comprehensive academic management with assignments, class scheduling, notes, attendance tracking, and file management."
},
  {
    icon: Home,
    title: "Student & Faculty Management",
    desc:"Unified dashboard for all departments: academics, placement, HRMS, hostel, library, IT, and admin management."
},
];


  const steps = [
    {
      step: "STEP 01",
      title: "Upload JD & Resume",
      desc: "Easily upload job descriptions and student resumes through our intuitive interface. Our AI analyzes both documents to understand requirements and candidate profiles.",
      points: ["Drag & drop interface", "AI-powered document analysis", "Real-time processing"],
      img: "https://campusdice.ai/images/50%20transition-all%20duration-500.svg",
    },
    {
      step: "STEP 02",
      title: "AI Analysis & Interview",
      desc: "Our advanced AI conducts intelligent interviews, analyzes responses, and evaluates candidate suitability based on job requirements and company culture.",
      points: ["Intelligent interview system", "Real-time response analysis", "Cultural fit assessment"],
      img: "https://campusdice.ai/images/Ai%20analyse%20&%20take%20interview.png",
    },
    {
      step: "STEP 03",
      title: "Download & Share Interview Reports",
      desc: "Get comprehensive interview reports with detailed analytics, candidate scores, and recommendations. Share results with stakeholders and track placement success.",
      points: ["Comprehensive analytics", "Detailed candidate scores", "Stakeholder sharing"],
      img: "https://campusdice.ai/images/Download-and-share-Interview-Reports.png",
    },
  ];

  return (
    <div className="bg-black text-white">
      {/* Navbar (fixed) */}
      <div className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 shadow-md bg-black text-white">
        {/* Logo + Title */}
        <div className="flex items-center gap-3">
          <img
            className="h-10"
            src="https://campusdice.ai/_next/image?url=%2Fimages%2FCampus%20Dice%20logo.svg&w=384&q=75"
            alt="logo"
          />
          <h1 className="text-xl font-semibold">CampusDice.ai</h1>
        </div>

        {/* Nav Links */}
        <ul className="flex gap-6 text-lg font-medium cursor-pointer">
          <li className="hover:text-blue-500">Home</li>
          <li className="hover:text-blue-500">Features</li>
          <li className="hover:text-blue-500">About</li>
          <li className="hover:text-blue-500">Contact</li>
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <span className="font-medium cursor-pointer hover:text-blue-500">
            Request Demo
          </span>
          <button className="px-4 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition">
            Dashboard
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="mt-28 px-10 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left Content */}
        <div className="max-w-xl space-y-6">
          <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-xl font-medium">
            AI-FIRST CAMPUS MANAGEMENT
          </button>

          <h1 className="font-bold text-3xl md:text-4xl text-white">
            Transform Your Campus with
          </h1>
          <h1 className="font-bold text-5xl md:text-6xl text-blue-600">
  <Typewriter
    options={{
      strings: [
        "AI-Driven Excellence"
      ],
      autoStart: true,
      loop: true,
      delay: 50,
      deleteSpeed: 30,
    }}
  />
</h1>

          <p className="text-lg  text-white">
            Advanced AI-powered automation system to revolutionize campus
            operations and unlock unprecedented efficiency.
          </p>

          <div className="flex gap-6">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition">
              Start Your Free Trial
            </button>
            <button className="bg-blue-100 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-200 transition">
              Request a Demo
            </button>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-shrink-0">
          <img
            className="max-h-[600px] rounded-lg shadow-lg"
            src="https://campusdice.ai/_next/image?url=%2Fimages%2FGemini_Generated_Image_5x4eau5x4eau5x4e.png&w=1920&q=75"
            alt="Hero"
          />
        </div>
      </div>

      {/* Feature Section */}
      <div className="mt-16 text-center px-6">
        <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full font-medium">
          AI-POWERED FEATURES
        </button>

        <h1 className="font-bold text-4xl md:text-5xl text-blue-600 mt-4">
          AI-First Feature Breakdown
        </h1>
        <p className="text-lg text-white max-w-2xl mx-auto mt-2">
          Discover the powerful AI-powered features that make CampusDice.ai the
          ultimate campus management solution.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="px-10 mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => {
  const Icon = feature.icon; // dynamically assign the component
  return (
    <div
      key={index}
      className="p-6 min-h-[280px] rounded-lg border shadow-md text-white bg-gray-800 hover:shadow-lg transition"
    >
      <div className="mb-4 flex justify-between">
        {Icon && <Icon className="w-8 h-8 text-blue-500 bg-random" />}
      <button className="text-white mt-2 bg-green-400 px-3 py-1 rounded-full text-sm font-medium"> AI POWERED </button>
      </div>
      <h2 className="text-xl font-semibold mt-2">{feature.title}</h2>
      <p className="text-white mt-2">{feature.desc}</p>
    </div>
  );
})}

      </div>

      {/* Explore Button */}
      <div className="mt-10 text-center">
        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition">
          Explore All AI Features
        </button>
      </div>

      {/* Product in Action */}
      <div className="mt-20 text-center px-6">
        <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full font-medium">
          PRODUCT IN ACTION
        </button>
        <h1 className="mt-4 font-bold text-4xl md:text-5xl text-black dark:text-white">
          CampusDice.ai - Transforming Campuses Every Day
        </h1>
        <p className="text-lg max-w-2xl mx-auto mt-2 text-gray-700 dark:text-gray-300">
          Experience how our AI-powered platform revolutionizes campus management with
          real-time analytics, instant notifications, and effortless exam management.
        </p>
      </div>

      {/* Product in Action Content */}
      <div className="px-10 mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Image */}
        <div>
          <img
            src="https://campusdice.ai/video/GIF.gif"
            alt="CampusDice Demo"
            className="w-full rounded-lg shadow-lg object-cover"
          />
        </div>

        {/* Right Content */}
        <div className="space-y-6 text-left">
          {[
            {
              title: "Real-Time Student Analytics",
              desc: "Track academic progress seamlessly with comprehensive dashboards and insights.",
            },
            {
              title: "Instant Notifications",
              desc: "Stay updated on applications, exams, and placement opportunities in real-time.",
            },
            {
              title: "Effortless Exam Management",
              desc: "Automated grading, detailed performance metrics, and real-time reporting for academic excellence.",
            },
          ].map((item, i) => (
            <div key={i}>
              <h2 className="text-2xl font-semibold text-blue-600">{item.title}</h2>
              <p className="text-gray-700 dark:text-gray-300">{item.desc}</p>
            </div>
          ))}
          <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            Watch Full Demo
          </button>
        </div>
      </div>

      {/* Trusted Section */}
      <div className="text-center mt-20 px-6">
        <h1 className="font-bold text-3xl md:text-4xl">
          Trusted by Leading Educational Institutions Globally
        </h1>
        <ul className="flex flex-wrap justify-center gap-6 mt-6 text-lg font-medium text-gray-700 dark:text-gray-300">
          {["STANFORD", "MIT", "HARVARD", "OXFORD", "CAMBRIDGE", "BERKELEY"].map(
            (name, i) => (
              <li
                key={i}
                className="px-4 py-2 border rounded-lg shadow-sm bg-white dark:bg-gray-800"
              >
                {name}
              </li>
            )
          )}
        </ul>

        {/* Stats */}
        <div className="mt-10 flex flex-wrap justify-center gap-10">
          <div className="p-6 rounded-lg border shadow-md bg-white dark:bg-gray-800">
            <h2 className="text-3xl font-bold text-blue-600">99.9%</h2>
            <p className="text-gray-600 dark:text-gray-300">Uptime</p>
          </div>
          <div className="p-6 rounded-lg border shadow-md bg-white dark:bg-gray-800">
            <h2 className="text-3xl font-bold text-blue-600">GDPR</h2>
            <p className="text-gray-600 dark:text-gray-300">Compliance</p>
          </div>
          <div className="p-6 rounded-lg border shadow-md bg-white dark:bg-gray-800">
            <h2 className="text-3xl font-bold text-blue-600">AI</h2>
            <p className="text-gray-600 dark:text-gray-300">Driven Tech</p>
          </div>
        </div>
      </div>

      {/* Process Overview */}
      <div className="mt-20 text-center px-6">
        <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full font-medium">
          PROCESS OVERVIEW
        </button>
        <h1 className="mt-4 font-bold text-4xl md:text-5xl text-blue-600">
          How It Works
        </h1>
        <p className="text-lg max-w-2xl mx-auto mt-2 text-gray-700 dark:text-gray-300">
          Our seamless process delivers exceptional results in just three simple steps.
        </p>
      </div>

      {/* Process Steps */}
      <div className="mt-10 space-y-16">
        {steps.map((step, i) => (
          <div
            key={i}
            className="px-10 flex flex-col md:flex-row items-center gap-10"
          >
            {/* Left (Content) */}
            <div className="flex-1">
              <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full font-medium">
                {step.step}
              </button>
              <h1 className="text-2xl md:text-3xl font-bold mt-4">{step.title}</h1>
              <p className="mt-2 text-gray-700 dark:text-gray-300">{step.desc}</p>
              <ul className="list-disc list-inside mt-3 space-y-1 text-gray-700 dark:text-gray-300">
                {step.points.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>

            {/* Right (Image) */}
            <div className="flex-1">
              <img
                src={step.img}
                alt={step.title}
                className="w-full  rounded-lg shadow-lg"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
