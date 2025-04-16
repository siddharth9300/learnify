import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Footer from "../components/Footer";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const Home = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Featured Courses
        const coursesResponse = await axios.get(`${SERVER_URL}/api/courses`);
        setFeaturedCourses(coursesResponse.data.slice(0, 3)); // Limit to 3 courses

        // Fetch Tutors
        const usersResponse = await axios.get(`${SERVER_URL}/api/users`);
        const instructors = usersResponse.data.filter((user) => user.role === "instructor");
        setTutors(instructors.slice(0, 3)); // Limit to 3 tutors

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleEnroll = async (courseId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      // Redirect to login if the user is not logged in
      navigate("/login");
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post(`${SERVER_URL}/api/courses/enroll`, { courseId }, config);
      toast.success("Successfully enrolled in the course!");
    } catch (error) {
      console.error("Error enrolling in course:", error);
      toast.error(error.response?.data?.message || "Failed to enroll in the course.");
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
      {/* Hero Section */}
      <div className="h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900 dark:bg-[#1e1e2e] dark:text-white">
        <h1 className="text-5xl font-extrabold mb-4">Welcome to the Online Learning Platform</h1>
        <p className="text-lg mb-8 max-w-2xl justify-center text-center">
          Learn from the best instructors, explore a variety of courses, and enhance your skills at your own pace.
        </p>

        <div className="space-x-6">
          <Link
            to="/courses"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            Browse Courses
          </Link>
          <Link
            to="/register"
            className="bg-orange-500 px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition dark:bg-orange-600 dark:hover:bg-orange-500"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Featured Courses Section */}
      <div className="py-12 bg-gray-50 dark:bg-gray-900">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Featured Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          {featuredCourses.map((course) => (
            <div
              key={course._id}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <img
                src={`${course.thumbnail}`}
                alt={course.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{course.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{course.description}</p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                <strong>Duration:</strong> {course.duration} hours
              </p>
              <button
                onClick={() => handleEnroll(course._id)}
                className="block bg-orange-500 text-white text-center py-2 px-2 rounded-lg hover:bg-orange-600 transition dark:bg-orange-600 dark:hover:bg-orange-500"
              >
                Enroll Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Our Tutors Section */}
      <div className="py-12 bg-gray-100 dark:bg-[#1e1e2e]">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Our Tutors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          {tutors.map((tutor) => (
            <div
              key={tutor._id}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{tutor.name}</h3>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Expertise:</strong> {tutor.role}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;