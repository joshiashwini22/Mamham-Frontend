import React, { useState, useEffect } from 'react'
import Navbar from './navbar'
import { StepperContext } from '../context/StepperContext'
import Stepper from './components/stepper'
import StepperControl from './components/stepperControl'
import SelectPlan from './components/Steps/SelectPlan'
import RegisteForSubs from './components/Steps/RegisterForSubs'
import DeliverySubscription from './components/Steps/DeliverySubscription'
import Payment from './components/Steps/Payment'

const OurPlans = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [reloadOnce, setReloadOnce] = useState(false);

  useEffect(() => {
    const registrationCompleted = localStorage.getItem('registrationCompleted');
    if (registrationCompleted === 'true' && !reloadOnce) {
      localStorage.removeItem('registrationCompleted');
      setReloadOnce(true);
      window.location.reload();
    }
  }, [reloadOnce]);

  const [userData, setUserData] = useState(() => {
    const storedData = localStorage.getItem("userData");
    return storedData ? JSON.parse(storedData) : '';
  });
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
        return <DeliverySubscription/>  
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
      <div className="bg-gray-200">
        <Navbar/>
        <div className="md:w-3/4 mx-auto shadow-xl rounded-2xl pb-2 bg-white h-screen">
          {/* Stepper */}
          <Stepper steps={steps} currentStep={currentStep}/>
          {/* Display Components */}
          <div className="my-5 px-10">
            <StepperContext.Provider value={{ userData, setUserData, finalData, setFinalData }}>
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