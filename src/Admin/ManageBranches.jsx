import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const ManageBranches = () => {
    const [branches, setBranches] = useState([
        { id: 1, name: "Samonta", location: "Samonta, Jhenaidah", coordinator: "John Doe" },
    ]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ name: "", location: "", coordinator: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        setBranches([...branches, { ...formData, id: Date.now() }]);
        setFormData({ name: "", location: "", coordinator: "" });
        setShowModal(false);
    };

    const handleDelete = (id) => setBranches(branches.filter(b => b.id !== id));

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Manage Branches</h1>
                <button onClick={() => setShowModal(true)} className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700">
                    <FaPlus /> Add Branch
                </button>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Coordinator</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {branches.map((branch) => (
                            <tr key={branch.id}>
                                <td className="px-6 py-4">{branch.name}</td>
                                <td className="px-6 py-4">{branch.location}</td>
                                <td className="px-6 py-4">{branch.coordinator}</td>
                                <td className="px-6 py-4 flex gap-2">
                                    <button className="text-blue-600 hover:text-blue-800"><FaEdit /></button>
                                    <button onClick={() => handleDelete(branch.id)} className="text-red-600 hover:text-red-800"><FaTrash /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4">Add Branch</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input type="text" placeholder="Branch Name" className="w-full px-4 py-2 border rounded-lg" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                            <input type="text" placeholder="Location" className="w-full px-4 py-2 border rounded-lg" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} required />
                            <input type="text" placeholder="Coordinator" className="w-full px-4 py-2 border rounded-lg" value={formData.coordinator} onChange={(e) => setFormData({ ...formData, coordinator: e.target.value })} required />
                            <div className="flex gap-2">
                                <button type="submit" className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">Save</button>
                                <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageBranches;
