"use client"
import * as React from "react"
import axios from "axios"
import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, SortingState, flexRender } from "@tanstack/react-table"
import Navbar from "app/components/admin/Navbar"
import { SquarePen, Trash } from "lucide-react"

import { columns, User } from "../../components/admin/userComponent/Columns"
import SearchInput from "../../components/admin/userComponent/SearchInput"
import Pagination from "../../components/admin/userComponent/Pagination"
import EditRoleModal from "../../components/admin/userComponent/EditRoleModel"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function UserTableAllNative() {
  const [users, setUsers] = React.useState<User[]>([])
  const [loading, setLoading] = React.useState(true)
  const [editingUser, setEditingUser] = React.useState<User | null>(null)
  const [newRole, setNewRole] = React.useState("")
  const [searchTerm, setSearchTerm] = React.useState("")
  const [sorting, setSorting] = React.useState<SortingState>([])

  React.useEffect(() => { fetchUsers() }, [])

  const fetchUsers = async () => {
    try { setLoading(true); const res = await axios.get("/api/user"); setUsers(res.data) }
    catch (error) { console.error(error) } 
    finally { setLoading(false) }
  }

  const filteredUsers = React.useMemo(() => {
    const term = searchTerm.toLowerCase()
    return users.filter(u => u.name.toLowerCase().includes(term) || u.email.toLowerCase().includes(term))
  }, [users, searchTerm])

  const table = useReactTable({
    data: filteredUsers,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const handleEditSave = async () => {
    if (!editingUser) return
    try {
      await axios.put(`/api/user`, { id: editingUser.id, role: newRole })
      setUsers(prev => prev.map(u => u.id === editingUser.id ? { ...u, role: newRole } : u))
      setEditingUser(null)
    } catch (error) { console.error(error) }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return
    try { await axios.delete(`/api/user?id=${id}`); setUsers(prev => prev.filter(u => u.id !== id)) }
    catch (error) { console.error(error) }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <Navbar />
      <div className="flex-1 p-4 md:p-6 space-y-6">
        <SearchInput 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        totalUsers={users.length} 
        />

        <div className="overflow-hidden rounded-md border  border-gray-800">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <TableHead className="text-white font-bold" key={header.id}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                  <TableHead className="text-white gapfont-bold">Edit</TableHead>
                  <TableHead className="text-white  font-bold">Delete</TableHead>
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? table.getRowModel().rows.map(row => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                  <TableCell className="text-center">
                    <button className="p-2 bg-blue-600 rounded hover:bg-blue-700 transition"
                      onClick={() => { setEditingUser(row.original); setNewRole(row.original.role) }}>
                      <SquarePen />
                    </button>
                  </TableCell>
                  <TableCell className="text-center">
                    <button className="p-2 bg-red-600 rounded hover:bg-red-700 transition" onClick={() => handleDelete(row.original.id)}>
                      <Trash />
                    </button>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={columns.length + 2} className="h-24 text-center">No results.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <Pagination table={table} />
      </div>

      <EditRoleModal
        editingUser={editingUser}
        newRole={newRole}
        setNewRole={setNewRole}
        onClose={() => setEditingUser(null)}
        onSave={handleEditSave}
      />
    </div>
  )
}
