import React, { useRef, useEffect, useState } from 'react';

interface SelectProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  onBlur: () => void;
  className?: string;
  isOpen: boolean;
  onOpen: () => void;
  isEditing?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  value,
  options,
  onChange,
  onBlur,
  className,
  isOpen,
  onOpen,
  isEditing
}) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isOpen && selectRef.current) {
      selectRef.current.focus();
    }
  }, [isOpen]);

  if (!isEditing) {
    return (
      <div 
        onClick={onOpen}
        className={`cursor-text px-4 py-2.5 rounded-sm ${className}`}
      >
        {value || 'Select category'}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <div
        onClick={onOpen}
        className={`px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-sm cursor-pointer ${className}`}
      >
        {value || 'Select category'}
      </div>
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg animate-fade-slide-down">
          <div className="max-h-60 overflow-auto">
            {options.map((option) => (
              <div
                key={option}
                onClick={() => {
                  onChange(option);
                  onBlur();
                }}
                className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm"
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};