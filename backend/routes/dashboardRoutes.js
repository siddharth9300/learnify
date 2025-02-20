const express = require('express');
const router = express.Router();
const { getDashboardData } = require('../controllers/dashboardController');
const { protect } = require('../middleware/authMiddleware');

// Routes
router.get('/', protect, getDashboardData); // Fetch dashboard data

module.exports = router;