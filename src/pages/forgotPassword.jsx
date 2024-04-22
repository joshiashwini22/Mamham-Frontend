import React, { useState } from "react";
import axios from "axios";
import RegisterImg from "../../src/assets/images/Register.png";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // New state for confirm password
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email.");
      setError("Please enter your email.");
      return;
    }

    const data = JSON.stringify({ email });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://127.0.0.1:8000/api/authentication/forgot-password/",
      headers: {
        "Content-Type": "application/json",
      },
      data,
    };

    axios
      .request(config)
      .then((response) => {
        toast.success("An OTP has been sent to your email to reset the password!");
        setShowOtpInput(true); // Show OTP input form after successful registration
      })
      .catch((error) => {
        setError("Email not found. Please try again.");
        toast.error("Email not found. Please try again.");
      });
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();

    // Check if the new password matches the confirm password
    if (password !== confirmPassword) {
      toast.error("Passwords do not match. Please try again.");
      return;
    }

    const data = JSON.stringify({
      email,
      otp,
      new_password: password,
    });

    const config = {
      method: "post",
      url: "http://127.0.0.1:8000/api/authentication/reset-password/",
      headers: {
        "Content-Type": "application/json",
      },
      data,
    };

    axios
      .request(config)
      .then((response) => {
        toast.success("Password reset successfully!");
        navigate(-1); // Redirect after successful verification
      })
      .catch((error) => {
        setError("Password reset failed. Please try again.");
        toast.error("Password reset failed. Please try again.");
      });
  };

  const handleResendOTP = () => {
    const data = JSON.stringify({ email });

    const config = {
      method: "post",
      url: "http://127.0.0.1:8000/api/authentication/resend-otp/",
      headers: {
        "Content-Type": "application/json",
      },
      data,
    };

    axios
      .request(config)
      .then((response) => {
        toast.success("OTP resent successfully!");
      })
      .catch((error) => {
        setError("Failed to resend OTP. Please try again.");
        toast.error("Failed to resend OTP. Please try again.");
      });
  };

  return (
    <>
      <div className="grid grid-cols-2">
        {/* Image section */}
        <section className="bg-gray-50 m-auto md:h-screen flex justify-center items-center">
          <img src={RegisterImg} alt="Register" className="w-full object-cover" />
        </section>
        {/* Form Section */}
        <section className="bg-gray-50 space-y-4 md:space-y-6 sm:p-8">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center mt-12">
                  Reset Password
                </h1>
                {showOtpInput ? (
                  // OTP input form with password reset fields
                  <form onSubmit={handleOtpSubmit}>
                    <label htmlFor="otp" className="block mb-2 text-sm font-medium text-gray-900 mt-4">
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
                    <div>
                      <label
                        htmlFor="new_password"
                        className="block mb-2 text-sm font-medium text-gray-900 mt-4"
                      >
                        New Password
                      </label>
                      <input
                        type="password"
                        name="new_password"
                        id="new_password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="confirm_password"
                        className="block mb-2 text-sm font-medium text-gray-900 mt-4"
                      >
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        id="confirm_password"
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                        }}
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full mt-4 text-white bg-[#93040B] hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Reset Password
                    </button>
                    <button
                      onClick={handleResendOTP}
                      className="text-[#93040B] font-medium text-sm mt-4"
                    >
                      Resend OTP
                    </button>
                  </form>
                ) : (
                  // Email form
                  <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                    {error && <p className="text-red-500">{error}</p>}
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 mt-4"
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
                        }}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="abc@gmail.com"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full text-white bg-[#93040B] hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Confirm Email
                    </button>
                    <p className="text-sm font-light text-black text-center">
                      Already have an account yet?{" "}
                      <a href="./login" className="font-medium text-red-700 hover:underline">
                        Sign in
                      </a>
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
      <ToastContainer />
    </>
  );
};

export default ForgotPassword;
