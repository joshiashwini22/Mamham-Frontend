import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
          axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
          const response = await axios.get("http://127.0.0.1:8000/api/authentication/user/");
          setUser(response.data.user);
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
      const { access } = response.data.token;
      localStorage.setItem("access_token", access);
      localStorage.setItem("role", response.data.token.user.is_staff);
      axios.defaults.headers.common["Authorization"] = "Bearer " + access;
      axios.defaults.headers.common["Role"] = response.data.token.user.is_staff ? "admin" : "user"; 
      setUser(response.data.token.user);
      if (response.data.token.user.is_staff) {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Invalid email or password. Please try again.");
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: user !== null, login, logout, loading }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
