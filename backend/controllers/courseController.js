const Course = require('../models/Course');
const User = require('../models/User');

// Fetch all courses
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('createdBy', 'name email');
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getCourses = getCourses;

// Fetch lectures for a course
exports.getLectures = async (req, res) => {
  const courseId = req.params.courseId;
  const userId = req.user.id;

  try {
    const course = await Course.findById(courseId).populate('lectures');
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const user = await User.findById(userId);

    if (user.role === 'admin') {
      // Admin can see any course lecture
      return res.status(200).json(course.lectures);
    } else if (user.role === 'instructor') {
      // Instructors can only see lectures of the courses they have created
      if (course.createdBy.toString() !== userId) {
        return res.status(403).json({ message: 'You are not authorized to view these lectures' });
      }
      return res.status(200).json(course.lectures);
    } else if (user.role === 'student') {
      // Students can only see lectures of the courses they are enrolled in
      if (!user.enrolledCourses.includes(courseId)) {
        return res.status(403).json({ message: 'You are not enrolled in this course' });
      }
      return res.status(200).json(course.lectures);
    } else {
      return res.status(403).json({ message: 'You are not authorized to view these lectures' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a lecture to a course
exports.addLecture = async (req, res) => {
  const { title } = req.body;
  const courseId = req.params.courseId;
  const videoUrl = req.file.path; 

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const newLecture = { title, videoUrl };
    course.lectures.push(newLecture);
    await course.save();

    res.status(201).json(newLecture);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new course
exports.addCourse = async (req, res) => {
  const { title, description, category, duration, videos } = req.body;
  const instructor = req.user.id;
  const thumbnail = req.file?.path; // Use optional chaining

  const newCourse = new Course({
    title,
    description,
    category,
    createdBy: instructor,
    duration,
    thumbnail,
    videos,
  });

  try {
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    console.error("Error creating course:", err); // Debugging
    res.status(500).json({ message: err.message });
  }
};

// Update a course
exports.updateCourse = async (req, res) => {
  const { title, description, category, duration, videos } = req.body;
  const courseId = req.params.courseId;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    course.title = title || course.title;
    course.description = description || course.description;
    course.category = category || course.category;
    course.duration = duration || course.duration;
    course.videos = videos || course.videos;

    if (req.file) {
      course.thumbnail = req.file.path;
    }

    await course.save();
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a course
exports.deleteCourse = async (req, res) => {
  const courseId = req.params.courseId;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    await course.deleteOne();
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Enroll in a course
exports.enroll = async (req, res) => {
  const { courseId } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    user.enrolledCourses.push(courseId);
    await user.save();

    const updatedUser = await User.findById(userId).populate('enrolledCourses');

    res.status(200).json({ user: updatedUser });
  } catch (err) {
    console.error("Error enrolling in course:", err);
    res.status(500).json({ message: err.message });
  }
};

// Unenroll from a course
exports.unenroll = async (req, res) => {
  const { courseId } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Ensure courseId is a string for comparison
    user.enrolledCourses = user.enrolledCourses.filter(id => id.toString() !== courseId);

    await user.save();

    // Populate enrolledCourses before sending the response
    const updatedUser = await User.findById(userId).populate('enrolledCourses');

    res.status(200).json({ user: updatedUser });
  } catch (err) {
    console.error("Error unenrolling from course:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.getCourse = async (req, res) => {
  const courseId = req.params.courseId;

  console.log("Fetching course with ID:", courseId); // Debugging

  try {
    const course = await Course.findById(courseId).populate('createdBy', 'name email');
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (err) {
    console.error("Error fetching course:", err); // Debugging
    res.status(500).json({ message: err.message });
  }
};