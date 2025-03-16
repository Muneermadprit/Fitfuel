import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Cart = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const cartItems = state?.cartItems || [];

    return (
        <div className="py-8 px-4">
            <h2 className="text-3xl font-bold mb-6">Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty. Add some items!</p>
            ) : (
                <div className="grid gap-6">
                    {cartItems.map((item, index) => (
                        <div key={index} className="bg-gray-100 p-6 rounded-lg flex items-center">
                            <img
                                src={item.image}
                                alt={item.heading}
                                className="w-24 h-24 object-cover rounded-lg mr-4"
                            />
                            <div>
                                <h4
                                    className="text-xl font-semibold"
                                    dangerouslySetInnerHTML={{ __html: item.heading }}
                                ></h4>
                                <p className="text-gray-500">{item.description || "No description available."}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className="mt-6">
                <button
                    onClick={() => navigate(-1)}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold"
                >
                    Go Back
                </button>
            </div>
        </div>
    );
};

export default Cart;
