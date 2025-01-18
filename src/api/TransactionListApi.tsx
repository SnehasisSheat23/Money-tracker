import { Transaction } from '../data/types/transaction';
import { categoryConfig } from '../data/categoryConfig';

const API_BASE_URL = 'http://localhost:3000/api/transactions'; // Verify this matches your backend URL

interface ApiResponse<T> {
  data: T;
  error?: string;
}

interface TransactionsResponse {
  transactions: Transaction[];
  hasMore: boolean;
}

export const TransactionListApi = {
  async fetchTransactions(page: number): Promise<{ transactions: Transaction[], hasMore: boolean }> {
    try {
      const response = await fetch(`${API_BASE_URL}?page=${page}`, {
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch transactions');
      }

      const data: TransactionsResponse = await response.json();
      
      // Transform the date strings to Date objects
      const transformedTransactions = data.transactions.map(t => ({
        ...t,
        date: new Date(t.date),
        amount: Number(t.amount), // Ensure amount is a number
      }));

      return {
        transactions: transformedTransactions,
        hasMore: data.hasMore
      };
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw error;
    }
  },

  async createTransaction(transaction: Partial<Transaction>): Promise<Transaction> {
    try {
      // Validate required fields
      if (!transaction.description?.trim()) {
        throw new Error('Description is required');
      }

      if (!transaction.amount || transaction.amount <= 0) {
        throw new Error('Amount must be greater than 0');
      }

      // Set default values if not provided
      const enrichedTransaction = {
        ...transaction,
        date: transaction.date || new Date(),
        category: transaction.category?.name ? {
          name: transaction.category.name,
          icon: categoryConfig[transaction.category.name as keyof typeof categoryConfig]?.icon || 'credit-card',
          color: categoryConfig[transaction.category.name as keyof typeof categoryConfig]?.color || 'gray'
        } : {
          name: 'Other',
          icon: 'credit-card',
          color: 'gray'
        }
      };

      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(enrichedTransaction)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create transaction');
      }

      const data = await response.json();
      return {
        ...data,
        date: new Date(data.date),
        amount: Number(data.amount)
      };
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw error;
    }
  },

  async updateTransaction(id: string, transaction: Partial<Transaction>): Promise<Transaction> {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transaction)
    });
    if (!response.ok) throw new Error('Failed to update transaction');
    const data = await response.json();
    return { ...data, date: new Date(data.date) };
  },

  async deleteTransaction(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete transaction');
  }
};
