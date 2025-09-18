const Process = () => {
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
    <section id="process" className="mt-20">
      <div className="text-center px-6">
        <button className="px-4 py-2 rounded-full font-medium border border-purple-500 bg-transparent bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
          PROCESS OVERVIEW
        </button>

        <h1 className="mt-5 text-4xl font-bold bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 bg-clip-text text-transparent">
          How It Works
        </h1>
        <p className="text-lg max-w-2xl mx-auto mt-2 text-white">
          Our seamless process delivers exceptional results in just three simple steps.
        </p>
      </div>

      {/* Process Steps */}
      <div className="mt-10 space-y-16 relative">
        <div className="hidden md:block absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500 transform -translate-x-1/2"></div>

        {steps.map((step, i) => (
          <div
            key={i}
            className="px-10 flex flex-col md:flex-row items-center gap-10 group relative"
          >
            {/* Left (Content) */}
            <div className="flex-1 transition-colors duration-300 group-hover:text-blue-400 md:pr-10">
              <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full font-medium">
                {step.step}
              </button>
              <h1 className="text-2xl hover:text-blue-500 md:text-3xl font-bold mt-4 text-white">{step.title}</h1>
              <p className="mt-2 text-gray-300">{step.desc}</p>
              <ul className="list-disc list-inside mt-3 space-y-1 text-gray-300">
                {step.points.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>

            {/* Right (Image) */}
            <div className="flex-1 relative">
              <img
                src={step.img}
                alt={step.title}
                className="w-full rounded-lg shadow-lg transform transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Process;