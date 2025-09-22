"use client"
import { useRouter } from "next/navigation"

interface Notification {
  id: number
  name: string
  email: string
  subject: string
  message: string
  status?: string
  conversation?: string
}

export default function TaskList({ notifications }: { notifications: Notification[] }) {
  const router = useRouter()
  const preview = notifications.slice(0, 6) // show only 6 items

  return (
    <div className="mt-12 px-4 md:px-8">
      {/* Header */}
      <h1 className="mb-8 text-5xl font-extrabold text-center bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        Task List
      </h1>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {preview.length > 0 ? (
          preview.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-xl bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-700 hover:border-blue-500"
            >
              <p className="text-lg font-semibold text-white mb-1">{item.name}</p>
              <p className="text-sm text-gray-400 mb-2">{item.email}</p>
              <p className="text-md font-medium text-indigo-400 mb-1">{item.subject}</p>
              <p className="text-sm text-gray-300 mb-2 truncate">{item.message}</p>
              <p className="text-sm text-gray-300 mb-1">
                Status: <span className={`font-semibold ${item.status === "completed" ? "text-green-400" : "text-yellow-400"}`}>{item.status || "Pending"}</span>
              </p>
              {item.conversation && (
                <p className="text-sm text-blue-400 truncate">
                  Conversation: {item.conversation}
                </p>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-400 col-span-full text-center py-10">No notifications yet.</p>
        )}
      </div>

      {/* See More Button */}
      {notifications.length > 6 && (
        <div className="flex justify-center mt-8">
          <button
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-semibold hover:scale-105 transition-transform"
            onClick={() => router.push("/adminDashboard/message")}
          >
            See More →
          </button>
        </div>
      )}
    </div>
  )
}
