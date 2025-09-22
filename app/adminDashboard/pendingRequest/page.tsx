"use client"

import { useEffect, useMemo, useState } from "react"
import axios from "axios"
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
  SortingState,
  flexRender,
} from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Navbar from "../../components/admin/Navbar"
import { Search, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"

interface Request {
  id: number
  name: string
  email: string
  subject: string
  message: string
  status: string
}

const columns: ColumnDef<Request>[] = [
  { 
    header: "S.No",
    cell: ({ row }) => row.index + 1
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <button className="flex items-center gap-1" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Name
        {column.getIsSorted() === "asc" ? <ArrowUp className="h-4 w-4" /> :
         column.getIsSorted() === "desc" ? <ArrowDown className="h-4 w-4" /> :
         <ArrowUpDown className="h-4 w-4" />}
      </button>
    )
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <button className="flex items-center gap-1" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Email
        {column.getIsSorted() === "asc" ? <ArrowUp className="h-4 w-4" /> :
         column.getIsSorted() === "desc" ? <ArrowDown className="h-4 w-4" /> :
         <ArrowUpDown className="h-4 w-4" />}
      </button>
    )
  },
  { accessorKey: "subject", header: "Subject" },
  { accessorKey: "message", header: "Message" },
  { accessorKey: "status", header: "Status" }
]


export default function PendingRequests() {
  const [allRequests, setAllRequests] = useState<Request[]>([])
  const [loading, setLoading] = useState(true)
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
      const pending = res.data.filter((r: Request) => r.status === "pending")
      setAllRequests(pending)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const filteredRequests = useMemo(() => {
    const term = searchTerm.toLowerCase()
    return allRequests.filter(req =>
      req.name.toLowerCase().includes(term) ||
      req.email.toLowerCase().includes(term) ||
      req.subject.toLowerCase().includes(term) ||
      req.message.toLowerCase().includes(term)
    )
  }, [allRequests, searchTerm])

  const table = useReactTable({
    data: filteredRequests,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: { pagination: { pageSize: 5 } }
  })

  const handleStatusUpdate = async (id: number, newStatus: string) => {
    try {
      await axios.put("/api/contact", { id, status: newStatus })
      setAllRequests(prev => prev.filter(r => r.id !== id))
    } catch (error) {
      console.error(error)
    }
  }


    return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <Navbar />
      <div className="flex-1 p-4 md:p-6 space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-white">
          📌 Pending Requests
        </h1>

        {/* Search */}
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

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-10 h-10 border-4 border-gray-400 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="flex items-center justify-center h-64 text-gray-500 text-center">
            No pending requests!
          </div>
        ) : (
          <div className="px-10">
            <div className="hidden md:block mt-6 rounded-lg overflow-hidden border border-gray-700">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map(headerGroup => (
                    <TableRow key={headerGroup.id} className="bg-gray-800">
                      {headerGroup.headers.map(header => (
                        <TableHead key={header.id} className="text-white font-bold">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      ))}
                      <TableHead className="text-right text-white">Actions</TableHead>
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows.map(row => (
                    <TableRow key={row.id} className="hover:bg-gray-700 transition">
                      {row.getVisibleCells().map(cell => (
                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                      ))}
                      <TableCell className="text-right space-x-2">
                        <button className="px-3 py-1 rounded border border-yellow-400 text-yellow-300 hover:bg-yellow-500 hover:text-black transition"
                          onClick={() => handleStatusUpdate(row.original.id, "in progress")}>
                          In Progress
                        </button>
                        <button className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700 transition"
                          onClick={() => handleStatusUpdate(row.original.id, "completed")}>
                          Complete
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile / Tablet */}
            <div className="md:hidden mt-4 grid gap-4">
              {table.getRowModel().rows.map(row => (
                <div key={row.id} className="p-4 rounded bg-gray-900 border border-gray-700 shadow-md hover:shadow-lg transition">
                  <p className="font-semibold">{row.original.name}</p>
                  <p className="text-sm text-gray-400">{row.original.email}</p>
                  <p className="mt-1 font-medium">{row.original.subject}</p>
                  <p className="text-sm text-gray-300 mt-1 truncate">{row.original.message}</p>
                  <p className="text-yellow-400 mt-2">Status: <span className="font-semibold">{row.original.status}</span></p>
                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 px-3 py-1 text-sm border border-yellow-400 text-yellow-300 rounded hover:bg-yellow-500 hover:text-black transition"
                      onClick={() => handleStatusUpdate(row.original.id, "in progress")}>In Progress</button>
                    <button className="flex-1 px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition"
                      onClick={() => handleStatusUpdate(row.original.id, "completed")}>Complete</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between space-x-2 py-4">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium">Rows per page</p>
                <select
                  value={table.getState().pagination.pageSize}
                  onChange={(e) => table.setPageSize(Number(e.target.value))}
                  className="h-8 w-[70px] text-black rounded border border-input bg-background px-3 py-1 text-sm"
                >
                  {[5, 10, 20, 50].map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center text-black space-x-2">
                <button className="px-2 py-1 border bg-blue-400 rounded disabled:opacity-50" onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>First</button>
                <button className="px-2 py-1 border bg-blue-400 rounded disabled:opacity-50" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Prev</button>
                <button className="px-2 py-1 border bg-blue-400 rounded disabled:opacity-50" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Next</button>
                <button className="px-2 py-1 border bg-blue-400 rounded disabled:opacity-50" onClick={() => table.setPageIndex(table.getPageCount()-1)} disabled={!table.getCanNextPage()}>Last</button>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  )
}

