// import React, { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight, Users, Clock, Utensils } from 'lucide-react';
// import { useLocation } from 'react-router-dom';
// import axios from "axios";
// const MealPlanner = () => {
//   const location = useLocation();
//   const selectedPlans = location.state?.selectedPlan;
//   // Console log to verify the data was received
//   console.log('Received Plan:', selectedPlans);
//   const [activeStep, setActiveStep] = useState(1);
//   const [selectedOptions, setSelectedOptions] = useState({});
//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const [selectedDates, setSelectedDates] = useState([]);
//   const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
//   const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [mealData, setMealData] = useState([]);
//   const [selectedEnhancements, setSelectedEnhancements] = useState([]);
//   const plans = [
//     "MONTHLY (6 days per week)",
//     "MONTHLY (5 days per week)",
//     "WEEKLY (6 days)",
//     "WEEKLY (5 days)"
//   ];
//   const [formData, setFormData] = useState({
//     street: "",
//     buildingFloor: "",
//     houseOrFlatNumber: "",
//     landmark: "",
//     city: "",
//     state: "",
//     postalCode: "",
//     country: "",
//     phone: "",
//     identifier: "Home", // Default identifier
//   });

//   const handleAddressSubmit = async (e) => {
//     e.preventDefault();

//     const payload = { address: formData };

//     try {
//       const response = await axios.post("https://api.dailyfit.ae/api/user/add-address", payload, { withCredentials: true });
//       alert("Address added successfully!");
//       console.log("Response:", response.data);
//     } catch (error) {
//       alert("Failed to add address. Please try again.");
//       console.error("Error:", error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = { address: formData };

//     try {
//       const response = await axios.post("https://api.dailyfit.ae/api/user/add-address", payload, {
//         headers: { "Content-Type": "application/json" },
//       });
//       alert("Address added successfully!");
//       console.log("Response:", response.data);
//     } catch (error) {
//       alert("Failed to add address. Please try again.");
//       console.error("Error:", error);
//     }
//   };

//   const [selectedPackage, setSelectedPackage] = useState({
//     packageId: null,
//     planId: null
//   });

//   const isSelected = (packageId, planId) => {
//     return selectedPackage.packageId === packageId && selectedPackage.planId === planId;
//   };


//   const saveSelectionsToSessionStorage = () => {
//     // Get current form data (this would be your form state)
//     const formData = {
//       // Example data - replace with your actual form state
//       items: sessionStorage.getItem('cartItems') ? JSON.parse(sessionStorage.getItem('cartItems')) : [],
//       shippingAddress: sessionStorage.getItem('shippingAddress') ? JSON.parse(sessionStorage.getItem('shippingAddress')) : {},
//       paymentMethod: sessionStorage.getItem('paymentMethod') || ''
//     };

//     // Save to session storage
//     sessionStorage.setItem('checkoutData', JSON.stringify(formData));
//     console.log('Selections saved to session storage');
//   };

//   // Handle redirection to summary page when completing the order
//   // useEffect(() => {
//   //   if (activeStep > 4) {
//   //     // Redirect to summary page
//   //     window.location.href = '/summary';
//   //   }
//   // }, [activeStep]);


//   const enhancements = [
//     {
//       id: 1,
//       name: "Premium Breakfast",
//       pricePerDay: 10.0,
//       image: "https://www.vitamix.com/content/dam/vitamix/migration/media/recipe/rcpchocolateshake/images/chocolatemilkshakemainjpg.jpg",
//     },
//     {
//       id: 2,
//       name: "Gym Access",
//       pricePerDay: 15.0,
//       image: "https://www.vitamix.com/content/dam/vitamix/migration/media/recipe/rcpchocolateshake/images/chocolatemilkshakemainjpg.jpg",
//     },
//     {
//       id: 3,
//       name: "Pool Access",
//       pricePerDay: 12.0,
//       image: "https://www.vitamix.com/content/dam/vitamix/migration/media/recipe/rcpchocolateshake/images/chocolatemilkshakemainjpg.jpg",
//     },
//     {
//       id: 4,
//       name: "Spa Session",
//       pricePerDay: 20.0,
//       image: "https://www.vitamix.com/content/dam/vitamix/migration/media/recipe/rcpchocolateshake/images/chocolatemilkshakemainjpg.jpg",
//     },
//     {
//       id: 5,
//       name: "Private Lounge",
//       pricePerDay: 25.0,
//       image: "https://www.vitamix.com/content/dam/vitamix/migration/media/recipe/rcpchocolateshake/images/chocolatemilkshakemainjpg.jpg",
//     },
//     {
//       id: 6,
//       name: "Late Checkout",
//       pricePerDay: 8.0,
//       image: "https://www.vitamix.com/content/dam/vitamix/migration/media/recipe/rcpchocolateshake/images/chocolatemilkshakemainjpg.jpg",
//     },
//     {
//       id: 7,
//       name: "Room Service",
//       pricePerDay: 18.0,
//       image: "https://www.vitamix.com/content/dam/vitamix/migration/media/recipe/rcpchocolateshake/images/chocolatemilkshakemainjpg.jpg",
//     },
//     {
//       id: 8,
//       name: "Complimentary Drinks",
//       pricePerDay: 5.0,
//       image: "https://www.vitamix.com/content/dam/vitamix/migration/media/recipe/rcpchocolateshake/images/chocolatemilkshakemainjpg.jpg",
//     },
//   ];


//   const handleSelectionAddOn = (item) => {
//     let updatedSelections = [...selectedEnhancements];

//     if (updatedSelections.some((selected) => selected.id === item.id)) {
//       // Remove item if already selected
//       updatedSelections = updatedSelections.filter((selected) => selected.id !== item.id);
//     } else {
//       // Add item if not selected
//       updatedSelections.push(item);
//     }

//     setSelectedEnhancements(updatedSelections);
//     sessionStorage.setItem("selectedEnhancements", JSON.stringify(updatedSelections));
//   };


//   const handleSelection = async (packageId, identifierPackage) => {
//     sessionStorage.setItem("package", packageId);
//     try {
//       const response = await axios.post(
//         "https://api.dailyfit.ae/api/user/get-package-details",
//         { packageId, identifierPackage }, { withCredentials: true }
//       );

//       if (response.data && response.data.data) {
//         const packages = response.data.data;

//         // Extract all meals and structure them by date
//         const formattedMeals = {};
//         packages.forEach((pkg) => {
//           Object.entries(pkg.meals).forEach(([day, mealInfo]) => {
//             const date = mealInfo.date;
//             formattedMeals[date] = mealInfo.meals;
//           });
//         });

//         setMealData(formattedMeals);

//         // Extract and set available dates
//         const availableDates = Object.keys(formattedMeals);
//         setSelectedDates(availableDates);
//         setSelectedDate(availableDates[0]); // Set first date as default
//       }
//     } catch (error) {
//       console.error("API Error:", error);
//     }
//   };
//   const isDateDisabled = (date) => {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     const twoDaysFromNow = new Date(today);
//     twoDaysFromNow.setDate(today.getDate() + 2);

//     // Disable dates before today and next 2 days
//     if (date <= twoDaysFromNow) return true;

//     // Disable certain dates based on plan
//     if (selectedPlan?.includes("5 days") && (date.getDay() === 0 || date.getDay() === 6)) return true;
//     if (selectedPlan?.includes("6 days") && date.getDay() === 0) return true;

//     return false;
//   };

