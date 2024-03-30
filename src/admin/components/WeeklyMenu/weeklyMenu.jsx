import React, { useState, useEffect } from "react";
import Sidebar from "../../sidebar";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../common/useFetch";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WeeklyMenu = () => {
  const navigate = useNavigate();

  const {
    data: plans,
    loading: planLoading,
    error: planError,
  } = useFetch(`http://127.0.0.1:8000/api/subscription/plans/`);

  const [selectedPlan, setSelectedPlan] = useState("1");
  const [menuItems, setMenuItems] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [filters, setFilters] = useState({
    selectedStartDate: selectedStartDate,
    selectedPlan: "1",
  });

  const {
    data: weeklyMenu,
    loading,
    error,
  } = useFetch(
    `http://127.0.0.1:8000/api/subscription/weekly-menu/?week_start_date=${filters.selectedStartDate}&plan_id=${filters.selectedPlan}`
  );

  useEffect(() => {
    if (!loading && !error) {
      setMenuItems(weeklyMenu);
    }
  }, [weeklyMenu, loading, error]);

  const handlePlanChange = (e) => {
    const selectedPlanValue = e.target.value;
    setSelectedPlan(selectedPlanValue);
    setFilters({ ...filters, selectedPlan: selectedPlanValue });
  };

  const handleStartDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const dayOfWeek = selectedDate.getDay(); // Get the day of the week (0 for Sunday, 1 for Monday, etc.)
    const diff = selectedDate.getDate() - dayOfWeek; // Calculate the difference between the selected date and the nearest Sunday
    const sundayOfSameWeek = new Date(selectedDate.setDate(diff)); // Get the Sunday of the same week as the selected date
    const formattedSundayOfSameWeek = sundayOfSameWeek.toISOString().split("T")[0]; // Format the Sunday as ISO string
    setSelectedStartDate(formattedSundayOfSameWeek); // Update the state with the Sunday of the same week
    setFilters({ ...filters, selectedStartDate: formattedSundayOfSameWeek }); // Update the filters with the Sunday of the same week
  };
  

  // Define a function to get the plan name from the plan ID
  const getPlanName = (planId) => {
    const selectedPlan = plans.find((plan) => plan.id === planId);
    return selectedPlan ? selectedPlan.name : "";
  };

  return (
    <>
      <Sidebar />
      <div className="bg-white sm:ml-64">
        <section className="bg-white min-h-screen py-12 lg:mx-[10px]">
          <div className="relative overflow-x-auto container">
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-4xl font-bold text-center mb-8">
                Weekly Menu
              </h2>
              <a
                href="/weeklymenu-create"
                className="flex items-center p-2 text-red-700 rounded-lg dark:text-white"
              >
                <button
                  id="dropdownRadioButton"
                  data-dropdown-toggle="dropdownRadio"
                  className="p-4 rounded inline-flex items-center bg-[#93040B] text-white border border-gray-300"
                  type="button"
                >
                  + Add
                </button>
              </a>
            </div>
            <div className="flex justify-center mb-6">
              <div className="mx-4 flex">
                <input
                  type="date"
                  value={selectedStartDate}
                  onChange={handleStartDateChange}
                  className="bg-white border border-gray-300 rounded-md px-4 py-2"
                />
              </div>
            </div>
            <div className="flex justify-center mb-6">
              <select
                value={selectedPlan}
                onChange={handlePlanChange}
                className="mr-4 bg-white border border-gray-300 rounded-md px-4 py-2"
              >
                {planLoading ? (
                  <option>Loading...</option>
                ) : planError ? (
                  <option>Error: {planError.message}</option>
                ) : (
                  plans.map((plan) => (
                    <option key={plan.id} value={plan.id}>
                      {plan.name}
                    </option>
                  ))
                )}
              </select>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Start Date
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      End Date
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Plan Name
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Selected Meals
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="4" className="text-center py-4">
                        Loading...
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan="4" className="text-center py-4">
                        Error: {error.message}
                      </td>
                    </tr>
                  ) : (
                    menuItems.map((menuItem, index) => (
                      <tr key={index} className="border-t border-gray-200">
                        <td className="px-6 py-4 whitespace-no-wrap">
                          {menuItem.week_start_date}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap">
                          {menuItem.week_end_date}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap">
                          {getPlanName(menuItem.plan)}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap">
                          {menuItem.meals.map((meal, mealIndex) => (
                            <div key={mealIndex}>
                              {meal.name} - {meal.description}
                            </div>
                          ))}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default WeeklyMenu;
