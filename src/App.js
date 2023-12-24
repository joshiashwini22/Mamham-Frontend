import React from "react";
import "./App.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Login from "./pages/login";
// import NotFound from "./pages/notFound";
import Register from "./pages/register";
import Dashboard from "./components/Dashboard/dashboard";
import Dishes from "./components/Dishes/dishes";
import Error from "./components/Error/error";
import Sidebar from "./common/admin/sidebar";
import Header from "./common/admin/header";
import Subscription from "./components/Subscription/subscription";
import CustomOrder from "./components/CustomOrder/customOrder";
import WeeklyMenu from "./components/WeeklyMenu/weeklyMenu";
import Menu from "./components/Menu/menu";
import Plans from "./components/Plans/plans";

const App = () => {
  return (
    <Router>
      <Header />
      <Sidebar />
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/header" element={<Header />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/dishes" element={<Dishes />} />
        <Route path="/error" element={<Error />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/weeklyMenu" element={<WeeklyMenu />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/customOrder" element={<CustomOrder />} />
        <Route path="/plans" element={<Plans />} />
      </Routes>
    </Router>
  );
};
export default App;
