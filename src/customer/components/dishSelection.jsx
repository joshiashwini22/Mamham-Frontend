import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DishSelection = ({category}) => {
  const [dishes, setDishes] = useState([]);
  const portion = ["1", "2"];
  const defaultImage = '../../assets/images/Login.png';

  useEffect(() => {
    // Fetch dishes data from the backend 
    const fetchDishes = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/customization/dishes/category/${category}/`);
            setDishes(response.data);
            console.log(response.data);
            
          } catch (error) {
            console.error('Error fetching data:', error);
          }
    };

    fetchDishes();
  }, [category]);

  const handleSelectDish = (category, dishId) => {
    setDishes(prevState => ({
      ...prevState,
      [category]: dishId
    }));
  };

  return (
    <div>
      
    <div className="flex items-center space-x-4 mx-6">
      <label htmlFor={category} className="mb-3 font-semibold w-28">{category}</label>
      <select id={category} className="mb-3 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
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
    </div>
  );
};

export default DishSelection;
