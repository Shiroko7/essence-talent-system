import React from 'react';
import { AlertCircle, X } from 'lucide-react';

interface ConfirmDialogProps {
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70" onClick={onCancel}>
      <div 
        className="bg-gray-800 border border-gray-700 rounded-lg p-6 max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside dialog from closing it
      >
        <div className="flex items-start mb-4">
          <div className="mr-3 text-yellow-500">
            <AlertCircle size={24} />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold">{title}</h2>
          </div>
          <button 
            onClick={onCancel}
            className="text-gray-400 hover:text-white"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        
        <p className="text-gray-300 mb-6 pl-9">{message}</p>
        
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
