import React, { useState } from "react";
import { FaAppleAlt, FaDrumstickBite, FaUser, FaUtensils, FaCheckCircle } from "react-icons/fa";
import Slider from "react-slick";

const CalorieCalculator = () => {
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    age: "",
    height: "",
    weight: "",
    desiredCalories: "",
  });
  const [totalCalories, setTotalCalories] = useState(0);
  const [calculatedCalories, setCalculatedCalories] = useState(0);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showSummary, setShowSummary] = useState(false); // For modal visibility

  const [activeCategory, setActiveCategory] = useState('category1');
const products = {
  category1: [{ name: "Product 1", calories: 200 }, { name: "Product 2", calories: 300 }, { name: "Product 2", calories: 300 }],
  category2: [{ name: "Product A", calories: 150 }, { name: "Product B", calories: 250 }],
  category3: [{ name: "Item X", calories: 100 }, { name: "Item Y", calories: 120 }]
};


const settings = {
    infinite: true,      // Disable infinite looping
  slidesToShow: 1,      // Show 3 items at once
  slidesToScroll: 1,    // Scroll 1 item at a time
  autoplay: false,      // Disable autoplay if not needed
  arrows: true,         // Show arrows for navigation
          // Show dots for navigation
  adaptiveHeight: true  // Adjust height for different slide sizes

  };



  const handleChange = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  const calculatePersonalCalories = () => {
    if (!acceptedTerms) {
      alert("Please accept the terms and conditions to proceed.");
      return;
    }
    const { age, height, weight } = personalInfo;
    const bmr =
      10 * parseFloat(weight) +
      6.25 * parseFloat(height) -
      5 * parseInt(age) +
      5; // Simplified Mifflin-St Jeor formula for men
    setCalculatedCalories(bmr);
    setShowSummary(true); // Show the modal after calculation
  };

  const closeModal = () => {
    setShowSummary(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h1 className="text-xl font-bold text-center text-gray-800 mb-4 font-Dosis">
        Calorie Calculator
      </h1>
      <div className="flex flex-col gap-4">
        {/* Personal Information Inputs */}
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-900 focus:outline-none w-full text-gray-800"
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-900 focus:outline-none w-full text-gray-800"
        />
        <input
          type="number"
          name="height"
          placeholder="Height (cm)"
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-900 focus:outline-none w-full text-gray-800"
        />
        <input
          type="number"
          name="weight"
          placeholder="Weight (kg)"
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-900 focus:outline-none w-full text-gray-800"
        />
        <div className="mt-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={() => setAcceptedTerms(!acceptedTerms)}
            className="mr-2"
          />
          <span className="text-sm text-gray-600 font-Dosis ml-2">
            I accept the terms and conditions
          </span>
        </label>
      </div>
       
        <button
          onClick={calculatePersonalCalories}
          className="bg-green-900 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition-all w-full font-Dosis"
        >
          Calculate
        </button>
      </div>

      

     {/* Modal for Summary */}
{showSummary && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
      <h3 className="text-lg font-semibold text-gray-700 flex items-center">
        <FaCheckCircle className="text-green-500 mr-2" /> Summary
      </h3>
      <p className=" text-gray-600 mt-2 text-lg font-Dosis">
        <strong >Hai, </strong> {personalInfo.name || "Not provided"}
      </p>
   
      <p className="text-sm text-gray-600 mt-1 font-Dosis">
       <p className=""> <strong>Calorie Needs in you age :</strong> <span className="font-sans text-green-900">{calculatedCalories || "Not calculated"} kcal</span> </p>
       <br/> Our suggested plans will guide you toward reaching your fitness goals while ensuring you stay strong and healthy every step of the way  </p>
{/* Horizontal Buttons */}
<div className="flex justify-between mt-4">
  {[
    { id: 'category1', label: 'Balanced' },
    { id: 'category2', label: 'Vegetarian' },
    { id: 'category3', label: 'Low-Carb' },
    { id: 'category4', label: 'High-Protein' },
  ].map((category) => (
    <button
      key={category.id}
      onClick={() => setActiveCategory(category.id)}
      className={`relative text-gray-500 px-4 py-2 font-medium text-sm transition duration-300 ease-in-out ${
        activeCategory === category.id
          ? 'border-b-4 border-white'
          : 'border-b-4 border-transparent hover:white'
      }`}
    >
      <span
        className={`absolute inset-x-0 bottom-0 h-1 bg-gray-300 transition-transform duration-300 ease-in-out ${
          activeCategory === category.id ? 'scale-x-100' : 'scale-x-0'
        }`}
      ></span>
      <span className="relative z-10">{category.label}</span>
    </button>
  ))}
</div>



      {/* Horizontally Scrollable List */}
   
      <Slider {...settings}>
      <div className=" mt-4 scrollbar-hide">
        <div className="flex space-x-4">
          {products[activeCategory]?.map((product, index) => (
            <div
              key={index}
              className="bg-gray-200 p-4 rounded-lg shadow flex-shrink-0"
              style={{ minWidth: '150px' }}
            >
              <h4 className="text-gray-700 text-sm font-semibold">{product.name}</h4>
              <p className="text-gray-500 text-xs mt-1">{product.calories} kcal</p>
            </div>
          ))}
        </div>
      </div>

      </Slider>
     
      {/* Close Button */}
     
      <button
        onClick={closeModal}
        className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-500 mt-4 w-full"
      >
        Close
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default CalorieCalculator;
