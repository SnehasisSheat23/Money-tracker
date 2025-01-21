import React from 'react';
import { Wallet, TrendingUp, TrendingDown, CircleDollarSign } from 'lucide-react';
import { Card, CardHeader } from './../Subscription/ui/card';
import { cn } from './../Subscription/lib/utils';
import { moneySign } from '../../utils/formatters';
interface BalanceCardProps {
  amount: string;
  title: string;
  variant: 'green' | 'blue' | 'red';
}

const variantStyles = {
  green: {
    icon: '[&_svg]:text-emerald-500 [&_.icon-bg]:bg-emerald-50/50',
    gradient: 'bg-gradient-to-r from-emerald-50/15 via-emerald-50/20 to-emerald-50/35',
    textGradient: 'bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-500'
  },
  blue: {
    icon: '[&_svg]:text-blue-500 [&_.icon-bg]:bg-blue-50/50',
    gradient: 'bg-gradient-to-r from-blue-50/5 via-blue-50/10 to-blue-50/15',
    textGradient: 'bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500'
  },
  red: {
    icon: '[&_svg]:text-rose-500 [&_.icon-bg]:bg-rose-50/50',
    gradient: 'bg-gradient-to-r from-rose-50/5 via-rose-50/10 to-rose-50/15',
    textGradient: 'bg-gradient-to-r from-rose-700 via-rose-600 to-rose-500'
  }
};

const getIcon = (variant: BalanceCardProps['variant']) => {
  switch (variant) {
    case 'green':
      return <CircleDollarSign className="w-4 h-4" />;
    case 'red':
      return <TrendingDown className="w-4 h-4" />;
    case 'blue':
      return <TrendingUp className="w-4 h-4" />;
  }
};

export function BalanceCard({ amount, title, variant }: BalanceCardProps) {
  return (
    <Card className={cn(
      "border-none backdrop-blur-sm",
      "transition-all duration-200 hover:bg-white/80",
      "h-[90px] md:h-[100px]",
      variantStyles[variant].icon,
      variantStyles[variant].gradient
    )}>
      <CardHeader className="p-4 flex-row items-center justify-between space-y-0">
        <div className="space-y-1.5">
          <p className="text-[13px] font-medium text-gray-500/90">{title}</p>
          <h2 className={cn(
            "text-xl md:text-2xl font-semibold tracking-tight",
            "bg-clip-text text-transparent",
            variantStyles[variant].textGradient
          )}>
            {moneySign(amount)}
          </h2>
        </div>
        <div className="icon-bg p-2 rounded-lg transition-colors">
          {getIcon(variant)}
        </div>
      </CardHeader>
    </Card>
  );
}
