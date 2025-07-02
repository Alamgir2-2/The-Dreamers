// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import tree1 from "../../../assets/Blood/tree 1.jpg";
// import tree2 from "../../../assets/Blood/tree 2.jpg";
// import blood5 from "../../../assets/Blood/blood 5.jpg";
// import blood6 from "../../../assets/Blood/blood 6.jpg";
// import noData from "../../../assets/Blood/Data.png";


// const branchData = {
//     1: {
//         name: "Samonta Branch",
//         location: "Samonta",
//         president: {
//             name: "Nazmul Hossain",
//             image: "/images/president1.jpg",
//             profession: "Social Worker",
//             education: "MSc in Social Science",
//             quote: "Together we make a difference.",
//             mission: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dignissimos in modi explicabo! Sit, fugit nostrum, rerum doloremque voluptates non doloribus, itaque officiis ab ea vel illo. Suscipit, aliquam similique."
//         },
//         members: [
//             { name: "Asif Khan", age: 22, institution: "City College, Jashore", bloodGroup: "B+", image: "/images/member1.jpg", profession: "Student" },
//             { name: "Ismail Hossain", age: 24, institution: "Shohidul Islam Degree College", bloodGroup: "B+", image: "/images/member2.jpg", profession: "Teacher" },
//             { name: "Ismail Hossain", age: 24, institution: "Shohidul Islam Degree College", bloodGroup: "B+", image: "/images/member2.jpg", profession: "Teacher" },
//             { name: "Ismail Hossain", age: 24, institution: "Shohidul Islam Degree College", bloodGroup: "B+", image: "/images/member2.jpg", profession: "Teacher" },
//         ],
//         activities: [
//             { title: "Tree Plantation", description: "Plant more than 200+ tree in random place.", image: [tree1] },
//             { title: "Blood Donation Camp", description: "Organized a blood donation camp.", image: [blood5] },
//         ],
//     },
//     2: {
//         name: "Jhinnanagar Branch",
//         location: "Jhinnanagar",
//         president: {
//             name: "Mostakim Ahmed",
//             image: "/images/president2.jpg",
//             profession: "Doctor",
//             education: "MBBS, Dhaka Medical College",
//             quote: "Health is wealth.",
//             mission: "Providing free medical services to the needy."
//         },
//         members: [
//             { name: "Tanvir Ahmed", age: 26, institution: "City College, Jashore", bloodGroup: "B+", image: "/images/member3.jpg", profession: "Engineer" },
//             { name: "Saklain Mustak", age: 24, institution: "City College, Jashore", bloodGroup: "B+", image: "/images/member4.jpg", profession: "Lecturer" },
//         ],
//         activities: [
//             { title: "Tree Plantation", description: "Planted 500 trees in the locality.", image: [tree2] },
//             { title: "Free Health Check-up", description: "Arranged free medical check-up camp.", image: [blood6] },
//         ],
//     },
//     3: {
//         name: "Maheshpur Branch",
//         location: "Maheshpur",
//         president: {
//             name: "Mostakim Ahmed",
//             image: "/images/president2.jpg",
//             profession: "Doctor",
//             education: "MBBS, Dhaka Medical College",
//             quote: "Health is wealth.",
//             mission: "Providing free medical services to the needy."
//         },
//         members: [
//             { name: "Tanvir Ahmed", age: 26, institution: "City College, Jashore", bloodGroup: "B+", image: "/images/member3.jpg", profession: "Engineer" },
//             { name: "Saklain Mustak", age: 24, institution: "City College, Jashore", bloodGroup: "B+", image: "/images/member4.jpg", profession: "Lecturer" },
//         ],
//         activities: [
//             { title: "Tree Plantation", description: "Planted 500 trees in the locality.", image: [tree2] },
//             { title: "Free Health Check-up", description: "Arranged free medical check-up camp.", image: [blood6] },
//         ],
//     },
//     4: {
//         name: "Jhenaidah Branch",
//         location: "Jhenaidah",
//         president: {
//             name: "Shamim Ahmed",
//             image: "/images/president2.jpg",
//             profession: "Student",
//             education: ".....",
//             quote: "Health is wealth.",
//             mission: "Providing free medical services to the needy."
//         },
//         members: [
//             { name: "Tanvir Ahmed", age: 26, institution: "City College, Jashore", bloodGroup: "B+", image: "/images/member3.jpg", profession: "Engineer" },
//             { name: "Saklain Mustak", age: 24, institution: "City College, Jashore", bloodGroup: "B+", image: "/images/member4.jpg", profession: "Lecturer" },
//         ],
//         activities: [
//             { title: "Tree Plantation", description: "Planted 500 trees in the locality.", image: [tree2] },
//             { title: "Free Health Check-up", description: "Arranged free medical check-up camp.", image: [blood6] },
//         ],
//     },
// };

