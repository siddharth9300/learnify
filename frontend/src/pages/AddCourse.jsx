import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const PORT = import.meta.env.VITE_PORT || 5000;
const AddCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const navigate = useNavigate();

  const categories = ["Programming", "Design", "Marketing", "Business", "Photography"];

  const addCourseHandler = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("duration", duration);
      formData.append("thumbnail", thumbnail);

      await axios.post(`http://localhost:${PORT}/api/courses`, formData, config);
      toast.success("Course added successfully!");
      navigate("/courses");
    } catch (error) {
      toast.error("Error adding course: " + error.response.data.message);
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e1e2e]">
      <div className="bg-[#2a2a3c] p-8 rounded-lg shadow-lg w-96 text-white">
        <h1 className="text-2xl font-bold mb-6 text-center">Add New Course</h1>
        <form onSubmit={addCourseHandler}>
          <input
            type="text"
            placeholder="Course Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-600 bg-[#1e1e2e] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <textarea
            placeholder="Course Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-600 bg-[#1e1e2e] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-600 bg-[#1e1e2e] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
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
            className="w-full p-3 mb-4 border border-gray-600 bg-[#1e1e2e] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="file"
            onChange={handleThumbnailChange}
            className="w-full p-3 mb-4 border border-gray-600 bg-[#1e1e2e] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {thumbnailPreview && (
            <img src={thumbnailPreview} alt="Thumbnail Preview" className="mt-4 w-full h-auto rounded-lg" />
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
