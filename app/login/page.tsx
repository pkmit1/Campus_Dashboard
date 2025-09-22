"use client";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
  const email = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validateEmail = (value: string) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);

  const handleSubmit = async () => {
    const emailVal = email.current?.value || "";
    const passwordVal = password.current?.value || "";

    if (!validateEmail(emailVal)) {
      toast.error("Invalid email format");
      return;
    }
    if (!passwordVal) {
      toast.error("Password required");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/auth/login", {
        email: emailVal,
        password: passwordVal,
      });

      if (response.status === 200) {
        const user = response.data.user;

        toast.success("Login successful!");

        // ✅ Redirect based on role
        if (user.role === "ADMIN") {
          router.push("/adminDashboard");
        } else if (user.role === "VIEWER") {
          router.push("/");
        } else {
          router.push("/dashboard"); // default
        }
      } else {
        toast.error(response.data?.error || "Login failed");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12 bg-gray-800">
      <div className="w-full sm:max-w-md space-y-8 border-2 border-black rounded-lg p-8 bg-white">
        <h2 className="text-3xl font-extrabold text-center">Sign In</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-6"
        >
          <input
            ref={email}
            type="email"
            placeholder="Email"
            className="block w-full border rounded-lg px-4 py-2"
          />
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="block w-full border rounded-lg px-4 py-2"
          />

          {errorMessage && <div className="text-red-500">{errorMessage}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-500 text-white py-2 rounded-lg"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
