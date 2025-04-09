// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//     ChevronDown, ChevronUp, Plus, Edit, Trash2,
//     Home, ShoppingBag, UserCircle, Settings, LogOut,
//     AlertCircle, CheckCircle, XCircle, RefreshCw
// } from 'lucide-react';
// import logo from '../images/logo.png'

// // Address Modal Component
// const AddressModal = ({ isOpen, onClose, onSubmit, initialAddress = null }) => {
//     const [address, setAddress] = useState(initialAddress || {
//         street: '',
//         buildingFloor: '',
//         houseOrFlatNumber: '',
//         landmark: '',
//         city: '',
//         state: '',
//         postalCode: '',
//         country: '',
//         phone: '',
//         identifier: ''
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setAddress(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         onSubmit(address);
//         onClose();
//     };

//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//             <div className="bg-white p-6 rounded-lg w-full max-w-md mx-4">
//                 <h2 className="text-xl font-semibold mb-4 text-green-700">
//                     {initialAddress ? 'Edit Address' : 'Add New Address'}
//                 </h2>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <div className="grid md:grid-cols-2 gap-4">
//                         <input
//                             type="text"
//                             name="street"
//                             value={address.street}
//                             onChange={handleChange}
//                             placeholder="Street"
//                             className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
//                             required
//                         />
//                         <input
//                             type="text"
//                             name="buildingFloor"
//                             value={address.buildingFloor}
//                             onChange={handleChange}
//                             placeholder="Building/Floor"
//                             className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
//                         />
//                     </div>
//                     <div className="grid md:grid-cols-2 gap-4">
//                         <input
//                             type="text"
//                             name="houseOrFlatNumber"
//                             value={address.houseOrFlatNumber}
//                             onChange={handleChange}
//                             placeholder="House/Flat Number"
//                             className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
//                         />
//                         <input
//                             type="text"
//                             name="landmark"
//                             value={address.landmark}
//                             onChange={handleChange}
//                             placeholder="Landmark"
//                             className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
//                         />
//                     </div>
//                     <div className="grid md:grid-cols-2 gap-4">
//                         <input
//                             type="text"
//                             name="city"
//                             value={address.city}
//                             onChange={handleChange}
//                             placeholder="City"
//                             className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
//                             required
//                         />
//                         <input
//                             type="text"
//                             name="state"
//                             value={address.state}
//                             onChange={handleChange}
//                             placeholder="State"
//                             className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
//                             required
//                         />
//                     </div>
//                     <div className="grid md:grid-cols-2 gap-4">
//                         <input
//                             type="text"
//                             name="postalCode"
//                             value={address.postalCode}
//                             onChange={handleChange}
//                             placeholder="Postal Code"
//                             className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
//                             required
//                         />
//                         <input
//                             type="text"
//                             name="country"
//                             value={address.country}
//                             onChange={handleChange}
//                             placeholder="Country"
//                             className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
//                             required
//                         />
//                     </div>
//                     <div className="grid md:grid-cols-2 gap-4">
//                         <input
//                             type="tel"
//                             name="phone"
//                             value={address.phone}
//                             onChange={handleChange}
//                             placeholder="Phone Number"
//                             className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
//                             required
//                         />
//                         <input
//                             type="text"
//                             name="identifier"
//                             value={address.identifier}
//                             onChange={handleChange}
//                             placeholder="Address Type (Home, Work)"
//                             className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
//                         />
//                     </div>
//                     <div className="flex justify-end space-x-2">
//                         <button
//                             type="button"
//                             onClick={onClose}
//                             className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             type="submit"
//                             className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
//                         >
//                             Save Address
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// // Navigation Header Component
// const NavigationHeader = ({ userName, onLogout }) => {
//     return (
//         <nav className="bg-gradient-to-r from-green-600 to-lime-600 text-white shadow-lg sticky top-0 z-50">
//             <div className="container mx-auto px-4 py-3">
//                 <div className="flex justify-between items-center">
//                     <div className="flex items-center">
//                         <a href="/" className="flex items-center">
//                             <img src={logo} alt="DailyFit Logo" className="h-16 w-32 object-contain" />
//                         </a>
//                     </div>
//                     <div className="hidden md:flex space-x-6">
//                         <a href="/" className="text-white no-underline hover:text-green-200 transition duration-200">Home</a>
//                         <a href="/about" className="text-white no-underline hover:text-green-200 transition duration-200">About</a>
//                         <a href="/contact" className="text-white no-underline hover:text-green-200 transition duration-200">Contact</a>
//                         <a
//                             href="/profile"
//                             className="text-white no-underline hover:text-green-200 transition duration-200"
//                         >
//                             Profile
//                         </a>
//                     </div>
//                     <div className="flex items-center space-x-4">
//                         <button
//                             onClick={() => {
//                                 sessionStorage.clear();
//                                 localStorage.clear();
//                                 window.location.href = "/"; // Redirect to home
//                             }}
//                             className="bg-white text-red-600 px-4 py-2 rounded-lg font-semibold no-underline hover:bg-red-100 transition duration-200"
//                         >
//                             Logout
//                         </button>
//                         <button className="md:hidden text-white">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                             </svg>
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </nav>
//     );
// };

// // Helper component for payment status
// const PaymentStatusBadge = ({ status }) => {
//     const statusMap = {
//         0: { label: 'Payment Pending', icon: AlertCircle, className: 'bg-yellow-100 text-yellow-800' },
//         1: { label: 'Payment Successful', icon: CheckCircle, className: 'bg-green-100 text-green-800' },
//         2: { label: 'Payment Failed', icon: XCircle, className: 'bg-red-100 text-red-800' }
//     };

//     const { label, icon: Icon, className } = statusMap[status] || statusMap[0];

//     return (
//         <div className={`flex items-center px-3 py-1 rounded-full ${className}`}>
//             <Icon size={16} className="mr-1" />
//             <span className="text-sm font-medium">{label}</span>
//         </div>
//     );
// };

// // Main User Profile Component
// const UserProfile = () => {
//     const [activeTab, setActiveTab] = useState('profile');
//     const [profileData, setProfileData] = useState(null);
//     const [expandedOrderId, setExpandedOrderId] = useState(null);
//     const [packageDetails, setPackageDetails] = useState({});
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [processingPayment, setProcessingPayment] = useState(null);

//     // New state for address management
//     const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
//     const [editingAddress, setEditingAddress] = useState(null);

//     // Fetch profile data
//     useEffect(() => {
//         const fetchProfileData = async () => {
//             try {
//                 setLoading(true);
//                 const response = await axios.get('https://api.dailyfit.ae/api/user/get-profile', { withCredentials: true });
//                 setProfileData(response.data.data);
//                 setLoading(false);
//             } catch (err) {
//                 setError(err);
//                 setLoading(false);
//             }
//         };

//         fetchProfileData();
//     }, []);

//     // Fetch package details
//     const fetchPackageDetails = async (orderID) => {
//         // Only fetch if not already cached
//         if (packageDetails[orderID]) return packageDetails[orderID];

//         try {
//             const response = await axios.post('https://api.dailyfit.ae/api/user/get-package-details', {
//                 id: orderID
//             }, { withCredentials: true });

//             // Cache the package details
//             setPackageDetails(prev => ({
//                 ...prev,
//                 [orderID]: response.data
//             }));

//             return response.data;
//         } catch (err) {
//             console.error('Error fetching package details', err);
//             return null;
//         }
//     };

//     // Handler for expanding order details
//     const handleExpandOrder = async (order) => {
//         // If clicking the same order, collapse it
//         if (expandedOrderId === order.orderID) {
//             setExpandedOrderId(null);
//             return;
//         }

//         // Fetch package details if not already fetched
//         await fetchPackageDetails(order.orderID);
//         setExpandedOrderId(order.orderID);
//     };

//     // Handler for retrying payment
//     const handleRetryPayment = async (order) => {
//         try {
//             setProcessingPayment(order.orderID);
//             // Call API to retry payment
//             const response = await axios.post('https://api.dailyfit.ae/api/user/retry-payment', {
//                 orderID: order.orderID
//             }, { withCredentials: true });

//             if (response.data && response.data.success) {
//                 // If success, you might need to redirect to payment gateway or update status
//                 if (response.data.paymentUrl) {
//                     window.location.href = response.data.paymentUrl;
//                 } else {
//                     // Refresh profile data to get updated payment status
//                     const profileResponse = await axios.get('https://api.dailyfit.ae/api/user/get-profile', { withCredentials: true });
//                     setProfileData(profileResponse.data.data);
//                 }
//             } else {
//                 alert("Failed to initiate payment retry. Please try again later.");
//             }
//         } catch (err) {
//             console.error('Error retrying payment', err);
//             alert("Failed to retry payment. Please try again later.");
//         } finally {
//             setProcessingPayment(null);
//         }
//     };

//     // Add new address
//     const handleAddAddress = async (newAddress) => {
//         try {
//             await axios.post('https://api.dailyfit.ae/api/user/add-address', {
//                 address: newAddress
//             }, { withCredentials: true });

//             // Update profile data with new address
//             setProfileData(prev => ({
//                 ...prev,
//                 savedAddress: [...prev.savedAddress, newAddress]
//             }));
//         } catch (err) {
//             console.error('Error adding address', err);
//         }
//     };

//     // Edit existing address
//     const handleEditAddress = async (updatedAddress) => {
//         try {
//             await axios.post('https://api.dailyfit.ae/api/user/edit-address', {
//                 address: updatedAddress
//             }, { withCredentials: true });

//             // Update profile data
//             setProfileData(prev => ({
//                 ...prev,
//                 savedAddress: prev.savedAddress.map(addr =>
//                     addr.identifier === updatedAddress.identifier ? updatedAddress : addr
//                 )
//             }));
//         } catch (err) {
//             console.error('Error editing address', err);
//         }
//     };

//     // Delete address
//     const handleDeleteAddress = async (addressToDelete) => {
//         try {
//             await axios.delete('https://api.dailyfit.ae/api/user/delete-address', {
//                 data: { identifier: addressToDelete.identifier },
//                 withCredentials: true
//             });

//             // Update profile data
//             setProfileData(prev => ({
//                 ...prev,
//                 savedAddress: prev.savedAddress.filter(addr =>
//                     addr.identifier !== addressToDelete.identifier
//                 )
//             }));
//         } catch (err) {
//             console.error('Error deleting address', err);
//         }
//     };

//     // Logout handler
//     const handleLogout = async () => {
//         try {
//             await axios.post('https://api.dailyfit.ae/api/user/logout', {}, { withCredentials: true });
//             // Redirect to login page or clear user session
//             window.location.href = '/login';
//         } catch (err) {
//             console.error('Logout error', err);
//         }
//     };

//     // Helper to get meal plan name and details
//     const getMealPlanDetails = (order) => {
//         if (order && order.selectedMeals && order.selectedMeals.package && order.selectedMeals.package.plan) {
//             return {
//                 name: order.selectedMeals.package.plan.mealPlanName || "Meal Plan",
//                 description: order.selectedMeals.package.plan.description || "",
//                 image: order.selectedMeals.package.plan.image && order.selectedMeals.package.plan.image[0]
//             };
//         }
//         return { name: "Meal Plan", description: "", image: null };
//     };

//     // Loading state
//     if (loading) {
//         return (
//             <div className="flex justify-center items-center h-screen bg-green-50">
//                 <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
//             </div>
//         );
//     }

//     // Error state
//     if (error) {
//         return (
//             <div className="flex justify-center items-center h-screen bg-green-50 text-red-500">
//                 <p>Error loading profile: {error.message}</p>
//             </div>
//         );
//     }

//     // Ensure profileData exists
//     if (!profileData) {
//         return null;
//     }

//     return (
//         <div className="bg-green-50 min-h-screen">
//             {/* Navigation Header */}
//             <NavigationHeader
//                 userName={profileData.userName}
//                 onLogout={handleLogout}
//             />

//             <div className="container mx-auto px-4 py-8">
//                 {/* Tabs Navigation */}
//                 <div className="flex border-b mb-6 bg-white rounded-lg shadow-sm overflow-hidden">
//                     <button
//                         className={`flex-1 px-4 py-3 transition-colors ${activeTab === 'profile' ? 'bg-green-500 text-white' : 'text-green-600 hover:bg-green-100'}`}
//                         onClick={() => setActiveTab('profile')}
//                     >
//                         Profile & Addresses
//                     </button>
//                     <button
//                         className={`flex-1 px-4 py-3 transition-colors ${activeTab === 'orders' ? 'bg-green-500 text-white' : 'text-green-600 hover:bg-green-100'}`}
//                         onClick={() => setActiveTab('orders')}
//                     >
//                         My Orders
//                     </button>
//                 </div>

//                 {/* Profile & Addresses Content */}
//                 {activeTab === 'profile' && (
//                     <div className="space-y-6">
//                         {/* Personal Information Section */}
//                         <div className="bg-white shadow-md rounded-lg p-6 border-l-4 border-green-500">
//                             <h2 className="text-xl font-semibold mb-4 text-green-700">Personal Information</h2>
//                             <div className="grid md:grid-cols-2 gap-4">
//                                 <div>
//                                     <p className="font-medium text-green-600">Name</p>
//                                     <p className="text-gray-900">{profileData.userName}</p>
//                                 </div>
//                                 <div>
//                                     <p className="font-medium text-green-600">Email</p>
//                                     <p className="text-gray-900">{profileData.userEmail}</p>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Saved Addresses Section */}
//                         <div className="bg-white shadow-md rounded-lg p-6 border-l-4 border-green-500">
//                             <div className="flex justify-between items-center mb-4">
//                                 <h2 className="text-xl font-semibold text-green-700">Saved Addresses</h2>
//                                 <button
//                                     onClick={() => {
//                                         setEditingAddress(null);
//                                         setIsAddressModalOpen(true);
//                                     }}
//                                     className="flex items-center text-white bg-green-500 hover:bg-green-600 px-3 py-2 rounded transition"
//                                 >
//                                     <Plus className="mr-2" /> Add New Address
//                                 </button>
//                             </div>
//                             <div className="space-y-4">
//                                 {profileData.savedAddress && profileData.savedAddress.length > 0 ? (
//                                     profileData.savedAddress.map((address, index) => (
//                                         <div
//                                             key={index}
//                                             className="border-b pb-4 last:border-b-0 flex justify-between items-center hover:bg-green-50 p-3 rounded transition"
//                                         >
//                                             <div>
//                                                 <p className="font-semibold text-green-900">{address.street}</p>
//                                                 <p className="text-gray-600">{address.buildingFloor}, {address.houseOrFlatNumber}</p>
//                                                 <p className="text-gray-600">{address.landmark}</p>
//                                                 <p className="text-gray-600">
//                                                     {address.city}, {address.state} {address.postalCode}
//                                                 </p>
//                                                 <p className="text-gray-600">{address.country}</p>
//                                                 <p className="text-gray-600">Phone: {address.phone}</p>
//                                                 {address.identifier && (
//                                                     <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded mt-2 inline-block">
//                                                         {address.identifier}
//                                                     </span>
//                                                 )}
//                                             </div>
//                                             <div className="flex space-x-2">
//                                                 <button
//                                                     onClick={() => {
//                                                         setEditingAddress(address);
//                                                         setIsAddressModalOpen(true);
//                                                     }}
//                                                     className="text-green-500 hover:bg-green-100 p-2 rounded"
//                                                 >
//                                                     <Edit size={20} />
//                                                 </button>
//                                                 <button
//                                                     onClick={() => handleDeleteAddress(address)}
//                                                     className="text-red-500 hover:bg-red-100 p-2 rounded"
//                                                 >
//                                                     <Trash2 size={20} />
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     ))
//                                 ) : (
//                                     <p className="text-gray-500">No saved addresses found.</p>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {/* Orders Content */}
//                 {activeTab === 'orders' && (
//                     <div className="bg-white shadow-md rounded-lg p-6 border-l-4 border-green-500">
//                         <h2 className="text-xl font-semibold mb-4 text-green-700">My Orders</h2>

