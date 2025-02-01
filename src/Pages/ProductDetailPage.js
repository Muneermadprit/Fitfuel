
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { TiThMenuOutline } from 'react-icons/ti';
import FooterPage from './FooterPage';
const CombinedPage = () => {
  const [selectedStep, setSelectedStep] = useState(1);

  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState({
    fullPackage: "",
    mainMealsWithBreakfast: "",
    mainMealsWithSnacks: "",
    mainMealsOnly: "",
  });

  const handleDateClick = (date, monthIndex) => {
    if (selectedPlan === "MONTHLY (6 days per week)") {
      // Clear previous selections
      setSelectedDates([]);

      // Get the clicked date information
      const [month, day] = date.split('-').map(Number);

      // Generate the next 6 consecutive dates
      const consecutiveDates = [];
      let currentMonth = month;
      let currentDay = day;

      for (let i = 0; i < 6; i++) {
        // Check if we need to move to next month
        if (currentMonth === 0 && currentDay > 31) {
          currentMonth = 1;
          currentDay = 1;
        } else if (currentMonth === 1 && currentDay > 28) {
          break; // Stop if we exceed February's days
        }

        // Only add the date if it's selectable
        if (isDateSelectable(currentDay, currentMonth)) {
          consecutiveDates.push(`${currentMonth}-${currentDay}`);
        }

        currentDay++;
      }

      setSelectedDates(consecutiveDates);
    } else {
      // Original single date selection logic
      if (selectedDates.includes(date)) {
        setSelectedDates(selectedDates.filter((d) => d !== date));
      } else {
        setSelectedDates([...selectedDates, date]);
      }
    }
  };

  const isDateSelectable = (date, month) => {
    if (month === 0) return date >= 22;
    return date <= 18;
  };

  // const handleSelection = (section, option) => {
  //   setSelectedOptions((prev) => ({
  //     ...prev,
  //     [section]: option,
  //   }));
  // };

  const handleSelection = (packageType, option) => {
    setSelectedPackage({
      type: packageType,
      option: option
    });
  };
  const mealData = {
    'Mo 27/01': {
      breakfast: [
        {
          name: 'Tiramisu Oats (LC)',
          weight: '98.3g',
          image: '/api/placeholder/320/180',
          nutrition: {
            energy: '1,397.8 kcal',
            protein: '-',
            fat: '-',
            carbohydrates: '-'
          }
        },
        {
          name: 'Spinach & Feta Egg Muffins (LC)',
          weight: '52.8g',
          image: '/api/placeholder/320/180',
          nutrition: {
            energy: '-',
            protein: '-',
            fat: '-',
            carbohydrates: '-'
          }
        }
      ]
    },
    'Tu 28/01': {
      breakfast: [
        {
          name: 'Pesto Eggs (LC)',
          weight: '132.5g',
          image: '/api/placeholder/320/180',
          nutrition: {
            energy: '-',
            protein: '-',
            fat: '-',
            carbohydrates: '-'
          }
        },
        {
          name: 'Pear Crumble Bowl (LC)',
          weight: '-',
          image: '/api/placeholder/320/180',
          nutrition: {
            energy: '-',
            protein: '-',
            fat: '-',
            carbohydrates: '-'
          }
        }
      ]
    },
    'We 29/01': {
      breakfast: [
        {
          name: 'New Breakfast Option 1',
          weight: '100g',
          image: '/api/placeholder/320/180',
          nutrition: {
            energy: '800 kcal',
            protein: '20g',
            fat: '10g',
            carbohydrates: '30g'
          }
        },
        {
          name: 'New Breakfast Option 2',
          weight: '80g',
          image: '/api/placeholder/320/180',
          nutrition: {
            energy: '600 kcal',
            protein: '15g',
            fat: '8g',
            carbohydrates: '25g'
          }
        }
      ]
    }
  };
  const [selectedDate, setSelectedDate] = useState('Mo 27/01');
  const dates = Object.keys(mealData);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    whatsappNumber: '',
    addressType: 'residential',
    houseNumber: '',
    buildingName: '',
    streetAddress: '',
    areaName: '',
    emirate: 'dubai'
  });

  // ... (keep all the existing state and functions)

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    const requiredFields = ['firstName', 'lastName', 'email', 'whatsappNumber', 'houseNumber', 'areaName', 'emirate'];
    const isValid = requiredFields.every(field => formData[field].trim() !== '');

    if (isValid) {
      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData);

      // Redirect to profile page
      navigate('/profile');
    } else {
      alert('Please fill in all required fields');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const [menuOpen, setMenuOpen] = useState(false);

  // Navigation links
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Menu", href: "/menu" },
    { label: "Contact", href: "/contact" }
  ];
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedDates, setSelectedDates] = useState([]);


  const packages = [
    {
      title: 'Full Package',
      id: 'fullPackage',
      options: [
        '⭐ 2 Main Meals with Breakfast & FITT Snack',
        '1 Main Meal with Breakfast & FITT Snack'
      ]
    },
    {
      title: 'Main Meals with Breakfast',
      id: 'mainBreakfast',
      options: [
        '⭐ 2 Main Meals with Breakfast',
        '1 Main Meal with Breakfast'
      ]
    },
    {
      title: 'Main Meals with FITT Snacks',
      id: 'mainSnacks',
      options: [
        '⭐ 2 Main Meals with FITT Snack',
        '1 Main Meal with FITT Snack'
      ]
    },
    {
      title: 'Main Meals Only',
      id: 'mainOnly',
      options: [
        '⭐ 2 Main Meals',
        '1 Main Meal'
      ]
    }
  ];
  const [selectedPackage, setSelectedPackage] = useState({
    type: null,  // 'fullPackage', 'mainBreakfast', 'mainSnacks', 'mainOnly'
    option: null // 'option1' or 'option2'
  });

  const isSelected = (packageType, option) => {
    return selectedPackage.type === packageType && selectedPackage.option === option;
  };

  const plans = [
    "MONTHLY (6 days per week)",
    "MONTHLY (5 days per week)",
    "WEEKLY (6 days)",
    "WEEKLY (5 days)"
  ];

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
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
      const daysToSelect = selectedPlan.includes("5 days") ? 20 : 24; // Either 20 or 24 days
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
        if (!isDateDisabled(currentDate)) {
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
      const isSelected = selectedDates.some(d => d === dateStr);

      calendarDays.push(
        <button
          key={`${month.getMonth()}-${day}`}
          onClick={() => handleDateSelection(date)}
          disabled={isDisabled}
          className={`w-10 h-10 rounded-full text-sm transition-colors ${isDisabled
            ? "text-gray-300 cursor-not-allowed"
            : isSelected
              ? "bg-purple-600 text-white"
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
  }

  return (
    <>
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md rounded-lg relative z-50">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <img
            src="/api/placeholder/60/60"
            alt="Logo"
            className="w-12 h-12 rounded-full shadow-sm" />
          <h1 className="text-xl font-semibold text-[#464194]">Daily Fit</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <span
              key={link.label}
              className="text-lg text-purple-600 hover:text-green-500 font-medium transition-colors cursor-pointer px-2"
            >
              {link.label}
            </span>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#464194] focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <TiThMenuOutline className="w-8 h-8" />
        </button>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
          onClick={() => setMenuOpen(false)} />
        <div
          className={`fixed top-0 right-0 h-full w-3/4 max-w-sm bg-white shadow-xl z-50 transition-transform duration-500 ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex items-center justify-between px-4 py-4 border-b">
            <h2 className="text-lg font-semibold text-gray-700">Menu</h2>
            <button
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={() => setMenuOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <ul className="p-6 space-y-4">
            {navLinks.map((link) => (
              <li key={link.label}>
                <span
                  className="block text-lg text-purple-600 hover:text-green-500 font-medium transition-colors cursor-pointer"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </header>


      <div className="max-w-6xl mx-auto p-4 lg:p-6 space-y-8 lg:space-y-12 border-4 border-purple-100 shadow-lg mt-5">
        {/* Steps Navigation */}
        <div className="flex items-center justify-center mb-8 lg:mb-12 overflow-x-auto px-4">
          {[1, 2, 3, 4].map((step, index) => (
            <React.Fragment key={step}>
              <div
                className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center cursor-pointer flex-shrink-0 
                ${selectedStep === step ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-600"}`}
                onClick={() => setSelectedStep(step)}
              >
                {step}
              </div>
              {index < 3 && <div className="h-[2px] w-8 md:w-16 bg-gray-200 flex-shrink-0" />}
            </React.Fragment>
          ))}
        </div>

        {/* Dynamic Content Based on Selected Step */}
        <div className="w-full">
          {selectedStep === 1 && (
            <div className="max-w-6xl mx-auto space-y-8">
              <div className="p-4 md:p-8">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-8">
                  <h2 className="text-xl md:text-2xl font-semibold">Select meal package</h2>
                  <span className="bg-yellow-50 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium inline-flex items-center gap-1">
                    ⭐ MOST POPULAR!
                  </span>
                </div>
                <div className="space-y-8">
                  {packages.map((pkg) => (
                    <div key={pkg.id} className="space-y-4">
                      <h3 className="text-lg md:text-xl font-medium">{pkg.title}</h3>
                      <div className="flex flex-col md:flex-row gap-4">
                        {pkg.options.map((optionText, index) => (
                          <button
                            key={`${pkg.id}-option${index + 1}`}
                            onClick={() => handleSelection(pkg.id, `option${index + 1}`)}
                            className={`flex-1 px-6 py-3 rounded-full font-medium transition-colors duration-200 ${isSelected(pkg.id, `option${index + 1}`)
                              ? "bg-purple-600 text-white hover:bg-[#3a3575]"
                              : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                              }`}
                          >
                            {optionText}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                {/* <div className="space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-xl font-medium">Full Package</h3>
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleSelection("fullPackage", "option1")}
                        className={`flex-1 px-6 py-3 rounded-full font-medium ${selectedOptions.fullPackage === "option1"
                          ? "bg-purple-600 text-white hover:bg-[#3a3575]"
                          : "border border-gray-300 text-gray-700 hover:bg-gray-50"}`}
                      >
                        ⭐ 2 Main Meals with Breakfast & FITT Snack
                      </button>
                      <button
                        onClick={() => handleSelection("fullPackage", "option2")}
                        className={`flex-1 px-6 py-3 rounded-full font-medium ${selectedOptions.fullPackage === "option2"
                          ? "bg-purple-600 text-white hover:bg-[#3a3575]"
                          : "border border-gray-300 text-gray-700 hover:bg-gray-50"}`}
                      >
                        1 Main Meal with Breakfast & FITT Snack
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-8 mt-8">
                  <div className="space-y-4">
                    <h3 className="text-xl font-medium">Main Meals with Breakfast</h3>
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleSelection("mainMealsWithBreakfast", "option1")}
                        className={`flex-1 px-6 py-3 rounded-full font-medium ${selectedOptions.mainMealsWithBreakfast === "option1"
                          ? "bg-purple-600 text-white hover:bg-[#3a3575]"
                          : "border border-gray-300 text-gray-700 hover:bg-gray-50"}`}
                      >
                        ⭐ 2 Main Meals with Breakfast & FITT Snack
                      </button>
                      <button
                        onClick={() => handleSelection("mainMealsWithBreakfast", "option2")}
                        className={`flex-1 px-6 py-3 rounded-full font-medium ${selectedOptions.mainMealsWithBreakfast === "option2"
                          ? "bg-purple-600 text-white hover:bg-[#3a3575]"
                          : "border border-gray-300 text-gray-700 hover:bg-gray-50"}`}
                      >
                        1 Main Meal with Breakfast & FITT Snack
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-8 mt-8">
                  <div className="space-y-4">
                    <h3 className="text-xl font-medium">Main Meals with FITT Snacks</h3>
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleSelection("mainMealsWithSnacks", "option1")}
                        className={`flex-1 px-6 py-3 rounded-full font-medium ${selectedOptions.mainMealsWithSnacks === "option1"
                          ? "bg-purple-600 text-white hover:bg-[#3a3575]"
                          : "border border-gray-300 text-gray-700 hover:bg-gray-50"}`}
                      >
                        ⭐ 2 Main Meals with Breakfast & FITT Snack
                      </button>
                      <button
                        onClick={() => handleSelection("mainMealsWithSnacks", "option2")}
                        className={`flex-1 px-6 py-3 rounded-full font-medium ${selectedOptions.mainMealsWithSnacks === "option2"
                          ? "bg-purple-600 text-white hover:bg-[#3a3575]"
                          : "border border-gray-300 text-gray-700 hover:bg-gray-50"}`}
                      >


                        1 Main Meal with Breakfast & FITT Snack
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-8 mt-8">
                  <div className="space-y-4">
                    <h3 className="text-xl font-medium">Main Meals Only</h3>
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleSelection("mainMealsOnly", "option1")}
                        className={`flex-1 px-6 py-3 rounded-full font-medium ${selectedOptions.mainMealsOnly === "option1"
                          ? "bg-purple-600 text-white hover:bg-[#3a3575]"
                          : "border border-gray-300 text-gray-700 hover:bg-gray-50"}`}
                      >
                        ⭐ 2 Main Meals with Breakfast & FITT Snack
                      </button>
                      <button
                        onClick={() => handleSelection("mainMealsOnly", "option2")}
                        className={`flex-1 px-6 py-3 rounded-full font-medium ${selectedOptions.mainMealsOnly === "option2"
                          ? "bg-purple-600 text-white hover:bg-[#3a3575]"
                          : "border border-gray-300 text-gray-700 hover:bg-gray-50"}`}
                      >
                        1 Main Meal with Breakfast & FITT Snack
                      </button>
                    </div>
                  </div>
                </div> */}

                {/* Plan Selection */}
                <div className="mt-8">
                  <h2 className="text-xl md:text-2xl font-semibold mb-6">Select your plan duration and start date</h2>
                  <div className="flex flex-wrap gap-3 mb-6">
                    {plans.map((plan) => (
                      <button
                        key={plan}
                        onClick={() => {
                          setSelectedPlan(plan);
                          setSelectedDates([]);
                        }}
                        className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${selectedPlan === plan
                          ? "bg-purple-600 text-white"
                          : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                          }`}
                      >
                        {plan}
                      </button>
                    ))}
                  </div>

                  {/* Calendar Section */}
                  <div className="border rounded-lg p-4 md:p-6">
                    <div className="flex justify-between items-center mb-6">
                      <button className="p-2 rounded-full hover:bg-gray-100">
                        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                      </button>
                      <div className="flex flex-col md:flex-row gap-4 md:gap-8 overflow-x-auto">
                        {renderCalendar(0)}
                        {renderCalendar(1)}
                      </div>
                      <button className="p-2 rounded-full hover:bg-gray-100">
                        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bottom Navigation */}
                <div className="mt-6 flex justify-between items-center">
                  <button className="px-4 md:px-6 py-2 border border-purple-600 text-purple-600 rounded-full hover:bg-purple-600 hover:text-white text-sm md:text-base">
                    CLEAR
                  </button>
                  <button className="px-4 md:px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 text-sm md:text-base">
                    Build Menu
                  </button>
                </div>
              </div>
            </div>
          )}

          {selectedStep === 2 && (
            <div className="p-4 md:p-6 max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                <h2 className="text-xl md:text-2xl font-semibold">Meal selection</h2>
                <p className="text-sm font-medium text-gray-600">
                  Swap pre-selected favourites by choosing yours
                </p>
              </div>

              <div className="flex gap-3 overflow-x-auto mb-6 pb-2">
                {dates.map((date) => (
                  <button
                    key={date}
                    onClick={() => handleDateSelect(date)}
                    className={`px-6 py-3 rounded-full font-medium ${selectedDate === date
                      ? "bg-purple-600 text-white"
                      : "border border-gray-300 text-gray-700 hover:bg-gray-50"}`}
                  >
                    {date}
                  </button>
                ))}
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-lg md:text-xl font-medium mb-4">Breakfast</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {mealData[selectedDate].breakfast.map((meal, index) => (
                      <div key={index} className="bg-white rounded-lg shadow-sm p-4">
                        <img src={meal.image} alt={meal.name} className="w-full h-48 object-cover rounded-lg" />
                        <div className="mt-4">
                          <h4 className="text-base md:text-lg font-medium">{meal.name}</h4>
                          <p className="text-sm font-medium text-gray-600">{meal.weight}</p>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-2 gap-4">
                          <div className="text-sm font-medium space-y-1">
                            <p>Energy: {meal.nutrition.energy}</p>
                            <p>Protein: {meal.nutrition.protein}</p>
                            <p>Fat: {meal.nutrition.fat}</p>
                            <p>Carbohydrates: {meal.nutrition.carbohydrates}</p>
                          </div>
                          <button className="w-full md:w-auto px-4 py-2 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700">
                            SELECT
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedStep === 3 && (
            <div className="p-4 md:p-8">
              <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                <h2 className="text-xl md:text-2xl font-semibold">Enhance your plan</h2>
                <button className="px-4 md:px-6 py-2 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 flex items-center gap-2">
                  SKIP
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.243 7.032a.75.75 0 010 1.06l-3.5 3.5a.75.75 0 01-1.06 0l-3.5-3.5a.75.75 0 011.06-1.06l2.47 2.47 2.47-2.47a.75.75 0 011.06 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Enhancement Items */}
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                  <div key={item} className="bg-white rounded-lg shadow-sm p-4">
                    <div className="flex items-center gap-4">
                      <img src="/api/placeholder/80/80" alt="Item" className="w-12 h-12 md:w-16 md:h-16 rounded-full" />
                      <div className="flex-grow">
                        <h3 className="text-base md:text-lg font-medium">Enhancement Item {item}</h3>
                        <p className="text-sm font-medium text-gray-600">AED{item * 5}.00 / day</p>
                      </div>
                      <input type="checkbox" className="w-5 h-5 text-purple-600 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedStep === 4 && (
            <div className="flex justify-center p-4">
              <form onSubmit={handleFormSubmit} className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-4 md:p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {/* Form fields remain the same, just adding responsive padding and spacing */}
                  {/* Example of a responsive form field */}
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">First name*</label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-sm"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Last name*</label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-sm"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Email*</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-sm"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Whatsapp Number*</label>
                    <div className="flex">
                      <div className="relative flex-grow focus-within:z-10">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <img src="/api/placeholder/24/24" alt="United Arab Emirates" className="w-6 h-6" />
                        </div>
                        <select
                          id="countryCode"
                          name="countryCode"
                          value={formData.countryCode}
                          onChange={handleInputChange}
                          className="block w-full pl-10 pr-12 py-2 text-sm rounded-l-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        >
                          <option value="+971">+971</option>
                        </select>
                      </div>
                      <input
                        type="tel"
                        name="whatsappNumber"
                        id="whatsappNumber"
                        value={formData.whatsappNumber}
                        onChange={handleInputChange}
                        className="block w-full rounded-r-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                        placeholder="5XXXXXXXX"
                        required />
                    </div>
                  </div>
                  {/* <p className="mt-4 text-sm text-gray-600">
                    Please select the correct number prefix and remove the first 0 when inputting your WhatsApp number.
                  </p> */}
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Address Type*</label>
                    <select
                      id="addressType"
                      name="addressType"
                      value={formData.addressType}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                    >
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">House Number*</label>
                    <input
                      type="text"
                      name="houseNumber"
                      id="houseNumber"
                      value={formData.houseNumber}
                      onChange={handleInputChange}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-sm"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Building Name*</label>
                    <input
                      type="text"
                      name="buildingName"
                      id="buildingName"
                      value={formData.buildingName}
                      onChange={handleInputChange}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-sm"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Area Name*</label>
                    <input
                      type="text"
                      name="areaName"
                      id="areaName"
                      value={formData.areaName}
                      onChange={handleInputChange}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-sm"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Street Address*</label>
                    <input
                      type="text"
                      name="streetAddress"
                      id="streetAddress"
                      value={formData.streetAddress}
                      onChange={handleInputChange}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-sm"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Emirates*</label>
                    <select
                      id="emirate"
                      name="emirate"
                      value={formData.emirate}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                    >
                      <option value="abu-dhabi">Abu Dhabi</option>
                      <option value="dubai">Dubai</option>
                      <option value="sharjah">Sharjah</option>
                      <option value="ajman">Ajman</option>
                      <option value="umm-al-quwain">Umm Al Quwain</option>
                      <option value="ras-al-khaimah">Ras Al Khaimah</option>
                      <option value="fujairah">Fujairah</option>
                    </select>
                  </div>
                  {/* Add other form fields similarly */}
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8">
                  <button
                    type="button"
                    onClick={() => setSelectedStep(3)}
                    className="px-6 py-2 border border-[#464194] text-[#464194] rounded-full font-medium hover:bg-[#3b377a] hover:text-white"
                  >
                    BACK
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-purple-600 text-white rounded-full font-medium hover:bg-[#3b377a]"
                  >
                    COMPLETE ORDER
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
      <FooterPage />
    </>
  );
};

export default CombinedPage;
