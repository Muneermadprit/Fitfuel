// import React from "react";
// import CalorieCalculator from './Homepagesecondsection';

// import { useState } from "react";
// import { TiThMenuOutline } from "react-icons/ti";
// import CircleText from "./Homepagethird_section"
// import WhyChooseUs from "./why_choose_us"
// import PlanSelectors from "./Prodectlist"
// import Auth from "./Auth";
// import { useNavigate } from 'react-router-dom';
// import AboutUs from './AboutUS';

// const Header = () => {
//   const [menuOpen, setMenuOpen] = useState(false);


//   const navLinks = [
//     { label: "Home", href: "#" },
//     { label: "About us", href: "/about" },
//     { label: "Health Conditions", href: "#" },
//     { label: "Wellness", href: "#" },
//     { label: "Tools", href: "#" },
//     { label: "Connnect", href: "#" },
//   ];
//   const navigate = useNavigate();

//   // Define the button click handler
//   const handleButtonClick = () => {
//     // Navigate to the checkout page
//     navigate('/checkout');
//   };




//   return (
//     <header
//       className="flex items-center px-8 py-4 shadow-lg bg-white rounded-2xl z-50 relative xxl:mx-[100px]"
//       style={{ boxShadow: "0 4px 6px rgba(0, 128, 0, 0.2)" }}
//     >
//       {/* Logo Section */}
//       <div className="flex-1 flex justify-between items-center">
//         <img
//           src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdPrRnpYU4g3Vz_hpbE35jvH_YSftnDkc2Eg&s"
//           alt="Logo"
//           className="w-[70px] h-[70px] hover:scale-105 transition-transform duration-300 cursor-pointer"
//         />
//         {/* Mobile Menu Icon */}
//         <button
//           className="md:hidden text-[#464194] focus:outline-none hover:text-green-500 transition-colors duration-300"
//           onClick={() => setMenuOpen(true)}
//         >
//           <TiThMenuOutline size={'30px'} />
//         </button>
//       </div>

//       {/* Navigation Links for Desktop */}
//       <nav className="hidden md:flex items-center w-auto">
//         <ul className="md:flex items-center justify-between text-base xl:text-lg text-[#464194] space-x-6">
//           {navLinks.map((link) => (
//             <li key={link.label} className="relative group">
//               <a
//                 className="md:p-4 py-3 px-0 block hover:text-green-500 text-[18px] font-nunito font-semibold transition-colors duration-300"
//                 href={link.href}
//               >
//                 {link.label}
//               </a>
//               {/* Animated underline effect on hover */}
//               <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-green-500 transition-all duration-300 group-hover:w-full"></div>
//             </li>
//           ))}
//         </ul>
//       </nav>

//       {/* Mobile Menu Popup */}
//       {menuOpen && (
//         <>
//           {/* Overlay */}
//           <div
//             className="fixed inset-0 bg-black bg-opacity-50 z-50"
//             onClick={() => setMenuOpen(false)}
//           ></div>

//           {/* Menu Popup */}
//           <div
//             className="top-0 right-0 border-l-0 border-t-0 border-b-0 rounded-l-xl shadow-lg fixed h-full w-[300px] bg-white z-50 transform transition-all duration-500 ease-in-out"
//             style={{
//               transform: menuOpen ? "translateX(0)" : "translateX(100%)",
//             }}
//           >
//             {/* Close Button */}
//             <button
//               className="absolute top-6 right-6 text-gray-500 focus:outline-none hover:text-green-500 transition-colors duration-300"
//               onClick={() => setMenuOpen(false)}
//             >
//               <svg
//                 className="w-6 h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>

//             {/* Mobile Menu Links */}
//             <ul className="flex flex-col items-start justify-start text-base xl:text-lg text-gray-700 p-8 space-y-6">
//               {navLinks.map((link) => (
//                 <li key={link.label} className="w-full">
//                   <a
//                     className="block py-2 px-4 hover:text-green-500 text-[18px] font-nunito font-semibold transition-colors duration-300"
//                     href={link.href}
//                     onClick={() => setMenuOpen(false)} // Close menu on link click
//                   >
//                     {link.label}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </>
//       )}
//     </header>
//   );
// };



// const HeroSection = () => {
//   const navigate = useNavigate(); // Move the hook inside the component

//   // Define the button click handler inside the component
//   const handleButtonClick = () => {
//     navigate('/checkout');
//   };

