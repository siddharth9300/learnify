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
  const [thumbnail, setThumbnail] = useState(null); // Store the selected file
  const [thumbnailPreview, setThumbnailPreview] = useState(null); // Store the preview URL
  const [existingThumbnail, setExistingThumbnail] = useState(null); // Store the existing thumbnail URL
  const [loading, setLoading] = useState(true);
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
        setExistingThumbnail(course.thumbnail); // Set the existing thumbnail URL
        setLoading(false);
      } catch (error) {
        toast.error("Error fetching course details: " + (error.response?.data?.message || "Unknown error"));
        setLoading(false);
      }
    };
    fetchCourse();
  }, [courseId]);

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
      throw error;
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

  const updateCourseHandler = async (e) => {
    e.preventDefault();

    try {
      let thumbnailUrl = existingThumbnail; // Use the existing thumbnail if no new file is uploaded

      if (thumbnail) {
        toast.loading("Uploading new thumbnail...");
        thumbnailUrl = await uploadToCloudinary(thumbnail); // Upload the new file to Cloudinary
        toast.dismiss();
      }

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
        thumbnail: thumbnailUrl, // Use the updated or existing thumbnail URL
      };

      const response = await axios.put(`${SERVER_URL}/api/courses/${courseId}`, courseData, config);
      console.log("API Response:", response.data); // Debug log
      setExistingThumbnail(thumbnailUrl); // Update the state with the new thumbnail URL
      toast.success("Course updated successfully!");
      navigate("/courses");
    } catch (error) {
      toast.dismiss();
      console.error("Error updating course:", error);
      toast.error("Failed to update course.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-900 dark:bg-[#1e1e2e] dark:text-white">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid dark:border-orange-500"></div>
    </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-900 dark:bg-[#1e1e2e] dark:text-white pt-16">
      <div className="my-22 bg-white p-8 rounded-lg shadow-lg w-96 dark:bg-gray-800">
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
            {thumbnailPreview ? (
              <img
                src={thumbnailPreview}
                alt="New Thumbnail Preview"
                className="mt-4 w-full h-auto rounded-lg"
              />
            ) : (
              <img
                src={existingThumbnail}
                alt="Existing Thumbnail"
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