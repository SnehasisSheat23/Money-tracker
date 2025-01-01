import React, { useState, useRef, useEffect } from 'react';
import { 
  CreditCard, User, Plus, Trash2, AlertCircle,
  ArrowDownCircle, ArrowUpCircle, X,
  Utensils, ShoppingCart, ShoppingBag,
  Bus, Film, Bolt, Heart, Home, PiggyBank
} from 'lucide-react';
import { mockTransactions } from '../Transactions/data/mockTransactions';
import { formatCurrency } from '../utils/formatters';
import '../styles/global.css'
import { Modal } from './ui/Modal';

interface TransactionProps {
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

export function TransactionList() {
  const [showDeleteId, setShowDeleteId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [deletedIds, setDeletedIds] = useState<string[]>([]);
  const [undoTimeout, setUndoTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Add check for mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Flatten transactions for display
  const allTransactions = Object.values(mockTransactions)
    .flat()
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (id: string) => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) {
      setDeleteConfirm(id);
    }
  };

  const handleDelete = (id: string) => {
    setDeleteConfirm(null);
    setDeletedIds(prev => [...prev, id]);
    
    if (undoTimeout) clearTimeout(undoTimeout);
    const timeout = setTimeout(() => {
      setDeletedIds(prev => prev.filter(itemId => itemId !== id));
      // Actually delete the transaction here
    }, 5000);
    setUndoTimeout(timeout);
  };

  const handleUndo = (id: string) => {
    if (undoTimeout) clearTimeout(undoTimeout);
    setDeletedIds(prev => prev.filter(itemId => itemId !== id));
  };

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

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Recent Transactions</h2>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">Add</span>
          </button>
          <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
            See All
          </button>
        </div>
      </div>
      
      <div className="space-y-2 h-[calc(100vh-36rem)] overflow-y-auto pr-3 
        scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent
        hover:scrollbar-thumb-gray-300">
        {allTransactions.map((transaction) => !deletedIds.includes(transaction.id) && (
          <div 
            key={transaction.id}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={() => handleTouchEnd(transaction.id)}
            style={{
              transform: touchEnd && touchStart && transaction.id === showDeleteId
                ? `translateX(${Math.min(touchEnd - touchStart, 0)}px)`
                : undefined,
              transition: 'transform 0.2s ease'
            }}
            className="group flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors"
            onMouseEnter={() => !isMobile && setShowDeleteId(transaction.id)}
            onMouseLeave={() => !isMobile && setShowDeleteId(null)}
          >
            <div className="flex items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center
                bg-${transaction.category.color}-50 text-${transaction.category.color}-600`}>
                {getCategoryIcon(transaction.category.icon)}
              </div>
              <div className="ml-4 flex-1">
                <p className="font-medium text-gray-900">{transaction.description}</p>
                <p className="text-sm text-gray-800">
                  {transaction.date.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <p className="font-medium mx-4 text-gray-900">
                {formatCurrency(transaction.amount)}
              </p>
              {showDeleteId === transaction.id && !isMobile && (
                <button 
                  onClick={() => setDeleteConfirm(transaction.id)}
                  className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        title="Delete Transaction"
      >
        {deleteConfirm && allTransactions.find(t => t.id === deleteConfirm) && (
          <>
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center
                  bg-${allTransactions.find(t => t.id === deleteConfirm)?.category.color}-50 
                  text-${allTransactions.find(t => t.id === deleteConfirm)?.category.color}-600`}>
                  {getCategoryIcon(allTransactions.find(t => t.id === deleteConfirm)?.category.icon || '')}
                </div>
                <div>
                  <p className="font-medium">
                    {allTransactions.find(t => t.id === deleteConfirm)?.description}
                  </p>
                  <p className="text-sm text-gray-500">
                    {allTransactions.find(t => t.id === deleteConfirm)?.category.name}
                  </p>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Amount:</span>
                <span className="font-medium">
                  {formatCurrency(allTransactions.find(t => t.id === deleteConfirm)?.amount || 0)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">
                  {allTransactions.find(t => t.id === deleteConfirm)?.date.toLocaleDateString('en-US', {
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
                onClick={() => setDeleteConfirm(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                onClick={() => handleDelete(deleteConfirm)}
              >
                Delete
              </button>
            </div>
          </>
        )}
      </Modal>

      {/* Undo Toast */}
      {deletedIds.length > 0 && (
        <div className="fixed bottom-4 right-4 left-4 md:left-auto md:w-96 bg-gray-800 text-white p-4 rounded-lg shadow-lg flex items-center justify-between z-50">
          <span>Transaction deleted</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleUndo(deletedIds[deletedIds.length - 1])}
              className="text-blue-400 hover:text-blue-300 font-medium"
            >
              Undo
            </button>
            <button
              onClick={() => setDeletedIds([])}
              className="text-gray-400 hover:text-gray-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}