//   const handleDateSelection = (date) => {
//     if (isDateDisabled(date)) return;

//     let newSelectedDates = [];

//     if (selectedPlan?.includes("MONTHLY")) {
//       const daysToSelect = selectedPlan.includes("5 days") ? 20 : 24;
//       const validDates = [];
//       let currentDate = new Date(date);
//       let daysAdded = 0;

//       while (daysAdded < daysToSelect) {
//         if (!isDateDisabled(new Date(currentDate))) {
//           validDates.push(new Date(currentDate));
//           daysAdded++;
//         }
//         currentDate.setDate(currentDate.getDate() + 1);
//       }

//       newSelectedDates = validDates.map(d => d.toISOString().split('T')[0]);
//     } else if (selectedPlan?.includes("WEEKLY")) {
//       const daysToSelect = selectedPlan.includes("5 days") ? 5 : 6;
//       const validDates = [];
//       let currentDate = new Date(date);

//       while (validDates.length < daysToSelect) {
//         if (!isDateDisabled(new Date(currentDate))) {
//           validDates.push(new Date(currentDate));
//         }
//         currentDate.setDate(currentDate.getDate() + 1);
//       }

//       newSelectedDates = validDates.map(d => d.toISOString().split('T')[0]);
//     }

//     // Update state
//     setSelectedDates(newSelectedDates);

//     // Save to session storage if we have dates
//     if (newSelectedDates.length > 0) {
//       const startDate = newSelectedDates[0];
//       const endDate = newSelectedDates[newSelectedDates.length - 1];

//       // Save to session storage
//       sessionStorage.setItem('startDate', startDate);
//       sessionStorage.setItem('endDate', endDate);

//       console.log('Saved to session storage:', { startDate, endDate });
//     }
//   };

//   // Also update your reset function to clear session storage
//   const handleResetSelections = () => {
//     setSelectedOptions({});
//     setSelectedPlan(null);
//     setSelectedDates([]);

//     // Clear from session storage
//     sessionStorage.removeItem('startDate');
//     sessionStorage.removeItem('endDate');
//   };


//   // const handleDateSelection = (date) => {
//   //   if (isDateDisabled(date)) return;

//   //   if (selectedPlan?.includes("MONTHLY")) {
//   //     const daysToSelect = selectedPlan.includes("5 days") ? 20 : 24;
//   //     const validDates = [];
//   //     let currentDate = new Date(date);
//   //     let daysAdded = 0;

//   //     while (daysAdded < daysToSelect) {
//   //       if (!isDateDisabled(new Date(currentDate))) {
//   //         validDates.push(new Date(currentDate));
//   //         daysAdded++;
//   //       }
//   //       currentDate.setDate(currentDate.getDate() + 1);
//   //     }

//   //     setSelectedDates(validDates.map(d => d.toISOString().split('T')[0]));
//   //   } else if (selectedPlan?.includes("WEEKLY")) {
//   //     const daysToSelect = selectedPlan.includes("5 days") ? 5 : 6;
//   //     const validDates = [];
//   //     let currentDate = new Date(date);

//   //     while (validDates.length < daysToSelect) {
//   //       if (!isDateDisabled(new Date(currentDate))) {
//   //         validDates.push(new Date(currentDate));
//   //       }
//   //       currentDate.setDate(currentDate.getDate() + 1);
//   //     }

//   //     setSelectedDates(validDates.map(d => d.toISOString().split('T')[0]));
//   //   }
//   // };
//   const renderCalendar = (monthOffset) => {
//     const month = new Date(currentYear, currentMonth + monthOffset, 1);
//     const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//     const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
//     const firstDayOfMonth = new Date(month.getFullYear(), month.getMonth(), 1).getDay();

//     const calendarDays = [];
//     for (let i = 0; i < firstDayOfMonth; i++) {
//       calendarDays.push(<div key={`empty-${i}`} className="w-10 h-10" />);
//     }

//     for (let day = 1; day <= daysInMonth; day++) {
//       const date = new Date(month.getFullYear(), month.getMonth(), day);
//       const dateStr = date.toISOString().split('T')[0];
//       const isDisabled = isDateDisabled(date);
//       const isSelected = selectedDates.includes(dateStr);

//       calendarDays.push(
//         <button
//           key={`${month.getMonth()}-${day}`}
//           onClick={() => handleDateSelection(date)}
//           disabled={isDisabled}
//           className={`w-10 h-10 rounded-full text-sm transition-colors ${isDisabled
//             ? "text-gray-300 cursor-not-allowed"
//             : isSelected
//               ? "bg-[#059033] text-white"
//               : "hover:bg-gray-100"
//             }`}
//         >
//           {day}
//         </button>
//       );
//     }
//     return (
//       <div className="w-72">
//         <h3 className="text-lg font-medium mb-4">
//           {month.toLocaleDateString('default', { month: 'long', year: 'numeric' })}
//         </h3>
//         <div className="grid grid-cols-7 gap-1 mb-2">
//           {days.map(day => (
//             <div key={day} className="w-10 h-10 flex items-center justify-center text-sm text-gray-500">
//               {day}
//             </div>
//           ))}
//         </div>
//         <div className="grid grid-cols-7 gap-1">
//           {calendarDays}
//         </div>
//       </div>
//     );
//   };
//   const handleNextMonth = () => {
//     if (currentMonth === 11) {
//       setCurrentMonth(0);
//       setCurrentYear(currentYear + 1);
//     } else {
//       setCurrentMonth(currentMonth + 1);
//     }
//   };

//   const handlePrevMonth = () => {
//     if (currentMonth === 0) {
//       setCurrentMonth(11);
//       setCurrentYear(currentYear - 1);
//     } else {
//       setCurrentMonth(currentMonth - 1);
//     }
//   };

//   const handleCompleteOrder = async () => {
//     // Retrieve values from session storage
//     const packageId = sessionStorage.getItem("package");
//     const startDate = sessionStorage.getItem("startDate");
//     const endDate = sessionStorage.getItem("endDate");

//     if (!packageId || !startDate || !endDate) {
//       alert("Missing required order details. Please check your selections.");
//       return;
//     }

//     const payload = {
//       package: packageId,
//       startDate: startDate,
//       endDate: endDate,
//     };
//     console.log(payload, 'cart paylod')
//     try {
//       const response = await axios.post("https://api.dailyfit.ae/api/user/add-to-cart", payload, { withCredentials: true });
//       alert("Order completed successfully!");
//       window.location.href = '/summary';
//       console.log("Response:", response.data);
//     } catch (error) {
//       alert("Failed to complete order. Please try again.");
//       console.error("Error:", error);
//     }
//   };

//   const renderStepContent = () => {
//     switch (activeStep) {
//       case 1:
//         return (
//           <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-4">
//             <div className="max-w-7xl mx-auto">
//               {/* Header Section */}
//               <div className="text-center mb-12 space-y-4">
//                 <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
//                   Customize Your Meal Plan
//                 </h1>
//                 <p className="text-gray-600 max-w-2xl mx-auto">
//                   Choose from our carefully crafted meal packages designed to meet your nutritional needs
//                 </p>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
//                 {selectedPlans && selectedPlans.packages && selectedPlans.packages.map((packageItem) => {
//                   return (
//                     <div key={packageItem._id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
//                       <div className="flex items-start justify-between mb-4">
//                         <div className="p-2 bg-green-100 rounded-lg">
//                           {/* You'll need to get icons from somewhere else since they're not in the JSON */}
//                           <svg className="w-6 h-6 text-green-600" /* SVG props here */></svg>
//                         </div>
//                         <span className="text-sm font-medium text-[#059033]">
//                           Perfect for families
//                         </span>
//                       </div>

