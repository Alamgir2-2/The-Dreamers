import { useState, useEffect } from "react";
import { Phone, MapPin, School, Heart, LayoutGrid, List, User } from "lucide-react";
import noData from "../../assets/Blood/Data.png";
import API_URL from '../../config/api';

const BloodGroupPage = ({ bloodGroup, searchTerm = "", availabilityFilter = "all", viewMode = 'grid' }) => {
    const [donors, setDonors] = useState([]);
    const [loading, setLoading] = useState(true);

    const calculateAvailability = (lastDonation) => {
        if (!lastDonation) return 999;
        const today = new Date();
        const lastDonationDate = new Date(lastDonation);
        const daysDifference = Math.floor((today - lastDonationDate) / (1000 * 60 * 60 * 24));
        const availableAfter = 90 - daysDifference;
        return availableAfter > 0 ? availableAfter : 0;
    };

    useEffect(() => {
        const fetchDonors = async () => {
            setLoading(true);
            try {
                const bgMap = {
                    'a-positive': 'A+', 'a-negative': 'A-',
                    'b-positive': 'B+', 'b-negative': 'B-',
                    'o-positive': 'O+', 'o-negative': 'O-',
                    'ab-positive': 'AB+', 'ab-negative': 'AB-'
                };
                const bg = bgMap[bloodGroup.toLowerCase()];
                const res = await fetch(`${API_URL}/api/donors?bloodGroup=${encodeURIComponent(bg)}`);
                const data = await res.json();
                if (Array.isArray(data)) {
                    setDonors(data.map(donor => ({ ...donor, availableAfter: calculateAvailability(donor.lastDonation) })));
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
            ([key, value]) => key !== "image" && key !== "imageUrl" && typeof value === "string" && value.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const matchesAvailability =
            availabilityFilter === "all" ||
            (availabilityFilter === "available" && donor.availableAfter === 0) ||
            (availabilityFilter === "unavailable" && donor.availableAfter > 0);
        return matchesSearch && matchesAvailability;
    });

    const isDonorAvailable = (availableAfter) => availableAfter === 0 || availableAfter >= 999;

    const getAvailabilityMessage = (availableAfter) => {
        if (availableAfter >= 999 || availableAfter === 0) return "Available";
        return `Available in ${availableAfter} days`;
    };

    return (
        <div className="p-2">
            <div className="max-w-6xl mx-auto">
                {loading ? (
                    <div className="text-center py-10 text-gray-600">Loading donors....</div>
                ) : filteredDonors.length > 0 ? (
                    <>
                        {/* Grid View */}
                        {viewMode === 'grid' && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {filteredDonors.map((donor) => (
                                    <div key={donor.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                                        <div className="bg-gradient-to-r from-red-50 to-pink-50 p-4 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md flex-shrink-0 bg-gray-100 flex items-center justify-center">
                                                    {donor.photo ? <img src={donor.photo} alt={donor.name} className="w-full h-full object-cover" /> : <User size={24} className="text-gray-400" />}
                                                </div>
                                                <div>
                                                    <h2 className="font-bold text-gray-800 text-lg">{donor.name}</h2>
                                                    <p className="text-sm text-red-600 font-semibold">{donor.bloodGroup}</p>
                                                </div>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${ isDonorAvailable(donor.availableAfter) ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                                                {getAvailabilityMessage(donor.availableAfter)}
                                            </span>
                                        </div>
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
                                                    <p className="text-xs text-gray-500"><span className="font-semibold">Last Donation:</span> {new Date(donor.lastBloodDonation).toLocaleDateString('en-GB')}</p>
                                                </div>
                                            )}
                                        </div>
                                        <div className="border-t border-gray-100 px-4 py-3 bg-gray-50 flex justify-end">
                                            <button className="flex items-center gap-2 text-red-600 hover:text-red-700 text-sm font-medium transition-all duration-300">
                                                <Heart size={16} /> Thank Donor
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* List View */}
                        {viewMode === 'list' && (
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
                                <table className="w-full text-sm">
                                    <thead className="sticky top-[49px] z-10">
                                        <tr className="bg-gray-50 border-b border-gray-200 shadow-sm">
                                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Donor</th>
                                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Blood</th>
                                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">Mobile</th>
                                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Address</th>
                                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Institution</th>
                                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredDonors.map((donor) => (
                                            <tr key={donor.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 border border-gray-200 bg-gray-100 flex items-center justify-center">
                                                            {donor.photo ? <img src={donor.photo} alt={donor.name} className="w-full h-full object-cover" /> : <User size={16} className="text-gray-400" />}
                                                        </div>
                                                        <span className="font-medium text-gray-800">{donor.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">{donor.bloodGroup}</span>
                                                </td>
                                                <td className="px-4 py-3 hidden sm:table-cell text-gray-500 text-sm">{donor.mobile || '—'}</td>
                                                <td className="px-4 py-3 hidden md:table-cell text-gray-500 text-sm max-w-[160px] truncate">{donor.currentAddress || '—'}</td>
                                                <td className="px-4 py-3 hidden lg:table-cell text-gray-500 text-sm">{donor.institution || donor.professionType || '—'}</td>
                                                <td className="px-4 py-3">
                                                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${ isDonorAvailable(donor.availableAfter) ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                                                        {getAvailabilityMessage(donor.availableAfter)}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center -mt-6">
                        <img src={noData} alt="No Data Found" className="w-75" />
                        <p className="text-gray-500 text-lg">No donors found. Try again...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BloodGroupPage;