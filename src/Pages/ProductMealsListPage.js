import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, X, Menu, ChevronDown, User, LogOut, Home, Info, Mail } from "lucide-react";
import axios from "axios";
import logo from '../images/logo1.png';
import FooterPage from './FooterPage';
import Navigation from './mealListNavigation';

const MealPlanShop = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [mealPlansData, setMealPlansData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isProfileVisible, setIsProfileVisible] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const categoriesContainerRef = useRef(null);

    useEffect(() => {
        const userType = sessionStorage.getItem('userType');
        setIsProfileVisible(!!userType);
        setIsLoggedIn(!!userType);
    }, []);

    useEffect(() => {
        const fetchMealPlans = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://api.dailyfit.ae/api/user/get-meal-plans', {
                    withCredentials: true
                });

                if (response.data.status) {
                    setMealPlansData(response.data.data);

                    const uniqueCategories = [];
                    const categorySet = new Set();

                    response.data.data.forEach(mealPlan => {
                        if (mealPlan.categoryDetails && mealPlan.categoryDetails.length > 0) {
                            mealPlan.categoryDetails.forEach(catDetail => {
                                if (!categorySet.has(catDetail.identifier)) {
                                    categorySet.add(catDetail.identifier);
                                    uniqueCategories.push({
                                        id: catDetail.identifier,
                                        name: catDetail.categoryName
                                    });
                                }
                            });
                        }
                    });

                    setCategories(uniqueCategories);

                    if (uniqueCategories.length > 0) {
                        setSelectedCategory(uniqueCategories[0].id);
                    }
                } else {
                    setError("Failed to load meal plans");
                }
            } catch (err) {
                setError("Error fetching meal plans: " + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMealPlans();
    }, []);

    const filteredMealPlans = mealPlansData.filter(plan =>
        plan.category.includes(selectedCategory)
    );

    const handleClick = (plan) => {
        console.log(plan._id, 'planfoom')
        sessionStorage.setItem('plan', plan._id);
        navigate('/select-plan', { state: { selectedPlan: plan } });
    };

    const handleLogout = () => {
        sessionStorage.clear();
        localStorage.clear();
        setIsLoggedIn(false);
        window.location.href = "/";
    };

    const scrollCategories = (direction) => {
        if (categoriesContainerRef.current) {
            const container = categoriesContainerRef.current;
            const scrollAmount = 200; // Adjust scrolling amount as needed

            if (direction === 'left') {
                container.scrollLeft -= scrollAmount;
                setScrollPosition(container.scrollLeft - scrollAmount);
            } else {
                container.scrollLeft += scrollAmount;
                setScrollPosition(container.scrollLeft + scrollAmount);
            }
        }
    };

    // Check if scrolling controls should be visible
    const checkScrollVisibility = () => {
        if (!categoriesContainerRef.current) return { showLeft: false, showRight: false };

        const container = categoriesContainerRef.current;
        const showLeft = container.scrollLeft > 0;
        const showRight = container.scrollLeft < container.scrollWidth - container.clientWidth - 5; // 5px buffer

        return { showLeft, showRight };
    };

    const { showLeft, showRight } = checkScrollVisibility();

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            {/* Header with glass effect */}
            <Navigation />

            {/* Main Content Area */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                {/* Page Title */}
                <div className="text-center mb-8 md:mb-10">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 md:text-4xl">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-400">Meal Plans</span>
                    </h1>
                    <p className="mt-2 sm:mt-3 max-w-2xl mx-auto text-gray-500 text-sm sm:text-base">
                        Choose a meal plan tailored to your dietary preferences and fitness goals
                    </p>
                </div>

                {/* Main Content */}
                <div className="w-full">
                    {loading ? (
                        <div className="text-center py-12 md:py-16">
                            <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-b-2 border-green-500 mx-auto"></div>
                            <p className="mt-3 md:mt-4 text-base md:text-lg text-gray-600">Loading meal plans...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-12 md:py-16 px-4">
                            <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-red-100 mb-3 md:mb-4">
                                <X size={24} className="text-red-600" />
                            </div>
                            <p className="text-base md:text-lg text-red-600 font-medium">{error}</p>
                            <button
                                className="mt-3 md:mt-4 px-3 py-1 md:px-4 md:py-2 bg-white text-gray-700 rounded-lg shadow hover:shadow-md border border-gray-200 text-sm md:text-base"
                                onClick={() => window.location.reload()}
                            >
                                Try Again
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* Category Tabs with Horizontal Scrolling */}
                            <div className="mb-6 md:mb-10 relative">
                                {/* Left scroll button - show only when there are enough categories to scroll */}
                                {categories.length > 3 && (
                                    <button
                                        onClick={() => scrollCategories('left')}
                                        className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-1 shadow ${showLeft ? 'visible' : 'invisible'}`}
                                        aria-label="Scroll left"
                                    >
                                        <ChevronLeft size={20} className="text-gray-700" />
                                    </button>
                                )}

                                {/* Scrollable container */}
                                <div
                                    className="overflow-x-auto scrollbar-hide w-full py-1 md:py-2 px-1 md:px-2"
                                    ref={categoriesContainerRef}
                                    onScroll={() => setScrollPosition(categoriesContainerRef.current?.scrollLeft || 0)}
                                >
                                    <div className="inline-flex bg-white-200 rounded-xl p-1 shadow-inner min-w-max space-x-1 mx-4 md:mx-8">
                                        {categories.map((category, index) => (
                                            <button
                                                key={index}
                                                className={`px-4 py-2 md:px-6 md:py-3 rounded-lg font-medium transition-all duration-200 whitespace-nowrap text-sm md:text-base
                                                     ${selectedCategory === category.id
                                                        ? 'bg-white text-green-600 shadow-lg transform -translate-y-0.5'
                                                        : 'text-gray-700 hover:bg-gray-100'}`}
                                                onClick={() => setSelectedCategory(category.id)}
                                            >
                                                {category.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Right scroll button - show only when there are enough categories to scroll */}
                                {categories.length > 3 && (
                                    <button
                                        onClick={() => scrollCategories('right')}
                                        className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-1 shadow ${showRight ? 'visible' : 'invisible'}`}
                                        aria-label="Scroll right"
                                    >
                                        <ChevronRight size={20} className="text-gray-700" />
                                    </button>
                                )}
                            </div>

                            {/* Meal Plans Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                                {filteredMealPlans.map((plan, index) => (
                                    <div
                                        key={index}
                                        className="group bg-white rounded-xl md:rounded-2xl shadow-md hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 md:hover:-translate-y-2 overflow-hidden flex flex-col"
                                    >
                                        <div className="relative overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                                            <img
                                                src={plan.image[0] || "/api/placeholder/400/320"}
                                                alt={plan.mealPlanName}
                                                className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute top-3 right-3 md:top-4 md:right-4 z-20">
                                                <span className="inline-flex items-center px-2 py-0.5 md:px-3 md:py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 shadow-sm">
                                                    {plan.categoryDetails && plan.categoryDetails[0]?.categoryName}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-4 md:p-6 flex-grow flex flex-col">
                                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1 md:mb-2">{plan.mealPlanName}</h3>
                                            <p className="text-gray-600 text-sm md:text-base mb-4 md:mb-6 flex-grow">
                                                {plan.description || "Experience a balanced nutritional plan designed by expert nutritionists."}
                                            </p>
                                            <button
                                                className="mt-auto w-full px-4 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl font-semibold transition-all duration-200 shadow-md 
                                                bg-gradient-to-r from-green-500 to-green-600 text-white text-sm md:text-base
                                                hover:from-green-600 hover:to-green-700 hover:shadow-lg transform hover:scale-105"
                                                onClick={() => handleClick(plan)}
                                            >
                                                Select Plan
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Empty State */}
                            {filteredMealPlans.length === 0 && (
                                <div className="text-center py-12 md:py-16 bg-gray-50 rounded-xl md:rounded-2xl shadow-inner">
                                    <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-gray-100 mb-3 md:mb-4">
                                        <Info size={20} className="text-gray-500" />
                                    </div>
                                    <h3 className="text-base md:text-lg font-medium text-gray-700">No meal plans found</h3>
                                    <p className="text-gray-500 mt-1 md:mt-2 text-sm md:text-base">Try selecting a different category</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>

            {/* Footer */}
            <FooterPage />
        </div>
    );
};

export default MealPlanShop;