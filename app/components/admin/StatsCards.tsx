"use client"
import { useRouter } from "next/navigation"

interface Stat {
  label: string
  value: number | null
  key: string
}

export default function StatsCards({ stats }: { stats: Stat[] }) {
  const router = useRouter()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="h-36 flex flex-col items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 shadow-lg cursor-pointer transition hover:brightness-110"

          onClick={() => {
            if (stat.key === "users") router.push("adminDashboard/user")
            else if (stat.key === "messages") router.push("adminDashboard/message")
            else if (stat.key === "pending") router.push("adminDashboard/pendingRequest")
          }}
        >
          <span className="text-lg font-medium">{stat.label}</span>
          <span className="text-2xl font-bold mt-2">{stat.value}</span>
        </div>
      ))}
    </div>
  )
}
