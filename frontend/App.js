import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';  // Import Navbar component
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import AdminDashboard from './components/AdminDashboard'; // Admin Dashboard
import Login from './components/Login'; // Login page for users

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Add Navbar component here */}
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Route */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
