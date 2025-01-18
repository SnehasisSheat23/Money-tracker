import React from 'react';
import { X } from 'lucide-react';

interface UndoDeleteProps {
  deletedIds: string[];
  onUndo: (id: string) => void;
  onClose: () => void;
}

export function UndoDelete({ deletedIds, onUndo, onClose }: UndoDeleteProps) {
  if (deletedIds.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 left-4 md:left-auto md:w-96 bg-gray-800 text-white p-4 rounded-lg shadow-lg flex items-center justify-between z-50">
      <span>Transaction deleted</span>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onUndo(deletedIds[deletedIds.length - 1])}
          className="text-blue-400 hover:text-blue-300 font-medium"
        >
          Undo
        </button>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-300"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
