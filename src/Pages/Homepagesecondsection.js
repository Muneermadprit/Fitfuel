import React, { useState, useRef } from "react";
import { FaAppleAlt, FaDrumstickBite, FaUser, FaUtensils, FaCheckCircle, FaTimes, FaLeaf, FaFire, FaSeedling, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const CalorieCalculator = () => {
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    age: "",
    height: "",
    weight: "",
    gender: "male",
    activityLevel: "sedentary",
  });
  const [calculatedCalories, setCalculatedCalories] = useState(0);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [activeCategory, setActiveCategory] = useState('balanced');
  const [selectedFoods, setSelectedFoods] = useState([]);
  const scrollRef = useRef(null);

  const activityLevels = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9
  };

  const products = {
    balanced: [
      { name: "Grilled Salmon", calories: 280, image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80', protein: 34, carbs: 0, fat: 14 },
      { name: "Quinoa Bowl", calories: 320, image: 'https://images.unsplash.com/photo-1546069901-ba9590a7ed63?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80', protein: 12, carbs: 53, fat: 6 },
      { name: "Avocado Toast", calories: 220, image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80', protein: 8, carbs: 20, fat: 14 }
    ],
    vegetarian: [
      { name: "Tofu Stir Fry", calories: 250, image: 'https://images.unsplash.com/photo-1546069901-ba9590a7ed63?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80', protein: 18, carbs: 15, fat: 12 },
      { name: "Chickpea Curry", calories: 380, image: 'https://images.unsplash.com/photo-1546069901-ba9590a7ed63?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80', protein: 15, carbs: 45, fat: 14 },
      { name: "Veggie Burger", calories: 310, image: 'https://images.unsplash.com/photo-1546069901-ba9590a7ed63?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80', protein: 20, carbs: 35, fat: 10 }
    ]
  };

  const categories = [
    { id: 'balanced', label: 'Balanced', icon: <FaUtensils />, color: 'from-lime-600 to-lime-800' },
    { id: 'vegetarian', label: 'Vegetarian', icon: <FaLeaf />, color: 'from-emerald-600 to-emerald-800' },
    { id: 'lowCarb', label: 'Low-Carb', icon: <FaFire />, color: 'from-amber-600 to-amber-800' },
    { id: 'highProtein', label: 'High-Protein', icon: <FaDrumstickBite />, color: 'from-teal-600 to-teal-800' }
  ];

  const handleChange = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  const calculatePersonalCalories = () => {
    const { age, height, weight, gender, activityLevel } = personalInfo;
    let bmr = gender === "male" 
      ? 10 * weight + 6.25 * height - 5 * age + 5 
      : 10 * weight + 6.25 * height - 5 * age - 161;
    
    setCalculatedCalories(Math.round(bmr * activityLevels[activityLevel]));
    setShowSummary(true);
  };

  const addToPlan = (food) => {
    setSelectedFoods([...selectedFoods, food]);
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -300 : 300;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen   flex items-center justify-center ">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white p-4 rounded-3xl shadow-2xl overflow-hidden border-green-600 border-2">
          {/* Header */}
          <div className=" p-6 text-green-900">
            <h1 className="text-3xl font-bold ">Calorie Calculator</h1>
            <p className="opacity-90">Discover your perfect nutrition plan</p>
          </div>
          
          {/* Form */}
          <div className="px-4 space-y-2">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600">Your Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-600">Age</label>
                <input
                  type="number"
                  name="age"
                  placeholder="Years"
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all"
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-600">Gender</label>
                <select
                  name="gender"
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-600">Height (cm)</label>
                <input
                  type="number"
                  name="height"
                  placeholder="cm"
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all"
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-600">Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  placeholder="kg"
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600">Activity Level</label>
              <select
                name="activityLevel"
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all"
              >
                <option value="sedentary">Sedentary</option>
                <option value="light">Light Activity</option>
                <option value="moderate">Moderate Activity</option>
                <option value="active">Active</option>
                <option value="veryActive">Very Active</option>
              </select>
            </div>
            
            <div className="flex items-center pt-2">
              <input
                type="checkbox"
                id="terms"
                checked={acceptedTerms}
                onChange={() => setAcceptedTerms(!acceptedTerms)}
                className="h-5 w-5 text-lime-600 rounded focus:ring-lime-500"
              />
              <label htmlFor="terms" className="ml-2 p-2 text-sm text-gray-600">
                I agree to the terms and conditions
              </label>
            </div>
            
            <button
              onClick={calculatePersonalCalories}
              className="w-full bg-gradient-to-r from-lime-600 to-lime-800 text-white py-2 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-[1.01]"
            >
              Calculate My Plan
            </button>
          </div>
        </div>
      </motion.div>

      {/* Results Modal */}
      <AnimatePresence>
        {showSummary && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl w-full max-w-md max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-lime-700 to-lime-900 p-6 text-white rounded-t-3xl">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Your Nutrition Plan</h2>
                  <button 
                    onClick={() => setShowSummary(false)}
                    className="p-1 rounded-full hover:bg-black/10 transition-colors"
                  >
                    <FaTimes />
                  </button>
                </div>
                <div className="mt-4 bg-white/20 p-4 rounded-xl backdrop-blur-sm">
                  <p className="text-sm opacity-90">Daily Calorie Needs</p>
                  <p className="text-4xl font-bold">{calculatedCalories} <span className="text-2xl">kcal</span></p>
                </div>
              </div>
              
              {/* Modal Content */}
              <div className="flex-1 overflow-hidden flex flex-col">
                {/* Categories */}
                <div className="px-6 pt-4 pb-2 flex space-x-2 overflow-x-auto scrollbar-hide">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`flex items-center px-4 py-2 rounded-full transition-all ${activeCategory === category.id 
                        ? `bg-gradient-to-r ${category.color} text-white shadow-md` 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      <span className="mr-2">{category.icon}</span>
                      {category.label}
                    </button>
                  ))}
                </div>
                
                {/* Food Items */}
                <div className="relative flex-1 px-6 py-4 overflow-hidden">
                  <div 
                    ref={scrollRef}
                    className="h-full overflow-x-auto scrollbar-hide whitespace-nowrap space-x-4 pb-4"
                  >
                    {products[activeCategory]?.map((food, index) => (
                      <div 
                        key={index}
                        className="inline-block w-64 h-full align-top whitespace-normal"
                      >
                        <motion.div 
                          whileHover={{ y: -5 }}
                          className="bg-white rounded-xl shadow-md h-full flex flex-col border border-gray-100 overflow-hidden"
                        >
                          <div className="h-40 overflow-hidden">
                            <img 
                              src={food.image} 
                              alt={food.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-4 flex-1 flex flex-col">
                            <h3 className="font-bold text-lg text-gray-800">{food.name}</h3>
                            <p className="text-lime-600 font-semibold">{food.calories} kcal</p>
                            <div className="flex justify-between text-xs text-gray-500 mt-2">
                              <span>Protein: {food.protein}g</span>
                              <span>Carbs: {food.carbs}g</span>
                              <span>Fat: {food.fat}g</span>
                            </div>
                            <button
                              onClick={() => addToPlan(food)}
                              className="mt-4 bg-gradient-to-r from-lime-600 to-lime-800 text-white py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
                            >
                              Add to Plan
                            </button>
                          </div>
                        </motion.div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Custom Scroll Arrows */}
                  <button 
                    onClick={() => scroll('left')}
                    className="absolute left-6 top-1/2 -translate-y-1/2 bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-lime-600 transition-colors"
                  >
                    <FaChevronLeft />
                  </button>
                  <button 
                    onClick={() => scroll('right')}
                    className="absolute right-6 top-1/2 -translate-y-1/2 bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-lime-600 transition-colors"
                  >
                    <FaChevronRight />
                  </button>
                </div>
                
                {/* Selected Foods */}
                {selectedFoods.length > 0 && (
                  <div className="border-t border-gray-200 p-4">
                    <h3 className="font-semibold text-gray-700 mb-2">Your Selected Foods</h3>
                    <div className="space-y-2">
                      {selectedFoods.map((food, index) => (
                        <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                          <span className="text-gray-700">{food.name}</span>
                          <span className="text-lime-600 font-medium">{food.calories} kcal</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CalorieCalculator;