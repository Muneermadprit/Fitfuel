import React, { useState } from "react";
import { auth } from "./firebaseconfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
  const [name, setName] = useState(""); // State for name
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle Email Sign-Up
  const handleEmailSignUp = async () => {
    setError(""); // Reset error state
    setSuccess(""); // Reset success state

    if (!name.trim()) {
      setError("Name is required");
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User signed up with email:", result.user);
      console.log("User's name:", name); // Log the user's name
      setSuccess("User registered successfully!");
    } catch (error) {
      console.error("Email Sign-Up Error:", error);
      setError(error.message);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
      style={{
        backgroundImage: "url('/assets/Registerlog.jpg')",
      }}
    >
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-xs sm:max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Register</h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 text-green-700 p-4 rounded mb-4">
            {success}
          </div>
        )}

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          onClick={handleEmailSignUp}
          className="w-full mt-6 bg-blue-500 text-white py-3 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
