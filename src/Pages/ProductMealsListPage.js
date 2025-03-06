// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ChevronLeft, ChevronRight, X } from "lucide-react";
// import { TiThMenuOutline } from 'react-icons/ti';
// import FooterPage from './FooterPage';
// const MealPlanShop = () => {
//     const navigate = useNavigate();

//     const handleClick = () => {
//         navigate('/select-plan');
//     };
//     const mealPlans = [
//         {
//             type: 'Low Cal',
//             calories: '450 calories',
//             price: 'from AED 387.25 per week',
//             image: 'https://fittmeals-resources.nutribotcrm.com/static/media/thumbs/public/fittmeals/Low_Cal_Thumbnail_square600.jpg'
//         },
//         {
//             type: 'Lean',
//             calories: '600 calories',
//             price: 'from AED 387.25 per week',
//             image: 'https://fittmeals-resources.nutribotcrm.com/static/media/thumbs/public/fittmeals/Low_Cal_Thumbnail_square600.jpg'
//         },
//         {
//             type: 'Muscle Gain',
//             calories: '750 calories',
//             price: 'from AED 412.25 per week',
//             image: 'https://fittmeals-resources.nutribotcrm.com/static/media/thumbs/public/fittmeals/Low_Cal_Thumbnail_square600.jpg'
//         },
//         {
//             type: 'Muscle Gain',
//             calories: '750 calories',
//             price: 'from AED 412.25 per week',
//             image: 'https://fittmeals-resources.nutribotcrm.com/static/media/thumbs/public/fittmeals/Low_Cal_Thumbnail_square600.jpg'
//         },
//         {
//             type: 'Muscle Gain',
//             calories: '750 calories',
//             price: 'from AED 412.25 per week',
//             image: 'https://fittmeals-resources.nutribotcrm.com/static/media/thumbs/public/fittmeals/Low_Cal_Thumbnail_square600.jpg'
//         },
//         {
//             type: 'Muscle Gain',
//             calories: '750 calories',
//             price: 'from AED 412.25 per week',
//             image: 'https://fittmeals-resources.nutribotcrm.com/static/media/thumbs/public/fittmeals/Low_Cal_Thumbnail_square600.jpg'
//         },

//     ];

//     const bottomMealPlans = [
//         {
//             type: 'Max Calories',
//             calories: 'from 2450 calories per day',
//             image: 'https://fittmeals-resources.nutribotcrm.com/static/media/thumbs/public/fittmeals/Low_Cal_Thumbnail_square600.jpg'
//         },
//         {
//             type: 'Dairy Free',
//             calories: '400-600 calories',
//             image: 'https://fittmeals-resources.nutribotcrm.com/static/media/thumbs/public/fittmeals/Low_Cal_Thumbnail_square600.jpg'
//         },
//         {
//             type: 'Vegetarian',
//             calories: '450-550 calories',
//             image: 'https://fittmeals-resources.nutribotcrm.com/static/media/thumbs/public/fittmeals/Low_Cal_Thumbnail_square600.jpg'
//         }
//     ];
//     const [menuOpen, setMenuOpen] = useState(false);

//     // Navigation links
//     const navLinks = [
//         { label: "Home", href: "/" },
//         { label: "About", href: "/about" },
//         { label: "Menu", href: "/menu" },
//         { label: "Contact", href: "/contact" }
//     ];

//     return (

//         <><>
//             <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md rounded-lg relative z-50">
//                 {/* Logo */}
//                 <div className="flex items-center space-x-4">
//                     <img
//                         src="/api/placeholder/60/60"
//                         alt="Logo"
//                         className="w-12 h-12 rounded-full shadow-sm" />
//                     <h1 className="text-xl font-semibold text-[#464194]">Daily Fit</h1>
//                 </div>

//                 {/* Desktop Navigation */}
//                 <nav className="hidden md:flex space-x-6">
//                     {navLinks.map((link) => (
//                         <span
//                             key={link.label}
//                             className="text-lg text-purple-600 hover:text-green-500 font-medium transition-colors cursor-pointer px-2"
//                         >
//                             {link.label}
//                         </span>
//                     ))}
//                 </nav>

