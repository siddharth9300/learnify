import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../public/logo1.png"; // Import the logo image

// import logo form "../logo.png";
const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="fixed w-full bg-white shadow-lg border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4">
        {/* <Link
          to="/"
          className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 dark:from-orange-400 dark:to-yellow-300"
        >
          Learnify
        </Link> */}

        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Learnify Logo" className="h-14  object-contain" />
          <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 dark:from-orange-400 dark:to-yellow-300">
            Learnify
          </span>
        </Link>

        <ul className="hidden md:flex space-x-8 font-semibold text-lg">
          <li>
            <Link
              to="/"
              className="text-gray-900 hover:text-blue-500 transition-all duration-300 dark:text-gray-200 dark:hover:text-orange-400"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/courses"
              className="text-gray-900 hover:text-blue-500 transition-all duration-300 dark:text-gray-200 dark:hover:text-orange-400"
            >
              Courses
            </Link>
          </li>

          {role === "instructor" && (
            <li>
              <Link
                to="/add-course"
                className="text-gray-900 hover:text-blue-500 transition-all duration-300 dark:text-gray-200 dark:hover:text-orange-400"
              >
                Add Course
              </Link>
            </li>
          )}

          {role === "admin" && (
            <li>
              <Link
                to="/users"
                className="text-gray-900 hover:text-blue-500 transition-all duration-300 dark:text-gray-200 dark:hover:text-orange-400"
              >
                Users
              </Link>
            </li>
          )}

          {token && role !== "instructor" && (
            <li>
              <Link
                to="/dashboard"
                className="text-gray-900 hover:text-blue-500 transition-all duration-300 dark:text-gray-200 dark:hover:text-orange-400"
              >
                Dashboard
              </Link>
            </li>
          )}

          {token && (
            <li>
              <Link
                to="/profile"
                className="text-gray-900 hover:text-blue-500 transition-all duration-300 dark:text-gray-200 dark:hover:text-orange-400"
              >
                Profile
              </Link>
            </li>
          )}
        </ul>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="bg-gray-200 text-gray-900 px-4 py-2 rounded-full font-semibold hover:bg-gray-300 transition-all duration-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>

          {token ? (
            <button
              onClick={logoutHandler}
              className="bg-red-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-600 transition-all duration-300 shadow-lg flex items-center"
            >
              🚪 Logout
            </button>
          ) : (
            <div className="flex space-x-4">
              <Link
                to="/login"
                className="text-gray-900 hover:text-blue-500 transition-all duration-300 dark:text-gray-200 dark:hover:text-orange-400"
              >
                🔑 Login
              </Link>
              <Link
                to="/register"
                className="text-gray-900 hover:text-blue-500 transition-all duration-300 dark:text-gray-200 dark:hover:text-orange-400"
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
