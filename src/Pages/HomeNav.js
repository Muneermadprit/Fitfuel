import { useState, useEffect } from 'react';
import { Menu, X, Search, ShoppingBag, User, Heart, Bell, Activity } from 'lucide-react';

export default function EnhancedNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top bar with secondary info */}
      <div className="hidden md:block bg-green-800 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Activity size={14} className="mr-1" />
              <span>Live Fitness Tracking</span>
            </span>
            <span>|</span>
            <span>Free shipping on orders $50+</span>
          </div>
          <div className="flex items-center space-x-6">
            <a href="/track-order" className="hover:text-green-200 transition duration-200">Track Order</a>
            <a href="/help" className="hover:text-green-200 transition duration-200">Help Center</a>
            <div className="flex items-center space-x-2">
              <a href="#" className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition duration-200">
                <span className="text-xs">FB</span>
              </a>
              <a href="#" className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition duration-200">
                <span className="text-xs">IG</span>
              </a>
              <a href="#" className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition duration-200">
                <span className="text-xs">YT</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gradient-to-r from-green-700 to-lime-600 shadow-xl py-2' : 
        'bg-gradient-to-r from-green-600 to-lime-500 py-4'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo Section */}
            <div className="flex items-center">
              <a 
                href="/" 
                className="flex items-center"
                onMouseEnter={() => setIsLogoHovered(true)}
                onMouseLeave={() => setIsLogoHovered(false)}
              >
                <div className={`relative h-16 w-16 md:h-20 md:w-20 transition-all duration-500 transform ${isLogoHovered ? 'scale-110 rotate-3' : ''}`}>
                  {/* Logo Container */}
                  <div className="absolute inset-0 bg-white rounded-full flex items-center justify-center overflow-hidden">
                    <div className="text-green-600 font-bold text-xl md:text-2xl">DF</div>
                  </div>
                  {/* Animated ring */}
                  <div className={`absolute inset-0 rounded-full border-2 border-white transition-all duration-500 ${
                    isLogoHovered ? 'scale-125 opacity-0' : 'scale-100 opacity-100'
                  }`}></div>
                </div>
                <div className="ml-2">
                  <span className="text-white font-bold text-xl md:text-3xl transition-all duration-300 block">
                    DailyFit
                  </span>
                  <span className="text-white/80 text-xs md:text-sm">YOUR FITNESS JOURNEY</span>
                </div>
              </a>
            </div>
            
            {/* Desktop Navigation Links - NO TOGGLES HERE */}
            <div className="hidden md:flex space-x-1">
              <a 
                href="/"
                className="text-white font-medium relative group px-4 py-2 hover:bg-white/10 rounded-lg transition-all duration-200 flex items-center"
              >
                <span className="relative z-10">Home</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
              </a>
              
              {/* Programs - Desktop Hover Dropdown (not toggle) */}
              <div className="relative group">
                <a 
                  href="/programs"
                  className="text-white font-medium px-4 py-2 hover:bg-white/10 rounded-lg transition-all duration-200 flex items-center"
                >
                  <span>Programs</span>
                </a>
                {/* Hover dropdown instead of toggle */}
                <div className="absolute top-full left-0 bg-white shadow-xl rounded-lg min-w-48 transition-all duration-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transform translate-y-2 group-hover:translate-y-0">
                  <div className="py-2">
                    <a href="/programs/weight-loss" className="block px-4 py-2 text-green-700 hover:bg-green-50 transition duration-200">Weight Loss</a>
                    <a href="/programs/muscle-building" className="block px-4 py-2 text-green-700 hover:bg-green-50 transition duration-200">Muscle Building</a>
                    <a href="/programs/yoga" className="block px-4 py-2 text-green-700 hover:bg-green-50 transition duration-200">Yoga & Flexibility</a>
                    <a href="/programs/cardio" className="block px-4 py-2 text-green-700 hover:bg-green-50 transition duration-200">Cardio</a>
                  </div>
                </div>
              </div>
              
              {/* Meal Plans - Desktop Hover Dropdown */}
              <div className="relative group">
                <a 
                  href="/meal-plans"
                  className="text-white font-medium relative group px-4 py-2 hover:bg-white/10 rounded-lg transition-all duration-200 flex items-center"
                >
                  <span className="relative z-10">Meal Plans</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                </a>
                <div className="absolute top-full left-0 bg-white shadow-xl rounded-lg min-w-48 transition-all duration-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transform translate-y-2 group-hover:translate-y-0">
                  <div className="py-2">
                    <a href="/meal-plans/keto" className="block px-4 py-2 text-green-700 hover:bg-green-50 transition duration-200">Keto Diet</a>
                    <a href="/meal-plans/vegan" className="block px-4 py-2 text-green-700 hover:bg-green-50 transition duration-200">Vegan</a>
                    <a href="/meal-plans/balanced" className="block px-4 py-2 text-green-700 hover:bg-green-50 transition duration-200">Balanced</a>
                  </div>
                </div>
              </div>
              
              {/* Shop - Desktop Hover Dropdown */}
              <div className="relative group">
                <a 
                  href="/shop"
                  className="text-white font-medium relative group px-4 py-2 hover:bg-white/10 rounded-lg transition-all duration-200 flex items-center"
                >
                  <span className="relative z-10">Shop</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                </a>
                <div className="absolute top-full left-0 bg-white shadow-xl rounded-lg min-w-48 transition-all duration-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transform translate-y-2 group-hover:translate-y-0">
                  <div className="py-2">
                    <a href="/shop/equipment" className="block px-4 py-2 text-green-700 hover:bg-green-50 transition duration-200">Equipment</a>
                    <a href="/shop/supplements" className="block px-4 py-2 text-green-700 hover:bg-green-50 transition duration-200">Supplements</a>
                    <a href="/shop/apparel" className="block px-4 py-2 text-green-700 hover:bg-green-50 transition duration-200">Apparel</a>
                  </div>
                </div>
              </div>
              
              <a 
                href="/trainers"
                className="text-white font-medium relative group px-4 py-2 hover:bg-white/10 rounded-lg transition-all duration-200 flex items-center"
              >
                <span className="relative z-10">Trainers</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
              </a>
              
              <a 
                href="/about"
                className="text-white font-medium relative group px-4 py-2 hover:bg-white/10 rounded-lg transition-all duration-200 flex items-center"
              >
                <span className="relative z-10">About</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
              </a>
              
              <a 
                href="/contact"
                className="text-white font-medium relative group px-4 py-2 hover:bg-white/10 rounded-lg transition-all duration-200 flex items-center"
              >
                <span className="relative z-10">Contact</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
              </a>
            </div>
            
            {/* Desktop Icons */}
            <div className="hidden md:flex items-center space-x-3">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="bg-white/10 rounded-full px-4 py-1 text-white placeholder-white/70 text-sm border-none outline-none focus:bg-white/20 transition-all duration-200 w-32 focus:w-48"
                />
                <Search size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70" />
              </div>
              
              <a href="/favorites" className="text-white p-2 hover:bg-white/10 rounded-full transition duration-200 relative">
                <Heart size={20} />
                <span className="absolute top-0 right-0 bg-yellow-400 text-green-800 rounded-full text-xs w-4 h-4 flex items-center justify-center">2</span>
              </a>
              
              <a href="/cart" className="text-white p-2 hover:bg-white/10 rounded-full transition duration-200 relative">
                <ShoppingBag size={20} />
                <span className="absolute top-0 right-0 bg-yellow-400 text-green-800 rounded-full text-xs w-4 h-4 flex items-center justify-center">3</span>
              </a>
              
              <div className="h-6 w-px bg-white/30 mx-1"></div>
              
              <a 
                href="/Order" 
                className="flex items-center space-x-2 bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-green-100 transition duration-200 transform hover:scale-105"
              >
                <User size={18} />
                <span>Account</span>
              </a>
              
              <a 
                href="/signup" 
                className="bg-yellow-400 text-green-800 px-4 py-2 rounded-lg font-medium hover:bg-yellow-300 transition duration-200 transform hover:scale-105"
              >
                Get Started
              </a>
            </div>
            
            {/* Mobile Menu Icon - Toggle only for mobile */}
            <div className="md:hidden flex items-center space-x-3">
              <a href="/cart" className="text-white p-2 relative">
                <ShoppingBag size={20} />
                <span className="absolute top-0 right-0 bg-yellow-400 text-green-800 rounded-full text-xs w-4 h-4 flex items-center justify-center">3</span>
              </a>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white p-2"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={40} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu Dropdown - Only for mobile */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden  absolute ${
  isMenuOpen ? 'max-h-screen opacity-100 border-t border-white/20 mt-2' : 'max-h-0 opacity-0'
}`}>

          <div className="container mx-auto px-4">
            <div className="py-2">
              <div className="flex items-center justify-between bg-white/10 rounded-lg p-3 mb-3">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="bg-transparent text-white placeholder-white/70 border-none outline-none w-full"
                />
                <Search size={18} className="text-white" />
              </div>
            </div>
            
            <div className="flex flex-col space-y-1 pb-4">
              <a href="/" className="text-white py-3 px-4 rounded-lg hover:bg-white/10 transition duration-200 flex items-center justify-between">
                <span>Home</span>
                <span className="bg-yellow-400 text-green-800 text-xs px-2 py-0.5 rounded-full">New</span>
              </a>
              
              <details className="group">
                <summary className="text-white py-3 px-4 rounded-lg hover:bg-white/10 transition duration-200 flex items-center justify-between cursor-pointer list-none">
                  <span>Programs</span>
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="pl-4">
                  <a href="/programs/weight-loss" className="text-white py-2 px-4 block hover:bg-white/10 transition duration-200">Weight Loss</a>
                  <a href="/programs/muscle-building" className="text-white py-2 px-4 block hover:bg-white/10 transition duration-200">Muscle Building</a>
                  <a href="/programs/yoga" className="text-white py-2 px-4 block hover:bg-white/10 transition duration-200">Yoga & Flexibility</a>
                  <a href="/programs/cardio" className="text-white py-2 px-4 block hover:bg-white/10 transition duration-200">Cardio</a>
                </div>
              </details>
              
              <details className="group">
                <summary className="text-white py-3 px-4 rounded-lg hover:bg-white/10 transition duration-200 flex items-center justify-between cursor-pointer list-none">
                  <span>Meal Plans</span>
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="pl-4">
                  <a href="/meal-plans/keto" className="text-white py-2 px-4 block hover:bg-white/10 transition duration-200">Keto Diet</a>
                  <a href="/meal-plans/vegan" className="text-white py-2 px-4 block hover:bg-white/10 transition duration-200">Vegan</a>
                  <a href="/meal-plans/balanced" className="text-white py-2 px-4 block hover:bg-white/10 transition duration-200">Balanced</a>
                </div>
              </details>
              
              <details className="group">
                <summary className="text-white py-3 px-4 rounded-lg hover:bg-white/10 transition duration-200 flex items-center justify-between cursor-pointer list-none">
                  <span>Shop</span>
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="pl-4">
                  <a href="/shop/equipment" className="text-white py-2 px-4 block hover:bg-white/10 transition duration-200">Equipment</a>
                  <a href="/shop/supplements" className="text-white py-2 px-4 block hover:bg-white/10 transition duration-200">Supplements</a>
                  <a href="/shop/apparel" className="text-white py-2 px-4 block hover:bg-white/10 transition duration-200">Apparel</a>
                </div>
              </details>
              
              <a href="/trainers" className="text-white py-3 px-4 rounded-lg hover:bg-white/10 transition duration-200">
                Trainers
              </a>
              
              <a href="/about" className="text-white py-3 px-4 rounded-lg hover:bg-white/10 transition duration-200">
                About
              </a>
              
              <a href="/contact" className="text-white py-3 px-4 rounded-lg hover:bg-white/10 transition duration-200">
                Contact
              </a>
              
              <div className="pt-2 flex flex-col space-y-2">
                <a href="/Order" className="flex items-center justify-center bg-white text-green-600 py-3 px-4 rounded-lg font-medium">
                  <User size={18} className="mr-2" />
                  <span>Login to Account</span>
                </a>
                <a href="/signup" className="flex items-center justify-center bg-yellow-400 text-green-800 py-3 px-4 rounded-lg font-medium">
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Content Spacer */}
      <div className="h-24 md:h-40"></div>
    </>
  );
}