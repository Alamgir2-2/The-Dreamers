// import React from "react";
// import { useParams } from "react-router-dom";
// import mesbah from "../../../assets/Images/mezbah.jpg"
// import { img } from "framer-motion/client";

// const branchData = {

//     1: {
//         president: {
//             name: "Nazmul Hossain",
//             image: "/images/president1.jpg",
//             details: "President of Samonta Branch",
//         },
//         members: [
//             { name: "Asif Khan", age: 22, institution: "City College, Jashore", bloodGroup: "B+" },
//             { name: "Ismail Hossain ", age: 24, institution: "Shohidul Islam Degree College", bloodGroup: "B+" },
//         ],
//     },

//     2: {
//         president: {
//             name: "Mostakim Ahmed",
//             image: "/images/president2.jpg",
//             details: "President of Jhinnanagar Branch",
//         },
//         members: [
//             { name: "Tanvir Ahmed", age: 26, institution: "City College, Jashore", bloodGroup: "B+" },
//             { name: "Saklain Mustak", age: 24, institution: "City College, Jashore", bloodGroup: "B+" },
//         ],
//     },

//     5: {
//         president: {
//             name: "Shadikul Islam",
//             image: [mesbah],
//             details: "President of Jashore Branch",
//         },
//         members: [
//             { name: "Shofiul Bashar", age: 26, institution: "City College, Jashore", bloodGroup: "B+" },
//             { name: "Saklain Mustak", age: 24, institution: "Jashore University of Science and Technology", bloodGroup: "B+" },
//         ],
//     },
// };

// const BranchPage = () => {
//     const { id } = useParams();
//     const branch = branchData[id];

//     if (!branch) {
//         return <div className="text-center text-red-500">Branch not found.</div>;
//     }

//     return (
//         <div className="max-w-4xl mx-auto p-6">
//             {/* Branch President Section */}
//             <div className="flex items-center bg-gray-100 p-6 rounded-lg shadow-md">
//                 <img
//                     src={branch.president.image}
//                     alt={branch.president.name}
//                     className="w-40 h-40 object-cover rounded-full border-4 border-red-500"
//                 />
//                 <div className="ml-6">
//                     <h2 className="text-2xl font-bold">{branch.president.name}</h2>
//                     <p className="text-gray-600">{branch.president.details}</p>
//                 </div>
//             </div>

//             {/* Other Members Section */}
//             <div className="mt-8">
//                 <h3 className="text-xl font-semibold mb-4">Other Members</h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     {branch.members.map((member, index) => (
//                         <div key={index} className="bg-white p-4 shadow-md rounded-lg">
//                             <h4 className="font-bold">{member.name}</h4>
//                             <p>Age: {member.age}</p>
//                             <p>Institution: {member.institution}</p>
//                             <p>Blood Group: {member.bloodGroup}</p>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default BranchPage;


import React, { useState } from "react";
import { useParams } from "react-router-dom";

const branchData = {
    1: {
        name: "Samonta Branch",
        location: "Samonta, Jashore",
        president: {
            name: "Nazmul Hossain",
            image: "/images/president1.jpg",
            profession: "Social Worker",
            education: "MSc in Social Science",
            quote: "Together we make a difference.",
            mission: "Empowering the community with education and support."
        },
        members: [
            { name: "Asif Khan", age: 22, institution: "City College, Jashore", bloodGroup: "B+", image: "/images/member1.jpg", profession: "Student" },
            { name: "Ismail Hossain", age: 24, institution: "Shohidul Islam Degree College", bloodGroup: "B+", image: "/images/member2.jpg", profession: "Teacher" },
        ],
        activities: [
            { title: "Food Distribution", description: "Distributed food among 200+ people.", image: "/images/food.jpg" },
            { title: "Blood Donation Camp", description: "Organized a blood donation camp.", image: "/images/blood.jpg" },
        ],
    },
    2: {
        name: "Jhinnanagar Branch",
        location: "Jhinnanagar, Jashore",
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
            { title: "Tree Plantation", description: "Planted 500 trees in the locality.", image: "/images/tree.jpg" },
            { title: "Free Health Check-up", description: "Arranged free medical check-up camp.", image: "/images/health.jpg" },
        ],
    },
};

const Sidebar = ({ setActiveSection }) => {
    return (
        <div className="w-full md:w-1/4 bg-gray-100 p-4 rounded-lg shadow-md">
            <button onClick={() => setActiveSection("activities")} className="w-full mb-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Activities</button>
            <button onClick={() => setActiveSection("president")} className="w-full mb-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">President</button>
            <button onClick={() => setActiveSection("members")} className="w-full mb-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Members</button>
            <button onClick={() => setActiveSection("branchDetails")} className="w-full mb-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Branch Details</button>
        </div>
    );
};

const MainContent = ({ branch, activeSection }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const filteredMembers = branch.members.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full md:w-3/4 p-4 md:p-6 bg-white shadow-lg rounded-lg">
            {activeSection === "activities" && (
                <div>
                    <h3 className="text-xl md:text-2xl font-semibold mb-4 text-blue-700">Branch Activities</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {branch.activities.map((activity, index) => (
                            <div key={index} className="bg-gray-50 p-4 shadow-md rounded-lg">
                                <img src={activity.image} alt={activity.title} className="w-full h-40 object-cover rounded-md" />
                                <h4 className="font-bold mt-2 text-lg">{activity.title}</h4>
                                <p className="text-gray-600">{activity.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeSection === "president" && (
                <div className="flex flex-col md:flex-row items-center bg-gray-50 p-4 shadow-md rounded-lg">
                    <img src={branch.president.image} alt={branch.president.name} className="w-24 md:w-32 h-24 md:h-32 object-cover rounded-full border-4 border-blue-500" />
                    <div className="ml-0 md:ml-4  md:text-left">
                        <h2 className="text-xl md:text-2xl text-center font-bold text-blue-700 mb-2">{branch.president.name}</h2>
                        <p className="text-gray-600">Profession: {branch.president.profession}</p>
                        <p className="text-gray-600">Education: {branch.president.education}</p>
                        <p className="italic text-gray-700">"{branch.president.quote}"</p>
                        <p className="text-gray-600">Mission: {branch.president.mission}</p>
                    </div>
                </div>
            )}

            {activeSection === "members" && (
                <div>
                    <input
                        type="text"
                        placeholder="Search members..."
                        className="mb-4 p-2 w-full border rounded-lg"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {filteredMembers.map((member, index) => (
                            <div key={index} className="flex items-center bg-gray-50 p-4 shadow-md rounded-lg">
                                <img src={member.image} alt={member.name} className="w-16 md:w-20 h-16 md:h-20 object-cover rounded-full border-2 border-blue-500" />
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
                    <h3 className="text-xl md:text-2xl font-semibold mb-4 text-blue-700">Branch Details</h3>
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
        return <div className="text-center text-red-500">Branch not found.</div>;
    }

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-6">
            <div className="bg-blue-600 text-white p-4 rounded-lg text-center mb-6">
                <h1 className="text-xl md:text-3xl font-bold">{branch.name}</h1>
                <p className="text-lg">Location: {branch.location}</p>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
                <Sidebar setActiveSection={setActiveSection} />
                <MainContent branch={branch} activeSection={activeSection} />
            </div>
        </div>
    );
};

export default BranchPage;

