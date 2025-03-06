import { FaBookOpen, FaUsers, FaChalkboardTeacher, FaBriefcase } from "react-icons/fa";
import { useEffect, useState } from "react";
import why from "../../assets/Images/why.png";

const WhyDreamers = () => {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        setAnimate(true);
    }, []);

    const cards = [
        {
            icon: <FaBookOpen className="text-4xl text-indigo-600 mb-4" />,
            title: "Endless Learning Opportunities",
            description: "Access a vast library of courses and resources to enhance your skills and knowledge."
        },
        {
            icon: <FaUsers className="text-4xl text-indigo-600 mb-4" />,
            title: "Community Support",
            description: "Join a network of like-minded individuals who support and inspire each other."
        },
        {
            icon: <FaChalkboardTeacher className="text-4xl text-indigo-600 mb-4" />,
            title: "Expert Mentorship",
            description: "Learn from industry professionals and gain real-world insights."
        },
        {
            icon: <FaBriefcase className="text-4xl text-indigo-600 mb-4" />,
            title: "Career Advancement",
            description: "Boost your career with certified courses and hands-on projects."
        }
    ];

    return (
        <section className="flex flex-col md:flex-row items-center justify-center py-16 px-4 md:px-16 bg-white">
            {/* "Why Dreamers" div with title and animated icon */}
            <div className={`md:w-1/2 text-center md:text-left mb-10 md:mb-0 ${animate ? "animate-fadeIn" : ""} relative`}>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Why Dreamers?</h2>
                <p className="text-base md:text-lg text-gray-600">Discover the reasons to be part of our inspiring community.</p>

                {/* Animated PNG/Icon */}
                <div className="mt-6 md:mt-10 mx-auto">
                    <img
                        src={why} 
                        alt="Animated Icon"
                        className="w-60 h-60 md:w-60 md:h-60 mx-auto animate-pulse" // Adjust size for mobile and desktop
                    />
                </div>
            </div>

            {/* Cards Section */}
            <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 md:gap-4">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="p-6 bg-white shadow-lg rounded-2xl hover:shadow-2xl transition-all transform hover:-translate-y-2 flex flex-col items-center text-center border border-gray-200"
                    >
                        {card.icon}
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{card.title}</h3>
                        <p className="text-gray-600">{card.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default WhyDreamers;
