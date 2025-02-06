// // import { useParams } from "react-router-dom";
// // import { useState } from "react";
// // import { Search, X } from "lucide-react"; // Importing icons

// // const BloodGroupPage = () => {
// //     const { bloodGroup } = useParams(); 
// //     const [searchTerm, setSearchTerm] = useState(""); 

// //     const donorsData = {
// //         "a-positive": [
// //             { id: 1, name: "Shadikul Islam", phone: "+1234567890", address: "Apon Mor, Jashore", institute: "Govt. M M College, Jashore", image: "https://via.placeholder.com/100" },
// //             { id: 2, name: "Alice Smith", phone: "+9876543210", address: "456 Elm St, Town", institute: "XYZ College", image: "https://via.placeholder.com/100" }
// //         ],
// //         "b-positive": [
// //             { id: 3, name: "Robert Brown", phone: "+1122334455", address: "789 Oak St, Metro", institute: "LMN Institute", image: "https://via.placeholder.com/100" }
// //         ],
// //         "o-negative": [
// //             { id: 8, name: "Michael Lee", phone: "+5566778899", address: "202 Cedar St, Rural", institute: "RST University", image: "https://via.placeholder.com/100" }
// //         ]
// //     };

// //     const donors = donorsData[bloodGroup.toLowerCase()] || [];

// //     const filteredDonors = donors.filter((donor) =>
// //         Object.entries(donor).some(
// //             ([key, value]) =>
// //                 key !== "image" && 
// //                 typeof value === "string" &&
// //                 value.toLowerCase().includes(searchTerm.toLowerCase())
// //         )
// //     );

// //     return (
// //         <div className="max-w-4xl mx-auto p-6">
// //             {/* Header Section */}
// //             <div className="sticky top-15 bg-white z-10 p-4 shadow-lg rounded-md flex flex-col gap-3">
// //                 <h1 className="text-4xl font-bold text-red-600 capitalize">{bloodGroup.replace("-", " ")} Blood Donors</h1>
// //                 <p className="text-gray-600">Find blood donors in your area below:</p>

// //                 {/* Search Input */}
// //                 <div className="relative">
// //                     <input
// //                         type="text"
// //                         placeholder="Search by name, phone, address..."
// //                         value={searchTerm}
// //                         onChange={(e) => setSearchTerm(e.target.value)}
// //                         className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 pl-10"
// //                     />
// //                     <Search className="absolute left-3 top-3 text-gray-400" size={20} />
// //                     {searchTerm && (
// //                         <button
// //                             className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
// //                             onClick={() => setSearchTerm("")}
// //                         >
// //                             <X size={20} />
// //                         </button>
// //                     )}
// //                 </div>
// //             </div>

// //             {/* Donor List */}
// //             {filteredDonors.length > 0 ? (
// //                 <ul className="mt-6 space-y-4">
// //                     {filteredDonors.map((donor) => (
// //                         <li key={donor.id} className="p-5 border rounded-lg flex items-center gap-5 bg-gray-50 shadow-md hover:shadow-lg transition-all duration-300">
// //                             <img src={donor.image} alt={donor.name} className="w-20 h-20 rounded-full border border-gray-300" />
// //                             <div className="flex-1">
// //                                 <div className="flex items-center justify-between">
// //                                     <h2 className="text-xl font-semibold">{donor.name}</h2>
// //                                     <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">{bloodGroup.toUpperCase()}</span>
// //                                 </div>
// //                                 <p className="text-gray-600">📞 {donor.phone}</p>
// //                                 <p className="text-gray-600">🏠 {donor.address}</p>
// //                                 <p className="text-gray-600">🎓 {donor.institute}</p>
// //                             </div>
// //                         </li>
// //                     ))}
// //                 </ul>
// //             ) : (
// //                 <div className="mt-10 flex flex-col items-center">
// //                     <img src="https://via.placeholder.com/200?text=No+Results" alt="No Results" className="w-48" />
// //                     <p className="mt-3 text-gray-500 text-lg">No donors found. Try a different search term.</p>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // };

// // export default BloodGroupPage;



// import { useParams } from "react-router-dom";
// import { useState } from "react";
// import { Search, X } from "lucide-react";
// import mesbah from "../../assets/Images/mezbah.jpg"
// import alamgir from "../../assets/Images/alamgir.jpg"
// import nadim from "../../assets/Images/nadim.jpg"


