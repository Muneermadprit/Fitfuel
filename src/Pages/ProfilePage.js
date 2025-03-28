// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { ChevronDown, ChevronUp, Plus, Edit, Trash2, Save, X } from 'lucide-react';

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
//                 <h2 className="text-xl font-semibold mb-4">
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
//                             className="w-full p-2 border rounded"
//                             required
//                         />
//                         <input
//                             type="text"
//                             name="buildingFloor"
//                             value={address.buildingFloor}
//                             onChange={handleChange}
//                             placeholder="Building/Floor"
//                             className="w-full p-2 border rounded"
//                         />
//                     </div>
//                     <div className="grid md:grid-cols-2 gap-4">
//                         <input
//                             type="text"
//                             name="houseOrFlatNumber"
//                             value={address.houseOrFlatNumber}
//                             onChange={handleChange}
//                             placeholder="House/Flat Number"
//                             className="w-full p-2 border rounded"
//                         />
//                         <input
//                             type="text"
//                             name="landmark"
//                             value={address.landmark}
//                             onChange={handleChange}
//                             placeholder="Landmark"
//                             className="w-full p-2 border rounded"
//                         />
//                     </div>
//                     <div className="grid md:grid-cols-2 gap-4">
//                         <input
//                             type="text"
//                             name="city"
//                             value={address.city}
//                             onChange={handleChange}
//                             placeholder="City"
//                             className="w-full p-2 border rounded"
//                             required
//                         />
//                         <input
//                             type="text"
//                             name="state"
//                             value={address.state}
//                             onChange={handleChange}
//                             placeholder="State"
//                             className="w-full p-2 border rounded"
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
//                             className="w-full p-2 border rounded"
//                             required
//                         />
//                         <input
//                             type="text"
//                             name="country"
//                             value={address.country}
//                             onChange={handleChange}
//                             placeholder="Country"
//                             className="w-full p-2 border rounded"
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
//                             className="w-full p-2 border rounded"
//                             required
//                         />
//                         <input
//                             type="text"
//                             name="identifier"
//                             value={address.identifier}
//                             onChange={handleChange}
//                             placeholder="Address Type (Home, Work)"
//                             className="w-full p-2 border rounded"
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
//                             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
//                         >
//                             Save Address
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// const UserProfile = () => {
//     const [activeTab, setActiveTab] = useState('profile');
//     const [profileData, setProfileData] = useState(null);
//     const [expandedOrderId, setExpandedOrderId] = useState(null);
//     const [packageDetails, setPackageDetails] = useState({});
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

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

//     // Add new address
//     const handleAddAddress = async (newAddress) => {
//         try {
//             const response = await axios.post('https://api.dailyfit.ae/api/user/add-address', {
//                 address: newAddress
//             }, { withCredentials: true });

//             // Update profile data with new address
//             setProfileData(prev => ({
//                 ...prev,
//                 savedAddress: [...prev.savedAddress, newAddress]
//             }));
//         } catch (err) {
//             console.error('Error adding address', err);
//             // Optional: Show error toast/message
//         }
//     };

//     // Edit existing address
//     const handleEditAddress = async (updatedAddress) => {
//         try {
//             // Note: You might need a specific API endpoint for editing addresses
//             // This is a placeholder and might need to be adjusted based on your actual API
//             const response = await axios.post('https://api.dailyfit.ae/api/user/add-address', {
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
//             // Optional: Show error toast/message
//         }
//     };

//     // Delete address
//     const handleDeleteAddress = async (addressToDelete) => {
//         try {
//             // Note: You might need a specific API endpoint for deleting addresses
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
//             // Optional: Show error toast/message
//         }
//     };

//     // Loading state
//     if (loading) {
//         return (
//             <div className="flex justify-center items-center h-screen">
//                 <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
//             </div>
//         );
//     }

//     // Error state
//     if (error) {
//         return (
//             <div className="flex justify-center items-center h-screen text-red-500">
//                 <p>Error loading profile: {error.message}</p>
//             </div>
//         );
//     }

//     // Ensure profileData exists
//     if (!profileData) {
//         return null;
//     }

//     return (
//         <div className="container mx-auto px-4 py-8">
//             {/* Tabs Navigation */}
//             <div className="flex border-b mb-6">
//                 <button
//                     className={`px-4 py-2 ${activeTab === 'profile' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
//                     onClick={() => setActiveTab('profile')}
//                 >
//                     Profile & Addresses
//                 </button>
//                 <button
//                     className={`px-4 py-2 ${activeTab === 'orders' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
//                     onClick={() => setActiveTab('orders')}
//                 >
//                     My Orders
//                 </button>
//             </div>

