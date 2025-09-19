"use client"
import { Bell } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import axios from "axios"

interface Notification {
  id: number
  name: string
  email: string
  subject: string
  message: string
  status?: string
  conversation?: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)
  const [editingConversation, setEditingConversation] = useState<number | null>(null)
  const [conversationText, setConversationText] = useState("")
  const [userCount, setUserCount] = useState<number | null>(null)
  const stats = [
    { label: "Total Users", value: userCount },
    { label: "Total Messages", value: notifications.length },
    { label: "Active Services", value: 0 },
    { label: "Pending Requests", value: notifications.filter(n => n.status === "pending").length },
  ]

  useEffect(() => {
    fetchNotifications()
    FetchUser()
  }, [])

  const FetchUser=async()=>{
    try {
        const res=await axios.get("/api/user")
        setUserCount(res.data.length)
    } catch (error) {
       console.error("Failed to fetch notifications", error) 
    }
  }

  const fetchNotifications = async () => {
    try {
      const res = await axios.get("/api/contact")
      setNotifications(res.data)
    } catch (error) {
      console.error("Failed to fetch notifications", error)
    }
  }

  const handleStatusChange = async (id: number, status: string) => {
    try {
      await axios.put("/api/contact", { id, status })
      setNotifications(prev =>
        prev.map(n => (n.id === id ? { ...n, status } : n))
      )
      setActiveDropdown(null)
    } catch (error) {
      console.error("Failed to update status", error)
    }
  }

  const handleConversationUpdate = async (id: number) => {
    try {
      await axios.put("/api/contact", { id, conversation: conversationText })
      setNotifications(prev =>
        prev.map(n => (n.id === id ? { ...n, conversation: conversationText } : n))
      )
      setEditingConversation(null)
      setConversationText("")
    } catch (error) {
      console.error("Failed to update conversation", error)
    }
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      {/* Navbar */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <img
            className="h-10 w-10"
            src="https://campusdice.ai/_next/image?url=%2Fimages%2FCampus%20Dice%20logo.svg&w=384&q=75"
            alt="logo"
          />
          <span className="text-xl font-bold">Admin Dashboard</span>
        </div>
        {/* <div className="flex items-center gap-6">
          <ul className="flex gap-4 font-medium text-gray-300">
            <li className="hover:text-white cursor-pointer">User</li>
            <li className="hover:text-white cursor-pointer">Messages</li>
          </ul>
          
        </div> */}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="h-36 flex flex-col items-center justify-center rounded-xl bg-gray-500 shadow-lg"
          >
            <span className="text-lg font-medium">{stat.label}</span>
            <span className="text-2xl font-bold mt-2">{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Task List Header */}
      <h1 className="mt-12 mb-6 text-5xl font-extrabold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        Task List
      </h1>

      {/* Notifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notifications.length > 0 ? (
          notifications.map((item, index) => (
            <div key={item.id} className="p-4 bg-gray-800 rounded-lg relative shadow-lg hover:shadow-xl transition-shadow">
              <div className="space-y-1">
                <p className="text-white font-semibold">{item.name}</p>
                <p className="text-gray-300 text-sm">{item.email}</p>
                <p className="text-white font-medium">{item.subject}</p>
                <p className="text-gray-400 text-sm">{item.message}</p>
                <p className="text-gray-400 text-sm">
                  Status: <span className="font-semibold text-white">{item.status || "Pending"}</span>
                </p>
                {item.conversation && (
                  <p className="text-blue-400 text-sm">Conversation: {item.conversation}</p>
                )}
              </div>

              {/* Status Dropdown */}
              <button
                className="absolute top-2 right-2 text-white font-bold px-2 py-1 bg-gray-700 rounded hover:bg-gray-600"
                onClick={() => setActiveDropdown(activeDropdown === index ? null : index)}
              >
                +
              </button>

              {activeDropdown === index && (
                <div className="absolute top-10 right-2 bg-gray-900 border border-gray-600 rounded shadow-md z-10">
                  {["Pending", "In Progress", "Completed"].map(statusOption => (
                    <div
                      key={statusOption}
                      className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                      onClick={() => handleStatusChange(item.id, statusOption)}
                    >
                      {statusOption}
                    </div>
                  ))}
                  <div className="px-4 py-2 border-t border-gray-700">
                    <button
                      className="w-full text-left text-blue-400 hover:text-blue-600"
                      onClick={() => {
                        setEditingConversation(item.id)
                        setConversationText(item.conversation || "")
                        setActiveDropdown(null)
                      }}
                    >
                      Edit Conversation
                    </button>
                  </div>
                </div>
              )}

              {/* Conversation Edit */}
              {editingConversation === item.id && (
                <div className="mt-2">
                  <textarea
                    className="w-full p-2 rounded bg-gray-700 text-white resize-none"
                    rows={3}
                    value={conversationText}
                    onChange={e => setConversationText(e.target.value)}
                    placeholder="Type conversation..."
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      className="px-4 py-1 bg-blue-600 rounded hover:bg-blue-700"
                      onClick={() => handleConversationUpdate(item.id)}
                    >
                      Save
                    </button>
                    <button
                      className="px-4 py-1 bg-gray-600 rounded hover:bg-gray-700"
                      onClick={() => setEditingConversation(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-400 col-span-full">No notifications yet.</p>
        )}
      </div>
    </div>
  )
}
