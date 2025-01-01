import React from 'react';

// Types
interface Point {
  x: number;
  y: number;
}

// Constants
const MONTHS = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'];
const BALANCE_DATA = [200, 300, 450, 800, 300, 400, 600];
const GRADIENT_COLORS = {
  start: 'rgb(37, 99, 235)',
  startOpacity: '0.2',
  endOpacity: '0',
};

/**
 * Converts balance data into SVG coordinate points
 * @param data Array of balance values
 * @returns Array of coordinate points
 */
const calculateDataPoints = (data: number[]): Point[] => {
  const maxValue = Math.max(...data);
  return data.map((value, index) => ({
    x: index * (100 / (data.length - 1)),
    y: 100 - (value / maxValue) * 100
  }));
};

/**
 * BalanceHistory Component
 * Displays a line graph showing balance history over time
 */
export function BalanceHistory() {
  const points = calculateDataPoints(BALANCE_DATA);
  const path = `M ${points.map(p => `${p.x},${p.y}`).join(' L')}`;

  return (
    <div className="bg-white p-6 rounded-xl">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Balance History</h2>
      
      <div className="relative h-64">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={GRADIENT_COLORS.start} stopOpacity={GRADIENT_COLORS.startOpacity} />
              <stop offset="100%" stopColor={GRADIENT_COLORS.start} stopOpacity={GRADIENT_COLORS.endOpacity} />
            </linearGradient>
          </defs>
          
          {/* Area fill */}
          <path
            d={`${path} L 100,100 L 0,100 Z`}
            fill="url(#gradient)"
          />
          
          {/* Line graph */}
          <path
            d={path}
            fill="none"
            stroke={GRADIENT_COLORS.start}
            strokeWidth="0.5"
          />
          
          {/* Data points */}
          {points.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="0.7"
              fill={GRADIENT_COLORS.start}
            />
          ))}
        </svg>
        
        {/* Month labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between">
          {MONTHS.map((month, index) => (
            <span key={index} className="text-sm text-gray-500">
              {month}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}