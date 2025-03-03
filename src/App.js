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
import Addon from "./admin/components/Addon/addon";
import AddonCreate from "./admin/components/Addon/addonCreate";
import AddonEdit from "./admin/components/Addon/addonEdit";
import Error from "./common/error";
import Subscription from "./admin/components/Subscription/subscription";
import CustomOrder from "./admin/components/CustomOrder/customOrder";
import WeeklyMenu from "./admin/components/WeeklyMenu/weeklyMenu";
import Meal from "./admin/components/Meals/meal";
import Plans from "./admin/components/Plans/plans";
import Custom from "./customer/custom";
import Checkout from "./customer/checkout";
import OurMenu from "./pages/ourMenu";
import OurPlans from "./customer/ourPlans";
import Popup from "./customer/components/popup";
import DeliveryAddress from "./customer/components/deliveryAddress";
import MyOrders from "./customer/myOrders";
import DeliverySubscription from "./customer/components/Steps/DeliverySubscription";
import {getCustomerIdFromStorage} from "./utils/utils"
import PlanEdit from "./admin/components/Plans/planEdit";
import PlanCreate from "./admin/components/Plans/planCreate";
import MealCreate from "./admin/components/Meals/mealCreate";
import MealEdit from "./admin/components/Meals/mealEdit";
import WeeklymenuCreate from "./admin/components/WeeklyMenu/weeklymenu-create";
import WeeklymenuEdit from "./admin/components/WeeklyMenu/weeklymenuEdit";
import MySubscriptions from "./customer/mySubscriptions";
import AdminNotification from "./admin/components/adminNotification";
import SubscriptionDelivery from "./admin/components/Subscription/subscriptionDelivery";
import ModifyDelivery from "./customer/modifyDelivery";
import PaymentCompletion from "./common/paymentCompletion";
import NotificationCreate from "./admin/components/createNotification";
import ForgotPassword from "./pages/forgotPassword";
import HowItWorks from "./customer/HowItWorks";


const App = () => {
  const customerId = getCustomerIdFromStorage(); // Retrieve customer ID from local storage
  const myordersUrl = customerId ? `/myorders/${customerId}` : '/myorders'; // Construct URL
  const mysubscriptionsUrl = customerId ? `/mysubscriptions/${customerId}`: '/mysubscriptions'; // Construct URL

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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/payment-completion" element={<PaymentCompletion />} />
          <Route path="/dishes" element={<Dishes />} />
          <Route path="/dishes-create" element={<DishCreate />} />
          <Route path="/dishes-update/:id" element={<DishEdit />} />
          <Route path="/addons" element={<Addon />} />
          <Route path="/addon-create" element={<AddonCreate />} />
          <Route path="/addon-update/:id" element={<AddonEdit />} />
          <Route path="/modify-delivery/:id" element={<ModifyDelivery />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/delivery-subscription" element={<SubscriptionDelivery/>} />
          <Route path="/customOrder" element={<CustomOrder />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/plans-create" element={<PlanCreate/>} />
          <Route path="/plans-update/:id" element={<PlanEdit/>} />
          <Route path="/plans/deliveryselection" element={<DeliverySubscription/>} />
          <Route path="/meals" element={<Meal />} />
          <Route path="/meals-create" element={<MealCreate/>} />
          <Route path="/meals-update/:id" element={<MealEdit/>} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/weeklyMenu" element={<WeeklyMenu />} />
          <Route path="/weeklymenu-create" element={<WeeklymenuCreate/>} />
          <Route path="/weeklymenu-update/:id" element={<WeeklymenuEdit/>} />
          <Route path="/popup" element={<Popup />} />
          <Route path="/deliveryaddress" element={<DeliveryAddress />} />
          <Route path={myordersUrl} element={<MyOrders />} />
          <Route path={mysubscriptionsUrl} element={<MySubscriptions/>} />
          <Route path="/admin-notification" element={<AdminNotification/>}/>
          <Route path="/create-notification" element={<NotificationCreate/>}/>
          <Route path="/forgotPassword" element={<ForgotPassword/>}/>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
