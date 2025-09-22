"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { SquarePen, Trash, Search } from "lucide-react"
import axios from "axios"
import { useEffect, useState } from "react"
import Navbar from "app/components/admin/Navbar"

// User type
interface User {
  id: number
  name: string
  email: string
  role: string
}

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [newRole, setNewRole] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    filterUsers()
  }, [searchTerm, users])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const res = await axios.get("/api/user")
      setUsers(res.data)
      setFilteredUsers(res.data)
    } catch (error) {
      console.error("❌ Failed to fetch users", error)
    } finally {
      setLoading(false)
    }
  }

  // Filter users by name or email
  const filterUsers = () => {
    const term = searchTerm.toLowerCase()
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
    )
    setFilteredUsers(filtered)
  }

  // Edit user role
  const handleEditSave = async () => {
    if (!editingUser) return
    try {
      await axios.put(`/api/user`, { id: editingUser.id, role: newRole })
      setUsers((prev) =>
        prev.map((user) =>
          user.id === editingUser.id ? { ...user, role: newRole } : user
        )
      )
      setEditingUser(null)
    } catch (error) {
      console.error("❌ Failed to update user", error)
    }
  }

  // Delete user
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this user?")) return
    try {
      await axios.delete(`/api/user?id=${id}`)
      setUsers((prev) => prev.filter((user) => user.id !== id))
    } catch (error) {
      console.error("❌ Failed to delete user", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <Navbar />

      <div className="flex-1 p-4 md:p-6 space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white text-center">
          👤 User Management
        </h1>

        {/* Search Input */}
        <div className="m-10 mt-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-3xl font-bold bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Total Users
          </div>
          <div className="flex items-center gap-2 w-full max-w-md">
            <Search className="text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
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
        ) : filteredUsers.length === 0 ? (
          <div className="flex items-center justify-center h-[calc(100vh-64px)] text-gray-500 text-center px-4">
            No users found!
          </div>
        ) : (
          <div className="px-10">
            {/* Desktop Table */}
            <div className="hidden md:block mt-6 rounded-lg overflow-hidden border border-gray-700 shadow-md">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-800">
                    <TableHead className="text-white">S.No</TableHead>
                    <TableHead className="text-white">Name</TableHead>
                    <TableHead className="text-white">Email</TableHead>
                    <TableHead className="text-white">Role</TableHead>
                    <TableHead className="text-center text-white">Edit</TableHead>
                    <TableHead className="text-center text-white">Delete</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user, i) => (
                    <TableRow
                      key={user.id}
                      className={`${
                        i % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                      } hover:bg-gray-700 transition`}
                    >
                      <TableCell className="font-medium">{i+1}</TableCell>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell className="text-center">
                        <button
                          className="p-2 bg-blue-600 rounded hover:bg-blue-700 transition"
                          onClick={() => {
                            setEditingUser(user)
                            setNewRole(user.role)
                          }}
                        >
                          <SquarePen />
                        </button>
                      </TableCell>
                      <TableCell className="text-center">
                        <button
                          className="p-2 bg-red-600 rounded hover:bg-red-700 transition"
                          onClick={() => handleDelete(user.id)}
                        >
                          <Trash />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile / Tablet Card View */}
            <div className="md:hidden mt-4 grid gap-4">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="p-4 rounded-lg bg-gray-900 border border-gray-700 shadow-md hover:shadow-lg transition"
                >
                  <p className="text-lg font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-400">{user.email}</p>
                  <p className="text-sm text-gray-300 mt-1">Role: {user.role}</p>
                  <div className="flex gap-2 mt-3">
                    <button
                      className="flex-1 p-2 bg-blue-600 rounded hover:bg-blue-700 transition text-white flex justify-center"
                      onClick={() => {
                        setEditingUser(user)
                        setNewRole(user.role)
                      }}
                    >
                      <SquarePen />
                    </button>
                    <button
                      className="flex-1 p-2 bg-red-600 rounded hover:bg-red-700 transition text-white flex justify-center"
                      onClick={() => handleDelete(user.id)}
                    >
                      <Trash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Edit Role Modal */}
      {editingUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
          <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">✏️ Edit Role</h2>
            <select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
            >
              <option value="ADMIN">ADMIN</option>
              <option value="EDITOR">EDITOR</option>
            </select>
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700"
                onClick={() => setEditingUser(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 rounded hover:bg-green-700"
                onClick={handleEditSave}
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
