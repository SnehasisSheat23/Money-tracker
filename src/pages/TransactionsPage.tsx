import React, { useState } from 'react';
import { CategoryGrid } from '../Transactions/CategoryGrid.tsx';
import { ExpenseList } from '../Transactions/ExpenseList.tsx';
import { ViewSelector } from '../Transactions/ViewSelector';
import { ViewMode } from '../Transactions/types/expense';
import { mockCategories } from '../Transactions/data/mockCategories';
import { mockExpenses } from '../Transactions/data/mockExpenses';

export const TransactionsPage: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewMode>('Daily');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Expense Tracker</h1>
        
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Categories</h2>
          <CategoryGrid categories={mockCategories} />
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Expenses</h2>
          <ViewSelector currentView={currentView} onViewChange={setCurrentView} />
          <ExpenseList expenses={mockExpenses} />
        </section>
      </div>
    </div>
  );
};
