import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AddLecture = () => {
  const { courseId } = useParams();
  const [title, setTitle] = useState("");
  const [video, setVideo] = useState(null);
  const navigate = useNavigate();

  const addLectureHandler = async (e) => {
    e.preventDefault();

    if (!title || !video) {
      toast.error("Please fill in all fields");
      return;
    }

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
      formData.append("video", video);

      await axios.post(`http://localhost:5000/api/courses/${courseId}/lectures`, formData, config);
      toast.success("Lecture added successfully!");
      navigate(`/courses/${courseId}/lectures`);
    } catch (error) {
      toast.error("Error adding lecture: " + error.response.data.message);
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideo(file);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e1e2e] text-white">
      <div className="bg-[#2a2a3c] p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Add Lecture</h1>
        <form onSubmit={addLectureHandler}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-600 rounded-lg bg-[#3b3b54] text-white"
            />
          </div>
          <div className="mb-4">
            <input
              type="file"
              onChange={handleVideoChange}
              className="w-full p-3 border border-gray-600 rounded-lg bg-[#3b3b54] text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
          >
            Add Lecture
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLecture;