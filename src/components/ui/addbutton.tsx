import React from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

interface AddButtonProps {
  onClick: () => void;
  text: string;
  className?: string;
}

export function AddButton({ onClick, text, className = '' }: AddButtonProps) {
  return (
    <div className="flex justify-center items-center w-full py-6">
      <motion.button
        onClick={onClick}
        initial={{ scale: 1 }}
        whileHover={{ 
          scale: 1.05,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
        }}
        whileTap={{ 
          scale: 0.95,
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)'
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 15
        }}
        className={`relative group bg-blue-50 hover:bg-blue-100 
          px-6 py-3 rounded-xl
          flex items-center gap-3
          transition-colors duration-200
          ${className}`}
      >
        <motion.div
          initial={{ rotate: 0 }}
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.3 }}
        >
          <Plus className="w-5 h-5 text-blue-600" />
        </motion.div>
        
        <span className="text-sm font-medium text-blue-600">
          {text}
        </span>
      </motion.button>
    </div>
  );
}
