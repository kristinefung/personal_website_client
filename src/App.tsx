import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from './pages/customer_portal/Home/Home';
import Login from './pages/admin_portal/Login/Login';
import Dashboard from './pages/admin_portal/Dashboard/Dashboard';

import './App.css';

const App: React.FC = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem('token') || false
  );

  const setAuth = (value: boolean) => {
    setIsAuthenticated(value);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={!isAuthenticated ? <Login setAuth={setAuth} /> : <Navigate to="/dashboard" replace />} />
        <Route path='/dashboard' element={isAuthenticated ? <Dashboard setAuth={setAuth} /> : <Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter >
  );
};

export default App;