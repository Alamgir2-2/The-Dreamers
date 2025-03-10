import { useState } from "react";
import { Search, X, Phone, MapPin, School, Heart } from "lucide-react";
import alamgir from "../../assets/Blood/alamgir.jpg";
import shadikul from "../../assets/Blood/Shadikul.jpg";
import noData from "../../assets/Blood/Data.png";

const BloodGroupPage = ({ bloodGroup }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const calculateAvailability = (lastDonation) => {
        const today = new Date();
        const lastDonationDate = new Date(lastDonation);
        const timeDifference = today - lastDonationDate;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        const daysRequiredToWait = 90; //Wait for 90 days according to WHO guidelines.
        const availableAfter = daysRequiredToWait - daysDifference;

        //If the lastDonation date is in the future, availableAfter can be negative.
        return availableAfter > 0 ? availableAfter : 0; //Return 0 if the value is negative.
    };

    const donorsData = {
        "a-positive": [
            {
                id: 1,
                name: "Shadikul Islam",
                phone: "+1234567890",
                address: "Apon Mor, Jashore",
                institute: "Govt. M M College, Jashore",
                image: [shadikul],
                lastDonation: "2024-02-12" 
            },
            {
                id: 2,
                name: "Md Alamgir Hossain",
                phone: "+8801319602545",
                address: "Kulbaria, Maheshpur, Jhenaidah",
                institute: "NSTU",
                image: [alamgir],
                lastDonation: "2025-02-20" 
            },
            {
                id: 3,
                name: "Md Alamgir Hossain",
                phone: "+8801319602545",
                address: "Kulbaria, Maheshpur, Jhenaidah",
                institute: "NSTU",
                image: [alamgir],
                lastDonation: "2024-12-10" 
            }
        ],
        "b-positive": [
            {
                id: 4,
                name: "Md Alamgir Hossain",
                phone: "+8801319602545",
                address: "Kulbaria, Maheshpur, Jhenaidah",
                institute: "NSTU",
                image: [alamgir],
                lastDonation: "2025-02-20" 
            }
        ],
       
    };

    const updatedDonorsData = Object.fromEntries(
        Object.entries(donorsData).map(([bloodGroup, donors]) => [
            bloodGroup,
            donors.map((donor) => ({
                ...donor,
                availableAfter: calculateAvailability(donor.lastDonation)
            }))
        ])
    );

    const donors = updatedDonorsData[bloodGroup.toLowerCase()] || [];

    const filteredDonors = donors.filter((donor) =>
        Object.entries(donor).some(
            ([key, value]) =>
                key !== "image" &&
                typeof value === "string" &&
                value.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const isDonorAvailable = (availableAfter) => {
        return availableAfter === 0;
    };

    const getAvailabilityMessage = (availableAfter) => {
        if (availableAfter === 0) {
            return "Available";
        } else {
            return `Available in ${availableAfter} days`;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-white dark:from-gray-900 dark:to-gray-800 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-red-600 dark:text-red-400 capitalize mb-3">
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
                        placeholder="Search Donor..."
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredDonors.map((donor) => (
                            <div
                                key={donor.id}
                                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fadeIn"
                            >
                                <div className="p-4">
                                    <div className="flex items-center justify-between mb-4">
                                        <img
                                            src={donor.image}
                                            alt={donor.name}
                                            className="w-16 h-16 rounded-full border-2 border-red-200 dark:border-gray-700"
                                        />
                                        <span
                                            className={`px-2 py-1 rounded-full text-[.6rem] font-semibold ${
                                                isDonorAvailable(donor.availableAfter)
                                                    ? "bg-green-100 text-green-600"
                                                    : "bg-red-100 text-red-600"
                                            }`}
                                        >
                                            {getAvailabilityMessage(donor.availableAfter)}
                                        </span>
                                    </div>
                                    <h2 className="font-bold text-gray-800 dark:text-gray-100 mb-2">
                                        {donor.name}
                                    </h2>
                                    <div className="text-xs space-y-2 text-gray-600 dark:text-gray-300">
                                        <p className="flex items-center gap-2">
                                            <Phone size={14} /> {donor.phone}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <MapPin size={14} /> {donor.address}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <School size={14} /> {donor.institute}
                                        </p>
                                        {/* Last Donation */}
                                        <p className="flex items-center gap-2">
                                            <span className="font-semibold">Last Donation:</span> {donor.lastDonation}
                                        </p>
                                    </div>
                                </div>
                                <div className="border-t border-gray-100 dark:border-gray-700 p-2 flex justify-end items-center">
                                    <button className="flex items-center gap-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-500 transition-all duration-300">
                                        <Heart size={14} /> Thank Donor
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center -mt-6">
                        <img
                            src={noData}
                            alt="No Data Found"
                            className="w-75"
                        />
                        <p className=" text-gray-500 dark:text-gray-400 text-lg">
                            No donors found. Try again...
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BloodGroupPage;