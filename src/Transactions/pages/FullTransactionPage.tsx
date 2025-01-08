import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TransactionTable } from '../TransactionTable';
import { iconMap } from '../../data/utils/icons';
import { Category } from '../../data/types/expense';

interface TransactionPageProps {
  categories: Category[];
}

export const TransactionPage: React.FC<TransactionPageProps> = ({ categories }) => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const category = categories.find(c => c.id === categoryId);

  if (!category) {
    return <div>Category not found</div>;
  }

  const Icon = iconMap[category.icon];

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            {Icon && <Icon className="text-2xl" />}
            <h1 className="text-3xl font-bold text-gray-900">
              {category.name} Transactions
            </h1>
          </div>
        </div>
        <TransactionTable transactions={category.transactions} />
      </div>
    </div>
  );
};
