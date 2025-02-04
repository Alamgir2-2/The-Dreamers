// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../Home/Home.css";
import { motion } from "framer-motion";
import image1 from "../../assets/Images/image1.JPG"; // Import your images
import image2 from "../../assets/Images/image2.JPG";
import image3 from "../../assets/Images/image3.JPG";
import MissionSection from "../Home/MissionSection.jsx";

const Home = () => {
    return (
        //         <div className="bg-gradient-to-br from-purple-700 via-green-800 to-blue-900
        // ">
        <div className="">
            {/* Hero Section with Background Image Carousel */}
            <section className="relative text-white py-50 text-center">
                {/* Background Image Carousel */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                    <div className="carousel-wrapper h-full w-full animate-carousel">
                        <div
                            className="carousel-item w-full h-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${image1})` }}
                        ></div>
                        <div
                            className="carousel-item w-full h-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${image2})` }}
                        ></div>
                        <div
                            className="carousel-item w-full h-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${image3})` }}
                        ></div>
                    </div>
                </div>

                {/* Hero Content */}
                <h1 className="text-5xl font-bold relative">
                    Welcome to দ্যা ড্রিমার্স
                </h1>
                <p className="mt-4 text-lg relative">
                    A Student & Social Welfare Organization
                </p>
                <div className="mt-6 relative">
                    <Link
                        to="/about"
                        className="bg-white text-indigo-600 px-6 py-3 rounded-lg shadow-md text-lg font-semibold hover:bg-gray-100 transition"
                    >
                        Learn More
                    </Link>
                </div>
            </section>
            
            <MissionSection></MissionSection>

            {/* // Blog Section */}
            <section className="py-16 px-6 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl font-bold text-white"
                >
                    Latest Blogs
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-gray-200 mt-2"
                >
                    Stay updated with our latest news and articles
                </motion.p>

                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((id) => (
                        <motion.div
                            key={id}
                            whileHover={{ scale: 1.05 }}
                            className="bg-opacity-25 p-6 rounded-lg shadow-md hover:shadow-lg transition"
                        >
                            <motion.h3
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-xl font-semibold"
                            >
                                Blog Title {id}
                            </motion.h3>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.7 }}
                                className="text-gray-600 mt-2"
                            >
                                Short description of the blog...
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                                className="mt-4"
                            >
                                <Link to="/blogs" className="text-indigo-600 inline-block">
                                    Read More →
                                </Link>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </section>

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
            <section className=" text-white py-16 text-center">
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