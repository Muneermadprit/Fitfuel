import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { TiThMenuOutline } from 'react-icons/ti';
import FooterPage from './FooterPage';
import axios from "axios";
import logo from '../images/logo.png'


const MealPlanShop = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [mealPlansData, setMealPlansData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isProfileVisible, setIsProfileVisible] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check user type and set profile link visibility
    useEffect(() => {
        const userType = sessionStorage.getItem('userType');
        setIsProfileVisible(!!userType);
        setIsLoggedIn(!!userType);
    }, []);
    // Fetch meal plans from API
    useEffect(() => {
        const fetchMealPlans = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://api.dailyfit.ae/api/user/get-meal-plans', {
                    withCredentials: true
                });

                if (response.data.status) {
                    setMealPlansData(response.data.data);

                    // Extract unique categories with their details
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

                    // Set default selected category to the first one
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

    // Filter meal plans by selected category
    const filteredMealPlans = mealPlansData.filter(plan =>
        plan.category.includes(selectedCategory)
    );

    // Update the handleClick function to accept the plan data
    const handleClick = (plan) => {
        // Navigate to select-plan page with the selected plan data
        navigate('/select-plan', { state: { selectedPlan: plan } });
    };
    const handleLogout = () => {
        sessionStorage.clear();
        localStorage.clear();
        setIsLoggedIn(false);
        window.location.href = "/"; // Redirect to home after logout
    };

    return (
        <>
            <nav className="bg-gradient-to-r from-green-600 to-lime-600 text-white shadow-lg sticky top-0 z-50">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <a href="/" className="flex items-center">
                                <img src={logo} alt="DailyFit Logo" className="h-16 w-32 object-contain" />
                            </a>
                        </div>
                        <div className="hidden md:flex space-x-6">
                            <a href="/" className="text-white no-underline hover:text-green-200 transition duration-200">Home</a>
                            <a href="/about" className="text-white no-underline hover:text-green-200 transition duration-200">About</a>
                            <a href="/contact" className="text-white no-underline hover:text-green-200 transition duration-200">Contact</a>
                            {isProfileVisible && (
                                <a href="/profile" className="text-white no-underline hover:text-green-200 transition duration-200">Profile</a>
                            )}
                        </div>
                        <div className="flex items-center space-x-4">
                            {!isProfileVisible ? (
                                <a href="/Order" className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold no-underline hover:bg-green-100 transition duration-200">Login</a>
                            ) : (
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition duration-200">
                                    Logout
                                </button>
                            )}
                            <button className="md:hidden text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* <nav className="bg-gradient-to-r from-green-600 to-lime-600 text-white shadow-lg sticky top-0 z-50">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <a href="/" className="flex items-center">
                                <img src={logo} alt="DailyFit Logo" className="h-16 w-32 object-contain" />
                            </a>
                        </div>
                        <div className="hidden md:flex space-x-6">
                            <a href="/" className="text-white no-underline hover:text-green-200 transition duration-200">Home</a>
                            <a href="/about" className="text-white no-underline hover:text-green-200 transition duration-200">About</a>
                            <a href="/contact" className="text-white no-underline hover:text-green-200 transition duration-200">Contact</a>
                            {isProfileVisible && (
                                <a
                                    href="/profile"
                                    className="text-white no-underline hover:text-green-200 transition duration-200"
                                >
                                    Profile
                                </a>
                            )}
                        </div>
                        <div className="flex items-center space-x-4">
                            <a href="/Order" className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold no-underline hover:bg-green-100 transition duration-200">Login</a>
                            <button className="md:hidden text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav> */}

            {/* Rest of the component remains the same */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Row container */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main content column */}
                    <div className="w-full lg:w-8/12">
                        {loading ? (
                            <div className="text-center py-8">
                                <p className="text-lg text-gray-600">Loading meal plans...</p>
                            </div>
                        ) : error ? (
                            <div className="text-center py-8">
                                <p className="text-lg text-red-500">{error}</p>
                            </div>
                        ) : (
                            <>
                                {/* Category buttons */}
                                <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
                                    {categories.map((category, index) => (
                                        <button
                                            key={index}
                                            className={`px-4 py-2 text-white rounded-full whitespace-nowrap ${selectedCategory === category.id ? 'bg-[#059033]' : 'bg-[#059033]'}`}
                                            onClick={() => setSelectedCategory(category.id)}
                                        >
                                            {category.name}
                                        </button>
                                    ))}
                                </div>

                                {/* Meal Plans Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {filteredMealPlans.map((plan, index) => (
                                        <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                                            <div className="relative">
                                                <img
                                                    src={plan.image[0] || "/api/placeholder/400/320"}
                                                    alt={plan.mealPlanName}
                                                    className="w-full h-64 object-cover"
                                                />
                                                <div className="absolute top-4 left-4">
                                                </div>
                                            </div>
                                            <div className="p-6">
                                                <h3 className="text-lg font-semibold mb-1">{plan.mealPlanName}</h3>
                                                <p className="text-[#059033] font-normal text-sm mb-4">
                                                    {plan.description || "No description available"}
                                                </p>
                                                <button
                                                    className="w-full bg-white text-[#059033] border-2 border-[#059033] py-2 rounded-lg font-semibold hover:bg-green-50 transition-colors"
                                                    onClick={() => handleClick(plan)}
                                                >
                                                    SELECT
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Promo section column */}
                    {/* <div className="w-full lg:w-4/12">
                        <div className="sticky top-8 mt-16">
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                                <div className="p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-[#059033] text-white p-2 rounded-lg">
                                            <span className="text-xl">%</span>
                                        </div>
                                        <span className="font-semibold text-lg">Promo</span>
                                    </div>
                                    <h2 className="text-2xl font-bold mt-4">OUR BIGGEST OFFER EVER!</h2>
                                    <p className="mt-2 text-gray-600">
                                        Our BIGGEST OFFER YET is here! 🎊
                                        Start the new year right with FREE breakfast + 25% off all monthly plans!
                                    </p>
                                    <p className="mt-4 text-gray-600">
                                        Healthy eating has never been this easy—or this rewarding. Don't miss out, it's your time to shine in 2025.
                                    </p>
                                    <p className="mt-4 text-[#059033] font-semibold">
                                        Use code: 25START
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>

            <FooterPage />
        </>
    );
};

export default MealPlanShop;