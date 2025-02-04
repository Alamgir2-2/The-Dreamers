import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/Images/logo.png";

const branches = [
    { name: "Branch 1", path: "/branches/1" },
    { name: "Branch 2", path: "/branches/2" },
    { name: "Branch 3", path: "/branches/3" },
    { name: "Branch 4", path: "/branches/4" },
    { name: "Branch 5", path: "/branches/5" },
    { name: "Branch 6", path: "/branches/6" },
    { name: "Branch 7", path: "/branches/7" },
    { name: "Branch 8", path: "/branches/8" }
];

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isBranchesOpen, setIsBranchesOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/">
                            <img src={logo} alt="The Dreamers" className="w-15 h-auto" />
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={toggleMenu} className="text-black focus:outline-none">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-6 relative">
                        <Link to="/" className="relative text-black hover:text-green-900 after:content-[''] after:absolute after:left-0 after:bottom-[-2px]  after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full">Home</Link>
                        <Link to="/blogs" className="relative text-black hover:text-green-900 after:content-[''] after:absolute after:left-0 after:bottom-[-2px]  after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full">Blogs</Link>
                        <Link to="/events" className="relative text-black hover:text-green-900 after:content-[''] after:absolute after:left-0 after:bottom-[-2px]  after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full">Events</Link>
                        <Link to="/about" className="relative text-black hover:text-green-900 after:content-[''] after:absolute after:left-0 after:bottom-[-2px]  after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full">About Us</Link>
                        <Link to="/contact" className="relative text-black hover:text-green-900 after:content-[''] after:absolute after:left-0 after:bottom-[-2px]  after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full">Contact Us</Link>

                        {/* Branches Dropdown */}
                        <div className="relative">
                            <button onMouseEnter={() => setIsBranchesOpen(true)} onMouseLeave={() => setIsBranchesOpen(false)} className="relative text-black hover:text-green-900 after:content-[''] after:absolute after:left-0 after:bottom-[-2px]  after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full">
                                Branches
                            </button>
                            {isBranchesOpen && (
                                <div className="absolute left-0 mt-2 w-48 bg-white shadow-md rounded-lg z-10" onMouseEnter={() => setIsBranchesOpen(true)} onMouseLeave={() => setIsBranchesOpen(false)}>
                                    {branches.map((branch) => (
                                        <Link key={branch.path} to={branch.path} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                            {branch.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </nav>

                    {/* Action Buttons */}
                    <div className="hidden md:flex space-x-4">
                        <button className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg">Donate</button>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">Join Us</button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"} bg-gray-800 p-4 absolute left-0 w-full z-10`}>
                <nav className="space-y-4">
                    <Link to="/" className="block text-white hover:text-indigo-300">Home</Link>
                    <Link to="/blogs" className="block text-white hover:text-indigo-300">Blogs</Link>
                    <Link to="/events" className="block text-white hover:text-indigo-300">Events</Link>
                    <Link to="/about" className="block text-white hover:text-indigo-300">About Us</Link>
                    <Link to="/contact" className="block text-white hover:text-indigo-300">Contact Us</Link>

                    {/* Mobile Branches Dropdown */}
                    <div>
                        <button onClick={() => setIsBranchesOpen(!isBranchesOpen)} className="text-white hover:text-indigo-300 w-full text-left">
                            Branches
                        </button>
                        {isBranchesOpen && (
                            <div className="mt-2 bg-gray-700 rounded-lg">
                                {branches.map((branch) => (
                                    <Link key={branch.path} to={branch.path} className="block px-4 py-2 text-white hover:bg-gray-600">
                                        {branch.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="mt-4 space-x-4">
                        <button className="bg-green-500 my-2 hover:bg-green-600 text-white py-2 px-4 rounded-lg w-full text-center">Donate</button>
                        <button className="bg-blue-500 my-2 hover:bg-blue-600 text-white py-2 px-4 rounded-lg w-full text-center">Join Us</button>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
