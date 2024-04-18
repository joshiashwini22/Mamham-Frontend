import React, { useState } from "react";
import Sidebar from "../../sidebar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";

const AddonCreate = ({ onAddonCreated }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();


  const handleCreateAddon = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/subscription/addons/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Show toast
      toast.success("Addon created successfully!");

      if (onAddonCreated) {
        onAddonCreated(response.data);
      }

      // Reset the form
      setName("");
      setPrice("");
      setTimeout(() => {
        navigate("/addons");
      },1000); // Adjust the delay as needed
      // Show toast
      toast.success("Addon  created successfully!");
    } catch (error) {
      console.error("Error creating addon:", error);
      toast.error("Error creating addon. Please provide all values.");
    }
  };
  const handleCancel = () => {
    navigate(-1);
  };
  return (
    <>
      <Sidebar />
      <section className="bg-white">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-red-700">
            Create a New Addon
          </h2>
          <form>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="w-full">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Name"
                  required
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Price per unit
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Price"
                  required
                />
              </div>
            </div>
            <button
              type="button"
              onClick={handleCreateAddon}
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center border border-gray-300 text-blue bg-red-700 rounded-lg focus:ring-2 focus:ring-primary-600 hover:bg-primary-800 text-white"
            >
              Add
            </button>
            <button
                type="button"
                onClick={handleCancel}
                className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center border border-gray-300 text-blue bg-gray-300 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-gray-400"
              >
                Back
              </button>
          </form>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default AddonCreate;
