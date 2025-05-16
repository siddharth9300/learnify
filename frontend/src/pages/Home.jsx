import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Footer from "../components/Footer";
import students from "../../public/students.png"; // Import the logo image
import avtar from "../../public/avtar.png"; // Import the logo image

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const Home = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [categories] = useState([
    { name: "WordPress Development", courses: 12 },
    { name: "Web Development", courses: 45 },
    { name: "App Development", courses: 30 },
    { name: "JavaScript", courses: 50 },
    { name: "IT & Software", courses: 20 },
    { name: "Graphics Design", courses: 25 },
  ]);
  const [tutors, setTutors] = useState([]);
  const [testimonials] = useState([
    {
      id: 1,
      message: "This platform has transformed my career!",
      name: "John Doe",
      role: "Software Engineer",
      avatar: "/assets/avatar1.jpg",
    },
    {
      id: 2,
      message: "The courses are well-structured and easy to follow.",
      name: "Jane Smith",
      role: "Graphic Designer",
      avatar: "/assets/avatar2.jpg",
    },
    {
      id: 3,
      message: "I love the flexibility and quality of the content.",
      name: "Emily Johnson",
      role: "Digital Marketer",
      avatar: "/assets/avatar3.jpg",
    },
  ]);
  const [faqs] = useState([
    {
      id: 1,
      question: "How do I enroll in a course?",
      answer: "Simply click on the 'Enroll Now' button on the course page.",
    },
    {
      id: 2,
      question: "What payment methods do you accept?",
      answer: "We accept credit cards, PayPal, and other major payment methods.",
    },
    {
      id: 3,
      question: "Can I get a refund?",
      answer: "Yes, we offer a 30-day money-back guarantee for all courses.",
    },
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/courses`);
        setFeaturedCourses(response.data.slice(0, 6)); // Limit to 6 courses
      } catch (error) {
        toast.error("Failed to fetch courses.");
      }
    };

    const fetchTutors = async () => {
      try {
        // Fetch Featured Courses
        const coursesResponse = await axios.get(`${SERVER_URL}/api/courses`);
        setFeaturedCourses(coursesResponse.data.slice(0, 3)); // Limit to 3 courses

        // Fetch Tutors
        const usersResponse = await axios.get(`${SERVER_URL}/api/users`);
        const instructors = usersResponse.data.filter((user) => user.role === "instructor");
        setTutors(instructors.slice(0, 3)); // Limit to 3 tutors

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    

    fetchCourses();
    fetchTutors();
  }, []);

  const handleEnroll = (courseId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    toast.success("Successfully enrolled in the course!");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900 dark:bg-[#1e1e2e] dark:text-white">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-between dark:from-[#2a2a3c] dark:to-[#1e1e2e] px-8 ml-16 overflow-hidden">
        <div className="max-w-lg">
          <h1 className="text-6xl font-extrabold mb-4 text-gray-900 dark:text-white">
            Smart Learning <span className="text-orange-500">Deeper & More</span>
          </h1>
          <p className="text-lg mb-8 text-gray-700 dark:text-gray-300">
            Explore a variety of courses and enhance your skills with the best instructors worldwide.
          </p>
          <div className="space-x-6">
            <Link
              to="/courses"
              className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
            >
              Explore Courses
            </Link>
            <Link
              to="/register"
              className="text-orange-500 font-semibold hover:underline"
            >
              Get Started
            </Link>
          </div>
        </div>

        <div className="relative w-1/2 h-full flex items-center justify-center">
          <img
            src={students}
            alt="Hero Graphic"
            className="w-4/4 h-auto z-10"
          />
        </div>
      </div>
{/* 
      <div className="py-12 bg-gray-50 dark:bg-gray-900">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Meet Our Tutors
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          {tutors.map((tutor) => (
            <div
              key={tutor._id}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-2"
            >
              <img
                src={tutor.avatar || "/assets/default-avatar.jpg"} // Fallback for missing avatar
                alt={tutor.name}
                className="w-16 h-16 rounded-full mb-4 mx-auto"
              />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center">
                {tutor.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-center">
                {tutor.expertise}
              </p>
            </div>
          ))}
        </div>
      </div>

       
      <div className="py-12 bg-gray-100 dark:bg-[#1e1e2e]">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Choice Favorite Course from Top Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-2"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{category.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">{category.courses} Courses</p>
            </div>
          ))}
        </div>
      </div>
*/}

 {/* Featured Courses Section */}
 <div className="py-12 bg-gray-50 dark:bg-gray-900">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Explore Our Courses
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          {featuredCourses.map((course) => (
            <div
              key={course._id}
              className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-2"
            >
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{course.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{course.description}</p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                <strong>Duration:</strong> {course.duration} hours
              </p>
              <button
                onClick={() => handleEnroll(course._id)}
                className="block bg-orange-500 text-white text-center py-2 px-2 rounded-lg hover:bg-orange-600 transition dark:bg-orange-600 dark:hover:bg-orange-500"
              >
                Enroll Now
              </button>
            </div>
          ))}
        </div>
      </div>

      
      {/* Testimonials Section
      <div className="py-12 bg-gray-50 dark:bg-gray-900">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          What Our Students Say
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-2"
            >
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full mb-4 mx-auto"
              />
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                "{testimonial.message}"
              </p>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {testimonial.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{testimonial.role}</p>
            </div>
          ))}
        </div>
      </div> */}


{/* Our Tutors Section */}
<div className="py-12 bg-gray-50 dark:bg-gray-900">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Meet Our Tutors
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          {tutors.map((tutor) => (
            <div
              key={tutor._id}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-2"
            >
              <img
                src={avtar} // Fallback for missing avatar
                alt={tutor.name}
                className="w-16 h-16 rounded-full mb-4 mx-auto"
              />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center">
                {tutor.name}
              </h3>
              {/* <p className="text-gray-600 dark:text-gray-400 text-center">
                {tutor.expertise}
              </p> */}
            </div>
          ))}
        </div>
      </div>


      {/* FAQs Section */}
      <div className="py-12 bg-gray-100 dark:bg-[#1e1e2e]">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Frequently Asked Questions
        </h2>
        <div className="max-w-4xl mx-auto px-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {faq.question}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
 
      <Footer />
    </div>
  );
};

export default Home;