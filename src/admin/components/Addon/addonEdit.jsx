import React, { useState, useEffect } from "react";
import Sidebar from "../../sidebar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddonEdit = ({ onEdit }) => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  const handlePriceChange = (e) => {
    const pricing = parseInt(e.target.value);
    if (pricing < 1 || pricing > 500) {
      toast.error(`Please enter a price value between 1 and 500.`);
      return;
    }
    if (pricing > 500) {
      toast.error(`Maximum price of 500 exceeded.`);
      return;
    }
    setPrice(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `http://127.0.0.1:8000/api/subscription/addons/${id}`;
        const response = await axios.get(url);
        const { name, price } = response.data;
        setName(name);
        setPrice(price);
      } catch (error) {
        console.error("Error fetching addon data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleEditAddon = async (e) => {
    e.preventDefault();
    try {
      if (price < 1 || price > 100) {
        toast.error("Price must be between 1 and 100.");
        return;
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);

      const response = await axios.put(
        `http://127.0.0.1:8000/api/subscription/addons/${id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response) {
        navigate(-1);
        toast.success("Addon has been Updated");
      }
      if (onEdit) {
        onEdit(response.data);
      }
    } catch (error) {
      toast.error("Error updating addon:", error);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <>
      <Sidebar />
      <section className="bg-white">
        <div className="flex justify-center items-center py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <form>
            <h2 className="mb-4 text-xl font-bold text-red-700">
              Update Addon - {name}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="w-full">
                <label
                  htmlFor="title"
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-4 focus:border-4 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400"
                  placeholder="Title"
                  required=""
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
                  min={1}
                  max={500}
                  onChange={handlePriceChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-4 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400"
                  placeholder="$2999"
                  required=""
                />
              </div>
            </div>
            <button
              type="submit"
              onClick={handleEditAddon}
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center border border-gray-300 text-blue bg-red-700 text-white rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800"
            >
              Update
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center border border-gray-300 text-blue bg-gray-300 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-gray-400"
            >
              Cancel
            </button>
          </form>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default AddonEdit;
