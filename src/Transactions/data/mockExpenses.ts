import { Expense } from '../types/expense';
import { mockCategories } from './mockCategories';

export const mockExpenses: Expense[] = [
  {
    id: '1',
    date: new Date('2024-01-11'),
    description: 'Rent payment',
    amount: 1100.00,
    category: mockCategories.find(c => c.name === 'Home')!
  },
  {
    id: '2',
    date: new Date('2024-01-11'),
    description: 'Internet and phone plan',
    amount: 50.00,
    category: mockCategories.find(c => c.name === 'Utilities')!
  },
  {
    id: '3',
    date: new Date('2024-01-11'),
    description: 'Electricity and water',
    amount: 120.00,
    category: mockCategories.find(c => c.name === 'Utilities')!
  },
  {
    id: '4',
    date: new Date('2024-01-05'),
    description: 'Weekly groceries',
    amount: 60.00,
    category: mockCategories.find(c => c.name === 'Groceries')!
  },
  {
    id: '5',
    date: new Date('2024-01-05'),
    description: 'Dining out',
    amount: 86.00,
    category: mockCategories.find(c => c.name === 'Food & Drinks')!
  },
];