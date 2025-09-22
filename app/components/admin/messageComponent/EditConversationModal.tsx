"use client"

interface Props {
  editing: any
  editedConversation: string
  setEditedConversation: (text: string) => void
  onClose: () => void
  onSave: () => void
}

export default function EditConversationModal({ editing, editedConversation, setEditedConversation, onClose, onSave }: Props) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">✏️ Edit Conversation</h2>
        <textarea
          value={editedConversation}
          onChange={(e) => setEditedConversation(e.target.value)}
          className="w-full h-32 p-2 rounded bg-gray-800 border border-gray-700 text-white"
        />
        <div className="flex justify-end gap-2 mt-4">
          <button className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700" onClick={onClose}>Cancel</button>
          <button className="px-4 py-2 bg-green-600 rounded hover:bg-green-700" onClick={onSave}>Save</button>
        </div>
      </div>
    </div>
  )
}