//             {/* Profile & Addresses Content */}
//             {activeTab === 'profile' && (
//                 <div className="space-y-6">
//                     {/* Personal Information Section */}
//                     <div className="bg-white shadow rounded-lg p-6">
//                         <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
//                         <div className="grid md:grid-cols-2 gap-4">
//                             <div>
//                                 <p className="font-medium text-gray-600">Name</p>
//                                 <p className="text-gray-900">{profileData.userName}</p>
//                             </div>
//                             <div>
//                                 <p className="font-medium text-gray-600">Email</p>
//                                 <p className="text-gray-900">{profileData.userEmail}</p>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Saved Addresses Section */}
//                     <div className="bg-white shadow rounded-lg p-6">
//                         <div className="flex justify-between items-center mb-4">
//                             <h2 className="text-xl font-semibold">Saved Addresses</h2>
//                             <button 
//                                 onClick={() => {
//                                     setEditingAddress(null);
//                                     setIsAddressModalOpen(true);
//                                 }}
//                                 className="flex items-center text-blue-500 hover:bg-blue-50 px-3 py-2 rounded transition"
//                             >
//                                 <Plus className="mr-2" /> Add New Address
//                             </button>
//                         </div>
//                         <div className="space-y-4">
//                             {profileData.savedAddress.map((address, index) => (
//                                 <div
//                                     key={index}
//                                     className="border-b pb-4 last:border-b-0 flex justify-between items-center"
//                                 >
//                                     <div>
//                                         <p className="font-semibold text-gray-900">{address.street}</p>
//                                         <p className="text-gray-600">{address.buildingFloor}, {address.houseOrFlatNumber}</p>
//                                         <p className="text-gray-600">{address.landmark}</p>
//                                         <p className="text-gray-600">
//                                             {address.city}, {address.state} {address.postalCode}
//                                         </p>
//                                         <p className="text-gray-600">{address.country}</p>
//                                         <p className="text-gray-600">Phone: {address.phone}</p>
//                                         {address.identifier && (
//                                             <span className="text-sm bg-blue-50 text-blue-600 px-2 py-1 rounded mt-2 inline-block">
//                                                 {address.identifier}
//                                             </span>
//                                         )}
//                                     </div>
//                                     <div className="flex space-x-2">
//                                         <button 
//                                             onClick={() => {
//                                                 setEditingAddress(address);
//                                                 setIsAddressModalOpen(true);
//                                             }}
//                                             className="text-blue-500 hover:bg-blue-50 p-2 rounded"
//                                         >
//                                             <Edit size={20} />
//                                         </button>
//                                         <button 
//                                             onClick={() => handleDeleteAddress(address)}
//                                             className="text-red-500 hover:bg-red-50 p-2 rounded"
//                                         >
//                                             <Trash2 size={20} />
//                                         </button>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* Orders Content */}
//             {activeTab === 'orders' && (
//                 <div className="bg-white shadow rounded-lg p-6">
//                     <h2 className="text-xl font-semibold mb-4">My Orders</h2>
//                     <div className="space-y-4">
//                         {profileData.orders.map((order, index) => (
//                             <div key={index} className="border rounded-lg">
//                                 {/* Order Summary */}
//                                 <div 
//                                     className="p-4 flex justify-between items-center hover:bg-gray-50 cursor-pointer transition-colors"
//                                     onClick={() => handleExpandOrder(order)}
//                                 >
//                                     <div>
//                                         <p className="font-semibold text-gray-900">Order ID: {order.orderID}</p>
//                                         <p className="text-gray-600">{order.selectedPackage.packageName}</p>
//                                         <div className="flex mt-2">
//                                             <p className="text-sm text-gray-500 mr-4">
//                                                 Start: {order.selectedPackage.startDate}
//                                             </p>
//                                             <p className="text-sm text-gray-500">
//                                                 End: {order.selectedPackage.endDate}
//                                             </p>
//                                         </div>
//                                     </div>
//                                     <div>
//                                         {expandedOrderId === order.orderID ? (
//                                             <ChevronUp className="text-blue-500" />
//                                         ) : (
//                                             <Plus className="text-blue-500" />
//                                         )}
//                                     </div>
//                                 </div>

//                                 {/* Expandable Package Details */}
//                                 {expandedOrderId === order.orderID && packageDetails[order.orderID] && (
//                                     <div className="p-4 bg-gray-50 border-t">
//                                         {packageDetails[order.orderID].data[0].meals.day1.mealsDetails.map((meal, mealIndex) => (
//                                             <div 
//                                                 key={mealIndex} 
//                                                 className="mb-4 bg-white p-4 rounded-lg shadow-sm"
//                                             >
//                                                 <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                                                     {meal.mealName}
//                                                 </h3>
//                                                 <p className="text-gray-600 mb-3">{meal.description}</p>

