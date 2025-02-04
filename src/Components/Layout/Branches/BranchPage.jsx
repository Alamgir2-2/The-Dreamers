import React from "react";
import { useParams } from "react-router-dom";

const branchData = {
    1: {
        president: {
            name: "John Doe",
            image: "/images/president1.jpg",
            details: "President of Branch 1",
        },
        members: [
            { name: "Alice", age: 22, institution: "XYZ University", bloodGroup: "A+" },
            { name: "Bob", age: 25, institution: "ABC College", bloodGroup: "O-" },
        ],
    },
    2: {
        president: {
            name: "Jane Smith",
            image: "/images/president2.jpg",
            details: "President of Branch 2",
        },
        members: [
            { name: "Charlie", age: 21, institution: "LMN University", bloodGroup: "B+" },
            { name: "Dave", age: 23, institution: "PQR Institute", bloodGroup: "AB-" },
        ],
    },
};

const BranchPage = () => {
    const { id } = useParams();
    const branch = branchData[id];

    if (!branch) {
        return <div className="text-center text-red-500">Branch not found.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Branch President Section */}
            <div className="flex items-center bg-gray-100 p-6 rounded-lg shadow-md">
                <img
                    src={branch.president.image}
                    alt={branch.president.name}
                    className="w-40 h-40 object-cover rounded-full"
                />
                <div className="ml-6">
                    <h2 className="text-2xl font-bold">{branch.president.name}</h2>
                    <p className="text-gray-600">{branch.president.details}</p>
                </div>
            </div>

            {/* Other Members Section */}
            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Other Members</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {branch.members.map((member, index) => (
                        <div key={index} className="bg-white p-4 shadow-md rounded-lg">
                            <h4 className="font-bold">{member.name}</h4>
                            <p>Age: {member.age}</p>
                            <p>Institution: {member.institution}</p>
                            <p>Blood Group: {member.bloodGroup}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BranchPage;