//                         {loading ? (
//                             <p className="text-green-700 font-medium">Loading your orders...</p>
//                         ) : error ? (
//                             <p className="text-red-500">Something went wrong while loading your orders.</p>
//                         ) : profileData?.orders?.length > 0 ? (
//                             <div className="space-y-4">
//                                 {profileData.orders.map((order, index) => {
//                                     const mealPlan = getMealPlanDetails(order);
//                                     return (
//                                         <div key={index} className="border rounded-lg hover:shadow-md transition">
//                                             {/* Order Summary */}
//                                             <div className="p-4 flex flex-col md:flex-row md:justify-between md:items-center hover:bg-green-50 transition-colors">
//                                                 <div className="flex flex-col md:flex-row md:items-center gap-4 mb-3 md:mb-0 flex-grow">
//                                                     {/* Plan Image */}
//                                                     {mealPlan.image && (
//                                                         <img
//                                                             src={mealPlan.image}
//                                                             alt={mealPlan.name}
//                                                             className="w-16 h-16 object-contain rounded-lg"
//                                                         />
//                                                     )}

//                                                     {/* Order Info */}
//                                                     <div>
//                                                         <div className="flex flex-wrap items-center gap-2 mb-1">
//                                                             <p className="font-semibold text-green-900">Order #{order.orderID}</p>
//                                                             <PaymentStatusBadge status={order.paymentStatus} />
//                                                         </div>
//                                                         <p className="text-green-600 font-medium capitalize">{mealPlan.name}</p>
//                                                         <p className="text-gray-600">{mealPlan.description}</p>
//                                                         <div className="flex flex-wrap gap-4 mt-2">
//                                                             <p className="text-sm text-green-500">
//                                                                 Start: {new Date(order.startDate).toLocaleDateString()}
//                                                             </p>
//                                                             <p className="text-sm text-green-500">
//                                                                 End: {new Date(order.endDate).toLocaleDateString()}
//                                                             </p>
//                                                             <p className="text-sm text-green-500">
//                                                                 Amount: AED {order.amount}
//                                                             </p>
//                                                         </div>
//                                                     </div>
//                                                 </div>

