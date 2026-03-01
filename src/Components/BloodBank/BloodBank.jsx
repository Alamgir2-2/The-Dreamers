import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Activity, Droplet, User, Users, Building, ChevronDown, ChevronRight, Menu, X, Search } from "lucide-react";
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

const Sidebar = ({ setActiveSection, activeSection, isOpen, setIsOpen }) => {
    const [showBloodGroups, setShowBloodGroups] = useState(false);
    const bloodGroups = [
        { name: "A+", path: "a-positive" },
        { name: "A-", path: "a-negative" },
        { name: "B+", path: "b-positive" },
        { name: "B-", path: "b-negative" },
        { name: "O+", path: "o-positive" },
        { name: "O-", path: "o-negative" },
        { name: "AB+", path: "ab-positive" },
        { name: "AB-", path: "ab-negative" }
    ];

    const MenuItem = ({ icon: Icon, label, onClick, isActive }) => (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                    ? 'bg-gradient-to-r from-teal-500 to-green-500 text-white shadow-md'
                    : 'text-gray-700 bg-gray-200 hover:bg-gray-300'
            }`}
        >
            <Icon size={20} />
            <span className="font-medium">{label}</span>
        </button>
    );

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/30 z-40 md:hidden" 
                    onClick={() => setIsOpen(false)}
                />
            )}
            
            {/* Sidebar */}
            <div className={`fixed md:sticky md:top-0 left-0 h-full md:h-auto bg-gradient-to-b from-gray-50 to-white shadow-xl border-r border-gray-200 z-40 transition-transform duration-300 ${
                isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
            } w-64 md:w-72 p-4 overflow-y-auto`}>
                {/* Close button for mobile */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="md:hidden absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg"
                >
                    <X size={20} />
                </button>

                <div className="space-y-2 mt-12 md:mt-0">
                    <MenuItem
                        icon={Activity}
                        label="Activities"
                        onClick={() => {
                            setActiveSection("activities");
                            setIsOpen(false);
                        }}
                        isActive={activeSection === "activities"}
                    />

                    <div>
                        <button
                            onClick={() => setShowBloodGroups(!showBloodGroups)}
                            className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                                showBloodGroups || bloodGroups.some(g => g.path === activeSection)
                                    ? 'bg-gradient-to-r from-teal-500 to-green-500 text-white shadow-md'
                                    : 'text-gray-700 bg-gray-200 hover:bg-gray-300'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <Droplet size={20} />
                                <span className="font-medium">Donors</span>
                            </div>
                            {showBloodGroups ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                        </button>
                        {showBloodGroups && (
                            <div className="mt-2 ml-4 grid grid-cols-4 gap-2">
                                {bloodGroups.map((group) => (
                                    <button
                                        key={group.path}
                                        onClick={() => {
                                            setActiveSection(group.path);
                                            setIsOpen(false);
                                        }}
                                        className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all ${
                                            activeSection === group.path
                                                ? 'bg-red-500 text-white shadow-md'
                                                : 'bg-gray-100 text-red-600 hover:bg-red-100'
                                        }`}
                                    >
                                        {group.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <MenuItem
                        icon={User}
                        label="President"
                        onClick={() => {
                            setActiveSection("president");
                            setIsOpen(false);
                        }}
                        isActive={activeSection === "president"}
                    />

                    <MenuItem
                        icon={Users}
                        label="Members"
                        onClick={() => {
                            setActiveSection("members");
                            setIsOpen(false);
                        }}
                        isActive={activeSection === "members"}
                    />

                    <MenuItem
                        icon={Building}
                        label="Blood Bank Details"
                        onClick={() => {
                            setActiveSection("branchDetails");
                            setIsOpen(false);
                        }}
                        isActive={activeSection === "branchDetails"}
                    />
                </div>
            </div>
        </>
    );
};

