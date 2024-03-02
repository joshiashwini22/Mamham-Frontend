import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import DishSelection from "./components/dishSelection";

function Custom() {
  const categories = ["Base", "Lentil", "Veggie", "Protein", "Pickle"];
  const [selectedDishes, setSelectedDishes] = useState([]);
  const [address, setAddress] = useState("");
  const [paymentOption, setPaymentOption] = useState("");

  // Load selected dishes from localStorage on component mount
  useEffect(() => {
    const storedSelectedDishes = localStorage.getItem("selectedDishes");
    if (storedSelectedDishes) {
      setSelectedDishes(JSON.parse(storedSelectedDishes));
    }
  }, []);

  // Function to add a selected dish to the cart
  const addSelectedDish = (dish) => {
    // Check if the selected dish is already in the cart
    const existingIndex = selectedDishes.findIndex((selectedDish) => selectedDish.id === dish.id);
  
    if (existingIndex !== -1) {
      // If the dish already exists, update its quantity
      const updatedSelectedDishes = [...selectedDishes];
      updatedSelectedDishes[existingIndex].portion = +updatedSelectedDishes[existingIndex].portion + +dish.portion; // Update portion quantity
      setSelectedDishes(updatedSelectedDishes);
      localStorage.setItem("selectedDishes", JSON.stringify(updatedSelectedDishes));
    } else {
      // If the dish does not exist, add it to the cart
      const updatedSelectedDishes = [...selectedDishes, dish];
      setSelectedDishes(updatedSelectedDishes);
      localStorage.setItem("selectedDishes", JSON.stringify(updatedSelectedDishes));
    }
  };
  
  // Function to remove a selected dish from the cart
  const removeSelectedDish = (index) => {
    const updatedSelectedDishes = [...selectedDishes];
    updatedSelectedDishes.splice(index, 1);
    setSelectedDishes(updatedSelectedDishes);
    localStorage.setItem("selectedDishes", JSON.stringify(updatedSelectedDishes));
  };

  // Function to calculate the total price of all selected dishes
  const calculateTotal = () => {
    return selectedDishes.reduce((total, dish) => total + (dish.price * dish.portion), 0);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handlePaymentChange = (e) => {
    setPaymentOption(e.target.value);
  };

  useEffect(() => {
    console.log(paymentOption);
  }, [paymentOption]); // Log paymentOption whenever it changes

  return (
    <>
      <Navbar/>
      <div className="bg-gray-200 lg:mx-[180px] h-screen mt-18 ">
        <div className="grid gap-4">
          <div className="flex flex-col items-center mx-44 py-5">
            <span className="text-red-600 text-4xl font-bold block mb-4">
              Build your Meal
            </span>
            <span className="text-gray-700 block">
              Select items to create your own dish!
            </span>
          </div>
          <div className="min-h-full grid lg:grid-cols-2 lg:gap-5 mx-4">
            <div className="build flex flex-col lg:block bg-white/80 border border-gray-500/30 rounded-md py-5">
              {categories.map((category) => (
                <DishSelection
                  key={category}
                  category={category}
                  onAddSelectedDish={addSelectedDish}
                />
              ))}
            </div>
            <div className="build flex flex-col lg:block bg-white/80 border border-gray-500/30 rounded-md py-5">
              <Cart
                selectedDishes={selectedDishes}
                onRemoveSelectedDish={removeSelectedDish}
                calculateTotal={calculateTotal}
                address={address}
                paymentOption={paymentOption}
                onAddressChange={handleAddressChange}
                onPaymentChange={handlePaymentChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const Cart = ({ selectedDishes, onRemoveSelectedDish, calculateTotal, address, paymentOption, onAddressChange, onPaymentChange }) => {

  const handlePlaceOrder = () => {
    console.log("Order placed!");
  };

  return (
    <div className="p-5">
      <span className="text-red-600 text-xl font-bold block mb-4">
        Your Cart
      </span>
      {selectedDishes.length > 0 ? (
        <span className="text-green-600 text-lg block mb-4">
          Here is your list
        </span>
      ) : (
        <span className="text-red-600 text-lg block mb-4">
          No items in the cart
        </span>
      )}
      {selectedDishes.length > 0 && (
        <div className="flex items-center justify-between border-b border-gray-400 py-2">
          <span className="font-semibold text-xs">Image</span>
          <span className="font-semibold text-xs">Name</span>
          <span className="font-semibold text-xs">Price</span>
          <span className="font-semibold text-xs">Serving</span>
          <span className="font-semibold text-xs">Total</span>
          <span className="font-semibold text-xs">Remove</span>
        </div>
      )}
      {selectedDishes.map((dish, index) => (
        <div key={index} className="flex items-center justify-between border-b border-gray-400 py-2">
          <div className="flex items-center space-x-4">
            <img
              src={`http://localhost:8000${dish.image}`}
              alt={dish.name}
              className="w-12 h-12 object-cover rounded-lg"
            />
            <span className="text-xs">{dish.name}</span>
          </div>
          <span className="text-xs">Rs. {dish.price}</span>
          <span className="text-xs">{dish.portion}</span>
          <span className="text-xs">Rs. {(dish.price * dish.portion).toFixed(2)}</span>
          <button
            onClick={() => onRemoveSelectedDish(index)}
            className="text-red-600 font-medium text-xs"
          >
            Remove
          </button>
        </div>
      ))}
      {selectedDishes.length > 0 && (
        <div className="flex items-center justify-between mt-4">
          <span className="font-medium text-xs">Total:</span>
          <span className="text-xs">${calculateTotal().toFixed(2)}</span>
        </div>
      )}

      {/* Address Input */}
      <div className="mt-4">
        <label className="block mb-2 text-gray-700" htmlFor="address">
          Address:
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={address}
          onChange={onAddressChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Enter your address"
        />
      </div>

      {/* Payment Option Dropdown */}
      <div className="mt-4">
        <label className="block mb-2 text-gray-700" htmlFor="payment">
          Payment Option:
        </label>
        <select
          id="payment"
          name="payment"
          onChange={onPaymentChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          value={paymentOption} // Set the value attribute to ensure the selected option is displayed
        >
          <option>Select a dish</option>
          <option value="cod">Cash on Delivery</option>
          <option value="online">Online Payment</option>
        </select>
      </div>
      {/* Place Order Button */}
      {selectedDishes.length > 0 && (
        <button
          onClick={handlePlaceOrder}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Place Order
        </button>
      )}
    </div>
  );
};

export default Custom;
