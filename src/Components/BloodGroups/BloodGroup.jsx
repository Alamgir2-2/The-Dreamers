import { useState, useEffect } from "react";
import { Search, X, Phone, MapPin, School, Heart } from "lucide-react";
import noData from "../../assets/Blood/Data.png";
import API_URL from '../../config/api';

const BloodGroupPage = ({ bloodGroup, searchTerm = "", availabilityFilter = "all" }) => {
    const [donors, setDonors] = useState([]);
    const [loading, setLoading] = useState(true);

    const calculateAvailability = (lastDonation) => {
        if (!lastDonation) return 999; // If no donation date, show as unavailable
        const today = new Date();
        const lastDonationDate = new Date(lastDonation);
        const timeDifference = today - lastDonationDate;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        const daysRequiredToWait = 90; //Wait for 90 days according to WHO guidelines.
        const availableAfter = daysRequiredToWait - daysDifference;

        //If the lastDonation date is in the future, availableAfter can be negative.
        return availableAfter > 0 ? availableAfter : 0; //Return 0 if the value is negative.
    };

    useEffect(() => {
        const fetchDonors = async () => {
            setLoading(true);
            try {
                // Convert URL format to database format
                // a-positive -> A+, b-negative -> B-, etc.
                const bgMap = {
                    'a-positive': 'A+',
                    'a-negative': 'A-',
                    'b-positive': 'B+',
                    'b-negative': 'B-',
                    'o-positive': 'O+',
                    'o-negative': 'O-',
                    'ab-positive': 'AB+',
                    'ab-negative': 'AB-'
                };
                const bg = bgMap[bloodGroup.toLowerCase()];
                const res = await fetch(`${API_URL}/api/donors?bloodGroup=${encodeURIComponent(bg)}`);
                const data = await res.json();
                if (Array.isArray(data)) {
                    const donorsWithAvailability = data.map(donor => ({
                        ...donor,
                        availableAfter: calculateAvailability(donor.lastDonation)
                    }));
                    setDonors(donorsWithAvailability);
                } else {
                    setDonors([]);
                }
            } catch (error) {
                console.error('Failed to fetch donors:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDonors();
    }, [bloodGroup]);

    const filteredDonors = donors.filter((donor) => {
        const matchesSearch = Object.entries(donor).some(
            ([key, value]) =>
                key !== "image" && key !== "imageUrl" &&
                typeof value === "string" &&
                value.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        const matchesAvailability = 
            availabilityFilter === "all" ||
            (availabilityFilter === "available" && donor.availableAfter === 0) ||
            (availabilityFilter === "unavailable" && donor.availableAfter > 0);
        
        return matchesSearch && matchesAvailability;
    });

    const isDonorAvailable = (availableAfter) => {
        return availableAfter === 0 || availableAfter >= 999;
    };

    const getAvailabilityMessage = (availableAfter) => {
        if (availableAfter >= 999) {
            return "Available";
        } else if (availableAfter === 0) {
            return "Available";
        } else {
            return `Available in ${availableAfter} days`;
        }
    };

    return (
        <div className="p-4">
            <div className="max-w-6xl mx-auto">
                {loading ? (
                    <div className="text-center py-10 text-gray-600">Loading donors....</div>
                ) : filteredDonors.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredDonors.map((donor) => (
                            <div
                                key={donor.id}
                                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                            >
                                {/* Header with image and availability */}
                                <div className="bg-gradient-to-r from-red-50 to-pink-50 p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={donor.photo || '/default-avatar.png'}
                                            alt={donor.name}
                                            className="w-16 h-16 rounded-full border-3 border-white shadow-md object-cover"
                                        />
                                        <div>
                                            <h2 className="font-bold text-gray-800 text-lg">{donor.name}</h2>
                                            <p className="text-sm text-red-600 font-semibold">{donor.bloodGroup}</p>
                                        </div>
                                    </div>
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                            isDonorAvailable(donor.availableAfter)
                                                ? "bg-green-500 text-white"
                                                : "bg-red-500 text-white"
                                        }`}
                                    >
                                        {getAvailabilityMessage(donor.availableAfter)}
                                    </span>
                                </div>

                                {/* Body with info */}
                                <div className="p-4 space-y-3">
                                    <div className="flex items-start gap-2 text-gray-700">
                                        <Phone size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm">{donor.mobile || 'Not provided'}</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-gray-700">
                                        <MapPin size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm line-clamp-2">{donor.currentAddress || 'Not provided'}</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-gray-700">
                                        <School size={16} className="text-purple-600 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm line-clamp-1">{donor.institution || donor.professionType || 'Not provided'}</span>
                                    </div>
                                    {donor.lastBloodDonation && (
                                        <div className="pt-2 border-t border-gray-100">
                                            <p className="text-xs text-gray-500">
                                                <span className="font-semibold">Last Donation:</span> {new Date(donor.lastBloodDonation).toLocaleDateString('en-GB')}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Footer */}
                                <div className="border-t border-gray-100 px-4 py-3 bg-gray-50 flex justify-end">
                                    <button className="flex items-center gap-2 text-red-600 hover:text-red-700 text-sm font-medium transition-all duration-300">
                                        <Heart size={16} /> Thank Donor
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
                        <p className="text-gray-500 text-lg">
                            No donors found. Try again...
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BloodGroupPage;