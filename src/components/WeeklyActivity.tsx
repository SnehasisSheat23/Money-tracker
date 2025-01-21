import '../styles/global.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Rectangle } from 'recharts';
import { moneySign } from '../utils/formatters';
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

const WEEKLY_DATA: WeeklyData[] = [
  { day: 'Mon', deposit: 320, withdraw: 260, total: 580 },
  { day: 'Tue', deposit: 480, withdraw: 360, total: 840 },
  { day: 'Wed', deposit: 160, withdraw: 240, total: 400 },
  { day: 'Thu', deposit: 350, withdraw: 240, total: 590 },
  { day: 'Fri', deposit: 380, withdraw: 320, total: 700 },
  { day: 'Sat', deposit: 450, withdraw: 250, total: 700 },
  { day: 'Sun', deposit: 350, withdraw: 120, total: 470 }
];

const CHART_CONFIG = {
  margins: { top: 20, right: 15, left: 0, bottom: 5 },
  barMaxSize: 28,
  barGap: 4,
  barCategoryGap: '28%',
  animationDuration: 1000,
  colors: {
    deposit: {
      start: '#0066FF', 
      end: '#0052CC'   
    },
    withdraw: {
      start: 'rgba(156, 175, 201, 0.95)', 
      end: 'rgba(166, 184, 207, 0.85)'    
    }
  },
  gridColor: 'rgba(226, 232, 240, 0.6)' 
};

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (!active || !payload?.length) return null;
  
  return (
    <div className="backdrop-blur-md bg-white/95 shadow-lg rounded-lg p-4 border border-slate-100">
      <p className="font-medium text-slate-700 mb-3 text-sm">{label}</p>
      <div className="space-y-2.5">
        <div className="flex items-center justify-between gap-8">
          <span className="text-xs font-medium text-slate-600">Inflow</span>
          <span className="text-xs font-semibold text-slate-800">
            {moneySign(payload[0]?.value.toLocaleString())}
          </span>
        </div>
        <div className="flex items-center justify-between gap-8">
          <span className="text-xs font-medium text-slate-600">Outflow</span>
          <span className="text-xs font-semibold text-slate-800">
            {moneySign(payload[1]?.value.toLocaleString())}
          </span>
        </div>
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between gap-8">
            <span className="text-xs font-medium text-slate-700">Net Flow</span>
            <span className="text-xs font-semibold text-slate-900">
              {moneySign((payload[0]?.value - payload[1]?.value).toLocaleString())}
            </span>
          </div>
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
        rx={3}
        ry={3}
        className="transition-all duration-300 ease-out"
        opacity={0.95}
        onMouseEnter={(e: any) => {
          e.target.style.opacity = 1;
          e.target.style.transform = `translate(${x} ${y-2}) scale(1, ${height/y})`;
        }}
        onMouseLeave={(e: any) => {
          e.target.style.opacity = 0.95;
          e.target.style.transform = 'scale(1, 1)';
        }}
      />
    </g>
  );
};

export function WeeklyActivity() {
  return (
    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm">
      <div className="flex flex-col gap-5 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Cash Flow Analysis</h2>
            <p className="text-xs text-slate-500 mt-1">Weekly transaction overview</p>
          </div>
          <select className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 bg-white focus:ring-2 focus:ring-slate-500/20 focus:border-slate-500 outline-none">
            <option>Current Week</option>
            <option>Previous Week</option>
            <option>Last 14 Days</option>
          </select>
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#0066FF]" />
            <span className="text-xs font-medium text-slate-600">Cash Inflow</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-slate-400" />
            <span className="text-xs font-medium text-slate-600">Cash Outflow</span>
          </div>
        </div>
      </div>

      <div className="h-[300px] w-full">
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
              stroke={CHART_CONFIG.gridColor}
            />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ 
                fill: '#475569',
                fontSize: 12,
                fontWeight: 500
              }}
              dy={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ 
                fill: '#475569',
                fontSize: 12,
                fontWeight: 500
              }}
              tickFormatter={(value) => `${moneySign(value)}`}
              width={50}
            />
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{ fill: 'rgba(241, 245, 249, 0.8)' }}
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

