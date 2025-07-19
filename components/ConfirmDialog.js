'use client'

export default function ConfirmDialog({isOpen,title,description,onCancel,onConfirm}){
    
    if(!isOpen)return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
                <h2 className="text-xl font-semibold mb-2">{title}</h2>
                <p className="text-gray-600 mb-4">{description}</p>

                <div className="flex justify-end gap-2">
                        <button onClick={onCancel} className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">
                            Cancel 
                        </button>
                        <button onClick={onConfirm} className="px-4 py-2 bg-red-300 text-white rounded hover:bg-gray-400">
                            Delete
                        </button>
                </div>
            </div>
        </div>
    )
} 