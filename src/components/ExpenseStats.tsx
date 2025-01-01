import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

// Updated colors to match the site's theme
const expenses = [
  { category: 'Entertainment', percentage: 30, color: 'rgba(59, 130, 246, 0.8)' }, // blue-500
  { category: 'Bills', percentage: 15, color: 'rgba(239, 68, 68, 0.8)' }, // red-500
  { category: 'Investment', percentage: 20, color: 'rgba(16, 185, 129, 0.8)' }, // emerald-500
  { category: 'Others', percentage: 35, color: 'rgba(168, 85, 247, 0.8)' }  // purple-500
];

const data = {
  labels: expenses.map(expense => expense.category),
  datasets: [{
    data: expenses.map(expense => expense.percentage),
    backgroundColor: expenses.map(expense => expense.color),
    borderWidth: 2,
    borderColor: '#ffffff',
  }],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      enabled: true,
      callbacks: {
        label: (context: any) => `${context.label}: ${context.raw}%`,
      },
      backgroundColor: 'white',
      titleColor: '#1f2937',
      bodyColor: '#4b5563',
      borderColor: '#e5e7eb',
      borderWidth: 1,
      padding: 12,
      cornerRadius: 8,
      titleFont: {
        size: 14,
        weight: 'bold',
        family: "'Inter', sans-serif" // Match site font
      },
      bodyFont: {
        family: "'Inter', sans-serif" // Match site font
      }
    },
    legend: {
      display: false,
    },
    datalabels: {
      color: '#ffffff',
      formatter: (value: number) => `${value}%`,
      font: {
        weight: 'semibold',
        size: 12,
        family: "'Inter', sans-serif" // Match site font
      },
      padding: 6,
      anchor: 'center',
      align: 'center',
      offset: 0,
      clip: true,
    },
  },
  layout: {
    padding: 20,
  },
  cutout: '65%', // Made donut thinner
};

export function ExpenseStats() {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Expense Statistics</h2>
        <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white">
          <option>This Month</option>
          <option>Last Month</option>
          <option>Last 3 Months</option>
        </select>
      </div>
      
      <div className="flex flex-col items-center">
        {/* Chart Container with Total in Center */}
        <div className="relative w-full max-w-[280px] h-[280px] mb-8">
          <Pie data={data} options={options} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-sm text-gray-500">Total Spent</span>
            <span className="text-2xl font-semibold text-gray-900">$2,450</span>
          </div>
        </div>
      
        {/* Updated Legend Layout */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-4 w-full">
          {expenses.map((expense, index) => (
            <div key={index} className="flex items-center gap-3">
              <div 
                className="w-3 h-3 rounded-full shrink-0" 
                style={{ backgroundColor: expense.color }}
              />
              <div className="flex items-baseline justify-between w-full">
                <span className="text-sm text-gray-600 truncate">
                  {expense.category}
                </span>
                <span className="text-sm font-medium text-gray-900">
                  {expense.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}