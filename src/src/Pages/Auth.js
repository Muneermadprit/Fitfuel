import React, { useState } from "react";
import { auth, googleProvider } from "./firebaseconfig";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  deleteUser,
} from "firebase/auth";
import { FcGoogle } from "react-icons/fc";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Sign in with Google
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("User signed in with Google:", result.user);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  // Sign in with Email and Password
  const handleEmailSignIn = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in with email:", result.user.displayName);
    } catch (error) {
      console.error("Email Sign-In Error:", error);
    }
  };

  // Sign up with Email and Password
  const handleEmailSignUp = async () => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User signed up with email:", result.user);
    } catch (error) {
      console.error("Email Sign-Up Error:", error);
    }
  };

  // Sign out and delete account
  const handleSignOut = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await deleteUser(user);
        console.log("User deleted from Firebase Authentication");
        await signOut(auth);
        console.log("User signed out");
      } else {
        console.log("No user is signed in.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-xs sm:max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Login
        </h2>

        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-blue-500  text-white py-3 px-4 rounded-lg mb-6 shadow-md hover:bg-blue-600 transition duration-200 flex items-center justify-center"
        >
          <FcGoogle  className="mr-2" size={40}/><span className="">Sign in with Google</span> 
        </button>

        <div className="space-y-4">
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

        <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
          <button
            onClick={handleEmailSignIn}
            className="w-full mt-6 bg-green-500 text-white py-3 px-4 rounded-lg shadow-md hover:bg-green-600 transition duration-200"
          >
            Sign in 
          </button>
         
        </div>

       
      </div>
    </div>
  );
};

export default Auth;
