import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/customer/Home';
import './styles/Website.css'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter >
  );
};

export default App;