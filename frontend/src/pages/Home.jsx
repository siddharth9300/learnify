import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#1e1e2e] text-white">
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-600 to-purple-700 text-white text-center dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900 dark:text-gray-200"> {/* Added dark mode styles */}
      <h1 className="text-5xl font-extrabold mb-4">Welcome to the Online Learning Platform</h1>
      <p className="text-lg mb-8 max-w-2xl">
        Learn from the best instructors, explore a variety of courses, and enhance your skills at your own pace.
      </p>

      <div className="space-x-6">
        <Link to="/courses" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"> {/* Added dark mode styles */}
          Browse Courses
        </Link>
        <Link to="/register" className="bg-orange-500 px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition dark:bg-orange-600 dark:hover:bg-orange-500"> {/* Added dark mode styles */}
          Get Started
        </Link>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default Home;