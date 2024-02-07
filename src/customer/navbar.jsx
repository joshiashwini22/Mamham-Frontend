import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from "../assets/images/Logo.png";
import Button from "../common/button";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const isActive = (href) => {
    return location.pathname === href ? 'text-black rounded md:bg-transparent md:p-0 md:dark:text-red-500' : '';
  };

  return (
    <>
      <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
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
                  className={`block py-2 px-3 hover:bg-gray-100 md:hover:bg-transparent md:p-0 md:dark:hover:text-red-500 dark:text-black dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700  ${isActive('/')}`}
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/custom"
                  className={`block py-2 px-3 hover:bg-gray-100 md:hover:bg-transparent md:p-0 md:dark:hover:text-red-500 dark:text-black dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${isActive('/custom')}`}
                >
                  Custom
                </a>
              </li>
              <li>
                <a
                  href="/ourplans"
                  className={`block py-2 px-3 hover:bg-gray-100 md:hover:bg-transparent md:p-0 md:dark:hover:text-red-500 dark:text-black dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${isActive('/ourplans')}`}
                >
                  Our Plans
                </a>
              </li>
              <li>
                <a
                  href="/ourmenu"
                  className={`block py-2 px-3 hover:bg-gray-100 md:hover:bg-transparent md:p-0 md:dark:hover:text-red-500 dark:text-black dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${isActive('/ourmenu')}`}
                >
                  Our Menu
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`block py-2 px-3 hover:bg-gray-100 md:hover:bg-transparent md:p-0 md:dark:hover:text-red-500 dark:text-black dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${isActive('/howitworks')}`}
                >
                  How it Works
                </a>
              </li>
            </ul>
          </div>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <Button purpose="Login" onClick={handleLoginClick} />
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
