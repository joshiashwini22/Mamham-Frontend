import React, { createContext, useState, useContext, useEffect } from "react";
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
          const response = await fetch("http://127.0.0.1:8000/api/authentication/user/", {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const responseData = await response.json();
          setUserInfo(responseData.userinfo);
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
      const response = await fetch("http://127.0.0.1:8000/api/authentication/login/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error('Login request failed');
      }

      const responseData = await response.json();

      const { access } = responseData.token;
      localStorage.setItem("access_token", access);
      localStorage.setItem("role", responseData.token.userinfo.is_staff);
      localStorage.setItem("token", JSON.stringify(responseData.token.userinfo));
      setUserInfo(responseData.token.userinfo);

    } catch (error) {
      console.error("Login error:", error);
      throw new Error('Login failed');
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("selectedDishes");    

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

// Custom hook to get the access token from the AuthContext
export const useAccessToken = () => {
  const { userInfo } = useAuth();
  return userInfo ? userInfo.access_token : null;
};
