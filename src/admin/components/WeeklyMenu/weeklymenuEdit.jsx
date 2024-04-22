import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WeeklyMenuEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [menuData, setMenuData] = useState(null);
  const [plans, setPlans] = useState([]);
  const [allMeals, setAllMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the menu data
        const menuResponse = await axios.get(`http://127.0.0.1:8000/api/subscription/weekly-menu/${id}/`);
        const mealIds = menuResponse.data.meals.map((meal) => meal.id);

        // Fetch the plans and meals data
        const plansResponse = await axios.get(`http://127.0.0.1:8000/api/subscription/plans/`);
        const mealsResponse = await axios.get(`http://127.0.0.1:8000/api/subscription/meals/`);

        setMenuData({ ...menuResponse.data, meals: mealIds });
        setPlans(plansResponse.data);
        setAllMeals(mealsResponse.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const payload = {
        week_start_date: menuData.week_start_date,
        week_end_date: menuData.week_end_date,
        plan: menuData.plan,
        meals: menuData.meals, // Update with meal IDs
      };

      await axios.put(
        `http://127.0.0.1:8000/api/subscription/weekly-menu/${id}/`,
        payload
      );
      toast.success("Menu updated successfully!");
      navigate("/weeklymenu");
    } catch (error) {
      toast.error("Error updating menu");
      setError(error.message);
    }
  };

  const handleMealSelection = (mealId) => {
    const isSelected = menuData.meals.includes(mealId);

    const updatedMealIds = isSelected
      ? menuData.meals.filter((id) => id !== mealId)  // Deselect meal
      : [...menuData.meals, mealId];  // Select meal

    setMenuData({ ...menuData, meals: updatedMealIds });
  };

  if (loading) {
    return <div className="text-center py-6">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-6">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Edit Weekly Menu
      </h2>
      <div className="mb-4">
        <label className="block text-gray-700">Start Date:</label>
        <input
          type="date"
          value={menuData.week_start_date}
          read-only
          className="w-full border border-gray-300 rounded px-4 py-2 bg-gray-100"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">End Date:</label>
        <input
          type="date"
          value={menuData.week_end_date}
          read-only
          className="w-full border border-gray-300 rounded px-4 py-2 bg-gray-100"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Plan:</label>
        <select
          value={menuData.plan}
          onChange={(e) => setMenuData({ ...menuData, plan: e.target.value })}
          className="w-full border border-gray-300 rounded px-4 py-2"
        >
          {plans.map((plan) => (
            <option key={plan.id} value={plan.id}>
              {plan.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Meals:</label>
        {allMeals.map((meal) => (
          <div key={meal.id} className="flex items-center">
            <input
              type="checkbox"
              checked={menuData.meals.includes(meal.id)}
              onChange={() => handleMealSelection(meal.id)}
              className="mr-2"
            />
            <img
              src={meal.image}
              alt={meal.name}
              className="w-10 h-10 rounded mr-4"
            />
            <span>{meal.name}</span>
          </div>
        ))}
      </div>
      <button
        onClick={handleUpdate}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Update
      </button>
    </div>
  );
};

export default WeeklyMenuEdit;
