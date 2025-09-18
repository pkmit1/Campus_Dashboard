"use client";

export default function ProductInAction() {
  return (
    <section className="mt-24 text-center px-6">
      {/* Transparent Gradient Badge */}
      <div className="inline-block relative group">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 p-[2px] blur-md opacity-70 group-hover:opacity-100 transition"></div>
        <div className="relative px-6 py-2 rounded-full bg-transparent border border-cyan-400/40 backdrop-blur-md text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 font-medium text-sm tracking-wide">
          PRODUCT IN ACTION
        </div>
      </div>

      <h1 className="mt-6 font-bold text-4xl md:text-5xl text-white">
        CampusDice.ai – Transforming Campuses Every Day
      </h1>
      <p className="text-lg max-w-2xl mx-auto mt-3 text-gray-300">
        Experience how our AI-powered platform revolutionizes campus management
        with real-time analytics, instant notifications, and effortless exam
        management.
      </p>

      {/* Grid Layout */}
      <div className="px-6 md:px-20 mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Image with Glow */}
        <div className="relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-lg blur-lg opacity-40 animate-pulse"></div>
          <img
            src="https://campusdice.ai/video/GIF.gif"
            alt="CampusDice Demo"
            className="w-full rounded-lg shadow-[0_0_25px_rgba(0,255,255,0.4)] object-cover relative"
          />
        </div>

        {/* Right Content */}
        <div className="space-y-8 text-left px-25">
          {[
            {
              title: "📈 Real-Time Student Analytics",
              desc: "Track academic progress seamlessly with comprehensive dashboards and insights.",
            },
            {
              title: "📋 Instant Notifications",
              desc: "Stay updated on applications, exams, and placement opportunities in real-time.",
            },
            {
              title: "🏅 Effortless Exam Management",
              desc: "Automated grading, detailed performance metrics, and real-time reporting for academic excellence.",
            },
          ].map((item, i) => (
            <div key={i} className="group">
              <h2 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition">
                {item.title}
              </h2>
              <p className="text-gray-400 mt-1">{item.desc}</p>
            </div>
          ))}

          {/* CTA Button */}
          <button className="flex  px-8 py-3 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-lg transition transform hover:scale-105 text-white font-semibold shadow-md">
            Watch Full Demo →
          </button>
        </div>
      </div>
    </section>
  );
}
