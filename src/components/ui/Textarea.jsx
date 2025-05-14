import React, { forwardRef } from 'react';
import './Textarea.css';

export const Textarea = forwardRef(({ value, onChange, disabled, placeholder }, ref) => {
  return (
    <textarea
      className="custom-textarea"
      ref={ref}
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
    />
  );
});
