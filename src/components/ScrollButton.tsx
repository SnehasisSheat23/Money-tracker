import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ScrollButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
  className?: string;
}

export function ScrollButton({ direction, onClick, className }: ScrollButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-white 
        shadow-md hover:bg-gray-50 transition-all duration-200 absolute top-1/2 -translate-y-1/2
        ${direction === 'left' ? '-left-4' : '-right-4'} ${className}`}
      aria-label={`Scroll ${direction}`}
    >
      {direction === 'left' ? (
        <ChevronLeft className="w-5 h-5 text-gray-600" />
      ) : (
        <ChevronRight className="w-5 h-5 text-gray-600" />
      )}
    </button>
  );
}
