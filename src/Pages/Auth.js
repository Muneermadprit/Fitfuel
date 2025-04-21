// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Auth = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({
//     username: "",
//     password: "",
//     general: ""
//   });

//   const navigate = useNavigate();

//   const validateForm = () => {
//     let formErrors = {
//       username: "",
//       password: "",
//       general: ""
//     };

//     // Username validation
//     if (!username) {
//       formErrors.username = "Username is required";
//     } else if (username.length < 3) {
//       formErrors.username = "Username must be at least 3 characters long";
//     }

//     // Password validation
//     if (!password) {
//       formErrors.password = "Password is required";
//     } else if (password.length < 4) {
//       formErrors.password = "Password must be at least 4 characters long";
//     }

//     setErrors(formErrors);

//     // Return true if no errors
//     return !formErrors.username && !formErrors.password;
//   };

//   const handleEmailSignIn = async (e) => {
//     e.preventDefault();

//     // Reset general error
//     setErrors(prev => ({ ...prev, general: "" }));

//     // Validate form first
//     if (!validateForm()) {
//       return;
//     }

//     try {
//       const response = await axios.post('https://api.dailyfit.ae/api/user/login', {
//         userName: username,
//         password: password
//       }, { withCredentials: true });

//       // Check for specific response structure
//       if (response.data && response.data.status === true) {

//         // Store user information in localStorage if needed
//         localStorage.setItem('userInfo', JSON.stringify(response.data));
//         sessionStorage.setItem('userType', response.data.userType);
//         // Redirect to checkout page
//         navigate('/checkout');
//       } else {
//         // Handle case where status is not true
//         setErrors(prev => ({
//           ...prev,
//           general: response.data.message || "Login failed. Please try again."
//         }));
//       }
//     } catch (error) {
//       console.error("Login Error:", error.response ? error.response.data : error.message);

//       // Set error message from API or default error
//       setErrors(prev => ({
//         ...prev,
//         general: error.response?.data?.message || "An unexpected error occurred. Please try again."
//       }));
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-transparent p-4">
//       <div className="bg-white shadow-lg rounded-lg p-8 max-w-xs sm:max-w-md w-full">
//         <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
//           Login
//         </h2>

//         {/* General Error Message */}
//         {errors.general && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
//             {errors.general}
//           </div>
//         )}

//         <form onSubmit={handleEmailSignIn} className="space-y-4">
//           <div>
//             <input
//               type="text"
//               placeholder="Username"
//               value={username}
//               onChange={(e) => {
//                 setUsername(e.target.value);
//                 // Clear username error when user starts typing
//                 setErrors(prev => ({ ...prev, username: "" }));
//               }}
//               className={`w-full border ${errors.username
//                 ? "border-red-500 focus:ring-red-400"
//                 : "border-gray-300 focus:ring-blue-400"
//                 } rounded-lg px-4 py-3 focus:outline-none focus:ring-2`}
//             />
//             {errors.username && (
//               <p className="text-red-500 text-xs mt-1">{errors.username}</p>
//             )}
//           </div>

