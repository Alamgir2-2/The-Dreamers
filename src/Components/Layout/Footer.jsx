import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-10">
            <div className="container mx-auto px-6 md:px-12">
                {/* Footer Grid */}
                <div className=" border-t border-gray-500 pt-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                    
                    {/* Brand Section */}
                    <div>
                        <h2 className="text-2xl font-bold text-green-500"><Link to="/">দ্যা ড্রিমার্স</Link></h2>
                        <p className="mt-2 text-red-500">
                            একটি শিক্ষার্থী ও সামাজিক কল্যাণমূলক সংগঠন 
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-semibold">Quick Links</h3>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <Link to="/" className="hover:text-green-400 transition">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="hover:text-green-400 transition">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/blogs" className="hover:text-green-400 transition">
                                    Blogs
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="hover:text-green-400 transition">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="text-xl font-semibold">Follow Us</h3>
                        <div className="flex justify-center md:justify-start mt-4 space-x-4">
                            <a href="https://www.facebook.com/WeTheDreamersbd" className="text-gray-400 hover:text-blue-500 transition">
                                <FaFacebook size={24} />
                            </a>
                            <a href="https://www.youtube.com/@thedreamersofficial-d2w" className="text-gray-400 hover:text-blue-700 transition">
                                <FaYoutube size={24} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-sky-400 transition">
                                <FaTwitter size={24} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-pink-500 transition">
                                <FaInstagram size={24} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-blue-700 transition">
                                <FaLinkedin size={24} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="mt-8 border-t border-gray-500 pt-6 text-center text-gray-400">
                    <p>© 2016 দ্যা ড্রিমার্স. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
