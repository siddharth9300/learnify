import React from "react";
import { Link } from "react-router-dom";
import logo from "../../public/logo1.png"; // Import the logo image

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-900 py-3 border-t border-gray-200 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center items-center px-4 text-sm">

        
        <Link
          to="/"
          className="flex items-center space-x-2">

          <img src={logo} alt="Learnify Logo" className="h-10  object-contain" /> 

          <span

          className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 dark:from-orange-400 dark:to-yellow-300 md:mr-4"
        >
          Learnify
          </span>
        </Link>

        <p className="mt-2 md:mt-0 text-center">
          Made with <span className="text-red-500">❤️</span> by Students of FCA Department
        </p>
      </div>
    </footer>
  );
};

export default Footer;
