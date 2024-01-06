import React from "react";
import Header from "../../common/admin/header";
import Sidebar from "../../common/admin/sidebar";
 
const Dashboard = () => {
  return (
    <div className="p-4 sm:ml-64">
      <Header/>
      <Sidebar/>
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        <p>Dashboard</p>
      </div>
    </div>
  );
};

export default Dashboard;
