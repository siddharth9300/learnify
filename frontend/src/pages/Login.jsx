import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post(`${SERVER_URL}/api/users/login`, {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      toast.error("Error logging in: " + error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900 dark:bg-[#1e1e2e] dark:text-white">
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-900 dark:bg-[#1e1e2e] dark:text-white">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96 dark:bg-[#2a2a3c]">
          <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
          <form onSubmit={loginHandler}>
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
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>
          <div className="my-4 text-center">
            <p className="text-gray-700 dark:text-gray-300">
              Not registered yet?{" "}
              <a
                href="/register"
                className="text-blue-600 hover:underline dark:text-orange-400"
              >
                Register here
              </a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;