import React from "react";
import { FaLeaf, FaAppleAlt, FaHeartbeat, FaSmile, FaChartLine } from "react-icons/fa";

import  { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

const WhyChooseUs = () => {


    
useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      easing: "ease-in-out", // Animation easing
      once: true, // Whether animation should happen only once
    });
  }, []);

  const cards = [
    {
      icon: <FaLeaf size={40} className="text-[#064490]" />,
      heading: "Natural Ingredients",
      description: "We prioritize fresh, organic, and natural ingredients in all our meal plans.",
    },
    {
      icon: <FaAppleAlt size={40} className="text-red-500" />,
      heading: "Custom Diet Plans",
      description: "Personalized meal plans tailored to your dietary needs and goals.",
    },
    {
      icon: <FaHeartbeat size={40} className="text-blue-500" />,
      heading: "Health Focused",
      description: "Our plans are designed to improve your overall health and wellbeing.",
    },
    {
      icon: <FaSmile size={40} className="text-yellow-500" />,
      heading: "Expert Support",
      description: "Our nutritionists are here to guide and support you every step of the way.",
    },
    {
      icon: <FaChartLine size={40} className="text-purple-500" />,
      heading: "Track Progress",
      description: "Monitor your journey with our easy-to-use progress tracking tools.",
    },
  ];

  return (
    <div className="py-8 px-4 mt-10  ">
      <h2 className="text-4xl font-extrabold text-center mb-6 font-parata text-[#464194] "  data-aos="fade-up">Why Choose Us</h2>
      <p className="px-2 font-nunito text-slate-700 text-center" data-aos="fade-up">Choosing us means embracing a healthier lifestyle with expert guidance and personalized support. </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 mt-10">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            data-aos="fade-right" >
            <div className="flex justify-center mb-4" >{card.icon}</div>
            <h3 className="text-lg font-semibold text-center mb-2 font-nunito">{card.heading}</h3>
            <p className="text-gray-600 text-center font-nunito">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
