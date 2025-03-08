import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/Images/logo.png";

const branches = [
    { name: "Samonta", path: "/branches/1" },
    { name: "Jhinnah Nagar", path: "/branches/2" },
    { name: "Mahespur", path: "/branches/3" },
    { name: "Jhenaidah", path: "/branches/4" },
    { name: "Jashore", path: "/branches/5" },
    { name: "Rajshahi", path: "/branches/6" },
    { name: "Dhaka", path: "/branches/7" },
    { name: "Centrally controlled", path: "/branches/8" }
];

const bloodGroups = [
    { name: "A Positive (A+) ", path: "/blood-groups/a-positive" },
    { name: "A Negative (A-)", path: "/blood-groups/a-negative" },
    { name: "B Positive (B+)", path: "/blood-groups/b-positive" },
    { name: "B Negative (B-)", path: "/blood-groups/b-negative" },
    { name: "O Positive (O+)", path: "/blood-groups/o-positive" },
    { name: "O Negative (O-)", path: "/blood-groups/o-negative" },
    { name: "AB Positive (AB+)", path: "/blood-groups/ab-positive" },
    { name: "AB Negative (AB-)", path: "/blood-groups/ab-negative" }
];


const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isBranchesOpen, setIsBranchesOpen] = useState(false);
    const [isBloodGroupsOpen, setIsBloodGroupsOpen] = useState(false);


    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-white sticky top-0 shadow-md shadow-green-800 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/">
                            <img src={logo} alt="The Dreamers" className="w-16 h-auto" />
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
                    <nav className="hidden md:flex space-x-8 relative">
                        <Link to="/" className="relative text-black hover:text-green-900 after:content-[''] after:absolute after:left-0 after:bottom-[-2px]  after:w-0 after:h-[2px] after:bg-green-500 after:transition-all after:duration-300 hover:after:w-full">Home</Link>
                        <Link to="/blogs" className="relative text-black hover:text-green-900 after:content-[''] after:absolute after:left-0 after:bottom-[-2px]  after:w-0 after:h-[2px] after:bg-green-500 after:transition-all after:duration-300 hover:after:w-full">Blogs</Link>
                        <Link to="/events" className="relative text-black hover:text-green-900 after:content-[''] after:absolute after:left-0 after:bottom-[-2px]  after:w-0 after:h-[2px] after:bg-green-500 after:transition-all after:duration-300 hover:after:w-full">Events</Link>

                        {/* Branches Dropdown */}
                        <div className="relative">
                            <button onMouseEnter={() => setIsBranchesOpen(true)} onMouseLeave={() => setIsBranchesOpen(false)} className="relative text-black hover:text-green-900 after:content-[''] after:absolute after:left-0 after:bottom-[-2px]  after:w-0 after:h-[2px] after:bg-green-500 after:transition-all after:duration-300 hover:after:w-full">
                                Branches
                            </button>
                            {isBranchesOpen && (
                                <div className="absolute left-0 mt-2 w-48 bg-white shadow-md shadow-green-500 z-10" onMouseEnter={() => setIsBranchesOpen(true)} onMouseLeave={() => setIsBranchesOpen(false)}>
                                    {branches.map((branch) => (
                                        <Link key={branch.path} to={branch.path} className="block px-4 py-2 text-black hover:bg-green-600">
                                            {branch.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Blood Groups Dropdown */}
                        <div className="relative">
                            <button
                                onMouseEnter={() => setIsBloodGroupsOpen(true)}
                                onMouseLeave={() => setIsBloodGroupsOpen(false)}
                                className="relative text-black hover:text-green-900 after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-green-500 after:transition-all after:duration-500 hover:after:w-full"
                            >
                                Blood Groups
                            </button>
                            {isBloodGroupsOpen && (
                                <div
                                    className="absolute left-0 mt-2 w-48 bg-white shadow-md shadow-green-500 z-10"
                                    onMouseEnter={() => setIsBloodGroupsOpen(true)}
                                    onMouseLeave={() => setIsBloodGroupsOpen(false)}
                                >
                                    {bloodGroups.map((group) => (
                                        <Link key={group.path} to={group.path} className="block px-4 py-2 text-black hover:bg-green-600">
                                            {group.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        <Link to="/about" className="relative text-black hover:text-green-900 after:content-[''] after:absolute after:left-0 after:bottom-[-2px]  after:w-0 after:h-[2px] after:bg-green-500 after:transition-all after:duration-300 hover:after:w-full">About Us</Link>
                        <Link to="/contact" className="relative text-black hover:text-green-900 after:content-[''] after:absolute after:left-0 after:bottom-[-2px]  after:w-0 after:h-[2px] after:bg-green-500 after:transition-all after:duration-300 hover:after:w-full">Contact Us</Link>

                    </nav>

                    {/* Action Buttons */}
                    <div className="hidden md:flex space-x-4">
                        <button className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg">Donate</button>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">Join Us</button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div className={`fixed  right-0 h-max w-1/2 bg-white p-4 z-10 shadow-xl shadow-green-800 transform transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
                <nav className="space-y-4 text-black">
                    <Link to="/" className="block text-green-900 hover:text-green-500">Home</Link>
                    <Link to="/blogs" className="block text-green-900 hover:text-green-500">Blogs</Link>
                    <Link to="/events" className="block text-green-900 hover:text-green-500">Events</Link>
                    <Link to="/about" className="block text-green-900 hover:text-green-500">About Us</Link>
                    <Link to="/contact" className="block text-green-900 hover:text-green-500">Contact Us</Link>

                    {/* Mobile Branches Dropdown */}
                    <div>
                        <button onClick={() => setIsBranchesOpen(!isBranchesOpen)} className="text-green-900 hover:text-green-500 w-full text-left">
                            Branches
                        </button>
                        {isBranchesOpen && (
                            <div className="mt-2 bg-white shadow-lg shadow-green-600 rounded-lg">
                                {branches.map((branch) => (
                                    <Link key={branch.path} to={branch.path} className="block px-4 py-2 text-black hover:bg-green-600">
                                        {branch.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>


                    {/* Mobile Blood Groups Dropdown */}
                    <div>
                        <button onClick={() => setIsBloodGroupsOpen(!isBloodGroupsOpen)} className="text-green-900 hover:text-green-500 w-full text-left">
                            Blood Groups
                        </button>
                        {isBloodGroupsOpen && (
                            <div className="mt-2 bg-white shadow-lg shadow-green-600 rounded-lg">
                                {bloodGroups.map((group) => (
                                    <Link key={group.path} to={group.path} className="block px-4 py-2 text-black hover:bg-green-600">
                                        {group.name}
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
