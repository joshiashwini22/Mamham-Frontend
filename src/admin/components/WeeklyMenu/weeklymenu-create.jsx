import React, { useState } from "react";
import Sidebar from "../../sidebar";
import axios from "axios";
import useFetch from "../../../common/useFetch";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";

const WeeklymenuCreate = ({ onMenuCreated }) => {
  // State for plans, selected start date, selected plan, and menu items
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedPlan, setSelectedPlan] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [endDate, setEndDate] = useState(""); // State for end date
  const navigate = useNavigate();

  // Fetch plans and meals
  const {
    data: plans,
    loading: planLoading,
    error: planError,
  } = useFetch("http://127.0.0.1:8000/api/subscription/plans");

  const {
    data: meals,
    loading: mealLoading,
    error: mealError,
  } = useFetch("http://127.0.0.1:8000/api/subscription/meals");

  // Function to handle menu creation
  const handleCreateMenu = async () => {
    try {
      // Send the selected meals to the backend to create the menu
      const response = await axios.post(
        "http://127.0.0.1:8000/api/subscription/weekly-menu/",
        {
          week_start_date: selectedStartDate,
          week_end_date: endDate, // Send the calculated end date
          meals: selectedMeals,
          plan: selectedPlan,
        }
      );

      // Show success message
      toast.success("Menu created successfully!");

      // Reset fields to initial state
      setSelectedStartDate(new Date()); // Set to nearest Sunday
      setSelectedPlan("");
      setSelectedMeals([]);
      setEndDate("");

      // Call the callback function if provided
      if (onMenuCreated) {
        onMenuCreated(response.data);
      }


    } catch (error) {
      console.error("Error creating menu:", error);

      let errorMessage = "Error creating menu.";
  
      // Check if there is an error response from the server
      if (error.response) {
        // Check for specific error messages in the server response
        const data = error.response.data;
        if (data.detail) {
          errorMessage = data.detail; // Custom error message from the server
        } 
      }
  
      // Show detailed error message
      toast.error(errorMessage);
    }
  };

  // Function to handle meal selection
  const handleMealSelection = (mealId) => {
    // Toggle the selection state of the meal
    setSelectedMeals((prevSelectedMeals) => {
      if (prevSelectedMeals.includes(mealId)) {
        return prevSelectedMeals.filter((id) => id !== mealId);
      } else {
        return [...prevSelectedMeals, mealId];
      }
    });
  };

  // Function to calculate end date
  const calculateEndDate = (startDate) => {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6); // Add 6 days to start date
    setEndDate(endDate.toISOString().split("T")[0]); // Set end date
  };

  // Handle change in start date
  const handleStartDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const dayOfWeek = selectedDate.getDay(); // Get the day of the week (0 for Sunday, 1 for Monday, etc.)
    const diff = selectedDate.getDate() - dayOfWeek; // Calculate the difference between the selected date and the nearest Sunday
    const sundayOfSameWeek = new Date(selectedDate.setDate(diff)); // Get the Sunday of the same week as the selected date
    setSelectedStartDate(sundayOfSameWeek.toISOString().split("T")[0]); // Update the state with the Sunday of the same week
    calculateEndDate(sundayOfSameWeek); // Calculate the end date based on the Sunday of the same week
  };


  const handleCancel = () => {
    navigate(-1);
  };
  
  return (
    <>
      <Sidebar />
      <section className="bg-white">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-red-700">
            Create a New Menu
          </h2>
          <form>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="w-full">
                <label
                  htmlFor="selectedStartDate"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  name="selectedStartDate"
                  id="selectedStartDate"
                  value={selectedStartDate}
                  onChange={handleStartDateChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Name"
                  required
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="plans"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Plan
                </label>
                <select
                  id="plans"
                  name="plans"
                  value={selectedPlan}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:border-primary-600 block w-full p-2.5"
                >
                  <option value="">Select plan</option>
                  {plans.map((plan) => (
                    <option key={plan.id} value={plan.id}>
                      {plan.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="my-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Select Meals
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mealLoading ? (
                  <p>Loading meals...</p>
                ) : mealError ? (
                  <p>Error fetching meals. Please try again.</p>
                ) : (
                  meals.map((meal) => (
                    <div key={meal.id}>
                      <input
                        type="checkbox"
                        id={`meal-${meal.id}`}
                        checked={selectedMeals.includes(meal.id)}
                        onChange={() => handleMealSelection(meal.id)}
                        className="mr-2"
                      />
                      <label htmlFor={`meal-${meal.id}`}>{meal.name}</label>
                    </div>
                  ))
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={handleCreateMenu}
              className="inline-flex items-center mr-4 px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center border border-gray-300 text-blue bg-red-700 rounded-lg focus:ring-2 focus:ring-primary-600 hover:bg-primary-800 text-white"
            >
              Add
            </button>
            <button
                type="button"
                onClick={handleCancel}
                className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center border border-gray-300 text-blue bg-gray-300 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-gray-400"
              >
                Back
              </button>
          </form>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default WeeklymenuCreate;
