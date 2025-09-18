"use client"; 
import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function SignUp() {
  const [fullname, setFullname] = useState("pawan");
  const [email, setEmail] = useState("pawanmaurya@gmail.com");
  const [password, setPassword] = useState("8591Password@");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/auth/signUp", {
        name: fullname,   // 👈 send as "name" to match backend
        email,
        password,
      });

      if (response.status === 201) {
        toast.success("User created successfully!");
        console.log("✅ User created:", response.data);
      } else {
        toast.error(response.data?.error || "Something went wrong");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.error || "Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12 bg-gray-200">
      <div className="w-full sm:max-w-md space-y-8 border-2 border-black rounded-lg p-8 bg-white">
        <div className="flex justify-center font-bold text-2xl">Sign Up</div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-6"
        >
          {/* Full Name */}
          <div>
            <label className="block text-lg font-medium">Full Name</label>
            <div className="mt-2 border-2 rounded-2xl">
              <input
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                type="text"
                placeholder="Enter your name"
                className="block w-full rounded-lg px-4 py-2 text-base"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-lg font-medium">Email address</label>
            <div className="mt-2 border-2 rounded-2xl">
              <input
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="block w-full rounded-lg px-4 py-2 text-base"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-lg font-medium">Password</label>
            <div className="mt-2 border-2 rounded-2xl">
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-lg px-4 py-2 text-base"
                required
              />
            </div>
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 disabled:opacity-50"
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}
