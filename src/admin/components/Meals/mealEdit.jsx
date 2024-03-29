import React, { useState, useEffect } from 'react';
import Sidebar from "../../sidebar";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MealEdit = ({ onEdit }) => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `http://127.0.0.1:8000/api/subscription/meals/${id}`;
        const response = await axios.get(url);
        const { name, description, image } = response.data;
        setName(name);
        setDescription(description);
        setImageUrl(image);
      } catch (error) {
        console.error('Error fetching meal data:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleEditMeal = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);

      if (image) {
        formData.append('image', image);
      }

      const response = await axios.patch(`http://127.0.0.1:8000/api/subscription/meals/${id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response) {
        navigate(-1);
        toast.success("Meal has been Updated");
      }
      if (onEdit) {
        onEdit(response.data);
      }
    } catch (error) {
      toast.error('Error updating meal:', error);
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
              Update Meal - {name}
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
                  <img src={URL.createObjectURL(image)} alt="Meal" className="mt-2 max-w-full h-auto" />
                )}
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={handleEditMeal}
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

export default MealEdit;
