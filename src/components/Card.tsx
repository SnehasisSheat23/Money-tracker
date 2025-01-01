import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Wallet, PiggyBank } from 'lucide-react';

interface BankCardProps {
  bankName: string;
  accountType: 'savings' | 'checking' | 'credit';
  balance: string;
  variant: 'pastel-blue' | 'pastel-green' | 'pastel-purple';
  onClick?: () => void;
}

const variantStyles = {
  'pastel-blue': 'bg-sky-50 text-sky-600 border-sky-100',
  'pastel-green': 'bg-emerald-50 text-emerald-600 border-emerald-100',
  'pastel-purple': 'bg-purple-50 text-purple-600 border-purple-100',
};

const accountTypeIcons = {
  savings: PiggyBank,
  checking: Wallet,
  credit: CreditCard
};

export function Card({ bankName, accountType, balance, variant, onClick }: BankCardProps) {
  const Icon = accountTypeIcons[accountType || 'checking'];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative rounded-xl p-3 sm:p-5 border shadow-sm ${variantStyles[variant]} 
        cursor-pointer transition-all duration-300 hover:shadow-md h-[120px] sm:h-[160px] min-w-[130px]`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 sm:gap-3">
            <div className={`p-1 sm:p-2 rounded-lg bg-white/80`}>
              <Icon className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
            </div>
            <div>
              <p className="text-xs sm:text-base font-semibold text-gray-900">{bankName}</p>
              <p className="text-[9px] sm:text-xs text-gray-500 mt-0.5">
                {accountType?.charAt(0).toUpperCase() + accountType?.slice(1)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-auto">
          <div className="flex items-end justify-between">
            <p className="text-[10px] sm:text-sm text-gray-500">Current Balance</p>
            <p className="text-sm sm:text-xl font-semibold text-gray-900">${balance}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}