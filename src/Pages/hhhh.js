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
    const [userProfile, setUserProfile] = useState(null);
    const [orders, setOrders] = useState([]);
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

                // Update user profile state from API response
                const profileData = response.data.data;
                setUserProfile({
                    name: profileData.userName,
                    email: profileData.userEmail,
                    phone: profileData.savedAddress?.[0]?.phone || '+1 (555) 123-4567',
                    address: profileData.savedAddress?.[0]
                        ? `${profileData.savedAddress[0].street}, ${profileData.savedAddress[0].city}, ${profileData.savedAddress[0].state} ${profileData.savedAddress[0].postalCode}`
                        : '123 Green Valley Road, Sunnyville, CA 94123',
                    membership: 'Standard Member', // This wasn't in the API response, so keeping a default
                    memberSince: 'January 2024' // This also wasn't in the response
                });

                // Transform orders data
                const transformedOrders = profileData.orders.map(order => ({
                    id: order.orderID,
                    date: new Date(order.orderDate).toLocaleDateString(),
                    status: order.paymentStatus === 1 ? 'Active' : 'pending',
                    total: `$${order.amount}`,
                    plan: order.selectedPackage, // You might want to map this to a more readable name
                    meals: order.selectedMeals.package.selectedMeals.map(mealDay => ({
                        date: new Date(mealDay.date).toLocaleDateString(),
                        items: mealDay.meals // Assuming these are meal IDs
                    }))
                }));

                setOrders(transformedOrders);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching profile:', err);
                setError('Failed to load profile. Please try again.');
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const toggleOrderExpansion = (orderId) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!userProfile) return <div>No profile data available</div>;

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




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//     User,
//     ShoppingBag,
//     Settings,
//     ChevronDown,
//     ChevronUp,
//     LogOut,
//     MapPin,
//     CreditCard,
//     Plus,
//     Edit
// } from 'lucide-react';

