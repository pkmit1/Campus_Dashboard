"use client"

import axios from 'axios'
import { Mail, Phone, MapPin } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

const ContactHero = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

 const handleSubmit = async (e) => {
  e.preventDefault() // prevent page reload

  try {
    const res = await axios.post("/api/contact", {
      name,
      email,
      subject,
      message,
    })

    if (res.status === 200) {
      toast.success("Message sent Successfully")
      // Reset form fields
      setName("")
      setEmail("")
      setSubject("")
      setMessage("")
    }
  } catch (error) {
    console.error("❌ Error submitting form:", error)
     toast.error("Something went wrong. Please try again.");
  }
}

  return (
    <div className="bg-black text-white px-6 py-12 md:px-16 md:py-20">
      {/* Top Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-7xl font-bold mb-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Let's Connect
          </h1>
          <p className="text-gray-300 mb-6">
            We're eager to collaborate on your next AI innovation. 
            Reach out and let's explore the future together.
          </p>
          <div className="flex gap-4">
            <button className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:scale-105 transition transform font-semibold">
              Send Message
            </button>
            <button className="border border-gray-400 hover:bg-gray-800 px-5 py-2 rounded-lg transition">
              Contact Info
            </button>
          </div>
        </div>
        <div>
          <img
            src="https://campusdice.ai/_next/image?url=%2Fimages%2Fcontact%20us%20header%202.png&w=1080&q=75"
            alt="hero-img"
            className="rounded-xl shadow-lg"
          />
        </div>
      </div>

      {/* Contact Info */}
      <div className="mt-16">
        <h1 className="text-center text-5xl font-bold mb-8 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          How to Reach Us
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center bg-gray-900 p-6 rounded-xl shadow-md h-70">
            <Mail className="mt-10 w-12 h-12 border-2 text-pink-500 rounded-full bg-amber-50 p-2 mb-4" />
            <h2 className="font-semibold text-lg">Email Us</h2>
            <p className="text-gray-400 mt-2">product@campushiring.in</p>
          </div>
          <div className="flex flex-col items-center text-center bg-gray-900 p-6 rounded-xl shadow-md h-70">
            <Phone className="mt-10 w-12 h-12 border-2 text-green-500 rounded-full bg-amber-50 p-2 mb-4" />
            <h2 className="font-semibold text-lg">Call Us</h2>
            <p className="text-gray-400 mt-2">+91 98765 43210</p>
          </div>
          <div className="flex flex-col items-center text-center bg-gray-900 p-6 rounded-xl shadow-md h-70">
            <MapPin className="mt-10 w-12 h-12 border-2 text-blue-500 rounded-full bg-amber-50 p-2 mb-4" />
            <h2 className="font-semibold text-lg">Our Location</h2>
            <p className="text-gray-400 mt-2">123 AI Street, Tech City</p>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="mt-16">
        <h1 className="text-center text-5xl font-bold mb-8 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Send a Message
        </h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-8 bg-gray-900/70 backdrop-blur-lg p-10 rounded-3xl border border-gray-800 shadow-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-300">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-5 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-600 transition-all text-lg"
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-600 transition-all text-lg"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium mb-2 text-gray-300">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-5 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-600 transition-all text-lg"
              placeholder="How can we help?"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-300">
              Message
            </label>
            <textarea
              id="message"
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-5 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-600 transition-all text-lg"
              placeholder="Tell us about your project or inquiry..."
              required
            ></textarea>
          </div>
          <button
          onClick={handleSubmit}
            type="submit"
            className="flex items-center justify-center w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl font-bold text-xl transition-all shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
          >
            Send Message
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-3 text-2xl transition-transform group-hover:translate-x-1"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>
    </div>
  )
}

export default ContactHero
