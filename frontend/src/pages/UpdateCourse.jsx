import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
const PORT = import.meta.env.VITE_PORT || 5000;
const UpdateCourse = () => {
  const { courseId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      const result = await axios.get(`http://localhost:${PORT}/api/courses/${courseId}`);
      const course = result.data;
      setTitle(course.title);
      setDescription(course.description);
      setCategory(course.category);
      setDuration(course.duration);
      setThumbnailPreview(`http://localhost:${PORT}/${course.thumbnail}`);
    };
    fetchCourse();
  }, [courseId]);

  const updateCourseHandler = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      };
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("duration", duration);
      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }

      await axios.put(`http://localhost:${PORT}/api/courses/${courseId}`, formData, config);
      toast.success("Course updated successfully!");
      navigate("/courses");
    } catch (error) {
      toast.error("Error updating course: " + error.response.data.message);
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e1e2e] text-white">
      <div className="bg-[#2a2a3c] p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Update Course</h1>
        <form onSubmit={updateCourseHandler}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Course Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-600 rounded-lg bg-[#3b3b54] text-white"
            />
          </div>
          <div className="mb-4">
            <textarea
              placeholder="Course Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-gray-600 rounded-lg bg-[#3b3b54] text-white"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 border border-gray-600 rounded-lg bg-[#3b3b54] text-white"
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              placeholder="Duration (in hours)"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full p-3 border border-gray-600 rounded-lg bg-[#3b3b54] text-white"
            />
          </div>
          <div className="mb-4">
            <input
              type="file"
              onChange={handleThumbnailChange}
              className="w-full p-3 border border-gray-600 rounded-lg bg-[#3b3b54] text-white"
            />
            {thumbnailPreview && (
              <img src={thumbnailPreview} alt="Thumbnail Preview" className="mt-4 w-full h-auto rounded-lg" />
            )}
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
          >
            Update Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCourse;