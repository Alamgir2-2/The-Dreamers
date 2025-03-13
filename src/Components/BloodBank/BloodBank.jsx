import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BloodGroupPage from "../BloodGroups/BloodGroup";
import bcamp from "../../assets/Blood/blood 4.jpg";
import baward from "../../assets/Blood/blood 3.jpg";
import bbaward from "../../assets/Blood/blood 1.jpg";
import aslam from "../../assets/Blood/Aslam.jpg";

{/* Activities Data */ }
const bloodBankActivities = [
    {
        title: "Blood Donation Campaign",
        description: ' "THE DREAMERS BLOOD BANK" organize impactful blood donation campaigns to bring our community together for a noble cause. Our mission is to encourage people to donate blood, save lives, and raise awareness about the critical need for donations. Through our efforts, we aim to make a meaningful difference and ensure that life-saving blood is always available for those in need.',
        image: [bcamp],
    },
    {
        title: "Blood Donor Awards",
        description: "we are proud to organize the Blood Donor Awards to recognize the selfless individuals who contribute their blood to save lives. This event highlights the importance of understanding blood types and the crucial role donation plays in emergency situations.",
        image: [baward],
    },
    {
        title: "Volunteer for Blood Bank",
        description: "Become a volunteer to help organize and manage blood donations at our blood bank. Together, we can save more lives.",
        image: [bbaward],
    },
    {
        title: "Blood Donation Registration",
        description: "Sign up to donate blood and be a part of our ongoing efforts to provide safe blood to those in need.",
        image: "/images/registration.jpg",
    },
];

{/* President Data */ }
const president = {
    name: "Aslam Hossain",
    image: [aslam],
    profession: "Social Worker",
    education: "B.A. (Hons) in History",
    quote: "Together we make a difference.",
    mission: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dignissimos in modi explicabo! Sit, fugit nostrum, rerum doloremque voluptates non doloribus, itaque officiis ab ea vel illo. Suscipit, aliquam similique."
};

{/* Member Data */ }
const membersData = [
    { id: 1, name: "Asif Khan", age: 22, institution: "City College, Jashore", bloodGroup: "B+", image: "/images/member1.jpg", profession: "Student" },
    { id: 2, name: "Ismail Hossain", age: 24, institution: "Shohidul Islam Degree College", bloodGroup: "B+", image: "/images/member2.jpg", profession: "Teacher" }
];

