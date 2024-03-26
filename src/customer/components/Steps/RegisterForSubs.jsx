import React, { useContext } from 'react';
import Login from '../../../pages/login';
import { AuthProvider, useAuth  } from '../../../context/AuthContext'; // Update the import path accordingly
import DeliverySubscription from './DeliverySubscription';

const RegisterForSubs = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <DeliverySubscription/>
        </div>
      ) : (
        <Login context="subscription" />
      )}
    </div>
  );
};

export default RegisterForSubs;
