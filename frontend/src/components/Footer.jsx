import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 bg-opacity-80 backdrop-blur-lg text-white py-3 border-t border-gray-700">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center items-center px-4 text-sm">
        
        <Link
          to="/"
          className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300 md:mr-4"
        >
          Learnify
        </Link>

        <p className="mt-2 md:mt-0 text-center">
          Made with <span className="text-red-500">❤️</span> by Sarthak2131
        </p>

      </div>
    </footer>
  );
};

export default Footer;
