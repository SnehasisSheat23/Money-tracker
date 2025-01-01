export interface Expense {
  id: string;
  date: Date;
  description: string;
  amount: number;
  category: Category;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  amount: number;
  color: string;
  transactions: Expense[];
}

export type ViewMode = 'Daily' | 'Monthly' | 'Calendar' | 'Yearly';