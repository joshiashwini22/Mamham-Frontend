import React from "react";
import "./App.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./customer/homePage";
import Login from "./pages/login";
//import Logout from "./customer/components/logout";
// import NotFound from "./pages/notFound";
import Register from "./pages/register";
import Dashboard from "./admin/dashboard";
import Dishes from "./admin/components/Dishes/dishes";
import DishCreate from "./admin/components/Dishes/dishCreate";
import DishEdit from "./admin/components/Dishes/dishEdit";
import Error from "./common/error";
import Subscription from "./admin/components/Subscription/subscription";
import CustomOrder from "./admin/components/CustomOrder/customOrder";
import WeeklyMenu from "./admin/components/weeklyMenu";
import Menu from "./admin/components/Menu/menu";
import Plans from "./admin/components/Plans/plans";
import Custom from "./customer/custom";
import OurMenu from "./customer/ourMenu";
import OurPlans from "./customer/ourPlans";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/logout" element={<Logout />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/dishes" element={<Dishes />} />
        <Route path="*" element={<Error />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/weeklyMenu" element={<WeeklyMenu />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/customOrder" element={<CustomOrder />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/dishes-create" element={<DishCreate/>} />
        <Route path="/dishes-update/:id" element={<DishEdit/>} />
        <Route path="/custom" element={<Custom />} />
        <Route path="/ourmenu" element={<OurMenu />} />
        <Route path="/ourplans" element={<OurPlans />} />

      </Routes>
    </Router>
  );
};
export default App;
