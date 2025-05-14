import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-neutral-800 text-white px-6 py-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold text-yellow-400">TypeCode</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:text-yellow-400">Dashboard</Link>
        <Link to="/customize" className="hover:text-yellow-400">Customize</Link>
      </div>
    </nav>
  );
}
