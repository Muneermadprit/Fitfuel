import React from "react";
import CalorieCalculator from './Homepagesecondsection';

import { useState } from "react";
import { TiThMenuOutline } from "react-icons/ti";
import CircleText from "./Homepagethird_section"
import WhyChooseUs from "./why_choose_us"
import PlanSelectors from "./Prodectlist"
import Auth from "./Auth";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "#" },
    { label: "About Me", href: "#" },
    { label: "Education", href: "#" },
    { label: "Experience", href: "#" },
    { label: "Projects", href: "#" },
    { label: "Contact", href: "#" },
  ];

  return (
    <header
      className="flex items-center px-8 py-2 shadow-lg bg-white rounded-2xl z-50 relative xxl:mx-[100px]"
      style={{ boxShadow: "0 4px 6px rgba(0, 128, 0, 0.3)" }}
    >
      {/* Logo Section */}
      <div className="flex-1 flex justify-between items-center">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdPrRnpYU4g3Vz_hpbE35jvH_YSftnDkc2Eg&s"
          alt="Logo"
          className="w-[60px] h-[60px]"
        />
        {/* Mobile Menu Icon */}
        <button
          className="md:hidden text-[#464194] focus:outline-none"
          onClick={() => setMenuOpen(true)}
        >
         <TiThMenuOutline size={'30px'} />
        </button>
      </div>

      {/* Navigation Links for Desktop */}
      <nav className="hidden md:flex items-center w-auto">
        <ul className="md:flex items-center justify-between text-base xl:text-lg text-[#464194]">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                className="md:p-4 py-3 px-0 block hover:text-green-500 text-[18px] font-nunito"
                href={link.href}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Menu Popup */}
      {menuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={() => setMenuOpen(false)}
          ></div>

          {/* Menu Popup */}
          <div
            className="top-0 right-0 border-l-0 border-t-0 border-b-0 rounded-xl w-3/4 shadow-lg fixed h-[500px] inset-0 bg-white z-50 transform transition-all duration-500 ease-in-out opacity-0"
            style={{
              transform: menuOpen ? "translateX(0)" : "translateX(100%)",
              opacity: menuOpen ? "1" : "0",
            }}
          >
            <button
              className="absolute top-4 right-4 text-gray-500 focus:outline-none"
              onClick={() => setMenuOpen(false)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <ul className="flex flex-col items-start justify-start text-base xl:text-lg text-gray-500 p-8 space-y-4">
              {navLinks.map((link) => (
                <li key={link.label} className="w-full">
                  <a
                    className="block py-2 px-4 hover:text-green-500 text-[18px] font-nunito"
                    href={link.href}
                    onClick={() => setMenuOpen(false)} // Close menu on link click
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </header>
  );
};



// Hero Section Component
const HeroSection = () => {
  return (
    <>
      <div className="relative pb-4 h-full flex flex-col xs:flex-col sm:flex-row items-center text-[#464194]">
        {/* Left Section: Text Content */}
        <div className="flex flex-col w-full sm:w-2/2 z-10 text-center xs:text-left xs:ml-8 xs:mt-20">
          <h1 className="xl:text-[90px] sm:text-6xl xs:text-5xl  xxl:ml-[200px]  font-semibold font-Dosis mt-2 xxl:mt-[50px] text-white">
            <span> Fuel your life with </span>
          </h1>

          <h1 className="xl:text-[80px] sm:text-6xl xs:text-6xl sm:text-left font-extrabold xxl:ml-[200px]  font-Dosis mt-2 text-[#464194] text-transparent bg-clip-text bg-[#464194]">
            <span className="">
              Fit<span className="">fuel</span>
            </span>
          </h1>

          <h1 className="xl:text-[30px] sm:text-6xl xs:text-2xl xxl:ml-[200px] font-semibold font-Dosis mt-2 text-green-900 text-transparent bg-clip-text bg-[#464194]">
            <span>
              Your <span className="">diet expert</span>
            </span>
          </h1>
        </div>

        {/* Right Section: Calorie Calculator */}
        <div className="flex w-full sm:w-1/2 justify-center sm:justify-end items-center mt-[50px]">
          <CalorieCalculator />
        </div>
      </div>

      {/* Promotional Section */}
      <div className="mt-6 px-6 mx-[110px] py-8 bg-white text-sm xl:mt-[1px] xxl:mt-[80px] border-b-0 text-[#464194] lg:text-2xl hidden md:block border-2 border-dashed border-[#464194] rounded-lg relative font-nunito">
        Great news! Get 15% off on meal plans this fall season
        <button className="absolute right-10 bg-[#464194] text-white py-1 px-12 rounded-[10px] text-[16px] font-nunito">
          Get Start Now
        </button>
      </div>
    </>
  );
};

// Background Hexagon Component
const HexagonBackground = () => {
  return (
    <div className="absolute top-[8%] sm:top-[8%] md:top-20 xxl:top-32 xxl:right-8 xs:flex xs:justify-center w-full mt-40 md:mt-1 md:justify-end">
      <div
        className="circle-container w-[400px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[200px] md:h-[200px] xl:w-[300px] xl:h-[300px] xxl:w-[600px] xxl:h-[400px] right-0"
        style={{
          position: 'relative',
          borderRadius: '50%', // Circle shape
          backgroundColor: 'white', // Circle background
          boxShadow: '0 0 30px rgba(0, 64, 0, 0.9)', // Dark green shadow
          overflow: 'hidden', // Prevent overflow
          transform: 'scale(1.05)', // Slight bulging effect
        }}
      >
        {/* Simulated border with additional glow effect */}
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            border: '7px solid transparent', // Transparent border
            borderRadius: '50%', // Follow circle shape
            pointerEvents: 'none', // Ignore pointer events
            boxShadow:
              '0 0 20px rgba(0, 64, 0, 1), 0 0 40px rgba(0, 64, 0, 0.8)', // Glowing effect
          }}
        />
      </div>
    </div>
  );
};

// Main PortfolioPage Component
// Main PortfolioPage Component
const PortfolioPage = () => {
  return (
    <div
      className="w-full h-full overflow-hidden relative"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Background image overlay */}
      <div
        className="absolute top-0 left-0 w-full h-full z-0"
        style={{
          backgroundImage: "url('/assets/image4.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.5, // Adjust opacity if needed for overlay effect
        }}
      />

      {/* Video background */}
      <div className="w-full h-screen  relative">
        <video
          className="absolute top-0 left-0 w-full h-screen object-cover z-0 rounded-10"
          autoPlay
          loop
          muted
          playsInline
        >
          <source
            src="/assets/4473176-uhd_3840_2160_25fps.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* Overlay for better text visibility */}
        <div className="absolute top-0 left-0 w-full h-screen bg-black opacity-20 z-10"></div>

        {/* Content */}
        <div className="w-full">
          {/* Header with custom margin */}
          <div className="xxl:mx-[0px] xl:mx[150px]">
            <Header />
          </div>
        </div>

        <div className="relative z-20">
          <HeroSection />
        </div>
      </div>
      
      <WhyChooseUs/>
    
      <CircleText/>
      <PlanSelectors/>
      
      
    </div>
  );
};

export default PortfolioPage;
