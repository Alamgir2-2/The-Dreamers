import React, { useState } from "react";
import { FaTrash, FaEnvelopeOpen } from "react-icons/fa";

const ManageMessages = () => {
    const [messages, setMessages] = useState([
        { id: 1, name: "Sarah Ahmed", email: "sarah@example.com", subject: "Inquiry about volunteering", message: "I would like to join as a volunteer", date: "2024-01-15", read: false },
        { id: 2, name: "Mike Johnson", email: "mike@example.com", subject: "Blood donation request", message: "Need O+ blood urgently", date: "2024-01-14", read: true },
    ]);
    const [selectedMessage, setSelectedMessage] = useState(null);

    const handleDelete = (id) => setMessages(messages.filter(m => m.id !== id));

    const handleView = (message) => {
        setSelectedMessage(message);
        setMessages(messages.map(m => m.id === message.id ? { ...m, read: true } : m));
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Contact Messages</h1>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {messages.map((msg) => (
                            <tr key={msg.id} className={!msg.read ? "bg-blue-50" : ""}>
                                <td className="px-6 py-4">{msg.name}</td>
                                <td className="px-6 py-4">{msg.email}</td>
                                <td className="px-6 py-4">{msg.subject}</td>
                                <td className="px-6 py-4">{msg.date}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs ${msg.read ? 'bg-gray-100 text-gray-800' : 'bg-blue-100 text-blue-800'}`}>
                                        {msg.read ? 'Read' : 'Unread'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 flex gap-2">
                                    <button onClick={() => handleView(msg)} className="text-green-600 hover:text-green-800"><FaEnvelopeOpen /></button>
                                    <button onClick={() => handleDelete(msg.id)} className="text-red-600 hover:text-red-800"><FaTrash /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {selectedMessage && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg w-full max-w-2xl">
                        <h2 className="text-2xl font-bold mb-4">{selectedMessage.subject}</h2>
                        <div className="space-y-2 mb-4">
                            <p><strong>From:</strong> {selectedMessage.name} ({selectedMessage.email})</p>
                            <p><strong>Date:</strong> {selectedMessage.date}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                            <p>{selectedMessage.message}</p>
                        </div>
                        <button onClick={() => setSelectedMessage(null)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageMessages;
