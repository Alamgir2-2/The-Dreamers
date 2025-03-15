import React from 'react';
import { motion } from 'framer-motion'; // Framer Motion 
import alamgir from "../../assets/Blood/alamgir.jpg";

const Advisory = () => {
    const advisoryTeam = [
        {
            id: 1,
            name: "Dr. Mahfuzur Rahman",
            role: "Associate Professor",
            image: alamgir,
            description: "University of Sharjah, UAE",
        },
        {
            id: 2,
            name: "Dr. Nadim Parvez Emon",
            role: "Dcotor",
            image: alamgir,
            description: "Shaheed Suhrawardy Medical College, Dhaka",
        },
        {
            id: 3,
            name: "Md Alamgir Hossain",
            role: "Software Engineer",
            image: alamgir,
            description: "Noakhali Science and Technology University",
        },
        {
            id: 4,
            name: "Mahfuzur Rahman",
            role: "Pharmacist",
            image: alamgir,
            description: "Pabna University of Science and Technology",
        },
    ];

    //  Image Animation
    const imageVariants = {
        offscreen: {
            y: 100, // start from bottom
            opacity: 0, // primary invisible
        },
        onscreen: {
            y: 0, // come to top
            opacity: 1, // visible
            transition: {
                type: "spring", // spring animation
                bounce: 0.4, // bounce effect
                duration: 1.5,
            },
        },
    };

    // Card animation
    const cardVariants = {
        offscreen: {
            y: 100,
            opacity: 0,
        },
        onscreen: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                bounce: 0.4,
                duration: 1.6,
                delay: 0.3,
            },
        },
    };

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">

            {/* Page Heading */}
            <div className="text-center mb-20 -mt-12 -mx-8 bg-blue-50 p-20">
                <h1 className="text-4xl font-bold text-[#078d83] sm:text-5xl">
                    Advisory Team
                </h1>
                <p className="mt-4 text-lg text-gray-600">
                    Meet our esteemed advisory team who guide and support our mission.
                </p>
            </div>

            <div className="max-w-7xl mx-auto">
                {/* Team Card */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 gap-20">
                    {advisoryTeam.map((member) => (
                        <div key={member.id} className="relative">
                            {/* Rounded Image section*/}
                            <motion.div
                                className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg z-10 transition-transform hover:scale-115"
                                initial="offscreen" 
                                whileInView="onscreen" //trigger when scroll
                                viewport={{ once: true, amount: 0.5 }} 
                                variants={imageVariants} // image animation
                            >
                                {/* 
                absolute -top-16 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg z-10 transition-transform duration-500 hover:scale-120
                */}
                                <img
                                    className="w-full h-full object-cover object-center"
                                    src={member.image}
                                    alt={member.name}
                                />
                            </motion.div>

                            {/* Card */}
                            <motion.div
                                className="bg-white h-full rounded-lg shadow-lg overflow-hidden hover:shadow-gray-500 pt-20 pb-6 px-6 text-center"
                                initial="offscreen" 
                                whileInView="onscreen" 
                                viewport={{ once: true, amount: 0.5 }} 
                                variants={cardVariants} 
                            >
                                <h2 className="text-xl font-semibold text-gray-900">
                                    {member.name}
                                </h2>
                                <p className="mt-2 text-sm text-green-600">{member.role}</p>
                                <p className="mt-4 text-sm text-gray-600">
                                    {member.description}
                                </p>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Advisory;