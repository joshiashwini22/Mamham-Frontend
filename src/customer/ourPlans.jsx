import React, { useState } from 'react'
import Navbar from './navbar'
import { StepperContext } from '../context/StepperContext'
import Stepper from './components/stepper'
import StepperControl from './components/stepperControl'
import SelectPlan from './components/Steps/SelectPlan'
import RegisteForSubs from './components/Steps/RegisterForSubs'
import Delivery from './components/Steps/Delivery'
import Payment from './components/Steps/Payment'

const OurPlans = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState('');
  const [finalData, setFinalData] = useState([]);
  const [isSelectPlanValid, setIsSelectPlanValid] = useState(false); // State to track validation status

  // Handler to receive validation status change from SelectPlan component
  const handleSelectPlanDataValidChange = (isValid) => {
    setIsSelectPlanValid(isValid);
  };

  const steps = [
    "Select Plan",
    "Register",
    "Delivery",
    "Payment"
  ];
  const displaySteps = (step) => {
    switch(step) {
      case 1:
        return <SelectPlan onDataValidChange={handleSelectPlanDataValidChange}/>
      case 2:
        return <RegisteForSubs/>
      case 3:
        return <Delivery/>  
      case 4:
        return <Payment/>
    }
  }

  const handleClick = (direction) => {
    let newStep = currentStep;
    
    direction === "next" ? newStep++ : newStep--;
    //Checkin if steps are withing bounds
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  }
  return (
    <>
    <div  className="bg-gray-200">
      <Navbar/> 
      OurPlans
      <div className="md:w-3/4 mx-auto shadow-xl rounded-2xl pb-2 bg-white h-screen">
        {/* Stepper */}
        <Stepper
        steps={steps}
        currentStep={currentStep}
        />
        {/* Display Components */}
        <div className="my-5 px-10">
          <StepperContext.Provider value={{
            userData,
            setUserData,
            finalData,
            setFinalData
          }}>
            {displaySteps(currentStep)}
          </StepperContext.Provider>
        </div>
        {/* navigation controls */}
        {currentStep !== steps.length && 
        <StepperControl handleClick={handleClick} currentStep={currentStep} steps={steps} isDataValid={isSelectPlanValid}/>
      }
      </div>
    </div>
    </>
  )
}

export default OurPlans