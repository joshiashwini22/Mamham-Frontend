import React, { useState, useEffect } from "react";
import axios from "axios";
import LoginImg from "../../assets/images/Login.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DishSelection = ({ category, onAddSelectedDish }) => {
  const [dishes, setDishes] = useState([]);
  const [selectedDishId, setSelectedDishId] = useState(null);
  const [selectedPortion, setSelectedPortion] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const maxPortions = 15; // Maximum allowed portions
  const defaultImage = LoginImg;

  useEffect(() => {
    // Fetch dishes data from the backend
    const fetchDishes = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/customization/dishes/category/${category}/`
        );
        setDishes(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDishes();
  }, [category]);

  

  const handleSelectDish = (index) => {
    const selectedDishId = dishes[index]?.id;
    setSelectedDishId(selectedDishId);
  };
  
  
  const handleSelectPortion = (e) => {
    if (!selectedDishId) {
        toast.error("Please select a dish.");
   
    }
    const portion = parseInt(e.target.value);
    if (portion < 1 || portion > maxPortions) {
      toast.error(`Please enter a portion value between 1 and ${maxPortions}.`);
      return;
    }
    if (portion > maxPortions) {
      toast.error(`Maximum portions allowed (${maxPortions}) exceeded.`);
      return;
    }
    setSelectedPortion(portion);

  };
  useEffect(() => {
    console.log(selectedPortion)
    // Call handleAddToCart() whenever selectedPortion changes
    handleAddToCart();
  }, [selectedPortion, selectedDishId]); 

  const handleAddToCart = (e) => {
    
    if (selectedDishId && selectedPortion) {
      const selectedDish = dishes.find((dish) => dish.id === selectedDishId);
      if (selectedDish) {
        const newItem = {
          id: selectedDishId,
          name: selectedDish.name,
          image: selectedDish.image,
          price: selectedDish.price,
          portion: selectedPortion,
        };
        setCartItems([...cartItems, newItem]);
        onAddSelectedDish(newItem);
      } else {
        console.error("Selected dish not found");
      }
    } else {
      console.error("Please select a dish and portion before adding to cart");
    }
  };



  return (
    <div>
      <div className="flex items-center mx-6 text-sm">
        <label
          htmlFor={category}
          className="mb-3 mr-3 font-semibold w-20 flex items-center"
        >
          {category}
        </label>
        <select
          id={category}
          className="mb-3 py-2 mr-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm flex items-center" // Added flex and items-center classes
          onChange={(e) => handleSelectDish(e.target.selectedIndex - 1)}
        >
          <option>Select a dish</option>
          {dishes.map((dish, index) => (
            <option key={dish.id}>{dish.name}</option>
          ))}
        </select>
        <input
          type="number"
          min="1"
          max={maxPortions} // Limit the max value based on remaining portions
          className="mb-3 py-2 mr-3 border w-32 text-center border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Enter portion"
          onChange={handleSelectPortion}
        />
      </div>

  
    </div>
  );
};


export default DishSelection;
