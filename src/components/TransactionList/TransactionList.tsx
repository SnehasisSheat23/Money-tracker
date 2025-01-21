import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  CreditCard, User, Plus, Trash2, AlertCircle,
  ArrowDownCircle, ArrowUpCircle, X,
  Utensils, ShoppingCart, ShoppingBag,
  Bus, Film, Bolt, Heart, Home, PiggyBank,Edit
} from 'lucide-react';
import { moneySign } from '../../utils/formatters';
import '../../styles/global.css'
import { Transaction } from '../../data/types/transaction';
import { AddTransaction } from '../ui/addtransaction';
import { motion, AnimatePresence } from 'framer-motion';
import { LoadingAnimation } from '../ui/LoadingAnimation';
import { useInView } from 'react-intersection-observer';
import { useTransactions } from '../../hooks/useTransactions';
import { EditTransaction } from '../ui/EditTransaction';
import { DeleteTransaction } from '../ui/deleteTransaction';
import { UndoDelete } from '../ui/undoDelete';
import { AddButton } from '../ui/addbutton';

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
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0,  // Changed from 0.5 to 0
    rootMargin: '200px', // Increased from 100px
  });
  const swipeThreshold = 80; // pixels needed to trigger delete

  const {
    transactions,
    isLoading,
    error,
    hasMore,
    loadMore,
    addTransaction,
    deleteTransaction,
    updateTransaction
  } = useTransactions();

  // check for mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const throttle = (func: Function, limit: number) => {
    let inThrottle: boolean;
    return function(...args: any[]) {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  };

  const loadMoreThrottleTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleLoadMore = useCallback(async () => {
    if (!hasMore || isLoading || isLoadingMore || loadMoreThrottleTimeout.current) return;

    setIsLoadingMore(true);
    
    // Set throttle timeout
    loadMoreThrottleTimeout.current = setTimeout(() => {
      loadMoreThrottleTimeout.current = null;
    }, 1000);

    try {
      await loadMore();
    } catch (error) {
      console.error('Error loading more transactions:', error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [hasMore, isLoading, isLoadingMore, loadMore]);

  useEffect(() => {
    if (inView) {
      handleLoadMore();
    }

    return () => {
      if (loadMoreThrottleTimeout.current) {
        clearTimeout(loadMoreThrottleTimeout.current);
      }
    };
  }, [inView, handleLoadMore]);

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

  const handleDelete = async (id: string) => {
    setDeleteConfirm(null);
    setDeletedIds(prev => [...prev, id]);
    
    if (undoTimeout) clearTimeout(undoTimeout);
    const timeout = setTimeout(async () => {
      try {
        await deleteTransaction(id);
        setDeletedIds(prev => prev.filter(itemId => itemId !== id));
      } catch (error) {
        console.error('Failed to delete transaction:', error);
        // Show error toast
        setDeletedIds(prev => prev.filter(itemId => itemId !== id));
      }
    }, 5000);
    setUndoTimeout(timeout);
  };

  const handleUndo = (id: string) => {
    if (undoTimeout) clearTimeout(undoTimeout);
    setDeletedIds(prev => prev.filter(itemId => itemId !== id));
  };

  const handleSaveTransactions = async (newTransactions: Partial<Transaction>[]) => {
    try {
      await Promise.all(newTransactions.map(transaction => addTransaction(transaction)));
      setIsAddModalOpen(false);
    } catch (error) {
      // Error handling is now done in the hook
      console.error('Failed to save transactions:', error);
    }
  };

  const handleUpdateTransaction = async (id: string, updates: Partial<Transaction>) => {
    try {
      await updateTransaction(id, updates);
    } catch (error) {
      console.error('Failed to update transaction:', error);
      // Show error toast
    }
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
  };

  const handleSaveEdit = async (updates: Partial<Transaction>) => {
    if (!editingTransaction) return;
    
    try {
      await updateTransaction(editingTransaction.id, updates);
      setEditingTransaction(null);
    } catch (error) {
      console.error('Failed to update transaction:', error);
      // You might want to show an error toast here
    }
  };

  const getCategoryIcon = (iconName: string) => {
    const iconClasses = "w-4 h-4 stroke-[1.5]"; // Thinner, smaller icons
    switch (iconName) {
      case 'utensils': return <Utensils className={iconClasses} />;
      case 'shopping-cart': return <ShoppingCart className={iconClasses} />;
      case 'shopping-bag': return <ShoppingBag className={iconClasses} />;
      case 'bus': return <Bus className={iconClasses} />;
      case 'film': return <Film className={iconClasses} />;
      case 'bolt': return <Bolt className={iconClasses} />;
      case 'heart': return <Heart className={iconClasses} />;
      case 'home': return <Home className={iconClasses} />;
      case 'piggy-bank': return <PiggyBank className={iconClasses} />;
      default: return <CreditCard className={iconClasses} />;
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
        <div className="flex gap-2 pr-7">
          <AddButton 
            onClick={() => setIsAddModalOpen(true)}
            text="Add"
            className="!py-1.5 !px-3 !w-auto"
          />
          
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            <span>{error}</span>
          </div>
        </div>
      )}

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
                    <div className={`
                      w-10 h-10 
                      rounded-lg 
                      flex items-center justify-center 
                      bg-opacity-10 
                      transition-all 
                      duration-200
                      ${transaction.category.color === 'blue' ? 'bg-[#0066FF]' : ''}
                      ${transaction.category.color === 'green' ? 'bg-[#00875A]' : ''}
                      ${transaction.category.color === 'purple' ? 'bg-[#6554C0]' : ''}
                      ${transaction.category.color === 'orange' ? 'bg-[#FF991F]' : ''}
                      ${transaction.category.color === 'red' ? 'bg-[#FF5630]' : ''}
                    `}>
                      <div className={`
                        p-2 
                        rounded-md 
                        transition-colors
                        ${transaction.category.color === 'blue' ? 'text-[#0066FF]' : ''}
                        ${transaction.category.color === 'green' ? 'text-[#00875A]' : ''}
                        ${transaction.category.color === 'purple' ? 'text-[#6554C0]' : ''}
                        ${transaction.category.color === 'orange' ? 'text-[#FF991F]' : ''}
                        ${transaction.category.color === 'red' ? 'text-[#FF5630]' : ''}
                      `}>
                        {getCategoryIcon(transaction.category.icon)}
                      </div>
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
                      {moneySign(transaction.amount)}
                    </p>
                    {showDeleteId === transaction.id && !isMobile && (
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleEdit(transaction)}
                          className="p-2 text-gray-400 hover:text-blue-500 rounded-full hover:bg-blue-50 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => setDeleteConfirm(transaction.id)}
                          className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
            {(hasMore || isLoadingMore) && (
              <div 
                ref={loadMoreRef} 
                className="py-4 flex justify-center"
              >
                {isLoadingMore && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <LoadingAnimation />
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </AnimatePresence>
      )}

      <DeleteTransaction
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        onDelete={handleDelete}
        transaction={transactions.find(t => t.id === deleteConfirm)}
      />

      <AddTransaction
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveTransactions}
      />

      <UndoDelete
        deletedIds={deletedIds}
        onUndo={handleUndo}
        onClose={() => setDeletedIds([])}
      />

      {/* Add EditTransaction modal */}
      {editingTransaction && (
        <EditTransaction
          isOpen={!!editingTransaction}
          onClose={() => setEditingTransaction(null)}
          onSave={handleSaveEdit}
          transaction={editingTransaction}
        />
      )}
    </motion.div>
  );
}