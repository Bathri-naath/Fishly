import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import axios from "axios";

const Checkout: React.FC = () => {
  const uid = sessionStorage.getItem("uid");
  const navigate = useNavigate();
  const cartContext = useContext(CartContext);

  const [isAddress, setIsAddress] = useState<boolean>(false);
  const [address, setAddress] = useState({
    street: "",
    area: "",
    city: "",
    pincode: "",
    landmark: "",
  });
  const [formattedAddress, setFormattedAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [productsSummary, setProductsSummary] = useState<string>("");
  const [selectedService, setSelectedService] = useState("Onsite cut");
  const [prebookingDate, setPrebookingDate] = useState("");
  const [prebookingTime, setPrebookingTime] = useState("");

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/getAddress/${uid}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data != "") {
          setIsAddress(response.data.Address);
        }
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchData();
  }, [uid]);

  useEffect(() => {
    const formatted = `${address.street} ${address.area} ${address.city} ${address.pincode} ${address.landmark}`;
    setFormattedAddress(formatted.trim());
  }, [address]);

  useEffect(() => {
    const summary = cartItems
      .map((item) => `${item.name} x ${item.count}`)
      .join(", ");
    setProductsSummary(summary);
  }, [cartItems]);

  const buttonText =
    paymentMethod === "Cash on Delivery" ? "Place Order" : "Proceed to Pay";

  const isAddressComplete =
    address.street.trim() &&
    address.area.trim() &&
    address.city.trim() &&
    address.pincode.trim();

  // Cutting method display logic
  const cuttingMethod =
    selectedService === "Prebooking"
      ? `${selectedService} (Date: ${prebookingDate}, Time: ${prebookingTime})`
      : selectedService;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-8">
      <div className="mb-6 cursor-pointer" onClick={handleLogoClick}>
        <img src="./images/logo.png" alt="Logo" className="h-16 w-auto" />
      </div>

      {/* Order Summary Section */}
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Order Summary
        </h2>
        {cartItems.length === 0 ? (
          <p className="text-center">Your cart is empty.</p>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li
                key={item._id}
                className="mb-4 border-b pb-4 flex items-start"
              >
                <img
                  src={"data:image/jpeg;base64," + item.image}
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
        <button
          onClick={handleEditCart}
          className="mt-4 w-full py-2 rounded bg-gradient-to-r from-[#81f8bb] to-[#22ccdd] text-white font-semibold"
        >
          Edit Cart
        </button>
      </div>

      {/* Service Options Section */}
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-4">Service Option</h2>
        <div className="flex items-center mb-4">
          <input
            type="radio"
            id="onsiteCut"
            name="serviceOption"
            value="Onsite cut"
            checked={selectedService === "Onsite cut"}
            onChange={() => setSelectedService("Onsite cut")}
            className="mr-2"
          />
          <label htmlFor="onsiteCut">Onsite cut</label>
        </div>
        <div className="flex items-center mb-4">
          <input
            type="radio"
            id="precut"
            name="serviceOption"
            value="Precut"
            checked={selectedService === "Precut"}
            onChange={() => setSelectedService("Precut")}
            className="mr-2"
          />
          <label htmlFor="precut">Precut</label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            id="prebooking"
            name="serviceOption"
            value="Prebooking"
            checked={selectedService === "Prebooking"}
            onChange={() => setSelectedService("Prebooking")}
            className="mr-2"
          />
          <label htmlFor="prebooking">Prebooking</label>
        </div>
        {selectedService === "Prebooking" && (
          <div className="mt-4">
            <input
              type="date"
              value={prebookingDate}
              onChange={(e) => setPrebookingDate(e.target.value)}
              className="w-full p-3 mb-3 border border-gray-300 rounded"
              required
            />
            <input
              type="time"
              value={prebookingTime}
              onChange={(e) => setPrebookingTime(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
          </div>
        )}
      </div>

      {/* Address Section */}
      {isAddress ? (
        <div></div>
      ) : (
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
            onChange={(e) =>
              setAddress({ ...address, pincode: e.target.value })
            }
            className="w-full p-3 mb-3 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            placeholder="Landmark"
            value={address.landmark}
            onChange={(e) =>
              setAddress({ ...address, landmark: e.target.value })
            }
            className="w-full p-3 mb-3 border border-gray-300 rounded"
          />
        </div>
      )}

      {/* Payment Method Section */}
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

      {/* Place Order Button */}
      <button
        onClick={() => console.log("Order Placed")}
        disabled={!isAddressComplete}
        className={`w-full max-w-lg py-2 rounded ${
          isAddressComplete
            ? "bg-gradient-to-r from-[#81f8bb] to-[#22ccdd] text-white font-semibold"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        {buttonText}
      </button>
      {/* Summary Section */}
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-4">Order Details</h2>
        <p>
          <strong>Formatted Address:</strong>{" "}
          {formattedAddress || "No address provided"}
        </p>
        <p>
          <strong>Products Summary:</strong>{" "}
          {productsSummary || "No products in cart"}
        </p>
        <p>
          <strong>Selected Service:</strong> {cuttingMethod}
        </p>
        <p>
          <strong>Payment Method:</strong> {paymentMethod}
        </p>
      </div>
    </div>
  );
};

export default Checkout;