// const BloodGroupPage = () => {
//     const { bloodGroup } = useParams();
//     const [searchTerm, setSearchTerm] = useState("");

//     const donorsData = {
//         "a-positive": [
//             { id: 1, name: "Shadikul Islam", phone: "+1234567890", address: "Apon Mor, Jashore", institute: "Govt. M M College, Jashore", image: [mesbah] },
//             { id: 2, name: "Md Alamgir Hossain", phone: "01319502545", address: "Kulbaria, Maheshpur, Jhenaidah", institute: "Noakhali Science and Technology University", image: [alamgir] },
//             { id: 3, name: "Shadikul Islam", phone: "+1234567890", address: "Apon Mor, Jashore", institute: "Govt. M M College, Jashore", image: [mesbah] },
//             { id: 4, name: "Alice Smith", phone: "+9876543210", address: "456 Elm St, Town", institute: "XYZ College", image: "https://via.placeholder.com/150" },
//             { id: 5, name: "Shadikul Islam", phone: "+1234567890", address: "Apon Mor, Jashore", institute: "Govt. M M College, Jashore", image: [mesbah] },
//             { id: 6, name: "Alice Smith", phone: "+9876543210", address: "456 Elm St, Town", institute: "XYZ College", image: "https://via.placeholder.com/150" },
//             { id: 7, name: "Alice Smith", phone: "+9876543210", address: "456 Elm St, Town", institute: "XYZ College", image: "https://via.placeholder.com/150" }
//         ],
//         "b-positive": [
//             { id: 8, name: "Robert Brown", phone: "+1122334455", address: "789 Oak St, Metro", institute: "LMN Institute", image: "https://via.placeholder.com/150" },
//             { id: 9, name: "Md Alamgir Hossain", phone: "01319502545", address: "Kulbaria, Maheshpur, Jhenaidah", institute: "Noakhali Science and Technology University", image: [alamgir] }
//         ],
//         "o-negative": [
//             { id: 10, name: "Michael Lee", phone: "+5566778899", address: "202 Cedar St, Rural", institute: "RST University", image: "https://via.placeholder.com/150" }
//         ],
//         "ab-positive":[
//             { id: 11, name: "Nadim Parvez Emon", phone: "01953348774", address: "Nishchintopur, Maheshpur, Jhenaidah", institute: "Shaheed Suhrawardy Medical College", image: [nadim] },
//         ]
//     };

//     const donors = donorsData[bloodGroup.toLowerCase()] || [];

//     const filteredDonors = donors.filter((donor) =>
//         Object.entries(donor).some(
//             ([key, value]) =>
//                 key !== "image" &&
//                 typeof value === "string" &&
//                 value.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//     );

//     return (
//         <div className="max-w-5xl mx-auto p-6  min-h-screen">
//             {/* Header Section */}

//             <div className="sticky top-16 bg-white z-10 p-4 shadow-lg rounded-md flex flex-col gap-3">
//                 <div className="bg-red-500 text-white p-2 rounded-xl shadow-lg text-center">
//                     <h1 className="text-3xl font-bold capitalize">{bloodGroup.replace("-", " ")} Blood Donors</h1>
//                     <p className="mt-2">Find and contact blood donors near you.</p>
//                 </div>

//                 {/* Search Box */}
//                 <div className="relative mt-2 max-w-lg mx-auto">
//                     <input
//                         type="text"
//                         placeholder="Search"
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                         className="w-full p-2 pl-16 border rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-red-400"
//                     />
//                     <Search className="absolute left-4 top-2 text-gray-500" size={24} />
//                     {searchTerm && (
//                         <button
//                             className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
//                             onClick={() => setSearchTerm("")}
//                         >
//                             <X size={24} />
//                         </button>
//                     )}
//                 </div>
//             </div>

