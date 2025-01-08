import React from 'react';
import { formatCurrency } from '../data/utils/formatters';
import { format } from 'date-fns';
import { Expense } from '../data/types/expense';

interface TransactionTableProps {
  transactions: Expense[];
}

export const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {format(transaction.date, 'MMM d, yyyy')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {transaction.description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                {formatCurrency(transaction.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
