import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const ManageEvents = () => {
    const [events, setEvents] = useState([
        { id: 1, title: "Blood Donation Camp", date: "2024-02-15", location: "Dhaka", status: "Upcoming" },
    ]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ title: "", date: "", location: "", status: "Upcoming" });

    const handleSubmit = (e) => {
        e.preventDefault();
        setEvents([...events, { ...formData, id: Date.now() }]);
        setFormData({ title: "", date: "", location: "", status: "Upcoming" });
        setShowModal(false);
    };

    const handleDelete = (id) => setEvents(events.filter(e => e.id !== id));

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Manage Events</h1>
                <button onClick={() => setShowModal(true)} className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700">
                    <FaPlus /> Add Event
                </button>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {events.map((event) => (
                            <tr key={event.id}>
                                <td className="px-6 py-4">{event.title}</td>
                                <td className="px-6 py-4">{event.date}</td>
                                <td className="px-6 py-4">{event.location}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs ${event.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>{event.status}</span>
                                </td>
                                <td className="px-6 py-4 flex gap-2">
                                    <button className="text-blue-600 hover:text-blue-800"><FaEdit /></button>
                                    <button onClick={() => handleDelete(event.id)} className="text-red-600 hover:text-red-800"><FaTrash /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4">Add Event</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input type="text" placeholder="Event Title" className="w-full px-4 py-2 border rounded-lg" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                            <input type="date" className="w-full px-4 py-2 border rounded-lg" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required />
                            <input type="text" placeholder="Location" className="w-full px-4 py-2 border rounded-lg" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} required />
                            <select className="w-full px-4 py-2 border rounded-lg" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                                <option value="Upcoming">Upcoming</option>
                                <option value="Completed">Completed</option>
                            </select>
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

export default ManageEvents;
