import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Users, Clock, Utensils } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import axios from "axios";
const MealPlanner = () => {
  const location = useLocation();
  const selectedPlans = location.state?.selectedPlan;
  // Console log to verify the data was received
  console.log('Received Plan Data:', selectedPlans);
  const [activeStep, setActiveStep] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedDates, setSelectedDates] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);

  // Set the first selected date as the active date when moving to step 2
  useEffect(() => {
    if (activeStep === 2 && selectedDates.length > 0 && !selectedDate) {
      setSelectedDate(selectedDates[0]);
    }
  }, [activeStep, selectedDates, selectedDate]);
  const [selectedMeals, setSelectedMeals] = useState({});

  useEffect(() => {
    if (selectedDate) {
      const initialSelections = {};
      ['breakfast', 'lunch', 'dinner'].forEach(mealType => {
        const defaultMeal = mealData[selectedDate]?.[mealType]?.find(meal => meal.default);
        if (defaultMeal) {
          initialSelections[`${selectedDate}-${mealType}`] = defaultMeal.id;
        }
      });
      setSelectedMeals(prev => ({ ...prev, ...initialSelections }));
    }
  }, [selectedDate]);

  const packages = [
    {
      id: 'fullPackage',
      title: 'Full Package',
      icon: <Users className="w-6 h-6" />,
      subtitle: 'Perfect for families',
      description: 'Complete daily nutrition with all meals included',
      options: [
        '⭐ 2 Main Meals with Breakfast & FITT Snack',
        '1 Main Meal with Breakfast & FITT Snack'
      ]
    },
    {
      id: 'mainMealsWithBreakfast',
      title: 'Main Meals with Breakfast',
      icon: <Clock className="w-6 h-6" />,
      subtitle: 'Start your day right',
      description: 'Essential meals to power your morning and afternoon',
      options: [
        '⭐ 2 Main Meals with Breakfast',
        '1 Main Meal with Breakfast'
      ]
    },
    {
      id: 'mainMealsWithSnacks',
      title: 'Main Meals with FITT Snacks',
      icon: <Utensils className="w-6 h-6" />,
      subtitle: 'Balanced nutrition',
      description: 'Perfect combination of main meals and healthy snacks',
      options: [
        '2 Main Meals & FITT Snack',
        '1 Main Meal & FITT Snack'
      ]
    }
  ];

  const plans = [
    "MONTHLY (6 days per week)",
    "MONTHLY (5 days per week)",
    "WEEKLY (6 days)",
    "WEEKLY (5 days)"
  ];

  const handleSelection = (packageId, option, identifierPakage) => {
    console.log(identifierPakage, 'tttt')
    try {
      const response = axios.post('https://api.dailyfit.ae/api/user/get-package-details', { packageId, identifierPakage });
      console.log('API Response:', response.data);
    } catch (error) {
      console.error('API Error:', error);
    }
    // Clear other selections
    setSelectedOptions({
      [packageId]: option
    });
  };

  const isSelected = (packageId, option) => {
    return selectedOptions[packageId] === option;
  };

  const isDateDisabled = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const twoDaysFromNow = new Date(today);
    twoDaysFromNow.setDate(today.getDate() + 2);

    // Disable dates before today and next 2 days
    if (date <= twoDaysFromNow) return true;

    // Disable certain dates based on plan
    if (selectedPlan?.includes("5 days") && (date.getDay() === 0 || date.getDay() === 6)) return true;
    if (selectedPlan?.includes("6 days") && date.getDay() === 0) return true;

    return false;
  };

  const handleDateSelection = (date) => {
    if (isDateDisabled(date)) return;

    if (selectedPlan?.includes("MONTHLY")) {
      const daysToSelect = selectedPlan.includes("5 days") ? 20 : 24;
      const validDates = [];
      let currentDate = new Date(date);
      let daysAdded = 0;

      while (daysAdded < daysToSelect) {
        if (!isDateDisabled(new Date(currentDate))) {
          validDates.push(new Date(currentDate));
          daysAdded++;
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }

      setSelectedDates(validDates.map(d => d.toISOString().split('T')[0]));
    } else if (selectedPlan?.includes("WEEKLY")) {
      const daysToSelect = selectedPlan.includes("5 days") ? 5 : 6;
      const validDates = [];
      let currentDate = new Date(date);

      while (validDates.length < daysToSelect) {
        if (!isDateDisabled(new Date(currentDate))) {
          validDates.push(new Date(currentDate));
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }

      setSelectedDates(validDates.map(d => d.toISOString().split('T')[0]));
    }
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
          className={`w-10 h-10 rounded-full text-sm transition-colors ${isDisabled
            ? "text-gray-300 cursor-not-allowed"
            : isSelected
              ? "bg-[#059033] text-white"
              : "hover:bg-gray-100"
            }`}
        >
          {day}
        </button>
      );
    }

    return (
      <div className="w-72">
        <h3 className="text-lg font-medium mb-4">
          {month.toLocaleDateString('default', { month: 'long', year: 'numeric' })}
        </h3>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {days.map(day => (
            <div key={day} className="w-10 h-10 flex items-center justify-center text-sm text-gray-500">
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
  const enhancements = [
    {
      id: 1,
      name: "Premium Breakfast",
      pricePerDay: 10.0,
      image: "/api/placeholder/80/80",
    },
    {
      id: 2,
      name: "Gym Access",
      pricePerDay: 15.0,
      image: "/api/placeholder/80/80",
    },
    {
      id: 3,
      name: "Pool Access",
      pricePerDay: 12.0,
      image: "/api/placeholder/80/80",
    },
    {
      id: 4,
      name: "Spa Session",
      pricePerDay: 20.0,
      image: "/api/placeholder/80/80",
    },
    {
      id: 5,
      name: "Private Lounge",
      pricePerDay: 25.0,
      image: "/api/placeholder/80/80",
    },
    {
      id: 6,
      name: "Late Checkout",
      pricePerDay: 8.0,
      image: "/api/placeholder/80/80",
    },
    {
      id: 7,
      name: "Room Service",
      pricePerDay: 18.0,
      image: "/api/placeholder/80/80",
    },
    {
      id: 8,
      name: "Complimentary Drinks",
      pricePerDay: 5.0,
      image: "/api/placeholder/80/80",
    },
  ];


  const mealData = {
    "2024-02-17": {
      breakfast: [
        {
          id: 'b1',
          name: "Classic Oatmeal Bowl",
          weight: "350g",
          image: "/api/placeholder/400/300",
          nutrition: {
            energy: "320 kcal",
            protein: "12g",
            fat: "8g",
            carbohydrates: "54g"
          },
          default: true
        },
        {
          id: 'b2',
          name: "Greek Yogurt Parfait",
          weight: "300g",
          image: "/api/placeholder/400/300",
          nutrition: {
            energy: "280 kcal",
            protein: "15g",
            fat: "6g",
            carbohydrates: "42g"
          }
        },
        {
          id: 'b3',
          name: "Protein Pancakes",
          weight: "320g",
          image: "/api/placeholder/400/300",
          nutrition: {
            energy: "350 kcal",
            protein: "18g",
            fat: "9g",
            carbohydrates: "48g"
          }
        },
        {
          id: 'b4',
          name: "Avocado Toast",
          weight: "280g",
          image: "/api/placeholder/400/300",
          nutrition: {
            energy: "310 kcal",
            protein: "14g",
            fat: "16g",
            carbohydrates: "32g"
          }
        }
      ],
      lunch: [
        {
          id: 'l1',
          name: "Grilled Chicken Salad",
          weight: "400g",
          image: "/api/placeholder/400/300",
          nutrition: {
            energy: "420 kcal",
            protein: "35g",
            fat: "22g",
            carbohydrates: "28g"
          },
          default: true
        },
        {
          id: 'l2',
          name: "Quinoa Buddha Bowl",
          weight: "380g",
          image: "/api/placeholder/400/300",
          nutrition: {
            energy: "380 kcal",
            protein: "16g",
            fat: "18g",
            carbohydrates: "46g"
          }
        },
        {
          id: 'l3',
          name: "Salmon Poke Bowl",
          weight: "420g",
          image: "/api/placeholder/400/300",
          nutrition: {
            energy: "450 kcal",
            protein: "32g",
            fat: "24g",
            carbohydrates: "38g"
          }
        },
        {
          id: 'l4',
          name: "Mediterranean Wrap",
          weight: "350g",
          image: "/api/placeholder/400/300",
          nutrition: {
            energy: "390 kcal",
            protein: "18g",
            fat: "16g",
            carbohydrates: "48g"
          }
        }
      ],
      dinner: [
        {
          id: 'd1',
          name: "Grilled Salmon",
          weight: "380g",
          image: "/api/placeholder/400/300",
          nutrition: {
            energy: "460 kcal",
            protein: "38g",
            fat: "26g",
            carbohydrates: "24g"
          },
          default: true
        },
        {
          id: 'd2',
          name: "Vegetarian Stir-Fry",
          weight: "400g",
          image: "/api/placeholder/400/300",
          nutrition: {
            energy: "380 kcal",
            protein: "16g",
            fat: "14g",
            carbohydrates: "52g"
          }
        },
        {
          id: 'd3',
          name: "Lean Beef Bowl",
          weight: "420g",
          image: "/api/placeholder/400/300",
          nutrition: {
            energy: "480 kcal",
            protein: "42g",
            fat: "22g",
            carbohydrates: "36g"
          }
        },
        {
          id: 'd4',
          name: "Turkey Meatballs",
          weight: "380g",
          image: "/api/placeholder/400/300",
          nutrition: {
            energy: "420 kcal",
            protein: "36g",
            fat: "18g",
            carbohydrates: "42g"
          }
        }
      ]
    }
  };

  // Add these functions to your component

  // Check if selection is complete before enabling "Continue" button
  const isSelectionComplete = () => {
    // Check if at least one package is selected
    const hasPackageSelection = Object.keys(selectedOptions).length > 0;

    // Check if duration is selected
    const hasDurationSelection = selectedPlan !== null;

    // Check if start date is selected
    const hasDateSelection = selectedDates.length > 0;

    return hasPackageSelection && hasDurationSelection && hasDateSelection;
  };

  // Save selections to session storage
  const saveSelectionsToSessionStorage = () => {
    // Create an object with all the selections
    const selections = {
      packages: selectedOptions,
      duration: selectedPlan,
      startDate: selectedDates.length > 0 ? selectedDates[0] : null, // First date as start date
      endDate: selectedDates.length > 0 ? selectedDates[selectedDates.length - 1] : null,
      // Save ALL selected dates, not just the first one
      selectedDates: selectedDates,
      selectedAt: new Date().toISOString(),
      step: activeStep
    };

    // Save to session storage
    sessionStorage.setItem('mealPlanSelections', JSON.stringify(selections));

    // Log for debugging
    console.log('Selections saved to session storage:', selections);
  };


  // Add this to your component's useEffect to load from session storage on initial render
  useEffect(() => {
    // Check if there are saved selections in session storage
    const savedSelections = sessionStorage.getItem('mealPlanSelections');

    if (savedSelections) {
      console.log(savedSelections, 'uuuu')
      try {
        const parsedSelections = JSON.parse(savedSelections);

        // Restore selections from session storage
        if (parsedSelections.packages) {
          setSelectedOptions(parsedSelections.packages);
        }

        if (parsedSelections.duration) {
          setSelectedPlan(parsedSelections.duration);
        }

        // Restore ALL selected dates
        if (parsedSelections.selectedDates && Array.isArray(parsedSelections.selectedDates)) {
          setSelectedDates(parsedSelections.selectedDates);
        }

        // Restore step if available
        if (parsedSelections.step) {
          setActiveStep(parsedSelections.step);
        }

        // Log for debugging
        console.log('Selections loaded from session storage:', parsedSelections);
      } catch (error) {
        console.error("Error parsing saved selections:", error);
        // Clear corrupted data
        sessionStorage.removeItem('mealPlanSelections');
      }
    }
  }, []);
  // useEffect(() => {
  //   // Check if there are saved selections in session storage
  //   const savedSelections = sessionStorage.getItem('mealPlanSelections');

  //   if (savedSelections) {
  //     try {
  //       const parsedSelections = JSON.parse(savedSelections);

  //       // Restore selections from session storage
  //       if (parsedSelections.packages) {
  //         setSelectedOptions(parsedSelections.packages);
  //       }

  //       if (parsedSelections.duration) {
  //         setSelectedPlan(parsedSelections.duration);
  //       }

  //       // Restore ALL selected dates, not just the first one
  //       if (parsedSelections.selectedDates && Array.isArray(parsedSelections.selectedDates)) {
  //         setSelectedDates(parsedSelections.selectedDates);
  //       }

  //       // Restore step if available
  //       if (parsedSelections.step) {
  //         setActiveStep(parsedSelections.step);
  //       }
  //     } catch (error) {
  //       console.error("Error parsing saved selections:", error);
  //       // Clear corrupted data
  //       sessionStorage.removeItem('mealPlanSelections');
  //     }
  //   }
  // }, []);

  // You might want to add a reset function if needed
  const resetSelections = () => {
    setSelectedOptions({});
    setSelectedPlan(null);
    setSelectedDates([]);
    sessionStorage.removeItem('mealPlanSelections');
  };

  const handleMealSelection = (date, mealType, mealId) => {
    setSelectedMeals(prev => ({
      ...prev,
      [`${date}-${mealType}`]: mealId
    }));
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return (
          <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-4">
            <div className="max-w-7xl mx-auto">
              {/* Header Section */}
              <div className="text-center mb-12 space-y-4">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Customize Your Meal Plan
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Choose from our carefully crafted meal packages designed to meet your nutritional needs
                </p>
              </div>

              {/* Package Selection */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {packages.map((pkg) => (
                  <div key={pkg.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-2 bg-green-100 rounded-lg">
                        {pkg.icon}
                      </div>
                      <span className="text-sm font-medium text-[#059033]">{pkg.subtitle}</span>
                    </div>

                    <h3 className="text-xl font-semibold mb-2">{pkg.title}</h3>
                    <p className="text-gray-600 text-sm mb-6">{pkg.description}</p>

                    <div className="space-y-3">
                      {selectedPlans.packages.map((packageItem) => (
                        <button
                          key={`${pkg.id}-${packageItem._id}`}
                          onClick={() => handleSelection(pkg.id, packageItem._id, packageItem.identifier)}
                          className={`w-full p-4 rounded-lg text-left text-sm font-medium transition-all
              ${isSelected(pkg.id, packageItem._id)
                              ? "bg-[#059033] text-white shadow-md"
                              : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                            }`}
                        >
                          {packageItem.packageName}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>


              {/* Duration Selection */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <h2 className="text-xl font-semibold mb-6">Select Duration</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {plans.map((plan) => (
                    <button
                      key={plan}
                      onClick={() => setSelectedPlan(plan)}
                      className={`p-6 rounded-lg transition-all text-dark font-semibold
        ${selectedPlan === plan
                          ? "bg-[#059033] shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-[#059033] hover:text-white"
                        }`}
                    >
                      <div className="text-lg">{plan}</div>
                    </button>
                  ))}
                </div>
              </div>


              {/* Calendar Section */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Start Date</h2>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={handlePrevMonth}
                      className="p-2 hover:bg-[#059033] hover:text-white rounded-lg transition"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    <span className="font-medium">
                      {new Date(currentYear, currentMonth).toLocaleDateString('default', { month: 'long', year: 'numeric' })}
                    </span>

                    <button
                      onClick={handleNextMonth}
                      className="p-2 hover:bg-[#059033] hover:text-white rounded-lg transition"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8 overflow-x-auto">
                  {renderCalendar(0)}
                  {renderCalendar(1)}
                </div>

                {/* Reset Selections Button */}
                <div className="flex justify-end mt-6">
                  <button
                    onClick={() => {
                      setSelectedOptions({});
                      setSelectedPlan(null);
                      setSelectedDates([]);
                    }}
                    className="px-8 py-3 border-2 bg-[#059033] text-white rounded-lg hover:bg-[#059033] hover:text-white font-medium transition"
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
          <div className="p-4 md:p-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
              <h2 className="text-xl md:text-2xl font-semibold">Meal selection</h2>
              <p className="text-sm font-medium text-gray-600">
                Swap pre-selected favourites by choosing yours
              </p>
            </div>

            <div className="flex gap-3 overflow-x-auto mb-6 pb-2">
              {selectedDates.map((date) => (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`px-6 py-3 rounded-full font-medium whitespace-nowrap
                  ${date === selectedDate
                      ? "bg-[#059033] text-white"
                      : "border border-gray-300 text-gray-700 hover:bg-gray-50"}`}
                >
                  {new Date(date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric'
                  })}
                </button>
              ))}
            </div>

            <div className="space-y-12">
              {['breakfast', 'lunch', 'dinner'].map((mealType) => (
                <div key={mealType}>
                  <h3 className="text-xl font-semibold mb-6 capitalize">{mealType}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {mealData[selectedDate]?.[mealType]?.map((meal) => {
                      const isSelected = selectedMeals[`${selectedDate}-${mealType}`] === meal.id;

                      return (
                        <div
                          key={meal.id}
                          className={`bg-white rounded-xl shadow-sm transition-all 
                        ${isSelected ? 'ring-2 ring-[#059033]' : 'hover:shadow-md'}`}
                        >
                          <img
                            src={meal.image}
                            alt={meal.name}
                            className="w-full h-48 object-cover rounded-t-xl"
                          />
                          <div className="p-4">
                            <h4 className="font-medium mb-1">{meal.name}</h4>
                            <p className="text-sm text-gray-600 mb-3">{meal.weight}</p>

                            <div className="text-sm space-y-1 mb-4">
                              <p>Energy: {meal.nutrition.energy}</p>
                              <p>Protein: {meal.nutrition.protein}</p>
                              <p>Fat: {meal.nutrition.fat}</p>
                              <p>Carbs: {meal.nutrition.carbohydrates}</p>
                            </div>

                            <button
                              onClick={() => handleMealSelection(selectedDate, mealType, meal.id)}
                              className={`w-full py-2 rounded-lg font-medium transition-colors 
                            ${isSelected
                                  ? 'bg-[#059033] text-white'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                            >
                              {isSelected ? 'SELECTED' : 'SELECT'}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );


      case 3:
        return (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Enhance Your Plan</h2>
                <button className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all flex items-center gap-3 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500">
                  SKIP
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.243 7.032a.75.75 0 010 1.06l-3.5 3.5a.75.75 0 01-1.06 0l-3.5-3.5a.75.75 0 011.06-1.06l2.47 2.47 2.47-2.47a.75.75 0 011.06 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {enhancements.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow border border-gray-200 flex flex-col items-center text-center"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-full object-cover border-4 border-green-400"
                    />
                    <h3 className="mt-4 text-lg font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600 font-medium">AED {item.pricePerDay.toFixed(2)} / day</p>
                    <input
                      type="checkbox"
                      className="mt-4 w-6 h-6 text-green-600 border-gray-300 rounded focus:ring-green-500 focus:outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="max-w-2xl mx-auto">
            <div className="mb-8 text-center">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-0"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-0"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-0"
                  />
                </div>
              </div>
            </div>
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-0"
                    placeholder="Enter your street address"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Apartment/Unit (Optional)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-0"
                    placeholder="Apt, Suite, Unit, etc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State/Province</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-0"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Instructions (Optional)</label>
                  <textarea
                    className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-0"
                    rows={3}
                    placeholder="Add any special instructions for delivery"
                  />
                </div>
              </div>
            </form>
          </div>
        );

        // case 3:
        return (
          <div className="max-w-2xl mx-auto">
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-0"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-0"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Address</label>
                  <textarea
                    className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-0"
                    rows={3}
                  />
                </div>
              </div>
            </form>
          </div>
        );
    }
  };

  return (

    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Progress Steps */}
        <div className="flex justify-between items-center mb-12">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-semibold
      ${activeStep >= step ? 'bg-[#059033] text-white' : 'bg-gray-200 text-gray-600'}`}>
                {step}
              </div>
              {step < 4 && (
                <div className={`w-24 h-1 mx-2 
        ${activeStep > step ? 'bg-[#059033]' : 'bg-gray-200'}`}
                />
              )}
            </div>
          ))}
        </div>


        {/* Step Content */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">
            {activeStep === 1 ? 'Choose Your Plan' :
              activeStep === 2 ? 'Select Your Meals' :
                activeStep === 3 ? 'Enhancement Products' :
                  'Delivery Details'}
          </h2>
          <p className="text-gray-600">
            {activeStep === 1 ? 'Select a meal plan that fits your lifestyle' :
              activeStep === 2 ? 'Customize your weekly menu' :
                activeStep === 3 ? 'Tell us how to reach you' :
                  'Where should we deliver your meals?'}
          </p>
        </div>

        {renderStepContent()}

        {/* Navigation */}
        <div className="flex justify-between mt-12">
          <button
            onClick={() => {
              // Save selections to session storage before proceeding
              saveSelectionsToSessionStorage();
              // Then navigate to next step
              setActiveStep(Math.min(4, activeStep + 1));
            }}
            // onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
            className="px-6 py-2 rounded-xl border-2 border-[#059033] text-[#059033] hover:bg-green-50"
          >
            Back
          </button>
          <button
            onClick={() => setActiveStep(Math.min(4, activeStep + 1))}
            className="px-6 py-2 rounded-xl bg-[#059033] text-white hover:bg-green-700"
          >
            {activeStep === 4 ? 'Complete Order' : 'Continue'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default MealPlanner;
