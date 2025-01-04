import React, { useState } from "react";
import { auth, googleProvider } from "./firebaseconfig";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

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
      console.log("User signed in with email:", result.user);
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

  // Sign out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
    } catch (error) {
      console.error("Sign-Out Error:", error);
    }
  };

  return (
    <div className="p-8 text-center bg-gray-50 min-h-screen z-50 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Firebase Authentication</h2>

      <button
        onClick={handleGoogleSignIn}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mb-4"
      >
        Sign in with Google
      </button>

      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 mb-2 sm:mb-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex space-x-4 mb-4">
        <button
          onClick={handleEmailSignIn}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Sign in with Email
        </button>
        <button
          onClick={handleEmailSignUp}
          className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
        >
          Sign up
        </button>
      </div>

      <button
        onClick={handleSignOut}
        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
      >
        Sign out
      </button>
    </div>
  );
};

export default Auth;
