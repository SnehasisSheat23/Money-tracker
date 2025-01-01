import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const expenses = [
  { 
    category: 'Entertainment',
    percentage: 30,
    gradient: {
      start: 'rgba(79, 70, 229, 0.9)',  // indigo-600
      end: 'rgba(99, 102, 241, 0.9)'    // indigo-500
    }
  },
  { 
    category: 'Bills',
    percentage: 15,
    gradient: {
      start: 'rgba(236, 72, 153, 0.9)',  // pink-600
      end: 'rgba(244, 114, 182, 0.9)'    // pink-500
    }
  },
  { 
    category: 'Investment',
    percentage: 20,
    gradient: {
      start: 'rgba(16, 185, 129, 0.9)',  // emerald-600
      end: 'rgba(34, 197, 94, 0.9)'      // emerald-500
    }
  },
  { 
    category: 'Others',
    percentage: 35,
    gradient: {
      start: 'rgba(124, 58, 237, 0.9)',  // violet-600
      end: 'rgba(139, 92, 246, 0.9)'     // violet-500
    }
  }
];

// Create gradient fills for the chart
const createGradient = (ctx: CanvasRenderingContext2D, start: string, end: string) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, start);
  gradient.addColorStop(1, end);
  return gradient;
};

const data = {
  labels: expenses.map(expense => expense.category),
  datasets: [{
    data: expenses.map(expense => expense.percentage),
    backgroundColor: (context: any) => {
      if (!context.chart.chartArea) return;
      const ctx = context.chart.ctx;
      return expenses.map(expense => 
        createGradient(ctx, expense.gradient.start, expense.gradient.end)
      );
    },
    borderWidth: 2,
    borderColor: '#ffffff',
    hoverBorderWidth: 0,
    hoverOffset: 15,
  }],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      enabled: true,
      position: 'nearest',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      titleColor: '#1f2937',
      bodyColor: '#4b5563',
      borderColor: '#e5e7eb',
      borderWidth: 1,
      padding: {
        x: 12,
        y: 8
      },
      cornerRadius: 8,
      displayColors: true,
      boxWidth: 8,
      boxHeight: 8,
      boxPadding: 4,
      titleFont: {
        size: 13,
        weight: '600',
        family: "'Inter', sans-serif"
      },
      bodyFont: {
        size: 12,
        family: "'Inter', sans-serif"
      },
      callbacks: {
        label: (context: any) => {
          const value = context.raw;
          const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
          const percentage = Math.round((value / total) * 100);
          return `${context.label}: ${percentage}% ($${value * 24.5})`; // Assuming $2,450 total
        }
      }
    },
    legend: {
      display: false,
    },
    datalabels: {
      color: '#ffffff',
      formatter: (value: number) => {
        return value > 10 ? `${value}%` : '';
      },
      font: {
        weight: '600',
        size: 13,
        family: "'Inter', sans-serif"
      },
      padding: 6,
      anchor: 'center',
      align: 'center',
      offset: 0,
      clip: true,
    },
  },
  layout: {
    padding: {
      top: 10,
      bottom: 10,
      left: 10,
      right: 10
    }
  },
  animation: {
    animateRotate: true,
    animateScale: true,
    duration: 800,
    easing: 'easeOutQuart',
  },
  cutout: '70%',
};

export function ExpenseStats() {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Expense Statistics</h2>
        <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none">
          <option>This Month</option>
          <option>Last Month</option>
          <option>Last 3 Months</option>
        </select>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="relative w-full max-w-[300px] h-[300px] lg:max-w-[270px] lg:h-[270px] mb-6">
          <Pie data={data} options={options} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-sm text-gray-500 mb-1">Total Spent</span>
            <span className="text-2xl font-semibold text-gray-900">$2,450</span>
          </div>
        </div>
      
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
          {expenses.map((expense, index) => (
            <div 
              key={index} 
              className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div 
                className="w-2.5 h-2.5 rounded-full shrink-0" 
                style={{ backgroundColor: expense.gradient.start }}
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-gray-600 truncate">
                  {expense.category}
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  {expense.percentage}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}