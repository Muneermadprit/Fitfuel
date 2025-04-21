import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingBag, Calendar, MapPin, Gift } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Info } from 'lucide-react';
import { updateLocale } from 'moment/moment';
import { useNavigate } from 'react-router-dom';


const MealPlanner = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedPlans = location.state?.selectedPlan;
  const [ishandleSelectMeals, setIshandleSelectMeals] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedDates, setSelectedDates] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [mealData, setMealData] = useState([]);
  const [selectedEnhancements, setSelectedEnhancements] = useState([]);
  const [selectedPackageId, setSelectedPackageId] = useState(null);
  // New state to track selected meals for each day
  const [selectedMeals, setSelectedMeals] = useState({});
  const [activeStep, setActiveStep] = useState(1);

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

  const saveSelectionsToSessionStorage = () => {
    const formData = {
      items: sessionStorage.getItem('cartItems') ? JSON.parse(sessionStorage.getItem('cartItems')) : [],
      shippingAddress: sessionStorage.getItem('shippingAddress') ? JSON.parse(sessionStorage.getItem('shippingAddress')) : {},
      paymentMethod: sessionStorage.getItem('paymentMethod') || ''
    };
  };
  const [addons, setAddons] = useState([]);

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
    fetchMealTypes();
  }, []);

  const handleSelection = async (packageId, identifierPackage) => {


    setSelectedPackageId(packageId);
    sessionStorage.setItem("package", packageId);

    try {
      const response = await axios.post(
        "https://api.dailyfit.ae/api/user/get-package-details",
        {
          "key": "identifier",
          "value": identifierPackage
        },
        { withCredentials: true }
      );


      if (response.data && response.data.data) {
        console.log(response.data, "The data api response")
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
                  const processedMeals = mealsList?.map(meal => ({
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
  const formatDate = (dateObj) => {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const [mealType, setMealType] = useState([]);
  const fetchMealTypes = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get("https://api.dailyfit.ae/api/user/get-mealtype", { withCredentials: true });
      setMealType(response.data.data);
      console.log(response.data.data, 'type mael')
    } catch (error) {
      console.error("Error fetching meal types:", error);
    }
  };


  const getMealsByType = (type) => {

    console.log(type, "The type of")
    console.log(mealData, 'The full meal data ')

    const firstMeals = [];


    mealData[selectedDate]?.forEach(meal => {
      const type = meal.mealType[0];
      if (!firstMeals.find(m => m.mealType[0] === type)) {
        firstMeals.push(meal);
      }
    });
    if (ishandleSelectMeals == null) {
      selectedMeals[selectedDate] = firstMeals;

    }

    console.log(selectedDate, "date")

    console.log(firstMeals?.map(m => m._id), "First meal IDs per mealType");


    return mealData[selectedDate]?.filter(meal => meal.mealType?.includes(type));
  };

  // Function to capitalize first letter of each word
  const capitalize = (str) => {
    return str.replace(/\b\w/g, char => char.toUpperCase());
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

  const isDateDisabled = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const twoDaysFromNow = new Date(today);
    twoDaysFromNow.setDate(today.getDate() + 2);

    if (date <= twoDaysFromNow) return true;
    if (selectedPlan?.includes("5 days") && (date.getDay() === 0 || date.getDay() === 6)) return true;
    if (selectedPlan?.includes("6 days") && date.getDay() === 0) return true;

    return false;
  };

  // New function to handle meal selection
  const handleMealSelection = (date, meal, mealType) => {
    setIshandleSelectMeals(1)
    console.log("📦 Selected meal:", meal, "for date:", date, "with type:", mealType);

    // Get current meals for the date or initialize with an empty array
    const currentMeals = selectedMeals[date] || [];

    // Check if the meal type already exists (compare first element of the array)
    const hasMatchingType = currentMeals.some(existingMeal =>
      existingMeal.mealType[0] === mealType[0]
    );

    // If no matching type exists, add the new meal
    if (!hasMatchingType) {
      const updatedMeals = [...currentMeals, { ...meal, mealType }];
      selectedMeals[date] = updatedMeals;
      setSelectedMeals({ ...selectedMeals }); // Assuming this is a state setter
      console.log("➕ Added new meal type", mealType[0]);
      return;
    }

    // Replace only the existing meal with the same type
    const updatedMeals = currentMeals?.map(existingMeal =>
      existingMeal.mealType[0] === mealType[0]
        ? { ...meal, mealType }
        : existingMeal
    );

    setSelectedMeals(prev => ({
      ...prev,
      [date]: updatedMeals
    }));

    console.log(selectedMeals[date], "The selected meals")


    // Assuming this is a state setter

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
      const dateStr = date.toLocaleDateString('en-CA').split('T')[0];
      const isDisabled = isDateDisabled(date);
      const isSelected = selectedDates.includes(dateStr);
      console.log({
        day,
        dateStr,
        isSelected,
        selectedDates,
      });

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
      <div className=" lg:w-[50%] sm:w-full xs:w-60 h-auto  rounded-lg ">
        <h3 className="text-lg font-medium mb-4 text-gray-800">
          {month.toLocaleDateString('default', { month: 'long', year: 'numeric' })}
        </h3>
        <div className="grid grid-cols-7 gap-1 mb-2 ">
          {days?.map(day => (
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
  const handleCompleteOrder = async () => {
    const packageId = sessionStorage.getItem("package");
    const startDate = sessionStorage.getItem("startDate");
    const endDate = sessionStorage.getItem("endDate");
    const selectedMealsFromStorage = sessionStorage.getItem("selectedProducts");

    if (!packageId || !startDate || !endDate) {
      alert("Missing required order details. Please check your selections.");
      return;
    }

    // Parse the stored selectedMeals JSON
    let parsedSelectedMeals;
    try {
      parsedSelectedMeals = JSON.parse(selectedMealsFromStorage);
    } catch (error) {
      console.error("Error parsing selectedProducts from sessionStorage:", error);
      alert("Error with meal selection data. Please try again.");
      return;
    }

    // Extract just the selectedMeals array from the parsed object
    // The structure in storage has an extra wrapper object with selectedMeals key
    const transformData = (selectedMealsObj) => {
      return Object.values(selectedMealsObj)?.map(mealEntry => ({
        date: mealEntry.date,
        meals: mealEntry.meals[0]?.map(meal => meal._id)
      }));
    };

    // Transforming the selectedMeals




    const mealsArray = parsedSelectedMeals.selectedMeals || [];
    const transformedData = transformData(mealsArray);


    const payload = {
      package: packageId,
      startDate: startDate,
      endDate: endDate,
      selectedMeals: transformedData
    };

    console.log(payload, 'cart payload');

    try {
      const response = await axios.post("https://api.dailyfit.ae/api/user/add-to-cart", payload, { withCredentials: true });
      toast.success('Successfully Completed your order! wait for Payment')
      window.location.href = '/summary';
      console.log("Response:", response.data);
    } catch (error) {
      alert("Failed to complete order. Please try again.");
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    if (selectedDates.length > 0 && !selectedDate) {
      setSelectedDate(selectedDates[0]);
    }
  }, [selectedDates, selectedDate]);

  // Load saved selections from session storage on component mount
  useEffect(() => {
    const savedMeals = sessionStorage.getItem("selectedMeals");
    if (savedMeals) {
      setSelectedMeals(JSON.parse(savedMeals));
    }
  }, []);

  // Function to handle removing an add-on
  const handleRemoveAddOn = (item) => {
    const updatedSelections = selectedEnhancements.filter(
      (selected) => selected._id !== item._id
    );
    setSelectedEnhancements(updatedSelections);
  };

  // Function to handle initial selection of an add-on
  const handleSelectionAddOn = (item) => {
    const newItem = { ...item, quantity: 1 };
    setSelectedEnhancements([...selectedEnhancements, newItem]);
  };

  // Function to handle quantity change
  const handleQuantityChange = (item, newQuantity) => {
    const updatedSelections = selectedEnhancements?.map((selected) =>
      selected._id === item._id
        ? { ...selected, quantity: newQuantity }
        : selected
    );
    setSelectedEnhancements(updatedSelections);
  };

  // Function to handle confirming add-ons
  const handleConfirmAddOns = async () => {
    try {
      // Create array with duplicated IDs based on quantity
      const addOnIds = [];
      selectedEnhancements.forEach(item => {
        // Add the ID multiple times based on quantity
        for (let i = 0; i < item.quantity; i++) {
          addOnIds.push(item._id);
        }
      });

      // Make API call using axios
      const response = await axios.patch('https://api.dailyfit.ae/api/user/update-addons', {
        addOns: addOnIds
      }, { withCredentials: true });

      // Handle successful response
      console.log('Add-ons updated successfully:', response.data);
      toast.success('Successfully Added your Addons!')
    } catch (error) {
      console.error('Error updating add-ons:', error.response ? error.response.data : error.message);
    }
  };
  // Step indicators component
  const [showNutritionDetails, setShowNutritionDetails] = useState({});
  useEffect(() => {
    console.log("🟢 selectedMeals updated", selectedMeals);
  }, [selectedMeals]);


  const toggleNutritionDetails = (mealId, e) => {
    e.stopPropagation(); // Prevent triggering the card selection
    setShowNutritionDetails(prev => ({
      ...prev,
      [mealId]: !prev[mealId]
    }));
  };
  const handleContinue = () => {
    if (!selectedPackageId || !selectedPlan || selectedDates.length === 0) {
      toast.error("Please complete all selections before continuing.");
      return;
    }

    toast.success("Plan created successfully");

    setTimeout(() => {
      setActiveStep(2); // <-- ✅ Use setActiveStep instead of setStep
    }, 1000);
  };

  const StepIndicator = ({ step, title, icon }) => {
    const Icon = icon;
    return (

      <div className={`flex flex-col items-center ${activeStep >= step ? 'text-emerald-600' : 'text-gray-400'}`}>
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 transition-all
          ${activeStep === step ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' :
            activeStep > step ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}>
          <Icon className="w-7 h-7" />
        </div>
        <span className="text-xs font-medium">{title}</span>
      </div>
    );
  };



  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return (
          <>

            <div>
              <div className="min-h-screen w-full   ">
                <ToastContainer />
                <div className="md:max-w-7xl w-full  ">
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
                  <div className="grid grid-cols-1 md:grid-cols-3   gap-8 mb-16">
                    {selectedPlans && selectedPlans.packages &&
                      // First group packages by packageGroup, then sort the groups
                      Object.entries(
                        selectedPlans.packages.reduce((groups, packageItem) => {
                          const group = packageItem.packageGroup;
                          if (!groups[group]) {
                            groups[group] = [];
                          }
                          groups[group].push(packageItem);
                          return groups;
                        }, {})
                      )
                        // Sort the groups in the desired order
                        .sort(([groupNameA], [groupNameB]) => {
                          // Define the order priority for group names
                          const order = {
                            'Full Package': 1,
                            'Main Meals with Breakfast': 2,
                            'Main Meals with FITT Snacks': 3
                          };

                          // Normalize group names for case-insensitive comparison
                          const normalizedA = groupNameA.toLowerCase();
                          const normalizedB = groupNameB.toLowerCase();

                          // Get order for each group (default to 4 if not in our list)
                          const aOrder = Object.entries(order).find(([key]) =>
                            key.toLowerCase() === normalizedA
                          )?.[1] || 4;

                          const bOrder = Object.entries(order).find(([key]) =>
                            key.toLowerCase() === normalizedB
                          )?.[1] || 4;

                          return aOrder - bOrder;
                        })
                        // Then map the sorted groups
                        ?.map(([groupName, packages]) => {
                          // Sort packages within each group if needed (optional)
                          const sortedPackages = [...packages].sort((a, b) => {
                            const aName = a.packageName.toLowerCase();
                            const bName = b.packageName.toLowerCase();
                            const order = {
                              'fullpackage': 1,
                              'main meals with breakfast': 2,
                              'main meals with fitt snacks': 3
                            };
                            const aOrder = order[aName] || 4;
                            const bOrder = order[bName] || 4;
                            return aOrder - bOrder;
                          });

                          return (
                            <div key={groupName}
                              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                              <div className="h-3 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
                              <div className="p-8">
                                <div className="flex items-start justify-between mb-6">
                                  <div className="p-3 bg-emerald-100 rounded-xl">
                                    <ShoppingBag className="w-6 h-6 text-emerald-600" />
                                  </div>
                                  <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                                    Perfect for {groupName === "Family" ? "families" : "individuals"}
                                  </span>
                                </div>

                                <h3 className="text-2xl font-bold mb-3 text-gray-800">{groupName}</h3>

                                <div className="space-y-3">
                                  {sortedPackages?.map(packageItem => (
                                    <button
                                      key={packageItem._id}
                                      onClick={() => handleSelection(packageItem._id, packageItem.identifier)}
                                      className={`w-full py-3 px-6 rounded-xl text-left font-medium transition-all duration-300
                    ${selectedPackageId === packageItem._id
                                          ? "bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-md"
                                          : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                                        }`}
                                    >
                                      <div className="flex justify-between items-center">
                                        <span>{packageItem.packageName}</span>
                                        <ChevronRight className={`w-5 h-5 ${selectedPackageId === packageItem._id ? 'rotate-90' : ''}`} />
                                      </div>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          );
                        })
                    }
                  </div>

                  {/* Duration Selection */}
                  <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
                    <h2 className="text-2xl font-bold mb-8 text-gray-800">Select Your Plan Duration</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {plans?.map((plan) => (
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


                </div>
              </div>


            </div>


            {/* Calendar Section */}
            <div className="rounded-2xl shadow-xl  mb-16 p-4 ">
              <div className="flex justify-between items-center mb-8 ">
                <h2 className="text-2xl font-bold text-gray-800">Choose Your Start Date</h2>
                <div className="flex items-center space-x-4 ">
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

              <div className="flex flex-col md:flex-row gap-8 md:p-8  ">
                {renderCalendar(0)}
                {renderCalendar(1)}
              </div>

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
            <div className="text-right">
              <button
                onClick={handleContinue} // Replace with your actual handler
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold shadow-md transition"
              >
                Continue
              </button>
            </div>
          </>
        );

      case 2:
        if (!selectedDate && selectedDates.length > 0) {
          setSelectedDate(selectedDates[0]);
        }

        return (
          <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white p-3 sm:p-4 md:p-6">
            <ToastContainer />
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-start gap-3 mb-4 md:mb-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1 md:mb-2">Customize Your Meals</h2>
                  <p className="text-sm md:text-base text-gray-600">
                    Select your favorite meals for each day of your plan
                  </p>
                </div>
                <div className="bg-emerald-50 rounded-xl p-3 w-full md:w-auto mt-2 md:mt-0">
                  <p className="text-xs md:text-sm font-medium text-emerald-700">
                    You can swap pre-selected favorites for any meal that suits your taste
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg md:rounded-2xl shadow-md md:shadow-xl  md:p-6 mb-8">
                <div className="flex gap-2 overflow-x-auto mb-4 md:mb-6 pb-2 scrollbar-thin scrollbar-thumb-emerald-200 scrollbar-track-gray-100">
                  {selectedDates?.map((date) => (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={`px-3 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl text-sm md:text-base font-medium whitespace-nowrap transition-all duration-300 ${date === selectedDate
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

                <div className="flex flex-col gap-6">  {/* Vertical layout for meal types */}
                  {selectedDate && mealType ? (
                    mealType?.map((type) => {
                      const meals = getMealsByType(type.identifier);

                      if (meals?.length > 0) {
                        return (
                          <div key={type.identifier} className="space-y-2">
                            {/* Meal type header */}
                            <h3 className="text-lg font-semibold">{type.mealType}</h3>

                            {/* Horizontally scrollable meal cards */}
                            <div className="grid grid-cols-2 md:grid-cols-4 pb-4 gap-3 md:gap-5 ">
                              {meals?.map((meal) => (
                                <div
                                  key={meal._id}
                                  className="snap-start flex-shrink-0 w-full sm:w-full md:w-full"
                                >
                                  <div
                                    className={`rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-white group cursor-pointer
          ${selectedMeals[selectedDate]?.some(m => m._id === meal._id) ? 'ring-2 ring-emerald-500' : ''}`}
                                    onClick={() => handleMealSelection(selectedDate, meal, meal.mealType)}
                                  >
                                    <div className="h-40 md:h-48 overflow-hidden relative">
                                      {meal.image && meal.image.length > 0 ? (
                                        <img
                                          src={meal.image[0]}
                                          alt={meal.mealName}
                                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                      ) : (
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                          <span className="text-gray-400 text-sm">No image available</span>
                                        </div>
                                      )}
                                      {selectedMeals[selectedDate]?.some(m => m._id === meal._id) && (
                                        <div className="absolute top-2 right-2 bg-emerald-500 text-white p-1 rounded-full flex items-center justify-center">
                                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                          </svg>
                                        </div>
                                      )}
                                    </div>

                                    <div className="p-3 md:p-4">
                                      <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{meal.mealName || "Unnamed Meal"}</h3>
                                        <button
                                          onClick={(e) => toggleNutritionDetails(meal._id, e)}
                                          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                                        >
                                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1v-3a1 1 0 00-1-1z" clipRule="evenodd" />
                                          </svg>
                                        </button>
                                      </div>

                                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                        {meal.description || "No description available"}
                                      </p>

                                      {/* Nutrition Details Panel */}
                                      {showNutritionDetails[meal._id] && meal.moreDetails && (
                                        <div className="mt-2 pt-2 border-t border-gray-200 absolute xs:z-50 md: bg-white shadow-2xl p-2 rounded-sm">
                                          <h4 className="font-medium text-sm text-gray-700 mb-1">Nutrition Information</h4>
                                          <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-sm">
                                            <div className="flex justify-between">
                                              <span className="text-gray-600">Energy:</span>
                                              <span className="font-medium">{meal.moreDetails.energy} kcal</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-gray-600">Protein:</span>
                                              <span className="font-medium">{meal.moreDetails.protein}g</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-gray-600">Carbs:</span>
                                              <span className="font-medium">{meal.moreDetails.carbohydrates}g</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-gray-600">Fat:</span>
                                              <span className="font-medium">{meal.moreDetails.fat}g</span>
                                            </div>
                                          </div>

                                          <h4 className="font-medium text-sm text-gray-700 mt-2 mb-1">Allergens</h4>
                                          <div className="flex flex-wrap gap-1">
                                            {meal.moreDetails.allergens && meal.moreDetails.allergens.map((allergen, index) => (
                                              <span key={index} className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                                                {allergen}
                                              </span>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })
                  ) : null}
                </div>

              </div>



              {/* Confirm button */}
              <div className="flex justify-center mb-8 md:mb-12">
                <button
                  onClick={handleConfirmSelection}
                  className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold text-base md:text-lg rounded-lg md:rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                >
                  Confirm Selection
                </button>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Choose Your Add-ons <span className="text-sm text-gray-500">(Optional) If u dont need You can Skip!</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {console.log(addons, "The addon list"
              )}
              {addons?.map((item) => {
                const isSelected = selectedEnhancements.some((selected) => selected._id === item._id);
                const selectedItem = selectedEnhancements.find((selected) => selected._id === item._id);
                const quantity = selectedItem ? selectedItem.quantity || 1 : 0;

                return (
                  <div
                    key={item._id}
                    className={`rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 relative group
                    ${isSelected ? "ring-2 ring-emerald-500" : ""}
                  `}
                    role="region"
                    aria-label={`${item.mealName} add-on option`}
                  >
                    <div className="h-40 overflow-hidden">
                      <img
                        src={item.image[0]}
                        alt={item.mealName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="text-lg font-bold text-gray-800 mb-1">{item.mealName}</h3>
                      <p className="text-emerald-600 font-medium">
                        AED {item.fareDetails.totalFare.toFixed(2)} / day
                      </p>

                      <div className="mt-4 flex items-center justify-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (quantity > 0) {
                              if (quantity === 1) {
                                handleRemoveAddOn(item);
                              } else {
                                handleQuantityChange(item, quantity - 1);
                              }
                            }
                          }}
                          className={`bg-emerald-500 hover:bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-emerald-300 ${quantity === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                          aria-label="Decrease quantity"
                          disabled={quantity === 0}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <span className="mx-3 font-medium text-gray-700 min-w-[24px] text-center">{quantity}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (quantity === 0) {
                              handleSelectionAddOn(item);
                            } else {
                              handleQuantityChange(item, quantity + 1);
                            }
                          }}
                          className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-emerald-300"
                          aria-label="Increase quantity"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {isSelected && (
                      <div className="absolute top-3 right-3 bg-emerald-500 text-white p-1 rounded-full shadow-md">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Confirmation button */}
            {selectedEnhancements.length > 0 && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={handleConfirmAddOns}
                  className="py-3 px-8 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-base font-medium transition-all duration-300 shadow-md flex items-center space-x-2"
                  aria-label="Confirm selected add-ons"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Confirm Add-ons</span>
                </button>
              </div>
            )}
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => setActiveStep(4)}
                className="py-3 px-8 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-base font-medium transition-all duration-300 shadow-md flex items-center space-x-2"
                aria-label="Skip add-ons"
              >
                Skip
              </button>
            </div>
          </div>
        );

      case 4:
        return (

          <div className="max-w-2xl mx-auto">
            {sessionStorage.getItem('userType') === '1' ? (
              <>
                <ToastContainer />
                <div className="mb-6 text-center">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Shipping Address</h2>
                  <p className="bg-yellow-100 text-green-700 font-semibold px-3 py-2 rounded-md">
                    If you have already added your address, you can skip this step
                  </p>

                  {/* <p className="text-gray-600">If you have already added your address, you can skip this step</p> */}
                </div>
                <form className="space-y-6" onSubmit={handleAddressSubmit}>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                      <input
                        type="text"
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-0"
                        required />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Building Floor</label>
                      <input
                        type="text"
                        name="buildingFloor"
                        value={formData.buildingFloor}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-0" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">House/Flat Number</label>
                      <input
                        type="text"
                        name="houseOrFlatNumber"
                        value={formData.houseOrFlatNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-0" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Landmark</label>
                      <input
                        type="text"
                        name="landmark"
                        value={formData.landmark}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-0" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-0"
                        required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">State/Province</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-0"
                        required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-0"
                        required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-0"
                        required />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-0"
                        required />
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      className="flex-1 bg-[#059033] text-white py-3 rounded-xl font-medium transition hover:bg-[#047029]"
                    >
                      Submit Address
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        navigate('/summary');
                        // saveSelectionsToSessionStorage();
                        // handleCompleteOrder();
                      }}
                      className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-medium transition hover:bg-gray-300"
                    >
                      Skip
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center py-10">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Please Login to Continue</h2>
                  <p className="text-gray-600">You need to be logged in to access this feature</p>
                </div>
                <button
                  onClick={() => window.location.href = '/Order'}
                  className="bg-[#059033] text-white py-3 px-8 rounded-xl font-medium transition hover:bg-[#047029]"
                >
                  Go to Login
                </button>
              </div>
            )}
          </div>
        );
    }
  };
  const handleConfirmSelection = () => {
    if (selectedDates.length === 0) {
      console.warn("No dates selected");
      return;
    }

    const startDate = selectedDates[0];
    const endDate = selectedDates[selectedDates.length - 1];

    const selectedMealsArray = selectedDates?.map((date) => ({
      date,
      meals: selectedMeals[date] ? [selectedMeals[date]] : [],
    }));

    const formattedData = {
      selectedMeals: selectedMealsArray,
    };
    toast.success("Menu added successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    console.log("Selected Products:", formattedData);
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
    sessionStorage.setItem("selectedProducts", JSON.stringify(formattedData));
    sessionStorage.setItem("startDate", startDate);
    sessionStorage.setItem("endDate", endDate);
    setTimeout(() => {
      setActiveStep(3);
    }, 1600);

    // console.log("Selected Meals:", JSON.stringify(formattedData, null, 2));
  };

  const handleBackClick = () => {
    // Determine the previous step based on current step
    const previousStep = Math.max(1, activeStep - 1);

    // Reset any necessary state for the previous step
    switch (previousStep) {
      case 1:
        // If going back to step 1, you might want to reset some selections
        setSelectedPackageId(null);
        setSelectedPlan(null);
        break;
      case 2:
        // If going back to step 2, reset meal selections if needed
        setSelectedDate(null);
        setSelectedMeals({});
        break;
      case 3:
        // If going back to step 3, reset enhancements
        setSelectedEnhancements([]);
        break;
    }

    // Set the active step to the previous step
    setActiveStep(previousStep);
  };


  return (

    <div className="min-h-screen bg-gray-50 p-6">
      <div className="md:max-w-6xl w-full mx-auto">
        {/* Progress Steps */}
        <div className="flex flex-wrap justify-between items-center mb-12 gap-2 w-full">
          {[1, 2, 3, 4]?.map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 sm:w-10  gap-2 sm:h-10 rounded-full sm:rounded-xl flex items-center justify-center font-semibold text-sm sm:text-base
        ${activeStep >= step ? 'bg-[#059033] text-white' : 'bg-gray-200 text-gray-600'}`}>
                {step}
              </div>
              {step <= 4 && (
                <div className={`w-12 sm:w-16 md:w-24 h-1 mx-1 sm:mx-2
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
                activeStep === 3 ? 'Add your Addon Products' :
                  'Where should we deliver your meals? '}
          </p>
        </div>

        {renderStepContent()}
      </div>
    </div>
  );
};

export default MealPlanner;