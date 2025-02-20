import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const result = await axios.get("http://localhost:5000/api/users/profile", config);
        setUser(result.data);
        toast.dismiss();
        toast.success("Profile fetched successfully!");
      } catch (error) {
        toast.dismiss();
        toast.error("Error fetching profile: " + (error.response?.data?.message || "Unknown error"));
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="text-lg animate-pulse">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="text-lg text-red-500">Failed to load profile.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
        <h1 className="text-3xl font-bold mb-6 text-center text-orange-400">Profile</h1>
        <div className="space-y-4">
          <p className="text-lg"><strong className="text-gray-300">Name:</strong> {user.name}</p>
          <p className="text-lg"><strong className="text-gray-300">Email:</strong> {user.email}</p>
          <p className="text-lg"><strong className="text-gray-300">Role:</strong> {user.role}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
