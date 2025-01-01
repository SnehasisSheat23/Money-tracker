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
  margins: { top: 20, right: 30, left: 0, bottom: 5 },
  barMaxSize: 28,
  barGap: 8,
  barCategoryGap: '30%',
  animationDuration: 1000,
  colors: {
    deposit: {
      start: 'rgba(59, 130, 246, 0.7)', // blue-500
      end: 'rgba(37, 99, 235, 0.9)'     // blue-600
    },
    withdraw: {
      start: 'rgba(16, 185, 129, 0.7)',  // emerald-500
      end: 'rgba(5, 150, 105, 0.9)'      // emerald-600
    }
  },
  yAxisTicks: [0, 100, 200, 300, 400, 500, 600]
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
    <div className="bg-white shadow-lg rounded-xl p-4 border border-gray-100">
      <p className="font-medium text-gray-900 mb-3">{label}</p>
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-8">
          <span className="text-sm text-gray-600">Deposit</span>
          <span className="text-sm font-medium text-blue-600">
            ${payload[0]?.value}
          </span>
        </div>
        <div className="flex items-center justify-between gap-8">
          <span className="text-sm text-gray-600">Withdraw</span>
          <span className="text-sm font-medium text-emerald-600">
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
        rx={6}
        ry={6}
        className="transition-opacity duration-200"
        opacity={0.85}
        onMouseEnter={(e: any) => {
          e.target.style.opacity = 1;
        }}
        onMouseLeave={(e: any) => {
          e.target.style.opacity = 0.85;
        }}
      />
    </g>
  );
};

export function WeeklyActivity() {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      {/* Header with Legend */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-gray-800">Weekly Activity</h2>
          <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white">
            <option>This Week</option>
            <option>Last Week</option>
            <option>Last 2 Weeks</option>
          </select>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-sm text-gray-600">Deposit</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-sm text-gray-600">Withdraw</span>
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div className="relative h-[300px] sm:h-[350px]">
        {/* Fixed Y-Axis */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-white z-10">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={WEEKLY_DATA} margin={CHART_CONFIG.margins}>
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ 
                  fill: '#64748b',  // slate-500
                  fontSize: 12,
                  fontFamily: 'Inter'
                }}
                tickFormatter={(value) => `$${value}`}
                width={60}
                ticks={CHART_CONFIG.yAxisTicks}
                domain={[0, 600]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Scrollable Chart Area */}
        <div className="absolute left-16 right-0 top-0 bottom-0 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
          <div className="h-full min-w-[600px] sm:min-w-[800px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={WEEKLY_DATA}
                margin={CHART_CONFIG.margins}
                barGap={CHART_CONFIG.barGap}
                barCategoryGap={CHART_CONFIG.barCategoryGap}
              >
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  vertical={false} 
                  stroke="#e2e8f0" // slate-200
                />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ 
                    fill: '#64748b',  // slate-500
                    fontSize: 12,
                    fontFamily: 'Inter'
                  }}
                  padding={{ left: 10, right: 10 }}
                />
                <Tooltip 
                  content={<CustomTooltip />}
                  cursor={{ fill: 'rgba(241, 245, 249, 0.5)' }} // slate-100
                />
                
                <Bar
                  dataKey="deposit"
                  fill="url(#depositGradient)"
                  shape={<CustomBar />}
                  maxBarSize={CHART_CONFIG.barMaxSize}
                  radius={[4, 4, 0, 0]}
                  animationDuration={CHART_CONFIG.animationDuration}
                  animationEasing="ease-out"
                />
                <Bar
                  dataKey="withdraw"
                  fill="url(#withdrawGradient)"
                  shape={<CustomBar />}
                  maxBarSize={CHART_CONFIG.barMaxSize}
                  radius={[4, 4, 0, 0]}
                  animationDuration={CHART_CONFIG.animationDuration}
                  animationEasing="ease-out"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

