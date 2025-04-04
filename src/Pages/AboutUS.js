import React from 'react';
import { useState, useEffect } from "react";
import logo from '../images/logo.png';
import { Award, Globe, Heart, ShoppingCart } from 'lucide-react';

const AboutUs = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check login status based on session/local storage
    const userType = sessionStorage.getItem('userType');
    setIsLoggedIn(!!userType);
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    setIsLoggedIn(false);
    window.location.href = "/"; // Redirect to home after logout
  };


  return (
    <>
      <nav className="bg-gradient-to-r from-green-600 to-lime-600 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <a href="/" className="flex items-center">
                <img src={logo} alt="DailyFit Logo" className="h-16 w-32 object-contain" />
              </a>
            </div>
            <div className="hidden md:flex space-x-6">
              <a href="/" className="text-white no-underline hover:text-green-200 transition duration-200">Home</a>
              <a href="/about" className="text-white no-underline hover:text-green-200 transition duration-200">About</a>
              <a href="/contact" className="text-white no-underline hover:text-green-200 transition duration-200">Contact</a>
            </div>
            <div className="flex items-center space-x-4">
              {!isLoggedIn ? (
                <a href="/Order" className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold no-underline hover:bg-green-100 transition duration-200">Login</a>
              ) : (
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition duration-200">
                  Logout
                </button>
              )}
              <button className="md:hidden text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* <nav className="bg-gradient-to-r from-green-600 to-lime-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <img src={logo} alt="DailyFit Logo" className="h-16 w-32 object-contain" />
            </a>
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="/" className="text-white no-underline hover:text-green-200 transition duration-200">Home</a>
            <a href="/about" className="text-white no-underline hover:text-green-200 transition duration-200">About</a>
            <a href="/contact" className="text-white no-underline hover:text-green-200 transition duration-200">Contact</a>
          </div>
          <div className="flex items-center space-x-4">
            <a href="/Order" className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold no-underline hover:bg-green-100 transition duration-200">Login</a>
            <button className="md:hidden text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav> */}
      <div className="bg-gradient-to-br from-green-50 to-green-100 min-h-screen w-full py-12 px-4 md:px-20 flex items-center justify-center">
        <div className="max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden transform transition-all hover:scale-[1.01]">
          <div className="p-8 text-center">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 mb-6">
              Discover Our Story
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-5 max-w-3xl mx-auto">
              Welcome to ShopNest, where innovation meets convenience. We're not just an online marketplace;
              we're a digital platform that transforms the way you shop, connecting you with curated products
              from around the globe.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-50 p-5 rounded-xl shadow-md hover:shadow-lg transition-all">
                <Globe className="mx-auto text-green-600 mb-4" size={48} />
                <h3 className="text-xl font-bold text-gray-800 mb-2">Global Reach</h3>
                <p className="text-gray-600">
                  Bringing together unique products from artisans and brands worldwide,
                  we offer a shopping experience that knows no boundaries.
                </p>
              </div>
              <div className="bg-emerald-50 p-5 rounded-xl shadow-md hover:shadow-lg transition-all">
                <ShoppingCart className="mx-auto text-green-600 mb-4" size={48} />
                <h3 className="text-xl font-bold text-gray-800 mb-2">Seamless Shopping</h3>
                <p className="text-gray-600">
                  Our intuitive platform ensures a smooth, enjoyable shopping journey
                  with personalized recommendations and effortless navigation.
                </p>
              </div>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Founded in 2020, we've grown from a small startup to a trusted online destination,
              serving thousands of customers who value quality, innovation, and exceptional service.
            </p>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-6">Our Core Values</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="flex flex-col items-center">
                <Heart className="text-white mb-3" size={36} />
                <span className="text-white font-semibold">Customer Love</span>
              </div>
              <div className="flex flex-col items-center">
                <Award className="text-white mb-3" size={36} />
                <span className="text-white font-semibold">Quality First</span>
              </div>
              <div className="flex flex-col items-center">
                <Globe className="text-white mb-3" size={36} />
                <span className="text-white font-semibold">Global Vision</span>
              </div>
              <div className="flex flex-col items-center">
                <ShoppingCart className="text-white mb-3" size={36} />
                <span className="text-white font-semibold">Innovation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
