import { useState, useEffect } from 'react';
import API_URL from '../config/api';

const TestDonors = () => {
    const [donors, setDonors] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/api/donors`)
            .then(r => r.json())
            .then(data => {
                console.log('All donors:', data);
                setDonors(data);
            })
            .catch(err => console.error('Error:', err));
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">All Donors in Database</h1>
            <div className="bg-white rounded shadow">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 text-left">Name</th>
                            <th className="p-2 text-left">Blood Group</th>
                            <th className="p-2 text-left">Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {donors.map(d => (
                            <tr key={d.id} className="border-t">
                                <td className="p-2">{d.name}</td>
                                <td className="p-2">{d.bloodGroup}</td>
                                <td className="p-2">{d.phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TestDonors;
