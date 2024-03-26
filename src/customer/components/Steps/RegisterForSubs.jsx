import React, { useContext } from 'react';
import Login from '../../../pages/login';
import { AuthProvider, useAuth  } from '../../../context/AuthContext'; // Update the import path accordingly
import DeliverySubscription from './DeliverySubscription';

const RegisterForSubs = ({onLoginSuccess}) => {
  const { isAuthenticated } = useAuth();

  const handleLoginSuccess = () => {
    console.log('Login successful');
    localStorage.setItem('registrationCompleted', 'true');
    onLoginSuccess(); 
  };
  
  return (
    <div>
      {isAuthenticated ? (
        <div>
          <DeliverySubscription/>
        </div>
      ) : (
        <Login context="subscription" onLogin={handleLoginSuccess}/>
      )}
    </div>
  );
};

export default RegisterForSubs;