const Sidebar = ({ setActiveSection }) => {
    const [showBloodGroups, setShowBloodGroups] = useState(false);
    const bloodGroups = [
        { name: "A Positive (A+)", path: "a-positive" },
        { name: "A Negative (A-)", path: "a-negative" },
        { name: "B Positive (B+)", path: "b-positive" },
        { name: "B Negative (B-)", path: "b-negative" },
        { name: "O Positive (O+)", path: "o-positive" },
        { name: "O Negative (O-)", path: "o-negative" },
        { name: "AB Positive (AB+)", path: "ab-positive" },
        { name: "AB Negative (AB-)", path: "ab-negative" }
    ];

    return (
        <div className="w-full h-auto md:w-1/4 bg-white p-4 rounded-lg shadow-md border border-green-300 font-bold">
            <button onClick={() => setActiveSection("activities")} className="w-full mb-2 p-3 bg-[#078d83] text-red-900 rounded-lg hover:bg-[#085a54]">Activities</button>

            {/* Donor Button with Submenu */}
            <div>
                <button onClick={() => setShowBloodGroups(!showBloodGroups)} className="w-full mb-2 p-3 bg-[#078d83] text-red-900 rounded-lg hover:bg-[#085a54]">
                    Donors
                </button>
                {showBloodGroups && (
                    <div className="ml-4 mb-2 bg-gray-100 p-2 rounded-lg shadow-md">
                        {bloodGroups.map((group) => (
                            <button
                                key={group.path}
                                onClick={() => setActiveSection(group.path)}
                                className="block w-full text-sm text-left px-4 py-2 text-red-700 hover:bg-gray-200 rounded-md">
                                {group.name}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <button onClick={() => setActiveSection("president")} className="w-full mb-2 p-3 bg-[#078d83] text-red-900 rounded-lg hover:bg-[#085a54]">President</button>
            <button onClick={() => setActiveSection("members")} className="w-full mb-2 p-3 bg-[#078d83] text-red-900 rounded-lg hover:bg-[#085a54]">Members</button>
            <button onClick={() => setActiveSection("branchDetails")} className="w-full mb-2 p-3 bg-[#078d83] text-red-900 rounded-lg hover:bg-[#085a54]">Blood Bank Details</button>
        </div>
    );
};

{/* Main Content Area */ }
const MainContent = ({ activeSection }) => {
    const bloodGroupsPaths = [
        "a-positive", "a-negative", "b-positive", "b-negative",
        "o-positive", "o-negative", "ab-positive", "ab-negative"
    ];

    const [searchTerm, setSearchTerm] = useState("");

    const filteredMembers = membersData.filter((member) =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.profession.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.institution.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full md:w-3/4 p-4 md:p-6 bg-white shadow-lg rounded-lg border border-green-300 overflow-y-auto" style={{ maxHeight: "calc(100vh - 200px)" }}>
            {/* Activities Section */}
            {activeSection === "activities" && (
                <div>
                    <h3 className="text-xl md:text-2xl font-semibold mb-4 text-green-700">Blood Bank Activities</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {bloodBankActivities.map((activity, index) => (
                            <div key={index} className="bg-gray-50 p-4 shadow-md rounded-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fadeIn">
                                <img src={activity.image} alt={activity.title} className="w-full h-40 object-cover rounded-md" />
                                <h4 className="font-bold mt-2 text-lg">{activity.title}</h4>
                                <p className="text-gray-600 text-justify">{activity.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* President Section */}
            {activeSection === "president" && (
                <div>
                    <h3 className="text-xl font-semibold text-green-700">Blood Bank President</h3>
                    <div className="flex flex-col md:flex-col items-center mt-4">
                        <img src={president.image} alt={president.name} className="w-32 h-32 object-cover rounded-full border-4 border-[#078d83]" />
                        <div className="ml-6">
                            <h4 className="font-bold text-2xl text-[#078d83]">{president.name}</h4>
                            <p className="text-gray-600 text-lg"><span className="font-bold">Profession: </span> {president.profession}</p>
                            <p className="text-gray-600 text-lg"><span className="font-bold">Education: </span> {president.education}</p>
                            <blockquote className="mt-2 italic text-gray-600"><span className="font-bold">Quotes: </span>"{president.quote}"</blockquote>
                            <p className="mt-4 text-gray-700"><span className="font-bold">Mission: </span>{president.mission}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Member Section */}
            {activeSection === "members" && (
                <div>
                    <input
                        type="text"
                        placeholder="Search members..."
                        className="mb-4 p-2 w-full border rounded-lg border-amber-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredMembers.map((member) => (
                            <div key={member.id} className="flex items-center bg-gray-50 p-4 shadow-md rounded-lg">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-16 md:w-20 h-16 md:h-20 object-cover rounded-full border-2 border-green-500"
                                />
                                <div className="ml-4">
                                    <h4 className="font-bold text-lg">{member.name}</h4>
                                    <p className="text-gray-600">Profession: {member.profession}</p>
                                    <p className="text-gray-600">Institution: {member.institution}</p>
                                    <p className="text-gray-600">Blood Group: {member.bloodGroup}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeSection === "branchDetails" && <h3 className="text-xl font-semibold text-green-700">Branch Details</h3>}

            {bloodGroupsPaths.includes(activeSection) && <BloodGroupPage bloodGroup={activeSection} />}
        </div>
    );
};

const BloodBankPage = () => {
    const [activeSection, setActiveSection] = useState("activities");

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-6">
            <h1 className="text-2xl md:text-4xl font-bold text-center p-5 rounded-lg mb-6 bg-[#078d83] text-red-800">THE DREAMERS BLOOD BANK</h1>
            <div className="flex flex-col md:flex-row gap-4">
                <Sidebar setActiveSection={setActiveSection} />
                <MainContent activeSection={activeSection} />
            </div>
        </div>
    );
};

export default BloodBankPage;