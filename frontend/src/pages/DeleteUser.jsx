import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
// const PORT = import.meta.env.VITE_PORT || 5000;
const SERVER_URL = import.meta.env.VITE_SERVER_URL;const DeleteUser = () => {
  const { userId } = useParams();
  const [message, setMessage] = useState("");

  const deleteUserHandler = async () => {
    try {
      await axios.delete(`${SERVER_URL}/api/users/${userId}`);
      setMessage("User deleted successfully!");
      toast.success("User deleted successfully!");
    } catch (error) {
      toast.error("Error deleting user: " + error.response.data.message);
      setMessage("Error deleting user.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e1e2e] text-white p-6">
      <div className="max-w-md w-full bg-[#2a2a3c] p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Delete User</h1>
        <button
          onClick={deleteUserHandler}
          className="w-full bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition"
        >
          Delete User
        </button>
        {message && <p className="mt-4 text-center text-gray-400">{message}</p>}
      </div>
    </div>
  );
};

export default DeleteUser;
