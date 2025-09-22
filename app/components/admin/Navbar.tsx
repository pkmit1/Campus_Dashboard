"use client"

import { useRouter } from "next/navigation"
import { Users, MessageCircle } from "lucide-react"
import { useState } from "react"

export default function Navbar() {
  const [isOpen,setIsOpen]=useState(false)

  const router = useRouter()

  const navLink=[
    {name:"User",herf:"/adminDashboard/user"},
    {name:"Message", herf:"/adminDashboard/message"}

  ]

  return (
    <div className="fixed top-0 left-0 right-0 z-20 bg-gray-900 border-b border-gray-700">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div
          onClick={() => router.push("/adminDashboard")}
          className="flex items-center gap-3 cursor-pointer bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text text-transparent"
        >
          <img
            src="https://campusdice.ai/_next/image?url=%2Fimages%2FCampus%20Dice%20logo.svg&w=384&q=75"
            alt="logo"
            width={40}
            height={40}
            className="rounded-md"
          />
          <span className="text-xl font-bold">Admin Dashboard</span>
        </div>

        
        <div className="absolute left-120 transform -translate-x-1/2 flex items-center gap-8 text-xl font-bold text-gray-200">
          <div className="flex items-center gap-2 cursor-pointer text-cyan-200 hover:text-cyan-500">
            <Users size={20} />
            <span onClick={()=>router.push("/adminDashboard/user")}>User</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer text-purple-300 hover:text-purple-500">
            <MessageCircle size={20} />
            <span>Message</span>
          </div>
        </div>
      </div>


      {/*mobile view*/}
      {/* {isOpen &&(
        
      )

      } */}
    </div>
  )
}
