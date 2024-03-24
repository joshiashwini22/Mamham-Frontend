import React from 'react'
import Button from '../../common/button'

const StepperControl = ({handleClick, currentStep, steps}) => {
    const handleBackButton = () => {
        // Back
      };
    const handleNextButton = () => {
        // Next
      };
    
  return (
    <div className="container flex justify-around mt-4 mb-8">
        {/* Back Buttoon */}
        <button onClick={() => handleClick()} className={`text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 ${currentStep ===1 ? "opacity-50 cursor-not" : ""}`}>Back</button>
        {/* Next button */}
        <button onClick={() => handleClick("next")} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 }">{currentStep === steps.length - 1 ? "Confirm" : "Next"}</button>

    </div>
  )
}

export default StepperControl