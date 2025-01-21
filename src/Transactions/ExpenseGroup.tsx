import React, { useState, useRef, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import { Plus, Check, X, Trash2 } from 'lucide-react';
import { Expense } from '../data/types/expense';
import { formatCurrency } from '../data/utils/formatters';
import { Modal } from '../components/ui/Popup';
import { useTransactions } from '../hooks/useTransactions';
import { DeleteTransaction } from '../components/ui/deleteTransaction';
import { UndoDelete } from '../components/ui/undoDelete';
import { categoryConfig } from '../data/categoryConfig';
import { Select } from '../components/ui/Select';
import debounce from 'lodash/debounce';

// Add new type for tracking which cell is being edited
type EditingCell = {
  id: string;
  field: 'description' | 'category' | 'amount';
} | null;

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

const EditableCell: React.FC<{
  value: string;
  type?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  isEditing: boolean;
  className?: string;
}> = ({ value, type = 'text', onChange, onBlur, isEditing, className }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  if (!isEditing) {
    return (
      <div
        className={`cursor-text px-4 py-2.5 rounded-sm transition-all duration-200 
        hover:bg-gray-50 active:scale-[0.99] ${className}`}
      >
        {value}
      </div>
    );
  }

  return (
    <input
      ref={inputRef}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      className={`w-full px-4 py-2 bg-white border-0 focus:ring-2 focus:ring-blue-100 
      rounded-sm transition-all duration-200 animate-fade-in ${className}`}
    />
  );
};

const CategoryDropdown: React.FC<{
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  isEditing: boolean;
  className?: string;
}> = ({ value, onChange, onBlur, isEditing, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const categories = Object.keys(categoryConfig);

  useEffect(() => {
    if (isEditing) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [isEditing]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        onBlur();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onBlur]);

  if (!isEditing) {
    return (
      <div className={`cursor-text px-4 py-2.5 rounded-sm ${className}`}>
        {value || 'Select category'}
      </div>
    );
  }

  return (
    <div ref={dropdownRef} className="relative">
      <div
        className={`px-4 py-2.5 rounded-sm bg-gray-50 border border-gray-200 ${className}`}
      >
        {value || 'Select category'}
      </div>
      <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg 
        animate-fade-slide-down">
        <div className="max-h-60 overflow-auto">
          {categories.map((category) => (
            <div
              key={category}
              onClick={() => {
                onChange(category);
                setIsOpen(false);
                onBlur();
              }}
              className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm"
            >
              {category}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface ExpenseRowProps {
  expense: Expense;
  onUpdate: (id: string, data: Partial<Expense>) => void;
  editingCell: EditingCell;
  onStartEditing: (id: string, field: 'description' | 'category' | 'amount') => void;
}

const ExpenseRow: React.FC<ExpenseRowProps> = ({ expense, onUpdate, editingCell, onStartEditing }) => {
  const { deleteTransaction } = useTransactions();
  const [data, setData] = useState({
    description: expense.description,
    category: expense.category.name,
    amount: expense.amount.toString()
  });
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletedIds, setDeletedIds] = useState<string[]>([]);

  const handleChange = (field: string, value: string) => {
    // Validate input before updating
    let isValid = true;
    let sanitizedValue = value;

    switch (field) {
      case 'description':
        isValid = value.length <= 100 && value.length > 0;
        break;
      case 'category':
        isValid = Object.keys(categoryConfig).includes(value);
        break;
      case 'amount':
        sanitizedValue = value.replace(/[^\d.-]/g, '');
        const numValue = parseFloat(sanitizedValue);
        isValid = !isNaN(numValue) && numValue > 0;
        break;
    }

    if (!isValid) {
      console.warn('Invalid input:', { field, value });
      return;
    }

    setData(prev => {
      const newData = { ...prev, [field]: sanitizedValue };
      
      // Prepare updates
      const updates: Partial<Expense> = {};
      
      if (field === 'description' && newData.description !== expense.description) {
        updates.description = newData.description;
      } else if (field === 'category' && newData.category !== expense.category.name) {
        updates.category = { name: newData.category };
      } else if (field === 'amount') {
        const amount = parseFloat(newData.amount);
        if (!isNaN(amount) && amount !== expense.amount) {
          updates.amount = amount;
        }
      }

      // Only trigger update if we have valid changes
      if (Object.keys(updates).length > 0) {
        // Immediately call update instead of debouncing
        onUpdate(expense.id, updates);
      }

      return newData;
    });
  };

  const isEditing = (field: 'description' | 'category' | 'amount') => 
    editingCell?.id === expense.id && editingCell?.field === field;

  const handleCellClick = (field: 'description' | 'category' | 'amount') => {
    if (!isEditing(field)) {
      onStartEditing(expense.id, field);
    }
  };

  const handleDelete = async () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteTransaction(expense.id);
      setDeletedIds(prev => [...prev, expense.id]);
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Failed to delete:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUndo = async (id: string) => {
    // Implement undo logic here
    setDeletedIds(prev => prev.filter(dId => dId !== id));
  };

  function handleStopEditing(): void {
    throw new Error('Function not implemented.');
  }

  return (
    <>
      <div className="group grid grid-cols-12 border-b border-gray-100 hover:bg-gray-50 
      animate-fade-slide-down [animation-fill-mode:both] [animation-delay:var(--delay)]"
        style={{ '--delay': `${Math.random() * 200}ms` } as React.CSSProperties}
      >
        <div className="col-span-5 px-1 truncate" onClick={() => handleCellClick('description')}>
          <EditableCell
            value={data.description}
            onChange={(value) => handleChange('description', value)}
            onBlur={handleStopEditing}
            isEditing={isEditing('description')}
            className="text-sm text-gray-800"
          />
        </div>
        <div className="col-span-3 px-1 truncate">
          <Select
            value={data.category}
            options={Object.keys(categoryConfig)}
            onChange={(value) => handleChange('category', value)}
            onBlur={() => onStartEditing(expense.id, 'category')}
            className="text-sm text-gray-600"
            isOpen={isEditing('category')}
            onOpen={() => onStartEditing(expense.id, 'category')}
          />
        </div>
        <div className="col-span-3 px-1" onClick={() => handleCellClick('amount')}>
          <EditableCell
            value={data.amount}
            type="number"
            onChange={(value) => handleChange('amount', value)}
            onBlur={handleStopEditing}
            isEditing={isEditing('amount')}
            className="text-sm text-right text-gray-900"
          />
        </div>
        <div className="col-span-1 flex items-center justify-end px-2">
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 
            hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <DeleteTransaction
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={confirmDelete}
        transaction={expense}
      />

      <UndoDelete
        deletedIds={deletedIds}
        onUndo={handleUndo}
        onClose={() => setDeletedIds([])}
      />
    </>
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
}) => {
  const { addTransaction, updateTransaction } = useTransactions();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showNewRow, setShowNewRow] = useState(false);
  const [showMobileModal, setShowMobileModal] = useState(false);
  const isDesktop = window.innerWidth >= 640;
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | undefined>(undefined);
  const [editingCell, setEditingCell] = useState<EditingCell>(null);
  const [updateQueue, setUpdateQueue] = useState<{[key: string]: Partial<Expense>}>({});

  useEffect(() => {
    if (contentRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        setContentHeight(entries[0].contentRect.height);
      });
      
      resizeObserver.observe(contentRef.current);
      return () => resizeObserver.disconnect();
    }
  }, []);

  const handleStartEditing = (id: string, field: 'description' | 'category' | 'amount') => {
    setEditingCell({ id, field });
  };

  const handleStopEditing = () => {
    setEditingCell(null);
  };

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDesktop) {
      setShowNewRow(true);
    } else {
      setShowMobileModal(true);
    }
  };

  const handleAddExpense = async (data: Partial<Expense>) => {
    try {
      await addTransaction({
        ...data,
        date,
        category: { name: data.category || 'Other' }
      });
      setShowNewRow(false);
      setShowMobileModal(false);
    } catch (error) {
      console.error('Failed to add expense:', error);
    }
  };

  const handleUpdateExpense = async (id: string, updates: Partial<Expense>) => {
    try {
      await updateTransaction(id, updates);
    } catch (error) {
      console.error('Failed to update expense:', error);
      // Optionally, revert the UI state here
    }
  };

  return (
    <div className="mb-6 bg-white rounded-lg shadow-sm ring-1 ring-gray-100 
    transition-all duration-200 hover:shadow-md">
      <div 
        className="flex justify-between items-center px-6 py-4 cursor-pointer 
        hover:bg-gray-50 transition-all duration-200"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center gap-3">
          <span className={`text-sm text-gray-400 transition-transform duration-300 
          ease-spring ${isCollapsed ? 'rotate-[-90deg]' : ''}`}>
            ▼
          </span>
          <h3 className="text-sm font-medium text-gray-900">
            {format(date, 'MMMM d, yyyy')}
          </h3>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-sm font-medium text-gray-900">
            {formatCurrency(totalAmount)}
          </span>
          <button
            onClick={handleAddClick}
            className="p-1.5 rounded-full hover:bg-gray-100 
            transition-all duration-200 hover:scale-105 active:scale-95"
            title="Add expense"
          >
            <Plus className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>
      <div
        className="overflow-hidden transition-[height] duration-300 ease-spring"
        style={{ height: isCollapsed ? 0 : contentHeight }}
      >
        <div ref={contentRef}>
          <div className="grid grid-cols-12 px-6 py-3 border-y border-gray-100 bg-gray-50">
            <div className="col-span-5">
              <span className="text-xs font-medium text-gray-500">Description</span>
            </div>
            <div className="col-span-4">
              <span className="text-xs font-medium text-gray-500">Category</span>
            </div>
            <div className="col-span-3 text-right">
              <span className="text-xs font-medium text-gray-500">Amount</span>
            </div>
          </div>
          <div className="divide-y divide-gray-50">
            {expenses.map((expense) => (
              <ExpenseRow
                key={expense.id}
                expense={expense}
                onUpdate={handleUpdateExpense}
                editingCell={editingCell}
                onStartEditing={handleStartEditing}
              />
            ))}
            
            {showNewRow && (
              <div className="px-2 py-1 bg-blue-50/50">
                <EditableRow
                  isNew
                  onSave={handleAddExpense}
                  onCancel={() => setShowNewRow(false)}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal 
        isOpen={showMobileModal} 
        onClose={() => setShowMobileModal(false)}
        title="Add Transaction"
      >
        <div className="p-4">
          <EditableRow
            isNew
            onSave={handleAddExpense}
            onCancel={() => setShowMobileModal(false)}
          />
        </div>
      </Modal>
    </div>
  );
};