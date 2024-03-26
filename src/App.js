import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AdminRoute from "./utils/adminRoute";
import HomePage from "./customer/homePage";
import Login from "./pages/login";
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
import Checkout from "./customer/checkout";
import OurMenu from "./customer/ourMenu";
import OurPlans from "./customer/ourPlans";
import Popup from "./customer/components/popup";
import DeliveryAddress from "./pages/deliveryAddress";
import MyOrders from "./customer/myOrders";
import DeliverySubscription from "./customer/components/Steps/DeliverySubscription";


const App = () => {
  return (
    <Router>
      {/* Wrap your routes with the AuthProvider */}
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="*" element={<Error />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/custom" element={<Custom />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/ourmenu" element={<OurMenu />} />
          <Route path="/ourplans" element={<OurPlans />} />
          <Route path="/weeklyMenu" element={<WeeklyMenu />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dishes" element={<Dishes />} />
          <Route path="/dishes-create" element={<DishCreate />} />
          <Route path="/dishes-update/:id" element={<DishEdit />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/customOrder" element={<CustomOrder />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/plans/deliveryselection" element={<DeliverySubscription/>} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/popup" element={<Popup />} />
          <Route path="/deliveryaddress" element={<DeliveryAddress />} />
          <Route path="/orderDetails" element={<MyOrders />} />

        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
