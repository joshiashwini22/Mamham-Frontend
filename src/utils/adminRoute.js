import React from 'react';
import { Route, useNavigate } from 'react-router-dom';

const AdminRoute = ({ component: Component, ...rest }) => {
  const admin = localStorage.getItem('role') === 'admin';
  const navigate = useNavigate();

  if (!admin) {
    navigate('/login'); // Redirect to login page if not admin
    return null; // Return null to prevent rendering of protected component
  }
  

  return <Route {...rest} element={<Component />} />;
};

export default AdminRoute;
