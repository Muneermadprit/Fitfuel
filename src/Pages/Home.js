import React from "react";
import { useEffect,useState } from "react";
import { Polygon } from '@html-polygon/react'
/* slick-carousel styles */
import Slider from 'react-slick';
import Carousel from "./imagecourosal";
import CalorieCalculator from './Homepagesecond_section'

// Header Component

// Carousel Component


import { Parallax } from "react-parallax";

const ParallaxExample = ({ImageCarousel}) => (
  <div>
   <Parallax
  bgImage="/example.jpg"
  strength={200}
  renderLayer={(percentage) => (
    <div
      style={{
        position: "absolute",
        background: `rgba(255, 125, 0, ${percentage})`,
        left: "50%",
        top: "50%",
        borderRadius: "50%",
        transform: "translate(-50%, -50%)",
        width: `${percentage * 200}px`,
        height: `${percentage * 200}px`,
      }}
    />
  )}
>
  <div style={{ height: 400 }}>Custom Layer</div>
  <ImageCarousel/>
</Parallax>

  </div>
);


const ImageCarousel = () => {
    const images = [
      "assets/image1.png", 
      "assets/image1.png",
      "assets/image3.jpg",
      "assets/image4.jpg",
    ];
  
    const settings = {
      dots: false, // Show navigation dots
      infinite: true, // Infinite loop
      speed: 500, // Transition speed in ms
      slidesToShow: 1, // Show one image at a time
      autoplay: true, // Enable autoplay
      autoplaySpeed: 3000, // Change image every 3 seconds
      vertical:true,
      arrows: false, // Disable previous/next arrows
    };
  
    return (
      <div className="relative w-full h-64 md:h-80 slick-track flex flex-col transition-all">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                alt={`carousel-image-${index}`}
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          ))}
        </Slider>
      </div>
    );
  };
  




  const Header = () => {
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
        className="flex items-center xxl:mx-[100px] px-8  py-2 shadow-lg bg-white rounded-2xl z-20 relative"
        style={{ boxShadow: "0 4px 6px rgba(0, 128, 0, 0.3)" }}
      >
        <div className="flex-1 flex justify-between items-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdPrRnpYU4g3Vz_hpbE35jvH_YSftnDkc2Eg&s"
            alt="Logo"
            className="w-[60px] h-[60px]"
          />
        </div>
        <input className="hidden" type="checkbox" id="menu-toggle" />
        <nav className="hidden md:flex items-center w-auto">
          <ul className="md:flex items-center justify-between text-base xl:text-lg text-gray-500">
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
      </header>
    );
  };
  
// Hero Section Component
const HeroSection = () => {
    return (
      <>
        <div className="relative pb-4 h-full flex flex-col xs:flex-col sm:flex-row items-center text-white">
          {/* Left Section: Text Content */}
          <div className="flex flex-col w-full sm:w-2/2 z-10 text-center sm:text-left">
            <h1 className="xl:text-[90px] sm:text-6xl xs:text-6xl ml-[200px] font-semibold font-Dosis mt-2 xxl:mt-[50px] text-white">
              <span> Fuel your life with </span>
            </h1>
  
            <h1 className="xl:text-[80px] sm:text-6xl xs:text-6xl font-extrabold ml-[200px] font-Dosis mt-2 text-green-900 text-transparent bg-clip-text bg-green-900">
              <span>
                Fit<span className="">fuel</span>
              </span>
            </h1>
  
            <h1 className="xl:text-[30px] sm:text-6xl xs:text-6xl ml-[200px] font-semibold font-Dosis mt-2 text-green-900 text-transparent bg-clip-text bg-green-900">
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
        <div className="mt-6 px-6 mx-[110px] py-8 bg-white text-sm xl:mt-[1px] xxl:mt-[60px] text-green-900 lg:text-2xl hidden md:block border-2 border-dashed border-green-900 rounded-lg relative font-nunito">
          Great news! Get 15% off on meal plans this fall season
          <button className="absolute right-10 bg-green-900 text-white py-1 px-12 rounded-[10px] text-[16px] font-nunito">
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
          className="absolute top-0 left-0 w-[60%] h-full"
          style={{
            backgroundImage: "url('')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.5,
            zIndex: -1,
          }}
        />
  
        {/* Video background */}
        <div className="w-full h-screen bg-red-500 relative">
          <video
            className="absolute top-0 left-0 w-full h-screen object-cover z-0"
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
        <CalorieCalculator />
      </div>
    );
  };
  
  export default PortfolioPage;
  