import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/images/Mamham.png";
import Button from "../common/button";
import { useAuth } from "../context/AuthContext";
import { getCustomerIdFromStorage } from "../utils/utils";

import NotificationDropdown from "./components/notification";

function Navbar() {
  const [isAuth, setIsAuth] = useState(false);
  const [username, setUsername] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [showDropdown, setShowDropdown] = useState(false);


  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogoutClick = () => {
    logout();
    setIsAuth(false);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const isActive = (path) => {
    return location.pathname === path ? "text-red-500" : "";
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const token = localStorage.getItem("token");

    if (accessToken) {
      setIsAuth(true);
    }

    if (token) {
      const parsedToken = JSON.parse(token);
      setUsername(parsedToken.username);
    }
  }, []);

  return (
    <div className="z-10">
      <nav className="bg-white w-full top-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <img src={Logo} className="h-12" alt="Mamham Logo" />
          </a>

          {/* Mobile Hamburger Menu */}
          <div className="md:hidden flex items-center justify-end">
            {isAuth && (
              <NotificationDropdown />
            )}
            <button
              className="p-2"
              onClick={toggleMenu}
              aria-label="Toggle Menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>

          {/* Navigation Links for Larger Screens */}
          <div className={`hidden md:flex md:w-auto md:items-center md:space-x-8`}>
            <ul className="flex md:space-x-8">
              <li>
                <a
                  href="/"
                  className={`block py-2 px-3 hover:bg-gray-100 ${isActive("/")}`}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/ourplans"
                  class={`block py-2 px-3 hover:bg-gray-100 ${isActive("/ourplans")}`}
                >
                  Our Plans
                </a>
              </li>
              <li>
                <a
                  href="/custom"
                  class={`block py-2 px-3 hover:bg-gray-100 ${isActive("/custom")}`}
                >
                  Custom
                </a>
              </li>
              <li>
                <a
                  href="/ourmenu"
                  class={`block py-2 px-3 hover-bg-gray-100 ${isActive("/ourmenu")}`}
                >
                  Our Menu
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class={`block py-2 px-3 hover-bg-gray-100 ${isActive("/howitworks")}`}
                >
                  How It Works
                </a>
              </li>
            </ul>

          </div>
          <div className="flex flex-row md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {isAuth ? (
              <>
                <ul className="flex flex-row items-center justify-center">
                  <li>
                    <p>Hi {username}!</p>
                  </li>
                  <li>
                    <NotificationDropdown />
                  </li>
                  <li>
                    <div>
                      <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="relative inline-flex items-center justify-center w-8 h-8 hover:text-gray-800 focus:outline-none text-base"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          stroke="#212b36"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          fill="none"
                        >
                          <circle cx="12" cy="8" r="5" />
                          <path d="M3,21 h18 C 21,12 3,12 3,21" />
                        </svg>
                      </button>
                    </div>
                  </li>
                </ul>
                {showDropdown && (
                  <div className="absolute top-14 right-8 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div
                      className="p-2"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      <a
                        href={`/myorders/${getCustomerIdFromStorage()}`}
                        className="text-black block pb-2 hover:bg-gray-100"
                      >
                        My Orders
                      </a>
                      <a
                        href={`/mysubscriptions/${getCustomerIdFromStorage()}`}
                        className="text-black block pb-4 hover:bg-gray-100"
                      >
                        My Subscriptions
                      </a>
                      <Button purpose="Logout" onClick={handleLogoutClick} />
                    </div>
                  </div>
                )}
              </>
            ) : (
              <Button purpose="Login" onClick={handleLoginClick} />
            )}
          </div>
        </div>

        {/* Mobile Menu (Visible when menuOpen is true) */}
        <div className={`md:hidden ${menuOpen ? "block" : "hidden"}`}>
          <ul className="flex flex-col p-4 bg-gray-50 border-b border-gray-200 space-y-4">
            <li>
              <a
                  href="/"
                  class={`block py-2 px-3 hover-bg-gray-100 ${isActive("/")}`}
                >
                  Home
              </a>
            </li>
            <li>
              <a
                  href="/ourplans"
                  class={`block py-2 px-3 hover-bg-gray-100 ${isActive("/ourplans")}`}
                >
                  Our Plans
              </a>
            </li>
            <li>
              <a
                  href="/custom"
                  class={`block py-2 px-3 hover-bg-gray-100 ${isActive("/custom")}`}
                >
                  Custom
              </a>
            </li>
            <li>
              <a
                  href="/ourmenu"
                  class={`block py-2 px-3 hover-bg-gray-100 ${isActive("/ourmenu")}`}
                >
                  Our Menu
              </a>
            </li>
              <li>
                <a
                  href="#"
                  class={`block py-2 px-3 hover-bg-gray-100 ${isActive("/howitworks")}`}
                >
                  How It Works
              </a>
            </li>
             {isAuth && (
                <li>
                  <a
                    href="#"
                    onClick={handleLogoutClick}
                    className={`block py-2 px-3 bg-maroon text-white-500 hover:bg-gray-100`}
                  >
                    Logout
                  </a>
                </li>
              )}
          </ul>
          
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
