import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaHome, FaTint, FaCalendar, FaUsers, FaCodeBranch, FaEnvelope, FaBars, FaSignOutAlt } from "react-icons/fa";

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
    };

    const menuItems = [
        { name: "Dashboard", path: "/admin/dashboard", icon: <FaHome /> },
        { name: "Blood Bank", path: "/admin/blood-bank", icon: <FaTint /> },
        { name: "Events", path: "/admin/events", icon: <FaCalendar /> },
        { name: "Members", path: "/admin/members", icon: <FaUsers /> },
        { name: "Branches", path: "/admin/branches", icon: <FaCodeBranch /> },
        { name: "Messages", path: "/admin/messages", icon: <FaEnvelope /> },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            <aside className={`${isSidebarOpen ? "w-64" : "w-20"} bg-green-800 text-white transition-all duration-300`}>
                <div className="p-4 flex items-center justify-between">
                    <h1 className={`${isSidebarOpen ? "block" : "hidden"} text-xl font-bold`}>Admin Panel</h1>
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-white"><FaBars size={20} /></button>
                </div>
                <nav className="mt-8">
                    {menuItems.map((item) => (
                        <Link key={item.path} to={item.path} className="flex items-center gap-4 px-4 py-3 hover:bg-green-700 transition">
                            <span className="text-xl">{item.icon}</span>
                            <span className={`${isSidebarOpen ? "block" : "hidden"}`}>{item.name}</span>
                        </Link>
                    ))}
                    <button onClick={handleLogout} className="flex items-center gap-4 px-4 py-3 hover:bg-red-700 transition w-full text-left mt-8">
                        <FaSignOutAlt className="text-xl" />
                        <span className={`${isSidebarOpen ? "block" : "hidden"}`}>Logout</span>
                    </button>
                </nav>
            </aside>
            <main className="flex-1 overflow-y-auto">
                <div className="p-8"><Outlet /></div>
            </main>
        </div>
    );
};

export default AdminLayout;
