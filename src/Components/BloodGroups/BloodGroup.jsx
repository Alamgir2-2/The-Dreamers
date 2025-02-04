import { useParams } from "react-router-dom";

const BloodGroupPage = () => {
    const { bloodGroup } = useParams(); // Get the dynamic blood group from URL

    // Sample Data for Blood Donors (Replace with database later)
    const donorsData = {
        "a-positive": [
            { id: 1, name: "Shadikul Islam", phone: "+1234567890", address: "Apon Mor, Jashore", institute: "Govt. M M College, Jashore", image: "https://via.placeholder.com/100" },
            { id: 2, name: "Alice Smith", phone: "+9876543210", address: "456 Elm St, Town", institute: "XYZ College", image: "https://via.placeholder.com/100" }
        ],
        "b-positive": [
            { id: 3, name: "Robert Brown", phone: "+1122334455", address: "789 Oak St, Metro", institute: "LMN Institute", image: "https://via.placeholder.com/100" },
            { id: 4, name: "Emily Johnson", phone: "+6677889900", address: "101 Pine St, Suburb", institute: "OPQ Academy", image: "https://via.placeholder.com/100" }
        ],
        "o-negative": [
            { id: 5, name: "Michael Lee", phone: "+5566778899", address: "202 Cedar St, Rural", institute: "RST University", image: "https://via.placeholder.com/100" }
        ]
    };

    const donors = donorsData[bloodGroup.toLowerCase()] || [];

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-red-600 capitalize">{bloodGroup.replace("-", " ")} Blood Group</h1>
            <p className="mt-2 text-gray-600">Below is the list of people with this blood group:</p>

            {donors.length > 0 ? (
                <ul className="mt-6 space-y-4">
                    {donors.map((donor) => (
                        <li key={donor.id} className="p-4 border rounded-lg flex items-center gap-4 bg-gray-100 shadow-sm">
                            <img src={donor.image} alt={donor.name} className="w-16 h-16 rounded-full border" />
                            <div>
                                <h2 className="text-xl font-semibold">{donor.name}</h2>
                                <p className="text-gray-700">📞 {donor.phone}</p>
                                <p className="text-gray-700">🏠 {donor.address}</p>
                                <p className="text-gray-700">🎓 {donor.institute}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="mt-6 text-gray-500">No donors available for this blood group.</p>
            )}
        </div>
    );
};

export default BloodGroupPage;
