//Balance history chart color 
export const TREND_COLORS = {
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
} as const;


export const categoryColors: Record<string, { bg: string, text: string }> = {
  red: { bg: 'bg-red-50', text: 'text-red-400' },
  green: { bg: 'bg-green-50', text: 'text-green-400' },
  blue: { bg: 'bg-blue-50', text: 'text-blue-400' },
  orange: { bg: 'bg-orange-50', text: 'text-orange-400' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-400' },
  yellow: { bg: 'bg-yellow-50', text: 'text-yellow-600' },
  pink: { bg: 'bg-pink-50', text: 'text-pink-400' },
  indigo: { bg: 'bg-indigo-50', text: 'text-indigo-400' },
  teal: { bg: 'bg-teal-50', text: 'text-teal-400' },
  cyan: { bg: 'bg-cyan-50', text: 'text-cyan-400' },
  slate: { bg: 'bg-slate-50', text: 'text-slate-400' },
  zinc: { bg: 'bg-zinc-50', text: 'text-zinc-400' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-400' },
  lime: { bg: 'bg-lime-50', text: 'text-lime-400' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-400' },
  sky: { bg: 'bg-sky-50', text: 'text-sky-400' },
  violet: { bg: 'bg-violet-50', text: 'text-violet-400' },
  fuchsia: { bg: 'bg-fuchsia-50', text: 'text-fuchsia-400' },
  rose: { bg: 'bg-rose-50', text: 'text-rose-400' },
} as const;


//pie chart color 
export const piecharttheme = [
  { 
    category: 'Housing and Utilities',
    gradient: {
      start: 'rgba(59, 130, 246, 0.9)',  // blue-600
      end: 'rgba(96, 165, 250, 0.9)'     // blue-500
    }
  },
  { 
    category: 'Food and Groceries',
    gradient: {
      start: 'rgba(34, 197, 94, 0.9)',   // green-600
      end: 'rgba(74, 222, 128, 0.9)'     // green-500
    }
  },
  { 
    category: 'Transportation',
    gradient: {
      start: 'rgba(239, 68, 68, 0.9)',   // red-600
      end: 'rgba(248, 113, 113, 0.9)'    // red-500
    }
  },
  { 
    category: 'Health and Fitness',
    gradient: {
      start: 'rgba(20, 184, 166, 0.9)',  // teal-600
      end: 'rgba(45, 212, 191, 0.9)'     // teal-500
    }
  },
  { 
    category: 'Debt Payments',
    gradient: {
      start: 'rgba(147, 51, 234, 0.9)',  // purple-600
      end: 'rgba(168, 85, 247, 0.9)'     // purple-500
    }
  },
  { 
    category: 'Savings and Investments',
    gradient: {
      start: 'rgba(16, 185, 129, 0.9)',  // emerald-600
      end: 'rgba(52, 211, 153, 0.9)'     // emerald-500
    }
  },
  { 
    category: 'Personal Care',
    gradient: {
      start: 'rgba(236, 72, 153, 0.9)',  // pink-600
      end: 'rgba(244, 114, 182, 0.9)'    // pink-500
    }
  },
  { 
    category: 'Education and Learning',
    gradient: {
      start: 'rgba(79, 70, 229, 0.9)',   // indigo-600
      end: 'rgba(129, 140, 248, 0.9)'    // indigo-500
    }
  },
  { 
    category: 'Entertainment and Leisure',
    gradient: {
      start: 'rgba(249, 115, 22, 0.9)',  // orange-600
      end: 'rgba(251, 146, 60, 0.9)'     // orange-500
    }
  },
  { 
    category: 'Children and Family',
    gradient: {
      start: 'rgba(14, 165, 233, 0.9)',  // sky-600
      end: 'rgba(56, 189, 248, 0.9)'     // sky-500
    }
  },
  { 
    category: 'Insurance',
    gradient: {
      start: 'rgba(124, 58, 237, 0.9)',  // violet-600
      end: 'rgba(167, 139, 250, 0.9)'    // violet-500
    }
  },
  { 
    category: 'Gifts and Donations',
    gradient: {
      start: 'rgba(225, 29, 72, 0.9)',   // rose-600
      end: 'rgba(251, 113, 133, 0.9)'    // rose-500
    }
  },
  { 
    category: 'Travel',
    gradient: {
      start: 'rgba(217, 119, 6, 0.9)',   // amber-600
      end: 'rgba(245, 158, 11, 0.9)'     // amber-500
    }
  },
  { 
    category: 'Miscellaneous',
    gradient: {
      start: 'rgba(71, 85, 105, 0.9)',   // slate-600
      end: 'rgba(100, 116, 139, 0.9)'    // slate-500
    }
  }
];
