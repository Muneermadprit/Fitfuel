import React, { useState, useMemo } from 'react';
import { Trash2, Search } from 'lucide-react';
import DataTable from 'react-data-table-component';

const initialUsers = [
    { id: 1, username: 'johndoe', phone: '123-456-7890', email: 'johndoe@example.com' },
    { id: 2, username: 'janesmith', phone: '234-567-8901', email: 'janesmith@example.com' },
    { id: 3, username: 'mikedev', phone: '345-678-9012', email: 'mikedev@example.com' },
    { id: 4, username: 'emilyweb', phone: '456-789-0123', email: 'emilyweb@example.com' },
    { id: 5, username: 'chrisops', phone: '567-890-1234', email: 'chrisops@example.com' }
]


export default function UserManagementPage() {
    const [users, setUsers] = useState(initialUsers);
    const [searchTerm, setSearchTerm] = useState('');

    const handleDelete = (id) => {
        setUsers(users.filter(user => user.id !== id));
    };

    const filteredUsers = useMemo(() => {
        return users.filter(user =>
            user.username.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [users, searchTerm]);

    const columns = [
        {
            name: 'Username',
            selector: row => row.username,
            sortable: true,
        },
        {
            name: 'Phone',
            selector: row => row.phone,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: (row) => (
                <div className="flex justify-center">
                    <button
                        onClick={() => handleDelete(row.id)}
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
                <div className="p-4 border-b">
                    <div className="flex justify-end items-center space-x-4">
                        <div className="relative w-64">
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