// const Sidebar = ({ setActiveSection }) => {
//     return (
//         <div className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow-md border border-green-300">
//             <button onClick={() => setActiveSection("activities")} className="w-full mb-2 p-3 bg-[#078d83] text-white rounded-lg hover:bg-[#085a54]">Activities</button>
//             <button onClick={() => setActiveSection("president")} className="w-full mb-2 p-3 bg-[#078d83] text-white rounded-lg hover:bg-[#085a54]">President</button>
//             <button onClick={() => setActiveSection("members")} className="w-full mb-2 p-3 bg-[#078d83] text-white rounded-lg hover:bg-[#085a54]">Members</button>
//             <button onClick={() => setActiveSection("branchDetails")} className="w-full mb-2 p-3 bg-[#078d83] text-white rounded-lg hover:bg-[#085a54]">Branch Details</button>
//         </div>
//     );
// };

// const MainContent = ({ branch, activeSection }) => {
//     const [searchTerm, setSearchTerm] = useState("");
//     const filteredMembers = branch.members.filter(member =>
//         member.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//         <div className="w-full md:w-3/4 p-4 md:p-6 bg-white shadow-lg rounded-lg border border-green-300">
//             {activeSection === "activities" && (
//                 <div>
//                     <h3 className="text-xl md:text-2xl font-semibold mb-4 text-green-700">Branch Activities</h3>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                         {branch.activities.map((activity, index) => (
//                             <div key={index} className="bg-gray-50 p-4 shadow-md rounded-lg  hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fadeIn">
//                                 <img src={activity.image} alt={activity.title} className="w-full h-40 object-cover rounded-md" />
//                                 <h4 className="font-bold mt-2 text-lg">{activity.title}</h4>
//                                 <p className="text-gray-600">{activity.description}</p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             )}

//             {activeSection === "president" && (
//                 <div className="flex flex-col md:flex-col items-center bg-gray-50 p-4 shadow-lg rounded-lg">
//                     <img src={branch.president.image} alt={branch.president.name} className="w-24 h-24 items-center md:w-32 md:h-32 rounded-full border-4 border-green-500" />
//                     <div className="ml-0 p-4 md:ml-4 ">
//                         <h2 className="text-xl md:text-2xl font-bold text-green-700 mb-5 text-center">{branch.president.name}</h2>
//                         <p className="text-gray-600 mt-10"><span className="font-bold">Profession: </span>{branch.president.profession}</p>
//                         <p className="text-gray-600"><span className="font-bold">Education: </span> {branch.president.education}</p>
//                         <p className="italic text-gray-700"><span className="font-bold">Quotes </span>"{branch.president.quote}"</p>
//                         <p className="text-gray-600 mt-8"><span className="font-bold">Mission: </span> {branch.president.mission}</p>
//                     </div>
//                 </div>
//             )}