//                       <h3 className="text-xl font-semibold mb-2">{packageItem.packageGroup}</h3>
//                       <p className="text-gray-600 text-sm mb-6">{packageItem.description}</p>

//                       <div className="space-y-3">
//                         <button
//                           onClick={() => handleSelection(packageItem._id, packageItem._id, packageItem.identifier)}
//                           className={`w-full p-4 rounded-lg text-left text-sm font-medium transition-all
//             ${isSelected(packageItem._id, packageItem._id)
//                               ? "bg-[#059033] text-white shadow-md"
//                               : "bg-gray-50 text-gray-700 hover:bg-gray-100"
//                             }`}
//                         >
//                           {packageItem.packageName}
//                         </button>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//               {/* Duration Selection */}
//               <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
//                 <h2 className="text-xl font-semibold mb-6">Select Duration</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {plans.map((plan) => (
//                     <button
//                       key={plan}
//                       onClick={() => setSelectedPlan(plan)}
//                       className={`p-6 rounded-lg transition-all text-dark font-semibold
//         ${selectedPlan === plan
//                           ? "bg-[#059033] shadow-md"
//                           : "bg-gray-100 text-gray-700 hover:bg-[#059033] hover:text-white"
//                         }`}
//                     >
//                       <div className="text-lg">{plan}</div>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Calendar Section */}
//               <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
//                 <div className="flex justify-between items-center mb-6">
//                   <h2 className="text-xl font-semibold">Start Date</h2>
//                   <div className="flex items-center space-x-4">
//                     <button
//                       onClick={handlePrevMonth}
//                       className="p-2 hover:bg-[#059033] hover:text-white rounded-lg transition"
//                     >
//                       <ChevronLeft className="w-5 h-5" />
//                     </button>

//                     <span className="font-medium">
//                       {new Date(currentYear, currentMonth).toLocaleDateString('default', { month: 'long', year: 'numeric' })}
//                     </span>

//                     <button
//                       onClick={handleNextMonth}
//                       className="p-2 hover:bg-[#059033] hover:text-white rounded-lg transition"
//                     >
//                       <ChevronRight className="w-5 h-5" />
//                     </button>
//                   </div>
//                 </div>

//                 <div className="flex flex-col md:flex-row gap-8 overflow-x-auto">
//                   {renderCalendar(0)}
//                   {renderCalendar(1)}
//                 </div>

//                 {/* Reset Selections Button */}
//                 <div className="flex justify-end mt-6">
//                   <button
//                     onClick={() => {
//                       setSelectedOptions({});
//                       setSelectedPlan(null);
//                       setSelectedDates([]);
//                     }}
//                     className="px-8 py-3 border-2 bg-[#059033] text-white rounded-lg hover:bg-[#059033] hover:text-white font-medium transition"
//                   >
//                     Reset Selections
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         );


//       case 2:
//         if (!selectedDate && selectedDates.length > 0) {
//           setSelectedDate(selectedDates[0]);
//         }

//         return (
//           <div className="p-4 md:p-6 max-w-7xl mx-auto">
//             <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
//               <h2 className="text-xl md:text-2xl font-semibold">Meal selection</h2>
//               <p className="text-sm font-medium text-gray-600">
//                 Swap pre-selected favourites by choosing yours
//               </p>
//             </div>
//             <div className="p-4 md:p-6 max-w-7xl mx-auto">
//               {/* Date Selection */}
//               <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
//                 <h2 className="text-xl md:text-2xl font-semibold">Meal Selection</h2>
//                 <p className="text-sm font-medium text-gray-600">
//                   Swap pre-selected favourites by choosing yours
//                 </p>
//               </div>

//               <div className="flex gap-3 overflow-x-auto mb-6 pb-2">
//                 {selectedDates.map((date) => (
//                   <button
//                     key={date}
//                     onClick={() => setSelectedDate(date)}
//                     className={`px-6 py-3 rounded-full font-medium whitespace-nowrap ${date === selectedDate
//                       ? "bg-[#059033] text-white"
//                       : "border border-gray-300 text-gray-700 hover:bg-gray-50"
//                       }`}
//                   >
//                     {new Date(date).toLocaleDateString("en-US", {
//                       weekday: "short",
//                       month: "short",
//                       day: "numeric",
//                     })}
//                   </button>
//                 ))}
//               </div>

//               {/* Meal Listing */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                 {mealData[selectedDate]?.map((meal) => (
//                   <div
//                     key={meal._id}
//                     className="border rounded-lg p-4 shadow-sm bg-white"
//                   >
//                     <img
//                       src={meal.image[0]}
//                       alt={meal.mealName}
//                       className="w-full h-40 object-cover rounded-md"
//                     />
//                     <h3 className="mt-3 text-lg font-semibold">{meal.mealName}</h3>
//                     <p className="text-sm text-gray-600">{meal.description}</p>
//                     <p className="mt-2 text-sm font-medium text-gray-700">
//                       <span className="line-through text-red-500">
//                         ${meal.fareDetails.strikeOff}
//                       </span>{" "}
//                       ${meal.fareDetails.totalFare}{" "}
//                       <span className="text-green-500">(-${meal.fareDetails.discount})</span>
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             {/* <div className="flex gap-3 overflow-x-auto mb-6 pb-2">
//               {selectedDates.map((date) => (
//                 <button
//                   key={date}
//                   onClick={() => setSelectedDate(date)}
//                   className={`px-6 py-3 rounded-full font-medium whitespace-nowrap
//       ${date === selectedDate
//                       ? "bg-[#059033] text-white"
//                       : "border border-gray-300 text-gray-700 hover:bg-gray-50"}`}
//                 >
//                   {new Date(date).toLocaleDateString('en-US', {
//                     weekday: 'short',
//                     month: 'short',
//                     day: 'numeric'
//                   })}
//                 </button>
//               ))}
//             </div>
//             <div className="flex gap-3 overflow-x-auto mb-6 pb-2">
//               {selectedDates.map((date) => (
//                 <button
//                   key={date}
//                   onClick={() => setSelectedDate(date)}
//                   className={`px-6 py-3 rounded-full font-medium whitespace-nowrap
//                   ${date === selectedDate
//                       ? "bg-[#059033] text-white"
//                       : "border border-gray-300 text-gray-700 hover:bg-gray-50"}`}
//                 >
//                   {new Date(date).toLocaleDateString('en-US', {
//                     weekday: 'short',
//                     month: 'short',
//                     day: 'numeric'
//                   })}
//                 </button>
//               ))}
//             </div> */}
//           </div>
//         );


