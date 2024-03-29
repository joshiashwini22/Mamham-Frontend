import React, { useState, useEffect } from "react";
import Navbar from "../customer/navbar";
import useFetch from "../common/useFetch";

const OurMenu = () => {
  const [filters, setFilters] = useState({
    selectedStartDate: new Date().toISOString().split('T')[0], // Default to current date in YYYY-MM-DD format
    selectedPlan: '3',
  });

  const [selectedPlan, setSelectedPlan] = useState("Regular");
  const [selectedWeek, setSelectedWeek] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const {
    data: weeklyMenu,
    loading,
    error,
  } = useFetch(`http://127.0.0.1:8000/api/subscription/weekly-menu/?week_start_date=${filters.selectedStartDate}&plan_id=${filters.selectedPlan}`);

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

  const weekList = Array.from({ length: 6 }, (_, index) => {
    const today = new Date();
    const startDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - today.getDay() + index * 7
    );
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6);
    return { startDate, endDate };
  });

  const handleWeekChange = (index) => {
    setSelectedWeek(index);
    const startDate = weekList[index].startDate;
    const selectedStartDate = new Date(
      Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())
    ).toISOString().split('T')[0];
    setFilters({ ...filters, selectedStartDate });
  };
  

  return (
    <>
      <Navbar />
      <div className="bg-gray-200 lg:mx-[180px] h-screen mt-18 ">
        <main className="container mx-auto py-8">
          <h2 className="text-4xl font-bold text-center mb-8">
            Explore Our Menu
          </h2>
          <div className="flex justify-center mb-6">
            <div className="mx-4 flex">
              {weekList.map((week, index) => (
                <div
                  key={index}
                  className={`px-4 py-2 mr-4 rounded-md cursor-pointer ${
                    selectedWeek === index
                      ? "bg-red-500 text-white"
                      : "bg-white text-gray-700"
                  } `}
                  onClick={() => handleWeekChange(index)}
                >
                  {`${week.startDate.toLocaleDateString()} - ${week.endDate.toLocaleDateString()}`}
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center mb-6">
            <select
              value={selectedPlan}
              onChange={handlePlanChange}
              className="mr-4 bg-white border border-gray-300 rounded-md px-4 py-2"
            >
              <option value="1">Regular Diet</option>
              <option value="2">Weight Loss</option>
              <option value="3">Keto Meal</option>
              <option value="4">Gain Muscle</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error.message}</p>
            ) : (
              menuItems.map((menuItem) => (
                menuItem.meals.map((meal, mealIndex) => (
                  <div
                    key={mealIndex}
                    className="bg-white rounded-lg shadow-md overflow-hidden m-4"
                  >
                    <div className="p-4 m-4 ">
                      <img
                        src={meal.image}
                        alt={meal.name}
                        className="w-full h-40 object-cover mb-2 rounded-lg"
                      />
                      <h4 className="text-lg font-semibold">
                        {meal.name}
                      </h4>
                      <p className="text-gray-700">{meal.description}</p>
                    </div>
                  </div>
                ))
              ))
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default OurMenu;
