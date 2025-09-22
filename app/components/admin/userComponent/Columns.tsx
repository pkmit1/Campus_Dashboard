import { ColumnDef, flexRender } from "@tanstack/react-table"
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"

export interface User {
  id: number
  name: string
  email: string
  role: string
}

export const columns: ColumnDef<User>[] = [
  {
    header: "S.No",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <button
        className="flex items-center gap-1 text-sm font-semibold hover:text-cyan-400"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="h-4 w-4" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="h-4 w-4" />
        ) : (
          <ArrowUpDown className="h-4 w-4" />
        )}
      </button>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <button
        className="flex items-center gap-1 text-sm font-semibold hover:text-cyan-400"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="h-4 w-4" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="h-4 w-4" />
        ) : (
          <ArrowUpDown className="h-4 w-4" />
        )}
      </button>
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "role",
    header: "Role", 
    cell: ({ row }) => {
      const role = row.getValue("role") as string
      return (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            role === "ADMIN"
              ? "bg-red-600/20 text-red-400"
              : role === "EDITOR"
              ? "bg-purple-600/20 text-purple-400"
              : "bg-blue-600/20 text-blue-400"
          }`}
        >
          {role}
        </span>
      )
    },
  },
]
