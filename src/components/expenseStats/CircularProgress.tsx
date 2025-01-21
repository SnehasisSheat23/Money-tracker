import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChartTooltip } from './TooltipKit';

interface CircularProgressProps {
  percentage: number;
  color: string;
  index: number;
  category: string;
  amount: number;
  startAngle: number;
  size: number;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
  color,
  index,
  category,
  amount,
  startAngle,
  size = 200,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const center = size / 2;
  const radius = size * 0.35; // Slightly smaller for padding
  const strokeWidth = size * 0.12; // Thick stroke for pie segments
  
  // Calculate angles for pie segment
  const angleInDegrees = (percentage / 100) * 360;
  const endAngle = startAngle + angleInDegrees;
  
  // Convert to radians for calculation
  const startRad = (startAngle - 90) * (Math.PI / 180);
  const endRad = (endAngle - 90) * (Math.PI / 180);
  
  // Calculate path coordinates
  const x1 = center + radius * Math.cos(startRad);
  const y1 = center + radius * Math.sin(startRad);
  const x2 = center + radius * Math.cos(endRad);
  const y2 = center + radius * Math.sin(endRad);
  
  // Create pie segment path
  const largeArcFlag = angleInDegrees > 180 ? 1 : 0;
  const pathData = [
    `M ${center} ${center}`,
    `L ${x1} ${y1}`,
    `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
    'Z'
  ].join(' ');

  return (
    <motion.g
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      {/* Gradient definitions */}
      <defs>
        <linearGradient id={`pieGradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={`${color}dd`} />
        </linearGradient>
      </defs>

      {/* Pie segment */}
      <motion.path
        d={pathData}
        fill={`url(#pieGradient-${index})`}
        stroke="white"
        strokeWidth="1"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
        style={{
          filter: isHovered ? 'drop-shadow(0 0 8px rgba(0,0,0,0.15))' : 'none',
        }}
      />

      {/* Updated Tooltip */}
      {isHovered && (
        <foreignObject
          x={center - 100}
          y={center - 80}
          width="200"
          height="120"
          style={{ overflow: 'visible' }}
        >
          <ChartTooltip
            active={true}
            title={category}
            items={[
              { label: 'Amount', value: amount, color: color },
              { label: 'Percentage', value: `${percentage}%` }
            ]}
          />
        </foreignObject>
      )}
    </motion.g>
  );
};
