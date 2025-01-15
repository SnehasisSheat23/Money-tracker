import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { piecharttheme } from '../data/utils/colors';
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);
const expenses = [
  {  percentage: 35 },
  {  percentage: 25 },
  {  percentage: 20 },
  {  percentage: 10 },
  {  percentage: 10 },
];


// Create gradient fills for the chart
const createGradient = (ctx: CanvasRenderingContext2D, start: string, end: string) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, start);
  gradient.addColorStop(1, end);
  return gradient;
};

const data = {
  labels: piecharttheme.map(piecharttheme => piecharttheme.category),
  datasets: [{
    data: expenses.map(expense => expense.percentage),
    backgroundColor: (context: any) => {
      if (!context.chart.chartArea) return;
      const ctx = context.chart.ctx;
      return piecharttheme.map(piecharttheme => 
        createGradient(ctx, piecharttheme.gradient.start, piecharttheme.gradient.end)
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
        size: 12,
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
      top: 5,
      bottom: 5,
      left: 5,
      right: 5
    }
  },
  animation: {
    animateRotate: true,
    animateScale: true,
    duration: 800,
    easing: 'easeOutQuart',
  },
  cutout: '65%',
};

export function ExpenseStats() {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm h-full flex flex-col">
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
        <div className="relative w-full aspect-square max-h-[240px] mb-4">
          <Pie data={data} options={options} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xs sm:text-sm text-gray-500 mb-1">Total Spent</span>
            <span className="text-xl sm:text-2xl font-semibold text-gray-900">$2,450</span>
          </div>
        </div>
      
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full">
          {expenses.map((expense, index) => (
            <div 
              key={index} 
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div 
                className="w-2 h-2 rounded-lg shrink-0" 
                style={{ backgroundColor: piecharttheme[index].gradient.start }}
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-gray-600 truncate">
                  {piecharttheme[index].category}
                </p>
                <p className="text-xs sm:text-sm font-semibold text-gray-900">
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