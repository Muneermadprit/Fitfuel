import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Settings, User, ShoppingBag, LogOut } from 'lucide-react';
import { TiThMenuOutline } from 'react-icons/ti';
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import FooterPage from './FooterPage';
const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState('orders');
    const [expandedOrder, setExpandedOrder] = useState(null);

    const orders = [
        {
            id: "ORD001",
            date: "27 Jan 2025",
            status: "Active",
            plan: "MONTHLY (6 days per week)",
            total: "AED 899",
            meals: [
                { date: "27 Jan", items: ["Tiramisu Oats", "Grilled Chicken Salad", "Beef Stir Fry"] },
                { date: "28 Jan", items: ["Pesto Eggs", "Quinoa Bowl", "Salmon Teriyaki"] }
            ]
        },
        {
            id: "ORD002",
            date: "15 Jan 2025",
            status: "Completed",
            plan: "WEEKLY (5 days)",
            total: "AED 450",
            meals: [
                { date: "15 Jan", items: ["Avocado Toast", "Chicken Caesar Salad", "Fish Curry"] },
                { date: "16 Jan", items: ["Breakfast Burrito", "Greek Salad", "Vegetable Lasagna"] }
            ]
        },
        {
            id: "ORD003",
            date: "15 Jan 2025",
            status: "pending",
            plan: "WEEKLY (5 days)",
            total: "AED 600",
            meals: [
                { date: "15 Jan", items: ["Avocado Toaster", "Chicken Caesar ", "Fish Curry"] },
                { date: "16 Jan", items: ["Breakfast ", " Salad", "Vegetable"] }
            ]
        }
    ];

    const userProfile = {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+971 50 123 4567",
        address: "Villa 123, Street 45, Al Barsha, Dubai",
        image: "/api/placeholder/120/120"
    };

    const toggleOrderExpansion = (orderId) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };

    const [menuOpen, setMenuOpen] = useState(false);

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

            <div className="max-w-6xl mx-auto p-6">
                {/* Profile Header */}
                <div className="bg-white rounded-lg border-1 border-purple-600 shadow-[0px_4px_6px_rgba(70,65,148,0.4),0px_-4px_6px_rgba(70,65,148,0.4),4px_0px_6px_rgba(70,65,148,0.4),-4px_0px_6px_rgba(70,65,148,0.4)] p-6 mb-6">
                    <div className="flex items-center gap-6">
                        <img
                            src={`https://ui-avatars.com/api/?name=${userProfile.name}&background=6B46C1&color=fff&rounded=true`}
                            alt={userProfile.name}
                            className="w-24 h-24 rounded-full" />
                        <div className="flex-1">
                            <h1 className="text-2xl font-semibold">{userProfile.name}</h1>
                            <p className="text-gray-600">{userProfile.email}</p>
                            <p className="text-gray-600">{userProfile.phone}</p>
                        </div>
                        <button className="px-4 py-2 text-[#464194] border border-[#464194] rounded-full hover:bg-purple-600 hover:text-white flex items-center gap-2">
                            <Settings size={20} />
                            Edit Profile
                        </button>
                    </div>
                </div>



                {/* Navigation Tabs */}
                <div className="flex gap-6 mb-6">
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full ${activeTab === 'orders'
                            ? 'bg-purple-600 text-white'
                            : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        <ShoppingBag size={20} />
                        My Orders
                    </button>
                    <button
                        onClick={() => setActiveTab('address')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full ${activeTab === 'address'
                            ? 'bg-purple-600 text-white'
                            : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        <User size={20} />
                        Delivery Address
                    </button>
                </div>

                {/* Content Section */}
                <div className="bg-white rounded-lg border-1 border-purple-600 shadow-[0px_4px_6px_rgba(70,65,148,0.4),0px_-4px_6px_rgba(70,65,148,0.4),4px_0px_6px_rgba(70,65,148,0.4),-4px_0px_6px_rgba(70,65,148,0.4)] p-6 mb-6">
                    {activeTab === 'orders' && (
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold mb-4">Order History</h2>
                            {orders.map((order) => (
                                <div key={order.id} className="border rounded-lg p-4">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <div className="flex items-center gap-4">
                                                <span className="font-semibold">Order #{order.id}</span>
                                                <span className={`px-3 py-1 rounded-full text-sm ${order.status === 'Active'
                                                    ? 'bg-green-100 text-green-800'
                                                    : order.status === 'pending'
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : 'bg-gray-100 text-gray-800'}`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                            <p className="text-gray-600">{order.date}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold">{order.total}</p>
                                            <p className="text-gray-600">{order.plan}</p>
                                        </div>
                                    </div>

                                    {order.status === 'pending' && (
                                        <button
                                            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                                            onClick={() => {
                                                // Add your retry payment logic here
                                                console.log(`Retrying payment for order ${order.id}`);
                                            }}
                                        >
                                            Retry Your Payment
                                        </button>
                                    )}

                                    <button
                                        onClick={() => toggleOrderExpansion(order.id)}
                                        className="mt-4 text-[#464194] flex items-center gap-2"
                                    >
                                        {expandedOrder === order.id ? (
                                            <>
                                                <ChevronUp size={20} />
                                                Hide Details
                                            </>
                                        ) : (
                                            <>
                                                <ChevronDown size={20} />
                                                View Details
                                            </>
                                        )}
                                    </button>

                                    {expandedOrder === order.id && (
                                        <div className="mt-4 border-t pt-4">
                                            {order.meals.map((mealDay) => (
                                                <div key={mealDay.date} className="mb-4">
                                                    <h4 className="font-medium">{mealDay.date}</h4>
                                                    <ul className="ml-4">
                                                        {mealDay.items.map((item, index) => (
                                                            <li key={index} className="text-gray-600">• {item}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                // <div key={order.id} className="border rounded-lg p-4">
                                //     <div className="flex justify-between items-center">
                                //         <div>
                                //             <div className="flex items-center gap-4">
                                //                 <span className="font-semibold">Order #{order.id}</span>
                                //                 <span className={`px-3 py-1 rounded-full text-sm ${order.status === 'Active'
                                //                     ? 'bg-green-100 text-green-800'
                                //                     : 'bg-gray-100 text-gray-800'}`}>
                                //                     {order.status}
                                //                 </span>
                                //             </div>
                                //             <p className="text-gray-600">{order.date}</p>
                                //         </div>
                                //         <div className="text-right">
                                //             <p className="font-semibold">{order.total}</p>
                                //             <p className="text-gray-600">{order.plan}</p>
                                //         </div>
                                //     </div>

                                //     <button
                                //         onClick={() => toggleOrderExpansion(order.id)}
                                //         className="mt-4 text-[#464194] flex items-center gap-2"
                                //     >
                                //         {expandedOrder === order.id ? (
                                //             <>
                                //                 <ChevronUp size={20} />
                                //                 Hide Details
                                //             </>
                                //         ) : (
                                //             <>
                                //                 <ChevronDown size={20} />
                                //                 View Details
                                //             </>
                                //         )}
                                //     </button>

                                //     {expandedOrder === order.id && (
                                //         <div className="mt-4 border-t pt-4">
                                //             {order.meals.map((mealDay) => (
                                //                 <div key={mealDay.date} className="mb-4">
                                //                     <h4 className="font-medium">{mealDay.date}</h4>
                                //                     <ul className="ml-4">
                                //                         {mealDay.items.map((item, index) => (
                                //                             <li key={index} className="text-gray-600">• {item}</li>
                                //                         ))}
                                //                     </ul>
                                //                 </div>
                                //             ))}
                                //         </div>
                                //     )}
                                // </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'address' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
                            <div className="border rounded-lg p-4">
                                <p className="font-medium mb-2">Home Address</p>
                                <p className="text-gray-600">{userProfile.address}</p>
                                <button className="mt-4 text-[#464194] hover:text-[#3b377a]">
                                    Edit Address
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Logout Button */}
                <div className="mt-6 flex justify-end">
                    <button className="px-4 py-2 text-red-600 flex items-center gap-2 hover:text-red-700">
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </div>

            <FooterPage />
        </>
    );
};

export default ProfilePage;