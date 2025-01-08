import { Expense } from './types/expense';

export const mockTransactions: Record<string, Expense[]> = {
  '1': [
    { 
      id: '1-1',
      date: new Date('2024-01-15'),
      description: 'Restaurant - Pizza',
      amount: 36.00,
      category: { id: '1', name: 'Food ', icon: 'utensils', amount: 86.00, color: 'red', transactions: [] }
    },
    { 
      id: '1-2',
      date: new Date('2024-01-16'),
      description: 'Coffee Shop',
      amount: 50.00,
      category: { id: '1', name: 'Food', icon: 'utensils', amount: 86.00, color: 'red', transactions: [] }
    }
  ],
  '2': [
    {
      id: '2-1',
      date: new Date('2024-01-14'),
      description: 'Walmart Grocery',
      amount: 120.50,
      category: { id: '2', name: 'Groceries', icon: 'shopping-cart', amount: 60.00, color: 'green', transactions: [] }
    }
  ],
  '6': [
    {
      id: '6-1',
      date: new Date('2024-01-01'),
      description: 'Electricity Bill',
      amount: 85.00,
      category: { id: '6', name: 'Utilities', icon: 'bolt', amount: 170.00, color: 'yellow', transactions: [] }
    },
    {
      id: '6-2',
      date: new Date('2024-01-01'),
      description: 'Water Bill',
      amount: 45.00,
      category: { id: '6', name: 'Utilities', icon: 'bolt', amount: 170.00, color: 'yellow', transactions: [] }
    },
    {
      id: '6-3',
      date: new Date('2024-01-01'),
      description: 'Internet Bill',
      amount: 40.00,
      category: { id: '6', name: 'Utilities', icon: 'bolt', amount: 170.00, color: 'yellow', transactions: [] }
    }
  ],
  '7': [
    {
      id: '7-1',
      date: new Date('2024-01-10'),
      description: 'Gym Membership',
      amount: 50.00,
      category: { id: '7', name: 'Health & Fitness', icon: 'heart', amount: 100.00, color: 'pink', transactions: [] }
    },
    {
      id: '7-2',
      date: new Date('2024-01-12'),
      description: 'Protein Supplements',
      amount: 50.00,
      category: { id: '7', name: 'Health & Fitness', icon: 'heart', amount: 100.00, color: 'pink', transactions: [] }
    }
  ],
  '8': [
    {
      id: '8-1',
      date: new Date('2024-01-01'),
      description: 'Rent Payment',
      amount: 1000.00,
      category: { id: '8', name: 'Home', icon: 'home', amount: 1100.00, color: 'indigo', transactions: [] }
    },
    {
      id: '8-2',
      date: new Date('2024-01-05'),
      description: 'Home Insurance',
      amount: 100.00,
      category: { id: '8', name: 'Home', icon: 'home', amount: 1100.00, color: 'indigo', transactions: [] }
    }
  ]
};
