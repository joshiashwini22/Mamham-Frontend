import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoginImg from "../../assets/images/Login.png";

const DishSelection = ({ category }) => {
  const [dishes, setDishes] = useState([]);
  const [selectedDishId, setSelectedDishId] = useState(null); // Track the selected dish ID
  const portion = ["1", "2"];

  useEffect(() => {
    // Fetch dishes data from the backend 
    const fetchDishes = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/customization/dishes/category/${category}/`);
        setDishes(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDishes();
  }, [category]);

  const handleSelectDish = (dishId) => {
    setSelectedDishId(dishId); // Set the selected dish ID
  };

  return (
    <div>
      <div className="flex items-center space-x-4 mx-6">
        <label htmlFor={category} className="mb-3 font-semibold w-28">{category}</label>
        <select id={category} className="mb-3 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" onChange={(e) => handleSelectDish(e.target.value)}>
          <option>Select a dish</option>
          {dishes.map(dish => (
            <option key={dish.id} value={dish.id}>{dish.name}</option>
          ))}
        </select>
        <select className="mb-3 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
          <option>Portion</option>
          {portion.map((portion) => (
            <option key={portion} category={portion}>{portion}</option>
          ))}
        </select>
      </div>
      <DishImagePreview dishId={selectedDishId} defaultImage={LoginImg} />
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
          const response = await axios.get(`http://127.0.0.1:8000/api/customization/dishes/${dishId}/`);
          setSelectedDish(response.data);
        } else {
          setSelectedDish(null); // Set selectedDish to null if dishId is null
        }
        setError(null); // Clear any previous errors
      } catch (error) {
        console.error('Error fetching dish:', error);
        setError('Error fetching dish image');
      }
    };

    fetchDish();
  }, [dishId]);

  return (
    <div className="flex justify-center mt-4">
      {error ? (
        <img src={defaultImage} alt="Default Dish" className="w-48 h-48 object-cover rounded-lg" />
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
