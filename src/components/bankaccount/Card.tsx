import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Wallet, PiggyBank, CircleDot,Nfc } from 'lucide-react';
import { moneySign } from '../../utils/formatters';
interface BankCardProps {
  bankName: string;
  accountType: 'savings' | 'checking' | 'credit';
  balance: string;
  variant: 'pastel-blue' | 'pastel-green' | 'pastel-purple';
  onClick?: () => void;
}

const variantStyles = {
  'pastel-blue': {
    gradient: 'from-blue-500/5 to-blue-500/10',
    border: 'border-blue-200/50',
    glow: 'shadow-[0_4px_20px_-4px_rgba(59,130,246,0.1)]',
    accent: 'bg-blue-500'
  },
  'pastel-green': {
    gradient: 'from-emerald-500/5 to-emerald-500/10',
    border: 'border-emerald-200/50',
    glow: 'shadow-[0_4px_20px_-4px_rgba(16,185,129,0.1)]',
    accent: 'bg-emerald-500'
  },
  'pastel-purple': {
    gradient: 'from-purple-500/5 to-purple-500/10',
    border: 'border-purple-200/50',
    glow: 'shadow-[0_4px_20px_-4px_rgba(168,85,247,0.1)]',
    accent: 'bg-purple-500'
  }
};

const accountTypeIcons = {
  savings: PiggyBank,
  checking: Wallet,
  credit: CreditCard
};

export function Card({ bankName, accountType, balance, variant, onClick }: BankCardProps) {
  const Icon = accountTypeIcons[accountType || 'checking'];
  const styles = variantStyles[variant];

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative h-[130px] sm:h-[160px] rounded-xl sm:rounded-2xl p-3 sm:p-5 cursor-pointer
        border ${styles.border} backdrop-blur-sm
        bg-gradient-to-br ${styles.gradient}
        transition-all duration-300 overflow-hidden group ${styles.glow}`}
    >
      {/* Modern Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent" />
      
      {/* Decorative Lines */}
      <div className="absolute -right-4 -top-4 w-24 h-24 blur-3xl opacity-20 rounded-full bg-current" />
      <div className="absolute right-0 bottom-0 w-32 h-32 opacity-[0.02]">
        <div className="absolute inset-0 rotate-12 scale-150">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-px w-full bg-current my-6" />
          ))}
        </div>
      </div>

      <div className="relative z-10 flex flex-col h-full justify-between">
        {/* Card Header */}
        <div className="space-y-2 sm:space-y-3">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl 
                bg-gradient-to-br from-white/80 to-white/40
                flex items-center justify-center border ${styles.border} shadow-sm`}>
                <Icon className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-600`} />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">{bankName}</p>
                <div className="flex items-center gap-1 sm:gap-1.5 mt-0.5">
                  <CircleDot className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-500" />
                  <span className="text-[10px] sm:text-xs text-gray-500 capitalize">{accountType}</span>
                </div>
              </div>
            </div>
            <Nfc className="w-10 h-10 sm:w-3 sm:h-3 text-yellow-500" />
          </div>
        </div>

        {/* Card Content & Footer */}
        <div className="space-y-2 sm:space-y-3">
          {/* Balance Display */}
          <div>
            
            <p className="text-lg sm:text-2xl font-semibold tracking-tight mt-2 pt-0 sm:pt-4">
              {moneySign(Number(balance).toLocaleString())}
            </p>
          </div>

          {/* Card Number Preview */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex gap-[1px] sm:gap-[2px]">
                  {[...Array(3)].map((_, j) => (
                    <span key={j} 
                      className={`w-0.5 h-0.5 rounded-full 
                        ${i === 3 ? 'bg-gray-400' : 'bg-gray-300'}`} 
                    />
                  ))}
                </div>
              ))}
            </div>
            
            <div className={`px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-[8px] sm:text-[10px] font-medium
              uppercase tracking-wider ${styles.gradient} border ${styles.border}`}>
              {accountType === 'credit' ? 'Credit' : 'Debit'}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}