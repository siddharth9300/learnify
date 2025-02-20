import React, { useState } from "react";
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

  const registerHandler = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !role) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/users/register", {
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
    <div className="flex flex-col min-h-screen bg-[#1e1e2e] text-white">
      <div className="min-h-screen flex items-center justify-center bg-[#1e1e2e] text-white">
        <div className="bg-[#2a2a3c] p-8 rounded-lg shadow-lg w-96">
          <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
          <form onSubmit={registerHandler}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-600 rounded-lg bg-[#3b3b54] text-white"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-600 rounded-lg bg-[#3b3b54] text-white"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-600 rounded-lg bg-[#3b3b54] text-white"
              />
            </div>
            <div className="mb-4">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-3 border border-gray-600 rounded-lg bg-[#3b3b54] text-white"
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;