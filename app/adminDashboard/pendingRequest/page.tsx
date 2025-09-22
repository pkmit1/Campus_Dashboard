"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import axios from "axios"
import { Search } from "lucide-react"
import Navbar from "../../components/admin/Navbar"
import { useEffect, useState } from "react"

interface Request {
  id: number
  name: string
  email: string
  subject: string
  message: string
  status: string
}

export default function PendingRequests() {
  const [allRequests, setAllRequests] = useState<Request[]>([]) 
  const [requests, setRequests] = useState<Request[]>([]) 
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchRequests()
  }, [])

  useEffect(() => {
    filterRequests()
  }, [searchTerm, allRequests])

  const fetchRequests = async () => {
    try {
      setLoading(true)
      const res = await axios.get("/api/contact")
      const pending = res.data.filter((r: Request) => r.status === "pending")
      setAllRequests(pending)
      setRequests(pending)
    } catch (error) {
      console.error("❌ Failed to fetch requests", error)
    } finally {
      setLoading(false)
    }
  }

  const filterRequests = () => {
    const term = searchTerm.toLowerCase()
    const filtered = allRequests.filter(
      (req) =>
        req.subject.toLowerCase().includes(term) ||
        req.message.toLowerCase().includes(term)
    )
    setRequests(filtered)
  }

  const handleStatusUpdate = async (id: number, newStatus: string) => {
    try {
      await axios.put("/api/contact", { id, status: newStatus })
      setAllRequests((prev) => prev.filter((req) => req.id !== id))
      setRequests((prev) => prev.filter((req) => req.id !== id))
    } catch (error) {
      console.error("❌ Failed to update request", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <Navbar />

      <div className="flex-1 p-4 md:p-6 space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white text-center">
          📌 Pending Requests
        </h1>

        {/* Search Input */}
        <div className="px-10 mt-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-3xl font-bold bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Total Messages
          </div>
          <div className="flex items-center gap-2 w-full max-w-md">
            <Search className="text-gray-400" />
            <input
              type="text"
              placeholder="Search by subject or message..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 h-10 rounded bg-gray-800 border border-gray-600 text-white placeholder-gray-400"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-[calc(100vh-64px)]">
            <div className="w-10 h-10 border-4 border-gray-400 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : requests.length === 0 ? (
          <div className="flex items-center justify-center h-[calc(100vh-64px)] text-gray-500 text-center px-4">
            No pending requests!
          </div>
        ) : (
          <div className="px-10">
            {/* Desktop Table */}
            <div className="hidden md:block mt-6 rounded-lg overflow-hidden border border-gray-700">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-800">
                    <TableHead className="text-white">S.No</TableHead>
                    <TableHead className="text-white">Name</TableHead>
                    <TableHead className="text-white">Email</TableHead>
                    <TableHead className="text-white">Subject</TableHead>
                    <TableHead className="text-white">Message</TableHead>
                    <TableHead className="text-white">Status</TableHead>
                    <TableHead className="text-right text-white">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.map((req, i) => (
                    <TableRow
                      key={req.id}
                      className={`${
                        i % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                      } hover:bg-gray-700 transition`}
                    >
                      <TableCell className="font-medium">{i+1}</TableCell>
                      <TableCell className="font-medium">{req.name}</TableCell>
                      <TableCell>{req.email}</TableCell>
                      <TableCell>{req.subject}</TableCell>
                      <TableCell className="max-w-sm truncate">{req.message}</TableCell>
                      <TableCell className="text-yellow-400 font-semibold">{req.status}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <button
                          className="px-3 py-1 rounded border border-yellow-400 text-yellow-300 hover:bg-yellow-500 hover:text-black transition"
                          onClick={() => handleStatusUpdate(req.id, "in progress")}
                        >
                          In Progress
                        </button>
                        <button
                          className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700 transition"
                          onClick={() => handleStatusUpdate(req.id, "completed")}
                        >
                          Complete
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile / Tablet Card View */}
            <div className="md:hidden mt-4">
              <div className="text-center py-2 font-semibold text-white bg-gray-800 rounded-t-lg">
                Pending Requests
              </div>
              <div className="grid gap-4">
                {requests.map((req) => (
                  <div
                    key={req.id}
                    className="p-4 rounded-b-lg bg-gray-900 border border-gray-700 shadow-md hover:shadow-lg transition"
                  >
                    <p className="text-lg font-semibold">{req.name}</p>
                    <p className="text-sm text-gray-400">{req.email}</p>
                    <p className="mt-2 font-medium">{req.subject}</p>
                    <p className="text-sm text-gray-300 mt-1">{req.message}</p>
                    <p className="text-yellow-400 text-sm mt-2">
                      Status: <span className="font-semibold">{req.status}</span>
                    </p>
                    <div className="flex gap-2 mt-3">
                      <button
                        className="flex-1 px-3 py-1 text-sm border border-yellow-400 text-yellow-300 rounded hover:bg-yellow-500 hover:text-black transition"
                        onClick={() => handleStatusUpdate(req.id, "in progress")}
                      >
                        In Progress
                      </button>
                      <button
                        className="flex-1 px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition"
                        onClick={() => handleStatusUpdate(req.id, "completed")}
                      >
                        Complete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
