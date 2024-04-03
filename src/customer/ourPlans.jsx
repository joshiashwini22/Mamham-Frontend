import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import { StepperContext } from "../context/StepperContext";
import Stepper from "./components/stepper";
import StepperControl from "./components/stepperControl";
import SelectPlan from "./components/Steps/SelectPlan";
import RegisteForSubs from "./components/Steps/RegisterForSubs";
import DeliverySubscription from "./components/Steps/DeliverySubscription";
import Payment from "./components/Steps/Payment";

const OurPlans = () => {
  const [buttonTask, setButtonTask] = useState("");

  const [reloadOnce, setReloadOnce] = useState(false);
  const [userData, setUserData] = useState(() => {
    const storedData = localStorage.getItem("userData");
    return storedData ? JSON.parse(storedData) : "";
  });
  const [finalData, setFinalData] = useState([]);
  const [isSelectPlanValid, setIsSelectPlanValid] = useState(false);
  const [isValidAddress, setIsValidAddress] = useState(false); // New state for valid address
  const [currentStep, setCurrentStep] = useState(() => {
    const storedStep = localStorage.getItem("currentStep");
    return storedStep ? parseInt(storedStep) : 1;
  });

  useEffect(() => {
    const registrationCompleted = localStorage.getItem("registrationCompleted");
    if (registrationCompleted === "true" && !reloadOnce) {
      localStorage.removeItem("registrationCompleted");
      setReloadOnce(true);
      setCurrentStep(currentStep + 1);
    }
  }, [reloadOnce, currentStep]);

  useEffect(() => {
    localStorage.setItem("currentStep", currentStep.toString());
  }, [currentStep]);

  const handleLoginSuccess = () => {
    localStorage.setItem("registrationCompleted", "true");
    window.location.reload();
    setCurrentStep(currentStep);
  };

  const handleSelectPlanDataValidChange = (isValid) => {
    setIsSelectPlanValid(isValid);
  };

  const handleDeliveryDataValidChange = (isValid) => {
    setIsValidAddress(isValid);
  };

  // Function to handle validity of delivery address
  // const handleDeliveryDataValidChange = (isDataValid) => {
  //   const addressId = localStorage.getItem("subscriptionDeliveryAddress"); // Retrieve addressId from local storage
  //   const isValidAddress = !!addressId; // Check if addressId exists
  //   console.log(isValidAddress);
  //   console.log(isDataValid);
  //   console.log(addressId);
  //   setIsValidAddress(isDataValid); // Set isValidAddress state based on addressId existence
  // };

  const steps = ["Select Plan", "Register", "Delivery", "Payment"];

  const displaySteps = (step) => {
    switch (step) {
      case 1:
        return (
          <SelectPlan onDataValidChange={handleSelectPlanDataValidChange} />
        );
      case 2:
        return (
          <RegisteForSubs
            onLoginSuccess={handleLoginSuccess}
            setCurrentStep={setCurrentStep}
            setDirection={buttonTask}
          />
        );
      case 3:
        return (
          <DeliverySubscription
            onAddressValidChange={handleDeliveryDataValidChange}
          />
        );
      case 4:
        return <Payment />;
    }
  };

  const handleClick = (direction) => {
    let newStep = currentStep;
    direction === "next" ? newStep++ : newStep--;
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
    setButtonTask(direction)
  };

  return (
    <>
      <div className="bg-gray-200 h-screen">
        <Navbar />
        <div className="md:w-3/4 mx-auto shadow-xl rounded-2xl pb-2 bg-white">
          <Stepper steps={steps} currentStep={currentStep} />
          <div className="my-5 px-10">
            <StepperContext.Provider
              value={{ userData, setUserData, finalData, setFinalData }}
            >
              {displaySteps(currentStep)}
            </StepperContext.Provider>
          </div>
          {currentStep <= steps.length && (
            <StepperControl
              handleClick={handleClick}
              currentStep={currentStep}
              steps={steps}
              isDataValid={
                currentStep === 1 ? isSelectPlanValid : isValidAddress
              }
            />
          )}
        </div>
      </div>
    </>
  );
};

export default OurPlans;
