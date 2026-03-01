import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (credentials.email === "admin@dreamers.com" && credentials.password === "admin123") {
            localStorage.setItem("adminToken", "admin-authenticated");
            navigate("/admin/dashboard");
        } else {
            alert("Invalid credentials! Use: admin@dreamers.com / admin123");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-green-800 mb-6">Admin Portal</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-2">Email</label>
                        <input type="email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" value={credentials.email} onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} required />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Password</label>
                        <input type="password" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" value={credentials.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} required />
                    </div>
                    <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">Login</button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
