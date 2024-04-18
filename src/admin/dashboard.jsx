import React, { useEffect } from "react";
import Sidebar from "./sidebar";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import TopDishes from "./components/Dashboard/TopDishes";
import ChartComponent from "./components/Dashboard/ChartComponent";
import TableComponent from "./components/Dashboard/TableComponent";

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
      <Sidebar />
      <div className="p-4 rounded-lg dark:border-gray-700 mt-14">
      <ChartComponent/>
      
      <TableComponent/>

      <TopDishes/>

      </div>
    </div>
  );
};

export default Dashboard;
