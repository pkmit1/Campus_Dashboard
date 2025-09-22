"use client"
import { useEffect, useState } from "react"
import axios from "axios"
import Navbar from "../components/admin/Navbar"
import StatsCards from "../components/admin/StatsCards"
import TaskList from "../components/admin/TaskList"

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
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [userCount, setUserCount] = useState<number>(0)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const usersRes = await axios.get("/api/user")
      setUserCount(usersRes.data.length)

      const notifRes = await axios.get("/api/contact")
      setNotifications(notifRes.data)
    } catch (error) {
      console.error("❌ Fetch error:", error)
    }
  }

  const stats = [
    { label: "Total Users", value: userCount, key: "users" },
    { label: "Total Messages", value: notifications.length, key: "messages" },
    { label: "Active Services", value: 0, key: "services" },
    { label: "Pending Requests", value: notifications.filter(n => n.status === "pending").length, key: "pending" },
  ]

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <Navbar />
      <StatsCards stats={stats} />
      <TaskList notifications={notifications} />
    </div>
  )
}
