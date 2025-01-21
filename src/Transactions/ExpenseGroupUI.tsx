import React, { useRef, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Plus, Check, X, Trash2 } from 'lucide-react';
import { Expense } from '../data/types/expense';
import { formatCurrency } from '../data/utils/formatters';
import { Modal } from '../components/ui/Popup';
import { Select } from '../components/ui/Select';
import { DeleteTransaction } from '../components/ui/deleteTransaction';
import { UndoDelete } from '../components/ui/undoDelete';

export interface EditableRowProps {
  expense?: Expense;
  isNew?: boolean;
  onSave: (data: Partial<Expense>) => void;
  onCancel: () => void;
}

export const EditableRow: React.FC<EditableRowProps> = ({ expense, isNew, onSave, onCancel }) => {
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

export const EditableCell: React.FC<{
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
      <div className={`cursor-text px-4 py-2.5 rounded-sm transition-all duration-200 hover:bg-gray-50 active:scale-[0.99] ${className}`}>
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
      className={`w-full px-4 py-2 bg-white border-0 focus:ring-2 focus:ring-blue-100 rounded-sm transition-all duration-200 animate-fade-in ${className}`}
    />
  );
};

export interface ExpenseRowUIProps {
  expense: Expense;
  data: {
    description: string;
    category: string;
    amount: string;
  };
  isDeleting: boolean;
  showDeleteModal: boolean;
  isEditing: (field: 'description' | 'category' | 'amount') => boolean;
  onCellClick: (field: 'description' | 'category' | 'amount') => void;
  onDataChange: (field: string, value: string) => void;
  onUpdate: () => void;
  onDelete: () => void;
  onConfirmDelete: () => void;
  onCloseDeleteModal: () => void;
  onUndo: (id: string) => void;
  deletedIds: string[];
  onClearDeletedIds: () => void;
}

export const ExpenseRowUI: React.FC<ExpenseRowUIProps> = ({
  expense,
  data,
  isDeleting,
  showDeleteModal,
  isEditing,
  onCellClick,
  onDataChange,
  onUpdate,
  onDelete,
  onConfirmDelete,
  onCloseDeleteModal,
  onUndo,
  deletedIds,
  onClearDeletedIds
}) => {
  return (
    <>
      <div className="group grid grid-cols-12 border-b border-gray-100 hover:bg-gray-50 animate-fade-slide-down [animation-fill-mode:both] [animation-delay:var(--delay)]"
        style={{ '--delay': `${Math.random() * 200}ms` } as React.CSSProperties}
      >
        <div className="col-span-5 px-1 truncate" onClick={() => onCellClick('description')}>
          <EditableCell
            value={data.description}
            onChange={(value) => onDataChange('description', value)}
            onBlur={onUpdate}
            isEditing={isEditing('description')}
            className="text-sm text-gray-800"
          />
        </div>
        <div className="col-span-3 px-1 truncate">
          <Select
            value={data.category}
            options={Object.keys(categoryConfig)}
            onChange={(value) => onDataChange('category', value)}
            onBlur={() => onCellClick('category')}
            className="text-sm text-gray-600"
            isOpen={isEditing('category')}
            onOpen={() => onCellClick('category')}
          />
        </div>
        <div className="col-span-3 px-1" onClick={() => onCellClick('amount')}>
          <EditableCell
            value={data.amount}
            type="number"
            onChange={(value) => onDataChange('amount', value)}
            onBlur={onUpdate}
            isEditing={isEditing('amount')}
            className="text-sm text-right text-gray-900"
          />
        </div>
        <div className="col-span-1 flex items-center justify-end px-2">
          <button
            onClick={onDelete}
            disabled={isDeleting}
            className="p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <DeleteTransaction
        isOpen={showDeleteModal}
        onClose={onCloseDeleteModal}
        onDelete={onConfirmDelete}
        transaction={expense}
      />

      <UndoDelete
        deletedIds={deletedIds}
        onUndo={onUndo}
        onClose={onClearDeletedIds}
      />
    </>
  );
};

export interface ExpenseGroupUIProps {
  date: Date;
  expenses: Expense[];
  totalAmount: number;
  isCollapsed: boolean;
  showNewRow: boolean;
  showMobileModal: boolean;
  contentHeight: number | undefined;
  contentRef: React.RefObject<HTMLDivElement>;
  editingCell: { id: string; field: 'description' | 'category' | 'amount'; } | null;
  onCollapse: () => void;
  onAddClick: (e: React.MouseEvent) => void;
  onAddExpense: (data: Partial<Expense>) => void;
  onUpdateExpense: (id: string, updates: Partial<Expense>) => void;
  onStartEditing: (id: string, field: 'description' | 'category' | 'amount') => void;
  onCloseMobileModal: () => void;
}

export const ExpenseGroupUI: React.FC<ExpenseGroupUIProps> = ({
  date,
  expenses,
  totalAmount,
  isCollapsed,
  showNewRow,
  showMobileModal,
  contentHeight,
  contentRef,
  editingCell,
  onCollapse,
  onAddClick,
  onAddExpense,
  onUpdateExpense,
  onStartEditing,
  onCloseMobileModal
}) => {
  return (
    <div className="mb-6 bg-white rounded-lg shadow-sm ring-1 ring-gray-100 transition-all duration-200 hover:shadow-md">
      <div 
        className="flex justify-between items-center px-6 py-4 cursor-pointer hover:bg-gray-50 transition-all duration-200"
        onClick={onCollapse}
      >
        <div className="flex items-center gap-3">
          <span className={`text-sm text-gray-400 transition-transform duration-300 ease-spring ${isCollapsed ? 'rotate-[-90deg]' : ''}`}>
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
            onClick={onAddClick}
            className="p-1.5 rounded-full hover:bg-gray-100 transition-all duration-200 hover:scale-105 active:scale-95"
            title="Add expense"
          >
            <Plus className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Rest of the UI implementation */}
      {/* ... */}
    </div>
  );
};
