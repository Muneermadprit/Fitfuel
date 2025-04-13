import React from 'react';
import { FaHome, FaInfoCircle, FaEnvelope, FaUserCircle } from 'react-icons/fa';

const NavigationBar = () => {
  // Function to toggle mobile menu
  const toggleMobileMenu = () => {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
      mobileMenu.classList.toggle('hidden');
    }
  };

  return (
    <div className="px-4 py-2">
      <nav className=" text-white  sticky top-0 z-50 rounded-xl p-3">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            {/* Logo Area */}
       
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <a href="/" className="text-white text-xl no-underline group relative overflow-hidden py-2 px-4">
                <span className="flex items-center space-x-2 relative z-10">
                  <FaHome className="text-white" />
                  <span className="font-semibold tracking-wide">Home</span>
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-1 bg-green-200 group-hover:w-full transition-all duration-300"></span>
              </a>
              
              <a href="/about" className="text-white text-xl no-underline group relative overflow-hidden py-2 px-4">
                <span className="flex items-center space-x-2 relative z-10">
                  <FaInfoCircle className="text-white" />
                  <span className="font-semibold tracking-wide">About</span>
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-1 bg-green-200 group-hover:w-full transition-all duration-300"></span>
              </a>
              
              <a href="/contact" className="text-white text-xl no-underline group relative overflow-hidden py-2 px-4">
                <span className="flex items-center space-x-2 relative z-10">
                  <FaEnvelope className="text-white" />
                  <span className="font-semibold tracking-wide">Contact</span>
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-1 bg-green-200 group-hover:w-full transition-all duration-300"></span>
              </a>
            </div>
            
            {/* User and Mobile Menu */}
            <div className="flex items-center space-x-4">
              <a href="/Order" className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold no-underline hover:bg-green-100 transition duration-200 flex items-center space-x-2 shadow-lg transform hover:scale-105">
                <FaUserCircle size={24} />
                <span className="hidden lg:inline">Account</span>
              </a>
              
              <button 
                onClick={toggleMobileMenu}
                className="md:hidden text-white bg-green-500 p-2 rounded-lg hover:bg-green-400 transition duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu - Hidden by default */}
      <div id="mobile-menu" className="hidden bg-green-600 text-white rounded-b-xl md:hidden shadow-xl">
        <div className="container mx-auto py-3 px-4">
          <div className="flex flex-col space-y-4">
            <a href="/" className="text-white text-xl no-underline py-2 px-3 rounded-lg hover:bg-green-500 transition duration-200 flex items-center space-x-3">
              <FaHome />
              <span>Home</span>
            </a>
            <a href="/about" className="text-white text-xl no-underline py-2 px-3 rounded-lg hover:bg-green-500 transition duration-200 flex items-center space-x-3">
              <FaInfoCircle />
              <span>About</span>
            </a>
            <a href="/contact" className="text-white text-xl no-underline py-2 px-3 rounded-lg hover:bg-green-500 transition duration-200 flex items-center space-x-3">
              <FaEnvelope />
              <span>Contact</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;