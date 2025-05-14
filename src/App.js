import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TypingDashboard from './pages/TypingDashboard';
import Customize from './pages/Customize';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<TypingDashboard />} />
        <Route path="/customize" element={<Customize />} />
      </Routes>
    </Router>
  );
}

export default App;
