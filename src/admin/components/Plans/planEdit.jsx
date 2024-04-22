import React, { useState, useEffect } from 'react';
import Sidebar from "../../sidebar";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PlanEdit = ({ onEdit }) => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `http://127.0.0.1:8000/api/subscription/plans/${id}`;
        const response = await axios.get(url);
        const { name, price, description, image } = response.data;
        setName(name);
        setPrice(price);
        setDescription(description);
        setImageUrl(image);
      } catch (error) {
        console.error('Error fetching plan data:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
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

  const handleEditPlan = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);
      formData.append('description', description);
      if (price < 1 || price > 500) {
        toast.error(`Please enter a price value between 1 and 500.`);
        return;
      }
      if (price > 500) {
        toast.error(`Maximum price of 500 exceeded.`);
        return;
      }

      if (image) {
        formData.append('image', image);
      }

      const response = await axios.patch(`http://127.0.0.1:8000/api/subscription/plans/${id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response) {
        toast.success("Plan has been Updated");
        navigate(-1);
      }
      if (onEdit) {
        onEdit(response.data);
      }
    } catch (error) {
      toast.error('Error updating plan', error);
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
              Update Plan - {name}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="w-full">
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:border-4 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400"
                  placeholder="Title"
                  required=""
                />
              </div>
              <div className="w-full">
                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400"
                  placeholder="100"
                  required=""
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">
                  Description
                </label>
                <textarea
                  id="description"
                  rows="8"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-2 focus:border-primary-600 placeholder-gray-400"
                  placeholder="Your description here"
                ></textarea>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="imageUpload" className="block mb-2 text-sm font-medium text-gray-900">
                  Upload Image
                </label>
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-2 focus:border-primary-600 placeholder-gray-400"
                />
                {image && (
                  <img src={URL.createObjectURL(image)} alt="Plan" className="mt-2 max-w-full h-auto" />
                )}
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={handleEditPlan}
                className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center border border-gray-300 text-blue bg-red-700 text-white rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800"
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
            </div>
          </form>
        </div>
        <ToastContainer />
      </section>
    </>
  );
}

export default PlanEdit;
