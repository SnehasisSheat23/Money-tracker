import { Transaction } from '../../data/types/transaction';
import { v4 as uuidv4 } from 'uuid';

const categories = [
  { name: 'Food', icon: 'utensils', color: 'orange' },
  { name: 'Shopping', icon: 'shopping-cart', color: 'blue' },
  { name: 'Transport', icon: 'bus', color: 'green' },
  { name: 'Entertainment', icon: 'film', color: 'purple' },
  { name: 'Utilities', icon: 'bolt', color: 'yellow' },
  { name: 'Healthcare', icon: 'heart', color: 'red' },
  { name: 'Housing', icon: 'home', color: 'indigo' },
  { name: 'Savings', icon: 'piggy-bank', color: 'pink' }
];

export function generateDummyTransactions(count: number): Transaction[] {
  const transactions: Transaction[] = [];
  const now = new Date();

  for (let i = 0; i < count; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const daysAgo = Math.floor(Math.random() * 365);
    const amount = Math.round(Math.random() * 1000 * 100) / 100;

    transactions.push({
      id: uuidv4(),
      date: new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000),
      description: `Transaction ${i + 1}`,
      amount: amount,
      category: category
    });
  }

  return transactions.sort((a, b) => b.date.getTime() - a.date.getTime());
}
