import React, { useState } from 'react';
import { format } from 'date-fns';
import { Plus, Check, X } from 'lucide-react';
import { Expense } from '../data/types/expense';
import { formatCurrency } from '../data/utils/formatters';
import { Modal } from '../components/ui/Popup';

interface EditableRowProps {
  expense?: Expense;
  isNew?: boolean;
  onSave: (data: Partial<Expense>) => void;
  onCancel: () => void;
}

const EditableRow: React.FC<EditableRowProps> = ({ expense, isNew, onSave, onCancel }) => {
  const [data, setData] = useState({
    description: expense?.description || '',
    category: expense?.category.name || '',
    amount: expense?.amount?.toString() || ''
  });

  return (
    <div className="grid grid-cols-12 px-6 py-3 border-b border-gray-100 bg-gray-50">
      <div className="col-span-5">
        <input
          type="text"
          value={data.description}
          onChange={e => setData(prev => ({ ...prev, description: e.target.value }))}
          className="w-full px-3 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Description"
        />
      </div>
      <div className="col-span-4">
        <input
          type="text"
          value={data.category}
          onChange={e => setData(prev => ({ ...prev, category: e.target.value }))}
          className="w-full px-3 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Category"
        />
      </div>
      <div className="col-span-3 flex items-center gap-2 justify-end">
        <input
          type="number"
          value={data.amount}
          onChange={e => setData(prev => ({ ...prev, amount: e.target.value }))}
          className="w-28 px-3 py-1.5 text-sm border rounded-md text-right focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          placeholder="0.00"
        />
        <button
          onClick={() => onSave(data)}
          className="p-1.5 hover:bg-green-100 rounded-full transition-colors"
        >
          <Check className="w-4 h-4 text-green-600" />
        </button>
        <button
          onClick={onCancel}
          className="p-1.5 hover:bg-red-100 rounded-full transition-colors"
        >
          <X className="w-4 h-4 text-red-600" />
        </button>
      </div>
    </div>
  );
};

interface ExpenseGroupProps {
  date: Date;
  expenses: Expense[];
  totalAmount: number;
  onAddExpense: (date: Date, data?: Partial<Expense>) => void;
}

export const ExpenseGroup: React.FC<ExpenseGroupProps> = ({ 
  date, 
  expenses, 
  totalAmount,
  onAddExpense 
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showNewRow, setShowNewRow] = useState(false);
  const [showMobileModal, setShowMobileModal] = useState(false);
  const isDesktop = window.innerWidth >= 640;

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDesktop) {
      setShowNewRow(true);
    } else {
      setShowMobileModal(true);
    }
  };

  return (
    <div className="mb-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <div 
        className="flex justify-between items-center px-4 py-3 border-b border-gray-200 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center gap-2">
          <span className={`text-sm text-gray-600 transition-transform duration-200 ${
            isCollapsed ? 'rotate-[-90deg]' : ''
          }`}>
            ▼
          </span>
          <h3 className="text-sm font-semibold text-gray-800">
            {format(date, 'MMM d, yyyy')}
          </h3>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold text-gray-800">
            {formatCurrency(totalAmount)}
          </span>
          <button
            onClick={handleAddClick}
            className="p-1.5 rounded hover:bg-gray-200 transition-colors"
            title="Add expense"
          >
            <Plus className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
      {!isCollapsed && (
        <div>
          <div className="grid grid-cols-12 px-6  border-b border-gray-100 bg-gray-50">
            <div className="col-span-5">
              <span className="text-xs tracking-wider font-small text-gray-500">DESCRIPTION</span>
            </div>
            <div className="col-span-4">
              <span className="text-xs tracking-wider font-small text-gray-500">CATEGORY</span>
            </div>
            <div className="col-span-3 text-right">
              <span className="text-xs tracking-wider font-small text-gray-500">AMOUNT</span>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {expenses.map((expense) => (
              editingId === expense.id ? (
                <EditableRow
                  key={expense.id}
                  expense={expense}
                  onSave={(data) => {
                    setEditingId(null);
                  }}
                  onCancel={() => setEditingId(null)}
                />
              ) : (
                <div 
                  key={expense.id}
                  onClick={() => setEditingId(expense.id)} 
                  className="grid grid-cols-12 px-6 py-3.5 hover:bg-gray-50 transition-colors duration-150 cursor-pointer group"
                >
                  <div className="col-span-5 flex items-center">
                    <span className="text-sm text-gray-800 font-medium block truncate group-hover:text-blue-600 transition-colors" 
                          title={expense.description}>
                      {expense.description}
                    </span>
                  </div>
                  <div className="col-span-4 flex items-center min-w-0">
                    <span className="inline-flex px-2.5 py-1 rounded-full bg-gray-100 text-xs font-medium text-gray-600 group-hover:bg-gray-200 transition-colors whitespace-nowrap overflow-hidden text-ellipsis max-w-full"
                          title={expense.category.name}>
                      {expense.category.name}
                    </span>
                  </div>
                  <div className="col-span-3 flex items-center justify-end">
                    <span className="text-sm font-medium text-gray-900">
                      {formatCurrency(expense.amount)}
                    </span>
                  </div>
                </div>
              )
            ))}
            
            {showNewRow && (
              <div className="px-2">
                <EditableRow
                  isNew
                  onSave={(data) => {
                    onAddExpense(date, data);
                    setShowNewRow(false);
                  }}
                  onCancel={() => setShowNewRow(false)}
                />
              </div>
            )}
          </div>
        </div>
      )}

      <Modal 
        isOpen={showMobileModal} 
        onClose={() => setShowMobileModal(false)}
        title="Add Transaction"
      >
        <div className="p-4">
          <EditableRow
            isNew
            onSave={(data) => {
              onAddExpense(date, data);
              setShowMobileModal(false);
            }}
            onCancel={() => setShowMobileModal(false)}
          />
        </div>
      </Modal>
    </div>
  );
};