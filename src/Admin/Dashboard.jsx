import React from "react";
import { FaTint, FaCalendar, FaUsers, FaCodeBranch } from "react-icons/fa";

const Dashboard = () => {
    const stats = [
        { title: "Blood Donors", count: 150, icon: <FaTint />, color: "bg-red-500" },
        { title: "Events", count: 25, icon: <FaCalendar />, color: "bg-blue-500" },
        { title: "Members", count: 300, icon: <FaUsers />, color: "bg-green-500" },
        { title: "Branches", count: 8, icon: <FaCodeBranch />, color: "bg-purple-500" },
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">{stat.title}</p>
                                <p className="text-3xl font-bold text-gray-800 mt-2">{stat.count}</p>
                            </div>
                            <div className={`${stat.color} text-white p-4 rounded-full text-2xl`}>{stat.icon}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
