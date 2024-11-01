// src/components/Profile.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import { useCart } from "./CartContext"; // Adjust path based on your folder structure

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart(); // Access cartItems from CartContext

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Back to Home */}
      <div
        className="p-4 flex items-center cursor-pointer"
        onClick={handleBackToHome}
      >
        <FaArrowLeft className="mr-2" />
        <span className="text-lg font-semibold">HOME</span>
      </div>

      {/* Profile Content */}
      <div className="flex-grow flex flex-col items-center">
        {/* Greeting */}
        <h1 className="text-2xl font-bold mt-4">Hello, user!</h1>

        {/* Address Compartment */}
        <div className="w-full max-w-md flex items-center justify-center mt-2 p-3 bg-gray-100 rounded-lg">
          <p className="text-gray-600">123 Fish St, Ocean City, TX</p>
          <button className="ml-2 text-gray-500 hover:text-gray-700">
            <FaEdit className="w-4 h-4" />
          </button>
        </div>

        {/* Divider Line */}
        <hr className="w-full max-w-md border-t border-gray-300 mt-4" />

        {/* Order Summary */}
        <div className="w-full max-w-md mt-6">
          <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
          {cartItems.length > 0 ? (
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li
                  key={item._id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-gray-600">Quantity: {item.weight}</p>
                  </div>
                  <p className="font-semibold">${item.price}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">Your cart is empty.</p>
          )}
        </div>

        {/* Order Status */}
        <div className="w-full max-w-md mt-6">
          <h2 className="text-lg font-semibold mb-2">Order Status</h2>
          <div className="flex justify-between items-center w-full">
            {/* Checkpoints */}
            <div className="flex-1 flex justify-between items-center relative">
              <span className="flex flex-col items-center">
                <div className="w-4 h-4 bg-blue-500 rounded-full mb-1"></div>
                <p className="text-xs text-gray-600">Order Received</p>
              </span>
              <div className="flex-1 h-0.5 bg-gray-300 mx-1"></div>
              <span className="flex flex-col items-center">
                <div className="w-4 h-4 bg-blue-500 rounded-full mb-1"></div>
                <p className="text-xs text-gray-600">Cleaning & Cutting</p>
              </span>
              <div className="flex-1 h-0.5 bg-gray-300 mx-1"></div>
              <span className="flex flex-col items-center">
                <div className="w-4 h-4 bg-gray-300 rounded-full mb-1"></div>
                <p className="text-xs text-gray-600">Dispatched</p>
              </span>
              <div className="flex-1 h-0.5 bg-gray-300 mx-1"></div>
              <span className="flex flex-col items-center">
                <div className="w-4 h-4 bg-gray-300 rounded-full mb-1"></div>
                <p className="text-xs text-gray-600">Delivered</p>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Profile;
