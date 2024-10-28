// src/components/Checkout.tsx
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const cartContext = useContext(CartContext);
  const [address, setAddress] = useState({
    street: "",
    area: "",
    city: "",
    pincode: "",
    landmark: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  if (!cartContext) {
    return <div>Error: Cart context is unavailable.</div>;
  }

  const { cartItems } = cartContext;

  const handleLogoClick = () => {
    navigate("/"); // Navigate to Home page on logo click
  };

  const handleEditCart = () => {
    navigate("/cart"); // Navigate to the Cart page on edit cart button click
  };

  // Button text changes based on payment method
  const buttonText =
    paymentMethod === "Cash on Delivery" ? "Place Order" : "Proceed to Pay";

  // Form validation for address fields
  const isAddressComplete =
    address.street.trim() &&
    address.area.trim() &&
    address.city.trim() &&
    address.pincode.trim();

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-8">
      {/* Logo */}
      <div className="mb-6 cursor-pointer" onClick={handleLogoClick}>
        <img
          src="./images/logo.png" // Adjust the path to your logo file
          alt="Logo"
          className="h-16 w-auto"
        />
      </div>

      {/* Cart Items Box */}
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Order Summary
        </h2>
        {cartItems.length === 0 ? (
          <p className="text-center">Your cart is empty.</p>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="mb-4 border-b pb-4 flex items-start">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover mr-4"
                />
                <div className="flex-grow">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p>Quantity: {item.count}</p>
                  <p>Price: ${(item.price * item.count).toFixed(2)}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
        {/* Edit Cart Button */}
        <button
          onClick={handleEditCart}
          className="mt-4 w-full py-2 rounded bg-gradient-to-r from-[#81f8bb] to-[#22ccdd] text-white font-semibold"
        >
          Edit Cart
        </button>
      </div>

      {/* Address Input Fields */}
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-4">Delivery Address</h2>
        <input
          type="text"
          placeholder="No. and Street"
          value={address.street}
          onChange={(e) => setAddress({ ...address, street: e.target.value })}
          className="w-full p-3 mb-3 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          placeholder="Area and Town"
          value={address.area}
          onChange={(e) => setAddress({ ...address, area: e.target.value })}
          className="w-full p-3 mb-3 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          placeholder="City"
          value={address.city}
          onChange={(e) => setAddress({ ...address, city: e.target.value })}
          className="w-full p-3 mb-3 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          placeholder="Pincode"
          value={address.pincode}
          onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
          className="w-full p-3 mb-3 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          placeholder="Landmark"
          value={address.landmark}
          onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded"
        />
      </div>

      {/* Payment Method */}
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
        <div className="flex items-center mb-4">
          <input
            type="radio"
            id="cashOnDelivery"
            name="paymentMethod"
            value="Cash on Delivery"
            checked={paymentMethod === "Cash on Delivery"}
            onChange={() => setPaymentMethod("Cash on Delivery")}
            className="mr-2"
          />
          <label htmlFor="cashOnDelivery">Cash on Delivery</label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            id="payOnline"
            name="paymentMethod"
            value="Pay Online"
            checked={paymentMethod === "Pay Online"}
            onChange={() => setPaymentMethod("Pay Online")}
            className="mr-2"
          />
          <label htmlFor="payOnline">Pay Online</label>
        </div>
      </div>

      {/* Dynamic Submit Button */}
      <button
        className={`w-full max-w-lg py-2 mt-4 rounded font-semibold text-white ${
          isAddressComplete
            ? "bg-gradient-to-r from-[#81f8bb] to-[#22ccdd]"
            : "bg-gray-400 cursor-not-allowed"
        }`}
        disabled={!isAddressComplete} // Disable if address is incomplete
      >
        {buttonText}
      </button>
    </div>
  );
};

export default Checkout;
