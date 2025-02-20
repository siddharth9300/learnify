import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const PORT = import.meta.env.VITE_PORT || 5000;
const ChangePassword = () => {
  const { userId } = useParams();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const changePasswordHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:${PORT}/api/users/change-password/${userId}`, {
        oldPassword,
        newPassword,
      });
      alert("Password changed successfully!");
    } catch (error) {
      console.error("Error changing password:", error.response.data);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e1e2e]">
      <div className="bg-[#2a2a3c] p-8 rounded-lg shadow-lg w-96 text-white">
        <h1 className="text-2xl font-bold mb-6 text-center">Change Password</h1>
        <form onSubmit={changePasswordHandler}>
          <input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-600 bg-[#1e1e2e] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-600 bg-[#1e1e2e] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            type="submit"
            className="w-full py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-all duration-300"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
