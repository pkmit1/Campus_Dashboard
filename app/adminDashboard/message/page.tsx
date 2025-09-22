"use client"

import { useEffect, useMemo, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, ColumnDef, SortingState, flexRender } from "@tanstack/react-table"

import Navbar from "../../components/admin/Navbar"
import TableComponent from "../../components/admin/messageComponent/TableComponent" // We'll create this
import EditConversationModal from "../../components/admin/messageComponent/EditConversationModal" // We'll create this

import { Search } from "lucide-react"

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
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Request | null>(null)
  const [editedConversation, setEditedConversation] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [sorting, setSorting] = useState<SortingState>([])

  // Fetch requests
  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    try {
      setLoading(true)
      const res = await axios.get("/api/contact")
      setRequests(res.data)
    } catch (error) {
      toast.error("Failed to fetch requests")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  // Filter requests based on search term
  const filteredRequests = useMemo(() => {
    const term = searchTerm.toLowerCase()
    return requests.filter(req =>
      req.name.toLowerCase().includes(term) ||
      req.email.toLowerCase().includes(term) ||
      req.subject.toLowerCase().includes(term) ||
      req.message.toLowerCase().includes(term)
    )
  }, [requests, searchTerm])

  // Update status
  const handleStatusUpdate = async (id: number, newStatus: string) => {
    try {
      await axios.put("/api/contact", { id, status: newStatus })
      setRequests(prev =>
        prev.map(req => (req.id === id ? { ...req, status: newStatus } : req))
      )
    } catch (error) {
      toast.error("Failed to update request")
      console.error(error)
    }
  }

  // Save edited conversation
  const handleConversationSave = async () => {
    if (!editing) return
    try {
      const newStatus = editing.status === "completed" ? "completed" : "in progress"

      await axios.put("/api/contact", {
        id: editing.id,
        conversation: editedConversation,
        status: newStatus
      })

      setRequests(prev =>
        prev.map(req =>
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
        <h1 className="text-2xl md:text-3xl font-bold text-center text-white">
          All Messages
        </h1>

        {/* Search Bar */}
        <div className="px-10 mt-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-3xl font-bold bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Total Messages: {filteredRequests.length}
          </div>
          <div className="flex items-center gap-2 w-full max-w-md">
            <Search className="text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, subject or message..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 h-10 rounded bg-gray-800 border border-gray-600 text-white placeholder-gray-400"
            />
          </div>
        </div>

        {/* Table Component */}
        <TableComponent
          requests={filteredRequests}
          loading={loading}
          sorting={sorting}
          setSorting={setSorting}
          handleStatusUpdate={handleStatusUpdate}
          setEditing={setEditing}
          setEditedConversation={setEditedConversation}
        />

        {/* Edit Modal */}
        {editing && (
          <EditConversationModal
            editing={editing}
            editedConversation={editedConversation}
            setEditedConversation={setEditedConversation}
            onClose={() => setEditing(null)}
            onSave={handleConversationSave}
          />
        )}
      </div>
    </div>
  )
}
