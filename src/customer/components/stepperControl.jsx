import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StepperControl = ({ handleClick, currentStep, steps, isDataValid }) => {
  const handleNextClick = (e) => {
    e.preventDefault(); // Prevent the default button behavior
    console.log(isDataValid);
    if (isDataValid) {
      handleClick("next");
    } else {
      toast.error("Please fill in all required fields."); // Display error toast
    }
  };

  return (
    <>
      <div className="container flex justify-around mb-8">
        {/* Back Button */}

        <button
          onClick={() => handleClick("back")}
          className={`text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 ${
            currentStep === 1 ? "opacity-0 cursor-not" : ""
          }`}
        >
          Back
        </button>
        {/* Next button (conditional rendering) */}
        {currentStep !== 2 && currentStep !== 4 && (
          <button
            onClick={handleNextClick}
            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            Next
          </button>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default StepperControl;
