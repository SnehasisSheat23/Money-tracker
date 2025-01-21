import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { blueTheme } from '../../utils/colors';
import { moneySign } from '../../utils/formatters';
import { CircularProgress } from './CircularProgress';

const expenses = [
  { percentage: 25, category: 'Housing', amount: 857.50 },
  { percentage: 25, category: 'Food', amount: 612.50 },
  { percentage: 20, category: 'Transport', amount: 490.00 },
  { percentage: 10, category: 'Shopping', amount: 245.00 },
  { percentage: 10, category: 'Groceries', amount: 245.00 },
  { percentage: 10, category: 'Others', amount: 245.00 },

];

export function ExpenseStats() {
  const [isLoading, setIsLoading] = useState(false);

  // Calculate starting angles for each segment
  let currentAngle = 0;
  const segmentsWithAngles = expenses.map(expense => {
    const segment = {
      ...expense,
      startAngle: currentAngle,
    };
    currentAngle += (expense.percentage / 100) * 360;
    return segment;
  });

  return (
    <motion.div 
      className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
        <div>
        <h2 className="text-base sm:text-lg font-semibold text-gray-800">Expense Statistics</h2>
        <p className="text-xs text-slate-500 mt-1">Weekly transaction overview</p>
        </div>
        <select className="text-xs sm:text-sm border border-gray-200 rounded-lg px-2 py-1.5 bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none">
          <option>This Month</option>
          <option>Last Month</option>
          <option>Last 3 Months</option>
        </select>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-between min-h-0">
        <div className="relative w-full aspect-square max-h-[350px] mb-6">
          <svg
            className="w-full h-full chart-container"
            viewBox="0 0 200 200"
            style={{ 
              filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.05))',
              overflow: 'visible',
            }}
          >
            <defs>
              <radialGradient id="centerGradient">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="90%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#f8fafc" />
              </radialGradient>
            </defs>
            
            {segmentsWithAngles.map((expense, index) => (
              <CircularProgress
                key={index}
                percentage={expense.percentage}
                color={blueTheme[index].color}
                category={expense.category}
                amount={expense.amount}
                index={index}
                startAngle={expense.startAngle}
                size={200}
                totalItems={expenses.length}
              />
            ))}

            {/* Center circle */}
            <circle
              cx="100"
              cy="100"
              r="45"
              fill="url(#centerGradient)"
              filter="drop-shadow(0 2px 4px rgba(0,0,0,0.05))"
            />
          </svg>
          
          {/* Center content */}
          <motion.div 
            className="absolute inset-0 flex flex-col items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <span className="text-xs sm:sm text-gray-500 mb-1">Total Spent</span>
            <span className="text-2xl sm:text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
              {moneySign(2450)}
            </span>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full">
          {expenses.map((expense, index) => (
            <div 
              key={index} 
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <div 
                className="w-2 h-2 rounded-lg shrink-0" 
                style={{ backgroundColor: blueTheme[index].color }}
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-gray-600 truncate">
                  {expense.category}
                </p>
                <p className="text-xs sm:text-sm font-semibold text-blue-900">
                  {expense.percentage}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}