// const ProfilePage = () => {
//     const [activeTab, setActiveTab] = useState('orders');
//     const [expandedOrder, setExpandedOrder] = useState(null);
//     const [userProfile, setUserProfile] = useState(null);
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchUserProfile = async () => {
//             try {
//                 setLoading(true);
//                 // You'll need to replace this with your actual API endpoint and authentication method
//                 const response = await axios.get('https://api.dailyfit.ae/api/user/get-profile', {
//                     withCredentials: true // Adjust based on your authentication method
//                 });

//                 if (response.data && response.data.status) {
//                     const profileData = response.data.data;

//                     const userProfileData = {
//                         name: profileData.userName || 'User',
//                         email: profileData.userEmail || 'user@example.com',
//                         phone: profileData.phone || '+1 (555) 123-4567',
//                         address: profileData.savedAddress?.[0] 
//                             ? `${profileData.savedAddress[0].street}, ${profileData.savedAddress[0].city}, ${profileData.savedAddress[0].state} ${profileData.savedAddress[0].postalCode}`
//                             : 'No address found',
//                         membership: 'Standard Member',
//                         memberSince: 'January 2024'
//                     };

//                     const transformedOrders = profileData.orders?.map(order => {
//                         const selectedPackage = order.selectedPackage;
//                         return {
//                             id: order.orderID,
//                             date: new Date(selectedPackage.startDate).toLocaleDateString(),
//                             status: 'Active',
//                             total: 'Pricing not available',
//                             plan: selectedPackage.packageName,
//                             meals: selectedPackage.meals?.[0] ? Object.entries(selectedPackage.meals[0]).map(([key, mealData]) => ({
//                                 date: new Date(mealData.date).toLocaleDateString(),
//                                 items: mealData.meals || []
//                             })) : []
//                         };
//                     }) || [];

//                     setUserProfile(userProfileData);
//                     setOrders(transformedOrders);
//                 } else {
//                     throw new Error('Failed to retrieve profile data');
//                 }
//             } catch (err) {
//                 console.error('Error fetching profile:', err);
//                 setError('Failed to load profile. Please try again.');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchUserProfile();
//     }, []);

//     const toggleOrderExpansion = (orderId) => {
//         setExpandedOrder(expandedOrder === orderId ? null : orderId);
//     };

//     // Loading state
//     if (loading) {
//         return (
//             <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
//                 <div className="text-center">
//                     <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-600 mx-auto mb-4"></div>
//                     <p className="text-green-800">Loading profile...</p>
//                 </div>
//             </div>
//         );
//     }

//     // Error state
//     if (error || !userProfile) {
//         return (
//             <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
//                 <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
//                     <div className="text-red-600 mb-4">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                         </svg>
//                     </div>
//                     <h2 className="text-2xl font-bold text-red-800 mb-4">Profile Loading Error</h2>
//                     <p className="text-red-600 mb-6">{error || 'Unable to load profile data'}</p>
//                     <button 
//                         onClick={() => window.location.reload()}
//                         className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
//                     >
//                         Retry
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
//             <div className="container mx-auto px-4 py-8">
//                 <div className="grid md:grid-cols-3 gap-8">
//                     {/* Profile Sidebar */}
//                     <div className="md:col-span-1 bg-white rounded-2xl shadow-xl p-6">
//                         <div className="text-center">
//                             <img
//                                 src={`https://ui-avatars.com/api/?name=${userProfile.name}&background=10B981&color=fff&rounded=true`}
//                                 alt={userProfile.name}
//                                 className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-green-500"
//                             />
//                             <h2 className="text-2xl font-bold text-green-800">{userProfile.name}</h2>
//                             <p className="text-green-600 mb-4">{userProfile.email}</p>
//                         </div>

//                         {/* Membership and Address Sections */}
//                         <div className="space-y-4 mt-6">
//                             {/* Membership Card */}
//                             <div className="bg-green-50 rounded-lg p-4">
//                                 <div className="flex items-center space-x-3 mb-2">
//                                     <CreditCard className="text-green-600" size={20} />
//                                     <span className="font-semibold text-green-800">Membership</span>
//                                 </div>
//                                 <p className="text-green-700">{userProfile.membership}</p>
//                                 <p className="text-green-600 text-sm">Member since {userProfile.memberSince}</p>
//                             </div>

//                             {/* Address Card */}
//                             <div className="bg-green-50 rounded-lg p-4">
//                                 <div className="flex items-center space-x-3 mb-2">
//                                     <MapPin className="text-green-600" size={20} />
//                                     <span className="font-semibold text-green-800">Delivery Address</span>
//                                 </div>
//                                 <p className="text-green-700">{userProfile.address}</p>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Orders Section */}
//                     <div className="md:col-span-2 bg-white rounded-2xl shadow-xl p-6">
//                         <h2 className="text-2xl font-bold text-green-800 mb-4">Order History</h2>
//                         {orders.length === 0 ? (
//                             <div className="text-center py-8 text-green-700">
//                                 No order history found
//                             </div>
//                         ) : (
//                             orders.map((order) => (
//                                 <div
//                                     key={order.id}
//                                     className="border-2 border-green-100 rounded-lg overflow-hidden transition-shadow hover:shadow-md mb-4"
//                                 >
//                                     {/* Order content remains the same as before */}
//                                     <div className="bg-green-50 p-4 flex justify-between items-center">
//                                         <div>
//                                             <div className="flex items-center space-x-3">
//                                                 <span className="font-semibold text-green-900">Order #{order.id}</span>
//                                                 <span className="px-3 py-1 rounded-full text-sm bg-green-200 text-green-900">
//                                                     {order.status}
//                                                 </span>
//                                             </div>
//                                             <p className="text-green-700 text-sm">{order.date}</p>
//                                         </div>
//                                         <div className="text-right">
//                                             <p className="font-bold text-green-900 text-lg">{order.total}</p>
//                                             <p className="text-green-700 text-sm">{order.plan}</p>
//                                         </div>
//                                     </div>

//                                     <div className="p-4">
//                                         <button
//                                             onClick={() => toggleOrderExpansion(order.id)}
//                                             className="w-full py-2 border-2 border-green-600 text-green-700 rounded-lg hover:bg-green-50 flex items-center justify-center"
//                                         >
//                                             {expandedOrder === order.id ? (
//                                                 <>
//                                                     <ChevronUp size={20} className="mr-2" />
//                                                     Hide Details
//                                                 </>
//                                             ) : (
//                                                 <>
//                                                     <ChevronDown size={20} className="mr-2" />
//                                                     View Details
//                                                 </>
//                                             )}
//                                         </button>

//                                         {expandedOrder === order.id && (
//                                             <div className="mt-4 border-t-2 border-green-100 pt-4">
//                                                 {order.meals.map((mealDay) => (
//                                                     <div key={mealDay.date} className="mb-4">
//                                                         <h4 className="font-semibold text-green-800 mb-2">{mealDay.date}</h4>
//                                                         <ul className="space-y-1 ml-4">
//                                                             {mealDay.items.map((item, index) => (
//                                                                 <li
//                                                                     key={index}
//                                                                     className="text-green-700 before:content-['▪'] before:text-green-600 before:mr-2"
//                                                                 >
//                                                                     {item}
//                                                                 </li>
//                                                             ))}
//                                                         </ul>
//                                                     </div>
//                                                 ))}
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>
//                             ))
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProfilePage;





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { ChevronDown, ChevronUp, Plus } from 'lucide-react';

// const UserProfile = () => {
//     const [activeTab, setActiveTab] = useState('profile');
//     const [profileData, setProfileData] = useState(null);
//     const [expandedOrderId, setExpandedOrderId] = useState(null);
//     const [packageDetails, setPackageDetails] = useState({});
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

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

//             {/* Profile & Addresses Content - Unchanged */}
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

//                     {/* Saved Addresses Section - Unchanged */}
//                     <div className="bg-white shadow rounded-lg p-6">
//                         <h2 className="text-xl font-semibold mb-4">Saved Addresses</h2>
//                         <div className="space-y-4">
//                             {profileData.savedAddress.map((address, index) => (
//                                 <div
//                                     key={index}
//                                     className="border-b pb-4 last:border-b-0"
//                                 >
//                                     <p className="font-semibold text-gray-900">{address.street}</p>
//                                     <p className="text-gray-600">{address.buildingFloor}, {address.houseOrFlatNumber}</p>
//                                     <p className="text-gray-600">{address.landmark}</p>
//                                     <p className="text-gray-600">
//                                         {address.city}, {address.state} {address.postalCode}
//                                     </p>
//                                     <p className="text-gray-600">{address.country}</p>
//                                     <p className="text-gray-600">Phone: {address.phone}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* Orders Content with Expandable Details */}
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
//         </div>
//     );
// };

// export default UserProfile;
