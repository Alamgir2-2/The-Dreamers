import { useState } from "react";
import { Link } from "react-router-dom";
import BloodGroupPage from "../BloodGroups/BloodGroup";

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
        <div className="w-full h-auto md:w-1/4 bg-white p-4 rounded-lg shadow-md border border-green-300">
            <button onClick={() => setActiveSection("activities")} className="w-full mb-2 p-3 bg-[#078d83] text-white rounded-lg hover:bg-[#085a54]">Activities</button>

            {/* Donor Button with Submenu */}
            <div>
                <button onClick={() => setShowBloodGroups(!showBloodGroups)} className="w-full mb-2 p-3 bg-[#078d83] text-white rounded-lg hover:bg-[#085a54]">
                    Donors
                </button>
                {showBloodGroups && (
                    <div className="ml-4 mb-2 bg-gray-100 p-2 rounded-lg shadow-md">
                        {bloodGroups.map((group) => (
                            <button
                                key={group.path}
                                onClick={() => setActiveSection(group.path)}
                                className="block w-full text-sm text-left px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md">
                                {group.name}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <button onClick={() => setActiveSection("president")} className="w-full mb-2 p-3 bg-[#078d83] text-white rounded-lg hover:bg-[#085a54]">President</button>
            <button onClick={() => setActiveSection("members")} className="w-full mb-2 p-3 bg-[#078d83] text-white rounded-lg hover:bg-[#085a54]">Members</button>
            <button onClick={() => setActiveSection("branchDetails")} className="w-full mb-2 p-3 bg-[#078d83] text-white rounded-lg hover:bg-[#085a54]">Blood Bank Details</button>


        </div>
    );
};

const MainContent = ({ activeSection }) => {
    const bloodGroupsPaths = [
        "a-positive", "a-negative", "b-positive", "b-negative",
        "o-positive", "o-negative", "ab-positive", "ab-negative"
    ];

    return (
        <div className="w-full md:w-3/4 p-4 md:p-6 bg-white shadow-lg rounded-lg border border-green-300">
            {activeSection === "activities" && <h3 className="text-xl font-semibold text-green-700">Branch Activities</h3>}
            {activeSection === "president" && <h3 className="text-xl font-semibold text-green-700">Branch President</h3>}
            {activeSection === "members" && <h3 className="text-xl font-semibold text-green-700">Branch Members</h3>}
            {activeSection === "branchDetails" && <h3 className="text-xl font-semibold text-green-700">Branch Details</h3>}

            {bloodGroupsPaths.includes(activeSection) && <BloodGroupPage bloodGroup={activeSection} />}
        </div>
    );
};

const BloodBankPage = () => {
    const [activeSection, setActiveSection] = useState("activities");

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-6 ">
            <h1 className="text-2xl md:text-4xl font-bold text-center p-5 rounded-lg mb-6 bg-[#078d83]">Blood Bank</h1>
            <div className="flex flex-col md:flex-row gap-4">
                <Sidebar setActiveSection={setActiveSection} />
                <MainContent activeSection={activeSection} />
            </div>
        </div>
    );
};

export default BloodBankPage;
