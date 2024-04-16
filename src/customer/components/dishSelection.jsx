import React, { useState, useEffect } from "react";
import axios from "axios";
import LoginImg from "../../assets/images/Login.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DishSelection = ({ category, onAddSelectedDish }) => {
  const [dishes, setDishes] = useState([]);
  const [selectedDishId, setSelectedDishId] = useState(null);
  const [selectedPortion, setSelectedPortion] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [totalPortions, setTotalPortions] = useState(0); // Track total portions
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
    console.log("Selected index:", index);
    const selectedDishId = dishes[index]?.id; // Get the ID of the dish at the specified index
    console.log("Selected dish ID:", selectedDishId);
    setSelectedDishId(selectedDishId); // Set the selected dish ID
  };

  const handleSelectPortion = (e) => {
    const portion = parseInt(e.target.value);
    if (portion < 1 || portion > maxPortions) {
      toast.error(`Please enter a portion value between 1 and ${maxPortions}.`);
      return;
    }
    if (totalPortions + portion > maxPortions) {
      toast.error(`Maximum portions allowed (${maxPortions}) exceeded.`);
      return;
    }
    setSelectedPortion(portion); // Set the selected portion
    handleAddToCart()
  };

  const handleAddToCart = (e) => {
    if (!selectedDishId || !selectedPortion) {
      if (!selectedDishId) {
        toast.error('Please select a dish.');
      }
      if (!selectedPortion) {
        toast.error('Please specify the portion.');
      }
      return;
    }
    if (selectedDishId && selectedPortion) {
      // Find the selected dish by its ID
      const selectedDish = dishes.find((dish) => dish.id === selectedDishId);
      if (selectedDish) {
        // Add the selected dish and portion to the cart
        const newItem = {
          id: selectedDishId,
          name: selectedDish.name,
          image: selectedDish.image,
          price: selectedDish.price,
          portion: selectedPortion
        };
        console.log(newItem);
        setCartItems([...cartItems, newItem]);
        setTotalPortions(selectedPortion); // Update total portions
        onAddSelectedDish(newItem)
        console.log(
          `Added dish ${selectedDish.image}  ${selectedDish.name} ${selectedDishId} with portion ${selectedPortion} to the cart`
        );
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
        <label htmlFor={category} className="mb-3 mr-3 font-semibold w-20 flex items-center">
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
          max={maxPortions - totalPortions} // Limit the max value based on remaining portions
          className="mb-3 py-2 mr-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Enter portion"
          onChange={handleSelectPortion}
        />
        
      </div>
  
      {/* <DishImagePreview dishId={selectedDishId} defaultImage={defaultImage} />
      <div className="mt-4">
        <h2 className="font-semibold text-lg">Cart</h2>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} - Portion: {item.portion}
            </li>
          ))}
        </ul>
      </div> */}
      {/* <ToastContainer/> */}
    </div>
  );
  
};

const DishImagePreview = ({ dishId, defaultImage }) => {
  const [selectedDish, setSelectedDish] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDish = async () => {
      try {
        if (dishId) {
          const response = await axios.get(
            `http://127.0.0.1:8000/api/customization/dishes/${dishId}/`
          );
          setSelectedDish(response.data);
        } else {
          setSelectedDish(null); // Set selectedDish to null if dishId is null
        }
        setError(null); // Clear any previous errors
      } catch (error) {
        console.error("Error fetching dish:", error);
        setError("Error fetching dish image");
      }
    };

    fetchDish();
  }, [dishId]);

  return (
    <div className="flex justify-center mt-4">
      {error ? (
        <img
          src={defaultImage}
          alt="Default Dish"
          className="w-48 h-48 object-cover rounded-lg"
        />
      ) : (
        <img
          src={selectedDish ? selectedDish.image : defaultImage}
          alt={selectedDish ? selectedDish.name : "Default Dish"}
          className="w-48 h-48 object-cover rounded-lg"
        />
      )}
    </div>
  );
};

export default DishSelection;