//                                                 {/* Action Buttons */}
//                                                 <div className="flex items-center gap-2">
//                                                     {/* Retry Payment Button (only show for failed payments) */}
//                                                     {order.paymentStatus === 2 && (
//                                                         <button
//                                                             onClick={() => handleRetryPayment(order)}
//                                                             disabled={processingPayment === order.orderID}
//                                                             className={`flex items-center px-3 py-2 rounded ${processingPayment === order.orderID
//                                                                 ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
//                                                                 : 'bg-red-600 text-white hover:bg-red-700'
//                                                                 } transition`}
//                                                         >
//                                                             {processingPayment === order.orderID ? (
//                                                                 <>
//                                                                     <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
//                                                                     Processing...
//                                                                 </>
//                                                             ) : (
//                                                                 <>
//                                                                     <RefreshCw size={16} className="mr-2" /> Retry Payment
//                                                                 </>
//                                                             )}
//                                                         </button>
//                                                     )}

//                                                     {/* View Details Button */}
//                                                     <button
//                                                         onClick={() => handleExpandOrder(order)}
//                                                         className="flex items-center text-green-500 hover:bg-green-100 p-2 rounded transition"
//                                                     >
//                                                         {expandedOrderId === order.orderID ? <ChevronUp /> : <ChevronDown />}
//                                                     </button>
//                                                 </div>
//                                             </div>

