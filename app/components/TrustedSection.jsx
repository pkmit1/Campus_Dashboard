"use client";

export default function TrustedSection() {
  const universities = [
    "STANFORD",
    "MIT",
    "HARVARD",
    "OXFORD",
    "CAMBRIDGE",
    "BERKELEY",
  ];

  const stats = [
    { label: "Uptime", value: "99.9%" },
    { label: "GDPR Compliant", value: "GDPR" },
    { label: "AI Secured", value: "AI" },
  ];

  // Different gradient colors for each circle
  const gradients = [
    "from-green-400 to-green-600",
    "from-blue-400 to-blue-600",
    "from-purple-400 to-pink-500",
  ];

  return (
    <section className="text-center mt-20 px-6">
      <h1 className="font-bold text-3xl md:text-4xl text-white">
        Trusted by Leading Educational Institutions Globally
      </h1>

      {/* Universities */}
      <ul className="flex flex-wrap justify-center gap-6 mt-6 text-lg font-medium">
        {universities.map((name, i) => (
          <li
            key={i}
          
          >
            {name}
          </li>
        ))}
      </ul>

      {/* Stats */}
      <div className="flex flex-wrap justify-center items-center mt-7 gap-12">
        {stats.map((stat, i) => (
          <div key={i} className="flex flex-col items-center gap-4 group">
            <div
              className={`relative flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-tr ${gradients[i]} p-[2px]`}
            >
              <div className="absolute inset-0 rounded-full blur-xl opacity-60 bg-gradient-to-tr from-transparent via-white/20 to-transparent"></div>
              <div className="flex flex-col items-center justify-center w-full h-full rounded-full bg-black text-white font-semibold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-circle-check-big w-6 h-6 mb-1"
                >
                  <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                  <path d="m9 11 3 3L22 4"></path>
                </svg>
                {stat.value}
              </div>
            </div>
            <span className="text-white font-medium">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
