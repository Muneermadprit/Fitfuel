import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PortfolioPage from './Pages/Home';
import ChatbotIcon from './Pages/Menuicon';
import Auth from './Pages/Auth';


const App = () => {
  return (
    <div>
      <ChatbotIcon/>
      <Auth/>
      <Routes>
        <Route path="/" element={<PortfolioPage />} />
 
      </Routes>
    </div>
  );
};

export default App;
