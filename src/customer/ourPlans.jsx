import React, { useState } from 'react'
import Navbar from './navbar'
import Stepper from './components/stepper'
import StepperControl from './components/stepperControl'
import SelectPlan from './components/Steps/SelectPlan'
import RegisteForSubs from './components/Steps/RegisterForSubs'
import Delivery from './components/Steps/Delivery'
import Payment from './components/Steps/Payment'

const OurPlans = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const steps = [
    "Select Plan",
    "Register",
    "Delivery",
    "Payment"
  ];
  const displaySteps = (step) => {
    switch(step) {
      case 1:
        return <SelectPlan/>
      case 2:
        return <RegisteForSubs/>
      case 3:
        return <Delivery/>  
      case 4:
        return <RegisteForSubs/>
    }
  }

  const handleClick = (direction) => {
    let newStep = currentStep;
    
    direction === "next" ? newStep++ : newStep--;
    //Checkin if steps are withing bounds
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
    console.log(currentStep)
  }
  return (
    <>
    <div  className="bg-gray-200 h-screen">
      <Navbar/> 
      OurPlans
      <div className="md:w-1/2 mx-auto shadow-xl rounded-2xl pb-2 bg-white">
        {/* Stepper */}
        <Stepper
        steps={steps}
        CurrentStep={currentStep}
        />
        {/* navigation controls */}
        <StepperControl handleClick={handleClick} currentStep={currentStep} steps={steps}/>
      </div>
    </div>
    </>
  )
}

export default OurPlans