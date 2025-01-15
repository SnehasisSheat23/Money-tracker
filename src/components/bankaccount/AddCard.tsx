// External dependencies
import React from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

// Component props interface
interface AddCardProps {
  onClick: () => void;
}

/**
 * AddCard Component
 * 
 * A button component that displays an "Add New Account" card with animation effects.
 * Uses Framer Motion for hover and tap animations.
 * 
 * @param {AddCardProps} props - Component props
 * @param {() => void} props.onClick - Click handler function
 */
export function AddCard({ onClick }: AddCardProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="h-[180px] sm:h-[220px] rounded-2xl 
        bg-white/50 backdrop-blur-sm border-2 border-dashed border-gray-300
        flex flex-col items-center justify-center gap-3
        min-w-[280px] transition-all duration-300
        hover:border-blue-400 hover:bg-blue-50/50 group"
    >
      <div className="p-3 rounded-xl bg-blue-50 group-hover:bg-blue-100 transition-colors">
        <Plus className="w-6 h-6 text-blue-600" />
      </div>
      <p className="text-sm font-medium text-gray-600 group-hover:text-blue-600">
        Add New Account
      </p>
    </motion.button>
  );
}
