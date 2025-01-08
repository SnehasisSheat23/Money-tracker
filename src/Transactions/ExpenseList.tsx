import React from 'react';
import { format } from 'date-fns';
import { Expense } from '../data/types/expense';
import { ExpenseGroup } from './ExpenseGroup';
import { mockTransactions } from '../data/mockTransactions';

export const ExpenseList: React.FC = () => {
  // Flatten and combine all transactions
  const allExpenses = Object.values(mockTransactions).flat();

  // Group expenses by date
  const groupedExpenses = allExpenses.reduce((groups: { [key: string]: Expense[] }, expense) => {
    const dateKey = format(expense.date, 'yyyy-MM-dd');
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(expense);
    return groups;
  }, {});

  const handleAddExpense = (date: Date, expenseData: Partial<Expense>) => {
    // Add your expense creation logic here
    console.log('New expense:', { date, ...expenseData });
  };

  return (
    <div>
      {Object.entries(groupedExpenses)
        .sort(([dateA], [dateB]) => new Date(dateB).getTime() - new Date(dateA).getTime())
        .map(([dateKey, expenses]) => {
          const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
          return (
            <ExpenseGroup
              key={dateKey}
              date={new Date(dateKey)}
              expenses={expenses}
              totalAmount={totalAmount}
              onAddExpense={handleAddExpense}
            />
          );
      })}
    </div>
  );
};