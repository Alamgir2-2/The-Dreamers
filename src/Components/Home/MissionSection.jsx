import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaBook, FaTint, FaHandsHelping, FaGlobeAmericas, FaAward, FaTrophy, FaHeartbeat, FaFemale, FaTree } from 'react-icons/fa';
import { LuTreePalm } from "react-icons/lu";
import { GiWorld, GiGiftOfKnowledge } from "react-icons/gi";
import { TbUserDollar } from "react-icons/tb";
import { MdBloodtype } from "react-icons/md";
import { BiSolidDonateBlood } from "react-icons/bi";

const MissionSection = () => {
    const missions = [
        { id: 1, title: "Financial Support for Students", description: "Helping economically disadvantaged students to continue their education without financial burdens.", icon: <TbUserDollar /> },
        { id: 2, title: "Encouraging Knowledge Exploration", description: "Motivating students to expand their knowledge beyond textbooks and explore new areas of learning.", icon: <GiGiftOfKnowledge /> },
        { id: 3, title: "Educational Competitions", description: "Organizing knowledge-based competitions to enhance learning and skill development among students.", icon: <FaTrophy /> },
        { id: 4, title: "Recognition of Excellence", description: "Honoring outstanding students for their academic and extracurricular achievements.", icon: <FaAward /> },
        { id: 5, title: "Blood Donation Drives", description: "Conducting blood donation programs to support patients in need and promote humanitarian efforts.", icon: <BiSolidDonateBlood /> },
        { id: 6, title: "Tree Plantation Initiatives", description: "Promoting environmental awareness by organizing tree plantation drives.", icon: <LuTreePalm /> },
        { id: 7, title: "Support for the Underprivileged", description: "Providing financial and material assistance to those in poverty and need.", icon: <FaHandsHelping /> },
        { id: 8, title: "Blood Grouping Campaign", description: "Organizing blood grouping drives to help individuals identify their blood type and create a database for future medical emergencies.", icon: <MdBloodtype /> },
        { id: 9, title: "Other Positive Initiatives", description: "Engaging in various social welfare and community-building activities for the betterment of society", icon: <GiWorld /> }
    ];

    const [inView, setInView] = useState(false);
    const sectionRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check if mobile on mount and on resize
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);

        const observer = new IntersectionObserver(
            ([entry]) => {
                setInView(entry.isIntersecting);
            },
            { threshold: isMobile ? 0.1 : 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            window.removeEventListener('resize', checkIfMobile);
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, [isMobile]);

    return (
        <section ref={sectionRef} className="py-12 lg:py-20 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 text-center relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
            {/* Animated Background Elements - Reduced on mobile */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(isMobile ? 10 : 20)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={inView ? {
                            opacity: [0, 0.05, 0],
                            y: [0, Math.random() * (isMobile ? 50 : 100) - (isMobile ? 25 : 50)],
                            x: [0, Math.random() * (isMobile ? 50 : 100) - (isMobile ? 25 : 50)]
                        } : { opacity: 0 }}
                        transition={{
                            duration: 15 + Math.random() * 20,
                            repeat: Infinity,
                            repeatType: "reverse",
                            delay: Math.random() * 5
                        }}
                        className="absolute rounded-full"
                        style={{
                            width: `${Math.random() * (isMobile ? 5 : 10) + (isMobile ? 3 : 5)}px`,
                            height: `${Math.random() * (isMobile ? 5 : 10) + (isMobile ? 3 : 5)}px`,
                            background: `rgba(${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 255)}, 0.1)`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            filter: "blur(1px)"
                        }}
                    />
                ))}
            </div>

            {/* Section Title with Mobile Adjustments */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative z-10 mb-10 md:mb-16"
            >
                <div className="inline-block relative">
                    <motion.h2
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 relative"
                        animate={inView ? {
                            opacity: 1,
                            textShadow: isMobile ? "0 2px 8px rgba(79, 70, 229, 0.2)" : "0 5px 15px rgba(79, 70, 229, 0.3)"
                        } : {
                            opacity: 0,
                            textShadow: "0 0 0 rgba(79, 70, 229, 0)"
                        }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        Our Mission
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute -bottom-2 sm:-bottom-3 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full origin-left"
                    />
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-gray-600 mt-6 max-w-3xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed px-2 sm:px-0"
                >
                    We are committed to making a positive impact through education, social welfare, and empowerment. Our mission is to bring meaningful change to the community.
                </motion.p>
            </motion.div>

            {/* Mission Cards with Mobile Optimizations */}
            <div className="mt-10 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 relative z-10 px-2 sm:px-0">
                {missions.map((mission, index) => (
                    <motion.div
                        key={mission.id}
                        initial={{ opacity: 0, y: isMobile ? 30 : 60, scale: isMobile ? 0.98 : 0.95 }}
                        animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: isMobile ? 30 : 60, scale: isMobile ? 0.98 : 0.95 }}
                        transition={{
                            duration: 0.5,
                            delay: index * (isMobile ? 0.05 : 0.1),
                            ease: [0.22, 1, 0.36, 1]
                        }}
                        whileHover={{
                            scale: isMobile ? 1 : 1.03,
                            y: isMobile ? 0 : -5,
                            boxShadow: isMobile ? "0 4px 12px rgba(0, 0, 0, 0.1)" : "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                            transition: { duration: 0.3 }
                        }}
                        whileTap={isMobile ? { scale: 0.98 } : {}}
                        className="group relative bg-white p-4 sm:p-6 md:p-8 rounded-xl md:rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-transparent overflow-hidden"
                    >
                        {/* Card Background Gradient */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{
                                background: `linear-gradient(135deg, 
                                    ${mission.id === 1 ? "#3b82f6" :
                                        mission.id === 2 ? "#09b459" :
                                            mission.id === 5 ? "#ef4444" :
                                                mission.id === 3 ? "#d97706" :
                                                    mission.id === 4 ? "#2563eb" :
                                                        mission.id === 9 ? "#2563eb" :
                                                            mission.id === 8 ? "#dc2626" : "#10b981"}20, 
                                    ${mission.id === 1 ? "#6366f1" :
                                        mission.id === 2 ? "#09b459" :
                                            mission.id === 5 ? "#f87171" :
                                                mission.id === 3 ? "#f59e0b" :
                                                    mission.id === 4 ? "#2563eb" :
                                                        mission.id === 9 ? "#1d4ed8" :
                                                            mission.id === 8 ? "#b91c1c" : "#059669"}20)`
                            }}
                        />

                        {/* Floating Circles - Smaller on mobile */}
                        <motion.div
                            className="absolute -top-6 sm:-top-10 -right-6 sm:-right-10 w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                            style={{
                                background: mission.id === 1 ? "#3b82f6" :
                                    mission.id === 2 ? "#09b459" :
                                        mission.id === 5 ? "#ef4444" :
                                            mission.id === 3 ? "#d97706" :
                                                mission.id === 4 ? "#2563eb" :
                                                    mission.id === 9 ? "#2563eb" :
                                                        mission.id === 8 ? "#dc2626" : "#10b981"
                            }}
                            animate={inView ? {
                                y: [0, -5, 0],
                                scale: [1, 1.05, 1]
                            } : {}}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />

                        {/* Icon with Enhanced Animation */}
                        <motion.div
                            whileHover={{ rotate: 360, scale: 1.2 }}
                            transition={{ duration: 0.6 }}
                            className={`relative z-10 p-4 rounded-full text-5xl mb-6 mx-auto w-fit shadow-lg ${mission.id === 1 ? "text-blue-500 bg-blue-50" :
                                mission.id === 2 ? "text-green-500 bg-green-50" :
                                    mission.id === 5 ? "text-red-500 bg-red-50" :
                                        mission.id === 3 ? "text-yellow-600 bg-yellow-50" :
                                            mission.id === 4 ? "text-blue-600 bg-blue-50" :
                                                mission.id === 9 ? "text-blue-700 bg-blue-50" :
                                                    mission.id === 8 ? "text-red-500 bg-red-50" : "text-green-500 bg-green-50"
                                }`}
                        >
                            {mission.icon}
                        </motion.div>

                        {/* Content with Mobile Text Sizes */}
                        <div className="relative z-10">
                            <motion.h3
                                className="text-base sm:text-lg md:text-xl font-bold mt-2 sm:mt-4 mb-2 sm:mb-4 uppercase tracking-wide"
                                style={{
                                    color: mission.id === 1 ? "#1d4ed8" :
                                        mission.id === 2 ? "#09b459" :
                                            mission.id === 5 ? "#b91c1c" :
                                                mission.id === 3 ? "#92400e" :
                                                    mission.id === 4 ? "#2563eb" :
                                                        mission.id === 9 ? "#1e40af" :
                                                            mission.id === 8 ? "#991b1b" : "#047857"
                                }}
                                animate={inView ? {
                                    opacity: 1,
                                    y: 0
                                } : {
                                    opacity: 0,
                                    y: 5
                                }}
                                transition={{ duration: 0.5, delay: index * (isMobile ? 0.05 : 0.1) + 0.3 }}
                            >
                                {mission.title}
                            </motion.h3>
                            <motion.p
                                className="text-xs sm:text-sm md:text-base text-gray-600 text-center leading-relaxed group-hover:text-gray-800 transition-colors duration-300 px-1 sm:px-0"
                                animate={inView ? {
                                    opacity: 1,
                                    y: 0
                                } : {
                                    opacity: 0,
                                    y: 5
                                }}
                                transition={{ duration: 0.5, delay: index * (isMobile ? 0.05 : 0.1) + 0.4 }}
                            >
                                {mission.description}
                            </motion.p>
                        </div>

                        {/* Decorative Corner - Smaller on mobile */}
                        <motion.div
                            className="absolute top-0 right-0 w-10 sm:w-12 md:w-16 h-10 sm:h-12 md:h-16 rounded-bl-full"
                            style={{
                                background: mission.id === 1 ? "#3b82f6" :
                                    mission.id === 2 ? "#09b459" :
                                        mission.id === 5 ? "#ef4444" :
                                            mission.id === 3 ? "#d97706" :
                                                mission.id === 4 ? "#2563eb" :
                                                    mission.id === 9 ? "#2563eb" :
                                                        mission.id === 8 ? "#dc2626" : "#10b981",
                                opacity: 0.1
                            }}
                            animate={inView ? {
                                scale: [1, 1.05, 1],
                                opacity: [0.1, 0.12, 0.1]
                            } : {}}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    </motion.div>
                ))}
            </div>

            {/* Bottom Decorative Elements - Simplified for mobile */}
            {/* <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="mt-12 sm:mt-16 md:mt-20 flex flex-col items-center"
            >
                <div className="text-xs sm:text-sm uppercase tracking-widest text-gray-500 mb-3 sm:mb-4">Making a Difference</div>
                <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-6">
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="w-2 h-2 sm:w-3 sm:h-3 rounded-full"
                            style={{
                                background: i === 0 ? "#3b82f6" : i === 1 ? "#8b5cf6" : "#10b981"
                            }}
                            animate={inView ? {
                                y: [0, -5, 0],
                                scale: [1, 1.2, 1]
                            } : {}}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: i * 0.2
                            }}
                        />
                    ))}
                </div>
            </motion.div> */}
        </section>
    );
};

export default MissionSection;