"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Search } from 'lucide-react';
import axios from "axios"
import Navbar from "../../components/admin/Navbar"
import { useEffect, useState } from "react"
import toast from "react-hot-toast";

interface Request {
  id: number
  name: string
  email: string
  subject: string
  message: string
  status: string
  conversation: string
}

export default function Message() {
  const [requests, setRequests] = useState<Request[]>([])
  const [filteredRequests, setFilteredRequests] = useState<Request[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Request | null>(null)
  const [editedConversation, setEditedConversation] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchRequests()
  }, [])

  useEffect(() => {
    filterRequests()
  }, [searchTerm, requests])

  const fetchRequests = async () => {
    try {
      setLoading(true)
      const res = await axios.get("/api/contact")
      setRequests(res.data)
      setFilteredRequests(res.data)
    } catch (error) {
      toast.error("Failed to fetch requests")
      console.error("Failed to fetch requests", error)
    } finally {
      setLoading(false)
    }
  }

  // Filter or Search by subject or message
  const filterRequests = () => {
    const term = searchTerm.toLowerCase()
    const filtered = requests.filter(
      (req) =>
        req.subject.toLowerCase().includes(term) ||
        req.message.toLowerCase().includes(term)
    )
    setFilteredRequests(filtered)
  }

  const handleStatusUpdate = async (id: number, newStatus: string) => {
    try {
      await axios.put("/api/contact", { id, status: newStatus })
      setRequests((prev) =>
        prev.map((req) =>
          req.id === id ? { ...req, status: newStatus } : req
        )
      )
    } catch (error) {
      toast.error("Failed to update reqyest")
      console.error("Failed to update request", error)
    }
  }

  const handleConversationSave = async () => {
    if (!editing) return
    try {
      const newStatus = editing.status === "completed" ? "completed" : "in progress"

      await axios.put("/api/contact", {
        id: editing.id,
        conversation: editedConversation,
        status: newStatus,
      })

      setRequests((prev) =>
        prev.map((req) =>
          req.id === editing.id
            ? { ...req, conversation: editedConversation, status: newStatus }
            : req
        )
      )
      setEditing(null)
    } catch (error) {
      console.error("❌ Failed to update conversation", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <Navbar />

      <div className="flex-1 p-4 md:p-6 space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white text-center">
          📩 All Messages
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
        ) : filteredRequests.length === 0 ? (
          <div className="flex items-center justify-center h-[calc(100vh-64px)] text-gray-500 text-center px-4">
            No messages found!
          </div>
        ) : (
          <div className="px-10">
            {/* Desktop Table */}
            <div className="  hidden md:block mt-10 rounded-lg overflow-hidden border-2 border-gray-700">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-800">
                    <TableHead className="text-white">S.No</TableHead>
                    <TableHead className="text-white">Name</TableHead>
                    <TableHead className="text-white">Email</TableHead>
                    <TableHead className="text-white">Subject</TableHead>
                    <TableHead className="text-white">Message</TableHead>
                    <TableHead className="text-white">Conversation</TableHead>
                    <TableHead className="text-white">Status</TableHead>
                    <TableHead className="text-right text-white">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.map((req, i) => (
                    <TableRow
                      key={req.id}
                      className={`${i % 2 === 0 ? "bg-gray-900" : "bg-gray-800"} hover:bg-gray-700 transition`}
                    >
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{req.name}</TableCell>
                      <TableCell>{req.email}</TableCell>
                      <TableCell>{req.subject}</TableCell>
                      <TableCell className="max-w-sm truncate">{req.message}</TableCell>
                      <TableCell className="max-w-sm truncate text-gray-300">
                        {req.conversation || "—"}
                      </TableCell>
                      <TableCell>
                        <select
                          value={req.status}
                          onChange={(e) => handleStatusUpdate(req.id, e.target.value)}
                          className="bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm"
                        >
                          {req.status === "pending" && <option value="pending">Pending</option>}
                          <option value="in progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                      </TableCell>
                      <TableCell className="text-right">
                        <button
                          className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
                          onClick={() => {
                            setEditing(req)
                            setEditedConversation(req.conversation || "")
                          }}
                        >
                          Edit Conversation
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile / Tablet Card View */}
            <div className="md:hidden mt-4 grid gap-4">
              {filteredRequests.map((req) => (
                <div
                  key={req.id}
                  className="p-4 rounded-lg bg-gray-900 border border-gray-700 shadow-md hover:shadow-lg transition"
                >
                  <p className="text-lg font-semibold">{req.name}</p>
                  <p className="text-sm text-gray-400">{req.email}</p>
                  <p className="mt-2 font-medium">{req.subject}</p>
                  <p className="text-sm text-gray-300 mt-1">{req.message}</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Conversation: <span className="text-white">{req.conversation || "—"}</span>
                  </p>
                  <div className="flex flex-col gap-2 mt-3">
                    <select
                      value={req.status}
                      onChange={(e) => handleStatusUpdate(req.id, e.target.value)}
                      className="bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm"
                    >
                      {req.status === "pending" && <option value="pending">Pending</option>}
                      <option value="in progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                    <button
                      className="w-full px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                      onClick={() => {
                        setEditing(req)
                        setEditedConversation(req.conversation || "")
                      }}
                    >
                      Edit Conversation
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Edit Conversation Modal */}
      {editing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
          <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">✏️ Edit Conversation</h2>
            <textarea
              value={editedConversation}
              onChange={(e) => setEditedConversation(e.target.value)}
              className="w-full h-32 p-2 rounded bg-gray-800 border border-gray-700 text-white"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700"
                onClick={() => setEditing(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 rounded hover:bg-green-700"
                onClick={handleConversationSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
