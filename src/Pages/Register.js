import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, AlertCircle, ArrowRight, CheckCircle } from "lucide-react";
import Loginbackground from '../images/Registerlog.jpg'

// Replace with your actual image path


const Register = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegistration = async () => {
    setError("");
    setSuccess("");
    setLoading(true);

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

      setTimeout(() => {
        navigate("/Order");
      }, 2000);
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
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: `url(${Loginbackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Dark overlay for better readability */}
    
      
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden border-2 border-green-600">
        <div className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-green-600/10 to-emerald-400/10 blur-3xl animate-pulse" style={{ animationDelay: '3s', animationDuration: '12s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-gradient-to-l from-teal-200/10 to-green-600/10 blur-3xl animate-pulse" style={{ animationDelay: '2.5s', animationDuration: '9s' }}></div>
      </div>
      
      {/* Glassmorphism card container */}
      <div className="relative z-10 backdrop-blur-sm border-2 border-green-600 bg-white/60 shadow-xl rounded-3xl p-10 max-w-md w-full  overflow-hidden transition-all duration-500 hover:bg-white/15">
        <div className="relative z-10">
          {/* Title */}
          <div className="bg-white/30 backdrop-blur-md border-2 border-b-green-600 p-2 rounded-2xl mb-8 shadow-inner transition-all duration-300 hover:bg-white/15 text-center">
            <h2 className="text-2xl font-bold text-green-600 drop-shadow-sm">Welcome to Dailyfit</h2>

          </div>
          
          {/* Error and Success messages */}
          {error && (
            <div className="bg-red-500/10 backdrop-blur-sm border-l-4 border-red-500 text-red-300 px-4 py-3 rounded-lg mb-6 flex items-center shadow-sm" role="alert">
              <AlertCircle className="w-5 h-5 mr-2 text-red-400" />
              <span>{error}</span>
            </div>
          )}
          
          {success && (
            <div className="bg-green-500/10 backdrop-blur-sm border-l-4 border-green-500 text-green-600 px-4 py-3 rounded-lg mb-6 flex items-center shadow-sm" role="alert">
              <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
              <span>{success}</span>
            </div>
          )}
          
          <div className="space-y-6">
            {/* Username Field */}
            <div className="relative group">
              <label htmlFor="username" className="block text-sm font-medium text-green-600 mb-1.5 ml-1">Username</label>
              <div className="relative transition duration-300 ease-in-out">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-green-400 group-hover:text-green-600 transition-colors" />
                </div>
                <input
                  id="username"
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-white/10 backdrop-blur-md border border-green-400/30 hover:border-green-400/50 text-white placeholder-green-600/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all duration-300 shadow-sm"
                  placeholder="Enter your username"
                />
              </div>
            </div>
            
            {/* Email Field */}
            <div className="relative group">
              <label htmlFor="email" className="block text-sm font-medium text-green-600 mb-1.5 ml-1">Email</label>
              <div className="relative transition duration-300 ease-in-out">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-green-400 group-hover:text-green-600 transition-colors" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-white/100 backdrop-blur-md border border-green-400/30 hover:border-green-400/50 text-white placeholder-green-600/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all duration-300 shadow-sm"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            
            {/* Password Field */}
            <div className="relative group">
              <label htmlFor="password" className="block text-sm font-medium text-green-600 mb-1.5 ml-1">Password</label>
              <div className="relative transition duration-300 ease-in-out">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-green-400 group-hover:text-green-600 transition-colors" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3.5 bg-white/100 backdrop-blur-md border border-green-400/30 hover:border-green-400/50 text-white placeholder-green-600/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all duration-300 shadow-sm"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-green-400 hover:text-green-600 transition-colors"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              <p className="text-xs text-red-600 mt-1 ml-1">Password must be at least 6 characters long</p>
            </div>
          </div>
          
          {/* Register Button */}
          <button
            onClick={handleRegistration}
            disabled={loading}
            className={`w-full mt-8 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3.5 px-4 rounded-xl flex items-center justify-center space-x-3 shadow-lg border border-green-400/30 transition-all duration-300 ${
              loading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-green-500/20 hover:shadow-xl'
            }`}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
            ) : (
              <>
                <span className="font-medium">Register</span>
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </button>
          
          {/* Sign In Link */}
          <div className="text-center mt-8">
            <p className="text-green-600">
              Already have an account?
            </p>
            <div 
              onClick={() => navigate("/Order")} 
              className="text-green-900 font-bold cursor-pointer hover:text-green-600 transition-colors mt-1 flex items-center justify-center group"
            >
              Sign in now
              <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;