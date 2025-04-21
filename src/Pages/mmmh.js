import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingBag, Calendar, MapPin, Gift } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MealPlanner = () => {
  // Adding missing state variables
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDates, setSelectedDates] = useState([]);
  const [activeStep, setActiveStep] = useState(1);
  const [selectedPackageId, setSelectedPackageId] = useState(null);
  const [selectedPlans, setSelectedPlans] = useState({ packages: [] });
  const [mealData, setMealData] = useState({});
  const [selectedMeals, setSelectedMeals] = useState({});
  const [addons, setAddons] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});

  const plans = [
    "MONTHLY (6 days per week)",
    "MONTHLY (5 days per week)",
    "WEEKLY (6 days)",
    "WEEKLY (5 days)"
  ];

  const [formData, setFormData] = useState({
    street: "",
    buildingFloor: "",
    houseOrFlatNumber: "",
    landmark: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phone: "",
    identifier: "Home",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    const payload = { address: formData };

    try {
      const response = await axios.post("https://api.dailyfit.ae/api/user/add-address", payload, { withCredentials: true });
      toast.success("Address added successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.log("Response:", response.data);
    } catch (error) {
      alert("Failed to add address. Please try again.");
      console.error("Error:", error);
    }
  };

  const [selectedPackage, setSelectedPackage] = useState({
    packageId: null,
    planId: null
  });

  const isSelected = (packageId, planId) => {
    return selectedPackage.packageId === packageId && selectedPackage.planId === planId;
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://api.dailyfit.ae/api/user/get-addons", { withCredentials: true });
        setAddons(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSelection = async (packageId, identifierPackage) => {
    setSelectedPackageId(packageId);
    sessionStorage.setItem("package", packageId);

    try {
      const response = await axios.post(
        "https://api.dailyfit.ae/api/user/get-package-details",
        { packageId, identifierPackage },
        { withCredentials: true }
      );

      if (response.data && response.data.data) {
        const packages = response.data.data;
        const formattedMeals = {};

        packages.forEach((pkg) => {
          // Check if pkg.meals exists and is an object
          if (pkg.meals && typeof pkg.meals === 'object') {
            Object.entries(pkg.meals).forEach(([day, dayData]) => {
              // Check if the dayData has a date property
              if (dayData.date) {
                const date = dayData.date;

                // Use mealsDetails if available, otherwise use meals
                const mealsList = dayData.mealsDetails && dayData.mealsDetails.length > 0
                  ? dayData.mealsDetails
                  : (dayData.meals && dayData.meals.length > 0 ? dayData.meals : []);

                // Only add to formattedMeals if there are meals for this day
                if (mealsList.length > 0) {
                  // Make sure each meal has an image property that's an array
                  const processedMeals = mealsList.map(meal => ({
                    ...meal,
                    image: meal.image && Array.isArray(meal.image) ? meal.image : ['/placeholder-image.jpg']
                  }));

                  formattedMeals[date] = processedMeals;
                }
              }
            });
          }
        });

        console.log("Formatted Meals:", formattedMeals); // Debug log

        setMealData(formattedMeals);
        const availableDates = Object.keys(formattedMeals);

        if (availableDates.length > 0) {
          setSelectedDate(availableDates[0]);

          // Initialize selected meals with first product for each day
          const initialSelectedMeals = {};
          availableDates.forEach(date => {
            if (formattedMeals[date] && formattedMeals[date].length > 0) {
              initialSelectedMeals[date] = formattedMeals[date][0]._id;
            }
          });

          setSelectedMeals(initialSelectedMeals);
        }
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  // Fixed handleDateSelection function
  const formatDate = (dateObj) => {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  const handleDateSelection = (date) => {
    console.log('Raw selected date:', date);
  
    // Strip time part completely to avoid timezone shifting
    const cleanDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const selectedDateStr = formatDate(cleanDate);
  
    if (isDateDisabled(cleanDate)) {
      console.log('Date is disabled');
      return;
    }
  
    if (selectedDates.includes(selectedDateStr)) {
      setSelectedDates([]);
      setSelectedDate(null);
      sessionStorage.removeItem('startDate');
      sessionStorage.removeItem('endDate');
      return;
    }
  
    let newSelectedDates = [];
  
    if (selectedPlan?.includes("MONTHLY")) {
      const daysToSelect = selectedPlan.includes("5 days") ? 20 : 24;
      let currentDate = new Date(cleanDate);
      let validDates = [];
  
      while (validDates.length < daysToSelect) {
        const dateStr = formatDate(currentDate);
        if (!isDateDisabled(currentDate)) {
          validDates.push(dateStr);
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
  
      newSelectedDates = validDates;
      sessionStorage.setItem('startDate', validDates[0]);
      sessionStorage.setItem('endDate', validDates[validDates.length - 1]);
  
    } else if (selectedPlan?.includes("WEEKLY")) {
      const daysToSelect = selectedPlan.includes("5 days") ? 5 : 6;
      let currentDate = new Date(cleanDate);
      let validDates = [];
  
      while (validDates.length < daysToSelect) {
        const dateStr = formatDate(currentDate);
        if (!isDateDisabled(currentDate)) {
          validDates.push(dateStr);
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
  
      newSelectedDates = validDates;
      sessionStorage.setItem('startDate', validDates[0]);
      sessionStorage.setItem('endDate', validDates[validDates.length - 1]);
  
    } else {
      // One-day selection fallback
      newSelectedDates = [selectedDateStr];
      sessionStorage.setItem('startDate', selectedDateStr);
      sessionStorage.setItem('endDate', selectedDateStr);
    }
  
    console.log("✅ Final date range selected:", newSelectedDates);
  
    setSelectedDates(newSelectedDates);
    setSelectedDate(newSelectedDates[0]);
  };
  

  // Fixed isDateDisabled function to properly handle weekend restrictions
  const isDateDisabled = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const twoDaysFromNow = new Date(today);
    twoDaysFromNow.setDate(today.getDate() + 2);

    // Date formatting for comparison
    const comparableDate = new Date(date);
    comparableDate.setHours(0, 0, 0, 0);
    
    // Cannot select dates less than 2 days from now
    if (comparableDate <= twoDaysFromNow) return true;
    
    const dayOfWeek = comparableDate.getDay(); // 0 is Sunday, 6 is Saturday
    
    // For 5-day plans: exclude Saturday (6) and Sunday (0)
    if (selectedPlan?.includes("5 days") && (dayOfWeek === 0 || dayOfWeek === 6)) {
      return true;
    }
    
    // For 6-day plans: exclude Sunday (0) only
    if (selectedPlan?.includes("6 days") && dayOfWeek === 0) {
      return true;
    }
    
    return false;
  };

  // Add missing handleMealSelection function
  const handleMealSelection = (date, mealId) => {
    setSelectedMeals(prev => ({
      ...prev,
      [date]: mealId
    }));
  };

  // Add missing handleConfirmSelection function
  const handleConfirmSelection = () => {
    saveSelectionsToSessionStorage();
    setActiveStep(3); // Move to the next step
  };

  // Add missing saveSelectionsToSessionStorage function
  const saveSelectionsToSessionStorage = () => {
    sessionStorage.setItem('selectedMeals', JSON.stringify(selectedMeals));
    sessionStorage.setItem('selectedPlan', selectedPlan);
    
    // Ensure start and end dates are saved
    if (selectedDates.length > 0) {
      sessionStorage.setItem('startDate', selectedDates[0]);
      sessionStorage.setItem('endDate', selectedDates[selectedDates.length - 1]);
    }
  };

  // Add missing handleCompleteOrder function
  const handleCompleteOrder = async () => {
    try {
      // Implement order completion logic here
      toast.success("Your order has been placed successfully!");
    } catch (error) {
      toast.error("Error placing order. Please try again.");
      console.error("Order error:", error);
    }
  };

  // Add missing handleBackClick function
  const handleBackClick = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleResetSelections = () => {
    setSelectedOptions({});
    setSelectedPlan(null);
    setSelectedDates([]);
    setSelectedMeals({});

    sessionStorage.removeItem('startDate');
    sessionStorage.removeItem('endDate');
    sessionStorage.removeItem('selectedMeals');
  };

  const renderCalendar = (monthOffset) => {
    const month = new Date(currentYear, currentMonth + monthOffset, 1);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(month.getFullYear(), month.getMonth(), 1).getDay();

    const calendarDays = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="w-10 h-10" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(month.getFullYear(), month.getMonth(), day);
      const dateStr = date.toISOString().split('T')[0];
      const isDisabled = isDateDisabled(date);
      const isSelected = selectedDates.includes(dateStr);

      calendarDays.push(
        <button
          key={`${month.getMonth()}-${day}`}
          onClick={() => handleDateSelection(date)}
          disabled={isDisabled}
          className={`w-10 h-10 rounded-full text-sm font-medium transition-colors 
            ${isDisabled
              ? "text-gray-300 cursor-not-allowed"
              : isSelected
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md"
                : "hover:bg-emerald-50 hover:text-emerald-600"
            }`}
        >
          {day}
        </button>
      );
    }

    return (
      <div className="w-72">
        <h3 className="text-lg font-medium mb-4 text-gray-800">
          {month.toLocaleDateString('default', { month: 'long', year: 'numeric' })}
        </h3>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {days.map(day => (
            <div key={day} className="w-10 h-10 flex items-center justify-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {calendarDays}
        </div>
      </div>
    );
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  useEffect(() => {
    if (selectedDates.length > 0 && !selectedDate) {
      setSelectedDate(selectedDates[0]);
    }
  }, [selectedDates, selectedDate]);

  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return (
          <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white p-6">
            <ToastContainer />
            <div className="max-w-7xl mx-auto">
              {/* Header Section */}
              <div className="text-center mb-12 space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight">
                  Design Your <span className="text-emerald-600">Perfect</span> Meal Plan
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                  Customize your nutrition journey with our chef-crafted meal packages
                </p>
              </div>

              {/* Package Selection Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {selectedPlans && selectedPlans.packages && selectedPlans.packages.map((packageItem) => (
                  <div key={packageItem._id}
                    className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                    <div className="h-3 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
                    <div className="p-8">
                      <div className="flex items-start justify-between mb-6">
                        <div className="p-3 bg-emerald-100 rounded-xl">
                          <ShoppingBag className="w-6 h-6 text-emerald-600" />
                        </div>
                        <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                          Perfect for {packageItem.packageGroup === "Family" ? "families" : "individuals"}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold mb-3 text-gray-800">{packageItem.packageGroup}</h3>
                      <p className="text-gray-600 mb-8">{packageItem.description}</p>

                      <button
                        onClick={() => handleSelection(packageItem._id, packageItem._id, packageItem.identifier)}
                        className={`w-full py-4 px-6 rounded-xl text-left font-medium transition-all duration-300
                          ${selectedPackageId === packageItem._id
                            ? "bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-md"
                            : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 group-hover:translate-y-1"
                          }`}
                      >
                        <div className="flex justify-between items-center">
                          <span>{packageItem.packageName}</span>
                          <ChevronRight className={`w-5 h-5 transition-transform ${selectedPackageId === packageItem._id ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                        </div>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Duration Selection */}
              <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
                <h2 className="text-2xl font-bold mb-8 text-gray-800">Select Your Plan Duration</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {plans.map((plan) => (
                    <button
                      key={plan}
                      onClick={() => setSelectedPlan(plan)}
                      className={`p-6 rounded-xl transition-all duration-300 group relative overflow-hidden
                        ${selectedPlan === plan
                          ? "bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-lg"
                          : "bg-gray-50 text-gray-700 hover:shadow-md"
                        }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                      <div className="flex justify-between items-center">
                        <div className="text-lg font-bold">{plan}</div>
                        {selectedPlan === plan && <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-emerald-600">✓</div>}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Calendar Section */}
              <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-800">Choose Your Start Date</h2>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={handlePrevMonth}
                      className="p-2 rounded-full hover:bg-emerald-100 transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6 text-emerald-600" />
                    </button>

                    <span className="font-medium text-gray-800">
                      {new Date(currentYear, currentMonth).toLocaleDateString('default', { month: 'long', year: 'numeric' })}
                    </span>

                    <button
                      onClick={handleNextMonth}
                      className="p-2 rounded-full hover:bg-emerald-100 transition-colors"
                    >
                      <ChevronRight className="w-6 h-6 text-emerald-600" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8 justify-center">
                  {renderCalendar(0)}
                  {renderCalendar(1)}
                </div>

                {/* Selected Date Range Display */}
                {selectedDates.length > 0 && (
                  <div className="mt-8 p-4 bg-emerald-50 rounded-xl">
                    <h3 className="font-medium text-emerald-800 mb-2">Selected Date Range:</h3>
                    <p className="text-emerald-700">
                      From: {new Date(selectedDates[0]).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </p>
                    <p className="text-emerald-700">
                      To: {new Date(selectedDates[selectedDates.length - 1]).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </p>
                  </div>
                )}

                {/* Reset Selections Button */}
                <div className="flex justify-end mt-8">
                  <button
                    onClick={handleResetSelections}
                    className="px-6 py-3 border-2 border-emerald-600 text-emerald-600 rounded-xl hover:bg-emerald-50 font-medium transition-all duration-300"
                  >
                    Reset Selections
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        if (!selectedDate && selectedDates.length > 0) {
          setSelectedDate(selectedDates[0]);
        }

        return (
          <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white p-6">
            <ToastContainer />
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Customize Your Meals</h2>
                  <p className="text-gray-600">
                    Select your favorite meals for each day of your plan
                  </p>
                </div>
                <div className="bg-emerald-50 rounded-xl p-4">
                  <p className="text-sm font-medium text-emerald-700">
                    You can swap pre-selected favorites for any meal that suits your taste
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
                <div className="flex gap-3 overflow-x-auto mb-8 pb-2 scrollbar-thin scrollbar-thumb-emerald-200 scrollbar-track-gray-100">
                  {selectedDates.map((date) => (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={`px-6 py-3 rounded-xl font-medium whitespace-nowrap transition-all duration-300 ${date === selectedDate
                        ? "bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-md"
                        : "border border-gray-200 text-gray-700 hover:bg-emerald-50 hover:border-emerald-200"
                        }`}
                    >
                      {new Date(date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {selectedDate && mealData[selectedDate] ? (
                    mealData[selectedDate].map((meal) => (
                      <div
                        key={meal._id}
                        className={`rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-white group cursor-pointer
      ${selectedMeals[selectedDate] === meal._id ? 'ring-2 ring-emerald-500' : ''}`}
                        onClick={() => handleMealSelection(selectedDate, meal._id)}
                      >
                        <div className="h-60 overflow-hidden relative">
                          {meal.image && meal.image.length > 0 ? (
                            <img
                              src={meal.image[0]}
                              alt={meal.mealName}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-400">No image available</span>
                            </div>
                          )}
                          {selectedMeals[selectedDate] === meal._id && (
                            <div className="absolute top-3 right-3 bg-emerald-500 text-white p-2 rounded-full flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-gray-800 mb-2">{meal.mealName || "Unnamed Meal"}</h3>
                          <p className="text-gray-600 mb-4 line-clamp-2">{meal.description || "No description available"}</p>
                          <div className="flex justify-between items-center">
                            <div>
                              {meal.fareDetails ? (
                                <>
                                  <span className="line-through text-red-500 text-sm">
                                    ${meal.fareDetails.strikeOff}
                                  </span>{" "}
                                  <span className="text-lg font-bold text-emerald-600">
                                    ${meal.fareDetails.totalFare}
                                  </span>
                                </>
                              ) : (
                                <span className="text-lg font-bold text-emerald-600">Price unavailable</span>
                              )}
                            </div>
                            {meal.fareDetails && meal.fareDetails.discount ? (
                              <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-sm font-medium">
                                Save ${meal.fareDetails.discount}
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-3 py-10 text-center">
                      <p className="text-gray-500">No meals available for the selected date.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Meal selection summary */}
              <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Meal Selection</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Selected Meal</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedDates.map((date) => {
                        const mealId = selectedMeals[date];
                        const mealName = mealData[date]?.find(meal => meal._id === mealId)?.mealName || "No meal selected";

                        return (
                          <tr key={date}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {new Date(date).toLocaleDateString("en-US", {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                              })}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {mealName}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Date range summary */}
              <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Plan Details</h2>
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="bg-gray-50 p-4 rounded-xl flex gap-3 items-center md:flex-1">
                    <Calendar className="text-emerald-600 w-6 h-6" />
                    <div>
              


<p className="text-sm text-gray-500">Date Range</p>
                      <p className="font-medium text-gray-700">
                        {selectedDates.length > 0 ? (
                          <>
                            {new Date(selectedDates[0]).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })} - {new Date(selectedDates[selectedDates.length - 1]).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </>
                        ) : (
                          "No dates selected"
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl flex gap-3 items-center md:flex-1">
                    <ShoppingBag className="text-emerald-600 w-6 h-6" />
                    <div>
                      <p className="text-sm text-gray-500">Plan Type</p>
                      <p className="font-medium text-gray-700">{selectedPlan || "No plan selected"}</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl flex gap-3 items-center md:flex-1">
                    <Gift className="text-emerald-600 w-6 h-6" />
                    <div>
                      <p className="text-sm text-gray-500">Total Meals</p>
                      <p className="font-medium text-gray-700">{selectedDates.length} meals</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex justify-between items-center">
                <button
                  onClick={handleBackClick}
                  className="px-6 py-3 flex items-center gap-2 text-emerald-600 font-medium rounded-xl hover:bg-emerald-50 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Back to Selection
                </button>
                <button
                  onClick={handleConfirmSelection}
                  className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                  disabled={!selectedPlan || selectedDates.length === 0}
                >
                  Continue to Checkout
                </button>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white p-6">
            <ToastContainer />
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12 space-y-4">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
                  Delivery Information
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Please provide your delivery details to complete your order
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Address Form */}
                <div className="md:col-span-2">
                  <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Delivery Address</h2>
                    <form onSubmit={handleAddressSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
                            Street
                          </label>
                          <input
                            type="text"
                            name="street"
                            id="street"
                            value={formData.street}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                            placeholder="Street name"
                          />
                        </div>
                        <div>
                          <label htmlFor="buildingFloor" className="block text-sm font-medium text-gray-700 mb-1">
                            Building/Floor
                          </label>
                          <input
                            type="text"
                            name="buildingFloor"
                            id="buildingFloor"
                            value={formData.buildingFloor}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                            placeholder="Building name or number"
                          />
                        </div>
                        <div>
                          <label htmlFor="houseOrFlatNumber" className="block text-sm font-medium text-gray-700 mb-1">
                            House/Flat Number
                          </label>
                          <input
                            type="text"
                            name="houseOrFlatNumber"
                            id="houseOrFlatNumber"
                            value={formData.houseOrFlatNumber}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                            placeholder="Apartment or house number"
                          />
                        </div>
                        <div>
                          <label htmlFor="landmark" className="block text-sm font-medium text-gray-700 mb-1">
                            Landmark
                          </label>
                          <input
                            type="text"
                            name="landmark"
                            id="landmark"
                            value={formData.landmark}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                            placeholder="Nearby landmark (optional)"
                          />
                        </div>
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                            City
                          </label>
                          <input
                            type="text"
                            name="city"
                            id="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                            placeholder="City"
                          />
                        </div>
                        <div>
                          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                            State/Province
                          </label>
                          <input
                            type="text"
                            name="state"
                            id="state"
                            value={formData.state}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                            placeholder="State/Province"
                          />
                        </div>
                        <div>
                          <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                            Postal Code
                          </label>
                          <input
                            type="text"
                            name="postalCode"
                            id="postalCode"
                            value={formData.postalCode}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                            placeholder="Postal code"
                          />
                        </div>
                        <div>
                          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                            Country
                          </label>
                          <input
                            type="text"
                            name="country"
                            id="country"
                            value={formData.country}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                            placeholder="Country"
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            id="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                            placeholder="Phone number"
                          />
                        </div>
                        <div>
                          <label htmlFor="identifier" className="block text-sm font-medium text-gray-700 mb-1">
                            Address Label
                          </label>
                          <select
                            name="identifier"
                            id="identifier"
                            value={formData.identifier}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                          >
                            <option value="Home">Home</option>
                            <option value="Work">Work</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>
                      <div className="pt-4">
                        <button
                          type="submit"
                          className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                        >
                          Save Address
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="md:col-span-1">
                  <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Order Summary</h2>
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between pb-4 border-b border-gray-100">
                        <span className="text-gray-600">Plan</span>
                        <span className="font-medium text-gray-800">{selectedPlan || "Not selected"}</span>
                      </div>
                      <div className="flex justify-between pb-4 border-b border-gray-100">
                        <span className="text-gray-600">Duration</span>
                        <span className="font-medium text-gray-800">{selectedDates.length} days</span>
                      </div>
                      <div className="flex justify-between pb-4 border-b border-gray-100">
                        <span className="text-gray-600">Starting Date</span>
                        <span className="font-medium text-gray-800">
                          {selectedDates.length > 0
                            ? new Date(selectedDates[0]).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                            : "Not selected"}
                        </span>
                      </div>
                      <div className="flex justify-between pb-4 border-b border-gray-100">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium text-gray-800">$499.00</span>
                      </div>
                      <div className="flex justify-between pb-4 border-b border-gray-100">
                        <span className="text-gray-600">Delivery</span>
                        <span className="font-medium text-emerald-600">Free</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span>$499.00</span>
                      </div>
                    </div>
                    <button
                      onClick={handleCompleteOrder}
                      className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <MapPin className="w-5 h-5" />
                      Complete Order
                    </button>
                    <button
                      onClick={handleBackClick}
                      className="w-full mt-4 py-3 border-2 border-emerald-600 text-emerald-600 font-medium rounded-xl hover:bg-emerald-50 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <ChevronLeft className="w-5 h-5" />
                      Back to Meal Selection
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {renderStepContent()}
    </div>
  );
};

export default MealPlanner;



{profileData.orders.map((order, index) => (
  <div key={index} className="border rounded-lg hover:shadow-md transition">
      {/* Order Summary */}
      <div
          className="p-4 flex justify-between items-center hover:bg-green-50 cursor-pointer transition-colors"
          onClick={() => handleExpandOrder(order)}
      >
          <div>
              <div className="flex justify-between items-center">
                  <p className="font-semibold text-green-900">
                      Order ID: {order.orderID}
                  </p>
                  <p className="ms-2 flex justify-between items-end font-semibold text-blue-900">
                      Total: AED {order.amount}
                  </p>
              </div>

              <p className="text-green-600">{order.selectedPackage?.packageName || "Package"}</p>
              <div className="flex mt-2">
                  <p className="text-sm text-green-500 mr-4">
                      Start Date: {order.startDate?.slice(0, 10) || order.selectedPackage?.startDate}
                  </p>
                  <p className="text-sm text-green-500">
                      End Date: {order.endDate?.slice(0, 10) || order.selectedPackage?.endDate}
                  </p>
              </div>

              {/* Payment Status Indicator */}
              <div className="mt-2">
                  {order.paymentStatus === 0 && (
                      <div className="flex items-center">
                          <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded mr-2">
                              Payment Pending
                          </span>
                          <button
                              onClick={(e) => {
                                  e.stopPropagation();
                                  handlePayNow(order);
                              }}
                              className="bg-green-500 hover:bg-green-600 text-white text-xs font-medium px-3 py-1 rounded transition"
                          >
                              Pay Now
                          </button>
                      </div>
                  )}
                  {order.paymentStatus === 1 && (
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                          Payment Successful
                      </span>
                  )}
                  {order.paymentStatus === 2 && (
                      <div className="flex items-center">
                          <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded mr-2">
                              Payment Failed
                          </span>
                          <button
                              onClick={(e) => {
                                  e.stopPropagation();
                                  handleRetryPayment(order);
                              }}
                              className="bg-green-500 hover:bg-green-600 text-white text-xs font-medium px-3 py-1 rounded transition"
                          >
                              Retry Payment
                          </button>
                      </div>
                  )}
              </div>
          </div>
          <div>
              {expandedOrderId === order.orderID ? (
                  <ChevronUp className="text-green-500" />
              ) : (
                  <Plus className="text-green-500" />
              )}
          </div>
      </div>

      {/* Expandable Package Details */}
      {expandedOrderId === order.orderID && packageDetails[order.orderID] && (
          <div className="p-4 bg-green-50 border-t">
              {packageDetails[order.orderID].data[0].selectedMeals?.map((dayMeal, dayIndex) => (
                  <div key={dayIndex} className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">
                          Meals for {new Date(dayMeal.date).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                          })}
                      </h3>

                      {dayMeal.meals.map((meal, mealIndex) => (
                          <div
                              key={mealIndex}
                              className="mb-4 bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500"
                          >
                              <div className="flex items-start gap-4 mb-3">
                                  {meal.image && meal.image.length > 0 && (
                                      <img
                                          src={meal.image[0]}
                                          alt={meal.mealName}
                                          className="w-24 h-24 object-cover rounded shadow"
                                      />
                                  )}
                                  <div>
                                      {/* Display meal type before meal name */}
                                      {meal.mealType && meal.mealType.length > 0 && (
                                          <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-sm rounded mb-1">
                                              {meal.mealType[0].mealType}
                                          </span>
                                      )}
                                      <h3 className="text-lg font-semibold text-green-800">{meal.mealName}</h3>
                                      <p className="text-green-600">{meal.description}</p>
                                  </div>
                              </div>

                              <div className="grid grid-cols-2 gap-2 mb-3">
                                  <div className="bg-green-100 p-2 rounded">
                                      <p className="text-sm text-green-700">Energy: {meal.moreDetails.energy} kcal</p>
                                      <p className="text-sm text-green-700">Protein: {meal.moreDetails.protein}g</p>
                                  </div>
                                  <div className="bg-green-100 p-2 rounded">
                                      <p className="text-sm text-green-700">Fat: {meal.moreDetails.fat}g</p>
                                      <p className="text-sm text-green-700">Carbs: {meal.moreDetails.carbohydrates}g</p>
                                  </div>
                              </div>

                              {meal.moreDetails.allergens && meal.moreDetails.allergens.length > 0 && (
                                  <div className="bg-red-50 p-2 rounded">
                                      <p className="text-sm text-red-600">
                                          Allergens: {meal.moreDetails.allergens.join(', ')}
                                      </p>
                                  </div>
                              )}
                          </div>
                      ))}
                  </div>
              ))}
          </div>
      )}
  </div>
))}