import React from 'react';

interface LinkProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;  // Add onClick prop
}

export function Link({ icon, label, active, onClick }: LinkProps) {
  return (
    <button
      onClick={onClick}  // Add onClick handler
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
        ${active ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'}`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );
}