//                 {/* Mobile Menu Button */}
//                 <button
//                     className="md:hidden text-[#464194] focus:outline-none"
//                     onClick={() => setMenuOpen(!menuOpen)}
//                 >
//                     <TiThMenuOutline className="w-8 h-8" />
//                 </button>

//                 {/* Mobile Menu */}
//                 <div
//                     className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
//                     onClick={() => setMenuOpen(false)} />
//                 <div
//                     className={`fixed top-0 right-0 h-full w-3/4 max-w-sm bg-white shadow-xl z-50 transition-transform duration-500 ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
//                 >
//                     <div className="flex items-center justify-between px-4 py-4 border-b">
//                         <h2 className="text-lg font-semibold text-gray-700">Menu</h2>
//                         <button
//                             className="text-gray-500 hover:text-gray-700 focus:outline-none"
//                             onClick={() => setMenuOpen(false)}
//                         >
//                             <X className="w-6 h-6" />
//                         </button>
//                     </div>
//                     <ul className="p-6 space-y-4">
//                         {navLinks.map((link) => (
//                             <li key={link.label}>
//                                 <span
//                                     className="block text-lg text-purple-600 hover:text-green-500 font-medium transition-colors cursor-pointer"
//                                     onClick={() => setMenuOpen(false)}
//                                 >
//                                     {link.label}
//                                 </span>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             </header>


//             <div className="max-w-7xl mx-auto px-4 py-8">
//                 {/* Row container */}
//                 <div className="flex flex-col lg:flex-row gap-8">
//                     {/* Main content column */}
//                     <div className="w-full lg:w-8/12">
//                         <div className="flex gap-4 mb-8">
//                             <button className="px-4 py-2 bg-purple-600 text-white rounded-full">
//                                 Meal Plans
//                             </button>
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//                             {mealPlans.map((plan, index) => (
//                                 <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
//                                     <div className="relative">
//                                         <img
//                                             src={plan.image}
//                                             className="w-full h-64 object-cover" />
//                                         <div className="absolute top-4 left-4">
//                                         </div>
//                                     </div>
//                                     <div className="p-6">
//                                         <h3 className="text-purple-600 font-normal text-sm mb-4">{plan.price}</h3> {/* Reduced text size */}
//                                         <button
//                                             className="w-full bg-white text-purple-600 border-2 border-purple-600 py-2 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
//                                             onClick={handleClick}
//                                         >
//                                             SELECT
//                                         </button>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Promo section column */}
//                     <div className="w-full lg:w-4/12">
//                         <div className="sticky top-8 mt-16">
//                             {/* Promo Card */}
//                             <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//                                 <div className="p-6">
//                                     <div className="flex items-center gap-4">
//                                         <div className="bg-purple-600 text-white p-2 rounded-lg">
//                                             <span className="text-xl">%</span>
//                                         </div>
//                                         <span className="font-semibold text-lg">Promo</span>
//                                     </div>
//                                     <h2 className="text-2xl font-bold mt-4">OUR BIGGEST OFFER EVER!</h2>
//                                     <p className="mt-2 text-gray-600">
//                                         Our BIGGEST OFFER YET is here! 🎊
//                                         Start the new year right with FREE breakfast + 25% off all monthly plans!
//                                     </p>
//                                     <p className="mt-4 text-gray-600">
//                                         Healthy eating has never been this easy—or this rewarding. Don't miss out, it's your time to shine in 2025.
//                                     </p>
//                                     <p className="mt-4 text-purple-600 font-semibold">
//                                         Use code: 25START
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//         </>
//             <FooterPage /></>
//     );
// };

// export default MealPlanShop;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { TiThMenuOutline } from 'react-icons/ti';
import axios from 'axios';
import FooterPage from './FooterPage';

