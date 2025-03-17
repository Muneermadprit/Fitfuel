import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { TiThMenuOutline } from 'react-icons/ti';
import FooterPage from './FooterPage';
import axios from "axios";
import logo from '../images/WhatsApp Image 2025-03-17 at 8.17.20 AM.jpeg'


const MealPlanShop = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [mealPlansData, setMealPlansData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Navigation links
    const navLinks = [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Menu", href: "/menu" },
        { label: "Contact", href: "/contact" }
    ];

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

                    // Extract unique categories
                    const uniqueCategories = [];
                    const categorySet = new Set();

                    response.data.data.forEach(mealPlan => {
                        mealPlan.category.forEach(cat => {
                            if (!categorySet.has(cat)) {
                                categorySet.add(cat);
                                uniqueCategories.push(cat);
                            }
                        });
                    });

                    setCategories(uniqueCategories);

                    // Set default selected category to the first one
                    if (uniqueCategories.length > 0) {
                        setSelectedCategory(uniqueCategories[0]);
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

    return (
        <>
            <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md rounded-lg relative z-50">
                {/* Logo */}
                <div className="flex items-center space-x-4">
                    <img
                        src={logo}
                        alt="Logo"
                        className="w-12 h-12 rounded-full shadow-sm" />
                    {/* <h1 className="text-xl font-semibold text-[#464194]">Daily Fit</h1> */}
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
                                            className={`px-4 py-2 text-white rounded-full whitespace-nowrap ${selectedCategory === category ? 'bg-[#059033]' : 'bg-[#059033]'}`}
                                            onClick={() => setSelectedCategory(category)}
                                        >
                                            {category}
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
                    <div className="w-full lg:w-4/12">
                        <div className="sticky top-8 mt-16">
                            {/* Promo Card */}
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
                    </div>
                </div>
            </div>

            <FooterPage />
        </>
    );
};

export default MealPlanShop;