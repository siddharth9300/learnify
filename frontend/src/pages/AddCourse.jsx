import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const AddCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");
  const [thumbnail, setThumbnail] = useState(null); // Store the selected file
  const [thumbnailPreview, setThumbnailPreview] = useState(null); // Store the preview URL
  const navigate = useNavigate();

  const categories = ["Programming", "Design", "Marketing", "Business", "Photography"];

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "lernify"); // Replace with your Cloudinary upload preset
    formData.append("cloud_name", "dorlijqzl"); // Replace with your Cloudinary cloud name

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dorlijqzl/image/upload`,
        formData
      );
      return response.data.secure_url; // Return the uploaded file's URL
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      throw error; // Throw the error to be caught in the calling function
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("No file selected.");
      return;
    }

    setThumbnail(file); // Store the selected file
    setThumbnailPreview(URL.createObjectURL(file)); // Generate a preview URL
  };

  const addCourseHandler = async (e) => {
    e.preventDefault();

    if (!thumbnail) {
      toast.error("Please select a thumbnail.");
      return;
    }

    try {
      toast.loading("Uploading thumbnail...");
      const thumbnailUrl = await uploadToCloudinary(thumbnail); // Upload the file to Cloudinary
      toast.dismiss();

      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const courseData = {
        title,
        description,
        category,
        duration,
        thumbnail: thumbnailUrl, // Use the Cloudinary URL
      };

      await axios.post(`${SERVER_URL}/api/courses`, courseData, config);
      toast.success("Course added successfully!");
      navigate("/courses");
    } catch (error) {
      toast.dismiss();
      console.error("Error adding course:", error);
      toast.error("Failed to add course.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-900 dark:bg-[#1e1e2e] dark:text-white">
      <div className="mt-22 bg-white p-8 rounded-lg shadow-lg w-96 dark:bg-[#2a2a3c]">
        <h1 className="text-2xl font-bold mb-6 text-center">Add New Course</h1>
        <form onSubmit={addCourseHandler}>
          <input
            type="text"
            placeholder="Course Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:focus:ring-orange-500"
          />
          <textarea
            placeholder="Course Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-[#1e1e2e] dark:text-white"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg bg-gray-100 text-gray-900 dark:border-gray-600 dark:bg-[#1e1e2e] dark:text-white"
          >
            <option value="" disabled>Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Duration (in hours)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-[#1e1e2e] dark:text-white"
          />
          <input
            type="file"
            onChange={handleThumbnailChange}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg bg-gray-100 text-gray-900 dark:border-gray-600 dark:bg-[#1e1e2e] dark:text-white"
          />
          {thumbnailPreview && (
            <img
              src={thumbnailPreview}
              alt="Thumbnail Preview"
              className="mt-4 w-full h-auto rounded-lg"
            />
          )}
          <button
            type="submit"
            className="w-full py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-all duration-300"
          >
            Add Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
