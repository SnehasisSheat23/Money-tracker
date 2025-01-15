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
  'pastel-blue': 'bg-gradient-to-br from-[#4475F2] via-[#4CA7F8] to-[#67B3F9]',
  'pastel-green': 'bg-gradient-to-br from-[#3ECF7A] via-[#41D6AA] to-[#47E4C3]',
  'pastel-purple': 'bg-gradient-to-br from-[#9182F2] via-[#A385F0] to-[#B590EF]',
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
        duration: 0.3
      }}
      onClick={onClick}
      className={`relative rounded-2xl p-5 sm:p-6 ${variantStyles[variant]} 
        cursor-pointer transition-all duration-300 hover:shadow-2xl h-[180px] sm:h-[220px] 
        min-w-[280px] overflow-hidden backdrop-blur-xl`}
    >
      {/* Decorative patterns */}
      <div className="absolute inset-0 w-full h-full opacity-50">
        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/10 blur-xl" />
        <div className="absolute -left-4 -bottom-4 w-32 h-32 rounded-full bg-black/10 blur-xl" />
      </div>

      <div className="flex flex-col h-full text-white relative z-10">
        {/* Bank logo and type */}
        <div className="flex items-center justify-between">
          <div className="bg-white/20 backdrop-blur-md rounded-xl p-2">
            <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <div className="w-12 h-8 sm:w-14 sm:h-10">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-yellow-300/90 rounded-md" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 20% 50%)' }}>
                <div className="absolute inset-1 border border-yellow-600/30 rounded-sm" />
              </div>
            </div>
          </div>
        </div>

        {/* Bank name and account type */}
        <div className="mt-4 sm:mt-6">
          <p className="text-lg sm:text-xl font-bold tracking-wide">{bankName}</p>
          <p className="text-sm text-white/80 mt-0.5 tracking-wide font-medium">
            {accountType?.charAt(0).toUpperCase() + accountType?.slice(1)}
          </p>
        </div>
        
        {/* Balance */}
        <div className="mt-auto">
          <p className="text-sm text-white/80 mb-1 font-medium">Available Balance</p>
          <p className="text-2xl sm:text-3xl font-bold tracking-tight">
            ${balance}
          </p>
        </div>
      </div>
    </motion.div>
  );
}