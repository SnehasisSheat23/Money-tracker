import React from 'react';
import { moneySign } from '../../utils/formatters';

interface ChartTooltipProps {
  active?: boolean;
  title?: string;
  items: {
    label: string;
    value: number | string;
    color?: string;
  }[];
  total?: {
    label: string;
    value: number | string;
  };
}

export const ChartTooltip: React.FC<ChartTooltipProps> = ({
  active,
  title,
  items,
  total
}) => {
  if (!active) return null;

  return (
    <div className="backdrop-blur-md bg-white/95 shadow-lg rounded-lg p-4 border border-slate-100 min-w-[200px]">
      {title && (
        <p className="font-medium text-slate-700 mb-3 text-sm">{title}</p>
      )}
      <div className="space-y-2.5">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between gap-8">
            <span className="text-xs font-medium text-slate-600 flex items-center gap-2">
              {item.color && (
                <span 
                  className="w-2 h-2 rounded-full inline-block"
                  style={{ backgroundColor: item.color }}
                />
              )}
              {item.label}
            </span>
            <span className="text-xs font-semibold text-slate-800">
              {typeof item.value === 'number' ? moneySign(item.value) : item.value}
            </span>
          </div>
        ))}
        {total && (
          <div className="pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between gap-8">
              <span className="text-xs font-medium text-slate-700">{total.label}</span>
              <span className="text-xs font-semibold text-slate-900">
                {typeof total.value === 'number' ? moneySign(total.value) : total.value}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
