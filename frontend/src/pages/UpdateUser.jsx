import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
// const PORT = import.meta.env.VITE_PORT || 5000;
const SERVER_URL = import.meta.env.VITE_SERVER_URL;const UpdateUser = () => {
  const { userId } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`${SERVER_URL}/api/users/${userId}`);
        setName(result.data.name);
        setEmail(result.data.email);
      } catch (error) {
        toast.error("Error fetching user: " + error.response?.data?.message || "Unknown error");
      }
    };
    fetchUser();
  }, [userId]);

  const updateUserHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${SERVER_URL}/api/users/${userId}`, {
        name,
        email,
        password,
      });
      toast.success("User updated successfully!");
    } catch (error) {
      toast.error("Error updating user: " + error.response?.data?.message || "Unknown error");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-[#2a2a3c] rounded-lg shadow-lg text-white">
      <h1 className="text-2xl font-bold mb-4">Update User</h1>
      <form onSubmit={updateUserHandler}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 bg-[#1e1e2e] text-white border border-orange-500 rounded-lg"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 bg-[#1e1e2e] text-white border border-orange-500 rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 bg-[#1e1e2e] text-white border border-orange-500 rounded-lg"
        />
        <button
          type="submit"
          className="w-full bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600 transition"
        >
          Update User
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
