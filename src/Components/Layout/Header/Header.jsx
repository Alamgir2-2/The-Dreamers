// src/components/Header.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/Images/logo.png";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-opacity-75 backdrop-blur-md text-white p-4 fixed w-full top-0 left-0 z-50 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Organization Name */}
                    <div className="flex items-center">
                        <Link to="/" className="">
                            <img src={logo} alt="The Dreamers" className="w-15 h-auto" />
                        </Link>
                    </div>

                    {/* Mobile Hamburger Icon */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="text-white focus:outline-none"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Navigation Links for Larger Screens */}
                    <nav className="hidden md:flex space-x-6">
                        <Link to="/" className="hover:text-indigo-300">Home</Link>
                        <Link to="/blogs" className="hover:text-indigo-300">Blogs</Link>
                        <Link to="/events" className="hover:text-indigo-300">Events</Link>
                        <Link to="/about" className="hover:text-indigo-300">About Us</Link>
                        <Link to="/contact" className="hover:text-indigo-300">Contact Us</Link>
                    </nav>

                    {/* Action Buttons for Larger Screens */}
                    <div className="hidden md:flex space-x-4">
                        <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg">
                            Donate
                        </button>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">
                            Join Us
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <div
                className={`md:hidden ${isMenuOpen ? "block" : "hidden"} bg-gray-800 p-4 absolute top-24 left-0 w-full z-10`}
            >
                <nav className="space-y-4">
                    <Link to="/" className="block text-white hover:text-indigo-300">Home</Link>
                    <Link to="/blogs" className="block text-white hover:text-indigo-300">Blogs</Link>
                    <Link to="/events" className="block text-white hover:text-indigo-300">Events</Link>
                    <Link to="/about" className="block text-white hover:text-indigo-300">About Us</Link>
                    <Link to="/contact" className="block text-white hover:text-indigo-300">Contact Us</Link>
                    <div className="mt-4 space-x-4">
                        <button className="bg-green-500 my-2 hover:bg-green-600 text-white py-2 px-4 rounded-lg w-full text-center">
                            Donate
                        </button>
                        <button className="bg-blue-500 my-2 hover:bg-blue-600 text-white py-2 px-4 rounded-lg w-full text-center">
                            Join Us
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
