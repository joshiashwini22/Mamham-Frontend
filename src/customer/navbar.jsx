import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/images/Logo.png";
import Button from "../common/button";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [isAuth, setIsAuth] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogoutClick = () => {
    logout(); // Call the logout function
    setIsAuth(false); // Update local state to reflect the user's authentication status
  };

  const isActive = (href) => {
    return location.pathname === href
      ? "text-black rounded md:bg-transparent md:p-0 md:dark:text-red-500"
      : "";
  };

  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      setIsAuth(true);
    }
  }, [isAuth]);

  return (
    <>
      <nav className="bg-white w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={Logo} className="h-8" alt="Mamham Logo" />
          </a>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
              <li>
                <a
                  href="/"
                  className={`block py-2 px-3 hover:bg-gray-100 md:hover:bg-transparent md:p-0 md:dark:hover:text-red-500 dark:text-black dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700  ${isActive(
                    "/"
                  )}`}
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/custom"
                  className={`block py-2 px-3 hover:bg-gray-100 md:hover:bg-transparent md:p-0 md:dark:hover:text-red-500 dark:text-black dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${isActive(
                    "/custom"
                  )}`}
                >
                  Custom
                </a>
              </li>
              <li>
                <a
                  href="/ourplans"
                  className={`block py-2 px-3 hover:bg-gray-100 md:hover:bg-transparent md:p-0 md:dark:hover:text-red-500 dark:text-black dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${isActive(
                    "/ourplans"
                  )}`}
                >
                  Our Plans
                </a>
              </li>
              <li>
                <a
                  href="/ourmenu"
                  className={`block py-2 px-3 hover:bg-gray-100 md:hover:bg-transparent md:p-0 md:dark:hover:text-red-500 dark:text-black dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${isActive(
                    "/ourmenu"
                  )}`}
                >
                  Our Menu
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`block py-2 px-3 hover:bg-gray-100 md:hover:bg-transparent md:p-0 md:dark:hover:text-red-500 dark:text-black dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${isActive(
                    "/howitworks"
                  )}`}
                >
                  How it Works
                </a>
              </li>
            </ul>
          </div>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {isAuth ? (
              <>
                <a href="/orderDetails" className="text-black">
                  My Orders
                </a>{" "}
                {/* My Orders Link */}
                <button
                  id="dropdownNotificationButton"
                  data-dropdown-toggle="dropdownNotification"
                  class="relative inline-flex items-center text-sm font-medium text-center text-gray-500 focus:outline-none dark:hover:text-white dark:text-gray-400"
                  type="button"
                >
                  <svg
                    class="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 14 20"
                  >
                    <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
                  </svg>
                </button>
                <Button purpose="Logout" onClick={handleLogoutClick} />
              </>
            ) : (
              <Button purpose="Login" onClick={handleLoginClick} />
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
