import React from 'react';
import '../styles/global.css';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Rectangle
} from 'recharts';

// Types
interface WeeklyData {
  day: string;
  deposit: number;
  withdraw: number;
  total: number;
}

interface TooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

// Constants
const CHART_CONFIG = {
  margins: { top: 10, right: 10, left: 0, bottom: 5 },
  barMaxSize: 32,
  barGap: 4,
  barCategoryGap: '35%',
  animationDuration: 800,
  colors: {
    deposit: {
      start: 'rgba(79, 70, 229, 0.9)', // indigo-600
      end: 'rgba(99, 102, 241, 0.7)'   // indigo-500
    },
    withdraw: {
      start: 'rgba(236, 72, 153, 0.9)', // pink-600
      end: 'rgba(244, 114, 182, 0.7)'   // pink-500
    }
  },
  yAxisTicks: [0, 200, 400, 600]
};

const WEEKLY_DATA: WeeklyData[] = [
  { day: 'Mon', deposit: 320, withdraw: 260, total: 580 },
  { day: 'Tue', deposit: 480, withdraw: 360, total: 840 },
  { day: 'Wed', deposit: 160, withdraw: 240, total: 400 },
  { day: 'Thu', deposit: 350, withdraw: 240, total: 590 },
  { day: 'Fri', deposit: 380, withdraw: 320, total: 700 },
  { day: 'Sat', deposit: 450, withdraw: 250, total: 700 },
  { day: 'Sun', deposit: 350, withdraw: 120, total: 470 }
];

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (!active || !payload?.length) return null;
  
  return (
    <div className="backdrop-blur-sm bg-white/90 shadow-lg rounded-lg p-3 border border-gray-100">
      <p className="font-medium text-gray-800 mb-2 text-sm">{label}</p>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-6">
          <span className="text-xs font-medium text-indigo-600">Deposit</span>
          <span className="text-xs font-semibold text-gray-700">
            ${payload[0]?.value}
          </span>
        </div>
        <div className="flex items-center justify-between gap-6">
          <span className="text-xs font-medium text-pink-600">Withdraw</span>
          <span className="text-xs font-semibold text-gray-700">
            ${payload[1]?.value}
          </span>
        </div>
      </div>
    </div>
  );
};

const CustomBar = (props: any) => {
  const { fill, x, y, width, height } = props;
  return (
    <g>
      <defs>
        <linearGradient id="depositGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={CHART_CONFIG.colors.deposit.start} />
          <stop offset="100%" stopColor={CHART_CONFIG.colors.deposit.end} />
        </linearGradient>
        <linearGradient id="withdrawGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={CHART_CONFIG.colors.withdraw.start} />
          <stop offset="100%" stopColor={CHART_CONFIG.colors.withdraw.end} />
        </linearGradient>
      </defs>
      <Rectangle
        {...props}
        fill={fill}
        rx={4}
        ry={4}
        className="transition-all duration-300 ease-in-out"
        opacity={0.9}
        onMouseEnter={(e: any) => {
          e.target.style.opacity = 1;
          e.target.style.transform = 'scale(1.02)';
        }}
        onMouseLeave={(e: any) => {
          e.target.style.opacity = 0.9;
          e.target.style.transform = 'scale(1)';
        }}
      />
    </g>
  );
};

export function WeeklyActivity() {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex flex-col gap-4 mb-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h2 className="text-lg font-semibold text-gray-800">Weekly Activity</h2>
          <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none">
            <option>This Week</option>
            <option>Last Week</option>
            <option>Last 2 Weeks</option>
          </select>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
            <span className="text-xs text-gray-600">Deposit</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-pink-500" />
            <span className="text-xs text-gray-600">Withdraw</span>
          </div>
        </div>
      </div>

      <div className="h-[280px] sm:h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={WEEKLY_DATA}
            margin={CHART_CONFIG.margins}
            barGap={CHART_CONFIG.barGap}
            barCategoryGap={CHART_CONFIG.barCategoryGap}
          >
            <CartesianGrid 
              strokeDasharray="4 4" 
              vertical={false} 
              stroke="#f1f5f9"
            />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ 
                fill: '#64748b',
                fontSize: 11,
                fontFamily: 'Inter'
              }}
              dy={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ 
                fill: '#64748b',
                fontSize: 11,
                fontFamily: 'Inter'
              }}
              tickFormatter={(value) => `$${value}`}
              width={45}
              ticks={CHART_CONFIG.yAxisTicks}
            />
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{ fill: 'rgba(244, 244, 245, 0.7)' }}
            />
            <Bar
              dataKey="deposit"
              fill="url(#depositGradient)"
              shape={<CustomBar />}
              maxBarSize={CHART_CONFIG.barMaxSize}
              animationDuration={CHART_CONFIG.animationDuration}
              animationBegin={0}
            />
            <Bar
              dataKey="withdraw"
              fill="url(#withdrawGradient)"
              shape={<CustomBar />}
              maxBarSize={CHART_CONFIG.barMaxSize}
              animationDuration={CHART_CONFIG.animationDuration}
              animationBegin={200}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

