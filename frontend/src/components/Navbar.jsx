import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="fixed w-full bg-gray-900 bg-opacity-80 backdrop-blur-lg shadow-lg border-b border-gray-700">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4">
        
        <Link to="/" className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">
          Learnify
        </Link>

        <ul className="hidden md:flex space-x-8 font-semibold text-lg">
          <li>
            <Link to="/" className="text-white hover:text-orange-400 transition-all duration-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/courses" className="text-white hover:text-orange-400 transition-all duration-300">
              Courses
            </Link>
          </li>

          {role === "instructor" && (
            <li>
              <Link to="/add-course" className="text-white hover:text-orange-400 transition-all duration-300">
                Add Course
              </Link>
            </li>
          )}

          {role === "admin" && (
            <li>
              <Link to="/users" className="text-white hover:text-orange-400 transition-all duration-300">
                Users
              </Link>
            </li>
          )}

          {token && role !== "instructor" && (
            <li>
              <Link to="/dashboard" className="text-white hover:text-orange-400 transition-all duration-300">
                Dashboard
              </Link>
            </li>
          )}

          {token && (
            <li>
              <Link to="/profile" className="text-white hover:text-orange-400 transition-all duration-300">
                Profile
              </Link>
            </li>
          )}
        </ul>

        <div>
          {token ? (
            <button
              onClick={logoutHandler}
              className="bg-red-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-600 transition-all duration-300 shadow-lg flex items-center"
            >
              🚪 Logout
            </button>
          ) : (
            <div className="flex space-x-4">
              <Link to="/login" className="text-white hover:text-orange-400 transition-all duration-300">
                🔑 Login
              </Link>
              <Link
                to="/register"
                className="text-white hover:text-orange-400 transition-all duration-300"
              >
                📝 Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
