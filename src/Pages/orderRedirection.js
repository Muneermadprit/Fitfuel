import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate


const OrderRedirection = () => {

    const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Section */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-gray-100 p-6 md:p-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center font-nunito">
          Welcome to Our Store!
        </h1>
        <p className="text-base md:text-lg text-gray-600 mb-8 text-center font-nunito">
          Experience seamless shopping like never before. 
          Choose your path to get started!
        </p>
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <button className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 w-full md:w-auto"
            onClick={() => navigate('/Order')} >
            Existing User
          </button>
          <button className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 w-full md:w-auto"
             onClick={() => navigate('/Register')}>
            New User
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2">
        <img
          src="/assets/userefind.webp"
          alt="Attractive Display"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default OrderRedirection;