//                                             {/* Expandable Package Details */}
//                                             {expandedOrderId === order.orderID && packageDetails[order.orderID] &&
//                                                 packageDetails[order.orderID].data &&
//                                                 packageDetails[order.orderID].data[0] &&
//                                                 packageDetails[order.orderID].data[0].meals &&
//                                                 packageDetails[order.orderID].data[0].meals.day1 &&
//                                                 packageDetails[order.orderID].data[0].meals.day1.mealsDetails ? (
//                                                 <div className="p-4 bg-green-50 border-t">
//                                                     {packageDetails[order.orderID].data[0].meals.day1.mealsDetails.map((meal, mealIndex) => (
//                                                         <div
//                                                             key={mealIndex}
//                                                             className="mb-4 bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500"
//                                                         >
//                                                             <div className="flex items-start gap-4 mb-3">
//                                                                 {meal.image && meal.image.length > 0 && (
//                                                                     <img
//                                                                         src={meal.image[0]}
//                                                                         alt={meal.mealName}
//                                                                         className="w-24 h-24 object-cover rounded shadow"
//                                                                     />
//                                                                 )}
//                                                                 <div>
//                                                                     <h3 className="text-lg font-semibold text-green-800">{meal.mealName || 'Unnamed Meal'}</h3>
//                                                                     <p className="text-green-600">{meal.description || 'No description available'}</p>
//                                                                 </div>
//                                                             </div>

