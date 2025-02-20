// filepath: online-learning-platform/backend/routes/userRoutes.js
const express = require("express");
const { registerUser, loginUser, getUsers, getUserById, updateUser, deleteUser, changePassword, getProfile } = require("../controllers/userController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.post('/register', registerUser);
router.post("/login", loginUser);
router.get("/", getUsers); // Get all users
router.get("/profile", protect, getProfile); // Get logged-in user's profile
router.get("/:userId", getUserById); // Get user by ID
router.put("/:userId", updateUser); // Update user by ID
router.delete("/:userId", deleteUser); // Delete user by ID
router.put("/change-password/:userId", changePassword); // Change user password
router.get("/admin-token", (req, res) => { // New route to expose ADMIN_TOKEN
    res.json({ adminToken: process.env.ADMIN_TOKEN });
});

module.exports = router;