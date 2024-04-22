import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import DishSelection from "./components/dishSelection";
import { useAuth } from "../context/AuthContext";
import Popup from "./components/popup";
import Login from "../pages/login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Custom() {
  const categories = ["Base", "Lentil", "Veggie", "Protein", "Pickle"];
  const [selectedDishes, setSelectedDishes] = useState([]);
  const [address, setAddress] = useState("");
  const [paymentOption, setPaymentOption] = useState("");
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  //Obtain selected dishes from local storage when page is loadwd
  useEffect(() => {
    const storedSelectedDishes = localStorage.getItem("selectedDishes");
    if (storedSelectedDishes) {
      setSelectedDishes(JSON.parse(storedSelectedDishes));
    }
  }, []);

  const addSelectedDish = (dish) => {
    const existingIndex = selectedDishes.findIndex((selectedDish) => selectedDish.id === dish.id);

    if (existingIndex !== -1) {
      const updatedSelectedDishes = [...selectedDishes];
      updatedSelectedDishes[existingIndex].portion = dish.portion;
      setSelectedDishes(updatedSelectedDishes);
      localStorage.setItem("selectedDishes", JSON.stringify(updatedSelectedDishes));
      toast.success('Dish added successfully!');
    } else {
      const updatedSelectedDishes = [...selectedDishes, dish];
      setSelectedDishes(updatedSelectedDishes);
      localStorage.setItem("selectedDishes", JSON.stringify(updatedSelectedDishes));
      toast.success('Dish added successfully!');
    }
  };

  const removeSelectedDish = (index, dishName) => {
    const updatedSelectedDishes = [...selectedDishes];
    updatedSelectedDishes.splice(index, 1);
    setSelectedDishes(updatedSelectedDishes);
    localStorage.setItem("selectedDishes", JSON.stringify(updatedSelectedDishes));
    toast.info(`${dishName} removed!`);

  };

  const calculateTotal = () => {
    return selectedDishes.reduce((total, dish) => total + dish.price * dish.portion, 0);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handlePaymentChange = (e) => {
    setPaymentOption(e.target.value);
  };

  useEffect(() => {
    console.log(paymentOption);
  }, [paymentOption]);

  const handleProceedToCheckout = () => {
    if (!isAuthenticated) {
      setShowLoginPopup(true);
    } else {
      navigate("/checkout");
    }
  };

  const handleCheckoutAfterLogin = () => {
    handleProceedToCheckout(true);
  };

  return (
    <div className="h-screen">
      <Navbar />
      <div className="bg-white-200 ">

      <div className="bg-white lg:mx-[180px] mt-25 mb-8 shadow-xl rounded-2xl p-4">
        <div className="grid gap-4">
          <div className="flex flex-col items-center mx-44 py-5">
            <span className="text-red-600 text-4xl font-bold bl ock mb-4">Build your Meal</span>
            <span className="text-gray-700 block">Select items to create your own dish!</span>
          </div>
          <div className="grid lg:grid-cols-2 lg:gap-5 mx-4">
            <div className="build flex flex-col lg:block bg-white/80 border border-gray-500/30 rounded-md py-5">
              {categories.map((category) => (
                <DishSelection key={category} category={category} onAddSelectedDish={addSelectedDish} />
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
                onProceedToCheckout={handleProceedToCheckout}
                />
            </div>
          </div>
        </div>
      </div>
      {showLoginPopup && (
        <Popup onClose={() => setShowLoginPopup(false)} content={<Login onLogin={handleCheckoutAfterLogin} context="custom" />} />
        )}
</div>
    </div>
  );
}

const Cart = ({ selectedDishes, onRemoveSelectedDish, calculateTotal, address, paymentOption, onAddressChange, onPaymentChange, onProceedToCheckout }) => {
  const total = calculateTotal();

  return (
    <div className="p-5">
      <span className="text-red-600 text-xl font-bold block mb-4">Your Cart</span>
      {selectedDishes.length > 0 ? (
        <span className="text-green-600 text-lg block mb-4">Here is your list</span>
      ) : (
        <span className="text-red-600 text-lg block mb-4">No items in the cart</span>
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
            <img src={`http://localhost:8000${dish.image}`} alt={dish.name} className="w-12 h-12 object-cover rounded-lg" />
            <span className="text-xs">{dish.name}</span>
          </div>
          <span className="text-xs">Rs. {dish.price}</span>
          <span className="text-xs">{dish.portion}</span>
          <span className="text-xs">Rs. {(dish.price * dish.portion).toFixed(2)}</span>
          <button onClick={() => onRemoveSelectedDish(index, dish.name)} className="text-red-600 font-medium text-xs">
            Remove
          </button>
        </div>
      ))}
      {selectedDishes.length > 0 && (
        <div className="flex items-center justify-between mt-4">
          <span className="font-medium text-xs">Total:</span>
          <span className="text-xs">${total.toFixed(2)}</span>
        </div>
      )}
      {total > 50 ? (
        <button onClick={onProceedToCheckout} className="mt-4 bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 rounded">
          Proceed To Checkout
        </button>
      ) : (
        <span className="text-blue-600 text-sm mt-4">Minimum order total must be Rs 50.</span>
      )}
      <ToastContainer/>
    </div>
  );
};


export default Custom;