//                                                             <div className="grid grid-cols-2 gap-2 mb-3">
//                                                                 <div className="bg-green-100 p-2 rounded">
//                                                                     <p className="text-sm text-green-700">Energy: {meal.moreDetails?.energy || 'N/A'} kcal</p>
//                                                                     <p className="text-sm text-green-700">Protein: {meal.moreDetails?.protein || 'N/A'}g</p>
//                                                                 </div>
//                                                                 <div className="bg-green-100 p-2 rounded">
//                                                                     <p className="text-sm text-green-700">Fat: {meal.moreDetails?.fat || 'N/A'}g</p>
//                                                                     <p className="text-sm text-green-700">Carbs: {meal.moreDetails?.carbohydrates || 'N/A'}g</p>
//                                                                 </div>
//                                                             </div>

//                                                             {meal.moreDetails && meal.moreDetails.allergens && meal.moreDetails.allergens.length > 0 && (
//                                                                 <div className="bg-red-50 p-2 rounded">
//                                                                     <p className="text-sm text-red-600">
//                                                                         Allergens: {meal.moreDetails.allergens.join(', ')}
//                                                                     </p>
//                                                                 </div>
//                                                             )}
//                                                         </div>
//                                                     ))}
//                                                 </div>
//                                             ) : expandedOrderId === order.orderID && (
//                                                 <div className="p-4 bg-green-50 border-t">
//                                                     <p className="text-yellow-600">Meal details are not available for this order.</p>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     );
//                                 })}
//                             </div>
//                         ) : (
//                             <p className="text-gray-500">No orders found.</p>
//                         )}
//                     </div>
//                 )}

