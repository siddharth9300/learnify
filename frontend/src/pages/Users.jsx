import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Footer from "../components/Footer";
// const PORT = import.meta.env.VITE_PORT || 5000;
const SERVER_URL = import.meta.env.VITE_SERVER_URL;const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await axios.get(`${SERVER_URL}/api/users`);
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
        await axios.delete(`${SERVER_URL}/api/users/${selectedUser._id}`);
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
    <div className="flex flex-col min-h-screen   text-gray-900 dark:bg-[#1e1e2e] dark:text-white">
      <div className="min-h-screen bg-gray-100 text-gray-900 p-6 dark:bg-[#1e1e2e] dark:text-white">
        <h1 className="text-3xl font-bold mb-6 text-center text-orange-500 dark:text-orange-400">
          User Management
        </h1>

        <div className="mb-6 mt-12 flex justify-center">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 bg-gray-200 text-gray-900 rounded-lg border border-gray-400 focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
          >
            <option value="all">All Users</option>
            <option value="instructor">Instructors</option>
            <option value="student">Students</option>
          </select>
        </div>

        <div className="overflow-x-auto bg-gray-200 p-4 rounded-lg shadow-lg dark:bg-gray-800">
          <table className="w-full text-sm text-left text-gray-900 border border-gray-400 dark:text-white dark:border-gray-600">
            <thead className="bg-gray-300 text-orange-500 dark:bg-gray-700 dark:text-orange-400">
              <tr>
                <th className="px-4 py-2 border border-gray-400 dark:border-gray-600"></th>
                <th className="px-4 py-2 border border-gray-400 dark:border-gray-600">Name</th>
                <th className="px-4 py-2 border border-gray-400 dark:border-gray-600">Email</th>
                <th className="px-4 py-2 border border-gray-400 dark:border-gray-600">Role</th>
                <th className="px-4 py-2 border border-gray-400 dark:border-gray-600 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500 dark:text-gray-400">
                    No users found.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, index) => (
                  <tr
                    key={user._id}
                    className="border border-gray-400 hover:bg-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                  >
                    <td className="px-4 py-2 border border-gray-400 text-center dark:border-gray-600">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 border border-gray-400 dark:border-gray-600">{user.name}</td>
                    <td className="px-4 py-2 border border-gray-400 dark:border-gray-600">{user.email}</td>
                    <td className="px-4 py-2 border border-gray-400 capitalize dark:border-gray-600">
                      {user.role}
                    </td>
                    <td className="px-4 py-2 border border-gray-400 text-center dark:border-gray-600">
                      <button
                        onClick={() => handleDeleteConfirmation(user)}
                        className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-500 transition-all dark:bg-red-700 dark:hover:bg-red-600"
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
          <div className="fixed inset-0 flex items-center justify-center  backdrop-opacity-[70] backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl w-96 transform scale-95 animate-fadeIn">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white text-center">
              Confirm Deletion
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300 text-center">
              Type <strong className="text-orange-500 dark:text-orange-400">"delete"</strong> to confirm:
            </p>

            <input
              type="text"
              value={deleteInput}
              onChange={(e) => setDeleteInput(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg mb-4 text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-orange-500"
              placeholder="Type here..."
            />

            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="w-1/2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={deleteUserHandler}
                className={`w-1/2 ml-2 px-4 py-2 rounded-lg transition-all duration-300 text-white ${
                  deleteInput === "delete"
                    ? "bg-orange-500 hover:bg-orange-600"
                    : "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
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
