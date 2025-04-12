import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Courses from "./pages/Courses";
import AddCourse from "./pages/AddCourse";
import UpdateCourse from "./pages/UpdateCourse";
import Users from "./pages/Users";
import UserDetails from "./pages/UserDetails";
import UpdateUser from "./pages/UpdateUser";
import DeleteUser from "./pages/DeleteUser";
import ChangePassword from "./pages/ChangePassword";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Lectures from "./pages/Lectures";
import AddLecture from "./pages/AddLecture";
import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

const PrivateRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");
  return token && (!role || userRole === role) ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/add-course" element={<PrivateRoute role="instructor"><AddCourse /></PrivateRoute>} />
        <Route path="/update-course/:courseId" element={<PrivateRoute role="instructor"><UpdateCourse /></PrivateRoute>} />
        <Route path="/courses/:courseId/lectures" element={<PrivateRoute><Lectures /></PrivateRoute>} />
        <Route path="/courses/:courseId/add-lecture" element={<PrivateRoute role="instructor"><AddLecture /></PrivateRoute>} />
        <Route path="/users" element={<PrivateRoute role="admin"><Users /></PrivateRoute>} />
        <Route path="/users/:userId" element={<PrivateRoute role="admin"><UserDetails /></PrivateRoute>} />
        <Route path="/update-user/:userId" element={<PrivateRoute role="admin"><UpdateUser /></PrivateRoute>} />
        <Route path="/delete-user/:userId" element={<PrivateRoute role="admin"><DeleteUser /></PrivateRoute>} />
        <Route path="/change-password/:userId" element={<PrivateRoute role="admin"><ChangePassword /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
};

export default App;