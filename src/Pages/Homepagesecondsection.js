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
  const [showSummary, setShowSummary] = useState(false);
  const [activeCategory, setActiveCategory] = useState('category1');

  const products = {
    category1: [{ name: "Product 1", calories: 200, image: 'https://thumbs.dreamstime.com/b/diet-healthy-food-lifestyle-health-concept-sport-exercise-equipment-workout-and-gym-background-nutrition-detox-salad-f-179855057.jpg?w=768' }, { name: "Product 2", calories: 300, image: 'https://thumbs.dreamstime.com/b/diet-healthy-food-lifestyle-health-concept-sport-exercise-equipment-workout-and-gym-background-nutrition-detox-salad-f-179855057.jpg?w=768' }, { name: "Product 3", calories: 300 }],
    category2: [{ name: "Product A", calories: 150, image: 'https://thumbs.dreamstime.com/b/diet-healthy-food-lifestyle-health-concept-sport-exercise-equipment-workout-and-gym-background-nutrition-detox-salad-f-179855057.jpg?w=768' }, { name: "Product B", calories: 250, image: 'https://thumbs.dreamstime.com/b/diet-healthy-food-lifestyle-health-concept-sport-exercise-equipment-workout-and-gym-background-nutrition-detox-salad-f-179855057.jpg?w=768' }],
    category3: [{ name: "Item X", calories: 100, image: 'https://thumbs.dreamstime.com/b/diet-healthy-food-lifestyle-health-concept-sport-exercise-equipment-workout-and-gym-background-nutrition-detox-salad-f-179855057.jpg?w=768' }, { name: "Item Y", calories: 120, image: 'https://thumbs.dreamstime.com/b/diet-healthy-food-lifestyle-health-concept-sport-exercise-equipment-workout-and-gym-background-nutrition-detox-salad-f-179855057.jpg?w=768' }],
    category4: [{ name: "High-Protein Food", calories: 400, image: 'https://thumbs.dreamstime.com/b/diet-healthy-food-lifestyle-health-concept-sport-exercise-equipment-workout-and-gym-background-nutrition-detox-salad-f-179855057.jpg?w=768' }, { name: "Protein Shake", calories: 350, image: 'https://thumbs.dreamstime.com/b/diet-healthy-food-lifestyle-health-concept-sport-exercise-equipment-workout-and-gym-background-nutrition-detox-salad-f-179855057.jpg?w=768' }]
  };

  const categories = [
    { id: 'category1', label: 'Balanced' },
    { id: 'category2', label: 'Vegetarian' },
    { id: 'category3', label: 'Low-Carb' },
    { id: 'category4', label: 'High-Protein' }
  ];

  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handleChange = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  const calculatePersonalCalories = () => {
    if (!personalInfo.name || !personalInfo.age || !personalInfo.height || !personalInfo.weight) {
      alert("Please fill in all fields.");
      return;
    }
    if (!acceptedTerms) {
      alert("Please accept the terms and conditions.");
      return;
    }
    const { age, height, weight } = personalInfo;
    const bmr = 10 * parseFloat(weight) + 6.25 * parseFloat(height) - 5 * parseInt(age) + 5; // Simplified Mifflin-St Jeor formula for men
    setCalculatedCalories(bmr);
    setShowSummary(true); // Show the modal after calculation
  };

  const closeModal = () => {
    setShowSummary(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h1 className="text-xl font-bold text-center text-gray-800 mb-4 font-Dosis">Calorie Calculator</h1>
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
            <span className="text-sm text-gray-600 font-Dosis ml-2">I accept the terms and conditions</span>
          </label>
        </div>
        <button
          onClick={calculatePersonalCalories}
          className="bg-[#464194] text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition-all w-full font-Dosis"
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
              <strong>Hi, </strong>{personalInfo.name || "Not provided"}
            </p>
            <p className="text-sm text-gray-600 mt-1 font-Dosis">
              <strong>Calorie Needs for your age:</strong> <span className="font-sans text-green-900">{calculatedCalories || "Not calculated"} kcal</span>
              <br />Our suggested plans will guide you toward reaching your fitness goals while ensuring you stay strong and healthy every step of the way.
            </p>

            {/* Horizontal Category Buttons */}
            <div className="flex justify-between mt-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`relative text-gray-500 px-4 py-2 font-medium text-sm transition duration-300 ease-in-out ${activeCategory === category.id ? 'border-b-4 border-green-500' : 'border-b-4 border-transparent hover:border-gray-300'}`}
                >
                  <span className="relative z-10">{category.label}</span>
                </button>
              ))}
            </div>

            {/* Horizontally Scrollable List */}
            <Slider {...settings}>
              <div className="mt-4 overflow-x-auto scrollbar-none">
                <div className="flex space-x-4">
                  {products[activeCategory]?.map((product, index) => (
                    <div key={index} className="bg-gray-200 p-4 rounded-lg shadow flex-shrink-0" style={{ minWidth: '150px' }}>
                      {product.image && (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-32 object-cover rounded-lg mb-2"
                        />
                      )}
                      <h4 className="text-gray-700 text-sm font-semibold">{product.name}</h4>
                      <p className="text-gray-500 text-xs mt-1">{product.calories} kcal</p>
                    </div>
                  ))}
                </div>
              </div>
            </Slider>


            {/* <Slider {...settings}>
              <div className="mt-4">
                <div className="flex space-x-4">
                  {products[activeCategory]?.map((product, index) => (
                    <div key={index} className="bg-gray-200 p-4 rounded-lg shadow flex-shrink-0" style={{ minWidth: '150px' }}>
                      {product.image && (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-32 object-cover rounded-lg mb-2"
                        />
                      )}
                      <h4 className="text-gray-700 text-sm font-semibold">{product.name}</h4>
                      <p className="text-gray-500 text-xs mt-1">{product.calories} kcal</p>
                    </div>
                  ))}
                </div>
              </div>
            </Slider> */}

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
