"use client"

import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, ColumnDef, flexRender, SortingState } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"
import Pagination from "./Pagination" 
import toast from "react-hot-toast";

interface Request { 
    id: number; 
    name: string; 
    email: string; 
    subject: string; 
    message: string; 
    status: string; 
    conversation: string 
}
interface Props {
  requests: Request[]
  loading: boolean
  sorting: SortingState
  setSorting: (value: SortingState) => void
  handleStatusUpdate: (id: number, status: string) => void
  setEditing: (req: Request) => void
  setEditedConversation: (text: string) => void
}

export default function TableComponent({ requests, loading, sorting, setSorting, handleStatusUpdate, setEditing, setEditedConversation }: Props) {
  // ✅ status change wrapper with toast
  const handleStatusChange = (id: number, newStatus: string) => {
    handleStatusUpdate(id, newStatus); // your original update logic

    if (newStatus === "in progress") {
      toast.success("Status changed to In Progress");
    } else if (newStatus === "completed") {
      toast.success("Status changed to Completed");
    } else if (newStatus === "pending") {
      toast("Status reverted to Pending");
    }
  };

  const columns: ColumnDef<Request>[] = [
    { header: "S.No", cell: ({ row }) => row.index + 1 },
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
    { accessorKey: "conversation", header: "Conversation" },
    { accessorKey: "status", header: "Status" }
  ]

  const table = useReactTable({
    data: requests,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: { pagination: { pageSize: 5 } }
  })

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-10 h-10 border-4 border-gray-400 border-t-blue-500 rounded-full animate-spin"></div></div>
  if (requests.length === 0) return <div className="flex items-center justify-center h-64 text-gray-500 text-center">No messages found!</div>

  return (
    <div className="px-10">
      {/* Desktop Table */}
      <div className="hidden md:block mt-10 rounded-lg overflow-hidden border-2 border-gray-700">
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
                  <select
                    value={row.original.status}
                    onChange={(e) => handleStatusChange(row.original.id, e.target.value)}
                    className="bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm"
                  >
                    {row.original.status === "pending" && (
                        <>
                          <option value="pending">Pending</option>
                          <option value="in progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </>
                    )}
                    {row.original.status==="in progress" && (
                        <>
                        <option value="in progress">In Progress</option>
                        <option value="completed">Completed</option>
                        </>
                    )}
                    {row.original.status==="completed" &&(
                        <>
                        <option value="completed">Completed</option>
                        </>
                    )}
                    
                  </select>
                  <button
                    className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition ml-2"
                    onClick={() => { setEditing(row.original); setEditedConversation(row.original.conversation || "") }}
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
        {table.getRowModel().rows.map(row => (
          <div key={row.id} className="p-4 rounded-lg bg-gray-900 border border-gray-700 shadow-md hover:shadow-lg transition">
            <p className="text-lg font-semibold">{row.original.name}</p>
            <p className="text-sm text-gray-400">{row.original.email}</p>
            <p className="mt-2 font-medium">{row.original.subject}</p>
            <p className="text-sm text-gray-300 mt-1 truncate">{row.original.message}</p>
            <p className="text-sm text-gray-400 mt-2">Conversation: <span className="text-white">{row.original.conversation || "—"}</span></p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <Pagination table={table} />
    </div>
  )
}
