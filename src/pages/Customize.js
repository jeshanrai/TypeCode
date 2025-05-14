import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Customize() {
  const [customText, setCustomText] = useState('');
  const [customTime, setCustomTime] = useState(60);
  const navigate = useNavigate();

  const handleApply = () => {
    localStorage.setItem('customText', customText.trim());
    localStorage.setItem('customTime', customTime);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center px-6">
      <div className="max-w-2xl w-full bg-neutral-800 rounded-xl shadow-lg p-6 space-y-6">
        <h2 className="text-3xl font-bold text-yellow-400 text-center">Customize Your Test</h2>

        <div>
          <label className="block text-sm mb-1 text-neutral-300">Custom Text</label>
          <textarea
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            placeholder="Enter your own paragraph..."
            rows="5"
            className="w-full p-3 rounded bg-neutral-900 border border-neutral-700 focus:outline-none text-white"
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-neutral-300">Time Limit (in seconds)</label>
          <input
            type="number"
            value={customTime}
            onChange={(e) => setCustomTime(Number(e.target.value))}
            min="10"
            max="300"
            className="w-full p-3 rounded bg-neutral-900 border border-neutral-700 focus:outline-none text-white"
          />
        </div>

        <button
          onClick={handleApply}
          className="w-full bg-yellow-400 text-black font-semibold py-2 rounded hover:bg-yellow-300 transition"
        >
          Apply Settings & Start
        </button>
      </div>
    </div>
  );
}
