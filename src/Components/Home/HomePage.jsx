// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../Home/Home.css";
import { motion } from "framer-motion";
import image1 from "../../assets/Images/image1.JPG"; // Import your images
import image2 from "../../assets/Images/image2.JPG";
import image3 from "../../assets/Images/image3.JPG";
import MissionSection from "../Home/MissionSection.jsx";
import BlogPage from "./BlogPage.jsx";
import WhyDreamers from "./WhyDreamers.jsx";
import ImageGellary from "./ImageGellary.jsx";

const Home = () => {
    return (
        //         <div className="bg-gradient-to-br from-purple-700 via-green-800 to-blue-900
        // ">
        <div className="">
            {/* Hero Section with Background Image Carousel */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Background Image Carousel with Overlay */}
                <div className="absolute inset-0 w-full h-full">
                    <div className="carousel-wrapper h-full w-full animate-carousel">
                        <div
                            className="carousel-item w-full h-full bg-cover bg-center transform scale-105"
                            style={{ backgroundImage: `url(${image1})` }}
                        ></div>
                        <div
                            className="carousel-item w-full h-full bg-cover bg-center transform scale-105"
                            style={{ backgroundImage: `url(${image2})` }}
                        ></div>
                        <div
                            className="carousel-item w-full h-full bg-cover bg-center transform scale-105"
                            style={{ backgroundImage: `url(${image3})` }}
                        ></div>
                    </div>
                    {/* Gradient Overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
                    {/* Subtle animated particles */}
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-white rounded-full animate-ping"></div>
                        <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-white rounded-full animate-pulse delay-1000"></div>
                    </div>
                </div>

                {/* Hero Content */}
                <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
                    {/* Main Title with enhanced styling */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight"
                        style={{
                            textShadow: '2px 2px 4px rgba(0,0,0,0.7), 0 0 20px rgba(255,255,255,0.1)'
                        }}
                    >
                        Welcome to
                        <span className="block py-4 bg-gradient-to-r from-green-500 via-blue-400 to-red-500 bg-clip-text text-transparent mt-2">
                            দ্যা ড্রিমার্স
                        </span>
                    </motion.h1>

                    {/* Subtitle with elegant styling */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                        className="text-xl  md:text-2xl text-gray-200 mb-8 font-semibold tracking-wide"
                        style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
                    >
                        A Student & Social Welfare Organization
                    </motion.p>

                    {/* Enhanced Call-to-Action Button */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                        className="space-y-4"
                    >
                        <Link
                            to="/about/the-dreamers"
                            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 hover:from-purple-500 hover:to-indigo-500 border border-white/20 backdrop-blur-sm"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Learn More
                                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                            {/* Button glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                        </Link>
                    </motion.div>

                    {/* Scroll indicator */}
                    {/* <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.2 }}
                        className="absolute bottom-8 right-8"
                    >
                        <div className="flex flex-col items-center text-white/70">
                            <span className="text-sm mb-2 font-light">Scroll to explore</span>
                            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                                <div className="w-1 h-3 bg-white/50 rounded-full animate-bounce mt-2"></div>
                            </div>
                        </div>
                    </motion.div> */}
                </div>
            </section>

            <MissionSection></MissionSection>
            {/* <hr /> */}
            {/* <BlogPage></BlogPage> */}
            <ImageGellary></ImageGellary>
            <WhyDreamers></WhyDreamers>

            {/* // Image Gallery Section */}
            <section className="bg-white py-16 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl font-bold text-gray-800"
                >
                    Our Impact
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-gray-600 mt-2"
                >
                    See how we are making a difference
                </motion.p>

                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 px-6">
                    {[1, 2, 3].map((id) => (
                        <motion.img
                            key={id}
                            whileHover={{ scale: 1.05 }}
                            src={`https://source.unsplash.com/300x200/?charity,${id}`}
                            alt="Impact"
                            className="rounded-lg shadow-md"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        />
                    ))}
                </div>
            </section>

            {/* // Call to Action Section */}
            <section className=" text-black py-16 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl font-bold"
                >
                    Join Us & Make a Difference
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="mt-2 text-lg"
                >
                    Become a part of our community and help bring positive change
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="mt-6"
                >
                    <Link
                        to="/registration"
                        className="bg-white text-indigo-600 px-6 py-3 rounded-lg shadow-md text-lg font-semibold hover:bg-gray-100 transition"
                    >
                        Register Now
                    </Link>
                </motion.div>
            </section>
        </div>
    );
};

export default Home;