//             {activeSection === "members" && (
//                 <div>
//                     <input
//                         type="text"
//                         placeholder="Search members..."
//                         className="mb-4 p-2 w-full border rounded-lg border-amber-500"
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         {filteredMembers.map((member, index) => (
//                             <div key={index} className="flex items-center bg-gray-50 p-4 shadow-md rounded-lg">
//                                 <img src={member.image} alt={member.name} className="w-16 md:w-20 h-16 md:h-20 object-cover rounded-full border-2 border-green-500" />
//                                 <div className="ml-4">
//                                     <h4 className="font-bold text-lg">{member.name}</h4>
//                                     <p className="text-gray-600">Profession: {member.profession}</p>
//                                     <p className="text-gray-600">Institution: {member.institution}</p>
//                                     <p className="text-gray-600">Blood Group: {member.bloodGroup}</p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             )}

//             {activeSection === "branchDetails" && (
//                 <div>
//                     <h3 className="text-xl md:text-2xl font-semibold mb-4 text-green-700">Branch Details</h3>
//                     <p><strong>Branch Name:</strong> {branch.name}</p>
//                     <p><strong>Location:</strong> {branch.location}</p>
//                 </div>
//             )}
//         </div>
//     );
// };

// const BranchPage = () => {
//     const { id } = useParams();
//     const branch = branchData[id];
//     const [activeSection, setActiveSection] = useState("activities");

//     if (!branch) {
//         return <div className="flex flex-col items-center justify-center mt-6">
//             <img
//                 src={noData}
//                 alt="No Data Found"
//                 className="w-75"
//             />
//             <p className="my-3 text-gray-500 dark:text-gray-400 text-lg">
//                 No Branch details found. Try again...
//             </p>
//         </div>;
//     }

//     return (
//         <div className="max-w-6xl mx-auto p-4 md:p-6">
//             <div style={{ backgroundColor: '#078d83' }} className="bg-green-600 text-white p-5 rounded-lg text-center mb-6">
//                 <h1 className="text-2xl md:text-4xl font-bold">{branch.name}</h1>
//                 {/* <p className="text-lg">Location: {branch.location}</p> */}
//             </div>
//             <div className="flex flex-col md:flex-row gap-4">
//                 <Sidebar setActiveSection={setActiveSection} />
//                 <MainContent branch={branch} activeSection={activeSection} />
//             </div>
//         </div>
//     );
// };

// export default BranchPage;





import React, { useState } from "react";
import { User, MapPin, Users, Activity, Search, Phone, Mail, Calendar, ChevronRight, Award, Droplet, HeartHandshake } from "lucide-react";
import { useParams } from "react-router-dom";
import dreamers from "../../../assets/Images/Gallery/img3.jpg"

const BranchPage = () => {
    const { id } = useParams();
    const branch = branchData[id];
    const [activeSection, setActiveSection] = useState("overview");
    const [searchTerm, setSearchTerm] = useState("");

    const filteredMembers = branch?.members?.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    if (!branch) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
                <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md text-center">
                    <div className="text-6xl mb-4">📋</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">শাখা খুঁজে পাওয়া যায়নি</h2>
                    <p className="text-gray-600 mb-6">আপনি যে শাখার তথ্য খুঁজছেন তা আমাদের ডাটাবেসে নেই</p>
                    <button 
                        className="bg-gradient-to-r from-[#078d83] to-[#065c56] text-white px-6 py-3 rounded-lg hover:shadow-md transition-all"
                        onClick={() => window.history.back()}
                    >
                        পূর্বের পৃষ্ঠায় ফিরে যান
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Hero Header with Parallax Effect */}
            <div className="relative h-80 overflow-hidden bg-gradient-to-r from-[#078d83] to-[#065c56]">
                <div className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{ backgroundImage: `url(${dreamers})` }}></div>
                <div className="relative z-10 h-full flex flex-col justify-center text-white">
                    <div className="max-w-7xl mx-auto px-6 w-full">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-bold mb-3">{branch.name}</h1>
                                <div className="flex items-center text-lg">
                                    <MapPin className="mr-2" />
                                    <span>{branch.location}</span>
                                </div>
                            </div>
                            <div className="mt-6 md:mt-0 bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center min-w-[120px]">
                                <div className="text-3xl font-bold">{branch.stats.yearsActive}+</div>
                                <div className="text-sm">বছর সেবা</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Stats Cards */}
            <div className="max-w-5xl mx-auto px-6 -mt-12 z-20 relative">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                    <StatsCard
                        icon={Users} 
                        value={branch.stats.totalMembers} 
                        label="সদস্য" 
                        color="bg-blue-500"
                    />
                    <StatsCard 
                        icon={Activity} 
                        value={branch.stats.totalActivities} 
                        label="কার্যক্রম" 
                        color="bg-purple-500"
                    />
                    <StatsCard 
                        icon={Droplet} 
                        value={branch.stats.bloodDonations} 
                        label="রক্তদান" 
                        color="bg-red-500"
                    />
                    {/* <StatsCard 
                        icon={HeartHandshake} 
                        value="৫+" 
                        label="এলাকা" 
                        color="bg-orange-500"
                    /> */}
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Animated Tab Navigation */}
                <div className="flex justify-center overflow-x-auto pb-2 mb-8 scrollbar-hide">
                    <div className="flex space-x-4">
                        <TabButton 
                            active={activeSection === "overview"} 
                            onClick={() => setActiveSection("overview")}
                            icon={Activity}
                            label="সংক্ষিপ্ত বিবরণ"
                            color="bg-[#078d83]"
                        />
                        <TabButton 
                            active={activeSection === "activities"} 
                            onClick={() => setActiveSection("activities")}
                            icon={Award}
                            label="কার্যক্রম"
                            count={branch.activities.length}
                            color="bg-orange-500"
                        />
                        <TabButton 
                            active={activeSection === "president"} 
                            onClick={() => setActiveSection("president")}
                            icon={User}
                            label="সভাপতি"
                            color="bg-blue-500"
                        />
                        <TabButton 
                            active={activeSection === "members"} 
                            onClick={() => setActiveSection("members")}
                            icon={Users}
                            label="সদস্যবৃন্দ"
                            count={branch.members.length}
                            color="bg-purple-500"
                        />
                        
                    </div>
                </div>

                {/* Content Sections with Smooth Transitions */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300">
                    {/* Overview Section */}
                    {activeSection === "overview" && (
                        <div className="animate-fadeIn p-6 md:p-8">
                            <SectionHeader 
                                title="শাখা সম্পর্কে" 
                                subtitle={`${branch.name} এর বিস্তারিত তথ্য`}
                            />
                            
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-xl font-semibold text-[#078d83] mb-4 flex items-center">
                                        <span className="w-2 h-6 bg-[#078d83] mr-2 rounded-full"></span>
                                        আমাদের লক্ষ্য ও উদ্দেশ্য
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed mb-6">
                                        {branch.president.mission}
                                    </p>
                                    
                                    <div className="space-y-4">
                                        {[
                                            "আর্থিকভাবে পিছিয়ে পড়া শিক্ষার্থীদের আর্থিক সহয়তা প্রদান",
                                            "শিক্ষার্থীদের বাহ্যিক জ্ঞান অর্জনে উদ্ধুদ্ধকরণ",
                                            "শিক্ষা বিষয়ক প্রতিযোগীতামূলক বিভিন্ন ইভেন্ট পরিচালনা করা",
                                            "কৃতি শিক্ষার্থীদের সংবর্ধনা প্রদান",
                                            "রক্তদান কর্মসূচি পরিচালনা",
                                            "বৃক্ষরোপণ কর্মসূচি পরিচালনা",
                                            "দারিদ্রকে সহায়তা প্রদান",
                                            "এছাড়া যেকোনো ইতিবাচক কাজে আমরা নিয়োজিত"
                                        ].map((item, index) => (
                                            <div key={index} className="flex items-start gap-3">
                                                <div className="mt-1 w-3 h-3 bg-[#078d83] rounded-full flex-shrink-0"></div>
                                                <span className="text-gray-700">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                <div className="bg-gradient-to-br from-[#078d83]/10 to-[#078d83]/5 rounded-xl p-6 border border-[#078d83]/20">
                                    <h3 className="text-xl font-semibold text-[#078d83] mb-4 flex items-center">
                                        <span className="w-2 h-6 bg-[#078d83] mr-2 rounded-full"></span>
                                        যোগাযোগ
                                    </h3>
                                    
                                    <div className="space-y-4">
                                        <ContactItem 
                                            icon={<MapPin size={18} />}
                                            title="ঠিকানা"
                                            value={branch.location}
                                        />
                                        <ContactItem 
                                            icon={<Phone size={18} />}
                                            title="ফোন"
                                            value="+880 1234567890"
                                        />
                                        <ContactItem 
                                            icon={<Mail size={18} />}
                                            title="ইমেইল"
                                            value="thedreamersbd.mail@gmail.com"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* President Section */}
                    {activeSection === "president" && (
                        <div className="animate-fadeIn p-6 md:p-8">
                            <SectionHeader 
                                title="সভাপতির তথ্য" 
                                subtitle={`${branch.name} এর বর্তমান সভাপতি`}
                            />
                            
                            <div className="bg-gradient-to-r from-[#078d83]/10 to-[#078d83]/5 rounded-2xl p-6 md:p-8 border border-[#078d83]/20">
                                <div className="flex flex-col md:flex-row items-center gap-8">
                                    <div className="relative">
                                        <img 
                                            src={branch.president.image} 
                                            alt={branch.president.name}
                                            className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-xl"
                                        />
                                        <div className="absolute -bottom-2 -right-2 bg-[#078d83] text-white p-3 rounded-full shadow-lg">
                                            <User size={20} />
                                        </div>
                                    </div>
                                    
                                    <div className="flex-1 text-center md:text-left">
                                        <h2 className="text-3xl font-bold text-gray-800 mb-2">{branch.president.name}</h2>
                                        <p className="text-[#078d83] font-semibold text-lg mb-4">{branch.president.profession}</p>
                                        
                                        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 mb-6 shadow-sm">
                                            <p className="text-gray-600 italic">"{branch.president.quote}"</p>
                                        </div>
                                        
                                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                                            <DetailItem 
                                                icon={<Award size={16} />}
                                                title="শিক্ষাগত যোগ্যতা"
                                                value={branch.president.education}
                                            />
                                            <DetailItem 
                                                icon={<Phone size={16} />}
                                                title="যোগাযোগ"
                                                value={branch.president.phone}
                                            />
                                            <DetailItem 
                                                icon={<Mail size={16} />}
                                                title="ইমেইল"
                                                value={branch.president.email}
                                            />
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="mt-8 pt-6 border-t border-[#078d83]/20">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-3">লক্ষ্য ও উদ্দেশ্য</h3>
                                    <p className="text-gray-600 leading-relaxed">{branch.president.mission}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Members Section */}
                    {activeSection === "members" && (
                        <div className="animate-fadeIn p-6 md:p-8">
                            <SectionHeader 
                                title="সদস্যবৃন্দ" 
                                subtitle={`${branch.name} এর সক্রিয় সদস্যগণ`}
                                action={
                                    <div className="relative w-full md:w-80">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                        <input
                                            type="text"
                                            placeholder="সদস্য খুঁজুন..."
                                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#078d83] focus:border-transparent"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                }
                            />
                            
                            {filteredMembers.length > 0 ? (
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredMembers.map((member, index) => (
                                        <MemberCard key={index} member={member} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="text-gray-400 mb-4">
                                        <Search size={48} className="mx-auto" />
                                    </div>
                                    <h3 className="text-xl font-medium text-gray-700">কোন সদস্য খুঁজে পাওয়া যায়নি</h3>
                                    <p className="text-gray-500 mt-2">আপনার অনুসন্ধানের সাথে মিলে যায় এমন কোন সদস্য নেই</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Activities Section */}
                    {activeSection === "activities" && (
                        <div className="animate-fadeIn p-6 md:p-8">
                            <SectionHeader 
                                title="কার্যক্রমসমূহ" 
                                subtitle={`${branch.name} এর সাম্প্রতিক কার্যক্রম`}
                            />
                            
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {branch.activities.map((activity, index) => (
                                    <ActivityCard key={index} activity={activity} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Reusable Components
const SectionHeader = ({ title, subtitle, action }) => (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{title}</h2>
            {subtitle && <p className="text-gray-500">{subtitle}</p>}
        </div>
        {action && <div className="mt-4 md:mt-0 w-full md:w-auto">{action}</div>}
    </div>
);

const TabButton = ({ active, onClick, icon: Icon, label, count, color = "bg-[#078d83]" }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-500 font-medium whitespace-nowrap ${
            active
                ? `${color} text-white shadow-lg`
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
        }`}
    >
        <Icon size={20} className={active ? "text-white" : "text-current"} />
        <span>{label}</span>
        {count && (
            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                active ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-700'
            }`}>
                {count}
            </span>
        )}
    </button>
);

const StatsCard = ({ icon: Icon, value, label, color = "bg-[#078d83]" }) => (
    <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
        <div className={`${color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:rotate-6`}>
            <Icon className="text-white" size={24} />
        </div>
        <div className="text-2xl font-bold text-gray-800 mb-1">{value}</div>
        <div className="text-gray-600 text-sm">{label}</div>
    </div>
);

const ActivityCard = ({ activity }) => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
        <div className="relative overflow-hidden h-48">
            <img 
                src={activity.image} 
                alt={activity.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700 flex items-center">
                <Calendar size={14} className="mr-1" />
                {activity.date}
            </div>
        </div>
        <div className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-[#078d83] transition-colors">{activity.title}</h3>
            <p className="text-gray-600 mb-4">{activity.description}</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
                <span className="flex items-center gap-1">
                    <Users size={14} />
                    {activity.participants} জন অংশগ্রহণ
                </span>
                <button className="text-[#078d83] font-medium flex items-center">
                    বিস্তারিত <ChevronRight size={16} className="ml-1" />
                </button>
            </div>
        </div>
    </div>
);

const MemberCard = ({ member }) => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 group">
        <div className="flex items-start gap-4">
            <div className="relative">
                <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-16 h-16 rounded-full object-cover border-3 border-[#078d83] group-hover:rotate-3 transition-transform duration-300"
                />
                <div className="absolute -bottom-1 -right-1 bg-[#078d83] text-white text-xs px-2 py-1 rounded-full font-bold shadow-sm">
                    {member.bloodGroup}
                </div>
            </div>
            <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-[#078d83] transition-colors">{member.name}</h3>
                <p className="text-[#078d83] font-medium mb-2">{member.profession}</p>
                <p className="text-gray-600 text-sm mb-1">{member.institution}</p>
                <div className="flex items-center gap-2 text-gray-500 text-sm mt-3">
                    <Phone size={14} />
                    <span>{member.phone}</span>
                </div>
            </div>
        </div>
    </div>
);

const ContactItem = ({ icon, title, value }) => (
    <div className="flex items-start gap-3">
        <div className="p-2 bg-white rounded-lg text-[#078d83] shadow-sm">
            {icon}
        </div>
        <div>
            <div className="text-sm font-medium text-gray-500">{title}</div>
            <div className="text-gray-700">{value}</div>
        </div>
    </div>
);

const DetailItem = ({ icon, title, value }) => (
    <div className="flex items-start gap-2">
        <div className="text-[#078d83] mt-0.5">
            {icon}
        </div>
        <div>
            <div className="font-medium text-gray-700">{title}</div>
            <div className="text-gray-600">{value}</div>
        </div>
    </div>
);

// Mock data (same as before)
const branchData = {
    1: {
        name: "Samonta Branch",
        location: "Samonta, Maheshpur, Jhenaidah",
        president: {
            name: "Nazmul Hossain",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
            profession: "Social Worker",
            education: "MSc in Social Science",
            phone: "+880 1712-345678",
            email: "nazmul@example.com",
            quote: "Together we make a difference.",
            mission: "Empowering communities through collective action and sustainable change."
        },
        members: [
            { name: "Asif Khan", age: 22, institution: "City College, Jashore", bloodGroup: "B+", image: "https://randomuser.me/api/portraits/men/1.jpg", profession: "Student", phone: "+880 1712-111111" },
            { name: "Ismail Hossain", age: 24, institution: "Shohidul Islam Degree College", bloodGroup: "B+", image: "https://randomuser.me/api/portraits/men/2.jpg", profession: "Teacher", phone: "+880 1712-222222" },
            { name: "Rafiq Ahmed", age: 28, institution: "Jashore University", bloodGroup: "A+", image: "https://randomuser.me/api/portraits/men/3.jpg", profession: "Engineer", phone: "+880 1712-333333" },
            { name: "Karim Rahman", age: 25, institution: "Medical College", bloodGroup: "O+", image: "https://randomuser.me/api/portraits/men/4.jpg", profession: "Doctor", phone: "+880 1712-444444" },
        ],
        activities: [
            { title: "Tree Plantation", description: "Planted 200+ trees.", image: "https://images.unsplash.com/photo-1468276311594-df7cb65d8df6", date: "২০২৪-০১-১৫", participants: 25 },
            { title: "Blood Donation Camp", description: "Organized blood donation camp.", image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118", date: "২০২৪-০২-২০", participants: 40 },
            { title: "Free Medical Camp", description: "Medical help in rural area.", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef", date: "২০২৪-০৩-১০", participants: 60 },
        ],
        stats: { totalMembers: 45, totalActivities: 12, yearsActive: 9, bloodDonations: 150 }
    },
    2: {
        name: "Jinnahnagor Branch",
        location: "Jinnahnagor, Maheshpur, Jhenaidah",
        president: {
            name: "Mustakim Ahmed",
            image: "https://randomuser.me/api/portraits/men/34.jpg",
            profession: "Student",
            education: "BEd in Education",
            phone: "+880 1712-555555",
            email: "mustakim@example.com",
            quote: "Educate to elevate.",
            mission: "Promoting literacy and health awareness in rural communities."
        },
        members: [
            { name: "Tanvir Ahmed", age: 21, institution: "Jashore City College", bloodGroup: "O-", image: "https://randomuser.me/api/portraits/men/1.jpg", profession: "Student", phone: "+880 1712-666666" },
            { name: "Tariqul Islam", age: 26, institution: "Jashore Polytechnic", bloodGroup: "A-", image: "https://randomuser.me/api/portraits/men/5.jpg", profession: "Technician", phone: "+880 1712-777777" }
        ],
        activities: [
            { title: "Awareness Rally", description: "Marched for women's rights.", image: "https://images.unsplash.com/photo-1558981403-c5f9891b3f38", date: "২০২৪-০৪-১০", participants: 80 },
            { title: "Book Distribution", description: "Distributed 500+ books.", image: "https://images.unsplash.com/photo-1519681393784-d120267933ba", date: "২০২৪-০৫-২২", participants: 30 }
        ],
        stats: { totalMembers: 30, totalActivities: 8, yearsActive: 4, bloodDonations: 100 }
    },
    3: {
        name: "Maheshpur Branch",
        location: "Maheshpur, Jhenaidah",
        president: {
            name: "Md. Rezaul Karim",
            image: "https://randomuser.me/api/portraits/men/6.jpg",
            profession: "Lawyer",
            education: "LLB",
            phone: "+880 1712-888888",
            email: "rezaul@example.com",
            quote: "Justice and service for all.",
            mission: "Uplifting society through law awareness and support."
        },
        members: [
            { name: "Rubel Hossain", age: 30, institution: "Maheshpur Govt. Degree College", bloodGroup: "AB+", image: "https://randomuser.me/api/portraits/men/7.jpg", profession: "Social Worker", phone: "+880 1712-999999" },
        ],
        activities: [
            { title: "Legal Aid Camp", description: "Free legal advice to 100+ people.", image: "https://images.unsplash.com/photo-1555371362-0fa8a05a9e2c", date: "২০২৪-০২-০১", participants: 50 }
        ],
        stats: { totalMembers: 20, totalActivities: 6, yearsActive: 3, bloodDonations: 60 }
    },
    4: {
        name: "Jhenaidah Branch",
        location: "Jhenaidah",
        president: {
            name: "Imran Hossain",
            image: "https://randomuser.me/api/portraits/men/22.jpg",
            profession: "Student",
            education: "...",
            phone: "+880 1712-112233",
            email: "imran@example.com",
            quote: "Caring hands heal hearts.",
            mission: "Health camps and first-aid awareness for rural families."
        },
        members: [],
        activities: [
            { title: "First Aid Workshop", description: "Taught basic first-aid to villagers.", image: "https://images.unsplash.com/photo-1576765607924-c019a1ff2351", date: "২০২৪-০৫-০৫", participants: 45 }
        ],
        stats: { totalMembers: 10, totalActivities: 4, yearsActive: 2, bloodDonations: 40 }
    },
    5: {
        name: "Jashore Branch",
        location: "Jashore",
        president: {
            name: "Shadikul Islam",
            image: "https://randomuser.me/api/portraits/men/8.jpg",
            profession: "Author",
            education: "Bangla Literature",
            phone: "+880 1712-445566",
            email: "shadikul@example.com",
            quote: "Small help, big impact.",
            mission: "Providing food and winter clothes to the poor."
        },
        members: [],
        activities: [
            { title: "Winter Clothes Distribution", description: "Helped 300+ poor families.", image: "https://images.unsplash.com/photo-1516571801209-ecb2692b42c7", date: "২০২৪-০১-০১", participants: 100 }
        ],
        stats: { totalMembers: 15, totalActivities: 5, yearsActive: 3, bloodDonations: 50 }
    },
    6: {
        name: "Rajshahi Branch",
        location: "Rajshahi",
        president: {
            name: "Shamim Hossain",
            image: "https://randomuser.me/api/portraits/men/9.jpg",
            profession: "Engineer",
            education: "BSc in Civil Engineering",
            phone: "+880 1712-667788",
            email: "shamim@example.com",
            quote: "Build the future today.",
            mission: "Helping rebuild homes for flood victims."
        },
        members: [],
        activities: [
            { title: "Flood Relief Project", description: "Rebuilt 10+ damaged houses.", image: "https://images.unsplash.com/photo-1609840114394-b99fdf2e2e44", date: "২০২৪-০৩-১৫", participants: 70 }
        ],
        stats: { totalMembers: 25, totalActivities: 7, yearsActive: 4, bloodDonations: 80 }
    },
    7: {
        name: "Dhaka Branch",
        location: "Dhaka",
        president: {
            name: "Readussalam Badhon",
            image: "https://randomuser.me/api/portraits/men/33.jpg",
            profession: "Student",
            education: "Hons. Statistics",
            phone: "+880 1712-998877",
            email: "badhon@example.com",
            quote: "Serve the unserved.",
            mission: "Focus on women's health and education."
        },
        members: [],
        activities: [
            { title: "Sanitation Awareness", description: "Taught 200+ women hygiene.", image: "https://images.unsplash.com/photo-1609941718687-b6aa85595000", date: "২০২৪-০২-২৫", participants: 120 }
        ],
        stats: { totalMembers: 35, totalActivities: 9, yearsActive: 5, bloodDonations: 110 }
    },
    8: {
        name: "Centrally Controlled Branch",
        location: "Bangladesh",
        president: {
            name: "Yeasin Arafat",
            image: "https://randomuser.me/api/portraits/men/10.jpg",
            profession: "Doctor",
            education: "MBBS",
            phone: "+880 1712-334455",
            email: "yeasin@example.com",
            quote: "Discipline and service lead to greatness.",
            mission: "Inspiring youth through discipline and patriotism."
        },
        members: [],
        activities: [
            { title: "Youth Leadership Camp", description: "Trained 100+ local youth.", image: "https://images.unsplash.com/photo-1552664730-d307ca884978", date: "২০২৪-০৪-১৮", participants: 100 }
        ],
        stats: { totalMembers: 28, totalActivities: 6, yearsActive: 3, bloodDonations: 70 }
    }
};

export default BranchPage;