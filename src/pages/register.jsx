import React, { useState } from "react";
import axios from "axios";
import RegisterImg from "../../src/assets/images/Register.png";
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !username || !password || !firstName || !lastName || !phoneNumber) {
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
        navigate(-1);
      })
      .catch((error) => {
        console.log(error);
        setError("Registration failed. Please try again.");
      });
  };
  const handleInputChange = () => {
    setError("");
  };

  return (
    <>
      <div className="grid grid-cols-2 ">
        {/* form Section */}
        <section className="bg-gray-50">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                  Sign up to create an account
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleSubmit}
                >
                  {error && <p className="text-red-500">{error}</p>}
                  <div>
                    <label
                      htmlFor="fname"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Your first name
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
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Your last name
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
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Your username
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
                      placeholder="abc@gmail.com"
                      required=""
                    />
                    <label
                      htmlFor="phonenumber"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Your phone number
                    </label>
                    <input
                      type="text"
                      name="phonenumber"
                      id="phonenumber"
                      value={phoneNumber}
                      onChange={(e) => {
                        setphoneNumber(e.target.value);
                        handleInputChange();
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="0909876"
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
                    className="w-full text-black bg-[#93040B] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Sign up
                  </button>
                  <p className="text-sm font-light text-gray-500">
                    Already have an account yet?{" "}
                    <a
                      href="./login"
                      className="font-medium text-primary-600 hover:underline"
                    >
                      Sign up
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
        {/* Image section */}
        <section>
          <img
            src={RegisterImg}
            alt="Login"
            className=" w-full object-cover h-screen"
          />
        </section>
      </div>
    </>
  );
};

export default Register;