{/* Main Content Area */ }
const MainContent = ({ activeSection, searchTerm, availabilityFilter }) => {
    const bloodGroupsPaths = [
        "a-positive", "a-negative", "b-positive", "b-negative",
        "o-positive", "o-negative", "ab-positive", "ab-negative"
    ];

    const [memberSearchTerm, setMemberSearchTerm] = useState("");

    const filteredMembers = membersData.filter((member) =>
        member.name.toLowerCase().includes(memberSearchTerm.toLowerCase()) ||
        member.profession.toLowerCase().includes(memberSearchTerm.toLowerCase()) ||
        member.institution.toLowerCase().includes(memberSearchTerm.toLowerCase())
    );

    return (
        <div>
            {/* Activities Section */}
            {activeSection === "activities" && (
                <div className="p-4 md:p-6">
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
                <div className="p-4 md:p-6">
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
                <div className="p-4 md:p-6">
                    <input
                        type="text"
                        placeholder="Search members..."
                        className="mb-4 p-2 w-full border rounded-lg border-amber-500"
                        value={memberSearchTerm}
                        onChange={(e) => setMemberSearchTerm(e.target.value)}
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

            {activeSection === "branchDetails" && <h3 className="text-xl font-semibold text-green-700 p-4 md:p-6">Blood Bank Details</h3>}

            {bloodGroupsPaths.includes(activeSection) && <BloodGroupPage bloodGroup={activeSection} searchTerm={searchTerm} availabilityFilter={availabilityFilter} />}
        </div>
    );
};

const BloodBankPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState("activities");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [availabilityFilter, setAvailabilityFilter] = useState("all");

    useEffect(() => {
        const hash = location.hash.replace('#', '');
        if (hash) {
            setActiveSection(hash);
        }
    }, [location.hash]);

    const handleSectionChange = (section) => {
        setActiveSection(section);
        navigate(`#${section}`);
    };

    return (
        <div className="min-h-screen flex">
            {/* Content Area */}
            <Sidebar 
                setActiveSection={handleSectionChange} 
                activeSection={activeSection}
                isOpen={isSidebarOpen}
                setIsOpen={setIsSidebarOpen}
            />
            <div className="flex-1 flex flex-col max-h-screen">
                {/* Page Header */}
                <div className="bg-white shadow-md border-b border-gray-200 sticky top-16 md:top-0 z-30">
                    <div className="px-4 md:px-6 py-3 md:py-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setIsSidebarOpen(true)}
                                    className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-all"
                                >
                                    <Menu size={24} className="text-gray-700" />
                                </button>
                                <Droplet size={24} className="text-red-500" />
                                <div>
                                    <h1 className="text-lg md:text-2xl font-bold text-gray-800">Blood Bank</h1>
                                    {activeSection !== "activities" && activeSection !== "president" && activeSection !== "members" && activeSection !== "branchDetails" && (
                                        <p className="text-xs md:text-sm text-gray-600 capitalize">{activeSection.replace("-", " ")} Blood Donors</p>
                                    )}
                                </div>
                            </div>
                            {/* Search bar for blood group pages */}
                            {activeSection !== "activities" && activeSection !== "president" && activeSection !== "members" && activeSection !== "branchDetails" && (
                                <div className="flex items-center gap-2 w-full md:flex-1 md:max-w-2xl">
                                    <div className="relative flex-1">
                                        <input
                                            type="text"
                                            placeholder="Search Donor..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full p-2 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 pl-10 transition-all"
                                        />
                                        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                                        {searchTerm && (
                                            <button
                                                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                                                onClick={() => setSearchTerm("")}
                                            >
                                                <X size={18} />
                                            </button>
                                        )}
                                    </div>
                                    <select
                                        value={availabilityFilter}
                                        onChange={(e) => setAvailabilityFilter(e.target.value)}
                                        className="p-2 text-xs md:text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white whitespace-nowrap"
                                    >
                                        <option value="all">All</option>
                                        <option value="available">Available</option>
                                        <option value="unavailable">Unavailable</option>
                                    </select>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                
                {/* Main Content - Scrollable */}
                 <div className="flex-1 overflow-y-auto">
                    <MainContent activeSection={activeSection} searchTerm={searchTerm} availabilityFilter={availabilityFilter} />
                </div>
            </div>
        </div>
    );
};

export default BloodBankPage;