//       case 3:
//         return (
//           <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//             <div className="p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
//               <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
//                 <h2 className="text-3xl font-bold text-gray-900">Enhance Your Plan</h2>
//                 <button className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all flex items-center gap-3 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500">
//                   SKIP
//                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
//                     <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.243 7.032a.75.75 0 010 1.06l-3.5 3.5a.75.75 0 01-1.06 0l-3.5-3.5a.75.75 0 011.06-1.06l2.47 2.47 2.47-2.47a.75.75 0 011.06 0z" clipRule="evenodd" />
//                   </svg>
//                 </button>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                 {enhancements.map((item) => (
//                   <div
//                     key={item.id}
//                     className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow border border-gray-200 flex flex-col items-center text-center"
//                   >
//                     <img src={item.image} alt={item.name} className="w-20 h-20 rounded-full object-cover border-4 border-green-400" />
//                     <h3 className="mt-4 text-lg font-semibold text-gray-900">{item.name}</h3>
//                     <p className="text-sm text-gray-600 font-medium">AED {item.pricePerDay.toFixed(2)} / day</p>
//                     <input
//                       type="checkbox"
//                       checked={selectedEnhancements.some((selected) => selected.id === item.id)}
//                       onChange={() => handleSelectionAddOn(item)}
//                       className="mt-4 w-6 h-6 text-green-600 border-gray-300 rounded focus:ring-green-500 focus:outline-none"
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         );

