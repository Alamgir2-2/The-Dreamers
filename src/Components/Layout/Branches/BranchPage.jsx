import React, { useState } from "react";
import { useParams } from "react-router-dom";
import tree1 from "../../../assets/Blood/tree 1.jpg";
import tree2 from "../../../assets/Blood/tree 2.jpg";
import blood5 from "../../../assets/Blood/blood 5.jpg";
import blood6 from "../../../assets/Blood/blood 6.jpg";
import noData from "../../../assets/Blood/Data.png";


const branchData = {
    1: {
        name: "Samonta Branch",
        location: "Samonta",
        president: {
            name: "Nazmul Hossain",
            image: "/images/president1.jpg",
            profession: "Social Worker",
            education: "MSc in Social Science",
            quote: "Together we make a difference.",
            mission: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dignissimos in modi explicabo! Sit, fugit nostrum, rerum doloremque voluptates non doloribus, itaque officiis ab ea vel illo. Suscipit, aliquam similique."
        },
        members: [
            { name: "Asif Khan", age: 22, institution: "City College, Jashore", bloodGroup: "B+", image: "/images/member1.jpg", profession: "Student" },
            { name: "Ismail Hossain", age: 24, institution: "Shohidul Islam Degree College", bloodGroup: "B+", image: "/images/member2.jpg", profession: "Teacher" },
            { name: "Ismail Hossain", age: 24, institution: "Shohidul Islam Degree College", bloodGroup: "B+", image: "/images/member2.jpg", profession: "Teacher" },
            { name: "Ismail Hossain", age: 24, institution: "Shohidul Islam Degree College", bloodGroup: "B+", image: "/images/member2.jpg", profession: "Teacher" },
        ],
        activities: [
            { title: "Tree Plantation", description: "Plant more than 200+ tree in random place.", image: [tree1] },
            { title: "Blood Donation Camp", description: "Organized a blood donation camp.", image: [blood5] },
        ],
    },
    2: {
        name: "Jhinnanagar Branch",
        location: "Jhinnanagar",
        president: {
            name: "Mostakim Ahmed",
            image: "/images/president2.jpg",
            profession: "Doctor",
            education: "MBBS, Dhaka Medical College",
            quote: "Health is wealth.",
            mission: "Providing free medical services to the needy."
        },
        members: [
            { name: "Tanvir Ahmed", age: 26, institution: "City College, Jashore", bloodGroup: "B+", image: "/images/member3.jpg", profession: "Engineer" },
            { name: "Saklain Mustak", age: 24, institution: "City College, Jashore", bloodGroup: "B+", image: "/images/member4.jpg", profession: "Lecturer" },
        ],
        activities: [
            { title: "Tree Plantation", description: "Planted 500 trees in the locality.", image: [tree2] },
            { title: "Free Health Check-up", description: "Arranged free medical check-up camp.", image: [blood6] },
        ],
    },
    3: {
        name: "Maheshpur Branch",
        location: "Maheshpur",
        president: {
            name: "Mostakim Ahmed",
            image: "/images/president2.jpg",
            profession: "Doctor",
            education: "MBBS, Dhaka Medical College",
            quote: "Health is wealth.",
            mission: "Providing free medical services to the needy."
        },
        members: [
            { name: "Tanvir Ahmed", age: 26, institution: "City College, Jashore", bloodGroup: "B+", image: "/images/member3.jpg", profession: "Engineer" },
            { name: "Saklain Mustak", age: 24, institution: "City College, Jashore", bloodGroup: "B+", image: "/images/member4.jpg", profession: "Lecturer" },
        ],
        activities: [
            { title: "Tree Plantation", description: "Planted 500 trees in the locality.", image: [tree2] },
            { title: "Free Health Check-up", description: "Arranged free medical check-up camp.", image: [blood6] },
        ],
    },
    4: {
        name: "Jhenaidah Branch",
        location: "Jhenaidah",
        president: {
            name: "Shamim Ahmed",
            image: "/images/president2.jpg",
            profession: "Student",
            education: ".....",
            quote: "Health is wealth.",
            mission: "Providing free medical services to the needy."
        },
        members: [
            { name: "Tanvir Ahmed", age: 26, institution: "City College, Jashore", bloodGroup: "B+", image: "/images/member3.jpg", profession: "Engineer" },
            { name: "Saklain Mustak", age: 24, institution: "City College, Jashore", bloodGroup: "B+", image: "/images/member4.jpg", profession: "Lecturer" },
        ],
        activities: [
            { title: "Tree Plantation", description: "Planted 500 trees in the locality.", image: [tree2] },
            { title: "Free Health Check-up", description: "Arranged free medical check-up camp.", image: [blood6] },
        ],
    },
};

