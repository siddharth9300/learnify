import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
const PORT = import.meta.env.VITE_PORT || 5000;
const UserDetails = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`http://localhost:${PORT}/api/users/${userId}`);
        setUser(result.data);
        toast.success("User details fetched successfully!");
      } catch (error) {
        toast.error("Error fetching user: " + (error.response?.data?.message || "Unknown error"));
      }
    };
    fetchUser();
  }, [userId]);

  if (!user) return <div className="text-white text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-md mx-auto p-6 bg-[#2a2a3c] rounded-lg shadow-lg text-white">
      <h1 className="text-2xl font-bold">{user.name}</h1>
      <p className="text-gray-400">{user.email}</p>
    </div>
  );
};

export default UserDetails;
