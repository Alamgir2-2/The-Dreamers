import React from 'react';

const DonorList = () => {
    const [showBloodGroups, setShowBloodGroups] = useState(false);
    const bloodGroups = [
        { name: "A Positive (A+) ", path: "/blood-groups/a-positive" },
        { name: "A Negative (A-)", path: "/blood-groups/a-negative" },
        { name: "B Positive (B+)", path: "/blood-groups/b-positive" },
        { name: "B Negative (B-)", path: "/blood-groups/b-negative" },
        { name: "O Positive (O+)", path: "/blood-groups/o-positive" },
        { name: "O Negative (O-)", path: "/blood-groups/o-negative" },
        { name: "AB Positive (AB+)", path: "/blood-groups/ab-positive" },
        { name: "AB Negative (AB-)", path: "/blood-groups/ab-negative" }
    ];
    return (
        <div>
            <div>
                <button onClick={() => setShowBloodGroups(!showBloodGroups)} className="w-full mb-2 p-3 bg-[#078d83] text-white rounded-lg hover:bg-[#085a54]">
                    Donors
                </button>
                {showBloodGroups && (
                    <div className="ml-4 mt-2 bg-gray-100 p-2 rounded-lg shadow-md">
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
        </div>
    );
};

export default DonorList;