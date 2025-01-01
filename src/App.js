import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PortfolioPage from './Pages/Home';


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PortfolioPage />} />
 
      </Routes>
    </div>
  );
};

export default App;
