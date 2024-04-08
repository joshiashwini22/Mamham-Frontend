import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
          axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
          const response = await axios.get("http://127.0.0.1:8000/api/authentication/user/", { headers: {"Authorization" : `Bearer ${accessToken}`} });
          setUserInfo(response.data.userinfo);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/authentication/login/", {
        email,
        password
      });
  
      // Log the response data to check if the role is set correctly
      console.log("Login response data:", response.data);
  
      const { access } = response.data.token;
      localStorage.setItem("access_token", access);
      localStorage.setItem("role", response.data.token.userinfo.is_staff);
      localStorage.setItem("token", JSON.stringify(response.data.token.userinfo));
  
      axios.defaults.headers.common["Authorization"] = "Bearer " + access;
      axios.defaults.headers.common["Role"] = response.data.token.userinfo.is_staff ? "admin" : "user";
      setUserInfo(response.data.token.userinfo);
  
      

      
    } catch (error) {
      console.error("Login error:", error);
      throw new Error(JSON.stringify(error.response.data.m));
    }
  };
  
  

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("selectedDishes");    

    delete axios.defaults.headers.common["Authorization"];
    delete axios.defaults.headers.common["Role"];
    setUserInfo(null);
    navigate('/login');
  };

  // Function to check if the user is an admin
const isAdmin = () => {
  const role = localStorage.getItem("role");
  return role === "true"; // Convert string to boolean
};
  

  return (
    <AuthContext.Provider value={{ userInfo, isAuthenticated: userInfo !== null, login, logout, loading, isAdmin }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