//   // Hero Section Component
//   return (
//     <>
//       <div className="relative pb-4 h-full flex flex-col xs:flex-col sm:flex-row items-center text-[#464194]">
//         {/* Left Section: Text Content */}
//         <div className="flex flex-col w-full sm:w-2/2 z-10 text-center xs:text-left xs:ml-8 xs:mt-10">
//           <h1 className="xl:text-[60px] sm:text-6xl xs:text-3xl  xxl:ml-[200px]  font-semibold font-Dosis mt-2 xxl:mt-[50px] text-white">
//             <span className="font-Dosis"> Transform your plate with </span>
//           </h1>

//           <h1 className="xl:text-[80px] sm:text-6xl xs:text-[55px] sm:text-left font-extrabold xxl:ml-[200px]  font-Dosis xxl:mt-2 text-[#464194] text-transparent bg-clip-text bg-[#464194]">
//             <span className="">
//               <span className="xxl:text-[120px]"> N</span>
//               ourishing <br /><span className="xxl:text-[120px]">B</span>owl
//             </span>
//           </h1>

//           <h1 className="xl:text-[30px] sm:text-6xl xs:text-2xl xxl:ml-[200px] font-semibold font-Dosis mt-2 text-green-900 text-transparent bg-clip-text bg-[#464194]">
//             <span>
//               Your <span className="">diet expert</span>
//             </span>
//           </h1>
//         </div>

//         {/* Right Section: Calorie Calculator */}
//         <div className="flex w-full sm:w-1/2 justify-center sm:justify-end items-center mt-[50px]">
//           <CalorieCalculator />
//         </div>
//       </div>

//       {/* Promotional Section */}
//       <div className="mt-6 px-6 mx-[110px] py-8 bg-white text-sm xl:mt-[1px] xxl:mt-[80px] border-b-0 text-[#464194] lg:text-2xl hidden md:block border-2 border-dashed border-[#464194] rounded-lg relative font-nunito">
//         Great news! Get 15% off on meal plans this fall season
//         <button onClick={handleButtonClick} className="absolute right-10 bg-[#464194] text-white py-1 px-12 rounded-[10px] text-[16px] font-nunito">
//           Get Start Now
//         </button>
//       </div>
//     </>
//   );
// };

// // Background Hexagon Component
// const HexagonBackground = () => {
//   return (
//     <div className="absolute top-[8%] sm:top-[8%] md:top-20 xxl:top-32 xxl:right-8 xs:flex xs:justify-center w-full mt-40 md:mt-1 md:justify-end">
//       <div
//         className="circle-container w-[400px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[200px] md:h-[200px] xl:w-[300px] xl:h-[300px] xxl:w-[600px] xxl:h-[400px] right-0"
//         style={{
//           position: 'relative',
//           borderRadius: '50%', // Circle shape
//           backgroundColor: 'white', // Circle background
//           boxShadow: '0 0 30px rgba(0, 64, 0, 0.9)', // Dark green shadow
//           overflow: 'hidden', // Prevent overflow
//           transform: 'scale(1.05)', // Slight bulging effect
//         }}
//       >
//         {/* Simulated border with additional glow effect */}
//         <div
//           style={{
//             position: 'absolute',
//             top: '0',
//             left: '0',
//             right: '0',
//             bottom: '0',
//             border: '7px solid transparent', // Transparent border
//             borderRadius: '50%', // Follow circle shape
//             pointerEvents: 'none', // Ignore pointer events
//             boxShadow:
//               '0 0 20px rgba(0, 64, 0, 1), 0 0 40px rgba(0, 64, 0, 0.8)', // Glowing effect
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// // Main PortfolioPage Component
// // Main PortfolioPage Component
// const PortfolioPage = () => {
//   return (
//     <div
//       className="w-full h-full overflow-hidden relative"
//       style={{
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       {/* Background image overlay */}
//       <div
//         className="absolute top-0 left-0 w-full h-full z-0"
//         style={{
//           backgroundImage: "url('/assets/image4.jpeg')",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           opacity: 0.5, // Adjust opacity if needed for overlay effect
//         }}
//       />

//       {/* Video background */}
//       <div className="w-full h-screen  relative">
//         <video
//           className="absolute top-0 left-0 w-full h-screen object-cover z-0 rounded-10"
//           autoPlay
//           loop
//           muted
//           playsInline
//         >
//           <source
//             src="/assets/4473176-uhd_3840_2160_25fps.mp4"
//             type="video/mp4"
//           />
//           Your browser does not support the video tag.
//         </video>

