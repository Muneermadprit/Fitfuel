import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Trash2, Search } from 'lucide-react';
import DataTable from 'react-data-table-component';

export default function UserManagementPage() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isGuestView, setIsGuestView] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('https://api.dailyfit.ae/api/admin/get-users', { withCredentials: true });
            setUsers(response.data.data);
            setIsGuestView(false);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchGuestUsers = async () => {
        try {
            const response = await axios.get('https://api.dailyfit.ae/api/admin/get-guest-users', { withCredentials: true });
            setUsers(response.data.data);
            setIsGuestView(true);
        } catch (error) {
            console.error('Error fetching guest users:', error);
        }
    };

    const handleDelete = async (id) => {
        setUsers(users.filter(user => user._id !== id));
    };

    const filteredUsers = useMemo(() => {
        return users.filter(user =>
            user.userName.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [users, searchTerm]);

    const columns = [
        {
            name: 'Username',
            selector: row => row.userName,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.userEmail,
            sortable: true,
        },
        {
            name: 'Package',
            selector: row => row.cart?.package?.selectedPackage || 'No Package',
            sortable: true,
        },
        {
            name: 'Start Date',
            selector: row => row.cart?.package?.startDate || 'N/A',
            sortable: true,
        },
        {
            name: 'End Date',
            selector: row => row.cart?.package?.endDate || 'N/A',
            sortable: true,
        },
        {
            name: 'Actions',
            cell: (row) => (
                <div className="flex justify-center">
                    <button
                        onClick={() => handleDelete(row._id)}
                        className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            ),
        },
    ];


    return (
        <div className="p-4">
            <div className="bg-white rounded-lg shadow-md">
                <div className="p-4 border-b flex justify-between items-center">
                    <button
                        onClick={isGuestView ? fetchUsers : fetchGuestUsers}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        {isGuestView ? 'Switch to Admin View' : 'Guest View'}
                    </button>
                    <div className="relative w-64">
                        <h2 className="text-lg font-semibold">{isGuestView ? 'Guest Users List' : 'Admin Users List'}</h2>
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="pl-8 pr-4 py-2 w-full border rounded-md"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="p-4">
                    <DataTable
                        columns={columns}
                        data={filteredUsers}
                        pagination
                        responsive
                        highlightOnHover
                    />
                </div>
            </div>
        </div>
    );
}
