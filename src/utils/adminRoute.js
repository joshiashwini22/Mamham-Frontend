import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ element: Element, ...rest }) => {
  const { user } = useAuth();

  // Check if user is authenticated and an admin
  const isAuthenticated = user !== null;
  const isAdmin = isAuthenticated && user.is_staff;

  return (
    <Route
      {...rest}
      element={
        isAdmin ? <Element /> : <Navigate to="/" replace /> // Redirect to homepage if not an admin
      }
    />
  );
};

export default AdminRoute;
