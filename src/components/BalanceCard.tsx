import React from 'react';
import { motion } from 'framer-motion';
import { Wallet } from 'lucide-react';

interface BalanceCardProps {
  amount: string;
  title: string;
  variant: 'green' | 'blue' | 'red';
}

const variantStyles = {
  green: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  blue: 'bg-blue-50 text-blue-600 border-blue-100',
  red: 'bg-red-50 text-red-600 border-red-100',
};

export function BalanceCard({ amount, title, variant }: BalanceCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`rounded-xl p-3 sm:p-5 border shadow-sm ${variantStyles[variant]} 
        transition-all duration-300 h-full min-w-[130px]`}
    >
      <div className="flex items-center gap-1.5 sm:gap-3 mb-1.5 sm:mb-3">
        <div className={`p-1 sm:p-2 rounded-lg bg-white/80`}>
          <Wallet className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
        </div>
        <p className="text-xs sm:text-sm font-medium">{title}</p>
      </div>
      <h2 className="text-lg sm:text-2xl font-medium text-gray-900">${amount}</h2>
    </motion.div>
  );
}
