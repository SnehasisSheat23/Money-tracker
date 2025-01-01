import React, { useState } from 'react';
import { format } from 'date-fns';
import { Plus } from 'lucide-react';
import { Expense } from './types/expense';
import { formatCurrency } from './utils/formatters';
import { iconMap } from './utils/icons';

interface ExpenseGroupProps {
  date: Date;
  expenses: Expense[];
  totalAmount: number;
  onAddExpense: (date: Date) => void;
}

export const ExpenseGroup: React.FC<ExpenseGroupProps> = ({ 
  date, 
  expenses, 
  totalAmount,
  onAddExpense 
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="mb-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <div 
        className="flex justify-between items-center p-4 border-b border-gray-100 cursor-pointer"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center gap-2">
          <span className={`text-sm text-gray-400 hover:text-gray-600 transition-transform duration-200 ${
            isCollapsed ? 'rotate-[-90deg]' : ''
          }`}>
            ▼
          </span>
          <h3 className="text-sm font-medium text-gray-800">
            {format(date, 'MMM d, yyyy')}
          </h3>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700">
            {formatCurrency(totalAmount)}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddExpense(date);
            }}
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors duration-150 group"
            title="Add expense"
          >
            <Plus className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
          </button>
        </div>
      </div>
      {!isCollapsed && (
        <div className="divide-y divide-gray-50">
          {/* Table Headers */}
          <div className="grid grid-cols-12 px-3 py-2 bg-gray-50 text-xs font-medium text-gray-500">
            <div className="col-span-5">DESCRIPTION</div>
            <div className="col-span-4">CATEGORY</div>
            <div className="col-span-3 text-right">AMOUNT</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-50">
            {expenses.map((expense) => {
              const Icon = iconMap[expense.category.name];
              return (
                <div 
                  key={expense.id} 
                  className="grid grid-cols-12 px-3 py-3 hover:bg-gray-50 transition-colors duration-150 items-center"
                >
                  <div className="col-span-5 flex items-center gap-3">
                    {Icon && <Icon className="w-4 h-4 text-gray-500 flex-shrink-0" />}
                    <span className="text-gray-700 text-sm truncate">{expense.description}</span>
                  </div>
                  <div className="col-span-4">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {expense.category.name}
                    </span>
                  </div>
                  <div className="col-span-3 text-right">
                    <span className="font-medium text-gray-900 text-sm">
                      {formatCurrency(expense.amount)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};