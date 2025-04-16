import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
// const PORT = import.meta.env.VITE_PORT || 5000;

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deleteCourseId, setDeleteCourseId] = useState(null);
  const [deleteInput, setDeleteInput] = useState("");
  const role = localStorage.getItem("role");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [refreshEnrolledCourses, setRefreshEnrolledCourses] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const result = await axios.get(`${SERVER_URL}/api/courses`);
        setCourses(result.data);
      } catch (error) {
        toast.error("Failed to fetch courses.");
      } finally {
        setLoading(false);
      }
    };

    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const result = await axios.get(`${SERVER_URL}/api/users/profile`, config);
        setUser(result.data);
        toast.dismiss();
        toast.success("Profile fetched successfully!");
      } catch (error) {
        toast.dismiss();
        toast.error("Error fetching profile: " + (error.response?.data?.message || "Unknown error"));
      } finally {
        setLoading(false);
      }
    };

    const fetchEnrolledCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const result = await axios.get(`${SERVER_URL}/api/users/profile`, config);
        console.log("Fetched enrolled courses:", result.data.enrolledCourses.map(course => course._id));
        setEnrolledCourses(result.data.enrolledCourses.map(course => course._id));
      } catch (error) {
        toast.error("Failed to fetch enrolled courses.");
      }
    };

    fetchProfile();
    fetchCourses();
    fetchEnrolledCourses();
    console.log("useEffect triggered");
    setRefreshEnrolledCourses(false); // Reset refresh state
  }, [refreshEnrolledCourses]);

  const handleCourseAction = async (courseId, action) => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const url = `${SERVER_URL}/api/courses/${action}`;
      const response = await axios.post(url, { courseId }, config);

      if (action === "enroll") {
        toast.success("Enrolled successfully!");
        const newEnrolledCourses = response.data.user.enrolledCourses.map(course => course._id);
        console.log("Enrolled courses after enrolling:", newEnrolledCourses);
        setEnrolledCourses(newEnrolledCourses);
      } else {
        toast.success("Unenrolled successfully!");
        // Update enrolledCourses state after unenrolling
        const newEnrolledCourses = response.data.user.enrolledCourses.map(course => course._id);
        console.log("Enrolled courses after unenrolling:", newEnrolledCourses);
        setEnrolledCourses(newEnrolledCourses);
      }
      setRefreshEnrolledCourses(true); // Trigger refresh
    } catch (error) {
      toast.error("Error: " + (error.response?.data?.message || "Unknown error"));
    }
  };

  const handleDeleteCourse = async () => {
    if (deleteInput !== "delete") {
      toast.error("Please type 'delete' to confirm.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(`${SERVER_URL}/api/courses/${deleteCourseId}`, config);
      toast.success("Course deleted successfully!");
      setCourses(courses.filter((course) => course._id !== deleteCourseId));
      setShowModal(false);
      setDeleteInput("");
    } catch (error) {
      toast.error("Error deleting course: " + (error.response?.data?.message || "Unknown error"));
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
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900 dark:bg-[#1e1e2e] dark:text-white">
      <div className="min-h-screen bg-gray-100 text-gray-900 p-8 dark:bg-[#1e1e2e] dark:text-white">
        <h1 className="mt-22 text-4xl font-bold mb-8 text-center text-orange-500 dark:text-orange-400">Available Courses</h1>

      {courses.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">No courses available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 overflow-hidden border border-gray-300 dark:border-gray-700 cursor-pointer"
              onClick={() => navigate(`/courses/${course._id}/lectures`)}
            >
              <img
                src={`${course.thumbnail}`}
                alt={course.title}
                className="w-full h-48 object-contain bg-gray-100 dark:bg-gray-900"
              />

              <div className="p-5">
                <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">{course.title}</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-3">{course.description}</p>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  <strong>Category:</strong> {course.category}
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  <strong>Duration:</strong> {course.duration} hours
                </p>

                {course.createdBy && (
                  <p className="text-gray-600 dark:text-gray-400">
                    <strong>Instructor:</strong> {course.createdBy.name} ({course.createdBy.email})
                  </p>
                )}

                {role === "student" && (
                  enrolledCourses.includes(course._id) ? (
                    <button
                      onClick={(e) => { e.stopPropagation(); handleCourseAction(course._id, "unenroll"); }}
                      className="mt-3 bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg w-full transition"
                    >
                      Unenroll
                    </button>
                  ) : (
                    <button
                      onClick={(e) => { e.stopPropagation(); handleCourseAction(course._id, "enroll"); }}
                      className="mt-3 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-lg w-full transition"
                    >
                      Enroll
                    </button>
                  )
                )}

                {role === "instructor" && course.createdBy.email === user?.email && (
                  <div className="mt-4 space-y-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/update-course/${course._id}`);
                      }}
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg w-full transition"
                    >
                      Update Course
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteCourseId(course._id);
                        setShowModal(true);
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg w-full transition"
                    >
                      Delete Course
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center  backdrop-opacity-[70] backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl w-96 transform scale-95 animate-fadeIn">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white text-center">
              Confirm Deletion
            </h2>
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
                onClick={handleDeleteCourse}
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
    <Footer/>
    </div>
  );
};

export default Courses;