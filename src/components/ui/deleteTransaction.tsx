import React from 'react';
import { Modal } from './Popup';
import { Transaction } from '../../data/types/transaction';
import { 
  CreditCard, Utensils, ShoppingCart, ShoppingBag,
  Bus, Film, Bolt, Heart, Home, PiggyBank
} from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

interface DeleteTransactionProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: string) => void;
  transaction: Transaction | undefined;
}

export function DeleteTransaction({ isOpen, onClose, onDelete, transaction }: DeleteTransactionProps) {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'utensils': return <Utensils className="w-6 h-6" />;
      case 'shopping-cart': return <ShoppingCart className="w-6 h-6" />;
      case 'shopping-bag': return <ShoppingBag className="w-6 h-6" />;
      case 'bus': return <Bus className="w-6 h-6" />;
      case 'film': return <Film className="w-6 h-6" />;
      case 'bolt': return <Bolt className="w-6 h-6" />;
      case 'heart': return <Heart className="w-6 h-6" />;
      case 'home': return <Home className="w-6 h-6" />;
      case 'piggy-bank': return <PiggyBank className="w-6 h-6" />;
      default: return <CreditCard className="w-6 h-6" />;
    }
  };

  if (!transaction) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Transaction"
    >
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center
            bg-${transaction.category.color}-50 
            text-${transaction.category.color}-600`}>
            {getCategoryIcon(transaction.category.icon)}
          </div>
          <div>
            <p className="font-medium">{transaction.description}</p>
            <p className="text-sm text-gray-500">{transaction.category.name}</p>
          </div>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Amount:</span>
          <span className="font-medium">{formatCurrency(transaction.amount)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Date:</span>
          <span className="font-medium">
            {transaction.date.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>
      </div>
      <p className="text-gray-600 mb-6">Are you sure you want to delete this transaction?</p>
      <div className="flex justify-end gap-3">
        <button
          className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          onClick={() => onDelete(transaction.id)}
        >
          Delete
        </button>
      </div>
    </Modal>
  );
}
