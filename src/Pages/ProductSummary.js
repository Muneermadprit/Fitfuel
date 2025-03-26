import React, { useState, useEffect } from "react";
import axios from "axios";
import { ChevronDown, ChevronUp, ShoppingBag, MapPin, Package, Plus, Minus, AlertCircle, } from "lucide-react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
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
  const navigate = useNavigate();

  // Navigation links
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Menu", href: "/menu" },
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

  // Cool bag and delivery charges
  const coolBagPrice = coolBag ? 5.0 : 0.0;
  const deliveryCharge = 10.0;

  // Calculate total including add-ons - safely handle potential undefined values
  const addOnsTotal = selectedAddOns.reduce((sum, addOn) => sum + (addOn.pricePerDay || 0), 0);
  const totalAmount = (fareDetails?.totalFare || 0) + addOnsTotal;
  const gst = (totalAmount + coolBagPrice + deliveryCharge) * 0.1; // 10% GST
  const grandTotal = totalAmount + coolBagPrice + deliveryCharge + gst;

  // Get current package to display
  const currentPackage = meals.length > 0 ? meals[currentPackageIndex] : null;

  const handleCompleteOrder = () => {
    // Check session storage
    const orderStage = sessionStorage.getItem('userType');

    if (orderStage === '1') {
      // Redirect to order page if orderStage is 0
      navigate('/payment');
    } else {
      // Redirect to payment page for other stages
      navigate('/order');
    }
  };

  return (
    <>
      <header className="flex items-center justify-between px-6 py-4 bg-[#65a30d] shadow-lg rounded-b-lg relative z-50">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <img src={logo} alt="DailyFit Logo" className="h-16 w-32 object-contain" />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <span
              key={link.label}
              className="text-lg text-white hover:text-yellow-300 font-medium transition-colors cursor-pointer px-3"
            >
              {link.label}
            </span>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
          onClick={() => setMenuOpen(false)}
        />

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 right-0 h-full w-3/4 max-w-sm bg-white shadow-xl z-50 transition-transform duration-500 ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex items-center justify-between px-4 py-4 bg-[#65a30d]">
            <h2 className="text-lg font-semibold text-white">Menu</h2>
            <button
              className="text-white hover:text-gray-300 focus:outline-none"
              onClick={() => setMenuOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <ul className="p-6 space-y-4">
            {navLinks.map((link) => (
              <li key={link.label}>
                <span
                  className="block text-lg text-[#65a30d] hover:text-green-700 font-medium transition-colors cursor-pointer"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </header>
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
                    ${formatCurrency(currentPackage.fareTotalPerDay)}
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
                        <span className="text-gray-900 font-bold mr-3">${formatCurrency(meal.fareDetails?.totalFare)}</span>
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
                    ${formatCurrency(addOn.pricePerDay)}
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
            <span className="text-gray-900 font-bold">${formatCurrency(coolBagPrice)}</span>
          </div>
        </div>

        {/* Address Section */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold flex items-center mb-3 text-gray-800">
            <MapPin className="w-5 h-5 mr-2 text-green-600" />
            Delivery Address
          </h3>

          {savedAddress.length > 0 ? (
            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-gray-800 font-medium">
                    {`${savedAddress[0]?.houseOrFlatNumber || ''}, ${savedAddress[0]?.buildingFloor || ''}, ${savedAddress[0]?.street || ''}`}
                  </p>
                  <p className="text-gray-600">
                    {`${savedAddress[0]?.city || ''}, ${savedAddress[0]?.state || ''}, ${savedAddress[0]?.country || ''} - ${savedAddress[0]?.postalCode || ''}`}
                  </p>
                  <p className="text-gray-500 mt-1">Phone: {savedAddress[0]?.phone || 'N/A'}</p>
                  {savedAddress.length > 1 && (
                    <button className="text-sm text-green-600 mt-2 flex items-center hover:text-green-700">
                      <Plus className="w-4 h-4 mr-1" />
                      {savedAddress.length - 1} more saved addresses
                    </button>
                  )}
                </div>
              </div>
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
              <span className="font-medium text-gray-800">${formatCurrency(fareDetails?.mealsTotalPrice)}</span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Add-Ons Total:</span>
              <span className="font-medium text-gray-800">${formatCurrency(addOnsTotal)}</span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Delivery:</span>
              <span className="font-medium text-gray-800">${formatCurrency(deliveryCharge)}</span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">GST (10%):</span>
              <span className="font-medium text-gray-800">${formatCurrency(gst)}</span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Cool Bag:</span>
              <span className="font-medium text-gray-800">${formatCurrency(coolBagPrice)}</span>
            </div>

            <div className="h-px bg-gray-200 my-2"></div>

            <div className="flex justify-between items-center py-3">
              <span className="text-lg font-semibold text-gray-800">Grand Total:</span>
              <span className="text-xl font-bold text-green-600">${formatCurrency(grandTotal)}</span>
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