//       case 4:
//         return (
//           <div className="max-w-2xl mx-auto">
//             <form className="space-y-6" onSubmit={handleAddressSubmit}>
//               <div className="grid grid-cols-2 gap-6">
//                 <div className="col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
//                   <input
//                     type="text"
//                     name="street"
//                     value={formData.street}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-0"
//                     required
//                   />
//                 </div>
//                 <div className="col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Building Floor</label>
//                   <input
//                     type="text"
//                     name="buildingFloor"
//                     value={formData.buildingFloor}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-0"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">House/Flat Number</label>
//                   <input
//                     type="text"
//                     name="houseOrFlatNumber"
//                     value={formData.houseOrFlatNumber}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-0"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Landmark</label>
//                   <input
//                     type="text"
//                     name="landmark"
//                     value={formData.landmark}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-0"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
//                   <input
//                     type="text"
//                     name="city"
//                     value={formData.city}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-0"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">State/Province</label>
//                   <input
//                     type="text"
//                     name="state"
//                     value={formData.state}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-0"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
//                   <input
//                     type="text"
//                     name="postalCode"
//                     value={formData.postalCode}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-0"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
//                   <input
//                     type="text"
//                     name="country"
//                     value={formData.country}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-0"
//                     required
//                   />
//                 </div>
//                 <div className="col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-0"
//                     required
//                   />
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-[#059033] text-white py-3 rounded-xl font-medium hover:bg-purple-700 transition"
//               >
//                 Submit Address
//               </button>
//             </form>
//           </div>
//         );
//     }
//   };

//   return (

//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-6xl mx-auto">
//         {/* Progress Steps */}
//         <div className="flex justify-between items-center mb-12">
//           {[1, 2, 3, 4].map((step) => (
//             <div key={step} className="flex items-center">
//               <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-semibold
//       ${activeStep >= step ? 'bg-[#059033] text-white' : 'bg-gray-200 text-gray-600'}`}>
//                 {step}
//               </div>
//               {step < 4 && (
//                 <div className={`w-24 h-1 mx-2 
//         ${activeStep > step ? 'bg-[#059033]' : 'bg-gray-200'}`}
//                 />
//               )}
//             </div>
//           ))}
//         </div>


//         {/* Step Content */}
//         <div className="mb-8">
//           <h2 className="text-2xl font-bold mb-2">
//             {activeStep === 1 ? 'Choose Your Plan' :
//               activeStep === 2 ? 'Select Your Meals' :
//                 activeStep === 3 ? 'Enhancement Products' :
//                   'Delivery Details'}
//           </h2>
//           <p className="text-gray-600">
//             {activeStep === 1 ? 'Select a meal plan that fits your lifestyle' :
//               activeStep === 2 ? 'Customize your weekly menu' :
//                 activeStep === 3 ? 'Tell us how to reach you' :
//                   'Where should we deliver your meals?'}
//           </p>
//         </div>

//         {renderStepContent()}

//         {/* Navigation */}
//         <div className="flex justify-between mt-12">
//           <button
//             onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
//             className="px-6 py-2 rounded-xl border-2 border-[#059033] text-[#059033] hover:bg-green-50"
//           >
//             Back
//           </button>
//           <button
//             onClick={() => {
//               saveSelectionsToSessionStorage();
//               if (activeStep === 4) {
//                 handleCompleteOrder(); // Call API on final step
//               }
//               setActiveStep(Math.min(5, activeStep + 1));
//             }}
//             className="px-6 py-2 rounded-xl bg-[#059033] text-white hover:bg-green-700"
//           >
//             {activeStep === 4 ? "Complete Order" : "Continue"}
//           </button>
//         </div>

//         {/* <div className="flex justify-between mt-12">
//           <button
//             onClick={() => {
//               // Go back one step
//               setActiveStep(Math.max(1, activeStep - 1));
//             }}
//             className="px-6 py-2 rounded-xl border-2 border-[#059033] text-[#059033] hover:bg-green-50"
//           >
//             Back
//           </button>
//           <button
//             onClick={() => {
//               // Save selections to session storage before proceeding
//               saveSelectionsToSessionStorage();
//               // Then navigate to next step
//               if (activeStep === 4) {
//                 // If this is the final step, redirect will happen via the useEffect
//                 console.log('Order completed, redirecting to summary page');
//               }
//               setActiveStep(Math.min(5, activeStep + 1));
//             }}
//             className="px-6 py-2 rounded-xl bg-[#059033] text-white hover:bg-green-700"
//           >
//             {activeStep === 4 ? 'Complete Order' : 'Continue'}
//           </button>
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default MealPlanner;


// import React, { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight, Users, Clock, Utensils } from 'lucide-react';
// import { useLocation } from 'react-router-dom';
// import axios from "axios";
// const MealPlanner = () => {
//   const location = useLocation();
//   const selectedPlans = location.state?.selectedPlan;
//   // Console log to verify the data was received
//   console.log('Received Plan:', selectedPlans);
//   const [activeStep, setActiveStep] = useState(1);
//   const [selectedOptions, setSelectedOptions] = useState({});
//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const [selectedDates, setSelectedDates] = useState([]);
//   const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
//   const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [mealData, setMealData] = useState([]);
//   const [selectedEnhancements, setSelectedEnhancements] = useState([]);
//   const [selectedPackageId, setSelectedPackageId] = useState(null);
//   const plans = [
//     "MONTHLY (6 days per week)",
//     "MONTHLY (5 days per week)",
//     "WEEKLY (6 days)",
//     "WEEKLY (5 days)"
//   ];
//   const [formData, setFormData] = useState({
//     street: "",
//     buildingFloor: "",
//     houseOrFlatNumber: "",
//     landmark: "",
//     city: "",
//     state: "",
//     postalCode: "",
//     country: "",
//     phone: "",
//     identifier: "Home", // Default identifier
//   });

//   const handleAddressSubmit = async (e) => {
//     e.preventDefault();

//     const payload = { address: formData };

//     try {
//       const response = await axios.post("https://api.dailyfit.ae/api/user/add-address", payload, { withCredentials: true });
//       alert("Address added successfully!");
//       console.log("Response:", response.data);
//     } catch (error) {
//       alert("Failed to add address. Please try again.");
//       console.error("Error:", error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = { address: formData };

//     try {
//       const response = await axios.post("https://api.dailyfit.ae/api/user/add-address", payload, {
//         headers: { "Content-Type": "application/json" },
//       });
//       alert("Address added successfully!");
//       console.log("Response:", response.data);
//     } catch (error) {
//       alert("Failed to add address. Please try again.");
//       console.error("Error:", error);
//     }
//   };

//   const [selectedPackage, setSelectedPackage] = useState({
//     packageId: null,
//     planId: null
//   });

//   const isSelected = (packageId, planId) => {
//     return selectedPackage.packageId === packageId && selectedPackage.planId === planId;
//   };


//   const saveSelectionsToSessionStorage = () => {
//     // Get current form data (this would be your form state)
//     const formData = {
//       // Example data - replace with your actual form state
//       items: sessionStorage.getItem('cartItems') ? JSON.parse(sessionStorage.getItem('cartItems')) : [],
//       shippingAddress: sessionStorage.getItem('shippingAddress') ? JSON.parse(sessionStorage.getItem('shippingAddress')) : {},
//       paymentMethod: sessionStorage.getItem('paymentMethod') || ''
//     };

//     // Save to session storage
//     sessionStorage.setItem('checkoutData', JSON.stringify(formData));
//     console.log('Selections saved to session storage');
//   };
//   const enhancements = [
//     {
//       id: 1,
//       name: "Premium Breakfast",
//       pricePerDay: 10.0,
//       image: "https://www.vitamix.com/content/dam/vitamix/migration/media/recipe/rcpchocolateshake/images/chocolatemilkshakemainjpg.jpg",
//     },
//     {
//       id: 2,
//       name: "Gym Access",
//       pricePerDay: 15.0,
//       image: "https://www.vitamix.com/content/dam/vitamix/migration/media/recipe/rcpchocolateshake/images/chocolatemilkshakemainjpg.jpg",
//     },
//     {
//       id: 3,
//       name: "Pool Access",
//       pricePerDay: 12.0,
//       image: "https://www.vitamix.com/content/dam/vitamix/migration/media/recipe/rcpchocolateshake/images/chocolatemilkshakemainjpg.jpg",
//     },
//     {
//       id: 4,
//       name: "Spa Session",
//       pricePerDay: 20.0,
//       image: "https://www.vitamix.com/content/dam/vitamix/migration/media/recipe/rcpchocolateshake/images/chocolatemilkshakemainjpg.jpg",
//     },
//     {
//       id: 5,
//       name: "Private Lounge",
//       pricePerDay: 25.0,
//       image: "https://www.vitamix.com/content/dam/vitamix/migration/media/recipe/rcpchocolateshake/images/chocolatemilkshakemainjpg.jpg",
//     },
//     {
//       id: 6,
//       name: "Late Checkout",
//       pricePerDay: 8.0,
//       image: "https://www.vitamix.com/content/dam/vitamix/migration/media/recipe/rcpchocolateshake/images/chocolatemilkshakemainjpg.jpg",
//     },
//     {
//       id: 7,
//       name: "Room Service",
//       pricePerDay: 18.0,
//       image: "https://www.vitamix.com/content/dam/vitamix/migration/media/recipe/rcpchocolateshake/images/chocolatemilkshakemainjpg.jpg",
//     },
//     {
//       id: 8,
//       name: "Complimentary Drinks",
//       pricePerDay: 5.0,
//       image: "https://www.vitamix.com/content/dam/vitamix/migration/media/recipe/rcpchocolateshake/images/chocolatemilkshakemainjpg.jpg",
//     },
//   ];


//   const handleSelectionAddOn = (item) => {
//     let updatedSelections = [...selectedEnhancements];

//     if (updatedSelections.some((selected) => selected.id === item.id)) {
//       // Remove item if already selected
//       updatedSelections = updatedSelections.filter((selected) => selected.id !== item.id);
//     } else {
//       // Add item if not selected
//       updatedSelections.push(item);
//     }

//     setSelectedEnhancements(updatedSelections);
//     sessionStorage.setItem("selectedEnhancements", JSON.stringify(updatedSelections));
//   };


//   const handleSelection = async (packageId, identifierPackage) => {
//     // Set the selected package ID to highlight the button
//     setSelectedPackageId(packageId);

//     sessionStorage.setItem("package", packageId);
//     try {
//       const response = await axios.post(
//         "https://api.dailyfit.ae/api/user/get-package-details",
//         { packageId, identifierPackage },
//         { withCredentials: true }
//       );

//       if (response.data && response.data.data) {
//         const packages = response.data.data;

//         // Extract all meals and structure them by date
//         const formattedMeals = {};
//         packages.forEach((pkg) => {
//           Object.entries(pkg.meals).forEach(([day, mealInfo]) => {
//             const date = mealInfo.date;
//             formattedMeals[date] = mealInfo.meals;
//           });
//         });

//         setMealData(formattedMeals);

//         // Extract available dates but don't auto-select them
//         const availableDates = Object.keys(formattedMeals);

//         // Just store available dates in mealData without setting them as selected
//         if (availableDates.length > 0) {
//           setSelectedDate(availableDates[0]); // Set first date as default for meal display
//         }
//       }
//     } catch (error) {
//       console.error("API Error:", error);
//     }
//   };

//   // Updated handleDateSelection function to properly handle date selection
//   const handleDateSelection = (date) => {
//     if (isDateDisabled(date)) return;


//     let newSelectedDates = [];

//     if (selectedPlan?.includes("MONTHLY")) {
//       const daysToSelect = selectedPlan.includes("5 days") ? 20 : 24;
//       const validDates = [];
//       let currentDate = new Date(date);
//       let daysAdded = 0;

//       while (daysAdded < daysToSelect) {
//         if (!isDateDisabled(new Date(currentDate))) {
//           validDates.push(new Date(currentDate));
//           daysAdded++;
//         }
//         currentDate.setDate(currentDate.getDate() + 1);
//       }

//       newSelectedDates = validDates.map(d => d.toISOString().split('T')[0]);
//     } else if (selectedPlan?.includes("WEEKLY")) {
//       const daysToSelect = selectedPlan.includes("5 days") ? 5 : 6;
//       const validDates = [];
//       let currentDate = new Date(date);

//       while (validDates.length < daysToSelect) {
//         if (!isDateDisabled(new Date(currentDate))) {
//           validDates.push(new Date(currentDate));
//         }
//         currentDate.setDate(currentDate.getDate() + 1);
//       }

//       newSelectedDates = validDates.map(d => d.toISOString().split('T')[0]);
//     } else {
//       // If no plan selected yet, just select this single date
//       newSelectedDates = [date.toISOString().split('T')[0]];
//     }

//     // Update state - this is when dates should actually be colored
//     setSelectedDates(newSelectedDates);

//     // Save to session storage if we have dates

//     if (newSelectedDates.length > 0) {
//       setSelectedDate(newSelectedDates[0]);
//       const startDate = newSelectedDates[0];
//       const endDate = newSelectedDates[newSelectedDates.length - 1];

//       // Save to session storage
//       sessionStorage.setItem('startDate', startDate);
//       sessionStorage.setItem('endDate', endDate);

//       console.log('Saved to session storage:', { startDate, endDate });
//     }
//   };
//   const isDateDisabled = (date) => {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     const twoDaysFromNow = new Date(today);
//     twoDaysFromNow.setDate(today.getDate() + 2);

//     // Disable dates before today and next 2 days
//     if (date <= twoDaysFromNow) return true;

//     // Disable certain dates based on plan
//     if (selectedPlan?.includes("5 days") && (date.getDay() === 0 || date.getDay() === 6)) return true;
//     if (selectedPlan?.includes("6 days") && date.getDay() === 0) return true;

//     return false;
//   };

//   // Also update your reset function to clear session storage
//   const handleResetSelections = () => {
//     setSelectedOptions({});
//     setSelectedPlan(null);
//     setSelectedDates([]);

//     // Clear from session storage
//     sessionStorage.removeItem('startDate');
//     sessionStorage.removeItem('endDate');
//   };

//   const renderCalendar = (monthOffset) => {
//     const month = new Date(currentYear, currentMonth + monthOffset, 1);
//     const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//     const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
//     const firstDayOfMonth = new Date(month.getFullYear(), month.getMonth(), 1).getDay();

//     const calendarDays = [];
//     for (let i = 0; i < firstDayOfMonth; i++) {
//       calendarDays.push(<div key={`empty-${i}`} className="w-10 h-10" />);
//     }

//     for (let day = 1; day <= daysInMonth; day++) {
//       const date = new Date(month.getFullYear(), month.getMonth(), day);
//       const dateStr = date.toISOString().split('T')[0];
//       const isDisabled = isDateDisabled(date);
//       const isSelected = selectedDates.includes(dateStr);

//       calendarDays.push(
//         <button
//           key={`${month.getMonth()}-${day}`}
//           onClick={() => handleDateSelection(date)}
//           disabled={isDisabled}
//           className={`w-10 h-10 rounded-full text-sm transition-colors ${isDisabled
//             ? "text-gray-300 cursor-not-allowed"
//             : isSelected
//               ? "bg-[#059033] text-white"
//               : "hover:bg-gray-100"
//             }`}
//         >
//           {day}
//         </button>
//       );
//     }
//     return (
//       <div className="w-72">
//         <h3 className="text-lg font-medium mb-4">
//           {month.toLocaleDateString('default', { month: 'long', year: 'numeric' })}
//         </h3>
//         <div className="grid grid-cols-7 gap-1 mb-2">
//           {days.map(day => (
//             <div key={day} className="w-10 h-10 flex items-center justify-center text-sm text-gray-500">
//               {day}
//             </div>
//           ))}
//         </div>
//         <div className="grid grid-cols-7 gap-1">
//           {calendarDays}
//         </div>
//       </div>
//     );
//   };
//   const handleNextMonth = () => {
//     if (currentMonth === 11) {
//       setCurrentMonth(0);
//       setCurrentYear(currentYear + 1);
//     } else {
//       setCurrentMonth(currentMonth + 1);
//     }
//   };

//   const handlePrevMonth = () => {
//     if (currentMonth === 0) {
//       setCurrentMonth(11);
//       setCurrentYear(currentYear - 1);
//     } else {
//       setCurrentMonth(currentMonth - 1);
//     }
//   };

//   const handleCompleteOrder = async () => {
//     // Retrieve values from session storage
//     const packageId = sessionStorage.getItem("package");
//     const startDate = sessionStorage.getItem("startDate");
//     const endDate = sessionStorage.getItem("endDate");

//     if (!packageId || !startDate || !endDate) {
//       alert("Missing required order details. Please check your selections.");
//       return;
//     }

//     const payload = {
//       package: packageId,
//       startDate: startDate,
//       endDate: endDate,
//     };
//     console.log(payload, 'cart paylod')
//     try {
//       const response = await axios.post("https://api.dailyfit.ae/api/user/add-to-cart", payload, { withCredentials: true });
//       alert("Order completed successfully!");
//       window.location.href = '/summary';
//       console.log("Response:", response.data);
//     } catch (error) {
//       alert("Failed to complete order. Please try again.");
//       console.error("Error:", error);
//     }
//   };


//   // Add this useEffect hook near the top of your component with other hooks
//   useEffect(() => {
//     // When selectedDates changes and there's at least one date but no selected date
//     if (selectedDates.length > 0 && !selectedDate) {
//       setSelectedDate(selectedDates[0]);
//     }
//   }, [selectedDates, selectedDate]);

//   const renderStepContent = () => {
//     switch (activeStep) {
//       case 1:
//         return (
//           <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-4">
//             <div className="max-w-7xl mx-auto">
//               {/* Header Section */}
//               <div className="text-center mb-12 space-y-4">
//                 <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
//                   Customize Your Meal Plan
//                 </h1>
//                 <p className="text-gray-600 max-w-2xl mx-auto">
//                   Choose from our carefully crafted meal packages designed to meet your nutritional needs
//                 </p>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
//                 {selectedPlans && selectedPlans.packages && selectedPlans.packages.map((packageItem) => {
//                   return (
//                     <div key={packageItem._id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
//                       <div className="flex items-start justify-between mb-4">
//                         <div className="p-2 bg-green-100 rounded-lg">
//                           {/* You'll need to get icons from somewhere else since they're not in the JSON */}
//                           <svg className="w-6 h-6 text-green-600" /* SVG props here */></svg>
//                         </div>
//                         <span className="text-sm font-medium text-[#059033]">
//                           Perfect for families
//                         </span>
//                       </div>

//                       <h3 className="text-xl font-semibold mb-2">{packageItem.packageGroup}</h3>
//                       <p className="text-gray-600 text-sm mb-6">{packageItem.description}</p>

//                       <div className="space-y-3">
//                         <button
//                           onClick={() => handleSelection(packageItem._id, packageItem._id, packageItem.identifier)}
//                           className={`w-full p-4 rounded-lg text-left text-sm font-medium transition-all
//           ${selectedPackageId === packageItem._id
//                               ? "bg-[#059033] text-white shadow-md"
//                               : "bg-gray-50 text-gray-700 hover:bg-gray-100"
//                             }`}
//                         >
//                           {packageItem.packageName}
//                         </button>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//               {/* Duration Selection */}
//               <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
//                 <h2 className="text-xl font-semibold mb-6">Select Duration</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {plans.map((plan) => (
//                     <button
//                       key={plan}
//                       onClick={() => setSelectedPlan(plan)}
//                       className={`p-6 rounded-lg transition-all text-dark font-semibold
//         ${selectedPlan === plan
//                           ? "bg-[#059033] shadow-md"
//                           : "bg-gray-100 text-gray-700 hover:bg-[#059033] hover:text-white"
//                         }`}
//                     >
//                       <div className="text-lg">{plan}</div>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Calendar Section */}
//               <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
//                 <div className="flex justify-between items-center mb-6">
//                   <h2 className="text-xl font-semibold">Start Date</h2>
//                   <div className="flex items-center space-x-4">
//                     <button
//                       onClick={handlePrevMonth}
//                       className="p-2 hover:bg-[#059033] hover:text-white rounded-lg transition"
//                     >
//                       <ChevronLeft className="w-5 h-5" />
//                     </button>

//                     <span className="font-medium">
//                       {new Date(currentYear, currentMonth).toLocaleDateString('default', { month: 'long', year: 'numeric' })}
//                     </span>

//                     <button
//                       onClick={handleNextMonth}
//                       className="p-2 hover:bg-[#059033] hover:text-white rounded-lg transition"
//                     >
//                       <ChevronRight className="w-5 h-5" />
//                     </button>
//                   </div>
//                 </div>

//                 <div className="flex flex-col md:flex-row gap-8 overflow-x-auto">
//                   {renderCalendar(0)}
//                   {renderCalendar(1)}
//                 </div>

//                 {/* Reset Selections Button */}
//                 <div className="flex justify-end mt-6">
//                   <button
//                     onClick={() => {
//                       setSelectedOptions({});
//                       setSelectedPlan(null);
//                       setSelectedDates([]);
//                     }}
//                     className="px-8 py-3 border-2 bg-[#059033] text-white rounded-lg hover:bg-[#059033] hover:text-white font-medium transition"
//                   >
//                     Reset Selections
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         );


