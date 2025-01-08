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
      className="h-[120px] sm:h-[160px] rounded-xl p-3 sm:p-5 
        bg-gradient-to-br from-gray-50 to-gray-100
        border border-gray-200 shadow-sm min-w-[130px]"
    >
      {/* Card Content Container */}
      <div className="flex flex-col h-full justify-between">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Animated Plus Icon */}
            <motion.div
              whileHover={{ rotate: 90 }}
              transition={{ duration: 0.2 }}
              className="p-1 sm:p-2 rounded-lg bg-white/80 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-gray-600" />
            </motion.div>
            {/* Title and Subtitle */}
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-900">New Account</p>
              <p className="text-[9px] sm:text-xs text-gray-500 mt-0.5">Add bank account</p>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="mt-auto pt-2 sm:pt-4 border-t border-gray-200">
          <p className="text-[10px] sm:text-sm text-gray-600">Click to add a new bank account</p>
        </div>
      </div>
    </motion.button>
  );
}
