import React from 'react';

import  { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles


const CircleText = () => {

        
    useEffect(() => {
        AOS.init({
          duration: 1000, // Animation duration in milliseconds
          easing: "ease-in-out", // Animation easing
          once: true, // Whether animation should happen only once
        });
      }, []);
    
  return (
    <div className="flex items-start justify-around flex-wrap gap-4">
      <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full overflow-hidden " data-aos="fade-right">
        <img
          src="/assets/image3.jpg" // Replace with your image URL
          alt="Healthy lifestyle visual representation"
          className="w-full h-full object-cover"
          onError={(e) => (e.currentTarget.src = '/assets/placeholder.jpg')}
        />
      </div>
     
      <div className="text-sm md:text-base lg:text-sm prose text-pretty font-nunito xs:px-4 "  data-aos="fade-right">
      <h1 className=''>Personalized Nutrition and Holistic Wellness Solutions</h1>
       <p className='text-lg'> Choosing us for diet control ensures you receive personalized, science-backed guidance tailored to your unique health goals and lifestyle. <br />
        Our team of experienced nutritionists and dietitians works closely with you to create sustainable meal plans, provide ongoing support, and track your progress, ensuring long-term success. <br />
        We focus on educating you about healthy eating habits rather than imposing restrictive diets, empowering you to make informed choices. </p>
      </div>
    </div>
  );
};

export default CircleText;