const Sidebar = ({ setActiveSection }) => {
    return (
        <div className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow-md border border-green-300">
            <button onClick={() => setActiveSection("activities")} className="w-full mb-2 p-3 bg-[#078d83] text-white rounded-lg hover:bg-[#085a54]">Activities</button>
            <button onClick={() => setActiveSection("president")} className="w-full mb-2 p-3 bg-[#078d83] text-white rounded-lg hover:bg-[#085a54]">President</button>
            <button onClick={() => setActiveSection("members")} className="w-full mb-2 p-3 bg-[#078d83] text-white rounded-lg hover:bg-[#085a54]">Members</button>
            <button onClick={() => setActiveSection("branchDetails")} className="w-full mb-2 p-3 bg-[#078d83] text-white rounded-lg hover:bg-[#085a54]">Branch Details</button>
        </div>
    );
};

const MainContent = ({ branch, activeSection }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const filteredMembers = branch.members.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full md:w-3/4 p-4 md:p-6 bg-white shadow-lg rounded-lg border border-green-300">
            {activeSection === "activities" && (
                <div>
                    <h3 className="text-xl md:text-2xl font-semibold mb-4 text-green-700">Branch Activities</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {branch.activities.map((activity, index) => (
                            <div key={index} className="bg-gray-50 p-4 shadow-md rounded-lg  hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fadeIn">
                                <img src={activity.image} alt={activity.title} className="w-full h-40 object-cover rounded-md" />
                                <h4 className="font-bold mt-2 text-lg">{activity.title}</h4>
                                <p className="text-gray-600">{activity.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeSection === "president" && (
                <div className="flex flex-col md:flex-col items-center bg-gray-50 p-4 shadow-lg rounded-lg">
                    <img src={branch.president.image} alt={branch.president.name} className="w-24 h-24 items-center md:w-32 md:h-32 rounded-full border-4 border-green-500" />
                    <div className="ml-0 p-4 md:ml-4 ">
                        <h2 className="text-xl md:text-2xl font-bold text-green-700 mb-5 text-center">{branch.president.name}</h2>
                        <p className="text-gray-600 mt-10"><span className="font-bold">Profession: </span>{branch.president.profession}</p>
                        <p className="text-gray-600"><span className="font-bold">Education: </span> {branch.president.education}</p>
                        <p className="italic text-gray-700"><span className="font-bold">Quotes </span>"{branch.president.quote}"</p>
                        <p className="text-gray-600 mt-8"><span className="font-bold">Mission: </span> {branch.president.mission}</p>
                    </div>
                </div>
            )}

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
                        {filteredMembers.map((member, index) => (
                            <div key={index} className="flex items-center bg-gray-50 p-4 shadow-md rounded-lg">
                                <img src={member.image} alt={member.name} className="w-16 md:w-20 h-16 md:h-20 object-cover rounded-full border-2 border-green-500" />
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

            {activeSection === "branchDetails" && (
                <div>
                    <h3 className="text-xl md:text-2xl font-semibold mb-4 text-green-700">Branch Details</h3>
                    <p><strong>Branch Name:</strong> {branch.name}</p>
                    <p><strong>Location:</strong> {branch.location}</p>
                </div>
            )}
        </div>
    );
};

const BranchPage = () => {
    const { id } = useParams();
    const branch = branchData[id];
    const [activeSection, setActiveSection] = useState("activities");

    if (!branch) {
        return <div className="flex flex-col items-center justify-center mt-6">
            <img
                src={noData}
                alt="No Data Found"
                className="w-75"
            />
            <p className="my-3 text-gray-500 dark:text-gray-400 text-lg">
                No Branch details found. Try again...
            </p>
        </div>;
    }

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-6">
            <div style={{ backgroundColor: '#078d83' }} className="bg-green-600 text-white p-5 rounded-lg text-center mb-6">
                <h1 className="text-2xl md:text-4xl font-bold">{branch.name}</h1>
                {/* <p className="text-lg">Location: {branch.location}</p> */}
            </div>
            <div className="flex flex-col md:flex-row gap-4">
                <Sidebar setActiveSection={setActiveSection} />
                <MainContent branch={branch} activeSection={activeSection} />
            </div>
        </div>
    );
};

export default BranchPage;

