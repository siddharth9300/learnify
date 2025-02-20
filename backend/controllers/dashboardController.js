const User = require('../models/User');
const Course = require('../models/Course');

exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log("Dashboard User ID:", userId); // Debugging: Check user ID

        const user = await User.findById(userId).populate('enrolledCourses');

        if (!user) {
            console.log("User not found"); // Debugging: Check if user is found
            return res.status(404).json({ message: 'User not found' });
        }

        console.log("Enrolled Courses from DB:", user.enrolledCourses); // Debugging: Check enrolled courses

        const totalStudents = await User.countDocuments({ role: 'student' });
        const totalInstructors = await User.countDocuments({ role: 'instructor' });
        const totalCourses = await Course.countDocuments();
        const totalEnrolledCourses = user.enrolledCourses.length;

        res.status(200).json({
            totalStudents,
            totalInstructors,
            totalCourses,
            totalEnrolledCourses,
            enrolledCourses: user.enrolledCourses,
        });
    } catch (err) {
        console.error("Error fetching dashboard data:", err);
        res.status(500).json({ message: err.message });
    }
};