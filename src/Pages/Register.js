import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Register = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigation

  // Handle Registration using axios
  const handleRegistration = async () => {
    setError("");
    setSuccess("");
    setLoading(true);

    // Basic Form Validations
    if (!userName.trim()) {
      setError("Username is required");
      setLoading(false);
      return;
    }
    if (!userEmail.trim() || !/\S+@\S+\.\S+/.test(userEmail)) {
      setError("Valid email is required");
      setLoading(false);
      return;
    }
    if (!password.trim() || password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      const requestBody = {
        userName: userName,
        userEmail: userEmail,
        password: password,
      };

      const response = await axios.post(`https://api.dailyfit.ae/api/user/signup`, requestBody, { withCredentials: true });

      console.log("Registration successful:", response.data);
      setSuccess("User registered successfully!");

      // Redirect to login page after successful registration
      setTimeout(() => {
        navigate("/Order");
      }, 2000); // Adding a delay for better UX
    } catch (error) {
      console.error("Registration Error:", error);
      const errorMessage = error.response?.data?.message || "An error occurred during registration";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
      style={{ backgroundImage: "url('/assets/Registerlog.jpg')" }}
    >
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-xs sm:max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Register</h2>

        {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>}
        {success && <div className="bg-green-100 text-green-700 p-4 rounded mb-4">{success}</div>}

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="email"
            placeholder="Email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
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
          onClick={handleRegistration}
          disabled={loading}
          className={`w-full mt-6 ${loading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'} text-white py-3 px-4 rounded-lg shadow-md transition duration-200`}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {/* Link for existing users */}
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/Order")}
            className="text-blue-500 hover:underline"
          >
            Click here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
