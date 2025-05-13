import React from 'react';

export const Input = React.forwardRef(({ value, onChange, disabled, placeholder, className }, ref) => {
  return (
    <input
      ref={ref}
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
      className={`border-2 border-gray-300 rounded-lg p-3 ${className}`}
    />
  );
});

Input.displayName = 'Input';
