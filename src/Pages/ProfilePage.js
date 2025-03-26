import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    User,
    ShoppingBag,
    Settings,
    ChevronDown,
    ChevronUp,
    LogOut,
    MapPin,
    CreditCard
} from 'lucide-react';
import logo from '../images/logo.png';

const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState('orders');
    const [expandedOrder, setExpandedOrder] = useState(null);
    // const [userProfile, setUserProfile] = useState(null);
    // const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // Assuming you have an authentication token stored in localStorage
                const token = localStorage.getItem('authToken');

                const response = await axios.get('https://api.dailyfit.ae/api/user/get-profile', {
                    withCredentials: true
                });
                console.log(response, 'opz')
                // Update user profile state
                // setUserProfile({
                //     name: response.data.name,
                //     email: response.data.email,
                //     phone: response.data.phone || '+1 (555) 123-4567', // Fallback if not provided
                //     address: response.data.address || '123 Green Valley Road, Sunnyville, CA 94123', // Fallback if not provided
                //     membership: response.data.membership || 'Standard Member',
                //     memberSince: response.data.memberSince || 'January 2024'
                // });

                // Fetch orders if available in the response
                // setOrders(response.data.orders || []);

                setLoading(false);
            } catch (err) {
                console.error('Error fetching profile:', err);
                setError('Failed to load profile. Please try again.');
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    // Mock data (you would replace this with actual user and order data)
    const userProfile = {
        name: "Emma Johnson",
        email: "emma.johnson@example.com",
        phone: "+1 (555) 123-4567",
        address: "123 Green Valley Road, Sunnyville, CA 94123",
        membership: "Premium Member",
        memberSince: "January 2024"
    };

    const orders = [
        {
            id: "ORD-2024-001",
            status: "Active",
            date: "March 15, 2024",
            total: "$129.99",
            plan: "Weekly Meal Plan",
            meals: [
                {
                    date: "March 18, 2024",
                    items: ["Grilled Salmon", "Quinoa Salad", "Roasted Vegetables"]
                },
                {
                    date: "March 19, 2024",
                    items: ["Chicken Stir Fry", "Brown Rice", "Steamed Broccoli"]
                }
            ]
        },
        {
            id: "ORD-2024-002",
            status: "pending",
            date: "March 22, 2024",
            total: "$99.99",
            plan: "Vegetarian Meal Plan",
            meals: [
                {
                    date: "March 25, 2024",
                    items: ["Vegetable Lasagna", "Mixed Green Salad", "Garlic Bread"]
                }
            ]
        }
    ];

    const toggleOrderExpansion = (orderId) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
            {/* Navigation */}
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
            </nav>
            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Profile Sidebar */}
                    <div className="md:col-span-1 bg-white rounded-2xl shadow-xl p-6">
                        <div className="text-center">
                            <img
                                src={`https://ui-avatars.com/api/?name=${userProfile.name}&background=10B981&color=fff&rounded=true`}
                                alt={userProfile.name}
                                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-green-500"
                            />
                            <h2 className="text-2xl font-bold text-green-800">{userProfile.name}</h2>
                            <p className="text-green-600 mb-4">{userProfile.email}</p>
                        </div>

                        <div className="space-y-4 mt-6">
                            <div className="bg-green-50 rounded-lg p-4">
                                <div className="flex items-center space-x-3 mb-2">
                                    <CreditCard className="text-green-600" size={20} />
                                    <span className="font-semibold text-green-800">Membership</span>
                                </div>
                                <p className="text-green-700">{userProfile.membership}</p>
                                <p className="text-green-600 text-sm">Member since {userProfile.memberSince}</p>
                            </div>

                            <div className="bg-green-50 rounded-lg p-4">
                                <div className="flex items-center space-x-3 mb-2">
                                    <MapPin className="text-green-600" size={20} />
                                    <span className="font-semibold text-green-800">Delivery Address</span>
                                </div>
                                <p className="text-green-700">{userProfile.address}</p>
                                <button className="mt-2 w-full py-2 border border-green-600 text-green-700 rounded-lg hover:bg-green-50 transition">
                                    Edit Address
                                </button>
                            </div>

                            <button className="w-full py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition flex items-center justify-center space-x-2">
                                <LogOut size={20} />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>

                    {/* Orders Section */}
                    <div className="md:col-span-2 bg-white rounded-2xl shadow-xl p-6">
                        <div className="flex border-b-2 border-green-200 mb-6">
                            <button
                                onClick={() => setActiveTab('orders')}
                                className={`flex-1 py-3 flex items-center justify-center space-x-2 ${activeTab === 'orders'
                                    ? 'border-b-4 border-green-600 text-green-800'
                                    : 'text-green-600 hover:bg-green-50'
                                    }`}
                            >
                                <ShoppingBag size={20} />
                                <span>My Orders</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('settings')}
                                className={`flex-1 py-3 flex items-center justify-center space-x-2 ${activeTab === 'settings'
                                    ? 'border-b-4 border-green-600 text-green-800'
                                    : 'text-green-600 hover:bg-green-50'
                                    }`}
                            >
                                <Settings size={20} />
                                <span>Account Settings</span>
                            </button>
                        </div>

                        {activeTab === 'orders' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-green-800 mb-4">Order History</h2>
                                {orders.map((order) => (
                                    <div
                                        key={order.id}
                                        className="border-2 border-green-100 rounded-lg overflow-hidden transition-shadow hover:shadow-md"
                                    >
                                        <div className="bg-green-50 p-4 flex justify-between items-center">
                                            <div>
                                                <div className="flex items-center space-x-3">
                                                    <span className="font-semibold text-green-900">Order #{order.id}</span>
                                                    <span className={`px-3 py-1 rounded-full text-sm ${order.status === 'Active'
                                                        ? 'bg-green-200 text-green-900'
                                                        : order.status === 'pending'
                                                            ? 'bg-yellow-200 text-yellow-900'
                                                            : 'bg-gray-200 text-gray-900'
                                                        }`}>
                                                        {order.status}
                                                    </span>
                                                </div>
                                                <p className="text-green-700 text-sm">{order.date}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-green-900 text-lg">{order.total}</p>
                                                <p className="text-green-700 text-sm">{order.plan}</p>
                                            </div>
                                        </div>

                                        <div className="p-4">
                                            {order.status === 'pending' && (
                                                <button
                                                    className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition mb-4"
                                                    onClick={() => console.log(`Retrying payment for order ${order.id}`)}
                                                >
                                                    Retry Payment
                                                </button>
                                            )}

                                            <button
                                                onClick={() => toggleOrderExpansion(order.id)}
                                                className="w-full py-2 border-2 border-green-600 text-green-700 rounded-lg hover:bg-green-50 flex items-center justify-center"
                                            >
                                                {expandedOrder === order.id ? (
                                                    <>
                                                        <ChevronUp size={20} className="mr-2" />
                                                        Hide Details
                                                    </>
                                                ) : (
                                                    <>
                                                        <ChevronDown size={20} className="mr-2" />
                                                        View Details
                                                    </>
                                                )}
                                            </button>

                                            {expandedOrder === order.id && (
                                                <div className="mt-4 border-t-2 border-green-100 pt-4">
                                                    {order.meals.map((mealDay) => (
                                                        <div key={mealDay.date} className="mb-4">
                                                            <h4 className="font-semibold text-green-800 mb-2">{mealDay.date}</h4>
                                                            <ul className="space-y-1 ml-4">
                                                                {mealDay.items.map((item, index) => (
                                                                    <li
                                                                        key={index}
                                                                        className="text-green-700 before:content-['▪'] before:text-green-600 before:mr-2"
                                                                    >
                                                                        {item}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'settings' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-green-800 mb-4">Account Settings</h2>
                                <div className="bg-green-50 p-6 rounded-lg">
                                    <h3 className="text-xl font-semibold text-green-900 mb-4">Personal Information</h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-green-800 mb-2">Full Name</label>
                                            <input
                                                type="text"
                                                value={userProfile.name}
                                                className="w-full p-3 border-2 border-green-200 rounded-lg focus:border-green-500 transition"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-green-800 mb-2">Email</label>
                                            <input
                                                type="email"
                                                value={userProfile.email}
                                                className="w-full p-3 border-2 border-green-200 rounded-lg focus:border-green-500 transition"
                                            />
                                        </div>
                                    </div>
                                    <button className="mt-6 w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                                        Update Profile
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;