import React, { useState } from 'react';
import { TiThMenuOutline } from 'react-icons/ti';
import { ChevronLeft, ChevronRight, X, ChevronDown, ChevronUp } from "lucide-react";

const ProductSummary = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [coolBag, setCoolBag] = useState(false);
  const [expanded, setExpanded] = useState({});

  // Updated product details
  const products = [
    {
      name: "2 Main Meals",
      price: 50.00,
      quantity: 2,
      description: "Delicious and nutritious main meals tailored to your dietary needs."
    },
    {
      name: "Breakfast & FITT Snack",
      price: 50.00,
      quantity: 2,
      description: "Energizing breakfast and a carefully crafted FITT snack to kickstart your day."
    }
  ];

  const coolBagPrice = coolBag ? 5.00 : 0.00;
  const deliveryCharge = 10.00;
  const totalAmount = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  const gst = (totalAmount + coolBagPrice + deliveryCharge) * 0.1; // 10% GST
  const grandTotal = totalAmount + coolBagPrice + deliveryCharge + gst;

  // Navigation links
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Menu", href: "/menu" },
    { label: "Contact", href: "/contact" }
  ];

  const toggleExpand = (index) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <><header className="flex items-center justify-between px-6 py-4 bg-white shadow-md rounded-lg relative z-50">
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
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-5">
        <h2 className="text-2xl font-bold mb-4">Product Summary</h2>

        {products.map((product, index) => (
          <div key={index} className="p-4 border rounded-lg bg-gray-100 mb-2">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleExpand(index)}
            >
              <div className="flex items-center space-x-2">
                {expanded[index] ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
                <span className="text-lg font-semibold">{product.name}</span>

              </div>
              <span className="text-gray-900 font-bold">${(product.price * product.quantity).toFixed(2)}</span>
            </div>
            {expanded[index] && (
              <div>
                <p className="text-gray-700 mt-2">{product.description}</p>
                <div className="flex justify-between mt-3">
                  <span className="text-gray-600">Quantity: {product.quantity}</span>
                  <span className="text-gray-900 font-bold">${(product.price * product.quantity).toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>
        ))}

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

        <div className="mt-6 border-t pt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Total Amount:</span>
            <span className="text-xl font-bold text-green-600">${totalAmount.toFixed(2)}</span>
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

        <button className="w-full mt-6 bg-purple-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-purple-700 transition">
          Continue
        </button>
      </div></>
  );
};

export default ProductSummary;