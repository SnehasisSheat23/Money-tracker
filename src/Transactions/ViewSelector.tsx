import React from 'react';
import { ViewMode } from '../data/types/expense';
import * as Tabs from '@radix-ui/react-tabs';
import { clsx } from 'clsx';

interface ViewSelectorProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

export const ViewSelector: React.FC<ViewSelectorProps> = ({ currentView, onViewChange }) => {
  const views: ViewMode[] = ['Daily', 'Monthly', 'Calendar', 'Yearly'];

  return (
    <Tabs.Root value={currentView} onValueChange={(value) => onViewChange(value as ViewMode)}>
      <Tabs.List className="flex space-x-2 mb-6">
        {views.map((view) => (
          <Tabs.Trigger
            key={view}
            value={view}
            className={clsx(
              'px-4 py-2 text-sm rounded-md transition-colors',
              'hover:bg-gray-100',
              currentView === view 
                ? 'bg-gray-100 text-gray-900 font-medium' 
                : 'text-gray-600'
            )}
          >
            {view}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
    </Tabs.Root>
  );
};