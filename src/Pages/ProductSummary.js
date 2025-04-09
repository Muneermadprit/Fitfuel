import React, { useState, useEffect } from "react";
import axios from "axios";
import { ChevronDown, ChevronUp, ShoppingBag, MapPin, Package, Plus, Minus, AlertCircle, } from "lucide-react";
import { ChevronLeft, ChevronRight, X, Check } from "lucide-react";
import logo from '../images/logo.png'
import { useNavigate } from 'react-router-dom';

const ProductSummary = () => {
  const [cartData, setCartData] = useState(null);
  const [expanded, setExpanded] = useState({});
  const [coolBag, setCoolBag] = useState(false);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentPackageIndex, setCurrentPackageIndex] = useState(0);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [showAddressSelector, setShowAddressSelector] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();

  // Navigation links
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Profile", href: "/profile" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" }
  ];

  // Helper function to safely format currency values
  const formatCurrency = (value) => {
    return typeof value === 'number' ? value.toFixed(2) : '0.00';
  };

  // After setting cartData from the API response, restructure it for your component
  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://api.dailyfit.ae/api/user/get-cart", {
          withCredentials: true,
        });

        if (response.data && response.data.data) {
          const apiData = response.data.data;

          const restructuredData = {
            meals: (apiData.cart?.package?.selectedMeals || []).map(dateItem => ({
              packageName: "Your Package",
              description: "Your package description",
              fareTotalPerDay: (apiData.fareDetails?.mealsTotalPrice || 0) /
                (apiData.cart?.package?.selectedMeals?.length || 1),
              meals: (dateItem.mealDetails || []).map(meal => ({
                ...meal,
                mealName: meal.mealName || "Unnamed Meal",
                description: meal.description || "",
                mealType: meal.mealType || [],
                image: meal.image || [],
                moreDetails: {
                  energy: meal.moreDetails?.energy || 0,
                  protein: meal.moreDetails?.protein || 0,
                  carbohydrates: meal.moreDetails?.carbohydrates || 0,
                  fat: meal.moreDetails?.fat || 0,
                  allergens: meal.moreDetails?.allergens || []
                },
                fareDetails: {
                  totalFare: meal.fareDetails?.totalFare || 0,
                  discount: meal.fareDetails?.discount || 0,
                  strikeOff: meal.fareDetails?.strikeOff || 0
                }
              }))
            })),
            addons: apiData.addons.map(addon => ({
              name: addon.mealName,
              pricePerDay: addon.fareDetails?.totalFare || 0,
              image: addon.image?.[0] || "/api/placeholder/48/48"
            })),
            fareDetails: {
              mealsTotalPrice: apiData.fareDetails?.mealsTotalPrice || 0,
              totalFare: apiData.fareDetails?.totalFare || 0,
              addOnsTotalPrice: apiData.fareDetails?.addOnsTotalPrice || 0
            },
            savedAddress: apiData.savedAddress || []
          };

          setCartData(restructuredData);
          // Automatically select all add-ons
          setSelectedAddOns(restructuredData.addons);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://api.dailyfit.ae/api/user/get-profile', { withCredentials: true });
        setProfileData(response.data.data);
        setLoading(false);
      } catch (err) {
        // setError(err);
        // setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const toggleExpand = (index) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const navigatePackage = (direction) => {
    if (!cartData || !cartData.meals || cartData.meals.length === 0) return;

    if (direction === 'next') {
      setCurrentPackageIndex((prev) =>
        prev < cartData.meals.length - 1 ? prev + 1 : prev
      );
    } else {
      setCurrentPackageIndex((prev) =>
        prev > 0 ? prev - 1 : prev
      );
    }
  };

  const toggleAddressSelector = () => {
    setShowAddressSelector(prev => !prev);
  };

  const selectAddress = (index) => {
    setSelectedAddressIndex(index);
    setShowAddressSelector(false);
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-5 flex flex-col items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-t-green-500 border-green-200 rounded-full animate-spin"></div>
        <p className="text-gray-500 mt-4 font-medium">Loading your meal details...</p>
      </div>
    );
  }

  if (!cartData) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-5 flex flex-col items-center justify-center h-64">
        <AlertCircle className="w-12 h-12 text-amber-500" />
        <p className="text-gray-700 mt-4 font-medium">Unable to load cart details. Please try again.</p>
      </div>
    );
  }

  // Extract cart details with safe defaults
  const { meals = [], addons = [], fareDetails = { mealsTotalPrice: 0, totalFare: 0 }, savedAddress = [] } = cartData;

  // Get current package to display
  const currentPackage = meals.length > 0 ? meals[currentPackageIndex] : null;

  const handleCompleteOrder = async () => {
    try {
      const orderStage = sessionStorage.getItem('userType');

      // If orderStage is not '1', navigate to the order page and return early
      if (orderStage !== '1') {
        navigate('/Order');
        return;
      }

      // Get the currently selected address
      const selectedAddress = savedAddress[selectedAddressIndex];

      // Format the address according to the required model structure
      const addressPayload = {
        address: {
          street: selectedAddress?.street || '',
          buildingFloor: selectedAddress?.buildingFloor || '',
          houseOrFlatNumber: selectedAddress?.houseOrFlatNumber || '',
          landmark: selectedAddress?.landmark || '',
          city: selectedAddress?.city || '',
          state: selectedAddress?.state || '',
          postalCode: selectedAddress?.postalCode || '',
          country: selectedAddress?.country || '',
          phone: selectedAddress?.phone || '',
          identifier: selectedAddress?.name || 'Home'
        },
        bagIncluded: coolBag
      };

      // Call the createOrder API with the address payload
      const response = await axios.post(
        "https://api.dailyfit.ae/api/user/createOrder",
        addressPayload,
        { withCredentials: true }
      );

      const data = response.data;

      if (!data.status) throw new Error("Failed to create order");

      // Load Razorpay script
      const loadScript = (src) => {
        return new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = src;
          script.onload = () => resolve(true);
          script.onerror = () => resolve(false);
          document.body.appendChild(script);
        });
      };

      const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }

      const options = {
        key: "rzp_test_8yAxkM6TR2ggyI",
        amount: data.data.amount,
        currency: data.data.currency,
        name: "Your Company",
        description: "Payment for Order",
        order_id: data.data.id,
        handler: async function (response) {
          const verifyRes = await axios.post(
            "https://api.dailyfit.ae/api/user/verify-payment",
            response,  {
              withCredentials: true, // ✅ Include cookies (session/token) with request
            }
          );
          if (verifyRes.data.status) {
            alert("Payment successful!");
            navigate('/order-success');
          } else {
            alert("Payment verification failed.");
          }
        },
        prefill: {
          name: profileData?.userName,
          email: profileData?.userEmail,
          contact: "",
        },
        theme: { color: "#3399cc" },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error("Error processing order:", error);
      alert("An error occurred while processing your order. Please try again.");
    }
  };

  // Format address for display
  const formatAddress = (address) => {
    const parts = [
      address?.houseOrFlatNumber,
      address?.buildingFloor,
      address?.street,
      address?.city,
      address?.state,
      address?.country,
      address?.postalCode
    ].filter(Boolean);

    return parts.join(', ');
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
      <div className="max-w-2xl mx-auto p-6 bg-gradient-to-b from-white to-gray-50 shadow-xl rounded-2xl mt-5 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <ShoppingBag className="w-6 h-6 mr-2 text-green-600" />
            Your Meal Package
          </h2>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            {meals.length} {meals.length === 1 ? "package" : "packages"}
          </span>
        </div>

        {/* Packages Section - Now Dynamic with Navigation */}
        {meals.length > 0 && currentPackage ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
              <button
                onClick={() => navigatePackage('prev')}
                disabled={currentPackageIndex === 0}
                className={`p-2 rounded-full ${currentPackageIndex === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-green-600 hover:bg-green-50'}`}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-500">
                  Package {currentPackageIndex + 1} of {meals.length}
                </p>
              </div>

              <button
                onClick={() => navigatePackage('next')}
                disabled={currentPackageIndex >= meals.length - 1}
                className={`p-2 rounded-full ${currentPackageIndex >= meals.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-green-600 hover:bg-green-50'}`}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <div className="rounded-xl overflow-hidden bg-white shadow-md border border-gray-100">
              <div className="bg-gradient-to-r from-green-600 to-teal-500 p-4 text-white">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold">{currentPackage.packageName || "Meal Package"}</h3>
                  <span className="text-white bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-medium">
                    AED {formatCurrency(currentPackage.fareTotalPerDay)}
                  </span>
                </div>
                <p className="text-green-50 mt-1 text-sm">{currentPackage.description || "Package description"}</p>
              </div>

              {/* Individual Meals in Package */}
              <div className="divide-y divide-gray-100">
                {(currentPackage.meals || []).map((meal, mealIndex) => (
                  <div key={mealIndex} className="p-4 bg-white">
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => toggleExpand(`${currentPackageIndex}-${mealIndex}`)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                          {meal.image && meal.image.length > 0 ? (
                            <img
                              src={meal.image[0]}
                              alt={meal.mealName || "Meal"}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/api/placeholder/48/48";
                              }} />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-200">
                              <Package className="w-6 h-6 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div>
                          <span className="text-lg font-semibold text-gray-800">{meal.mealName || "Unnamed Meal"}</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {(meal.mealType || []).map((type, i) => (
                              <span key={i} className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                                {type}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-900 font-bold mr-3">AED {formatCurrency(meal.fareDetails?.totalFare)}</span>
                        {expanded[`${currentPackageIndex}-${mealIndex}`] ? (
                          <Minus className="w-5 h-5 text-gray-500" />
                        ) : (
                          <Plus className="w-5 h-5 text-gray-500" />
                        )}
                      </div>
                    </div>

                    {expanded[`${currentPackageIndex}-${mealIndex}`] && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex flex-col md:flex-row md:items-start gap-4">
                          {meal.image && meal.image.length > 0 && (
                            <img
                              src={meal.image[0]}
                              alt={meal.mealName || "Meal"}
                              className="w-full md:w-32 h-32 object-cover rounded-lg shadow-md"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/api/placeholder/128/128";
                              }} />
                          )}
                          <div className="flex-1">
                            <p className="text-gray-700 mb-4">{meal.description || "No description available"}</p>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                              <div className="bg-blue-50 p-3 rounded-lg shadow-sm">
                                <p className="font-semibold text-blue-700">Energy</p>
                                <p className="font-medium text-blue-900">{meal.moreDetails?.energy || 0} kcal</p>
                              </div>
                              <div className="bg-green-50 p-3 rounded-lg shadow-sm">
                                <p className="font-semibold text-green-700">Protein</p>
                                <p className="font-medium text-green-900">{meal.moreDetails?.protein || 0}g</p>
                              </div>
                              <div className="bg-yellow-50 p-3 rounded-lg shadow-sm">
                                <p className="font-semibold text-yellow-700">Carbs</p>
                                <p className="font-medium text-yellow-900">{meal.moreDetails?.carbohydrates || 0}g</p>
                              </div>
                              <div className="bg-red-50 p-3 rounded-lg shadow-sm">
                                <p className="font-semibold text-red-700">Fat</p>
                                <p className="font-medium text-red-900">{meal.moreDetails?.fat || 0}g</p>
                              </div>
                            </div>

                            {meal.moreDetails?.allergens && meal.moreDetails.allergens.length > 0 && (
                              <div className="mt-4 bg-amber-50 p-3 rounded-lg shadow-sm">
                                <p className="text-sm font-semibold text-amber-700">Allergens:</p>
                                <p className="text-sm text-amber-800">{meal.moreDetails.allergens.join(", ")}</p>
                              </div>
                            )}

                            {(meal.fareDetails?.discount || 0) > 0 && (
                              <div className="mt-3 bg-green-50 p-2 rounded-lg inline-block">
                                <span className="text-gray-900 font-bold mr-3">${formatCurrency(meal.fareDetails?.strikeOff)}</span>
                                <span className="text-gray-900 font-bold mr-3">${formatCurrency(meal.fareDetails?.discount)}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center p-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto" />
            <p className="text-gray-500 mt-3">Your cart is empty. Add some delicious meals!</p>
          </div>
        )}

        {/* Add-Ons Section */}
        {selectedAddOns.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold flex items-center mb-3 text-gray-800">
              <Plus className="w-5 h-5 mr-2 text-green-600" />
              Enhancements
            </h3>
            <div className="bg-white rounded-xl p-2 shadow-md border border-gray-100">
              {selectedAddOns.map((addOn, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg my-2 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white rounded-lg shadow-sm overflow-hidden flex-shrink-0">
                      <img
                        src={addOn.image}
                        alt={addOn.name || "Add-on"}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/api/placeholder/48/48";
                        }}
                      />
                    </div>
                    <span className="text-gray-800 font-medium">{addOn.name}</span>
                  </div>
                  <span className="text-gray-900 font-bold bg-green-100 px-3 py-1 rounded-full">
                    AED {formatCurrency(addOn.pricePerDay)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cool Bag Option */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl shadow-sm border border-blue-100">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="coolBag"
              checked={coolBag}
              onChange={() => setCoolBag(!coolBag)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
            <label htmlFor="coolBag" className="flex items-center space-x-3 cursor-pointer flex-1">
              <div className="w-12 h-12 bg-white rounded-lg shadow-sm overflow-hidden flex-shrink-0">
                <img src="/api/placeholder/48/48" alt="Cool Bag" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-gray-900 font-medium">Add Cool Bag</span>
                <p className="text-sm text-gray-600">Keep your meals fresh during delivery</p>
              </div>
            </label>
          </div>
        </div>

        {/* Address Section - Updated to show multiple addresses */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold flex items-center mb-3 text-gray-800">
            <MapPin className="w-5 h-5 mr-2 text-green-600" />
            Delivery Address
          </h3>

          {savedAddress.length > 0 ? (
            <div className="relative">
              {/* Currently selected address */}
              <div
                className="bg-white rounded-xl p-4 shadow-md border border-gray-100 cursor-pointer"
                onClick={toggleAddressSelector}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-800 font-medium">
                          {savedAddress[selectedAddressIndex]?.name || 'Home Address'}
                        </p>
                        <p className="text-gray-600">
                          {`${savedAddress[selectedAddressIndex]?.houseOrFlatNumber || ''}, ${savedAddress[selectedAddressIndex]?.buildingFloor || ''}, ${savedAddress[selectedAddressIndex]?.street || ''}`}
                        </p>
                        <p className="text-gray-600">
                          {`${savedAddress[selectedAddressIndex]?.city || ''}, ${savedAddress[selectedAddressIndex]?.state || ''} ${savedAddress[selectedAddressIndex]?.postalCode || ''}`}
                        </p>
                        <p className="text-gray-500 mt-1">Phone: {savedAddress[selectedAddressIndex]?.phone || 'N/A'}</p>
                      </div>
                      <div className="flex items-center text-green-600">
                        {savedAddress.length > 1 && (
                          <ChevronDown className={`w-5 h-5 transition-transform ${showAddressSelector ? 'rotate-180' : ''}`} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Address selector dropdown */}
              {showAddressSelector && savedAddress.length > 1 && (
                <div className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-10 max-h-64 overflow-y-auto">
                  {savedAddress.map((address, index) => (
                    <div
                      key={index}
                      className={`p-3 border-b border-gray-100 last:border-0 cursor-pointer hover:bg-gray-50 transition-colors flex items-start ${index === selectedAddressIndex ? 'bg-green-50' : ''}`}
                      onClick={() => selectAddress(index)}
                    >
                      <div className="w-8 mr-3 flex-shrink-0 flex justify-center">
                        {index === selectedAddressIndex ? (
                          <Check className="w-5 h-5 text-green-600" />
                        ) : (
                          <div className="w-5 h-5"></div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{address.name || `Address ${index + 1}`}</p>
                        <p className="text-sm text-gray-600">{formatAddress(address)}</p>
                        <p className="text-sm text-gray-500">Phone: {address.phone || 'N/A'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center p-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto" />
              <p className="text-gray-500 mt-3">No saved addresses found. Add a delivery address to continue.</p>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="mt-8 bg-white rounded-xl p-4 shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Order Summary</h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Meals Total:</span>
              <span className="font-medium text-gray-800">AED{formatCurrency(fareDetails?.mealsTotalPrice)}</span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Add-Ons Total:</span>
              <span className="font-medium text-gray-800">AED{formatCurrency(fareDetails?.addOnsTotalPrice)}</span>
            </div>
            <div className="h-px bg-gray-200 my-2"></div>
            <div className="flex justify-between items-center py-3">
              <span className="text-lg font-semibold text-gray-800">Grand Total:</span>
              <span className="font-medium text-gray-800">AED{formatCurrency(fareDetails?.totalFare)}</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleCompleteOrder}
          className="w-full mt-6 bg-gradient-to-r from-green-600 to-green-500 text-white py-4 rounded-xl font-semibold text-lg hover:from-green-700 hover:to-green-600 transition-all shadow-lg hover:shadow-xl flex items-center justify-center"
        >
          Complete Order
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </button>
      </div>
    </>
  );
};

export default ProductSummary;