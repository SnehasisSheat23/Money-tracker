import React, { useEffect, useState } from 'react';
import { Category } from '../data/types/expense';
import { iconMap } from '../data/utils/icons';

interface CategorySelectorProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  const handleScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    const container = event.currentTarget;
    container.scrollLeft += event.deltaY;
    event.preventDefault();
  };

  return (
    <div className="bg-white w-full">
      <div 
        className="flex overflow-x-auto hide-scrollbar py-3 px-4 gap-2 max-w-full"
        onWheel={handleScroll}
        style={{ 
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <button
          className={`flex-shrink-0 px-4 py-2 rounded-full border transition-all
            ${selectedCategory === null 
              ? 'bg-blue-500 text-white border-blue-500' 
              : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
          onClick={() => onSelectCategory(null)}
        >
          All
        </button>
        
        {categories.map((category) => {
          const Icon = iconMap[category.icon];
          const isSelected = category.id === selectedCategory;
          
          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all flex-shrink-0
                ${isSelected 
                  ? 'bg-blue-500 text-white border-blue-500' 
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
            >
              {Icon && <Icon className={`text-base ${isSelected ? 'text-white' : 'text-gray-500'}`} />}
              <span>{category.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
