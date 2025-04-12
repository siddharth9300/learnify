import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
// const PORT = import.meta.env.VITE_PORT || 5000;
const SERVER_URL = import.meta.env.VITE_SERVER_URL;const ChangePassword = () => {
  const { userId } = useParams();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const changePasswordHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${SERVER_URL}/api/users/change-password/${userId}`, {
        oldPassword,
        newPassword,
      });
      alert("Password changed successfully!");
    } catch (error) {
      console.error("Error changing password:", error.response.data);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-900 dark:bg-[#1e1e2e] dark:text-white">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 dark:bg-[#2a2a3c]">
        <h1 className="text-2xl font-bold mb-6 text-center">Change Password</h1>
        <form onSubmit={changePasswordHandler}>
          <input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg bg-gray-100 text-gray-900 dark:border-gray-600 dark:bg-[#1e1e2e] dark:text-white"
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg bg-gray-100 text-gray-900 dark:border-gray-600 dark:bg-[#1e1e2e] dark:text-white"
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
