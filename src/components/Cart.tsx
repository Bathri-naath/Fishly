import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import Navbar from "./NavBar";
import Footer from "./Footer";
import { CartItem } from "../types/CartItem";
import axios from "axios";

interface CartProps {
  updateTotalCount: (counts: number[]) => void;
  searchTerm: string;
}

const Cart: React.FC<CartProps> = ({ updateTotalCount, searchTerm }) => {
  const navigate = useNavigate();
  const cartContext = useContext(CartContext);
  const [localSearchTerm, setLocalSearchTerm] = useState<string>(searchTerm);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [selectedCutOption, setSelectedCutOption] = useState<string>("");
  const [preBookDate, setPreBookDate] = useState<string>("");

  if (!cartContext) {
    return <div>Error: Cart context is unavailable.</div>;
  }

  const { cartItems, updateCartItem, removeFromCart } = cartContext;

  useEffect(() => {
    const counts = cartItems.map((item) => item.count);
    updateTotalCount(counts);
  }, [cartItems, updateTotalCount]);

  const handleCountChange = (item: CartItem, increment: boolean) => {
    const currentCount = item.count;
    const newCount = increment
      ? currentCount + 1
      : Math.max(currentCount - 1, 1);
    updateCartItem({ ...item, count: newCount }, newCount);
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.count,
    0
  );

  const handleSearchChange = (term: string) => setLocalSearchTerm(term);

  const verifyToken = async () => {
    const uid = sessionStorage.getItem("uid");
    const token = sessionStorage.getItem("token");

    if (!uid || !token) {
      return navigate("/login");
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/verify",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setIsLoggedIn(true);
        navigate("/checkout");
      } else {
        sessionStorage.removeItem("uid");
        sessionStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/login");
      }
    } catch (error) {
      console.error("Verification failed", error);
      sessionStorage.removeItem("uid");
      sessionStorage.removeItem("token");
      setIsLoggedIn(false);
      navigate("/login");
    }
  };

  const handleCutOptionChange = (option: string) => {
    setSelectedCutOption(option);
    if (option !== "pre-book") setPreBookDate("");
  };

  const handleCheckoutClick = () =>
    isLoggedIn ? navigate("/checkout") : navigate("/login");

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        totalCount={cartItems.reduce((acc, item) => acc + item.count, 0)}
        onSearchChange={handleSearchChange}
        searchTerm={localSearchTerm}
        products={[]}
        onSearchBoxClick={() => {}}
        onAccountClick={() => navigate("/profile")}
      />
      <div className="flex-grow p-4 flex justify-center items-center">
        <div className="max-w-lg w-full p-4 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold mb-4 text-center">Cart</h1>
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
                    className="w-24 h-24 object-cover mr-4"
                  />
                  <div className="flex-grow">
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        className="bg-gray-300 rounded px-2"
                        onClick={() => handleCountChange(item, false)}
                      >
                        -
                      </button>
                      <span className="font-bold">{item.count}</span>
                      <button
                        className="bg-gray-300 rounded px-2"
                        onClick={() => handleCountChange(item, true)}
                      >
                        +
                      </button>
                    </div>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.weight}
                    </p>
                  </div>
                  <div className="text-right ml-4">
                    <p>
                      Price: <span className="font-bold">${item.price}</span>
                    </p>
                    <p>
                      Total:{" "}
                      <span className="font-bold">
                        ${(item.price * item.count).toFixed(2)}
                      </span>
                    </p>
                    <button
                      className="text-red-500 underline mt-2"
                      onClick={() => removeFromCart(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {cartItems.length > 0 && (
        <div className="p-4 bg-white border-t">
          <div className="max-w-lg mx-auto">
            <div className="flex justify-end items-center mb-4">
              <p className="text-lg font-semibold">
                Total Price: ${totalPrice.toFixed(2)}
              </p>
            </div>
            <div className="flex justify-center">
              <button
                onClick={verifyToken}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Cart;
