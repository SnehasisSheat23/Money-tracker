// External Dependencies
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Internal Dependencies
import { Category } from './types/expense';
import { formatCurrency } from './utils/formatters';
import { iconMap } from './utils/icons';
import { TransactionTable } from './TransactionTable';

/**
 * Color scheme mapping for different category types
 * Each color has a background and text color class
 */
const categoryColors: Record<string, { bg: string, text: string }> = {
  red: { bg: 'bg-red-50', text: 'text-red-400' },
  green: { bg: 'bg-green-50', text: 'text-green-400' },
  blue: { bg: 'bg-blue-50', text: 'text-blue-400' },
  orange: { bg: 'bg-orange-50', text: 'text-orange-400' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-400' },
  yellow: { bg: 'bg-yellow-50', text: 'text-yellow-600' },
  pink: { bg: 'bg-pink-50', text: 'text-pink-400' },
  indigo: { bg: 'bg-indigo-50', text: 'text-indigo-400' },
  teal: { bg: 'bg-teal-50', text: 'text-teal-400' },
};

/**
 * Props interface for the CategoryGrid component
 */
interface CategoryGridProps {
  /** Array of category objects to display in the grid */
  categories: Category[];
}

/**
 * CategoryGrid Component
 * 
 * Displays a grid of financial categories with their respective amounts.
 * Each category can be clicked to show detailed transactions in a modal.
 * 
 * @param {CategoryGridProps} props - Component props
 * @returns {JSX.Element} Rendered component
 */
export const CategoryGrid: React.FC<CategoryGridProps> = ({ categories }) => {
  // State Management
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const navigate = useNavigate();

  /**
   * Handle scroll lock when modal is open
   */
  useEffect(() => {
    if (selectedCategory) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedCategory]);

  /**
   * Renders a category card with icon and amount
   * @param category The category to render
   * @returns JSX for the category card
   */
  const renderCategoryCard = (category: Category) => {
    const Icon = iconMap[category.icon];
    const colors = categoryColors[category.color] || { bg: 'bg-gray-50', text: 'text-gray-400' };
    
    return (
      <div
        key={category.id}
        className={`p-3 rounded-xl shadow-sm border border-gray-200 ${colors.bg} cursor-pointer 
          transition-transform hover:scale-105 hover:shadow-md`}
        onClick={() => setSelectedCategory(category)}
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon className={`${colors.text} text-base`} />}
          <span className="text-sm text-gray-600">{category.name}</span>
        </div>
        <div className="mt-1 text-base font-semibold text-gray-900">
          {formatCurrency(category.amount)}
        </div>
      </div>
    );
  };

  return (
    <div className="relative">
      {/* Category Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {categories.map(renderCategoryCard)}
      </div>

      {/* Modal Dialog */}
      <AnimatePresence>
        {selectedCategory && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50"
              onClick={() => setSelectedCategory(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-[95vw] sm:w-[500px] bg-white rounded-2xl shadow-2xl
                        flex flex-col max-h-[85vh] mx-4 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-gray-200 bg-white rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {(() => {
                      const Icon = iconMap[selectedCategory.icon];
                      return Icon && <Icon className={`${categoryColors[selectedCategory.color]?.text} text-xl`} />;
                    })()}
                    <h2 className="text-xl font-bold text-gray-900">
                      {selectedCategory.name} Transactions
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate(`/transactions/category/${selectedCategory.id}`)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      aria-label="Full screen"
                    >
                      <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      aria-label="Close"
                    >
                      <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <TransactionTable transactions={selectedCategory.transactions || []} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};