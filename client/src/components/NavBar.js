import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-opacity-80 fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
        <div className="text-lg font-bold">sceneMe</div>
        <div className="hidden bg-gray-900 rounded-md md:flex space-x-4">
          <Link
            to="/"
            className="text-white hover:text-gray-300"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-white hover:text-gray-300"
          >
            About
          </Link>
          <Link
            to="/lists"
            className="text-white hover:text-gray-300"
          >
            My Lists
          </Link>
          <Link
            to="/login"
            className="text-white hover:text-gray-300"
          >
            Login
          </Link>
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className=" focus:outline-none"
          >
            {/* Hamburger icon */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 bg-opacity-80">
          <Link
            to="/"
            className="block text-white px-4 py-2 hover:bg-gray-700"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block text-white px-4 py-2 hover:bg-gray-700"
          >
            About
          </Link>
          <Link
            to="/lists"
            className="block text-white px-4 py-2 hover:bg-gray-700"
          >
            My Lists
          </Link>
          <Link
            to="/login"
            className="block text-white px-4 py-2 hover:bg-gray-700"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
