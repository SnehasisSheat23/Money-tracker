import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { Transaction } from '../data/types/transaction';
import { TransactionListApi } from '../api/TransactionListApi';
import debounce from 'lodash/debounce';

// Cache implementation
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
interface CacheEntry {
  data: Transaction[];
  timestamp: number;
}

const cache: { [page: number]: CacheEntry } = {};

interface TransactionsContextType {
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  addTransaction: (transaction: Partial<Transaction>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  updateTransaction: (id: string, updates: Partial<Transaction>) => Promise<Transaction>;
  refreshTransactions: () => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextType | null>(null);

export function TransactionsProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const loadingRef = useRef(false);

  // Check cache validity
  const isCacheValid = (page: number) => {
    const entry = cache[page];
    if (!entry) return false;
    return Date.now() - entry.timestamp < CACHE_DURATION;
  };

  const fetchTransactions = async (pageNum: number) => {
    try {
      setError(null);

      if (isCacheValid(pageNum)) {
        const cachedData = cache[pageNum];
        if (pageNum === 0) {
          setTransactions(cachedData.data);
        } else {
          // Merge new transactions with existing ones and group by date
          setTransactions(prev => {
            const combined = [...prev, ...cachedData.data];
            return combined.sort((a, b) => b.date.getTime() - a.date.getTime());
          });
        }
        return true;
      }

      const { transactions: newTransactions, hasMore: more } = 
        await TransactionListApi.fetchTransactions(pageNum);
      
      cache[pageNum] = {
        data: newTransactions,
        timestamp: Date.now()
      };

      if (pageNum === 0) {
        setTransactions(newTransactions);
      } else {
        // Merge and sort transactions
        setTransactions(prev => {
          const combined = [...prev, ...newTransactions];
          return combined.sort((a, b) => b.date.getTime() - a.date.getTime());
        });
      }
      
      setHasMore(more);
      return more;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch transactions');
      return false;
    }
  };

  // Debounced load more function
  const debouncedLoadMore = useCallback(
    debounce(async () => {
      if (!hasMore || loadingRef.current) return;
      loadingRef.current = true;
      setIsLoading(true);
      await fetchTransactions(page + 1);
      setPage(prev => prev + 1);
      setIsLoading(false);
      loadingRef.current = false;
    }, 300),
    [page, hasMore]
  );

  const refreshTransactions = async () => {
    setIsLoading(true);
    setPage(0);
    await fetchTransactions(0);
    setIsLoading(false);
  };

  useEffect(() => {
    refreshTransactions();
  }, []);

  const addTransaction = async (transaction: Partial<Transaction>) => {
    try {
      // Optimistic update
      const tempId = `temp-${Date.now()}`;
      const optimisticTransaction = {
        ...transaction,
        id: tempId,
        date: transaction.date || new Date(),
      } as Transaction;

      setTransactions(prev => [optimisticTransaction, ...prev]);

      const newTransaction = await TransactionListApi.createTransaction(transaction);
      
      // Replace optimistic transaction with real one
      setTransactions(prev => 
        prev.map(t => t.id === tempId ? newTransaction : t)
      );
    } catch (error) {
      // Rollback on error
      setTransactions(prev => prev.filter(t => !t.id.startsWith('temp-')));
      setError(error instanceof Error ? error.message : 'Failed to add transaction');
      throw error;
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      await TransactionListApi.deleteTransaction(id);
      setTransactions(prev => prev.filter(t => t.id !== id));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to delete transaction');
      throw error;
    }
  };

  const updateTransaction = async (id: string, updates: Partial<Transaction>) => {
    try {
      setError(null);
      const updatedTransaction = await TransactionListApi.updateTransaction(id, updates);
      setTransactions(prev => 
        prev.map(t => t.id === id ? updatedTransaction : t)
      );
      return updatedTransaction;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update transaction';
      setError(errorMessage);
      throw error;
    }
  };

  // Clear cache when component unmounts
  useEffect(() => {
    return () => {
      Object.keys(cache).forEach(key => delete cache[Number(key)]);
    };
  }, []);

  return (
    <TransactionsContext.Provider value={{
      transactions,
      isLoading,
      error,
      hasMore,
      loadMore: debouncedLoadMore,
      addTransaction,
      deleteTransaction,
      updateTransaction,
      refreshTransactions,
    }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionsProvider');
  }
  return context;
}
