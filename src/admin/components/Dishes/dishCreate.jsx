import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../sidebar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DishCreate = ({ onDishCreated }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  // Define dish options
  const dishOptions = ["Base", "Lentil", "Veggie", "Protein", "Pickle"];

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleCreateDish = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("image", image);
      formData.append("category", selectedCategory);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/customization/dishes/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      

      if (onDishCreated) {
        onDishCreated(response.data);
      }

      // Reset the form
      setName("");
      setPrice("");
      setDescription("");
      setImage(null);
      setSelectedCategory("");

      // Navigate after a short delay
      setTimeout(() => {
        navigate("/dishes");
      },1000); // Adjust the delay as needed
      // Show toast
      toast.success("Dish created successfully!");
    } catch (error) {
      console.error("Error creating dish:", error);
      toast.error("Error creating dish. Please provide all values.");
    }
  };

  return (
    <>
      <Sidebar />
      <section className="bg-white">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-red-700">
            Create a New Dish
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
              <div className="w-full">
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:border-primary-600 block w-full p-2.5"
                >
                  <option value="">Select category</option>
                  {dishOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full">
                <label
                  htmlFor="imageUpload"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Upload Image
                </label>
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:border-primary-600 block w-full p-2.5"
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows="8"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-2 focus:border-primary-600"
                  placeholder="Description"
                ></textarea>
              </div>
            </div>
            <button
              type="button"
              onClick={handleCreateDish}
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center border border-gray-300 text-blue bg-red-700 rounded-lg focus:ring-2 focus:ring-primary-600 hover:bg-primary-800 text-white"
            >
              Add
            </button>
          </form>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default DishCreate;
