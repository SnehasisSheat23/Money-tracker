import React, { useState, useEffect, useRef } from 'react';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { CategoryGrid } from '../Transactions/CategoryGrid.tsx';
import { ExpenseList } from '../Transactions/ExpenseList.tsx';
import { ViewSelector } from '../Transactions/ViewSelector';
import { ViewMode } from '../data/types/expense';
import { mockCategories } from '../data/mockCategories';

import { mockTransactions } from '../data/mockTransactions.ts';
import { motion, AnimatePresence } from 'framer-motion';
import { CategorySelector } from '../Transactions/Categoryselector';

export const TransactionsPage: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewMode>('Daily');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showCategorySelector, setShowCategorySelector] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const categoryGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowCategorySelector(!entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: '-64px 0px 0px 0px' // Adjust this value based on your header height
      }
    );

    if (categoryGridRef.current) {
      observer.observe(categoryGridRef.current);
    }

    return () => observer.disconnect();
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

        {/* Category Selector Container with placeholder */}
        <div className="category-selector-container" style={{ height: showCategorySelector ? 'auto' : '0' }}>
          <AnimatePresence mode="sync">
            {showCategorySelector && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  mass: 0.8
                }}
                className="bg-white border-b border-gray-200 shadow-sm overflow-hidden"
              >
                <CategorySelector
                  categories={mockCategories}
                  selectedCategory={selectedCategoryId}
                  onSelectCategory={setSelectedCategoryId}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div 
          ref={containerRef}
          className="flex-1 overflow-auto scroll-smooth"
        >
          <div className="max-w-7xl mx-auto space-y-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Expense Tracker
            </h1>
            
            {/* Categories Section */}
            <section ref={categoryGridRef} className="p-4">
              <h2 className="text-lg font-semibold mb-4 text-gray-700">Categories</h2>
              <CategoryGrid categories={mockCategories} />
            </section>

            {/* Expenses Section */}
            <section className="   p-4">
              <h2 className="text-lg font-semibold mb-4 text-gray-700">Expenses</h2>
              <ViewSelector currentView={currentView} onViewChange={setCurrentView} />
              <ExpenseList expenses={mockTransactions} />
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