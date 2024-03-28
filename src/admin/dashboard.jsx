import React, { useEffect } from "react";
import Header from "./header";
import Sidebar from "./sidebar";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const {isAdmin} = useAuth();
  const navigate = useNavigate();

  const isAdminUser = isAdmin();

  console.log(isAdminUser)
  useEffect(() => {
    if (!isAdmin()) {
      navigate("/login");
    }
  }, [isAdmin, navigate]);
  

  return (
    <div className="p-4 sm:ml-64">
      <Header />
      <Sidebar />
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
      {isAdminUser ? <p>User is an admin</p> : <p>User is not an admin</p>}
      </div>
    </div>
  );
};

export default Dashboard;
