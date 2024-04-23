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

  const [selectedPlan, setSelectedPlan] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [filtersVisible, setFiltersVisible] = useState(false);

  const {
    data: weeklyMenu,
    loading,
    error,
    refetch: refetchWeeklyMenu,
  } = useFetch(
    `http://127.0.0.1:8000/api/subscription/weekly-menu/?week_start_date=${selectedStartDate}&plan_id=${selectedPlan}`
  );

  useEffect(() => {
    if (!loading && !error) {
      setMenuItems(weeklyMenu);
      if (weeklyMenu.length === 0) {
        toast.warn("No data found for the selected filters.");
      }
    }
  }, [weeklyMenu, loading, error]);

  useEffect(() => {
    refetchWeeklyMenu();
  }, [selectedStartDate, selectedPlan]);

  const handlePlanChange = (e) => {
    const selectedPlanValue = e.target.value;
    setSelectedPlan(selectedPlanValue);
  };

  const handleStartDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const dayOfWeek = selectedDate.getDay(); // Get the day of the week (0 for Sunday, 1 for Monday, etc.)
    const diff = selectedDate.getDate() - dayOfWeek; // Calculate the difference between the selected date and the nearest Sunday
    const sundayOfSameWeek = new Date(selectedDate.setDate(diff)); // Get the Sunday of the same week as the selected date
    setSelectedStartDate(sundayOfSameWeek.toISOString().split("T")[0]); // Update the state with the Sunday of the same week
  };

  const applyFilters = () => {
    setFiltersVisible(true);
  };

  const clearFilters = () => {
    setSelectedPlan("");
    setSelectedStartDate("");
    setFiltersVisible(false);
  };

  const getPlanName = (planId) => {
    const selectedPlan = plans.find((plan) => plan.id === planId);
    return selectedPlan ? selectedPlan.name : "";
  };

  const handleEdit = (menuId) => {
    navigate(`/weeklymenu-update/${menuId}`); // Navigate to the edit page
  };

  return (
    <>
      <Sidebar />
      <div className="bg-white sm:ml-64">
        <section className="bg-white min-h-screen py-12 lg:mx-[10px]">
          <div className="max-w-screen-xl mx-auto px-4 md:px-8">
            <div className="items-start justify-between md:flex">
              <div className="max-w-lg">
                <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                  Weekly Menu
                </h3>
                <p className="text-gray-600 mt-2">
                  Following are the weekly menus.
                </p>
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
                  <option value="">All Plans</option>
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
                              <button
                              onClick={() => clearFilters()}
                              className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2"
                            >
                              Reset Filter
                            </button>
              <div className="mt-3 md:mt-0">
                <a
                  href="/weeklymenu-create"
                  className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
                >
                  <button
                    id="dropdownRadioButton"
                    data-dropdown-toggle="dropdownRadio"
                    className=""
                    type="button"
                  >
                  Add Weekly Menu
                  </button>
                </a>
              </div>
            </div>
            <div className="mt-12 relative h-max overflow-auto">
              <table className="w-full table-auto text-sm text-left">
                <thead className="text-gray-600 font-medium border-b">
                  <tr>
                    <th className="py-3 pr-6">Start Date</th>
                    <th className="py-3 pr-6">End Date</th>
                    <th className="py-3 pr-6">Plan Name</th>
                    <th className="py-3 pr-6">Selected Meals</th>
                    <th className="py-3 pr-6">Action</th>

                  </tr>
                </thead>
                <tbody className="text-gray-600 divide-y">
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
                        <td className="pr-6 py-4 whitespace-nowrap">
                              <button
                              onClick={() => handleEdit(menuItem.id)}
                              className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2"
                            >
                              Edit
                            </button></td>
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
