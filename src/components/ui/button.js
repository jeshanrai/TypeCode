import React from 'react';

export const Button = ({ onClick, children, variant = 'solid' }) => {
  const baseClass = "px-4 py-2 rounded-lg font-semibold cursor-pointer transition";
  const classNames = variant === 'outline'
    ? `${baseClass} border-2 border-gray-700 text-gray-700 hover:bg-gray-200`
    : `${baseClass} bg-blue-500 text-white hover:bg-blue-600`;

  return (
    <button className={classNames} onClick={onClick}>
      {children}
    </button>
  );
};
