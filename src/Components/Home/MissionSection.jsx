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
        { id: 1, title: "Financial Support for Students", description: "Helping economically disadvantaged students to continue their education without financial burdens.", icon: <TbUserDollar  /> },
        { id: 2, title: "Encouraging Knowledge Exploration", description: "Motivating students to expand their knowledge beyond textbooks and explore new areas of learning.", icon: <GiGiftOfKnowledge /> },
        { id: 3, title: "Educational Competitions", description: "Organizing knowledge-based competitions to enhance learning and skill development among students.", icon: <FaTrophy /> },
        { id: 4, title: "Recognition of Excellence", description: "Honoring outstanding students for their academic and extracurricular achievements.", icon: <FaAward /> },
        { id: 5, title: "Blood Donation Drives", description: "Conducting blood donation programs to support patients in need and promote humanitarian efforts.", icon: <BiSolidDonateBlood  /> },
        { id: 6, title: "Tree Plantation Initiatives", description: "Promoting environmental awareness by organizing tree plantation drives.", icon: <LuTreePalm /> },
        { id: 7, title: "Support for the Underprivileged", description: "Providing financial and material assistance to those in poverty and need.", icon: <FaHandsHelping /> },
        { id: 8, title: "Blood Grouping Campaign", description: "Organizing blood grouping drives to help individuals identify their blood type and create a database for future medical emergencies.", icon: <MdBloodtype  /> },
        { id: 9, title: "Other Positive Initiatives", description: "Engaging in various social welfare and community-building activities for the betterment of society", icon: <GiWorld /> }
    ];

    const [inView, setInView] = useState(false);
    const sectionRef = useRef(null);


    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setInView(entry.isIntersecting); // Update state when section is in view
            },
            { threshold: 0.3 } // Trigger when 30% of the section is visible
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);


    return (
        <section ref={sectionRef} className="py-10 lg:px-24 md:px-10 text-center">
            {/* Section Title */}
            <motion.h2
                // initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                // viewport={{ once: true }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-4xl font-bold text-black"
            >
                Our Mission
            </motion.h2>

            {/* Short Description */}
            <motion.h5
                // initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-gray-700 mt-2 max-w-2xl mx-auto"
            >
                We are committed to making a positive impact through education, social welfare, and empowerment. Our mission is to bring meaningful change to the community.
            </motion.h5>

            {/* Mission Cards - 3 per Row (Desktop) / 1 per Row (Mobile) */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-0">
                {missions.map((mission, index) => (
                    <motion.div
                        key={mission.id}
                        // initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        // viewport={{ once: true }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.8, delay: index * 0.2 }}
                        className={`relative bg-white bg-opacity-20 p-6 text-gray-800 flex flex-col items-center 
                            ${index % 3 !== 2 ? "md:border-r border-gray-400" : ""}  // Right border on desktop except last in row
                            ${index >= 3 ? "md:border-t border-gray-400" : ""}  // Top border on desktop for second row onwards
                            ${index !== -1 ? "border-t border-gray-400 md:border-0" : ""}  // Top border on mobile except first card
                        `}
                    >
                        {/* <div className="text-green-500 p-6 text-4xl">{mission.icon}</div> */}

                        <div
                            className={`p-6 text-4xl ${

                                    mission.id === 1 ? "text-blue-500" :
                                    mission.id === 2 ? "text-yellow-500" :
                                    mission.id === 5 ? "text-red-500" :
                                    mission.id === 3 ? "text-yellow-600" : 
                                    mission.id === 4 ? "text-yellow-600" :  
                                    mission.id === 9 ? "text-blue-700" :
                                    mission.id === 8 ? "text-red-500" :     "text-green-500"
                                }`}
                        >
                            {mission.icon}
                        </div>
                        <h3 className="text-xl font-bold mt-4 uppercase tracking-wide">{mission.title}</h3>
                        <p className="text-gray-600 mt-2 text-center">{mission.description}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default MissionSection;