//       case 2:
//         if (!selectedDate && selectedDates.length > 0) {
//           setSelectedDate(selectedDates[0]);
//         }

//         return (
//           <div className="p-4 md:p-6 max-w-7xl mx-auto">
//             <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
//               <h2 className="text-xl md:text-2xl font-semibold">Meal selection</h2>
//               <p className="text-sm font-medium text-gray-600">
//                 Swap pre-selected favourites by choosing yours
//               </p>
//             </div>
//             <div className="p-4 md:p-6 max-w-7xl mx-auto">
//               {/* Date Selection */}
//               <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
//                 <h2 className="text-xl md:text-2xl font-semibold">Meal Selection</h2>
//                 <p className="text-sm font-medium text-gray-600">
//                   Swap pre-selected favourites by choosing yours
//                 </p>
//               </div>

//               <div className="flex gap-3 overflow-x-auto mb-6 pb-2">
//                 {selectedDates.map((date) => (
//                   <button
//                     key={date}
//                     onClick={() => setSelectedDate(date)}
//                     className={`px-6 py-3 rounded-full font-medium whitespace-nowrap ${date === selectedDate
//                       ? "bg-[#059033] text-white"
//                       : "border border-gray-300 text-gray-700 hover:bg-gray-50"
//                       }`}
//                   >
//                     {new Date(date).toLocaleDateString("en-US", {
//                       weekday: "short",
//                       month: "short",
//                       day: "numeric",
//                     })}
//                   </button>
//                 ))}
//               </div>

