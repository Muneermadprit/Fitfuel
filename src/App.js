import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import PortfolioPage from './Pages/Home';
import ChatbotIcon from './Pages/Menuicon';
import Auth from './Pages/Auth';
import Authlogin from './Authlogin';
import OrderRedirection from './Pages/orderRedirection';
import Register from './Pages/Register';
import MealPlanShop from './Pages/ProductMealsListPage';
import AboutUs from './Pages/AboutUS';
import CartPage from './Pages/CartPage';
import ProductDetailPage from './Pages/ProductDetailPage';
import ProfilePage from './Pages/ProfilePage';
import ProductSummary from './Pages/ProductSummary';
import AdminDashboardPage from './AdminPages/AdminDashboardPage';
import AdminLogin from './AdminPages/AdminLoginPage'
import axios from 'axios';
const App = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.dailyfit.ae/api/user/get-token",{withCredentials:true});
        const data = await response.json();
        console.log('API Response:', data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <ChatbotIcon />

      <Routes>
        <Route path="/" element={<PortfolioPage />} />
        <Route path="/Order" element={<Authlogin />} />
        <Route path="/OrderRedirection" element={<OrderRedirection />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/checkout" element={<MealPlanShop />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/select-plan" element={<ProductDetailPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/summary" element={<ProductSummary />} />
        <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* <Route path="  "element={<ProductListPage />} /> */}
      </Routes>
    </div>
  );
};

export default App;
