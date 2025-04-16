const express = require('express');
const router = express.Router();
const { getDashboardData, getInstructorDashboardData } = require('../controllers/dashboardController');
const { protect } = require('../middleware/authMiddleware');

// Routes
router.get('/', protect, getDashboardData); // Fetch dashboard data
router.get("/instructor", protect, getInstructorDashboardData); // Route for instructor dashboard

module.exports = router;