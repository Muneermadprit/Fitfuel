import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    ChevronDown, ChevronUp, Plus, Edit, Trash2,
    Home, ShoppingBag, UserCircle, Settings, LogOut
} from 'lucide-react';
import logo from '../images/logo.png';
import Navigation from './mealListNavigation';

// Address Modal Component
const AddressModal = ({ isOpen, onClose, onSubmit, initialAddress = null }) => {
    const [address, setAddress] = useState(initialAddress || {
        street: '',
        buildingFloor: '',
        houseOrFlatNumber: '',
        landmark: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        phone: '',
        identifier: ''
    });

    useEffect(() => {
        if (initialAddress) {
            setAddress(initialAddress);
        }
    }, [initialAddress]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(address);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md mx-4">
                <h2 className="text-xl font-semibold mb-4 text-green-700">
                    {initialAddress ? 'Edit Address' : 'Add New Address'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="street"
                            value={address.street}
                            onChange={handleChange}
                            placeholder="Street"
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
                            required
                        />
                        <input
                            type="text"
                            name="buildingFloor"
                            value={address.buildingFloor}
                            onChange={handleChange}
                            placeholder="Building/Floor"
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="houseOrFlatNumber"
                            value={address.houseOrFlatNumber}
                            onChange={handleChange}
                            placeholder="House/Flat Number"
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
                        />
                        <input
                            type="text"
                            name="landmark"
                            value={address.landmark}
                            onChange={handleChange}
                            placeholder="Landmark"
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="city"
                            value={address.city}
                            onChange={handleChange}
                            placeholder="City"
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
                            required
                        />
                        <input
                            type="text"
                            name="state"
                            value={address.state}
                            onChange={handleChange}
                            placeholder="State"
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="postalCode"
                            value={address.postalCode}
                            onChange={handleChange}
                            placeholder="Postal Code"
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
                            required
                        />
                        <input
                            type="text"
                            name="country"
                            value={address.country}
                            onChange={handleChange}
                            placeholder="Country"
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <input
                            type="tel"
                            name="phone"
                            value={address.phone}
                            onChange={handleChange}
                            placeholder="Phone Number"
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
                            required
                        />
                        <input
                            type="text"
                            name="identifier"
                            value={address.identifier}
                            onChange={handleChange}
                            placeholder="Address Type (Home, Work)"
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                        >
                            {initialAddress ? 'Update Address' : 'Save Address'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Main User Profile Component
const UserProfile = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [profileData, setProfileData] = useState(null);
    const [expandedOrderId, setExpandedOrderId] = useState(null);
    const [packageDetails, setPackageDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [paymentStatusFilter, setPaymentStatusFilter] = useState(-1);

    // New state for address management
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);

    // Load RazorPay script
    useEffect(() => {
        const loadRazorpayScript = () => {
            return new Promise((resolve) => {
                const script = document.createElement('script');
                script.src = 'https://checkout.razorpay.com/v1/checkout.js';
                script.onload = () => {
                    resolve(true);
                };
                script.onerror = () => {
                    resolve(false);
                };
                document.body.appendChild(script);
            });
        };

        // Load RazorPay script when component mounts
        loadRazorpayScript();
    }, []);

    // Fetch profile data
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://api.dailyfit.ae/api/user/get-profile', { withCredentials: true });
                setProfileData(response.data.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    // Fetch package details
    const fetchPackageDetails = async (orderID) => {
        // Only fetch if not already cached
        if (packageDetails[orderID]) return packageDetails[orderID];

        try {
            const response = await axios.post('https://api.dailyfit.ae/api/user/get-order-meal-details', {
                orderID: orderID
            }, { withCredentials: true });

            // Cache the package details
            setPackageDetails(prev => ({
                ...prev,
                [orderID]: response.data
            }));

            return response.data;
        } catch (err) {
            console.error('Error fetching package details', err);
            return null;
        }
    };

    // Handler for expanding order details
    const handleExpandOrder = async (order) => {
        // If clicking the same order, collapse it
        if (expandedOrderId === order.orderID) {
            setExpandedOrderId(null);
            return;
        }

        // Fetch package details if not already fetched
        await fetchPackageDetails(order.orderID);
        setExpandedOrderId(order.orderID);
    };

    // Add new address
    const handleAddAddress = async (newAddress) => {
        try {
            await axios.post('https://api.dailyfit.ae/api/user/add-address', {
                address: newAddress
            }, { withCredentials: true });

            // Update profile data with new address
            setProfileData(prev => ({
                ...prev,
                savedAddress: [...prev.savedAddress, newAddress]
            }));
        } catch (err) {
            console.error('Error adding address', err);
        }
    };


    // Edit existing address
    const handleEditAddress = async (updatedAddress) => {
        try {
            // Format the request body according to the API requirements
            const requestBody = {
                identifier: updatedAddress.identifier,
                address: {
                    ...updatedAddress
                    // Include all address fields that were in the form
                }
            };

            // Call the update address API endpoint
            await axios.patch('https://api.dailyfit.ae/api/user/update-address',
                requestBody,
                { withCredentials: true }
            );

            // Update profile data in state
            setProfileData(prev => ({
                ...prev,
                savedAddress: prev.savedAddress.map(addr =>
                    addr.identifier === updatedAddress.identifier ? updatedAddress : addr
                )
            }));
        } catch (err) {
            console.error('Error updating address', err);
        }
    };

    // Open edit address modal with the selected address data
    const openEditAddressModal = (address) => {
        setEditingAddress(address);
        setIsAddressModalOpen(true);
    };

    // Delete address
    const handleDeleteAddress = async (addressToDelete) => {
        try {
            await axios.delete('https://api.dailyfit.ae/api/user/delete-address', {
                data: { identifier: addressToDelete.identifier },
                withCredentials: true
            });

            // Update profile data
            setProfileData(prev => ({
                ...prev,
                savedAddress: prev.savedAddress.filter(addr =>
                    addr.identifier !== addressToDelete.identifier
                )
            }));
        } catch (err) {
            console.error('Error deleting address', err);
        }
    };

    // Function to handle Pay Now button click
    const handlePayNow = async (order) => {
        try {
            // First check if the order has RazorPay details
            if (!order.RazorPayOrderDetails || !order.RazorPayOrderDetails.id) {
                console.error('Missing RazorPay order details');
                return;
            }

            // Initialize RazorPay payment
            const options = {
                key: "your_razorpay_key_id", // Replace with your actual RazorPay key
                amount: order.RazorPayOrderDetails.amount,
                currency: order.RazorPayOrderDetails.currency,
                name: "DailyFit",
                description: `Payment for Order ID: ${order.orderID}`,
                order_id: order.RazorPayOrderDetails.id,
                handler: function (response) {
                    // Verify payment on your server
                    verifyPayment(response, order.orderID);
                },
                prefill: {
                    name: profileData.userName,
                    email: profileData.userEmail,
                    contact: profileData.phone || ""
                },
                theme: {
                    color: "#22C55E" // Green color to match your theme
                }
            };

            // Initialize and open RazorPay checkout
            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            console.error('Error initiating payment', err);
        }
    };

    // Function to handle Retry Payment button click
    const handleRetryPayment = (order) => {
        // Simply call the handlePayNow function to retry
        handlePayNow(order);
    };

    // Function to verify payment with your backend
    const verifyPayment = async (paymentResponse, orderID) => {
        try {
            const response = await axios.post(
                'https://api.dailyfit.ae/api/user/verify-payment',
                {
                    orderID: orderID,
                    paymentID: paymentResponse.razorpay_payment_id,
                    razorpay_order_id: paymentResponse.razorpay_order_id,
                    razorpay_signature: paymentResponse.razorpay_signature
                },
                { withCredentials: true }
            );

            if (response.data.status) {
                // Update the local state to reflect payment success
                setProfileData(prev => ({
                    ...prev,
                    orders: prev.orders.map(order =>
                        order.orderID === orderID
                            ? { ...order, paymentStatus: 1 }
                            : order
                    )
                }));

                // Show success message to user
                alert('Payment successful!');
            } else {
                alert('Payment verification failed. Please try again.');
            }
        } catch (err) {
            console.error('Payment verification error', err);
            alert('Payment verification failed. Please try again.');
        }
    };

    // Logout handler
    const handleLogout = async () => {
        try {
            await axios.post('https://api.dailyfit.ae/api/user/logout', {}, { withCredentials: true });
            // Redirect to login page or clear user session
            window.location.href = '/Order';
        } catch (err) {
            console.error('Logout error', err);
        }
    };

    // Loading state
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-green-50">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-green-50 text-red-500">
                <p>Error loading profile: {error.message}</p>
            </div>
        );
    }

    // Ensure profileData exists
    if (!profileData) {
        return null;
    }

    const getInitials = (name) => {
        if (!name) return "";
        const parts = name.trim().split(" ");
        if (parts.length === 1) return parts[0][0].toUpperCase();
        return (parts[0][0] + parts[1][0]).toUpperCase();
    };

    return (
        <div className="bg-gradient-to-b from-green-50 to-green-100 min-h-screen pb-12">
            {/* Navigation Header */}
            <Navigation />

            <div className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Tabs Navigation - Enhanced with better styling */}
                <div className="flex mb-8 bg-white rounded-xl shadow-md overflow-hidden">
                    <button
                        className={`flex-1 px-6 py-4 transition-colors font-medium ${activeTab === 'profile'
                            ? 'bg-green-600 text-white shadow-inner'
                            : 'text-green-700 hover:bg-green-50'
                            }`}
                        onClick={() => setActiveTab('profile')}
                    >
                        <div className="flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Profile & Addresses
                        </div>
                    </button>
                    <button
                        className={`flex-1 px-6 py-4 transition-colors font-medium ${activeTab === 'orders'
                            ? 'bg-green-600 text-white shadow-inner'
                            : 'text-green-700 hover:bg-green-50'
                            }`}
                        onClick={() => setActiveTab('orders')}
                    >
                        <div className="flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            My Orders
                        </div>
                    </button>
                </div>

                {/* Profile & Addresses Content */}
                {activeTab === 'profile' && (
                    <div className="space-y-8">
                        {/* Personal Information Section - Enhanced with card styling */}
                        <div className="bg-white shadow-lg rounded-xl p-8 border-l-4 border-green-500 hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center mb-8">
                                <div className="flex items-center justify-center h-20 w-20 rounded-full bg-green-200 text-green-800 font-bold text-2xl mr-6 uppercase shadow-md">
                                    {getInitials(profileData.userName)}
                                </div>
                                <h2 className="text-3xl font-extrabold text-green-800">Personal Information</h2>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-green-50 rounded-lg p-4">
                                    <p className="font-medium text-green-700 mb-1 text-sm">Full Name</p>
                                    <p className="text-gray-900 font-medium text-lg">{profileData.userName}</p>
                                </div>
                                <div className="bg-green-50 rounded-lg p-4">
                                    <p className="font-medium text-green-700 mb-1 text-sm">Email Address</p>
                                    <p className="text-gray-900 font-medium text-lg">{profileData.userEmail}</p>
                                </div>
                            </div>
                        </div>
                        {/* Saved Addresses Section - Enhanced with better card styling */}
                        <div className="bg-white shadow-lg rounded-xl p-8 border-l-4 border-green-500 hover:shadow-xl transition-shadow duration-300">
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center">
                                    <div className="bg-green-100 p-3 rounded-full mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-2xl font-bold text-green-800">Saved Addresses</h2>
                                </div>
                                <button
                                    onClick={() => {
                                        setEditingAddress(null);
                                        setIsAddressModalOpen(true);
                                    }}
                                    className="flex items-center text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors shadow-md"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Add New Address
                                </button>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {profileData.savedAddress.map((address, index) => (
                                    <div
                                        key={index}
                                        className="border-b pb-4 last:border-b-0 flex justify-between items-center hover:bg-green-50 p-3 rounded transition"
                                    >
                                        <div>
                                            <p className="font-semibold text-green-900">{address.street}</p>
                                            <p className="text-gray-600">{address.buildingFloor}, {address.houseOrFlatNumber}</p>
                                            <p className="text-gray-600">{address.landmark}</p>
                                            <p className="text-gray-600">
                                                {address.city}, {address.state} {address.postalCode}
                                            </p>
                                            <p className="text-gray-600">{address.country}</p>
                                            <p className="text-gray-600">Phone: {address.phone}</p>
                                            {address.identifier && (
                                                <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded mt-2 inline-block">
                                                    {address.identifier}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => openEditAddressModal(address)}
                                                className="text-green-500 hover:bg-green-100 p-2 rounded"
                                            >
                                                <Edit size={20} />
                                            </button>
                                            {/* <button
                                                onClick={() => handleDeleteAddress(address)}
                                                className="text-red-500 hover:bg-red-100 p-2 rounded"
                                            >
                                                <Trash2 size={20} />
                                            </button> */}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Orders Content */}
                {activeTab === 'orders' && (
                    <div className="bg-white shadow-lg rounded-xl p-8 border-l-4 border-green-500 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                            <div className="flex items-center">
                                <div className="bg-green-100 p-3 rounded-full mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-green-800">My Orders</h2>
                            </div>

                            {/* Payment Status Filter Dropdown */}
                            <div className="relative">
                                <select
                                    className="appearance-none bg-green-50 border border-green-200 text-green-700 py-2 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent cursor-pointer font-medium"
                                    onChange={(e) => setPaymentStatusFilter(parseInt(e.target.value))}
                                    value={paymentStatusFilter}
                                >
                                    <option value="-1">All Orders</option>
                                    <option value="0">Payment Pending</option>
                                    <option value="1">Payment Successful</option>
                                    <option value="2">Payment Failed</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-green-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {loading ? (
                            <div className="text-center py-12">
                                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
                                <p className="mt-4 text-green-700 font-medium">Loading your orders...</p>
                            </div>
                        ) : error ? (
                            <div className="bg-red-50 p-4 rounded-lg text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-red-700 font-medium">Something went wrong while loading your orders.</p>
                                <button className="mt-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
                                    Try Again
                                </button>
                            </div>
                        ) : profileData?.orders?.length > 0 ? (
                            <div className="space-y-6">
                                {profileData.orders
                                    .filter(order => paymentStatusFilter === -1 || order.paymentStatus === paymentStatusFilter)
                                    .map((order, index) => (
                                        <div key={index} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition duration-300">
                                            {/* Order Summary Header */}
                                            <div
                                                className={`p-6 ${expandedOrderId === order.orderID ? 'bg-green-50' : 'bg-white'} hover:bg-green-50 cursor-pointer transition-colors`}
                                                onClick={() => handleExpandOrder(order)}
                                            >
                                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                                        {/* Order ID with icon */}
                                                        <div className="flex items-center">
                                                            <div className="bg-green-600 text-white rounded-l-lg px-3 py-2">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                                                </svg>
                                                            </div>
                                                            <div className="bg-green-100 text-green-800 rounded-r-lg px-3 py-2 font-bold">
                                                                #{order.orderID}
                                                            </div>
                                                        </div>

                                                        {/* Package Type */}
                                                        <span className="inline-block bg-green-600 text-white px-4 py-1 rounded-lg text-sm font-medium">
                                                            {order.selectedPackage?.packageName || "Package"}
                                                        </span>
                                                    </div>

                                                    {/* Enhanced Total Amount Display */}
                                                    <div className="flex items-center">
                                                        <div className="bg-green-600 text-white px-3 py-2 rounded-l-lg font-medium">
                                                            TOTAL
                                                        </div>
                                                        <div className="bg-green-500 text-white px-3 py-2 font-bold text-lg">
                                                            AED
                                                        </div>
                                                        <div className="bg-green-100 text-green-800 px-3 py-2 rounded-r-lg font-bold text-lg">
                                                            {order.amount}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Date and Payment Status Row */}
                                                <div className="mt-6 flex flex-col md:flex-row justify-between items-start md:items-center">
                                                    <div className="flex flex-wrap gap-6 mb-4 md:mb-0">
                                                        <div className="flex items-center bg-green-50 px-3 py-2 rounded-lg">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>
                                                            <div>
                                                                <span className="block text-xs text-gray-500">Start Date</span>
                                                                <span className="font-medium text-green-800">{order.startDate?.slice(0, 10) || order.selectedPackage?.startDate}</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center bg-green-50 px-3 py-2 rounded-lg">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>
                                                            <div>
                                                                <span className="block text-xs text-gray-500">End Date</span>
                                                                <span className="font-medium text-green-800">{order.endDate?.slice(0, 10) || order.selectedPackage?.endDate}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <div>
                                                            <div className="flex items-center">
                                                                {order.bagIncluded ? (
                                                                    <>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                        </svg>
                                                                        <span className="font-medium text-green-600">Bag Included</span>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6  18L18 6M6 6l12 12" />
                                                                        </svg>
                                                                        <span className="font-medium text-gray-500">Bag Not Included</span>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Payment Status with Actions */}
                                                    <div className="flex items-center gap-3">
                                                        {order.paymentStatus === 0 && (
                                                            <>
                                                                <span className="bg-yellow-100 text-yellow-800 px-3 py-2 rounded-lg text-sm font-medium flex items-center">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                    </svg>
                                                                    Payment Pending
                                                                </span>
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handlePayNow(order);
                                                                    }}
                                                                    className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition shadow-md flex items-center"
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                                                    </svg>
                                                                    Pay Now
                                                                </button>
                                                            </>
                                                        )}
                                                        {order.paymentStatus === 1 && (
                                                            <span className="bg-green-100 text-green-800 px-3 py-2 rounded-lg text-sm font-medium inline-flex items-center">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                </svg>
                                                                Payment Successful
                                                            </span>
                                                        )}
                                                        {order.paymentStatus === 2 && (
                                                            <>
                                                                <span className="bg-red-100 text-red-800 px-3 py-2 rounded-lg text-sm font-medium inline-flex items-center">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                    </svg>
                                                                    Payment Failed
                                                                </span>
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleRetryPayment(order);
                                                                    }}
                                                                    className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition shadow-md flex items-center"
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                                    </svg>
                                                                    Retry Payment
                                                                </button>
                                                            </>
                                                        )}

                                                        {/* Toggle icon with animation */}
                                                        <div className="ml-2">
                                                            {expandedOrderId === order.orderID ? (
                                                                <div className="bg-green-200 p-2 rounded-full transition-transform duration-300 transform rotate-180">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                                    </svg>
                                                                </div>
                                                            ) : (
                                                                <div className="bg-green-200 p-2 rounded-full transition-transform duration-300">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                                    </svg>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Expandable Package Details with enhanced meal cards */}
                                            {expandedOrderId === order.orderID && packageDetails[order.orderID] && (
                                                <div className="space-y-6">
                                                    {/* Meals Section */}
                                                    {packageDetails[order.orderID].data[0].selectedMeals?.map((dayMeal, index) => (
                                                        <details key={index} className="bg-white border rounded-lg shadow">
                                                            <summary className="sticky top-0 z-10 bg-green-100 p-4 text-lg font-semibold cursor-pointer">
                                                                🍽️ Meals for {new Date(dayMeal.date).toLocaleDateString('en-US', {
                                                                    weekday: 'long',
                                                                    month: 'long',
                                                                    day: 'numeric'
                                                                })}
                                                            </summary>
                                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-green-50">
                                                                {dayMeal.meals.map((meal, idx) => (
                                                                    <div key={idx} className="relative rounded-xl overflow-hidden border shadow hover:shadow-lg transition">
                                                                        {meal.image?.[0] && (
                                                                            <img
                                                                                src={meal.image[0]}
                                                                                alt={meal.mealName}
                                                                                className="h-48 w-full object-cover"
                                                                            />
                                                                        )}

                                                                        {/* Displaying the Meal Type Tag */}
                                                                        {meal.mealType?.[0]?.mealType && (
                                                                            <span className="absolute top-3 right-3 px-3 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg shadow-md">
                                                                                {meal.mealType[0].mealType}
                                                                            </span>
                                                                        )}

                                                                        <div className="p-4 space-y-2">
                                                                            <h4 className="text-lg font-bold">{meal.mealName}</h4>
                                                                            <p className="text-sm text-gray-600">{meal.description}</p>

                                                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-sm">
                                                                                <div>
                                                                                    <span className="text-green-700 font-semibold">
                                                                                        {meal.moreDetails.energy}
                                                                                    </span>
                                                                                    <br />kcal
                                                                                </div>
                                                                                <div>
                                                                                    <span className="text-green-700 font-semibold">
                                                                                        {meal.moreDetails.protein}
                                                                                    </span>
                                                                                    <br />Protein
                                                                                </div>
                                                                                <div>
                                                                                    <span className="text-green-700 font-semibold">
                                                                                        {meal.moreDetails.fat}
                                                                                    </span>
                                                                                    <br />Fat
                                                                                </div>
                                                                                <div>
                                                                                    <span className="text-green-700 font-semibold">
                                                                                        {meal.moreDetails.carbohydrates}
                                                                                    </span>
                                                                                    <br />Carbs
                                                                                </div>
                                                                            </div>

                                                                            {meal.moreDetails.allergens?.length > 0 && (
                                                                                <div className="bg-red-100 p-2 rounded text-xs text-red-800">
                                                                                    ⚠️ Allergens: {meal.moreDetails.allergens.join(', ')}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </details>
                                                    ))}

                                                    {/* Addons Section */}
                                                    {packageDetails[order.orderID].data[0].addons?.length > 0 && (
                                                        <details className="bg-white border rounded-lg shadow">
                                                            <summary className="sticky top-0 z-10 bg-purple-100 p-4 text-lg font-semibold cursor-pointer">
                                                                ➕ Addon Products
                                                            </summary>
                                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-purple-50">
                                                                {packageDetails[order.orderID].data[0].addons.map((addon, idx) => (
                                                                    <div key={idx} className="rounded-xl overflow-hidden border shadow hover:shadow-lg transition">
                                                                        {addon.image?.[0] && addon.image[0] !== "" ? (
                                                                            <img src={addon.image[0]} alt={addon.mealName} className="h-48 w-full object-cover" />
                                                                        ) : (
                                                                            <div className="h-48 bg-purple-100 flex items-center justify-center text-purple-400">
                                                                                📷 No Image
                                                                            </div>
                                                                        )}
                                                                        <div className="p-4 space-y-2">
                                                                            <h4 className="text-lg font-bold text-purple-700">{addon.mealName}</h4>
                                                                            <p className="text-sm text-gray-600">{addon.description}</p>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </details>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}

                                {/* No results message when filtered */}
                                {profileData.orders.length > 0 &&
                                    profileData.orders.filter(order => paymentStatusFilter === -1 || order.paymentStatus === paymentStatusFilter).length === 0 && (
                                        <div className="text-center py-8 bg-green-50 rounded-xl">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                            </svg>
                                            <h3 className="text-xl font-semibold text-green-800 mb-2">No Orders Match Your Filter</h3>
                                            <p className="text-gray-600">Try changing your filter selection to see more orders.</p>
                                        </div>
                                    )}
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-green-50 rounded-xl">
                                <div className="bg-white p-4 inline-block rounded-full mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-green-800 mb-2">No Orders Yet</h3>
                                <p className="text-gray-600 mb-6">You haven't placed any orders yet. Start exploring our meal packages!</p>
                                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors shadow-md font-medium flex items-center justify-center mx-auto">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    Browse Packages
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Address Modal Component would remain unchanged */}
                <AddressModal
                    isOpen={isAddressModalOpen}
                    onClose={() => setIsAddressModalOpen(false)}
                    onSubmit={editingAddress ? handleEditAddress : handleAddAddress}
                    initialAddress={editingAddress}
                />
            </div>
        </div>
    );
};

export default UserProfile;