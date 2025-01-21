// External dependencies
import React from 'react';
import { AddButton } from '../ui/addbutton';

// Component props interface
interface AddCardProps {
  onClick: () => void;
}

/**
 * AddCard Component
 * 
 * A button component that displays an "Add New Account" card with animation effects.
 * Uses Framer Motion for hover and tap animations.
 * 
 * @param {AddCardProps} props - Component props
 * @param {() => void} props.onClick - Click handler function
 */
export function AddCard({ onClick }: AddCardProps) {
  return (
    <AddButton 
      onClick={onClick}
      text="Add Account"
    />
  );
}
