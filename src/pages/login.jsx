import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import LoginImg from "../../src/assets/images/Mamham.jpg";
import { useNavigate } from "react-router-dom";
import DeliverySubscription from "../customer/components/Steps/DeliverySubscription";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Login = ({ onLogin, context }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false); // State to control OTP form visibility
  const [showForgotPassword, setShowForgotPassword] = useState(false); 
  const [showResetPassword, setShowResetPassword] = useState(false);
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

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
          <DeliverySubscription />;
        } else if (context === "custom") {
          navigate("/checkout");
        } else {
          navigate(-1);
        }
      }
    } catch (error) {
      // Check if the error message indicates email verification is required
      if (error.message.includes("Email is not verified.")) {
        // Show OTP verification form
        setShowOtpInput(true);
      } else {
        setError(error.message);
      }
    }
  };

  const handleInputChange = () => {
    setError("");
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    let data = JSON.stringify({
      email: email,
      otp: otp,
    });
    let config = {
      method: "post",
      url: "http://127.0.0.1:8000/api/authentication/verify-email/",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        toast.success("Email verified successfully!");
        navigate(-1); // Redirect after successful verification
      })
      .catch((error) => {
        console.error(error);
        setError("Email verification failed. Please try again.");
        toast.error("Email verification failed. Please try again.");
      });
  };

  const handleResendOTP = () => {
    let data = JSON.stringify({
      email: email,
    });
    let config = {
      method: "post",
      url: "http://127.0.0.1:8000/api/authentication/resend-otp/",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        toast.success("OTP resent successfully!");
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to resend OTP. Please try again.");
        toast.error("Failed to resend OTP. Please try again.");
      });
  };
  const handleForgotPassword = () => {
  };


  // Render regular login form if showOtpForm is false
  return (
    <div className="grid grid-cols-2 ">
      {/* Image section */}
      <section className="mx-auto md:h-screen flex justify-center items-center">
        <img src={LoginImg} alt="Login" className="w-full object-cover" />
      </section>

      {/* form Section */}
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Sign in to your account
              </h1>
              {showOtpInput ? (
                // OTP input form
                <form onSubmit={handleOtpSubmit}>
                  <label
                    htmlFor="otp"
                    className="block mb-2 text-sm font-medium text-gray-900 mt-4"
                  >
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5"
                    placeholder="Enter OTP"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full mt-4 text-white bg-[#93040B] hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Verify OTP
                  </button>

                  <button
                    onClick={handleResendOTP}
                    className=" text-[#93040B] font-medium text-sm mt-4"
                  >
                    Resend OTP
                  </button>
                </form>
              ) : (
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleSubmit}
                >
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
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5"
                      required=""
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-[#93040B] hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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
                  <button
                    onClick={handleForgotPassword}
                    className=" text-blue font-medium text-sm mt-4"
                  >
Forgot Password?                  </button>
                </form>
                
              )}
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
};

export default Login;
