import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard"); // Redirect logged-in users to the dashboard
    }
  }, [navigate]);

  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  const registerHandler = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !role) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await axios.post(`${SERVER_URL}/api/users/register`, {
        name,
        email,
        password,
        role,
      });
      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      toast.error("Error registering: " + error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen pt-12 bg-gray-100 text-gray-900 dark:bg-[#1e1e2e] dark:text-white">
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-900 dark:bg-[#1e1e2e] dark:text-white">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96 dark:bg-[#2a2a3c]">
          <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
          <form onSubmit={registerHandler}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:focus:ring-orange-500"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:focus:ring-orange-500"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:focus:ring-orange-500"
              />
            </div>
            <div className="mb-4">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:focus:ring-orange-500"
              >
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
            >
              Register
            </button>
          </form>
          <div className="my-4 text-center">
            <p className="text-gray-700 dark:text-gray-300">
              Already registered?{" "}
              <a
                href="/login"
                className="text-blue-600 hover:underline dark:text-orange-400"
              >
                Login here
              </a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;