const MealPlanShop = () => {
    const navigate = useNavigate();
    const [mealPlans, setMealPlans] = useState([]);
    const [bottomMealPlans, setBottomMealPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);

    // Fetch meal plans from API using Axios instead of fetch
    useEffect(() => {
        const fetchMealPlans = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://api.dailyfit.ae/api/user/get-meal-plans', {
                    withCredentials: true
                });

                // Axios automatically throws errors for non-2xx responses
                // and automatically parses JSON responses
                const data = response.data;

                // Assuming the API returns an object with mainPlans and specialPlans arrays
                setMealPlans(data.mainPlans || []);
                setBottomMealPlans(data.specialPlans || []);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch meal plans:", err);
                setError("Failed to load meal plans. Please try again later.");

                // Fallback to dummy data if API fails
                setMealPlans([
                    {
                        type: 'Low Cal',
                        calories: '450 calories',
                        price: 'from AED 387.25 per week',
                        image: 'https://fittmeals-resources.nutribotcrm.com/static/media/thumbs/public/fittmeals/Low_Cal_Thumbnail_square600.jpg'
                    },
                    {
                        type: 'Lean',
                        calories: '600 calories',
                        price: 'from AED 387.25 per week',
                        image: 'https://fittmeals-resources.nutribotcrm.com/static/media/thumbs/public/fittmeals/Low_Cal_Thumbnail_square600.jpg'
                    },
                    // Other fallback meal plans
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchMealPlans();
    }, []);

    const handleClick = () => {
        navigate('/select-plan');
    };

    // Navigation links
    const navLinks = [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Menu", href: "/menu" },
        { label: "Contact", href: "/contact" }
    ];

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

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Row container */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main content column */}
                    <div className="w-full lg:w-8/12">
                        <div className="flex gap-4 mb-8">
                            <button className="px-4 py-2 bg-purple-600 text-white rounded-full">
                                Meal Plans
                            </button>
                        </div>

                        {/* Loading state */}
                        {loading && (
                            <div className="flex justify-center items-center h-64">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                            </div>
                        )}

                        {/* Error state */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                                {error}
                            </div>
                        )}

                        {/* Meal plans grid */}
                        {!loading && !error && (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {mealPlans.map((plan, index) => (
                                    <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                                        <div className="relative">
                                            <img
                                                src={plan.image}
                                                alt={plan.type}
                                                className="w-full h-64 object-cover" />
                                            <div className="absolute top-4 left-4">
                                                {/* Optional badge or label can go here */}
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-semibold mb-1">{plan.type}</h3>
                                            <p className="text-gray-600 mb-2">{plan.calories}</p>
                                            <h3 className="text-purple-600 font-normal text-sm mb-4">{plan.price}</h3>
                                            <button
                                                className="w-full bg-white text-purple-600 border-2 border-purple-600 py-2 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
                                                onClick={handleClick}
                                            >
                                                SELECT
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Bottom meal plans section (if needed) */}
                        {!loading && !error && bottomMealPlans.length > 0 && (
                            <div className="mt-12">
                                <h2 className="text-2xl font-bold mb-6">Special Diet Plans</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {bottomMealPlans.map((plan, index) => (
                                        <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                                            <div className="relative">
                                                <img
                                                    src={plan.image}
                                                    alt={plan.type}
                                                    className="w-full h-48 object-cover" />
                                            </div>
                                            <div className="p-4">
                                                <h3 className="text-lg font-semibold mb-1">{plan.type}</h3>
                                                <p className="text-gray-600 mb-3">{plan.calories}</p>
                                                <button
                                                    className="w-full bg-white text-purple-600 border-2 border-purple-600 py-2 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
                                                    onClick={handleClick}
                                                >
                                                    SELECT
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Promo section column */}
                    <div className="w-full lg:w-4/12">
                        <div className="sticky top-8 mt-16">
                            {/* Promo Card */}
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                                <div className="p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-purple-600 text-white p-2 rounded-lg">
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
                                    <p className="mt-4 text-purple-600 font-semibold">
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