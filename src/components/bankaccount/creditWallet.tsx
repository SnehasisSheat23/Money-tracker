import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Wallet, CircleDot } from 'lucide-react';

interface CreditWalletProps {
  name: string;
  type: 'credit' | 'wallet';
  balance: number;
  limit?: number;
  variant: 'pastel-blue' | 'pastel-green' | 'pastel-purple';
  onClick?: () => void;
}

const variantStyles = {
  'pastel-blue': {
    gradient: 'from-blue-500/5 to-blue-500/10',
    border: 'border-blue-200/50',
    glow: 'shadow-[0_4px_20px_-4px_rgba(59,130,246,0.1)]',
    accent: 'bg-blue-500',
    progress: 'bg-blue-500'
  },
  'pastel-green': {
    gradient: 'from-emerald-500/5 to-emerald-500/10',
    border: 'border-emerald-200/50',
    glow: 'shadow-[0_4px_20px_-4px_rgba(16,185,129,0.1)]',
    accent: 'bg-emerald-500',
    progress: 'bg-emerald-500'
  },
  'pastel-purple': {
    gradient: 'from-purple-500/5 to-purple-500/10',
    border: 'border-purple-200/50',
    glow: 'shadow-[0_4px_20px_-4px_rgba(168,85,247,0.1)]',
    accent: 'bg-purple-500',
    progress: 'bg-purple-500'
  }
};

const LimitProgressBar = ({ current, limit, variant }: { current: number, limit: number, variant: string }) => {
  const percentage = Math.min((current / limit) * 100, 100);
  const styles = variantStyles[variant as keyof typeof variantStyles];

  return (
    <div className="w-full mt-2">
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>Limit Usage</span>
        <span>${current}/${limit}</span>
      </div>
      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5 }}
          className={`h-full ${styles.progress} rounded-full`}
        />
      </div>
    </div>
  );
};

export function CreditWallet({ name, type, balance, limit, variant, onClick }: CreditWalletProps) {
  const styles = variantStyles[variant];
  const Icon = type === 'credit' ? CreditCard : Wallet;
  const texture = type === 'credit' 
    ? 'bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))]' 
    : 'bg-[linear-gradient(45deg,_var(--tw-gradient-stops))]';

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative h-[160px] rounded-2xl p-5 cursor-pointer
        border ${styles.border} backdrop-blur-sm
        ${texture} ${styles.gradient}
        transition-all duration-300 overflow-hidden group ${styles.glow}`}
    >
      {/* Card Content */}
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-xl 
              bg-gradient-to-br from-white/80 to-white/40
              flex items-center justify-center border ${styles.border}`}>
              <Icon className="w-4 h-4 text-gray-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">{name}</p>
              <div className="flex items-center gap-1.5">
                <CircleDot className="w-3 h-3 text-green-500" />
                <span className="text-xs text-gray-500 capitalize">{type}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto">
          <p className="text-xs font-medium text-gray-500">Available Balance</p>
          <p className="text-2xl font-semibold tracking-tight mt-0.5">
            ${balance.toLocaleString()}
          </p>
          
          {type === 'credit' && limit && (
            <LimitProgressBar current={balance} limit={limit} variant={variant} />
          )}
        </div>
      </div>
    </motion.div>
  );
}
