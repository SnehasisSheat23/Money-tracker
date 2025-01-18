import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { CreditCard, Plus, X } from 'lucide-react';
import { Modal } from './Popup';
import { categoryConfig } from '../../data/categoryConfig';

interface Transaction {
  id: string;
  date: Date;
  description: string;
  amount: number;
  category: {
    name: string;
    icon: string;
    color: string;
  };
}

interface AddTransactionProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (transactions: Partial<Transaction>[]) => void;
}

export function AddTransaction({ isOpen, onClose, onSave }: AddTransactionProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newTransactions, setNewTransactions] = useState<Partial<Transaction>[]>([{
    id: nanoid(),
    date: new Date(),
  }]);

  const formatDateForInput = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const handleAddTransaction = () => {
    setNewTransactions(prev => [...prev, { 
      id: nanoid(),
      date: new Date(),
    }]);
  };

  const handleTransactionChange = (id: string, field: keyof Transaction, value: any) => {
    setNewTransactions(prev =>
      prev.map(t => {
        if (t.id === id) {
          if (field === 'category') {
            // When category changes, automatically set the icon and color
            const categoryDetails = categoryConfig[value as keyof typeof categoryConfig];
            return {
              ...t,
              category: {
                name: value,
                icon: categoryDetails.icon,
                color: categoryDetails.color
              }
            };
          }
          return { ...t, [field]: value };
        }
        return t;
      })
    );
  };

  const handleRemoveTransaction = (id: string) => {
    setNewTransactions(prev => prev.filter(t => t.id !== id));
  };

  const validateTransaction = (transaction: Partial<Transaction>): boolean => {
    const newErrors: Record<string, string> = {};

    if (!transaction.description?.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!transaction.amount || transaction.amount <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    const isValid = newTransactions.every(validateTransaction);
    
    if (!isValid) return;

    const processedTransactions = newTransactions.map(transaction => ({
      ...transaction,
      date: transaction.date || new Date(),
      category: transaction.category || {
        name: 'Other',
        icon: 'credit-card',
        color: 'gray'
      }
    }));

    onSave(processedTransactions);
    setNewTransactions([{ id: nanoid(), date: new Date() }]);
    setErrors({});
  };

  const handleClose = () => {
    onClose();
    setNewTransactions([{ id: nanoid(), date: new Date() }]);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add Transactions"
    >
      <div className="space-y-4">
        {newTransactions.map((transaction, index) => (
          <div key={transaction.id} className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-50 text-blue-600">
                  <CreditCard className="w-6 h-6" />
                </div>
                <h3 className="font-medium text-gray-900">Transaction {index + 1}</h3>
              </div>
              {newTransactions.length > 1 && (
                <button
                  onClick={() => handleRemoveTransaction(transaction.id!)}
                  className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="space-y-3">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Description</span>
                  <input
                    type="text"
                    placeholder="Enter description"
                    className={`flex-1 ml-4 p-2 border rounded-lg bg-white
                      ${errors[`${transaction.id}-description`] ? 'border-red-500' : 'border-gray-200'}`}
                    value={transaction.description || ''}
                    onChange={(e) => {
                      handleTransactionChange(transaction.id!, 'description', e.target.value);
                      if (errors[`${transaction.id}-description`]) {
                        setErrors(prev => ({
                          ...prev,
                          [`${transaction.id}-description`]: ''
                        }));
                      }
                    }}
                  />
                </div>
                {errors[`${transaction.id}-description`] && (
                  <span className="text-xs text-red-500 ml-auto">
                    {errors[`${transaction.id}-description`]}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Amount</span>
                  <input
                    type="number"
                    placeholder="0.00"
                    className={`flex-1 ml-4 p-2 border rounded-lg bg-white
                      ${errors[`${transaction.id}-amount`] ? 'border-red-500' : 'border-gray-200'}`}
                    value={transaction.amount || ''}
                    onChange={(e) => {
                      handleTransactionChange(transaction.id!, 'amount', parseFloat(e.target.value));
                      if (errors[`${transaction.id}-amount`]) {
                        setErrors(prev => ({
                          ...prev,
                          [`${transaction.id}-amount`]: ''
                        }));
                      }
                    }}
                  />
                </div>
                {errors[`${transaction.id}-amount`] && (
                  <span className="text-xs text-red-500 ml-auto">
                    {errors[`${transaction.id}-amount`]}
                  </span>
                )}
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Category</span>
                <select
                  className="flex-1 ml-4 p-2 border rounded-lg bg-white"
                  value={transaction.category?.name || ''}
                  onChange={(e) => handleTransactionChange(transaction.id!, 'category', e.target.value)}
                >
                  <option value="">Select Category</option>
                  {Object.keys(categoryConfig).map((categoryName) => (
                    <option key={categoryName} value={categoryName}>
                      {categoryName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Date</span>
                <input
                  type="date"
                  className="flex-1 ml-4 p-2 border rounded-lg bg-white"
                  value={formatDateForInput(transaction.date as Date || new Date())}
                  max={formatDateForInput(new Date())}
                  onChange={(e) => handleTransactionChange(transaction.id!, 'date', new Date(e.target.value))}
                />
              </div>
            </div>
          </div>
        ))}
        
        <div className="flex justify-between pt-4 border-t border-gray-200">
          <button
            onClick={handleAddTransaction}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <Plus className="w-4 h-4" />
            Add Another
          </button>
          <div className="flex gap-3">
            <button
              onClick={handleClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
