import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Footer from "../components/Footer";
const PORT = import.meta.env.VITE_PORT || 5000;
const Lectures = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [lectures, setLectures] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const result = await axios.get(`http://localhost:${PORT}/api/courses/${courseId}/lectures`, config);
        setLectures(result.data);
        setIsAuthorized(true);
        toast.success("Lectures fetched successfully!");
      } catch (error) {
        if (error.response?.status === 403) {
          setIsAuthorized(false);
          toast.error("You are not authorized to view these lectures.");
        } else {
          toast.error("Error fetching lectures: " + (error.response?.data?.message || "Unknown error"));
        }
      }
    };
    fetchLectures();
  }, [courseId]);

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="text-lg font-semibold text-gray-300">You are not authorized to view these lectures.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#1e1e2e] text-white">
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center text-orange-400">Lectures</h1>

        {role === "instructor" && (
          <div className="flex justify-center mb-6">
            <button
              onClick={() => navigate(`/courses/${courseId}/add-lecture`)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-all"
            >
              + Add Lecture
            </button>
          </div>
        )}

        {lectures.length === 0 ? (
          <p className="text-center text-gray-400 text-lg">No lectures available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {lectures.map((lecture) => (
              <div key={lecture._id} className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-gray-700">
                <h2 className="text-xl font-semibold text-white mb-3">{lecture.title}</h2>
                <div className="relative">
                  <video controls className="w-full h-48 object-cover rounded-lg border border-gray-600">
                    <source src={`http://localhost:${PORT}/${lecture.videoUrl}`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default Lectures;