//                                                 <div className="grid grid-cols-2 gap-2 mb-3">
//                                                     <div className="bg-gray-100 p-2 rounded">
//                                                         <p className="text-sm text-gray-500">Energy: {meal.moreDetails.energy} kcal</p>
//                                                         <p className="text-sm text-gray-500">Protein: {meal.moreDetails.protein}g</p>
//                                                     </div>
//                                                     <div className="bg-gray-100 p-2 rounded">
//                                                         <p className="text-sm text-gray-500">Fat: {meal.moreDetails.fat}g</p>
//                                                         <p className="text-sm text-gray-500">Carbs: {meal.moreDetails.carbohydrates}g</p>
//                                                     </div>
//                                                 </div>

//                                                 {meal.moreDetails.allergens && (
//                                                     <div className="bg-red-50 p-2 rounded">
//                                                         <p className="text-sm text-red-600">
//                                                             Allergens: {meal.moreDetails.allergens.join(', ')}
//                                                         </p>
//                                                     </div>
//                                                 )}
//                                             </div>
//                                         ))}
//                                     </div>
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             )}

//             {/* Address Modal */}
//             <AddressModal 
//                 isOpen={isAddressModalOpen}
//                 onClose={() => setIsAddressModalOpen(false)}
//                 onSubmit={editingAddress ? handleEditAddress : handleAddAddress}
//                 initialAddress={editingAddress}
//             />
//         </div>
//     );
// };

// export default UserProfile;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    ChevronDown, ChevronUp, Plus, Edit, Trash2,
    Home, ShoppingBag, UserCircle, Settings, LogOut
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

// Main User Profile Component
const UserProfile = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [profileData, setProfileData] = useState(null);
    const [expandedOrderId, setExpandedOrderId] = useState(null);
    const [packageDetails, setPackageDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Orders Content */}
                {activeTab === 'orders' && (
                    <div className="bg-white shadow-md rounded-lg p-6 border-l-4 border-green-500">
                        <h2 className="text-xl font-semibold mb-4 text-green-700">My Orders</h2>
                        <div className="space-y-4">
                            {profileData.orders.map((order, index) => (
                                <div key={index} className="border rounded-lg hover:shadow-md transition">
                                    {/* Order Summary */}
                                    <div
                                        className="p-4 flex justify-between items-center hover:bg-green-50 cursor-pointer transition-colors"
                                        onClick={() => handleExpandOrder(order)}
                                    >
                                        <div>
                                            <p className="font-semibold text-green-900">Order ID: {order.orderID}</p>
                                            <p className="text-green-600">{order.selectedPackage.packageName}</p>
                                            <div className="flex mt-2">
                                                <p className="text-sm text-green-500 mr-4">
                                                    Start: {order.selectedPackage.startDate}
                                                </p>
                                                <p className="text-sm text-green-500">
                                                    End: {order.selectedPackage.endDate}
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            {expandedOrderId === order.orderID ? (
                                                <ChevronUp className="text-green-500" />
                                            ) : (
                                                <Plus className="text-green-500" />
                                            )}
                                        </div>
                                    </div>

                                    {/* Expandable Package Details */}
                                    {expandedOrderId === order.orderID && packageDetails[order.orderID] && (
                                        <div className="p-4 bg-green-50 border-t">
                                            {packageDetails[order.orderID].data[0].meals.day1.mealsDetails.map((meal, mealIndex) => (
                                                <div
                                                    key={mealIndex}
                                                    className="mb-4 bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500"
                                                >
                                                    <h3 className="text-lg font-semibold text-green-800 mb-2">
                                                        {meal.mealName}
                                                    </h3>
                                                    <p className="text-green-600 mb-3">{meal.description}</p>

                                                    <div className="grid grid-cols-2 gap-2 mb-3">
                                                        <div className="bg-green-100 p-2 rounded">
                                                            <p className="text-sm text-green-700">Energy: {meal.moreDetails.energy} kcal</p>
                                                            <p className="text-sm text-green-700">Protein: {meal.moreDetails.protein}g</p>
                                                        </div>
                                                        <div className="bg-green-100 p-2 rounded">
                                                            <p className="text-sm text-green-700">Fat: {meal.moreDetails.fat}g</p>
                                                            <p className="text-sm text-green-700">Carbs: {meal.moreDetails.carbohydrates}g</p>
                                                        </div>
                                                    </div>

                                                    {meal.moreDetails.allergens && (
                                                        <div className="bg-red-50 p-2 rounded">
                                                            <p className="text-sm text-red-600">
                                                                Allergens: {meal.moreDetails.allergens.join(', ')}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
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