//               {/* Meal Listing */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                 {mealData[selectedDate]?.map((meal) => (
//                   <div
//                     key={meal._id}
//                     className="border rounded-lg p-4 shadow-sm bg-white"
//                   >
//                     <img
//                       src={meal.image[0]}
//                       alt={meal.mealName}
//                       className="w-full h-40 object-cover rounded-md"
//                     />
//                     <h3 className="mt-3 text-lg font-semibold">{meal.mealName}</h3>
//                     <p className="text-sm text-gray-600">{meal.description}</p>
//                     <p className="mt-2 text-sm font-medium text-gray-700">
//                       <span className="line-through text-red-500">
//                         ${meal.fareDetails.strikeOff}
//                       </span>{" "}
//                       ${meal.fareDetails.totalFare}{" "}
//                       <span className="text-green-500">(-${meal.fareDetails.discount})</span>
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         );

//       case 3:
//         return (
//           <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//             <div className="p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
//               <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
//                 <h2 className="text-3xl font-bold text-gray-900">Enhance Your Plan</h2>
//                 <button className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all flex items-center gap-3 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500">
//                   SKIP
//                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
//                     <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.243 7.032a.75.75 0 010 1.06l-3.5 3.5a.75.75 0 01-1.06 0l-3.5-3.5a.75.75 0 011.06-1.06l2.47 2.47 2.47-2.47a.75.75 0 011.06 0z" clipRule="evenodd" />
//                   </svg>
//                 </button>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                 {enhancements.map((item) => (
//                   <div
//                     key={item.id}
//                     className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow border border-gray-200 flex flex-col items-center text-center"
//                   >
//                     <img src={item.image} alt={item.name} className="w-20 h-20 rounded-full object-cover border-4 border-green-400" />
//                     <h3 className="mt-4 text-lg font-semibold text-gray-900">{item.name}</h3>
//                     <p className="text-sm text-gray-600 font-medium">AED {item.pricePerDay.toFixed(2)} / day</p>
//                     <input
//                       type="checkbox"
//                       checked={selectedEnhancements.some((selected) => selected.id === item.id)}
//                       onChange={() => handleSelectionAddOn(item)}
//                       className="mt-4 w-6 h-6 text-green-600 border-gray-300 rounded focus:ring-green-500 focus:outline-none"
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         );

//       case 4:
//         return (
//           <div className="max-w-2xl mx-auto">
//             <form className="space-y-6" onSubmit={handleAddressSubmit}>
//               <div className="grid grid-cols-2 gap-6">
//                 <div className="col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
//                   <input
//                     type="text"
//                     name="street"
//                     value={formData.street}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-0"
//                     required
//                   />
//                 </div>
//                 <div className="col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Building Floor</label>
//                   <input
//                     type="text"
//                     name="buildingFloor"
//                     value={formData.buildingFloor}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-0"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">House/Flat Number</label>
//                   <input
//                     type="text"
//                     name="houseOrFlatNumber"
//                     value={formData.houseOrFlatNumber}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-0"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Landmark</label>
//                   <input
//                     type="text"
//                     name="landmark"
//                     value={formData.landmark}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-0"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
//                   <input
//                     type="text"
//                     name="city"
//                     value={formData.city}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-0"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">State/Province</label>
//                   <input
//                     type="text"
//                     name="state"
//                     value={formData.state}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-0"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
//                   <input
//                     type="text"
//                     name="postalCode"
//                     value={formData.postalCode}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-0"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
//                   <input
//                     type="text"
//                     name="country"
//                     value={formData.country}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-0"
//                     required
//                   />
//                 </div>
//                 <div className="col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-0"
//                     required
//                   />
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-[#059033] text-white py-3 rounded-xl font-medium transition"
//               >
//                 Submit Address
//               </button>
//             </form>
//           </div>
//         );
//     }
//   };

//   return (

//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-6xl mx-auto">
//         {/* Progress Steps */}
//         <div className="flex justify-between items-center mb-12">
//           {[1, 2, 3, 4].map((step) => (
//             <div key={step} className="flex items-center">
//               <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-semibold
//       ${activeStep >= step ? 'bg-[#059033] text-white' : 'bg-gray-200 text-gray-600'}`}>
//                 {step}
//               </div>
//               {step < 4 && (
//                 <div className={`w-24 h-1 mx-2 
//         ${activeStep > step ? 'bg-[#059033]' : 'bg-gray-200'}`}
//                 />
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Step Content */}
//         <div className="mb-8">
//           <h2 className="text-2xl font-bold mb-2">
//             {activeStep === 1 ? 'Choose Your Plan' :
//               activeStep === 2 ? 'Select Your Meals' :
//                 activeStep === 3 ? 'Enhancement Products' :
//                   'Delivery Details'}
//           </h2>
//           <p className="text-gray-600">
//             {activeStep === 1 ? 'Select a meal plan that fits your lifestyle' :
//               activeStep === 2 ? 'Customize your weekly menu' :
//                 activeStep === 3 ? 'Tell us how to reach you' :
//                   'Where should we deliver your meals?'}
//           </p>
//         </div>

//         {renderStepContent()}

//         {/* Navigation */}
//         <div className="flex justify-between mt-12">
//           <button
//             onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
//             className="px-6 py-2 rounded-xl border-2 border-[#059033] text-[#059033] hover:bg-green-50"
//           >
//             Back
//           </button>
//           <button
//             onClick={() => {
//               saveSelectionsToSessionStorage();
//               if (activeStep === 4) {
//                 handleCompleteOrder(); // Call API on final step
//               }
//               setActiveStep(Math.min(5, activeStep + 1));
//             }}
//             className="px-6 py-2 rounded-xl bg-[#059033] text-white hover:bg-green-700"
//           >
//             {activeStep === 4 ? "Complete Order" : "Continue"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MealPlanner;
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingBag, Calendar, MapPin, Gift } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import axios from "axios";

