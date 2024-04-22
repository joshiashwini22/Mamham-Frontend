import React, { useState, useEffect } from "react";
import Navbar from "../customer/navbar";
import useFetch from "../common/useFetch";

const OurMenu = () => {
  const today = new Date();
  const currentDay = today.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
  const sundayDate = new Date(today); // Create a new Date object based on today's date
  sundayDate.setDate(today.getDate() - currentDay); // Subtract the number of days from today to get to Sunday

  // Now, sundayDate contains the date of the Sunday of the current week
  // Format the date to YYYY-MM-DD format
  const sundayDateString = sundayDate.toISOString().split("T")[0];

  // Set the state with the Sunday date
  const [filters, setFilters] = useState({
    selectedStartDate: sundayDateString,
    selectedPlan: "1",
  });
  console.log(filters);

  const {
    data: plans,
    planLoading,
    planError,
  } = useFetch(`http://127.0.0.1:8000/api/subscription/plans/`);

  const [selectedPlan, setSelectedPlan] = useState("Regular");
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [menuItems, setMenuItems] = useState([]);
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
      Date.UTC(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate()
      )
    )
      .toISOString()
      .split("T")[0];
    setFilters({ ...filters, selectedStartDate });
  };

  return (
    <>
      <div className="h-screen">
        <Navbar />
        <div className="bg-white-200 ">
          <div className="bg-white lg:mx-[180px] mt-22 mb-8 shadow-xl rounded-2xl p-4">
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
                          ? "bg-red-500 text-white border"
                          : "bg-white text-red-700"
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {loading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p>Error: {error.message}</p>
                ) : (
                  menuItems.map((menuItem) =>
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
                          <h4 className="text-lg font-semibold">{meal.name}</h4>
                          <p className="text-gray-700">{meal.description}</p>
                        </div>
                      </div>
                    ))
                  )
                )}
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurMenu;
