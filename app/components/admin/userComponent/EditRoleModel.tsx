"use client"

interface Props {
  editingUser: any
  newRole: string
  setNewRole: (value: string) => void
  onClose: () => void
  onSave: () => void
}

export default function EditRoleModal({ editingUser, newRole, setNewRole, onClose, onSave }: Props) {
  if (!editingUser) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">
          ✏️ Edit Role for {editingUser.name}
        </h2>
        <select
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
        >
          <option value="ADMIN">ADMIN</option>
          <option value="EDITOR">EDITOR</option>
          <option value="USER">USER</option>
        </select>
        <div className="flex justify-end gap-2 mt-4">
          <button
            className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-green-600 rounded hover:bg-green-700"
            onClick={onSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
