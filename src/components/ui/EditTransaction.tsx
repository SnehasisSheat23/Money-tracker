import React, { useState, useEffect } from 'react';
import { Modal } from './Popup';
import { Transaction } from '../../data/types/transaction';
import { categoryConfig } from '../../data/categoryConfig';

interface EditTransactionProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updates: Partial<Transaction>) => void;
  transaction: Transaction;
}

export function EditTransaction({ isOpen, onClose, onSave, transaction }: EditTransactionProps) {
  const [updates, setUpdates] = useState<Partial<Transaction>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setUpdates({
      description: transaction.description,
      amount: transaction.amount,
      category: transaction.category,
      date: transaction.date
    });
  }, [transaction]);

  const handleChange = (field: keyof Transaction, value: any) => {
    if (field === 'category') {
      const categoryDetails = categoryConfig[value as keyof typeof categoryConfig];
      setUpdates(prev => ({
        ...prev,
        category: {
          name: value,
          icon: categoryDetails.icon,
          color: categoryDetails.color
        }
      }));
    } else {
      setUpdates(prev => ({ ...prev, [field]: value }));
    }
    // Clear error when field is updated
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validateUpdates = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!updates.description?.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!updates.amount || updates.amount <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateUpdates()) return;
    onSave(updates);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Transaction">
      <div className="space-y-4">
        <div className="space-y-3">
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Description</span>
              <input
                type="text"
                className={`flex-1 ml-4 p-2 border rounded-lg bg-white
                  ${errors.description ? 'border-red-500' : 'border-gray-200'}`}
                value={updates.description || ''}
                onChange={(e) => handleChange('description', e.target.value)}
              />
            </div>
            {errors.description && (
              <span className="text-xs text-red-500 ml-auto">{errors.description}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Amount</span>
              <input
                type="number"
                className={`flex-1 ml-4 p-2 border rounded-lg bg-white
                  ${errors.amount ? 'border-red-500' : 'border-gray-200'}`}
                value={updates.amount || ''}
                onChange={(e) => handleChange('amount', parseFloat(e.target.value))}
              />
            </div>
            {errors.amount && (
              <span className="text-xs text-red-500 ml-auto">{errors.amount}</span>
            )}
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Category</span>
            <select
              className="flex-1 ml-4 p-2 border rounded-lg bg-white"
              value={updates.category?.name || ''}
              onChange={(e) => handleChange('category', e.target.value)}
            >
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
              value={updates.date?.toISOString().split('T')[0] || ''}
              max={new Date().toISOString().split('T')[0]}
              onChange={(e) => handleChange('date', new Date(e.target.value))}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </Modal>
  );
}
