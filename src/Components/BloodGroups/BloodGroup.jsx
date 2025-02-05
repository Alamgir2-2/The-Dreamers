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



import { useParams } from "react-router-dom";
import { useState } from "react";
import { Search, X } from "lucide-react";
import mesbah from "../../assets/Images/mezbah.jpg"
import alamgir from "../../assets/Images/alamgir.jpg"


const BloodGroupPage = () => {
    const { bloodGroup } = useParams();
    const [searchTerm, setSearchTerm] = useState("");

    const donorsData = {
        "a-positive": [
            { id: 1, name: "Shadikul Islam", phone: "+1234567890", address: "Apon Mor, Jashore", institute: "Govt. M M College, Jashore", image: [mesbah] },
            { id: 2, name: "Md Alamgir Hossain", phone: "01319502545", address: "Kulbaria, Maheshpur, Jhenaidah", institute: "Noakhali Science and Technology University", image: [alamgir] },
            { id: 3, name: "Shadikul Islam", phone: "+1234567890", address: "Apon Mor, Jashore", institute: "Govt. M M College, Jashore", image: [mesbah] },
            { id: 4, name: "Alice Smith", phone: "+9876543210", address: "456 Elm St, Town", institute: "XYZ College", image: "https://via.placeholder.com/150" },
            { id: 5, name: "Shadikul Islam", phone: "+1234567890", address: "Apon Mor, Jashore", institute: "Govt. M M College, Jashore", image: [mesbah] },
            { id: 6, name: "Alice Smith", phone: "+9876543210", address: "456 Elm St, Town", institute: "XYZ College", image: "https://via.placeholder.com/150" },
            { id: 7, name: "Alice Smith", phone: "+9876543210", address: "456 Elm St, Town", institute: "XYZ College", image: "https://via.placeholder.com/150" }
        ],
        "b-positive": [
            { id: 8, name: "Robert Brown", phone: "+1122334455", address: "789 Oak St, Metro", institute: "LMN Institute", image: "https://via.placeholder.com/150" }
        ],
        "o-negative": [
            { id: 9, name: "Michael Lee", phone: "+5566778899", address: "202 Cedar St, Rural", institute: "RST University", image: "https://via.placeholder.com/150" }
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
        <div className="max-w-5xl mx-auto p-6  min-h-screen">
            {/* Header Section */}

            <div className="sticky top-12 bg-white z-10 p-4 shadow-lg rounded-md flex flex-col gap-3">
                <div className="bg-red-500 text-white p-6 rounded-xl shadow-lg text-center">
                    <h1 className="text-4xl font-extrabold capitalize">{bloodGroup.replace("-", " ")} Blood Donors</h1>
                    <p className="mt-2 text-lg">Find and contact blood donors near you.</p>
                </div>

                {/* Search Box */}
                <div className="relative mt-6 max-w-lg mx-auto">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-4 pl-12 border rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                    <Search className="absolute left-4 top-4 text-gray-500" size={24} />
                    {searchTerm && (
                        <button
                            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
                            onClick={() => setSearchTerm("")}
                        >
                            <X size={24} />
                        </button>
                    )}
                </div>
            </div>

            {/* Donor List */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDonors.length > 0 ? (
                    filteredDonors.map((donor) => (
                        <div key={donor.id} className="bg-white p-3 rounded-xl shadow-md hover:shadow-xl transition-transform transform hover:scale-105">
                            <div className="flex flex-col items-center text-center">
                                <img src={donor.image} alt={donor.name} className="w-24 h-24 rounded-full border-4 border-red-500" />
                                <h2 className="text-lg font-semibold mt-1">{donor.name}</h2>
                                <p className="text-gray-600 mt-1 text-sm">📞 {donor.phone}</p>
                                <p className="text-gray-600 text-sm">🏠 {donor.address}</p>
                                <p className="text-gray-600 text-sm">🎓 {donor.institute}</p>
                                {/* <span className="mt-3 px-4 py-1 text-sm bg-red-600 text-white rounded-full">{bloodGroup.toUpperCase()}</span> */}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full flex flex-col items-center">
                        {/* <img src="https://via.placeholder.com/200?text=No+Results" alt="No Results" className="w-48" /> */}
                        <p className="mt-3 text-gray-500 text-lg">No donors found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BloodGroupPage;







// import { useParams } from "react-router-dom";
// import { useState } from "react";
// import { Search, X, Phone, MapPin, School } from "lucide-react"; // Importing icons

// const BloodGroupPage = () => {
//     const { bloodGroup } = useParams();
//     const [searchTerm, setSearchTerm] = useState("");

//     const donorsData = {
//         "a-positive": [
//             { id: 1, name: "Shadikul Islam", phone: "+1234567890", address: "Apon Mor, Jashore", institute: "Govt. M M College, Jashore", image: "https://via.placeholder.com/100" },
//             { id: 2, name: "Alice Smith", phone: "+9876543210", address: "456 Elm St, Town", institute: "XYZ College", image: "https://via.placeholder.com/100" }
//         ],
//         "b-positive": [
//             { id: 3, name: "Robert Brown", phone: "+1122334455", address: "789 Oak St, Metro", institute: "LMN Institute", image: "https://via.placeholder.com/100" }
//         ],
//         "o-negative": [
//             { id: 8, name: "Michael Lee", phone: "+5566778899", address: "202 Cedar St, Rural", institute: "RST University", image: "https://via.placeholder.com/100" }
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
//         <div className="max-w-4xl mx-auto p-6">
//             {/* Header Section */}
//             <div className="sticky top-0 bg-white dark:bg-gray-900 z-10 p-4 shadow-lg rounded-md flex flex-col gap-3">
//                 <h1 className="text-4xl font-bold text-red-600 dark:text-red-500 capitalize">
//                     {bloodGroup.replace("-", " ")} Blood Donors
//                 </h1>
//                 <p className="text-gray-600 dark:text-gray-300">Find blood donors in your area below:</p>

//                 {/* Search Input */}
//                 <div className="relative">
//                     <input
//                         type="text"
//                         placeholder="Search by name, phone, address..."
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                         className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 pl-10 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 transition-all duration-300 placeholder:italic"
//                     />
//                     <Search className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" size={20} />
//                     {searchTerm && (
//                         <button
//                             className="absolute right-3 top-3 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400"
//                             onClick={() => setSearchTerm("")}
//                         >
//                             <X size={20} />
//                         </button>
//                     )}
//                 </div>
//             </div>

//             {/* Donor List */}
//             {filteredDonors.length > 0 ? (
//                 <ul className="mt-6 space-y-4">
//                     {filteredDonors.map((donor) => (
//                         <li
//                             key={donor.id}
//                             className="p-5 border rounded-lg flex flex-col sm:flex-row items-center gap-5 bg-gray-50 dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 animate-fadeIn"
//                         >
//                             <img
//                                 src={donor.image}
//                                 alt={donor.name}
//                                 className="w-20 h-20 rounded-full border border-gray-300 dark:border-gray-700"
//                             />
//                             <div className="flex-1 w-full">
//                                 <div className="flex items-center justify-between">
//                                     <h2 className="text-xl font-semibold dark:text-gray-100">{donor.name}</h2>
//                                     <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
//                                         {bloodGroup.toUpperCase()}
//                                     </span>
//                                 </div>
//                                 <p className="text-gray-600 dark:text-gray-300 flex items-center gap-2 mt-2">
//                                     <Phone size={16} /> {donor.phone}
//                                 </p>
//                                 <p className="text-gray-600 dark:text-gray-300 flex items-center gap-2 mt-2">
//                                     <MapPin size={16} /> {donor.address}
//                                 </p>
//                                 <p className="text-gray-600 dark:text-gray-300 flex items-center gap-2 mt-2">
//                                     <School size={16} /> {donor.institute}
//                                 </p>
//                             </div>
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <div className="mt-10 flex flex-col items-center">
//                     <img
//                         src="https://illustrations.popsy.co/gray/searching.svg"
//                         alt="No Results"
//                         className="w-48"
//                     />
//                     <p className="mt-3 text-gray-500 dark:text-gray-400 text-lg">
//                         No donors found. Try a different search term.
//                     </p>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default BloodGroupPage;