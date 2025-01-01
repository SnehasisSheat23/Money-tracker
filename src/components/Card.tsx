import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Wallet, PiggyBank } from 'lucide-react';

interface BalanceCardProps {
  type: 'balance';
  amount: string;
  title: string;
  variant: 'green' | 'blue' | 'red';
  onClick?: () => void;
}

interface BankCardProps {
  type: 'bank';
  bankName: string;
  accountType: 'savings' | 'checking' | 'credit';
  balance: string;
  variant: 'pastel-blue' | 'pastel-green' | 'pastel-purple';
  onClick?: () => void;
}

type CardProps = BalanceCardProps | BankCardProps;

const variantStyles = {
  green: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  blue: 'bg-blue-50 text-blue-600 border-blue-100',
  red: 'bg-red-50 text-red-600 border-red-100',
  'pastel-blue': 'bg-sky-50 text-sky-600 border-sky-100',
  'pastel-green': 'bg-emerald-50 text-emerald-600 border-emerald-100',
  'pastel-purple': 'bg-purple-50 text-purple-600 border-purple-100',
};

const accountTypeIcons = {
  savings: PiggyBank,
  checking: Wallet,
  credit: CreditCard
};

export function Card(props: CardProps) {
  if (props.type === 'balance') {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={`rounded-xl p-5 border shadow-sm ${variantStyles[props.variant]} 
          transition-all duration-300`}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className={`p-2 rounded-lg bg-white/80`}>
            <Wallet className="w-5 h-5" />
          </div>
          <p className="text-sm font-medium">{props.title}</p>
        </div>
        <h3 className="text-2xl font-semibold text-gray-900">${props.amount}</h3>
      </motion.div>
    );
  }

  const Icon = accountTypeIcons[props.accountType || 'checking'];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={props.onClick}
      className={`relative rounded-xl p-5 border shadow-sm ${variantStyles[props.variant]} 
        cursor-pointer transition-all duration-300 hover:shadow-md h-[160px]`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-white/80`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-base font-semibold text-gray-900">{props.bankName}</p>
              <p className="text-xs text-gray-500 mt-0.5">
                {props.accountType?.charAt(0).toUpperCase() + props.accountType?.slice(1)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-auto">
          <div className="flex items-end justify-between">
            <p className="text-sm text-gray-500">Current Balance</p>
            <p className="text-xl font-semibold text-gray-900">${props.balance}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}