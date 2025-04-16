const express = require("express");
const router = express.Router();
const multer = require('multer');
const {
  getCourses,
  addCourse,
  updateCourse,
  deleteCourse,
  enroll,
  unenroll,
  getLectures,
  addLecture,
  getCourse,
  deleteLecture,
} = require("../controllers/courseController");
const { protect } = require("../middleware/authMiddleware");


const upload = multer({ dest: 'uploads/' }); // Configure multer

// Routes
router.get("/", getCourses); // Fetch all courses
router.get("/:courseId", protect, getCourse); // Fetch a single course
router.post("/", protect, upload.single("thumbnail"), addCourse); // Add a new course
router.put("/:courseId", protect, upload.single("thumbnail"), updateCourse); // Update a course
router.delete("/:courseId", protect, deleteCourse); // Delete a course
router.post("/enroll", protect, enroll); // Enroll in a course
router.post("/unenroll", protect, unenroll); // Unenroll from a course
router.get("/:courseId/lectures", protect, getLectures); // Fetch lectures for a course
router.post("/:courseId/lectures", protect, upload.single("video"), addLecture); // Add a lecture to a course
router.delete('/:courseId/lectures/:lectureId', protect, deleteLecture); // Delete a lecture from a course

module.exports = router;