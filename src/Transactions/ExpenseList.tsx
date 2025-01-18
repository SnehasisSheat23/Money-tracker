import React from 'react';
import { format } from 'date-fns';
import { ExpenseGroup } from './ExpenseGroup';
import { useTransactions } from '../hooks/useTransactions';
import { LoadingAnimation } from '../components/ui/LoadingAnimation';

export const ExpenseList: React.FC = () => {
  const { transactions, isLoading, error } = useTransactions();

  if (isLoading) {
    return <LoadingAnimation />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  // Group expenses by date
  const groupedExpenses = transactions.reduce((groups: { [key: string]: any[] }, transaction) => {
    const dateKey = format(transaction.date, 'yyyy-MM-dd');
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(transaction);
    return groups;
  }, {});

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
            />
          );
        })}
    </div>
  );
};