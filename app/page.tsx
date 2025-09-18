
export default function Home() {
  return (
    <div className="relative h-screen w-screen">
      {/* Background Image */}
     <img
  src="https://assets.nflxext.com/ffe/siteui/vlv3/8d617e19-3c3c-4c28-8998-c9b14dbc7200/web/IN-en-20250901-TRIFECTA-perspective_48d84d4e-9558-46b8-a0f3-8b2dc8478431_large.jpg"
  alt="Netflix Background"
  className="absolute inset-0 w-full h-full object-cover"
/>

      <div className="absolute inset-0 bg-black/60" />

      {/* Navbar with Logo */}
      <div className="absolute top-0 left-0 p-4">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
          alt="Netflix Logo"
          className="w-32"
        />
      </div>

      {/* Sign In Form */}
      <div className=" absolute mt-36 mx-auto left-0 right-0 flex items-center justify-center   ">
        <form className="w-full max-w-md rounded-lg p-12 bg-black/70">
          <p className="text-center text-3xl font-bold text-white mb-6">Sign In</p>

          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 mb-4 bg-black/50 border border-gray-500 rounded text-white placeholder-gray-400"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-6 bg-black/50 border border-gray-500 rounded text-white placeholder-gray-400"
          />

          <button
            type="submit"
            className="w-full p-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
