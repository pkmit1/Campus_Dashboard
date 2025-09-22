"use client"
import { Search } from "lucide-react"

interface Props {
  searchTerm: string
  setSearchTerm: (value: string) => void
  totalUsers: number
}

export default function SearchInput({ searchTerm, setSearchTerm, totalUsers }: Props) {
  return (
    <div className="m-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="text-2xl font-bold bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        Total Users: {totalUsers}
      </div>
      <div className="flex items-center gap-2 w-full max-w-md">
        <Search className="text-gray-400" />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 h-10 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400"
        />
      </div>
    </div>
  )
}
