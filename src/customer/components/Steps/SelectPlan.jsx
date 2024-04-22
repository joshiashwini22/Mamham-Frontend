import React, { useContext, useEffect, useState } from "react";
import { StepperContext } from "../../../context/StepperContext";
import useFetch from "../../../common/useFetch";

const SelectPlan = ({ onDataValidChange }) => {
  // Fetch plans data
  const {
    data: plans,
    loading: plansLoading,
    error: plansError,
  } = useFetch("http://127.0.0.1:8000/api/subscription/plans");

  // Fetch addons data
  const {
    data: addons,
    loading: addonsLoading,
    error: addonsError,
  } = useFetch("http://127.0.0.1:8000/api/subscription/addons");

  const { userData, setUserData } = useContext(StepperContext);
  // Initialize selected addons if not already initialized
  useEffect(() => {
    if (!userData.selectedPlan) {
      setUserData({ ...userData, selectedPlan: 1 });
    }
    if (!userData.selectedAddons) {
      setUserData({ ...userData, selectedAddons: [] });
    }
    if (!userData.numberOfDays) {
      setUserData({
        ...userData,
        numberOfDays: 7,
      });
    }
    if (!userData.selectedOption) {
      setUserData({ ...userData, selectedOption: "NonVeg" });
    }
  }, [setUserData, userData]);

  // useEffect to save userData to localStorage
  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  // useEffect to initialize state with localStorage data
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, [setUserData]);

  const [minDate, setMinDate] = useState("");
  const [selectedDays, setSelectedDays] = useState(7);

  const timeOptions = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
  ];
  

  const handleSelectPlan = (planId) => {
    const selectedPlan = plans.find((plan) => plan.id === planId);
    console.log(selectedPlan);
    setUserData({ ...userData, selectedPlan: planId });
  };

  const handleSelectAddon = (addonId) => {
    const isSelected = userData.selectedAddons.indexOf(addonId) > -1;
    let updatedAddons = [];

    if (isSelected) {
      updatedAddons = userData.selectedAddons.filter((id) => id !== addonId);
    } else {
      updatedAddons = [...userData.selectedAddons, addonId];
    }
    setUserData({ ...userData, selectedAddons: updatedAddons });
  };

  // Function to handle changes in the other section inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update userData with the input values
    setUserData({ ...userData, [name]: value });
  };
  const handleSelectDays = (numberOfDays) => {
    setSelectedDays(numberOfDays);
    setUserData({ ...userData, numberOfDays });
  };

  useEffect(() => {
    // Calculate the minimum date value 7 days after today's date
    const today = new Date();
    today.setDate(today.getDate() + 7);
    const minDateValue = today.toISOString().substr(0, 10);
    setMinDate(minDateValue);
  }, []);

  // Inside the component
  const [mealPricing, setMealPricing] = useState(0);
  const [addonPricing, setAddonPricing] = useState(0);
  // useEffect to update mealPricing and addonPricing when selections are made
  useEffect(() => {
    // Example logic to calculate meal pricing based on selected plan
    if (userData.selectedPlan) {
      const selectedPlan = plans.find(
        (plan) => plan.id === userData.selectedPlan
      );
      if (selectedPlan) {
        setMealPricing(parseFloat(selectedPlan.price)); // Set meal pricing based on the selected plan
      }
    } else {
      setMealPricing(0); // Reset meal pricing if no plan is selected
    }
  }, [userData.selectedPlan, plans]);

  // Calculate total price of selected addons
  useEffect(() => {
    if (addons && addons.length > 0) {
      const selectedAddonPrices = addons
        .filter((addon) => (userData.selectedAddons || []).includes(addon.id))
        .map((addon) => parseFloat(addon.price));

      // Initialize totalAddonPrice
      let totalAddonPrice = 0;

      // Iterate over each item in the array and sum them up
      for (let i = 0; i < selectedAddonPrices.length; i++) {
        totalAddonPrice += selectedAddonPrices[i];
      }
      setAddonPricing(totalAddonPrice);
    }
  }, [userData.selectedAddons, addons]);

  const calculatePlanTotal = (planPrice) => {
    let totalPrice = parseFloat(mealPricing) + parseFloat(addonPricing);
    console.log(totalPrice);

    if (!isNaN(totalPrice) && !isNaN(userData.numberOfDays)) {
      if (userData.numberOfDays === 7) {
        totalPrice *= 1;
      } else if (userData.numberOfDays === 15) {
        totalPrice *= 2;
      } else if (userData.numberOfDays === 30) {
        totalPrice *= 3;
      }
      return totalPrice;
    } else {
      return 0; // Set to 0 if any value is NaN
    }
  };
  useEffect(() => {
    const planTotal = calculatePlanTotal();
    setUserData({ ...userData, planTotal });
  }, [mealPricing, addonPricing, userData.numberOfDays]);

  const isDataValid = () => {
    return (
      userData.selectedPlan &&
      // userData.selectedOption &&
      userData.startDate &&
      userData.startTime &&
      userData.numberOfDays &&
      userData.numberOfDays !== ""
    );
  };
  console.log(isDataValid());
  // Notify the parent component of the validation status change
  useEffect(() => {
    onDataValidChange(isDataValid());
  }, [userData, onDataValidChange, isDataValid]);
  console.log(typeof isDataValid()); // Should log "function"
  console.log(typeof isDataValid); // Should log "function"

  return (
    <>
      <div className="m-2 p-2 border ">
        <div className="grid grid-cols-2 ">
          {/* Plans Section */}
          <div className="p-4">
            <div className="flex flex-col">
              <span className="text-red-700 text-xl text-center font-bold mb-4">
                1. Select your Plan
            </span>
            <div className="flex flex-wrap">
              {plans &&
                plans.map((plan) => (
                  <button
                    key={plan.id}
                    role="radio"
                    aria-checked={userData.selectedPlan === plan.id}
                    className="flex flex-col items-center p-4 border rounded-lg bg-white relative m-5"
                    onClick={() => handleSelectPlan(plan.id)}
                  >
                    <input
                      type="radio"
                      name="selectedPlan"
                      value={plan.id}
                      checked={userData.selectedPlan === plan.id}
                      onChange={() => handleSelectPlan(plan.id)}
                      className="absolute top-2 left-2 appearance-none checked:bg-green-500 h-6 w-6 rounded-full border border-gray-300 focus:outline-none"
                    />
                    {userData.selectedPlan === plan.id && (
                      <span className="absolute top-2 left-2 ml-2 mt-1">
                        &#10003;
                      </span>
                    )}
                    <img src={plan.image} alt={plan.name} className="" />
                    <h2 className="text-l">{plan.name}</h2>
                  </button>
                ))}
            </div>
            </div>
          </div>
          {/* Other Section */}
          <div className="p-4">
            <div className="flex flex-col">
              <span className="text-red-700 text-xl text-center font-bold mb-10">
                2. Choose your preferences
              </span>

              <div className="flex mb-2">
                <span className="text-m mr-5">Number of days:</span>
                <div className="flex items-center">
                  <button
                    style={{
                      backgroundColor:
                        selectedDays === 7 ? "#93040B" : "#ffffff",
                      color: selectedDays === 7 ? "#ffffff" : "#93040B",
                    }}
                    className="text-red-700 font-semibold p-5 border border-red-700 hover:bg-red-700 hover:text-white"
                    onClick={() => handleSelectDays(7)}
                  >
                    7
                  </button>

                  <button
                    style={{
                      backgroundColor:
                        selectedDays === 15 ? "#93040B" : "#ffffff",
                      color: selectedDays === 15 ? "#ffffff" : "#93040B",
                    }}
                    className="text-red-700 font-semibold p-5 border border-red-700 hover:bg-red-700 hover:text-white"
                    onClick={() => handleSelectDays(15)}
                  >
                    15
                  </button>

                  <button
                    style={{
                      backgroundColor:
                        selectedDays === 30 ? "#93040B" : "#ffffff",
                      color: selectedDays === 30 ? "#ffffff" : "#93040B",
                    }}
                    className="text-red-700 font-semibold p-5 border border-red-700 hover:bg-red-700 hover:text-white"
                    onClick={() => handleSelectDays(30)}
                  >
                    30
                  </button>
                </div>
              </div>
            </div>
            <span className="text-m mr-5 mb-3">Add Ons:</span>
            <div className="flex flex-col">
              <div className="flex flex-wrap justify-between">
                {addons &&
                  addons.map((addon) => (
                    <div key={addon.id} className="m-4">
                      <label className="flex flex-col items-center p-4 border rounded-lg bg-white relative">
                        <input
                          type="checkbox"
                          name="selectedAddons"
                          value={addon.id}
                          checked={(userData.selectedAddons || []).includes(
                            addon.id
                          )}
                          onChange={() => handleSelectAddon(addon.id)}
                          className="absolute top-2 left-2 appearance-none checked:bg-green-500 h-6 w-6 rounded-full border border-gray-300 focus:outline-none"
                        />
                        <h2 className="text-l ml-5">{addon.name}</h2>
                      </label>
                    </div>
                  ))}
              </div>
            </div>
            <div className="flex items-center mb-3">
              <span className="text-m mr-5 mb-3">Start Date:</span>
              <input
                type="date"
                name="startDate"
                value={userData.startDate || ""}
                onChange={handleInputChange}
                min={minDate} // Set minimum date value
                className="w-full mb-2 p-2 border rounded"
              />
            </div>
            <div className="flex items-center mb-3">
              <span className="text-m mr-5 mb-3">Start Time:</span>
              <select
                name="startTime"
                value={userData.startTime || ""}
                onChange={handleInputChange}
                className="w-full mb-2 p-2 border rounded"
              >
                <option value="">Select Time</option>
                {timeOptions.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center mb-3">
              <span className="text-m mr-5 mb-3">Remarks:</span>
              <input
                type="text"
                name="remarks"
                placeholder="Please mention if there are any allergies."
                value={userData.remarks || ""}
                onChange={handleInputChange}
                className="w-full mb-2 p-2 border rounded"
              />
            </div>
            <div className="flex flex-row m-3 p-3 border">
              <div className="flex flex-col">
                <span className="text-l mx-5">Meal Pricing:</span>
                <span className="text-l mx-5">Addon Pricing:</span>
                <span className="text-l mx-5">
                  Plan Total for {selectedDays} Days Plan:
                </span>
              </div>
              <div className="flex flex-col">
                <span>Rs. {mealPricing}</span>
                <span>Rs. {addonPricing}</span>
                <span>Rs. {calculatePlanTotal()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectPlan;
