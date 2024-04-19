import React, { useEffect } from "react";
import Sidebar from "./sidebar";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import TopDishes from "./components/Dashboard/TopDishes";
import TableComponent from "./components/Dashboard/TableComponent";
import OrderStatus from "./components/Dashboard/OrderStatus";
import SubscriptionStatus from "./components/Dashboard/SubscriptionStatus";
import SubscriptionTotal from "./components/Dashboard/SubscriptionTotal";
import OrderTotal from "./components/Dashboard/OrderTotal";

const Dashboard = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  const isAdminUser = isAdmin();

  useEffect(() => {
    if (!isAdmin()) {
      navigate("/login");
    }
  }, [isAdmin, navigate]);

  return (
    <div className="p-4 sm:ml-64">
      <Sidebar />
      <h1 className="text-red-700 text-4xl font-bold text-center">
        Dashboard
      </h1>
      <br/>
      <div className="p-4 rounded-lg dark:border-gray-700 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
        <div className="col-span-1">
          <SubscriptionTotal />
        </div>
        <div className="col-span-1">
          <OrderTotal />
        </div>
      </div>
      <div className="p-4 rounded-lg dark:border-gray-700 mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="col-span-1">
          <TopDishes />
        </div>
        <div className="col-span-1">
          <OrderStatus />
        </div>
        <div className="col-span-1">
          <SubscriptionStatus />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
