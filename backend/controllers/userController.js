const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Course = require('../models/Course'); // Import the Course model

exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) return res.status(400).json({ message: "User already exists" });

  // Remove the check for the admin token
  if (role === 'admin') {
    const adminToken = req.headers['x-admin-token'];
    if (!adminToken || adminToken !== process.env.ADMIN_TOKEN) {
      return res.status(403).json({ message: "Not authorized to create admin account" });
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword, role });

  res.status(201).json({ _id: user.id, name: user.name, email: user.email, role: user.role });
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "30d" });
    res.json({ _id: user.id, name: user.name, email: user.email, role: user.role, token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Find and delete courses created by the user
    const coursesToDelete = await Course.find({ createdBy: req.params.userId });
    for (const course of coursesToDelete) {
      await Course.findByIdAndDelete(course._id);
    }

    await user.deleteOne();
    res.json({ message: "User and associated courses removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Old password is incorrect" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: 'enrolledCourses',
      populate: { path: 'lectures' }
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  const { firstName, lastName, email } = req.body;
  const userId = req.user ? req.user._id : null; // Ensure req.user exists

  console.log("Updating Profile for User ID:", userId); // Debugging line

  if (!userId) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;

    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};