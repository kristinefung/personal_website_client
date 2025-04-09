import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';

import SuccessSnackbar from './components/admin_portal/_form_element/Snackbar';

import Home from './pages/customer_portal/Home/Home';
import Login from './pages/admin_portal/Login';
import Dashboard from './pages/admin_portal/Dashboard';
import Profile from './pages/admin_portal/Profile';

import Layout from './components/admin_portal/navigation/Layout';

import adminTheme from 'src/theme';
import './App.css';

const App: React.FC = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem('token') || false
  );

  const setAuth = (value: boolean) => {
    setIsAuthenticated(value);
  };

  return (
    <>
      <ThemeProvider theme={adminTheme}>
        <SuccessSnackbar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={!isAuthenticated ? <Login setAuth={setAuth} /> : <Navigate to="/dashboard" replace />} />
            <Route path='/dashboard' element={
              isAuthenticated ?
                <Layout setAuth={setAuth} />
                :
                < Navigate to="/login" replace />
            } >
              <Route path='profile' element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter >
      </ThemeProvider>
    </>
  );
};

export default App;