//           <div>
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => {
//                 setPassword(e.target.value);
//                 // Clear password error when user starts typing
//                 setErrors(prev => ({ ...prev, password: "" }));
//               }}
//               className={`w-full border ${errors.password
//                 ? "border-red-500 focus:ring-red-400"
//                 : "border-gray-300 focus:ring-blue-400"
//                 } rounded-lg px-4 py-3 focus:outline-none focus:ring-2`}
//             />
//             {errors.password && (
//               <p className="text-red-500 text-xs mt-1">{errors.password}</p>
//             )}
//           </div>

//           <button
//             type="submit"
//             className="w-full mt-6 bg-green-500 text-white py-3 px-4 rounded-lg shadow-md hover:bg-green-600 transition duration-200"
//           >
//             Sign in
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Auth;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logo from '../images/logo1.png'
import { Eye, EyeOff, Lock, User, AlertCircle, ArrowRight } from "lucide-react";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    general: ""
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Check for saved username in localStorage
    const savedUsername = localStorage.getItem('rememberedUsername');
    if (savedUsername) {
      setUsername(savedUsername);
      setRememberMe(true);
    }
  }, []);

  const validateForm = () => {
    let formErrors = {
      username: "",
      password: "",
      general: ""
    };

    // Username validation
    if (!username) {
      formErrors.username = "Username is required";
    } else if (username.length < 3) {
      formErrors.username = "Username must be at least 3 characters long";
    }

    // Password validation
    if (!password) {
      formErrors.password = "Password is required";
    } else if (password.length < 4) {
      formErrors.password = "Password must be at least 4 characters long";
    }

    setErrors(formErrors);

    // Return true if no errors
    return !formErrors.username && !formErrors.password;
  };

  const handleEmailSignIn = async (e) => {
    e.preventDefault();

    // Reset general error
    setErrors(prev => ({ ...prev, general: "" }));

    // Validate form first
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('https://api.dailyfit.ae/api/user/login', {
        userName: username,
        password: password
      }, { withCredentials: true });

      // Handle "Remember me" functionality
      if (rememberMe) {
        localStorage.setItem('rememberedUsername', username);
      } else {
        localStorage.removeItem('rememberedUsername');
      }

      // Check for specific response structure
      if (response.data && response.data.status === true) {
        // Store user information in localStorage if needed
        localStorage.setItem('userInfo', JSON.stringify(response.data));
        sessionStorage.setItem('userType', response.data.userType);
        // Redirect to checkout page
        navigate('/checkout');
      } else {
        // Handle case where status is not true
        setErrors(prev => ({
          ...prev,
          general: response.data.message || "Login failed. Please try again."
        }));
        setLoading(false);
      }
    } catch (error) {
      console.error("Login Error:", error.response ? error.response.data : error.message);
      // Set error message from API or default error
      setErrors(prev => ({
        ...prev,
        general: error.response?.data?.message || "An unexpected error occurred. Please try again."
      }));
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      {/* Enhanced animated background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Animated gradient orbs with increased blur and transparency */}
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-br from-green-400/10 to-emerald-500/10 blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 -right-20 w-80 h-80 rounded-full bg-gradient-to-bl from-teal-300/10 to-emerald-400/10 blur-3xl animate-pulse" style={{ animationDelay: '2s', animationDuration: '8s' }}></div>
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 rounded-full bg-gradient-to-tr from-green-300/5 to-teal-400/10 blur-3xl animate-pulse" style={{ animationDelay: '1s', animationDuration: '10s' }}></div>
        
        {/* Additional subtle animated elements */}
        <div className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-emerald-300/5 to-green-400/5 blur-3xl animate-pulse" style={{ animationDelay: '3s', animationDuration: '12s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-gradient-to-l from-teal-200/5 to-emerald-300/5 blur-3xl animate-pulse" style={{ animationDelay: '2.5s', animationDuration: '9s' }}></div>
      </div>
      
      {/* Enhanced card container with advanced glassmorphism */}
      <div className="relative backdrop-blur-xs bg-white/10 shadow-xl rounded-3xl p-10 max-w-md w-full border border-white/20 overflow-hidden transition-all duration-500 hover:bg-white/20">
        {/* Enhanced light reflections and edge highlights */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-emerald-300/10 opacity-30"></div>
        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 via-white/10 to-teal-300/10 opacity-30 blur-sm"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-300/30 to-transparent"></div>
       
        <div className="relative z-10">
          {/* Brand logo with enhanced container */}
          <div className="bg-transparent backdrop-blur-2xl p-4 rounded-2xl mb-8 shadow-inner  transition-all duration-300 hover:bg-white/40">
            <div className="flex justify-center">
              <img src={Logo} alt="DailyFit Logo" className="w-18 h-16 filter drop-shadow-md transition-all duration-300 hover:brightness-110" />
            </div>
          
            {/* Heading with enhanced typography */}
            <div className="mt-4 mb-2 text-center">
              <h2 className="text-3xl font-bold text-emerald-800 mb-2 drop-shadow-sm">Welcome Back</h2>
              <p className="text-emerald-700">Sign in to continue to DailyFit</p>
            </div>
          </div>
          
          {/* General Error Message with improved styling */}
          {errors.general && (
            <div className="bg-red-500/10 backdrop-blur-sm border-l-4 border-red-500 text-red-800 px-4 py-3 rounded-lg mb-6 flex items-center shadow-sm" role="alert">
              <AlertCircle className="w-5 h-5 mr-2 text-red-700" />
              <span>{errors.general}</span>
            </div>
          )}
          
          <form onSubmit={handleEmailSignIn} className="space-y-6">
            {/* Username Field with enhanced transparency */}
            <div className="relative group">
              <label htmlFor="username" className="block text-sm font-medium text-emerald-800 mb-1.5 ml-1">Username</label>
              <div className="relative transition duration-300 ease-in-out">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-emerald-600 group-hover:text-emerald-700 transition-colors" />
                </div>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setErrors(prev => ({ ...prev, username: "" }));
                  }}
                  className={`w-full pl-12 pr-4 py-3.5 bg-white/60 backdrop-blur-md border ${
                    errors.username ? "border-red-500" : "border-emerald-300/50 hover:border-emerald-500/70"
                  } text-emerald-800 placeholder-emerald-600/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all duration-300 shadow-sm`}
                  placeholder="Enter your username"
                />
              </div>
              {errors.username && (
                <p className="text-red-600 text-xs mt-1.5 ml-1 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" />{errors.username}
                </p>
              )}
            </div>
            
            {/* Password Field with enhanced transparency */}
            <div className="relative group">
              <label htmlFor="password" className="block text-sm font-medium text-emerald-800 mb-1.5 ml-1">Password</label>
              <div className="relative transition duration-300 ease-in-out">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-green-600 group-hover:text-emerald-700 " />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors(prev => ({ ...prev, password: "" }));
                  }}
                  className={`w-full pl-12 pr-12 py-3.5 bg-white/60 backdrop-blur-md border ${
                    errors.password ? "border-red-500" : "border-emerald-300/50 hover:border-emerald-500/70"
                  } text-emerald-800 placeholder-emerald-600/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all duration-300 shadow-sm`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-emerald-600 hover:text-emerald-800 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-600 text-xs mt-1.5 ml-1 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" />{errors.password}
                </p>
              )}
            </div>
            
           
            
            {/* Enhanced Sign In Button with glassmorphism */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full mt-8 bg-gradient-to-r from-green-500/90 to-emerald-600/90 backdrop-blur-sm hover:from-green-600 hover:to-emerald-700 text-white py-3.5 px-4 rounded-xl flex items-center justify-center space-x-3 shadow-lg border border-emerald-400/30 transition-all duration-300 ${
                loading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-emerald-500/20 hover:shadow-xl'
              }`}
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
              ) : (
                <>
                  <span className="font-medium">Sign in</span>
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </form>
          
          {/* Sign Up Link with improved styling */}
          <div className="text-center mt-8">
            <p className="text-emerald-700">
              Don't have an account?
            </p>
            <div 
              onClick={() => navigate('/register')} 
              className="text-emerald-800 font-bold cursor-pointer hover:text-emerald-950 transition-colors mt-1 flex items-center justify-center group"
            >
              Create an account
              <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;