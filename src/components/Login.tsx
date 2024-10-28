// src/components/Login.tsx
import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const LoginDetails: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Set user as logged in
    sessionStorage.setItem("isLoggedIn", "true");
    navigate("/checkout"); // Navigate to the Checkout page after login
  };

  return (
    <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-md w-80 mt-2">
      <h2 className="text-3xl font-bold mb-8">LOGIN</h2>
      <input
        type="text"
        placeholder="Mobile Number"
        className="mb-6 p-3 border border-gray-300 rounded w-full"
      />
      <input
        type="password"
        placeholder="Password"
        className="mb-6 p-3 border border-gray-300 rounded w-full"
      />
      <button
        onClick={handleLogin} // Handle login and redirect
        className="bg-gradient-to-r from-[#81f8bb] to-[#22ccdd] text-black py-3 px-4 rounded w-full text-lg"
      >
        Login
      </button>
    </div>
  );
};

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/"); // Navigate to the Home page when the logo is clicked
  };

  const handleSignUpClick = () => {
    navigate("/sign-up"); // Navigate to the Sign Up page when "Sign In" is clicked
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="absolute top-6">
        <img
          src="./images/logo.png" // Adjust the logo path accordingly
          alt="Logo"
          className="h-16 w-auto cursor-pointer"
          onClick={handleLogoClick} // Handle click event to navigate to Home
        />
      </div>

      {/* The LoginDetails box starts immediately below the logo with reduced margin */}
      <LoginDetails />

      {/* Additional text and hyperlink below the LoginDetails component */}
      <div className="mt-4 text-center">
        <span className="text-gray-600">New to Fishly?</span>
        <span
          className="text-blue-600 ml-2 cursor-pointer hover:underline"
          onClick={handleSignUpClick} // Handle click event to navigate to Sign Up
        >
          Sign In
        </span>
      </div>
    </div>
  );
};

export default Login;