//                 {/* Address Modal */}
//                 <AddressModal
//                     isOpen={isAddressModalOpen}
//                     onClose={() => setIsAddressModalOpen(false)}
//                     onSubmit={editingAddress ? handleEditAddress : handleAddAddress}
//                     initialAddress={editingAddress}
//                 />
//             </div>
//         </div>
//     );
// };

// export default UserProfile;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    ChevronDown, ChevronUp, Plus, Edit, Trash2,
    Home, ShoppingBag, UserCircle, Settings, LogOut,
    AlertCircle, CheckCircle, XCircle, RefreshCw
} from 'lucide-react';
import logo from '../images/logo.png'

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
                            Save Address
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Navigation Header Component
const NavigationHeader = ({ userName, onLogout }) => {
    return (
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
                        <a
                            href="/profile"
                            className="text-white no-underline hover:text-green-200 transition duration-200"
                        >
                            Profile
                        </a>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => {
                                sessionStorage.clear();
                                localStorage.clear();
                                window.location.href = "/"; // Redirect to home
                            }}
                            className="bg-white text-red-600 px-4 py-2 rounded-lg font-semibold no-underline hover:bg-red-100 transition duration-200"
                        >
                            Logout
                        </button>
                        <button className="md:hidden text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

// Helper component for payment status
const PaymentStatusBadge = ({ status }) => {
    const statusMap = {
        0: { label: 'Payment Pending', icon: AlertCircle, className: 'bg-yellow-100 text-yellow-800' },
        1: { label: 'Payment Successful', icon: CheckCircle, className: 'bg-green-100 text-green-800' },
        2: { label: 'Payment Failed', icon: XCircle, className: 'bg-red-100 text-red-800' }
    };

    const { label, icon: Icon, className } = statusMap[status] || statusMap[0];

    return (
        <div className={`flex items-center px-3 py-1 rounded-full ${className}`}>
            <Icon size={16} className="mr-1" />
            <span className="text-sm font-medium">{label}</span>
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
    const [processingPayment, setProcessingPayment] = useState(null);

    // New state for address management
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);

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
            const response = await axios.post('https://api.dailyfit.ae/api/user/get-package-details', {
                id: orderID
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

    // Handler for continuing or retrying payment
    const handlePaymentAction = async (order) => {
        try {
            setProcessingPayment(order.orderID);
            // Redirect to product-summary page with order ID
            // window.location.href = `/product-summary?orderID=${order.orderID}`;
            window.location.href = `/summary`;
        } catch (err) {
            console.error('Error processing payment action', err);
            alert("Failed to process payment. Please try again later.");
        } finally {
            setProcessingPayment(null);
        }
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
            await axios.post('https://api.dailyfit.ae/api/user/edit-address', {
                address: updatedAddress
            }, { withCredentials: true });

            // Update profile data
            setProfileData(prev => ({
                ...prev,
                savedAddress: prev.savedAddress.map(addr =>
                    addr.identifier === updatedAddress.identifier ? updatedAddress : addr
                )
            }));
        } catch (err) {
            console.error('Error editing address', err);
        }
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

    // Logout handler
    const handleLogout = async () => {
        try {
            await axios.post('https://api.dailyfit.ae/api/user/logout', {}, { withCredentials: true });
            // Redirect to login page or clear user session
            window.location.href = '/login';
        } catch (err) {
            console.error('Logout error', err);
        }
    };

    // Helper to get meal plan name and details
    const getMealPlanDetails = (order) => {
        if (order && order.selectedMeals && order.selectedMeals.package && order.selectedMeals.package.plan) {
            return {
                name: order.selectedMeals.package.plan.mealPlanName || "Meal Plan",
                description: order.selectedMeals.package.plan.description || "",
                image: order.selectedMeals.package.plan.image && order.selectedMeals.package.plan.image[0]
            };
        }
        return { name: "Meal Plan", description: "", image: null };
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

    return (
        <div className="bg-green-50 min-h-screen">
            {/* Navigation Header */}
            <NavigationHeader
                userName={profileData.userName}
                onLogout={handleLogout}
            />

            <div className="container mx-auto px-4 py-8">
                {/* Tabs Navigation */}
                <div className="flex border-b mb-6 bg-white rounded-lg shadow-sm overflow-hidden">
                    <button
                        className={`flex-1 px-4 py-3 transition-colors ${activeTab === 'profile' ? 'bg-green-500 text-white' : 'text-green-600 hover:bg-green-100'}`}
                        onClick={() => setActiveTab('profile')}
                    >
                        Profile & Addresses
                    </button>
                    <button
                        className={`flex-1 px-4 py-3 transition-colors ${activeTab === 'orders' ? 'bg-green-500 text-white' : 'text-green-600 hover:bg-green-100'}`}
                        onClick={() => setActiveTab('orders')}
                    >
                        My Orders
                    </button>
                </div>

                {/* Profile & Addresses Content */}
                {activeTab === 'profile' && (
                    <div className="space-y-6">
                        {/* Personal Information Section */}
                        <div className="bg-white shadow-md rounded-lg p-6 border-l-4 border-green-500">
                            <h2 className="text-xl font-semibold mb-4 text-green-700">Personal Information</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <p className="font-medium text-green-600">Name</p>
                                    <p className="text-gray-900">{profileData.userName}</p>
                                </div>
                                <div>
                                    <p className="font-medium text-green-600">Email</p>
                                    <p className="text-gray-900">{profileData.userEmail}</p>
                                </div>
                            </div>
                        </div>

                        {/* Saved Addresses Section */}
                        <div className="bg-white shadow-md rounded-lg p-6 border-l-4 border-green-500">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-green-700">Saved Addresses</h2>
                                <button
                                    onClick={() => {
                                        setEditingAddress(null);
                                        setIsAddressModalOpen(true);
                                    }}
                                    className="flex items-center text-white bg-green-500 hover:bg-green-600 px-3 py-2 rounded transition"
                                >
                                    <Plus className="mr-2" /> Add New Address
                                </button>
                            </div>
                            <div className="space-y-4">
                                {profileData.savedAddress && profileData.savedAddress.length > 0 ? (
                                    profileData.savedAddress.map((address, index) => (
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
                                                    onClick={() => {
                                                        setEditingAddress(address);
                                                        setIsAddressModalOpen(true);
                                                    }}
                                                    className="text-green-500 hover:bg-green-100 p-2 rounded"
                                                >
                                                    <Edit size={20} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteAddress(address)}
                                                    className="text-red-500 hover:bg-red-100 p-2 rounded"
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500">No saved addresses found.</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Orders Content */}
                {activeTab === 'orders' && (
                    <div className="bg-white shadow-md rounded-lg p-6 border-l-4 border-green-500">
                        <h2 className="text-xl font-semibold mb-4 text-green-700">My Orders</h2>

                        {loading ? (
                            <p className="text-green-700 font-medium">Loading your orders...</p>
                        ) : error ? (
                            <p className="text-red-500">Something went wrong while loading your orders.</p>
                        ) : profileData?.orders?.length > 0 ? (
                            <div className="space-y-4">
                                {profileData.orders.map((order, index) => {
                                    const mealPlan = getMealPlanDetails(order);
                                    return (
                                        <div key={index} className="border rounded-lg hover:shadow-md transition">
                                            {/* Order Summary */}
                                            <div className="p-4 flex flex-col md:flex-row md:justify-between md:items-center hover:bg-green-50 transition-colors">
                                                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-3 md:mb-0 flex-grow">
                                                    {/* Plan Image */}
                                                    {mealPlan.image && (
                                                        <img
                                                            src={mealPlan.image}
                                                            alt={mealPlan.name}
                                                            className="w-16 h-16 object-contain rounded-lg"
                                                        />
                                                    )}

                                                    {/* Order Info */}
                                                    <div>
                                                        <div className="flex flex-wrap items-center gap-2 mb-1">
                                                            <p className="font-semibold text-green-900">Order #{order.orderID}</p>
                                                            <PaymentStatusBadge status={order.paymentStatus} />
                                                        </div>
                                                        <p className="text-green-600 font-medium capitalize">{mealPlan.name}</p>
                                                        <p className="text-gray-600">{mealPlan.description}</p>
                                                        <div className="flex flex-wrap gap-4 mt-2">
                                                            <p className="text-sm text-green-500">
                                                                Start: {new Date(order.startDate).toLocaleDateString()}
                                                            </p>
                                                            <p className="text-sm text-green-500">
                                                                End: {new Date(order.endDate).toLocaleDateString()}
                                                            </p>
                                                            <p className="text-sm text-green-500">
                                                                Amount: AED {order.amount}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="flex items-center gap-2">
                                                    {/* Continue Payment Button (for pending payments) */}
                                                    {order.paymentStatus === 0 && (
                                                        <button
                                                            onClick={() => handlePaymentAction(order)}
                                                            disabled={processingPayment === order.orderID}
                                                            className={`flex items-center px-3 py-2 rounded ${processingPayment === order.orderID
                                                                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                                                : 'bg-yellow-500 text-white hover:bg-yellow-600'
                                                                } transition`}
                                                        >
                                                            {processingPayment === order.orderID ? (
                                                                <>
                                                                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                                                                    Processing...
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <ShoppingBag size={16} className="mr-2" /> Continue Payment
                                                                </>
                                                            )}
                                                        </button>
                                                    )}

                                                    {/* Retry Payment Button (for failed payments) */}
                                                    {order.paymentStatus === 2 && (
                                                        <button
                                                            onClick={() => handlePaymentAction(order)}
                                                            disabled={processingPayment === order.orderID}
                                                            className={`flex items-center px-3 py-2 rounded ${processingPayment === order.orderID
                                                                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                                                : 'bg-red-600 text-white hover:bg-red-700'
                                                                } transition`}
                                                        >
                                                            {processingPayment === order.orderID ? (
                                                                <>
                                                                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                                                                    Processing...
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <RefreshCw size={16} className="mr-2" /> Retry Payment
                                                                </>
                                                            )}
                                                        </button>
                                                    )}

                                                    {/* View Details Button */}
                                                    <button
                                                        onClick={() => handleExpandOrder(order)}
                                                        className="flex items-center text-green-500 hover:bg-green-100 p-2 rounded transition"
                                                    >
                                                        {expandedOrderId === order.orderID ? <ChevronUp /> : <ChevronDown />}
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Expandable Package Details */}
                                            {expandedOrderId === order.orderID && packageDetails[order.orderID] &&
                                                packageDetails[order.orderID].data &&
                                                packageDetails[order.orderID].data[0] &&
                                                packageDetails[order.orderID].data[0].meals &&
                                                packageDetails[order.orderID].data[0].meals.day1 &&
                                                packageDetails[order.orderID].data[0].meals.day1.mealsDetails ? (
                                                <div className="p-4 bg-green-50 border-t">
                                                    {packageDetails[order.orderID].data[0].meals.day1.mealsDetails.map((meal, mealIndex) => (
                                                        <div
                                                            key={mealIndex}
                                                            className="mb-4 bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500"
                                                        >
                                                            <div className="flex items-start gap-4 mb-3">
                                                                {meal.image && meal.image.length > 0 && (
                                                                    <img
                                                                        src={meal.image[0]}
                                                                        alt={meal.mealName}
                                                                        className="w-24 h-24 object-cover rounded shadow"
                                                                    />
                                                                )}
                                                                <div>
                                                                    <h3 className="text-lg font-semibold text-green-800">{meal.mealName || 'Unnamed Meal'}</h3>
                                                                    <p className="text-green-600">{meal.description || 'No description available'}</p>
                                                                </div>
                                                            </div>

                                                            <div className="grid grid-cols-2 gap-2 mb-3">
                                                                <div className="bg-green-100 p-2 rounded">
                                                                    <p className="text-sm text-green-700">Energy: {meal.moreDetails?.energy || 'N/A'} kcal</p>
                                                                    <p className="text-sm text-green-700">Protein: {meal.moreDetails?.protein || 'N/A'}g</p>
                                                                </div>
                                                                <div className="bg-green-100 p-2 rounded">
                                                                    <p className="text-sm text-green-700">Fat: {meal.moreDetails?.fat || 'N/A'}g</p>
                                                                    <p className="text-sm text-green-700">Carbs: {meal.moreDetails?.carbohydrates || 'N/A'}g</p>
                                                                </div>
                                                            </div>

                                                            {meal.moreDetails && meal.moreDetails.allergens && meal.moreDetails.allergens.length > 0 && (
                                                                <div className="bg-red-50 p-2 rounded">
                                                                    <p className="text-sm text-red-600">
                                                                        Allergens: {meal.moreDetails.allergens.join(', ')}
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : expandedOrderId === order.orderID && (
                                                <div className="p-4 bg-green-50 border-t">
                                                    <p className="text-yellow-600">Meal details are not available for this order.</p>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="text-gray-500">No orders found.</p>
                        )}
                    </div>
                )}

                {/* Address Modal */}
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