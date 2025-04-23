import React, { useState, useEffect } from 'react';
import { TbHome } from "react-icons/tb";
import { RiInformation2Fill } from "react-icons/ri";
import { MdContactSupport } from "react-icons/md";
const NavigationBar = () => {
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const userType = sessionStorage.getItem('userType');
    setIsProfileVisible(!!userType);
    setIsLoggedIn(!!userType);
  }, []);

  // Function to toggle mobile menu using React state
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="px-4 py-2">
      <nav className="bg-transparent text-white sticky top-0 z-50 rounded-xl p-3">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            {/* Logo Area could go here */}

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <a href="/" className="text-white text-xl no-underline group relative overflow-hidden py-2 px-4">
                <span className="flex items-center space-x-2 relative z-10">
                  <TbHome />
                  <span className="font-semibold tracking-wide">Home</span>
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-1 bg-green-200 group-hover:w-full transition-all duration-300"></span>
              </a>

              <a href="/about" className="text-white text-xl no-underline group relative overflow-hidden py-2 px-4">
                <span className="flex items-center space-x-2 relative z-10">
                  <RiInformation2Fill />
                  <span className="font-semibold tracking-wide">About</span>
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-1 bg-green-200 group-hover:w-full transition-all duration-300"></span>
              </a>

              <a href="/contact" className="text-white text-xl no-underline group relative overflow-hidden py-2 px-4">
                <span className="flex items-center space-x-2 relative z-10">
                  <MdContactSupport />
                  <span className="font-semibold tracking-wide">Contact</span>
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-1 bg-green-200 group-hover:w-full transition-all duration-300"></span>
              </a>
            </div>

            {/* User and Mobile Menu */}
            <div className="flex items-center space-x-4">
              <a href={isLoggedIn ? "/profile" : "/Order"} className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold no-underline hover:bg-green-500 transition duration-200 flex items-center space-x-2 shadow-lg transform hover:scale-105">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <span className="hidden lg:inline">
                  {isLoggedIn ? "Profile" : "Account"}
                </span>
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

      {/* Mobile Menu - Controlled by React state */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} bg-green-600 text-white rounded-b-xl md:hidden shadow-xl absolute z-50`}>
        <div className="container mx-auto py-3 px-4">
          <div className="flex flex-col space-y-4">
            <a href="/" className="text-white text-xl no-underline py-2 px-3 rounded-lg hover:bg-green-500 transition duration-200 flex items-center space-x-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span>Home</span>
            </a>
            <a href="/about" className="text-white text-xl no-underline py-2 px-3 rounded-lg hover:bg-green-500 transition duration-200 flex items-center space-x-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span>About</span>
            </a>
            <a href="/contact" className="text-white text-xl no-underline py-2 px-3 rounded-lg hover:bg-green-500 transition duration-200 flex items-center space-x-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span>Contact</span>
            </a>

            {/* Adding User/Account link to mobile menu as well */}
            <a href={isLoggedIn ? "/profile" : "/Order"} className="text-white text-xl no-underline py-2 px-3 rounded-lg hover:bg-green-500 transition duration-200 flex items-center space-x-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              <span>{isLoggedIn ? "Profile" : "Account"}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;