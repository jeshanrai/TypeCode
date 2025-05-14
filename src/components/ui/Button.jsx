import React from 'react';
import './Button.css';

export const Button = ({ onClick, children }) => {
  return <button className="custom-button" onClick={onClick}>{children}</button>;
};

