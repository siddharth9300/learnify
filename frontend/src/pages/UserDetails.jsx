import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
// const PORT = import.meta.env.VITE_PORT || 5000;
const SERVER_URL = import.meta.env.VITE_SERVER_URL;const UserDetails = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`${SERVER_URL}/api/users/${userId}`);
        setUser(result.data);
        toast.success("User details fetched successfully!");
      } catch (error) {
        toast.error("Error fetching user: " + (error.response?.data?.message || "Unknown error"));
      }
    };
    fetchUser();
  }, [userId]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-900 dark:bg-[#1e1e2e] dark:text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid dark:border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-[#2a2a3c] rounded-lg shadow-lg text-white">
      <h1 className="text-2xl font-bold">{user.name}</h1>
      <p className="text-gray-400">{user.email}</p>
    </div>
  );
};

export default UserDetails;
