import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
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

const aboutUsLinks = [
    { name: "About The Dreamers", path: "/about/the-dreamers" },
    { name: "Director Speech", path: "/about/director-speech" },
    { name: "Advisory", path: "/about/advisory" },
    { name: "Members", path: "/about/members" },
    { name: "FAQs", path: "/about/faqs" },
    { name: "Support Us", path: "/about/support-us" },
];

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isBranchesOpen, setIsBranchesOpen] = useState(false);
    const [isAboutUsOpen, setIsAboutUsOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    let timeoutId;

    const handleMouseEnter = (setter) => {
        clearTimeout(timeoutId);
        setter(true);
    };

    const handleMouseLeave = (setter) => {
        timeoutId = setTimeout(() => {
            setter(false);
        }, 200); // 300ms delay
    };

    return (
        <header className="bg-white sticky top-0 shadow-lg shadow-green-800 z-50">
            <div className="max-w-7xl mx-auto px-4 md:py-2 sm:px-6 lg:px-8">
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
                    <nav className="hidden md:flex space-x-8 relative px-1">
                        <Link to="/" className="relative text-black hover:text-green-900 after:content-[''] after:absolute after:left-0 after:bottom-[-2px]  after:w-0 after:h-[2px] after:bg-green-500 after:transition-all after:duration-300 hover:after:w-full">Home</Link>

                        <Link to="/blood" className="relative text-black hover:text-green-900 after:content-[''] after:absolute after:left-0 after:bottom-[-2px]  after:w-0 after:h-[2px] after:bg-green-500 after:transition-all after:duration-300 hover:after:w-full">Blood Bank</Link>

                        {/* Branches Dropdown */}
                        <div className="relative">
                            <button
                                onMouseEnter={() => handleMouseEnter(setIsBranchesOpen)}
                                onMouseLeave={() => handleMouseLeave(setIsBranchesOpen)}
                                className="relative text-black hover:text-green-900 after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-green-500 after:transition-all after:duration-200 hover:after:w-full flex items-center gap-1"
                            >
                                Branches
                                <FaChevronDown size={10} className={`transition-transform mt-1.5 duration-300 ${isBranchesOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isBranchesOpen && (
                                <div
                                    className="absolute left-0 mt-2 w-48 bg-white shadow-md shadow-green-500 z-10"
                                    onMouseEnter={() => handleMouseEnter(setIsBranchesOpen)}
                                    onMouseLeave={() => handleMouseLeave(setIsBranchesOpen)}
                                >
                                    {branches.map((branch) => (
                                        <Link key={branch.path} to={branch.path} className="block px-4 py-2 text-black hover:bg-green-600">
                                            {branch.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>



                        <Link to="/events" className="relative text-black hover:text-green-900 after:content-[''] after:absolute after:left-0 after:bottom-[-2px]  after:w-0 after:h-[2px] after:bg-green-500 after:transition-all after:duration-300 hover:after:w-full">Events</Link>

                        <Link to="/contact" className="relative text-black hover:text-green-900 after:content-[''] after:absolute after:left-0 after:bottom-[-2px]  after:w-0 after:h-[2px] after:bg-green-500 after:transition-all after:duration-300 hover:after:w-full">Contact Us</Link>

                        {/* About Us Dropdown */}
                        <div className="relative">
                            <button
                                onMouseEnter={() => handleMouseEnter(setIsAboutUsOpen)}
                                onMouseLeave={() => handleMouseLeave(setIsAboutUsOpen)}
                                className="relative text-black hover:text-green-900 after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-green-500 after:transition-all after:duration-200 hover:after:w-full flex items-center gap-1"
                            >
                                About Us
                                <FaChevronDown size={10} className={`transition-transform mt-1.5 duration-300 ${isAboutUsOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isAboutUsOpen && (
                                <div
                                    className="absolute left-0 mt-2 w-48 bg-white shadow-md shadow-green-500 z-10"
                                    onMouseEnter={() => handleMouseEnter(setIsAboutUsOpen)}
                                    onMouseLeave={() => handleMouseLeave(setIsAboutUsOpen)}
                                >
                                    {aboutUsLinks.map((link) => (
                                        <Link key={link.path} to={link.path} className="block px-4 py-2 text-black hover:bg-green-600">
                                            {link.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                    </nav>

                    {/* Action Buttons */}
                    <div className="hidden md:flex space-x-4">
                        <button className="bg-[#078d83] hover:bg-white hover:text-black hover:border border-[#078d83] text-white py-2 px-4 rounded-lg">
                            Donate
                        </button>
                        <button className="bg-blue-500  hover:bg-white hover:text-black hover:border border-blue-500 text-white py-2 px-4 rounded-lg">Join Us</button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div className={`fixed  right-0 h-max w-1/2 bg-white p-4 z-10 shadow-xl shadow-green-800 transform transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
                <nav className="space-y-4 text-black">
                    <Link to="/" className="block text-green-900 hover:text-green-500">Home</Link>
                    <Link to="/blood" className="block text-green-900 hover:text-green-500">Blood Bank</Link>
                    {/* <Link to="/blogs" className="block text-green-900 hover:text-green-500">Blogs</Link> */}
                    <Link to="/events" className="block text-green-900 hover:text-green-500">Events</Link>
                    {/* <Link to="/about" className="block text-green-900 hover:text-green-500">About Us</Link> */}

                    {/* Mobile Branches Dropdown */}
                    <div>
                        <button onClick={() => setIsBranchesOpen(!isBranchesOpen)} className="text-green-900 hover:text-green-500 w-full text-left flex items-center gap-2">
                            Branches <FaChevronDown size={10} className={`transition-transform mt-1.5 duration-300 ${isBranchesOpen ? 'rotate-180' : ''}`} />
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

                    <Link to="/contact" className="block text-green-900 hover:text-green-500">Contact Us</Link>

                    {/* Mobile About Us Dropdown */}
                    <div>
                        <button onClick={() => setIsAboutUsOpen(!isAboutUsOpen)} className="text-green-900 hover:text-green-500 w-full text-left flex items-center gap-2">
                            About Us <FaChevronDown size={10} className={`transition-transform mt-1.5 duration-300 ${isAboutUsOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isAboutUsOpen && (
                            <div className="mt-2 bg-white shadow-lg shadow-green-600 rounded-lg">
                                {aboutUsLinks.map((link) => (
                                    <Link key={link.path} to={link.path} className="block px-4 py-2 text-black hover:bg-green-600">
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-4 space-x-4">
                        <button className="bg-[#078d83] hover:bg-white hover:text-black hover:border border-[#078d83] text-white my-2 py-2 px-4 rounded-lg w-full text-center"> Donate</button>

                        <button className="bg-blue-500  hover:bg-white hover:text-black hover:border border-blue-500 text-white my-2 py-2 px-4 rounded-lg w-full text-center">Join Us</button>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;