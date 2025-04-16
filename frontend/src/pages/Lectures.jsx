import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Footer from "../components/Footer";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const Lectures = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [lectures, setLectures] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const role = localStorage.getItem("role");
  const [deleteInput, setDeleteInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deleteLectureId, setDeleteLectureId] = useState(null);

  // Move fetchLectures outside of useEffect
  const fetchLectures = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const result = await axios.get(`${SERVER_URL}/api/courses/${courseId}/lectures`, config);
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

  useEffect(() => {
    fetchLectures();
  }, [courseId]);

  const handleDeleteLecture = async (lectureId) => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(`${SERVER_URL}/api/courses/${courseId}/lectures/${lectureId}`, config);

      setShowModal(false);
      setDeleteInput("");
      toast.success("Lecture deleted successfully!");

      // Refresh lectures after deletion
      fetchLectures();
    } catch (error) {
      toast.error("Error deleting lecture: " + (error.response?.data?.message || "Unknown error"));
    }
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-900 dark:bg-[#1e1e2e] dark:text-white">
        <p className="text-lg font-semibold text-gray-300">You are not authorized to view these lectures.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900 dark:bg-[#1e1e2e] dark:text-white">
      <div className="min-h-screen bg-gray-100 text-gray-900 p-8 dark:bg-[#1e1e2e] dark:text-white">
        <div className="max-w-5xl mt-22 mx-auto">
          <h1 className="mt-22 text-4xl font-bold mb-6 text-center text-orange-500 dark:text-orange-400">Lectures</h1>

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
                      <source src={`${SERVER_URL}/${lecture.videoUrl}`} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  {role === "instructor" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteLectureId(lecture._id);
                        setShowModal(true);
                      }}
                      className="mt-3 bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg w-full transition"
                    >
                      Delete Lecture
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center backdrop-opacity-[70] backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl w-96 transform scale-95 animate-fadeIn">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white text-center">Confirm Deletion</h2>
              <p className="mb-4 text-gray-700 dark:text-gray-300 text-center">
                Type <strong className="text-orange-500 dark:text-orange-400">"delete"</strong> to confirm:
              </p>

              <input
                type="text"
                value={deleteInput}
                onChange={(e) => setDeleteInput(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg mb-4 text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-orange-500"
                placeholder="Type here..."
              />

              <div className="flex justify-between">
                <button
                  onClick={() => setShowModal(false)}
                  className="w-1/2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteLecture(deleteLectureId)}
                  className={`w-1/2 ml-2 px-4 py-2 rounded-lg transition-all duration-300 text-white ${
                    deleteInput === "delete"
                      ? "bg-orange-500 hover:bg-orange-600"
                      : "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                  }`}
                  disabled={deleteInput !== "delete"}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Lectures;
