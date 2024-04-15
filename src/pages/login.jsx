import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import LoginImg from "../../src/assets/images/Mamham.jpg";
import { useNavigate } from "react-router-dom";
import DeliverySubscription from "../customer/components/Steps/DeliverySubscription";

const Login = ({ onLogin, context }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if email or password is empty
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      // Call the login function from AuthContext
      await login(email, password);

      // Get the role from localStorage and convert it to a boolean value
      const role = localStorage.getItem("role") === "true";

      if (role) {
        navigate("/dashboard");
      } else {
        if (context === "subscription") {
          <DeliverySubscription/>
        } else if (context === "custom") {
          navigate("/checkout");
        } else {
          navigate(-1);
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleInputChange = () => {
    setError("");
  };

  return (
    <div className="grid grid-cols-2 ">
      {/* Image section */}
      <section className="mx-auto md:h-screen flex justify-center items-center">
  <img
    src={LoginImg}
    alt="Login"
    className="w-full object-cover"
  />
</section>

      {/* form Section */}
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                {error && <div className="text-red-500">{error}</div>}
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      handleInputChange();
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Woooo"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      handleInputChange();
                    }}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required=""
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-[#93040B] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-black text-center">
                    Don’t have an account yet?{" "}
                    <a
                      href="./register"
                      className="font-medium text-red-700 hover:underline"
                    >
                      Sign up
                    </a>
                  </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
