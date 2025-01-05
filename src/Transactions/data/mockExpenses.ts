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
  {
    id: '6',
    date: new Date('2024-01-13'),
    description: 'Internet and phone plan',
    amount: 50.00,
    category: mockCategories.find(c => c.name === 'Utilities')!
  },
  {
    id: '7',
    date: new Date('2024-01-12'),
    description: 'Electricity and water',
    amount: 120.00,
    category: mockCategories.find(c => c.name === 'Utilities')!
  },
  {
    id: '8',
    date: new Date('2024-01-13'),
    description: 'Weekly groceries',
    amount: 60.00,
    category: mockCategories.find(c => c.name === 'Groceries')!
  },
  {
    id: '9',
    date: new Date('2024-01-15'),
    description: 'Dining out',
    amount: 86.00,
    category: mockCategories.find(c => c.name === 'Food & Drinks')!
  },
  {
    id: '10',
    date: new Date('2024-01-15'),
    description: 'Dining out',
    amount: 86.00,
    category: mockCategories.find(c => c.name === 'Food & Drinks')!
  },
  {
    id: '11',
    date: new Date('2024-01-13'),
    description: 'Internet and phone plan',
    amount: 50.00,
    category: mockCategories.find(c => c.name === 'Utilities')!
  },
  {
    id: '12',
    date: new Date('2024-01-15'),
    description: 'Electricity and water',
    amount: 120.00,
    category: mockCategories.find(c => c.name === 'Utilities')!
  },
  {
    id: '13',
    date: new Date('2024-01-10'),
    description: 'Weekly groceries',
    amount: 60.00,
    category: mockCategories.find(c => c.name === 'Groceries')!
  },
  {
    id: '14',
    date: new Date('2024-01-13'),
    description: 'Dining out',
    amount: 86.00,
    category: mockCategories.find(c => c.name === 'Food & Drinks')!
  },
  {
    id: '15',
    date: new Date('2024-01-11'),
    description: 'Weekly groceries',
    amount: 60.00,
    category: mockCategories.find(c => c.name === 'Groceries')!
  },
  {
    id: '16',
    date: new Date('2024-01-17'),
    description: 'Dining out',
    amount: 86.00,
    category: mockCategories.find(c => c.name === 'Food & Drinks')!
  },
  {
    id: '17',
    date: new Date('2024-01-17'),
    description: 'Dining out',
    amount: 86.00,
    category: mockCategories.find(c => c.name === 'Food & Drinks')!
  },
  {
    id: '18',
    date: new Date('2024-01-17'),
    description: 'Internet and phone plan',
    amount: 50.00,
    category: mockCategories.find(c => c.name === 'Utilities')!
  },
  {
    id: '19',
    date: new Date('2024-01-17'),
    description: 'Electricity and water',
    amount: 120.00,
    category: mockCategories.find(c => c.name === 'Utilities')!
  },
  {
    id: '20',
    date: new Date('2024-01-17'),
    description: 'Weekly groceries',
    amount: 60.00,
    category: mockCategories.find(c => c.name === 'Groceries')!
  },
  {
    id: '21',
    date: new Date('2024-01-13'),
    description: 'Dining out',
    amount: 86.00,
    category: mockCategories.find(c => c.name === 'Food & Drinks')!
  },
];