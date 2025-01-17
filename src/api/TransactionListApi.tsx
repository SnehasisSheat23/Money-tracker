import { Transaction } from '../data/types/transaction';
import { generateDummyTransactions } from '../components/TransactionList/data';

const ITEMS_PER_PAGE = 20;
let cachedTransactions: Transaction[] | null = null;

export const TransactionListApi = {
  async fetchTransactions(page: number): Promise<{ 
    transactions: Transaction[], 
    hasMore: boolean 
  }> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Generate or use cached transactions
      if (!cachedTransactions) {
        cachedTransactions = generateDummyTransactions(10000);
      }

      const start = page * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE;
      const transactions = cachedTransactions.slice(start, end).map(t => ({
        ...t,
        date: new Date(t.date) // Ensure date is properly instantiated
      }));
      const hasMore = end < (cachedTransactions?.length || 0);

      return { transactions, hasMore };
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return { transactions: [], hasMore: false };
    }
  }
};