//         {/* Overlay for better text visibility */}
//         <div className="absolute top-0 left-0 w-full h-screen bg-black opacity-20 z-10"></div>

//         {/* Content */}
//         <div className="w-full">
//           {/* Header with custom margin */}
//           <div className="xxl:mx-[0px] xl:mx[150px]">
//             <Header />
//           </div>
//         </div>

//         <div className="relative z-20">
//           <HeroSection />
//         </div>
//       </div>

//       <WhyChooseUs />

//       <CircleText />
//       <PlanSelectors />


//     </div>
//   );
// };

// export default PortfolioPage;



import React from "react";
import CalorieCalculator from './Homepagesecondsection';
import { useState } from "react";
import { TiThMenuOutline } from "react-icons/ti";
import CircleText from "./Homepagethird_section";
import WhyChooseUs from "./why_choose_us";
import PlanSelectors from "./Prodectlist";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "#" },
    { label: "About us", href: "/about" },
    { label: "Health Conditions", href: "#" },
    { label: "Wellness", href: "#" },
    { label: "Tools", href: "#" },
    { label: "Connnect", href: "#" },
  ];

  return (
    <header
      className="flex items-center px-4 sm:px-6 md:px-8 py-4 shadow-lg bg-white rounded-2xl z-50 relative mx-2 sm:mx-4 md:mx-6 lg:mx-8 xxl:mx-[100px]"
      style={{ boxShadow: "0 4px 6px rgba(0, 128, 0, 0.2)" }}
    >
      <div className="flex-1 flex justify-between items-center">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdPrRnpYU4g3Vz_hpbE35jvH_YSftnDkc2Eg&s"
          alt="Logo"
          className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] md:w-[70px] md:h-[70px] hover:scale-105 transition-transform duration-300 cursor-pointer"
        />
        <button
          className="md:hidden text-[#464194] focus:outline-none hover:text-green-500 transition-colors duration-300"
          onClick={() => setMenuOpen(true)}
        >
          <TiThMenuOutline size={'30px'} />
        </button>
      </div>

      <nav className="hidden md:flex items-center w-auto px-3">
        <ul className="md:flex items-center justify-between text-sm lg:text-base xl:text-lg text-[#464194] space-x-2 lg:space-x-6">
          {navLinks.map((link) => (
            <li key={link.label} className="relative group">
              <span
                className="md:p-2 lg:p-4 py-3 px-0 block text-purple-600 hover:text-green-500 text-[14px] sm:text-[16px] md:text-[20px] font-nunito font-semibold transition-colors duration-300 cursor-pointer"
              >
                {link.label}
              </span>
            </li>
            // <li key={link.label} className="relative group">
            //   <a
            //     className="md:p-2 lg:p-4 py-3 px-0 block text-purple-600 hover:text-green-500 text-[14px] sm:text-[16px] md:text-[18px] font-nunito font-semibold transition-colors duration-300"
            //     href={link.href}
            //   >
            //     {link.label}
            //   </a>
            //   {/* <a
            //     className="md:p-2 lg:p-4 py-3 px-0 block hover:text-green-500 text-[14px] sm:text-[16px] md:text-[18px] font-nunito font-semibold transition-colors duration-300 text-decorate:none"
            //     href={link.href}
            //   >
            //     {link.label}
            //   </a> */}
            //   <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-green-500 transition-all duration-300 group-hover:w-full"></div>
            // </li>
          ))}
        </ul>
      </nav>

      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={() => setMenuOpen(false)}
          ></div>

          <div
            className="top-0 right-0 fixed h-full w-[250px] sm:w-[300px] bg-white z-50 transform transition-all duration-500 ease-in-out rounded-l-xl shadow-lg"
            style={{
              transform: menuOpen ? "translateX(0)" : "translateX(100%)",
            }}
          >
            <button
              className="absolute top-4 right-4 text-gray-500 focus:outline-none hover:text-green-500 transition-colors duration-300"
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

            <ul className="flex flex-col items-start justify-start text-base xl:text-lg text-gray-700 p-6 sm:p-8 space-y-4 sm:space-y-6">
              {navLinks.map((link) => (
                <li key={link.label} className="w-full">
                  <a
                    className="block py-2 px-4 hover:text-green-500 text-[16px] sm:text-[18px] font-nunito font-semibold transition-colors duration-300"
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
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

const HeroSection = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/checkout');
  };

  return (
    <>
      <div className="relative pb-4 h-full flex flex-col sm:flex-row items-center text-[#464194] px-4 sm:px-6 md:px-8">
        <div className="flex flex-col w-full sm:w-2/2 z-10 text-center sm:text-left sm:ml-4 md:ml-8 mt-6 sm:mt-10">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xxl:text-[60px] font-semibold font-Dosis mt-2 xxl:mt-[50px] text-white lg:text-left">
            <span className="font-Dosis lg:text-left">Transform your plate with</span>
          </h1>
          {/* <h1 className="text-[40px] sm:text-[45px] md:text-[55px] lg:text-[65px] xl:text-[80px] xxl:text-[120px] font-extrabold font-Dosis mt-2 text-transparent bg-clip-text bg-[#464194] xxl:ml-[200px] lg:text-left">
            <span>
              <span className="xxl:text-[120px]">D</span>
              aily <br />
              <span className="xxl:text-[120px]">F</span>it
            </span>
          </h1> */}

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[120px] font-extrabold font-Dosis mt-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-transparent bg-clip-text leading-tight tracking-tight lg:text-left">
            <span className="text-[1.2em]">D</span>aily <span className="text-[1.2em]">F</span>it
          </h1>
          <h1 className="text-xl sm:text-2xl md:text-[40px] font-semibold font-Dosis mt-2 text-transparent bg-clip-text bg-[#464194] lg:text-left">
            <span>
              Your <span>diet expert</span>
            </span>
          </h1>
        </div>

        <div className="flex w-full sm:w-1/2 justify-center sm:justify-end items-center mt-8 sm:mt-[50px]">
          <CalorieCalculator />
        </div>
      </div>

      <div className="mt-6 mx-4 sm:mx-6 md:mx-8 lg:mx-[110px] py-6 sm:py-8 bg-white text-xs sm:text-sm lg:text-2xl xl:mt-[1px] xxl:mt-[80px] border-2 border-dashed border-[#464194] rounded-lg relative font-nunito hidden md:block pl-10">
        Great news! Get 15% off on meal plans this fall season
        <button
          onClick={handleButtonClick}
          className="absolute right-4 sm:right-10 bg-[#464194] text-white py-1 px-6 sm:px-12 rounded-[10px] text-[14px] sm:text-[16px] font-nunito"
        >
          Get Start Now
        </button>
      </div>
    </>
  );
};

const HexagonBackground = () => {
  return (
    <div className="absolute top-[8%] sm:top-[8%] md:top-20 xxl:top-32 xxl:right-8 xs:flex xs:justify-center w-full mt-40 md:mt-1 md:justify-end">
      <div
        className="circle-container w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] xl:w-[400px] xl:h-[400px] xxl:w-[600px] xxl:h-[400px]"
        style={{
          position: 'relative',
          borderRadius: '50%',
          backgroundColor: 'white',
          boxShadow: '0 0 30px rgba(0, 64, 0, 0.9)',
          overflow: 'hidden',
          transform: 'scale(1.05)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            border: '7px solid transparent',
            borderRadius: '50%',
            pointerEvents: 'none',
            boxShadow: '0 0 20px rgba(0, 64, 0, 1), 0 0 40px rgba(0, 64, 0, 0.8)',
          }}
        />
      </div>
    </div>
  );
};

const PortfolioPage = () => {
  return (
    <div className="w-full h-full overflow-hidden relative">
      <div
        className="absolute top-0 left-0 w-full h-full z-0"
        style={{
          backgroundImage: "url('/assets/image4.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.5,
        }}
      />

      <div className="w-full h-screen relative">
        <video
          className="absolute top-0 left-0 w-full h-screen object-cover z-0"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/assets/4473176-uhd_3840_2160_25fps.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute top-0 left-0 w-full h-screen bg-black opacity-20 z-10"></div>

        <div className="w-full">
          <div className="mx-2 sm:mx-4 md:mx-6 lg:mx-8 xxl:mx-[0px]">
            <Header />
          </div>
        </div>

        <div className="relative z-20">
          <HeroSection />
        </div>
      </div>

      <WhyChooseUs />
      <CircleText />
      <PlanSelectors />
    </div>
  );
};

export default PortfolioPage;