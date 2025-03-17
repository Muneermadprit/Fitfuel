import React, { useState, useEffect } from "react";
import axios from "axios";
import { ChevronDown, ChevronUp } from "lucide-react";

const ProductSummary = () => {
  const [cartData, setCartData] = useState(null);
  const [expanded, setExpanded] = useState({});
  const [coolBag, setCoolBag] = useState(false);
  const [selectedAddOns, setSelectedAddOns] = useState([]);

  useEffect(() => {
    // Fetch cart details from API
    const fetchCart = async () => {
      try {
        const response = await axios.get("https://api.dailyfit.ae/api/user/get-cart", {
          withCredentials: true,
        });

        if (response.data && response.data.data) {
          setCartData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();

    // Get selected add-ons from session storage
    const storedAddOns = JSON.parse(sessionStorage.getItem("selectedEnhancements")) || [];
    console.log(storedAddOns)
    setSelectedAddOns(storedAddOns);
  }, []);

  const toggleExpand = (index) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  if (!cartData) {
    return <p className="text-gray-500 text-center mt-5">Loading cart details...</p>;
  }

  // Extract cart details
  const { meals, addons, fareDetails, savedAddress } = cartData;
  
  // Cool bag and delivery charges
  const coolBagPrice = coolBag ? 5.0 : 0.0;
  const deliveryCharge = 10.0;

  // Calculate total including add-ons
  const addOnsTotal = selectedAddOns.reduce((sum, addOn) => sum + addOn.pricePerDay, 0);
  const totalAmount = fareDetails.totalFare + addOnsTotal;
  const gst = (totalAmount + coolBagPrice + deliveryCharge) * 0.1; // 10% GST
  const grandTotal = totalAmount + coolBagPrice + deliveryCharge + gst;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-5">
      <h2 className="text-2xl font-bold mb-4">Product Summary</h2>

      {/* Meals Section */}
      {meals.length > 0 ? (
        meals.map((meal, index) => (
          <div key={index} className="p-4 border rounded-lg bg-gray-100 mb-2">
            <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleExpand(index)}>
              <div className="flex items-center space-x-2">
                {expanded[index] ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
                <span className="text-lg font-semibold">{meal.name}</span>
              </div>
              <span className="text-gray-900 font-bold">${meal.price.toFixed(2)}</span>
            </div>
            {expanded[index] && <p className="text-gray-700 mt-2">{meal.description}</p>}
          </div>
        ))
      ) : (
        <p className="text-gray-500">No meals in cart.</p>
      )}

      {/* Add-Ons Section */}
      {selectedAddOns.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Selected Add-Ons</h3>
          {selectedAddOns.map((addOn, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-100 rounded-lg mt-2">
              <div className="flex items-center space-x-3">
                <img src={addOn.image} alt={addOn.name} className="w-12 h-12 rounded-lg" />
                <span className="text-lg font-semibold">{addOn.name}</span>
              </div>
              <span className="text-gray-900 font-bold">${addOn.pricePerDay.toFixed(2)}</span>
            </div>
          ))}
        </div>
      )}

      {/* Cool Bag Option */}
      <div className="flex items-center mt-4 space-x-3">
        <input
          type="checkbox"
          id="coolBag"
          checked={coolBag}
          onChange={() => setCoolBag(!coolBag)}
          className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="coolBag" className="flex items-center space-x-2 cursor-pointer">
          <img src="/api/placeholder/40/40" alt="Cool Bag" className="w-10 h-10 rounded-lg" />
          <span className="text-gray-900 font-medium">Add Cool Bag</span>
        </label>
      </div>

      {/* Address Section */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Saved Address</h3>
        {savedAddress.length > 0 ? (
          savedAddress.map((address, index) => (
            <div key={index} className="p-3 bg-gray-100 rounded-lg mt-2">
              <p className="text-gray-800">{`${address.houseOrFlatNumber}, ${address.buildingFloor}, ${address.street}, ${address.city}, ${address.state}, ${address.country} - ${address.postalCode}`}</p>
              <p className="text-gray-500">Phone: {address.phone}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No saved addresses found.</p>
        )}
      </div>

      {/* Summary */}
      <div className="mt-6 border-t pt-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Meals Total:</span>
          <span className="text-xl font-bold text-green-600">${fareDetails.mealsTotalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-lg font-semibold">Add-Ons Total:</span>
          <span className="text-xl font-bold text-green-600">${addOnsTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-lg font-semibold">Delivery:</span>
          <span className="text-xl font-bold text-gray-700">${deliveryCharge.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-lg font-semibold">GST (10%):</span>
          <span className="text-xl font-bold text-gray-700">${gst.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-lg font-semibold">Cool Bag:</span>
          <span className="text-xl font-bold text-gray-700">${coolBagPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center mt-4 border-t pt-4">
          <span className="text-lg font-semibold">Grand Total:</span>
          <span className="text-xl font-bold text-red-600">${grandTotal.toFixed(2)}</span>
        </div>
      </div>

      <button className="w-full mt-6 bg-[#059033] text-white py-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition">
        Continue
      </button>
    </div>
  );
};

export default ProductSummary;
