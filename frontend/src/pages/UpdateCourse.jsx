import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const UpdateCourse = () => {
  const { courseId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const result = await axios.get(`${SERVER_URL}/api/courses/${courseId}`, config);
        const course = result.data;

        // Prefill form fields with course data
        setTitle(course.title);
        setDescription(course.description);
        setCategory(course.category);
        setDuration(course.duration);
        setThumbnailPreview(`${SERVER_URL}/${course.thumbnail}`);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        toast.error("Error fetching course details: " + (error.response?.data?.message || "Unknown error"));
        setLoading(false); // Ensure loading is set to false even if there's an error
      }
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
          "Content-Type": "multipart/form-data",
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

      await axios.put(`${SERVER_URL}/api/courses/${courseId}`, formData, config);
      toast.success("Course updated successfully!");
      navigate("/courses");
    } catch (error) {
      toast.error("Error updating course: " + (error.response?.data?.message || "Unknown error"));
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-900 dark:bg-[#1e1e2e] dark:text-white">
        <p className="text-lg animate-pulse">Loading course details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-900 dark:bg-[#1e1e2e] dark:text-white pt-16">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 dark:bg-gray-800">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-600 dark:text-orange-400">
          Update Course
        </h1>
        <form onSubmit={updateCourseHandler}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Course Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:focus:ring-orange-500"
            />
          </div>
          <div className="mb-4">
            <textarea
              placeholder="Course Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:focus:ring-orange-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:focus:ring-orange-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              placeholder="Duration (in hours)"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:focus:ring-orange-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="file"
              onChange={handleThumbnailChange}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:focus:ring-orange-500"
            />
            {thumbnailPreview && (
              <img
                src={thumbnailPreview}
                alt="Thumbnail Preview"
                className="mt-4 w-full h-auto rounded-lg"
              />
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