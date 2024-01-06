import React from "react";
import "./App.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./components/Landing/homePage";
import Login from "./pages/login";
// import NotFound from "./pages/notFound";
import Register from "./pages/register";
import Dashboard from "./components/Landing/dashboard";
import Dishes from "./components/Dishes/dishes";
import DishCreate from "./components/Dishes/dishCreate";
import DishEdit from "./components/Dishes/dishEdit";
import Error from "./components/Error/error";
import Subscription from "./components/Subscription/subscription";
import CustomOrder from "./components/CustomOrder/customOrder";
import WeeklyMenu from "./components/WeeklyMenu/weeklyMenu";
import Menu from "./components/Menu/menu";
import Plans from "./components/Plans/plans";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/dishes" element={<Dishes />} />
        <Route path="/error" element={<Error />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/weeklyMenu" element={<WeeklyMenu />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/customOrder" element={<CustomOrder />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/dishes-create" element={<DishCreate/>} />
        <Route path="/dishes-update" element={<DishEdit/>} />
      </Routes>
    </Router>
  );
};
export default App;
