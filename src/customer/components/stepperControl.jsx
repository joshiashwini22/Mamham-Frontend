import React from 'react';

const StepperControl = ({ handleClick, currentStep, steps, isDataValid }) => {
    return (
        <div className="container flex justify-around mb-8">
            {/* Back Button */}
            <button onClick={() => handleClick()} className={`text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 ${currentStep === 1 ? "opacity-50 cursor-not" : ""}`}>Back</button>
            {/* Next button */}
            <button onClick={() => handleClick("next")} disabled={!isDataValid} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">{currentStep === steps.length - 1 ? "Confirm" : "Next"}</button>
        </div>
    );
};

export default StepperControl;
