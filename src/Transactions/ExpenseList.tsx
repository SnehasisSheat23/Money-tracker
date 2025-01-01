import React from 'react';
import { format } from 'date-fns';
import { Expense } from './types/expense';
import { ExpenseGroup } from './ExpenseGroup';

interface ExpenseListProps {
  expenses: Expense[];
}

export const ExpenseList: React.FC<ExpenseListProps> = ({ expenses }) => {
  const groupedExpenses = expenses.reduce((groups: { [key: string]: Expense[] }, expense) => {
    const dateKey = format(expense.date, 'yyyy-MM-dd');
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(expense);
    return groups;
  }, {});

  return (
    <div>
      {Object.entries(groupedExpenses).map(([dateKey, expenses]) => {
        const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        return (
          <ExpenseGroup
            key={dateKey}
            date={new Date(dateKey)}
            expenses={expenses}
            totalAmount={totalAmount} onAddExpense={function (date: Date): void {
              throw new Error('Function not implemented.');
            } }          />
        );
      })}
    </div>
  );
};