const MealPlanner = () => {
    const location = useLocation();
    const selectedPlans = location.state?.selectedPlan;
    const [activeStep, setActiveStep] = useState(1);
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
            alert("Address added successfully!");
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

        // Save selected meals to session storage
        sessionStorage.setItem('selectedMeals', JSON.stringify(selectedMeals));

        sessionStorage.setItem('checkoutData', JSON.stringify(formData));
        console.log('Selections saved to session storage');
        console.log('Selected meals saved:', selectedMeals);
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
    }, []);



    const handleSelectionAddOn = (item) => {
        let updatedSelections = [...selectedEnhancements];

        if (updatedSelections.some((selected) => selected._id === item._id)) {
            updatedSelections = updatedSelections.filter((selected) => selected._id !== item._id);
        } else {
            updatedSelections.push(item);
        }

        setSelectedEnhancements(updatedSelections);
        sessionStorage.setItem("selectedEnhancements", JSON.stringify(updatedSelections));
    };


    // const handleSelectionAddOn = (item) => {
    //   let updatedSelections = [...selectedEnhancements];

    //   if (updatedSelections.some((selected) => selected.id === item.id)) {
    //     updatedSelections = updatedSelections.filter((selected) => selected.id !== item.id);
    //   } else {
    //     updatedSelections.push(item);
    //   }

    //   setSelectedEnhancements(updatedSelections);
    //   sessionStorage.setItem("selectedEnhancements", JSON.stringify(updatedSelections));
    // };

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
                    Object.entries(pkg.meals).forEach(([day, mealInfo]) => {
                        const date = mealInfo.date;
                        formattedMeals[date] = mealInfo.meals;
                    });
                });

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
                    sessionStorage.setItem("selectedMeals", JSON.stringify(initialSelectedMeals));
                }
            }
        } catch (error) {
            console.error("API Error:", error);
        }
    };

    const handleDateSelection = (date) => {
        if (isDateDisabled(date)) return;

        let newSelectedDates = [];

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

            newSelectedDates = validDates.map(d => d.toISOString().split('T')[0]);
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

            newSelectedDates = validDates.map(d => d.toISOString().split('T')[0]);
        } else {
            newSelectedDates = [date.toISOString().split('T')[0]];
        }

        setSelectedDates(newSelectedDates);

        if (newSelectedDates.length > 0) {
            setSelectedDate(newSelectedDates[0]);
            const startDate = newSelectedDates[0];
            const endDate = newSelectedDates[newSelectedDates.length - 1];

            sessionStorage.setItem('startDate', startDate);
            sessionStorage.setItem('endDate', endDate);
            console.log('Saved to session storage:', { startDate, endDate });
        }
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
    const handleMealSelection = (date, mealId) => {
        const updatedMeals = {
            ...selectedMeals,
            [date]: mealId
        };

        setSelectedMeals(updatedMeals);
        sessionStorage.setItem("selectedMeals", JSON.stringify(updatedMeals));
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

    const handleCompleteOrder = async () => {
        const packageId = sessionStorage.getItem("package");
        const startDate = sessionStorage.getItem("startDate");
        const endDate = sessionStorage.getItem("endDate");
        const selectedMealsData = sessionStorage.getItem("selectedMeals");

        if (!packageId || !startDate || !endDate) {
            alert("Missing required order details. Please check your selections.");
            return;
        }

        const payload = {
            package: packageId,
            startDate: startDate,
            endDate: endDate,
            // selectedMeals: selectedMealsData ? JSON.parse(selectedMealsData) : {}
        };
        console.log(payload, 'cart payload');

        try {
            const response = await axios.post("https://api.dailyfit.ae/api/user/add-to-cart", payload, { withCredentials: true });
            alert("Order completed successfully!");
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

    // Step indicators component
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
                    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white p-6">
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
                                    {mealData[selectedDate]?.map((meal) => (
                                        <div
                                            key={meal._id}
                                            className={`rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-white group cursor-pointer
                        ${selectedMeals[selectedDate] === meal._id ? 'ring-2 ring-emerald-500' : ''}`}
                                            onClick={() => handleMealSelection(selectedDate, meal._id)}
                                        >
                                            <div className="h-60 overflow-hidden relative">
                                                <img
                                                    src={meal.image[0]}
                                                    alt={meal.mealName}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                {selectedMeals[selectedDate] === meal._id && (
                                                    <div className="absolute top-3 right-3 bg-emerald-500 text-white p-2 rounded-full flex items-center justify-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-6">
                                                <h3 className="text-xl font-bold text-gray-800 mb-2">{meal.mealName}</h3>
                                                <p className="text-gray-600 mb-4 line-clamp-2">{meal.description}</p>
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <span className="line-through text-red-500 text-sm">
                                                            ${meal.fareDetails.strikeOff}
                                                        </span>{" "}
                                                        <span className="text-lg font-bold text-emerald-600">
                                                            ${meal.fareDetails.totalFare}
                                                        </span>
                                                    </div>
                                                    <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-sm font-medium">
                                                        Save ${meal.fareDetails.discount}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Meal selection summary */}
                            <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
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
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {addons.map((item) => {
                            const isSelected = selectedEnhancements.some((selected) => selected._id === item._id);

                            return (
                                <div
                                    key={item._id}
                                    className={`rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer relative group
                ${isSelected ? "ring-2 ring-emerald-500" : "hover:ring-1 hover:ring-emerald-200"}
              `}
                                    onClick={() => handleSelectionAddOn(item)}
                                    role="checkbox"
                                    aria-checked={isSelected}
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") {
                                            e.preventDefault();
                                            handleSelectionAddOn(item);
                                        }
                                    }}
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

                                        <div
                                            className={`mt-3 py-1 px-3 rounded-full text-sm font-medium transition-all duration-300
                    ${isSelected ? "bg-emerald-100 text-emerald-700" : "bg-gray-50 text-gray-500"}
                  `}
                                        >
                                            {isSelected ? "Selected" : "Click to select"}
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
                                </div>
                            );
                        })}
                    </div>
                );

            case 4:
                return (
                    <div className="max-w-2xl mx-auto">
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
                                        required
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Building Floor</label>
                                    <input
                                        type="text"
                                        name="buildingFloor"
                                        value={formData.buildingFloor}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">House/Flat Number</label>
                                    <input
                                        type="text"
                                        name="houseOrFlatNumber"
                                        value={formData.houseOrFlatNumber}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Landmark</label>
                                    <input
                                        type="text"
                                        name="landmark"
                                        value={formData.landmark}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-0"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">State/Province</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-0"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                                    <input
                                        type="text"
                                        name="postalCode"
                                        value={formData.postalCode}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-0"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                                    <input
                                        type="text"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-0"
                                        required
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-0"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#059033] text-white py-3 rounded-xl font-medium transition"
                            >
                                Submit Address
                            </button>
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
                        onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
                        className="px-6 py-2 rounded-xl border-2 border-[#059033] text-[#059033] hover:bg-green-50"
                    >
                        Back
                    </button>
                    <button
                        onClick={() => {
                            saveSelectionsToSessionStorage();
                            if (activeStep === 4) {
                                handleCompleteOrder(); // Call API on final step
                            }
                            setActiveStep(Math.min(5, activeStep + 1));
                        }}
                        className="px-6 py-2 rounded-xl bg-[#059033] text-white hover:bg-green-700"
                    >
                        {activeStep === 4 ? "Complete Order" : "Continue"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MealPlanner;