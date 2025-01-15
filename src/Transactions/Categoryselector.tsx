import React, { memo, useCallback } from 'react';
import { Category } from '../data/types/expense';
import { iconMap } from '../data/utils/icons';

const BASE_BUTTON_CLASSES = "flex-shrink-0 px-4 py-2 rounded-full border transition-all";
const SELECTED_CLASSES = "bg-blue-500 text-white border-blue-500";
const UNSELECTED_CLASSES = "bg-white text-gray-600 border-gray-200 hover:bg-gray-50";

const AllCategoryButton = memo(({ isSelected, onClick }: { isSelected: boolean, onClick: () => void }) => (
  <button
    className={`${BASE_BUTTON_CLASSES} ${isSelected ? SELECTED_CLASSES : UNSELECTED_CLASSES}`}
    onClick={onClick}
  >
    All
  </button>
));

const CategoryButton = memo(({ category, isSelected, onClick }: {
  category: Category,
  isSelected: boolean,
  onClick: () => void
}) => {
  const Icon = iconMap[category.icon];
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 ${BASE_BUTTON_CLASSES} ${isSelected ? SELECTED_CLASSES : UNSELECTED_CLASSES}`}
    >
      {Icon && <Icon className={`text-base ${isSelected ? 'text-white' : 'text-gray-500'}`} />}
      <span>{category.name}</span>
    </button>
  );
});

export const CategorySelector: React.FC<CategorySelectorProps> = memo(({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  const handleScroll = useCallback((event: React.WheelEvent<HTMLDivElement>) => {
    const container = event.currentTarget;
    container.scrollLeft += event.deltaY;
    event.preventDefault();
  }, []);

  return (
    <div className="bg-white w-full">
      <div 
        className="flex overflow-x-auto hide-scrollbar py-3 px-4 gap-2 max-w-full"
        onWheel={handleScroll}
        style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
      >
        <AllCategoryButton
          isSelected={selectedCategory === null}
          onClick={() => onSelectCategory(null)}
        />
        
        {categories.map((category) => (
          <CategoryButton
            key={category.id}
            category={category}
            isSelected={category.id === selectedCategory}
            onClick={() => onSelectCategory(category.id)}
          />
        ))}
      </div>
    </div>
  );
});
