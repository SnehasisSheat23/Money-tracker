import { Category } from './types/expense';
import { mockTransactions } from './mockTransactions';

export const mockCategories: Category[] = [
  { 
    id: '1', 
    name: 'Food ', 
    icon: 'utensils', 
    amount: 86.00, 
    color: 'red',
    transactions: mockTransactions['1'] || []
  },
  { 
    id: '2', 
    name: 'Groceries', 
    icon: 'shopping-cart', 
    amount: 60.00, 
    color: 'green',
    transactions: mockTransactions['2'] || []
  },
  { 
    id: '3', 
    name: 'Shopping', 
    icon: 'shopping-bag', 
    amount: 0.00, 
    color: 'blue',
    transactions: []
  },
  { 
    id: '4', 
    name: 'Transport', 
    icon: 'bus', 
    amount: 0.00, 
    color: 'orange',
    transactions: []
  },
  { 
    id: '5', 
    name: 'Entertainment', 
    icon: 'film', 
    amount: 0.00, 
    color: 'purple',
    transactions: []
  },
  { 
    id: '6', 
    name: 'Utilities', 
    icon: 'bolt', 
    amount: 170.00, 
    color: 'yellow',
    transactions: []
  },
  { 
    id: '7', 
    name: 'Health & Fitness', 
    icon: 'heart', 
    amount: 100.00, 
    color: 'pink',
    transactions: []
  },
  { 
    id: '8', 
    name: 'Home', 
    icon: 'home', 
    amount: 1100.00, 
    color: 'indigo',
    transactions: []
  },
  { 
    id: '9', 
    name: 'Savings', 
    icon: 'piggy-bank', 
    amount: 0.00, 
    color: 'teal',
    transactions: []
  },
];