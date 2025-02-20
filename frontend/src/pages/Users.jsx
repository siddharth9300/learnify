import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Footer from "../components/Footer";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await axios.get("http://localhost:5000/api/users");
        setUsers(result.data);
        toast.dismiss()
        toast.success("Users fetched successfully!");
      } catch (error) {
        toast.error("Error fetching users: " + (error.response?.data?.message || "Unknown error"));
      }
    };
    fetchUsers();
  }, []);

  const handleDeleteConfirmation = (user) => {
    setSelectedUser(user);
    setDeleteInput("");
    setShowModal(true);
  };

  const deleteUserHandler = async () => {
    if (selectedUser && deleteInput === "delete") {
      try {
        await axios.delete(`http://localhost:5000/api/users/${selectedUser._id}`);
        setUsers(users.filter(user => user._id !== selectedUser._id));
        setShowModal(false);
        toast.success("User deleted successfully!");
      } catch (error) {
        toast.error("Error deleting user: " + (error.response?.data?.message || "Unknown error"));
      }
    }
  };

  // Filter users based on dropdown selection
  const filteredUsers = users.filter(user => {
    if (user.role === "admin") return false; // ❌ Exclude admins
    return filter === "all" || user.role === filter;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#1e1e2e] text-white">
    <div className="min-h-screen bg-[#1e1e2e] text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-orange-500">User Management</h1>

      <div className="mb-6 flex justify-center">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-orange-500"
        >
          <option value="all">All Users</option>
          <option value="instructor">Instructors</option>
          <option value="student">Students</option>
        </select>
      </div>

      <div className="overflow-x-auto bg-gray-800 p-4 rounded-lg shadow-lg">
        <table className="w-full text-sm text-left text-white border border-gray-600">
          <thead className="bg-gray-700 text-orange-400">
            <tr>
              <th className="px-4 py-2 border border-gray-600"></th>
              <th className="px-4 py-2 border border-gray-600">Name</th>
              <th className="px-4 py-2 border border-gray-600">Email</th>
              <th className="px-4 py-2 border border-gray-600">Role</th>
              <th className="px-4 py-2 border border-gray-600 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-400">No users found.</td>
              </tr>
            ) : (
              filteredUsers.map((user, index) => (
                <tr key={user._id} className="border border-gray-600 hover:bg-gray-700">
                  <td className="px-4 py-2 border border-gray-600 text-center">{index + 1}</td>
                  <td className="px-4 py-2 border border-gray-600">{user.name}</td>
                  <td className="px-4 py-2 border border-gray-600">{user.email}</td>
                  <td className="px-4 py-2 border border-gray-600 capitalize">{user.role}</td>
                  <td className="px-4 py-2 border border-gray-600 text-center">
                    <button
                      onClick={() => handleDeleteConfirmation(user)}
                      className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-500 transition-all"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-[#1e1e2e] p-5 rounded-lg shadow-lg w-80 text-center">
            <h2 className="text-xl font-bold mb-3 text-white">Confirm Deletion</h2>
            <p className="mb-3 text-gray-300">
              Type <strong className="text-orange-500">"delete"</strong> to confirm:
            </p>
            <input
              type="text"
              value={deleteInput}
              onChange={(e) => setDeleteInput(e.target.value)}
              className="w-full p-2 border border-gray-600 bg-[#2a2a3a] text-white rounded-md mb-3 text-center text-lg"
              placeholder="Type here..."
            />
            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="w-1/2 bg-gray-600 text-white px-3 py-1 rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={deleteUserHandler}
                className={`w-1/2 ml-2 px-3 py-1 rounded-md text-white ${
                  deleteInput === "delete"
                    ? "bg-orange-500 hover:bg-orange-600"
                    : "bg-gray-500 cursor-not-allowed"
                }`}
                disabled={deleteInput !== "delete"}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    <Footer />
    </div>
  );
};

export default Users;
