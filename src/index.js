import  './index.css';  // Optional: add your global CSS here
import React from 'react';
import ReactDOM from 'react-dom/client';  // Import createRoot from react-dom/client
import './index.css';  // Optional: add your global CSS here
import App from './App';

// Create the root and render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
