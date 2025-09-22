"use client"

interface PaginationProps {
  table: any; // pass the table instance
}

export default function Pagination({ table }: PaginationProps) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between py-4 gap-2">
      {/* Page size */}
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium">Rows per page:</span>
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

      {/* Pagination buttons */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
          className="px-3 py-1 border rounded bg-blue-400 disabled:opacity-50"
        >
          First
        </button>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-3 py-1 border rounded bg-blue-400 disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-sm">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-3 py-1 border rounded bg-blue-400 disabled:opacity-50"
        >
          Next
        </button>
        <button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
          className="px-3 py-1 border rounded bg-blue-400 disabled:opacity-50"
        >
          Last
        </button>
      </div>
    </div>
  )
}
