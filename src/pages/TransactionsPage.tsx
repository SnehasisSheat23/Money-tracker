import React, { useState, useEffect, useRef } from 'react';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { CategoryGrid } from '../Transactions/CategoryGrid.tsx';
import { ExpenseList } from '../Transactions/ExpenseList.tsx';
import { ViewSelector } from '../Transactions/ViewSelector';
import { ViewMode } from '../Transactions/types/expense';
import { mockCategories } from '../Transactions/data/mockCategories';
import { mockExpenses } from '../Transactions/data/mockExpenses';
import { motion, AnimatePresence } from 'framer-motion';
import { CategorySelector } from '../Transactions/Categoryselector';

export const TransactionsPage: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewMode>('Daily');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showCategorySelector, setShowCategorySelector] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPosition = container.scrollTop;
      setShowCategorySelector(scrollPosition > 50);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 transition-transform duration-300
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:relative
      `}>
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col w-full md:w-[calc(100%-16rem)] relative">
        <Header>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 md:hidden"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </Header>

        {/* Floating Category Selector */}
        <AnimatePresence>
          {showCategorySelector && (
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="sticky top-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm px-4"
            >
              <CategorySelector
                categories={mockCategories}
                selectedCategory={selectedCategoryId}
                onSelectCategory={setSelectedCategoryId}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div 
          ref={containerRef}
          className="flex-1 overflow-auto p-4 md:p-8 scroll-smooth"
        >
          <div className="max-w-7xl mx-auto space-y-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Expense Tracker
            </h1>
            
            {/* Categories Section */}
            <section className="  p-4">
              <h2 className="text-lg font-semibold mb-4 text-gray-700">Categories</h2>
              <CategoryGrid categories={mockCategories} />
            </section>

            {/* Expenses Section */}
            <section className="   p-4">
              <h2 className="text-lg font-semibold mb-4 text-gray-700">Expenses</h2>
              <ViewSelector currentView={currentView} onViewChange={setCurrentView} />
              <ExpenseList expenses={mockExpenses} />
            </section>
          </div>
        </div>
      </main>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};
