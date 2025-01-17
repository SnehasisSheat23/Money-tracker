import React, { useState, useRef, useEffect } from 'react';
import { 
  CreditCard, User, Plus, Trash2, AlertCircle,
  ArrowDownCircle, ArrowUpCircle, X,
  Utensils, ShoppingCart, ShoppingBag,
  Bus, Film, Bolt, Heart, Home, PiggyBank
} from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import '../../styles/global.css'
import { Modal } from '../ui/Popup';
import { Transaction } from '../../data/types/transaction';
import { AddTransaction } from '../ui/addtransaction';
import { motion, AnimatePresence } from 'framer-motion';
import { LoadingAnimation } from '../ui/LoadingAnimation';
import { TransactionListApi } from '../../api/TransactionListApi';
import { useInView } from 'react-intersection-observer';



export function TransactionList() {
  const [showDeleteId, setShowDeleteId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [deletedIds, setDeletedIds] = useState<string[]>([]);
  const [undoTimeout, setUndoTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [swipeProgress, setSwipeProgress] = useState(0);
  const [swipedId, setSwipedId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const { ref: loadMoreRef, inView } = useInView();
  const swipeThreshold = 80; // pixels needed to trigger delete

  // Add check for mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetchInitialTransactions();
  }, []);

  useEffect(() => {
    if (inView && hasMore && !isLoadingMore) {
      loadMoreTransactions();
    }
  }, [inView]);

  const fetchInitialTransactions = async () => {
    setIsLoading(true);
    try {
      const { transactions: newTransactions, hasMore: more } = await TransactionListApi.fetchTransactions(0);
      setTransactions(newTransactions.map(t => ({
        ...t,
        date: new Date(t.date) // Ensure dates are properly instantiated
      })));
      setHasMore(more);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setTransactions([]);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreTransactions = async () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    try {
      const nextPage = page + 1;
      const { transactions: newTransactions, hasMore: more } = await TransactionListApi.fetchTransactions(nextPage);
      setTransactions(prev => [...prev, ...newTransactions.map(t => ({
        ...t,
        date: new Date(t.date) // Ensure dates are properly instantiated
      }))]);
      setHasMore(more);
      setPage(nextPage);
    } catch (error) {
      console.error('Error loading more transactions:', error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleTouchStart = (e: React.TouchEvent, id: string) => {
    if (!isMobile) return;
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setSwipedId(id);
    setSwipeProgress(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isMobile || !touchStart || !swipedId) return;
    const currentTouch = e.targetTouches[0].clientX;
    setTouchEnd(currentTouch);
    
    const swipeDistance = Math.max(0, touchStart - currentTouch);
    const progress = Math.min(swipeDistance, swipeThreshold);
    setSwipeProgress(progress);

    // Vibratation
    if (progress > swipeThreshold * 0.75 && swipeProgress <= swipeThreshold * 0.75) {
      navigator.vibrate?.(1);
    }
  };

  const handleTouchEnd = () => {
    if (!isMobile || !touchStart || !touchEnd || !swipedId) return;
    
    const swipeDistance = touchStart - touchEnd;
    if (swipeDistance > swipeThreshold) {
      navigator.vibrate?.(3);
      setDeleteConfirm(swipedId);
    }

    // Reset states
    setTouchStart(null);
    setTouchEnd(null);
    setSwipedId(null);
    setSwipeProgress(0);
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

  const handleSaveTransactions = (transactions: Partial<Transaction>[]) => {
    // Here you would typically save to your backend
    console.log('Saving transactions:', transactions);
    setIsAddModalOpen(false);
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-4 md:p-6 rounded-xl shadow-sm relative"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
      <div>
            <h2 className="text-lg font-semibold text-slate-800">Recent Transactions</h2>
            <p className="text-xs text-slate-500 mt-1">daily transactions </p>
          </div>
        <div className="flex gap-2 pr-2">
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">Add</span>
          </button>
          <button className="text-blue-600 text-sm font-medium p-2 hover:text-blue-700">
            See All
          </button>
        </div>
      </div>

      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <AnimatePresence mode="popLayout">
          <div className={`space-y-2 overflow-y-auto pr-3 
            scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent
            hover:scrollbar-thumb-gray-300
            ${isMobile ? 'h-[calc(100vh-20rem)]' : 'h-[calc(100vh-36rem)]'}`}>
            {transactions.map((transaction) => !deletedIds.includes(transaction.id) && (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="relative overflow-hidden rounded-lg"
                onTouchStart={(e) => handleTouchStart(e, transaction.id)}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* Delete button background - mobile only */}
                {isMobile && swipedId === transaction.id && (
                  <div 
                    className="absolute inset-y-0 right-0 flex items-center justify-end bg-red-500 text-white"
                    style={{
                      width: `${swipeProgress}px`,
                      opacity: swipeProgress / swipeThreshold,
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div className="flex items-center px-4">
                      <Trash2 className="w-5 h-5" />
                    </div>
                  </div>
                )}

                {/* Transaction item */}
                <div 
                  style={{
                    transform: isMobile && swipedId === transaction.id 
                      ? `translateX(-${swipeProgress}px)`
                      : 'translateX(0)',
                    transition: 'transform 0.2s ease'
                  }}
                  className="bg-white group flex items-center justify-between p-2 hover:bg-gray-50 transition-colors"
                  onMouseEnter={() => !isMobile && setShowDeleteId(transaction.id)}
                  onMouseLeave={() => !isMobile && setShowDeleteId(null)}
                >
                  <div className="flex items-center flex-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center
                      bg-${transaction.category.color}-50 text-${transaction.category.color}-600`}>
                      {getCategoryIcon(transaction.category.icon)}
                    </div>
                    <div className="ml-4 flex-1">
                      <h2 className="font-medium text-gray-900">{transaction.description}</h2>
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
              </motion.div>
            ))}
            {hasMore && (
              <div ref={loadMoreRef} className="py-4 flex justify-center">
                {isLoadingMore ? (
                  <LoadingAnimation />
                ) : (
                  <span className="text-gray-500">Scroll for more</span>
                )}
              </div>
            )}
          </div>
        </AnimatePresence>
      )}

      <Modal
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        title="Delete Transaction"
      >
        {deleteConfirm && transactions.find(t => t.id === deleteConfirm) && (
          <>
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center
                  bg-${transactions.find(t => t.id === deleteConfirm)?.category.color}-50 
                  text-${transactions.find(t => t.id === deleteConfirm)?.category.color}-600`}>
                  {getCategoryIcon(transactions.find(t => t.id === deleteConfirm)?.category.icon || '')}
                </div>
                <div>
                  <p className="font-medium">
                    {transactions.find(t => t.id === deleteConfirm)?.description}
                  </p>
                  <p className="text-sm text-gray-500">
                    {transactions.find(t => t.id === deleteConfirm)?.category.name}
                  </p>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Amount:</span>
                <span className="font-medium">
                  {formatCurrency(transactions.find(t => t.id === deleteConfirm)?.amount || 0)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">
                  {transactions.find(t => t.id === deleteConfirm)?.date.toLocaleDateString('en-US', {
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

      <AddTransaction
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveTransactions}
      />

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
    </motion.div>
  );
}