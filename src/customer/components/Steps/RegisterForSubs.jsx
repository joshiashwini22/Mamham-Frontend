import React, { useContext } from 'react';
import Login from '../../../pages/login';
import { AuthProvider, useAuth  } from '../../../context/AuthContext'; // Update the import path accordingly
import DeliverySubscription from './DeliverySubscription';

const RegisterForSubs = ({onLoginSuccess,setCurrentStep, setDirection}) => {
  const { isAuthenticated } = useAuth();

  const handleLoginSuccess = () => {
    console.log('Login successful');
    localStorage.setItem('registrationCompleted', 'true');
    onLoginSuccess(); 
  };
  
  if (isAuthenticated && setDirection === "back"){
    setCurrentStep(1)
    window.location.reload();

  }
  else if (isAuthenticated && setDirection === "next"){
    setCurrentStep(3)
  }
  
  return (
    <div>
        <Login context="subscription" onLogin={handleLoginSuccess}/>
    </div>
  );
};

export default RegisterForSubs;