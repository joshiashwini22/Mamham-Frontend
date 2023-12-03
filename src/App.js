import React from "react";
import "./App.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Login from "./pages/login";
import NotFound from "./pages/notFound";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route component={NotFound} /> */}
      </Routes>
    </Router>
  );
};
export default App;
