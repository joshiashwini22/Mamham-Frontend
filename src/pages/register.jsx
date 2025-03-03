import React, { useState } from "react";
import axios from "axios";
import RegisterImg from "../../src/assets/images/Register.png";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(""); 
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !username || !password || !firstName || !lastName || !phoneNumber) {
      toast.error("Please fill in all the fields.");
      setError("Please fill in all fields.");
      return;
    }

    let data = JSON.stringify({
      email: email,
      username: username,
      password: password,
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://127.0.0.1:8000/api/authentication/register/",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        toast.success("Your account is Registered!");
        setShowOtpInput(true); // Show OTP input form after successful registration
      })
      .catch((error) => {
        console.log(error);
        setError("Registration failed. Please try again.");
        toast.error("Registration failed. Please try again.");
      });
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

  return (
    <>
      <div className="grid grid-cols-2 ">
        {/* Image section */}
        <section className="bg-gray-50 m-auto md:h-screen flex justify-center items-center">
          <img
            src={RegisterImg}
            alt="Register"
            className=" w-full object-cover"
          />
        </section>
        {/* form Section */}
        <section className="bg-gray-50 space-y-4 md:space-y-6 sm:p-8">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center mt-12">
                  Register to create an account
                </h1>
                {showOtpInput ? (
                  // OTP input form
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
                  // Registration form
                  <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                    {error && <p className="text-red-500">{error}</p>}
                    <div>
                    <label
                      htmlFor="fname"
                      className="block mb-2 text-sm font-medium text-gray-900 mt-4"
                    >
                      Your First Name
                    </label>
                    <input
                      type="text"
                      name="fname"
                      id="fname"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                        handleInputChange();
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="John"
                      required=""
                    />
                    <label
                      htmlFor="lname"
                      className="block mb-2 text-sm font-medium text-gray-900  mt-4"
                    >
                      Your Last Name
                    </label>
                    <input
                      type="text"
                      name="lname"
                      id="lname"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                        handleInputChange();
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="Doe"
                      required=""
                    />
                    <label
                      htmlFor="uname"
                      className="block mb-2 text-sm font-medium text-gray-900  mt-4"
                    >
                      Your Username
                    </label>
                    <input
                      type="text"
                      name="uname"
                      id="uname"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        handleInputChange();
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="Doisje"
                      required=""
                    />
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
                        handleInputChange();
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="abc@gmail.com"
                      required=""
                    />
                    <label
                      htmlFor="phonenumber"
                      className="block mb-2 text-sm font-medium text-gray-900 mt-4"
                    >
                      Your phone number
                    </label>
                    <input
                    type="text"
                    name="phonenumber"
                    id="phonenumber"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                      handleInputChange();
                    }}
                    pattern="[0-9]{10}"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                    placeholder="9800000000"
                    required=""
                  />

                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 mt-4"
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
                      className="w-full text-white bg-[#93040B] hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Sign Up
                    </button>
                    <p className="text-sm font-light text-black text-center ">
                      Already have an account yet?{" "}
                      <a
                        href="./login"
                        className="font-medium text-red-700 hover:underline"
                      >
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
      <ToastContainer/>
    </>
  );
};

export default Register;
