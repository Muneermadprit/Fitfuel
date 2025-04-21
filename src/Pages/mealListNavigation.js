import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, User, LogOut, Search, ShoppingBag } from "lucide-react";
import logo from '../images/logo1.png';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileVisible, setIsProfileVisible] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const userType = sessionStorage.getItem('userType');
    setIsProfileVisible(!!userType);
    setIsLoggedIn(!!userType);
  }, []);

  // Add scroll effect to navigation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.account-dropdown')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  // Close mobile menu when navigation link is clicked
  const handleMobileNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      isScrolled ? 'bg-green-600 backdrop-blur-md shadow-lg' : 'bg-green-50'
    }`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center py-2 sm:py-4">
          {/* Logo - Responsive sizing */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center no-underline">
              <img 
                src={logo} 
                alt="DailyFit Logo" 
                className="h-10 sm:h-12 md:h-16 w-auto transition-transform hover:scale-105" 
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink href="/" label="Home" isScrolled={isScrolled} />
          
            <NavLink href="/about" label="About" isScrolled={isScrolled} />
            <NavLink href="/contact" label="Contact" isScrolled={isScrolled} />
            {isProfileVisible && (
              <NavLink href="/profile" label="Profile" isScrolled={isScrolled} />
            )}
          </nav>

          {/* Actions Group */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search Button */}
            <button className={`p-1 sm:p-2 rounded-full transition-colors ${
              isScrolled ? 'text-white hover:bg-green-500' : 'text-green-700 hover:bg-green-100'
            }`}>
              <Search size={18} className="sm:h-5 sm:w-5" />
            </button>
            
            {/* Cart Button */}
            <a href="/cart" className={`relative p-1 sm:p-2 rounded-full transition-colors no-underline ${
              isScrolled ? 'text-white hover:bg-green-500' : 'text-green-700 hover:bg-green-100'
            }`}>
              <ShoppingBag size={18} className="sm:h-5 sm:w-5" />
              <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                2
              </span>
            </a>

            {/* Account Menu */}
            {!isLoggedIn ? (
              <a 
                href="/login" 
                className="hidden xs:inline-flex items-center px-2 sm:px-4 py-1.5 sm:py-2 border border-transparent font-medium rounded-full text-white bg-gradient-to-r from-green-600 to-green-500 shadow-sm hover:shadow-md hover:from-green-700 hover:to-green-600 transition-all no-underline text-xs sm:text-sm"
              >
                Login
              </a>
            ) : (
              <div className="relative account-dropdown">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`flex items-center space-x-1 sm:space-x-2 rounded-full pl-1 sm:pl-2 pr-2 sm:pr-4 py-1.5 transition-all ${
                    isScrolled 
                      ? 'border border-green-100 bg-green-500 hover:bg-green-400 text-white' 
                      : 'border border-green-200 hover:border-green-300 bg-green-100/70 hover:bg-green-100 text-green-800'
                  }`}
                >
                  <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center text-white shadow-inner">
                    <User size={12} className="sm:h-4 sm:w-4" />
                  </div>
                  <span className="hidden xs:inline text-xs sm:text-sm font-medium">Account</span>
                  <ChevronDown size={12} className={`transition-transform duration-200 sm:h-4 sm:w-4 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Account Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 sm:w-48 origin-top-right rounded-xl bg-white shadow-xl ring-1 ring-green-100 focus:outline-none z-50">
                    <div className="py-1">
                      <a 
                        href="/profile" 
                        className="group flex items-center px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-green-50 no-underline"
                      >
                        <User className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                        My Profile
                      </a>
                      <a 
                        href="/orders" 
                        className="group flex items-center px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-green-50 no-underline"
                      >
                        <ShoppingBag className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                        My Orders
                      </a>
                      <div className="border-t border-gray-100 my-1"></div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center px-3 sm:px-4 py-2 text-xs sm:text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mobile menu button */}
            <button
              className={`md:hidden rounded-md p-1 sm:p-2 transition-colors ${
                isScrolled ? 'text-white hover:bg-green-500' : 'text-green-700 hover:bg-green-100'
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} className="sm:h-6 sm:w-6" /> : <Menu size={20} className="sm:h-6 sm:w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-green-100 shadow-lg">
          <div className="space-y-1 px-4 pt-2 pb-4">
            <MobileNavLink href="/" label="Home" onClick={handleMobileNavClick} />
            <MobileNavLink href="/meal-plans" label="Meal Plans" onClick={handleMobileNavClick} />
            <MobileNavLink href="/about" label="About" onClick={handleMobileNavClick} />
            <MobileNavLink href="/contact" label="Contact" onClick={handleMobileNavClick} />
            {isProfileVisible && (
              <MobileNavLink href="/profile" label="Profile" onClick={handleMobileNavClick} />
            )}
            
            {!isLoggedIn && (
              <div className="pt-4">
                <a 
                  href="/login" 
                  className="block w-full text-center font-medium rounded-lg bg-gradient-to-r from-green-600 to-green-500 px-4 py-2.5 text-white shadow-md no-underline text-sm"
                  onClick={handleMobileNavClick}
                >
                  Login
                </a>
              </div>
            )}
            
            {isLoggedIn && (
              <div className="pt-4">
                <button
                  onClick={() => {
                    handleLogout();
                    handleMobileNavClick();
                  }}
                  className="flex w-full items-center rounded-lg px-4 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

// Desktop Navigation Link Component - Explicitly no underlines  
const NavLink = ({ href, label, isScrolled }) => (
  <a 
    href={href} 
    className={`px-2 lg:px-4 py-2 text-sm lg:text-base font-medium transition-colors no-underline decoration-0 ${
      isScrolled ? 'text-white hover:text-green-100' : 'text-green-800 hover:text-green-600'
    }`}
  >
    {label}
  </a>
);

// Mobile Navigation Link Component - Explicitly no underlines
const MobileNavLink = ({ href, label, onClick }) => (
  <a 
    href={href} 
    className="block rounded-lg px-4 py-2.5 text-sm font-medium text-green-800 hover:bg-green-50 hover:text-green-600 no-underline decoration-0"
    onClick={onClick}
  >
    {label}
  </a>
);

// Add this to your global CSS file or style tag to ensure no links have underlines
const GlobalStyle = () => (
  <style jsx global>{`
    a {
      text-decoration: none !important;
    }
    a:hover {
      text-decoration: none !important;
    }
    
    /* Custom breakpoint for extra small devices */
    @media (max-width: 475px) {
      .xs\\:inline-flex {
        display: none;
      }
      .xs\\:inline {
        display: none;
      }
    }
    
    @media (min-width: 476px) {
      .xs\\:inline-flex {
        display: inline-flex;
      }
      .xs\\:inline {
        display: inline;
      }
    }
  `}</style>
);

const NavigationWithNoUnderlines = () => (
  <>
    <GlobalStyle />
    <Navigation />
  </>
);

export default NavigationWithNoUnderlines;