import React, { useState, useRef, useEffect } from "react";
import { FaUtensils, FaTimes, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

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
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedMealPlans, setSelectedMealPlans] = useState([]);
  const scrollRef = useRef(null);
  const [mealPlans, setMealPlans] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();


  const activityLevels = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9
  };

  useEffect(() => {
    setIsLoading(true);
    axios.get("https://api.dailyfit.ae/api/user/get-meal-plans", { withCredentials: true })
      .then(response => {
        if (response.data.status && response.data.data) {
          // Process the meal plans data
          const mealPlansData = response.data.data;
          const uniqueCategories = [];

          // Extract unique categories from meal plans
          mealPlansData.forEach(mealPlan => {
            if (mealPlan.categoryDetails && mealPlan.categoryDetails.length > 0) {
              mealPlan.categoryDetails.forEach(category => {
                // Check if this category is already added
                const existingCategory = uniqueCategories.find(c => c.id === category.identifier);

                if (!existingCategory) {
                  // Create category object for navigation
                  uniqueCategories.push({
                    id: category.identifier,
                    label: category.categoryName,
                    icon: <FaUtensils />,
                    color: "from-lime-600 to-lime-800"
                  });
                }
              });
            }
          });

          setMealPlans(mealPlansData);
          setCategories(uniqueCategories);

          // Set the initial active category to the first available category
          if (uniqueCategories.length > 0 && !activeCategory) {
            setActiveCategory(uniqueCategories[0].id);
          }
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching meal plans:", error);
        setIsLoading(false);
      });
  }, []);

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

  const addToPlan = (mealPlan) => {
    setSelectedMealPlans([...selectedMealPlans, mealPlan]);
    navigate('/checkout');
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -300 : 300;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Filter meal plans by active category
  const filteredMealPlans = mealPlans.filter(mealPlan =>
    mealPlan.category && mealPlan.category.includes(activeCategory)
  );

  // Default categories if API doesn't return any
  const defaultCategories = [
    { id: "default", label: "Meal Plans", icon: <FaUtensils />, color: "from-lime-600 to-lime-800" }
  ];

  // Use API categories or fallback to defaults
  const displayCategories = categories.length > 0 ? categories : defaultCategories;

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white p-4 rounded-3xl shadow-2xl overflow-hidden border-green-600 border-2">
          {/* Header */}
          <div className="p-6 text-green-900">
            <h1 className="text-3xl font-bold">Calorie Calculator</h1>
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
              disabled={!acceptedTerms}
              className={`w-full py-2 rounded-xl font-bold text-lg shadow-lg transition-all ${acceptedTerms
                  ? "bg-gradient-to-r from-lime-600 to-lime-800 text-white hover:shadow-xl hover:scale-[1.01]"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
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
                {displayCategories.length > 0 && (
                  <div className="px-6 pt-4 pb-2 flex space-x-2 overflow-x-auto scrollbar-hide">
                    {displayCategories.map((category) => (
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
                )}

                {/* Meal Plans */}
                <div className="relative flex-1 px-6 py-4 overflow-hidden">
                  {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-gray-500">Loading meal plans...</p>
                    </div>
                  ) : filteredMealPlans.length > 0 ? (
                    <div
                      ref={scrollRef}
                      className="h-full overflow-x-auto scrollbar-hide whitespace-nowrap space-x-4 pb-4"
                    >
                      {filteredMealPlans.map((mealPlan, index) => (
                        <div
                          key={index}
                          className="inline-block w-64 h-full align-top whitespace-normal"
                        >
                          <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-white rounded-xl shadow-md h-full flex flex-col border border-gray-100 overflow-hidden"
                          >
                            <div className="h-20 overflow-hidden">
                              <img
                                src={mealPlan.image && mealPlan.image.length > 0 && mealPlan.image[0]
                                  ? mealPlan.image[0]
                                  : "https://source.unsplash.com/500x300/?food"}
                                alt={mealPlan.mealPlanName}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-4 flex-1 flex flex-col">
                              <h3 className="font-bold text-lg text-gray-800">{mealPlan.mealPlanName}</h3>
                              <p className="text-gray-600 text-sm line-clamp-2 mt-1">{mealPlan.description}</p>
                              <div className="mt-auto">
                                <button
                                  onClick={() => addToPlan(mealPlan)}
                                  className="mt-4 bg-gradient-to-r from-lime-600 to-lime-800 text-white py-2 rounded-lg font-medium w-full hover:opacity-90 transition-opacity"
                                >
                                  Add to Plan
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-gray-500">No meal plans available in this category</p>
                    </div>
                  )}

                  {/* Custom Scroll Arrows */}
                  {filteredMealPlans.length > 1 && (
                    <>
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
                    </>
                  )}
                </div>

                {/* Selected Meal Plans */}
                {selectedMealPlans.length > 0 && (
                  <div className="border-t border-gray-200 p-4">
                    <h3 className="font-semibold text-gray-700 mb-2">Your Selected Meal Plans</h3>
                    <div className="space-y-2">
                      {selectedMealPlans.map((mealPlan, index) => (
                        <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                          <span className="text-gray-700">{mealPlan.mealPlanName}</span>
                          <button
                            onClick={() => {
                              const updated = [...selectedMealPlans];
                              updated.splice(index, 1);
                              setSelectedMealPlans(updated);
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FaTimes />
                          </button>
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