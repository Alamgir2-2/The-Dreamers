import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaFilter, FaUpload } from "react-icons/fa";
import toast from 'react-hot-toast';
import API_URL from '../config/api';

const ManageBloodBank = () => {
    const [donors, setDonors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingDonor, setEditingDonor] = useState(null);
    const [filterBloodGroup, setFilterBloodGroup] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [formData, setFormData] = useState({ name: "", bloodGroup: "", phone: "", address: "", institute: "", lastDonation: "", imageUrl: "" });
    const [uploading, setUploading] = useState(false);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
            try {
                const res = await fetch(`${API_URL}/upload`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ file: reader.result })
                });
                const data = await res.json();
                setFormData({ ...formData, imageUrl: data.imageUrl });
                toast.success('Image uploaded successfully!');
            } catch (error) {
                toast.error('Failed to upload image');
            } finally {
                setUploading(false);
            }
        };
    };

    useEffect(() => {
        fetchDonors();
    }, []);

    const fetchDonors = async () => {
        try {
            const res = await fetch(`${API_URL}/donors`);
            const data = await res.json();
            setDonors(data);
        } catch (error) {
            toast.error('Failed to load donors');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingDonor) {
                await fetch(`${API_URL}/donors/${editingDonor.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
                toast.success('Donor updated successfully!');
                setEditingDonor(null);
            } else {
                await fetch(`${API_URL}/donors`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
                toast.success('Donor added successfully!');
            }
            setFormData({ name: "", bloodGroup: "", phone: "", address: "", institute: "", lastDonation: "", imageUrl: "" });
            setShowModal(false);
            fetchDonors();
        } catch (error) {
            toast.error('Failed to save donor.');
        }
    };

    const handleEdit = (donor) => {
        setEditingDonor(donor);
        setFormData(donor);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this donor?")) {
            try {
                await fetch(`${API_URL}/donors/${id}`, { method: 'DELETE' });
                toast.success('Donor deleted successfully!');
                fetchDonors();
            } catch (error) {
                toast.error('Failed to delete donor.');
            }
        }
    };

    const calculateAvailability = (lastDonation) => {
        const today = new Date();
        const lastDonationDate = new Date(lastDonation);
        const daysDifference = Math.floor((today - lastDonationDate) / (1000 * 60 * 60 * 24));
        const availableAfter = 90 - daysDifference;
        return availableAfter > 0 ? availableAfter : 0;
    };

    const filteredDonors = donors.filter(donor => {
        const matchesBloodGroup = filterBloodGroup === "All" || donor.bloodGroup === filterBloodGroup;
        const matchesSearch = donor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             donor.phone.includes(searchTerm) || 
                             donor.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             donor.institute.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesBloodGroup && matchesSearch;
    });

    const bloodGroups = ["All", "A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

    const getBloodGroupStats = () => {
        const stats = {};
        bloodGroups.slice(1).forEach(bg => {
            const count = donors.filter(d => d.bloodGroup === bg).length;
            const available = donors.filter(d => d.bloodGroup === bg && calculateAvailability(d.lastDonation) === 0).length;
            stats[bg] = { total: count, available };
        });
        return stats;
    };

    const stats = getBloodGroupStats();

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Manage Blood Bank</h1>
                <button onClick={() => { setShowModal(true); setEditingDonor(null); setFormData({ name: "", bloodGroup: "", phone: "", address: "", institute: "", lastDonation: "", imageUrl: "" }); }} className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700">
                    <FaPlus /> Add Donor
                </button>
            </div>

            {/* Blood Group Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-6">
                {bloodGroups.slice(1).map(bg => (
                    <div key={bg} className="bg-white p-3 rounded-lg shadow-md text-center border-2 border-red-200">
                        <div className="text-2xl font-bold text-red-600">{bg}</div>
                        <div className="text-xs text-gray-600 mt-1">Total: {stats[bg].total}</div>
                        <div className="text-xs text-green-600">Available: {stats[bg].available}</div>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <input type="text" placeholder="Search by name, phone, address, or institute..." className="w-full px-4 py-2 border rounded-lg" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                    <div className="flex items-center gap-2">
                        <FaFilter className="text-gray-500" />
                        <select className="px-4 py-2 border rounded-lg" value={filterBloodGroup} onChange={(e) => setFilterBloodGroup(e.target.value)}>
                            {bloodGroups.map(bg => <option key={bg} value={bg}>{bg === "All" ? "All Blood Groups" : bg}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            {/* Donors Table */}
            <div className="bg-white rounded-lg shadow-md overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Blood Group</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Address</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Institute</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Donation</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Availability</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {filteredDonors.length > 0 ? filteredDonors.map((donor) => {
                            const availability = calculateAvailability(donor.lastDonation);
                            return (
                                <tr key={donor.id}>
                                    <td className="px-6 py-4">{donor.name}</td>
                                    <td className="px-6 py-4"><span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold">{donor.bloodGroup}</span></td>
                                    <td className="px-6 py-4">{donor.phone}</td>
                                    <td className="px-6 py-4">{donor.address}</td>
                                    <td className="px-6 py-4">{donor.institute}</td>
                                    <td className="px-6 py-4">{new Date(donor.lastDonation).toLocaleDateString('en-GB')}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${availability === 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {availability === 0 ? 'Available' : `${availability} days`}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 flex gap-2">
                                        <button onClick={() => handleEdit(donor)} className="text-blue-600 hover:text-blue-800"><FaEdit /></button>
                                        <button onClick={() => handleDelete(donor.id)} className="text-red-600 hover:text-red-800"><FaTrash /></button>
                                    </td>
                                </tr>
                            );
                        }) : (
                            <tr>
                                <td colSpan="8" className="px-6 py-8 text-center text-gray-500">No donors found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-4">{editingDonor ? 'Edit' : 'Add'} Blood Donor</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="Full Name" className="w-full px-4 py-2 border rounded-lg" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                                <select className="w-full px-4 py-2 border rounded-lg" value={formData.bloodGroup} onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })} required>
                                    <option value="">Select Blood Group</option>
                                    {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                                </select>
                            </div>
                            <input type="tel" placeholder="Phone Number" className="w-full px-4 py-2 border rounded-lg" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
                            <input type="text" placeholder="Address" className="w-full px-4 py-2 border rounded-lg" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} required />
                            <input type="text" placeholder="Institute/Organization" className="w-full px-4 py-2 border rounded-lg" value={formData.institute} onChange={(e) => setFormData({ ...formData, institute: e.target.value })} required />
                            <div>
                                <label className="block text-gray-700 mb-2">Last Donation Date</label>
                                <input type="date" className="w-full px-4 py-2 border rounded-lg" value={formData.lastDonation} onChange={(e) => setFormData({ ...formData, lastDonation: e.target.value })} required />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Donor Image</label>
                                <div className="flex gap-2">
                                    <input type="file" accept="image/*" onChange={handleImageUpload} className="flex-1 px-4 py-2 border rounded-lg" disabled={uploading} />
                                    {uploading && <span className="text-sm text-gray-500">Uploading...</span>}
                                </div>
                                {formData.imageUrl && (
                                    <img src={formData.imageUrl} alt="Preview" className="mt-2 w-20 h-20 rounded-full object-cover" />
                                )}
                            </div>
                            <div className="flex gap-2">
                                <button type="submit" className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">{editingDonor ? 'Update' : 'Save'}</button>
                                <button type="button" onClick={() => { setShowModal(false); setEditingDonor(null); }} className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageBloodBank;
