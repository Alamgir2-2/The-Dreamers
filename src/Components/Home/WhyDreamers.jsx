import { FaBookOpen, FaUsers, FaChalkboardTeacher, FaBriefcase, FaTree, FaHandsHelping, FaHeartbeat, FaGlobeAmericas } from "react-icons/fa";
import { useEffect, useState } from "react";
import why from "../../assets/Images/why.png";

const WhyDreamers = () => {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        setAnimate(true);
    }, []);

    const cards = [
        {
            icon: <FaBookOpen className="text-4xl text-green-600 mb-4" />,
            title: "Endless Learning Opportunities", //Educational Support
            description: "We provide free educational resources, mentorship, and skill development programs to help students excel in their academic and professional journeys."
        },
        {
            icon: <FaUsers className="text-4xl text-green-600 mb-4" />,
            title: "Community Engagement",
            description: "Join a strong network of students and volunteers dedicated to creating a positive impact through social initiatives and collaborative efforts."
        },
        {
            icon: <FaChalkboardTeacher className="text-4xl text-green-600 mb-4" />,
            title: "Guidance & Mentorship",
            description: "Our experienced mentors guide students with career advice, academic counseling, and leadership training to empower future change-makers."
        },
        {
            icon: <FaBriefcase className="text-4xl text-green-600 mb-4" />,
            title: "Social Welfare Initiatives",
            description: "We actively participate in humanitarian efforts such as relief programs, environmental campaigns, and community service to uplift underprivileged sections of society."
        },
        // {
        //     icon: <FaHandsHelping className="text-4xl text-green-600 mb-4" />,
        //     title: "Volunteer & Leadership Opportunities",
        //     description: "Students can engage in voluntary work, develop leadership skills, and contribute to meaningful social causes that create lasting change."
        // },
        // {
        //     icon: <FaTree className="text-4xl text-green-600 mb-4" />,
        //     title: "Tree Plantation Drives",
        //     description: "Our organization actively plants trees in schools, communities, and public spaces to promote a greener and healthier environment."
        // },
        // {
        //     icon: <FaHeartbeat className="text-4xl text-green-600 mb-4" />,
        //     title: "Health & Well-being Programs",
        //     description: "We organize health awareness campaigns, blood donation drives, and mental health support programs for the well-being of our community."
        // },
        // {
        //     icon: <FaGlobeAmericas className="text-4xl text-green-600 mb-4" />,
        //     title: "Sustainability & Environment",
        //     description: "Through clean-up programs, awareness campaigns, and eco-friendly initiatives, we encourage students to take responsibility for a greener future."
        // }
    ];
    
    

    return (
        <section className="flex flex-col md:flex-row items-center justify-center py-16 px-4 md:px-16 bg-white">
            {/* "Why Dreamers" div with title and animated icon */}
            <div className={`md:w-1/2 text-center md:text-left mb-10 md:mb-0 ${animate ? "animate-fadeIn" : ""} relative`}>
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Why Dreamers?</h2>
                    <p className="text-base md:text-lg text-gray-600">Discover the reasons to be part of our inspiring community.</p>
                </div>

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
