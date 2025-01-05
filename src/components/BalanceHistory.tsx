import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LoadingAnimation } from './ui/LoadingAnimation';

// Types
interface Point {
  x: number;
  y: number;
}

// Constants
const MONTHS = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'];
const BALANCE_DATA = [200, 300, 450, 700, 300, 400, 100];

const TREND_COLORS = {
  up: {
    stroke: 'rgb(37, 99, 235)', // blue
    gradient: {
      start: 'rgb(37, 99, 235)',
      startOpacity: '0.2',
      endOpacity: '0',
    }
  },
  down: {
    stroke: 'rgb(239, 68, 68)', // red
    gradient: {
      start: 'rgb(239, 68, 68)',
      startOpacity: '0.2',
      endOpacity: '0',
    }
  }
};

// Helper functions
const calculateTrend = (data: number[]): 'up' | 'down' => {
  const firstHalf = data.slice(0, Math.floor(data.length / 2));
  const secondHalf = data.slice(Math.floor(data.length / 2));
  const firstHalfAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
  const secondHalfAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
  return secondHalfAvg >= firstHalfAvg ? 'up' : 'down';
};

const calculateDataPoints = (data: number[]): Point[] => {
  const maxValue = Math.max(...data);
  return data.map((value, index) => ({
    x: index * (100 / (data.length - 1)),
    y: 100 - (value / maxValue) * 100
  }));
};

export function BalanceHistory() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const points = calculateDataPoints(BALANCE_DATA);
  const trend = calculateTrend(BALANCE_DATA);
  const colors = TREND_COLORS[trend];
  const path = `M ${points.map(p => `${p.x},${p.y}`).join(' L')}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-xl"
    >
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Balance History</h2>
      
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <div className="relative h-64">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={colors.gradient.start} stopOpacity={colors.gradient.startOpacity} />
                <stop offset="100%" stopColor={colors.gradient.start} stopOpacity={colors.gradient.endOpacity} />
              </linearGradient>
            </defs>
            
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              d={`${path} L 100,100 L 0,100 Z`}
              fill="url(#gradient)"
            />
            
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              d={path}
              fill="none"
              stroke={colors.stroke}
              strokeWidth="0.5"
            />
            
            {points.map((point, index) => (
              <motion.circle
                key={index}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                cx={point.x}
                cy={point.y}
                r="0.7"
                fill={colors.stroke}
              />
            ))}
          </svg>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute bottom-0 left-0 right-0 flex justify-between"
          >
            {MONTHS.map((month, index) => (
              <span key={index} className="text-sm text-gray-500">
                {month}
              </span>
            ))}
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}