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

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    general: ""
  });

  const navigate = useNavigate();

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

    try {
      const response = await axios.post('https://api.dailyfit.ae/api/user/login', {
        userName: username,
        password: password
      }, { withCredentials: true });

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
      }
    } catch (error) {
      console.error("Login Error:", error.response ? error.response.data : error.message);
      // Set error message from API or default error
      setErrors(prev => ({
        ...prev,
        general: error.response?.data?.message || "An unexpected error occurred. Please try again."
      }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-xs sm:max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Login</h2>
        {/* General Error Message */}
        {errors.general && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            {errors.general}
          </div>
        )}
        <form onSubmit={handleEmailSignIn} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setErrors(prev => ({ ...prev, username: "" }));
              }}
              className={`w-full border ${errors.username ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"} rounded-lg px-4 py-3 focus:outline-none focus:ring-2`}
            />
            {errors.username && (<p className="text-red-500 text-xs mt-1">{errors.username}</p>)}
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors(prev => ({ ...prev, password: "" }));
              }}
              className={`w-full border ${errors.password ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"} rounded-lg px-4 py-3 focus:outline-none focus:ring-2`}
            />
            {errors.password && (<p className="text-red-500 text-xs mt-1">{errors.password}</p>)}
          </div>
          <button
            type="submit"
            className="w-full mt-6 bg-green-500 text-white py-3 px-4 rounded-lg shadow-md hover:bg-green-600 transition duration-200"
          >
            Sign in
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account? 
          <span onClick={() => navigate('/register')} className="text-blue-500 cursor-pointer hover:underline"> Sign up</span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