//             {/* Donor List */}
//             <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {filteredDonors.length > 0 ? (
//                     filteredDonors.map((donor) => (
//                         <div key={donor.id} className="bg-white p-3 rounded-xl shadow-md hover:shadow-xl transition-transform transform hover:scale-105">
//                             <div className="flex flex-col items-center text-center">
//                                 <img src={donor.image} alt={donor.name} className="w-24 h-24 object-cover rounded-full border-4 border-red-500" />
//                                 <h2 className="text-lg font-semibold mt-1">{donor.name}</h2>
//                                 <p className="text-gray-600 mt-1 text-sm">📞 {donor.phone}</p>
//                                 <p className="text-gray-600 text-sm">🏠 {donor.address}</p>
//                                 <p className="text-gray-600 text-sm">🎓 {donor.institute}</p>
//                                 {/* <span className="mt-3 px-4 py-1 text-sm bg-red-600 text-white rounded-full">{bloodGroup.toUpperCase()}</span> */}
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <div className="col-span-full flex flex-col items-center">
//                         {/* <img src="https://via.placeholder.com/200?text=No+Results" alt="No Results" className="w-48" /> */}
//                         <p className="mt-3 text-gray-500 text-lg">No donors found.</p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default BloodGroupPage;





import { useParams } from "react-router-dom";
import { useState } from "react";
import { Search, X, Phone, MapPin, School, Heart } from "lucide-react"; // Importing icons

const BloodGroupPage = () => {
    const { bloodGroup } = useParams();
    const [searchTerm, setSearchTerm] = useState("");

    const donorsData = {
        "a-positive": [
            { id: 1, name: "Shadikul Islam", phone: "+1234567890", address: "Apon Mor, Jashore", institute: "Govt. M M College, Jashore", image: "https://via.placeholder.com/100" },
            { id: 2, name: "Alice Smith", phone: "+9876543210", address: "456 Elm St, Town", institute: "XYZ College", image: "https://via.placeholder.com/100" }
        ],
        "b-positive": [
            { id: 3, name: "Robert Brown", phone: "+1122334455", address: "789 Oak St, Metro", institute: "LMN Institute", image: "https://via.placeholder.com/100" }
        ],
        "o-negative": [
            { id: 8, name: "Michael Lee", phone: "+5566778899", address: "202 Cedar St, Rural", institute: "RST University", image: "https://via.placeholder.com/100" }
        ]
    };

    const donors = donorsData[bloodGroup.toLowerCase()] || [];

    const filteredDonors = donors.filter((donor) =>
        Object.entries(donor).some(
            ([key, value]) =>
                key !== "image" &&
                typeof value === "string" &&
                value.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-white dark:from-gray-900 dark:to-gray-800 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-10">
                    <h1 className="text-5xl font-bold text-red-600 dark:text-red-400 capitalize mb-3">
                        {bloodGroup.replace("-", " ")} Blood Donors
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 text-lg">
                        Find blood donors in your area quickly and easily.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="relative mb-10 max-w-md mx-auto">
                    <input
                        type="text"
                        placeholder="Search by name, phone, address..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 pl-12 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 transition-all duration-300 placeholder:italic"
                    />
                    <Search className="absolute left-4 top-3.5 text-gray-400 dark:text-gray-500" size={20} />
                    {searchTerm && (
                        <button
                            className="absolute right-4 top-3.5 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400"
                            onClick={() => setSearchTerm("")}
                        >
                            <X size={20} />
                        </button>
                    )}
                </div>

                {/* Donor Grid */}
                {filteredDonors.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredDonors.map((donor) => (
                            <div
                                key={donor.id}
                                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fadeIn"
                            >
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <img
                                            src={donor.image}
                                            alt={donor.name}
                                            className="w-16 h-16 rounded-full border-2 border-red-200 dark:border-gray-700"
                                        />
                                        <span className="bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 px-3 py-1 rounded-full text-sm font-semibold">
                                            {bloodGroup.toUpperCase()}
                                        </span>
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                                        {donor.name}
                                    </h2>
                                    <div className="space-y-2 text-gray-600 dark:text-gray-300">
                                        <p className="flex items-center gap-2">
                                            <Phone size={16} /> {donor.phone}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <MapPin size={16} /> {donor.address}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <School size={16} /> {donor.institute}
                                        </p>
                                    </div>
                                </div>
                                <div className="border-t border-gray-100 dark:border-gray-700 p-4 flex justify-end">
                                    <button className="flex items-center gap-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-500 transition-all duration-300">
                                        <Heart size={18} /> Thank Donor
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20">
                        <img
                            src="https://illustrations.popsy.co/gray/searching.svg"
                            alt="No Results"
                            className="w-48"
                        />
                        <p className="mt-6 text-gray-500 dark:text-gray-400 text-lg">
                            No donors found. Try a different search term.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BloodGroupPage;