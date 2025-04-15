import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaBook,
  FaClock,
  FaUserGraduate,
  FaChartLine,
  FaChalkboardTeacher,
} from "react-icons/fa";
import Footer from "../components/Footer"; 
// const PORT = import.meta.env.VITE_PORT || 5000;
const SERVER_URL = import.meta.env.VITE_SERVER_URL;const Dashboard = () => {
  const [data, setData] = useState({});
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      try {
        const dashboardRes = await axios.get(
          `${SERVER_URL}/api/dashboard`,
          config
        );
        setData(dashboardRes.data);
        setEnrolledCourses(dashboardRes.data.enrolledCourses);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900 dark:bg-[#1e1e2e] dark:text-white">
      <div className="flex-grow p-8">
        <h1 className="mt-22 text-4xl font-bold mb-8 text-center text-orange-500 dark:text-orange-400">
          📊 Dashboard
        </h1>

        {role === "student" && (
          <div className="p-6 bg-gray-200 shadow-lg rounded-2xl dark:bg-gray-800">
            <h2 className="text-3xl font-bold text-orange-500 flex items-center dark:text-orange-400">
              <FaUserGraduate className="mr-2" /> Student Dashboard
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-gray-300 p-6 rounded-2xl shadow-md text-center hover:shadow-2xl transition dark:bg-gray-900">
                <FaBook className="text-4xl text-orange-500 mx-auto" />
                <p className="text-gray-700 mt-2 dark:text-gray-400">Total Enrolled Courses</p>
                <h3 className="text-2xl font-bold text-orange-500 dark:text-orange-400">
                  {data.totalEnrolledCourses || 0}
                </h3>
              </div>

              <div className="bg-gray-300 p-6 rounded-2xl shadow-md text-center hover:shadow-2xl transition dark:bg-gray-900">
                <FaClock className="text-4xl text-orange-500 mx-auto" />
                <p className="text-gray-700 mt-2 dark:text-gray-400">Upcoming Courses</p>
                <h3 className="text-2xl font-bold text-orange-500 dark:text-orange-400">
                  {data.upcomingCourses || 0}
                </h3>
              </div>

              <div className="bg-gray-300 p-6 rounded-2xl shadow-md text-center hover:shadow-2xl transition dark:bg-gray-900">
                <FaChartLine className="text-4xl text-orange-500 mx-auto" />
                <p className="text-gray-700 mt-2 dark:text-gray-400">Recent Activity</p>
                <h3 className="text-2xl font-bold text-orange-500 dark:text-orange-400">
                  {data.recentActivity || "No activity"}
                </h3>
              </div>
            </div>

            <h3 className="text-2xl font-semibold mt-6 text-orange-500 dark:text-orange-400">
              🎓 Enrolled Courses
            </h3>

            {enrolledCourses.length === 0 ? (
              <p className="text-gray-700 text-lg mt-4 dark:text-gray-400">
                No enrolled courses yet.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                {enrolledCourses.map((course) => (
                  <div
                    key={course._id}
                    className="relative bg-gray-300 p-5 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer dark:bg-gray-900"
                    onClick={() => navigate(`/courses/${course._id}/lectures`)}
                  >
                    <img
                      src={`${course.thumbnail}`}
                      alt={course.title}
                      className="w-full h-48 object-contain bg-gray-300 dark:bg-gray-900"
                    />

                    <div className="mt-3">
                      <h3 className="text-xl font-semibold text-orange-500 dark:text-orange-400">
                        {course.title}
                      </h3>
                      <p className="text-gray-700 text-sm mt-1 dark:text-gray-400">
                        {course.description}
                      </p>
                      <p className="text-gray-700 text-sm dark:text-gray-400">
                        <strong>Category:</strong> {course.category}
                      </p>
                      <p className="text-gray-700 text-sm dark:text-gray-400">
                        <strong>Duration:</strong> {course.duration} hours
                      </p>
                   
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {role === "admin" && (
          <div className="p-6 bg-gray-200 shadow-lg rounded-2xl mt-10 dark:bg-gray-800">
            <h2 className="text-3xl font-bold text-orange-500 flex items-center dark:text-orange-400">
              <FaChalkboardTeacher className="mr-2" /> Admin Dashboard
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-gray-300 p-6 rounded-2xl shadow-md text-center hover:shadow-2xl transition dark:bg-gray-900">
                <FaBook className="text-4xl text-orange-500 mx-auto dark:text-orange-400" />
                <p className="text-gray-700 mt-2 dark:text-gray-400">Total Courses</p>
                <h3 className="text-2xl font-bold text-orange-500 dark:text-orange-400">
                  {data.totalCourses || 0}
                </h3>
              </div>

              <div className="bg-gray-300 p-6 rounded-2xl shadow-md text-center hover:shadow-2xl transition dark:bg-gray-900">
                <FaUserGraduate className="text-4xl text-orange-500 mx-auto dark:text-orange-400" />
                <p className="text-gray-700 mt-2 dark:text-gray-400">Total Students</p>
                <h3 className="text-2xl font-bold text-orange-500 dark:text-orange-400">
                  {data.totalStudents || 0}
                </h3>
              </div>

              <div className="bg-gray-300 p-6 rounded-2xl shadow-md text-center hover:shadow-2xl transition dark:bg-gray-900">
                <FaChalkboardTeacher className="text-4xl text-orange-500 mx-auto dark:text-orange-400" />
                <p className="text-gray-700 mt-2 dark:text-gray-400">Total Instructors</p>
                <h3 className="text-2xl font-bold text-orange-500 dark:text-orange-400">
                  {data.totalInstructors || 0}
                </h3>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
