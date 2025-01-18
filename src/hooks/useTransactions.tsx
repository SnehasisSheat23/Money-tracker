import React, { createContext, useContext, useState, useEffect } from 'react';
import { Transaction } from '../data/types/transaction';
import { TransactionListApi } from '../api/TransactionListApi';

interface TransactionsContextType {
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  addTransaction: (transaction: Partial<Transaction>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  updateTransaction: (id: string, updates: Partial<Transaction>) => Promise<void>;
  refreshTransactions: () => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextType | null>(null);

export function TransactionsProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchTransactions = async (pageNum: number) => {
    try {
      setError(null);
      const { transactions: newTransactions, hasMore: more } = 
        await TransactionListApi.fetchTransactions(pageNum);
      
      if (pageNum === 0) {
        setTransactions(newTransactions);
      } else {
        setTransactions(prev => [...prev, ...newTransactions]);
      }
      
      setHasMore(more);
      return more;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch transactions');
      return false;
    }
  };

  const loadMore = async () => {
    if (!hasMore || isLoading) return;
    setIsLoading(true);
    await fetchTransactions(page + 1);
    setPage(prev => prev + 1);
    setIsLoading(false);
  };

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
      const newTransaction = await TransactionListApi.createTransaction(transaction);
      setTransactions(prev => [newTransaction, ...prev]);
    } catch (error) {
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
      const updatedTransaction = await TransactionListApi.updateTransaction(id, updates);
      setTransactions(prev => 
        prev.map(t => t.id === id ? updatedTransaction : t)
      );
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update transaction');
      throw error;
    }
  };

  return (
    <TransactionsContext.Provider value={{
      transactions,
      isLoading,
      error,
      hasMore,
      loadMore,
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
