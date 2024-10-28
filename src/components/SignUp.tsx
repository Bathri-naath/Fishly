// src/components/SignUp.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpDetails: React.FC = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleSignUp = () => {
    // Validate mobile number (must be exactly 10 digits)
    if (!/^\d{10}$/.test(mobile)) {
      setErrorMessage("Mobile number must be a 10-digit number.");
      return;
    }

    // Validate password (must be between 8 and 24 characters, no spaces)
    if (password.length < 8 || password.length > 24) {
      setErrorMessage("Password must be between 8 and 24 characters.");
      return;
    }

    if (/\s/.test(password)) {
      setErrorMessage("Password must not contain spaces.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setErrorMessage("");
    alert("Sign-up successful!");
    // Add your sign-up logic here
  };

  return (
    <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-md w-80 mt-2">
      <h2 className="text-3xl font-bold mb-8">SIGN UP</h2>

      {/* Input for Name */}
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-6 p-3 border border-gray-300 rounded w-full"
      />

      {/* Input for Mobile Number */}
      <input
        type="text"
        placeholder="Mobile Number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        className="mb-6 p-3 border border-gray-300 rounded w-full"
      />

      {/* Input for Password with toggle visibility */}
      <div className="mb-6 w-full relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 border border-gray-300 rounded w-full"
        />
        <button
          type="button"
          className="absolute right-3 top-3 text-gray-600"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      {/* Input for Confirm Password with toggle visibility */}
      <div className="mb-6 w-full relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="p-3 border border-gray-300 rounded w-full"
        />
        <button
          type="button"
          className="absolute right-3 top-3 text-gray-600"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      {/* Display error message if validation fails */}
      {errorMessage && (
        <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
      )}

      {/* Sign Up Button */}
      <button
        onClick={handleSignUp}
        className="bg-gradient-to-r from-[#81f8bb] to-[#22ccdd] text-black py-3 px-4 rounded w-full text-lg"
      >
        Sign Up
      </button>
    </div>
  );
};

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/"); // Navigate to the Home page when the logo is clicked
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

      {/* The SignUpDetails box starts immediately below the logo */}
      <SignUpDetails />
    </div>
  );
};

export default SignUp;
