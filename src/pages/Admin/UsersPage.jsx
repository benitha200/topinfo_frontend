import React, { useState, useEffect } from 'react';
import { Users, Search, Filter } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import AdminLayout from './AdminLayout';
import API_URL from '../../constants/Constants';

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');


    // Fetch users data combining both clients and service providers
    const fetchUsers = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            
            // Fetch both clients and service providers
            const [clientsResponse, providersResponse] = await Promise.all([
                fetch(`${API_URL}/clients`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }),
                fetch(`${API_URL}/service-providers`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
            ]);

            const clients = await clientsResponse.json();
            const providers = await providersResponse.json();

            // Combine and format the data
            const formattedUsers = [
                ...clients.map(client => ({
                    ...client,
                    role: 'Client',
                    status: 'Active' // You might want to add status field in your API
                })),
                ...providers.map(provider => ({
                    ...provider,
                    role: 'Service Provider',
                    status: provider.approved ? 'Active' : 'Pending'
                }))
            ];

            setUsers(formattedUsers);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch users');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleAddUser = async (userData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/clients`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                setAlertMessage('User added successfully');
                setShowAlert(true);
                fetchUsers(); // Refresh the users list
            } else {
                throw new Error('Failed to add user');
            }
        } catch (err) {
            setAlertMessage('Failed to add user');
            setShowAlert(true);
        }
    };

    const handleEditUser = async (id, userData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/clients/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                setAlertMessage('User updated successfully');
                setShowAlert(true);
                fetchUsers(); // Refresh the users list
            } else {
                throw new Error('Failed to update user');
            }
        } catch (err) {
            setAlertMessage('Failed to update user');
            setShowAlert(true);
        }
    };

    // Filter users based on search term
    const filteredUsers = users.filter(user => 
        user.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="p-6">Loading...</div>;
    if (error) return <div className="p-6 text-red-500">{error}</div>;

    return (
        <AdminLayout>
            <div className="p-6 space-y-6">
                {/* {showAlert && (
                    <Alert className="mb-4">
                        <AlertDescription>{alertMessage}</AlertDescription>
                    </Alert>
                )} */}

                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Users Management</h1>
                    <button 
                        onClick={() => {/* Add your new user modal/form logic */}}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Add New User
                    </button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>User Statistics</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                            <Users className="h-8 w-8 text-blue-500" />
                            <div>
                                <p className="text-sm text-gray-500">Total Users</p>
                                <p className="text-2xl font-bold">{users.length}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                            <Users className="h-8 w-8 text-green-500" />
                            <div>
                                <p className="text-sm text-gray-500">Active Users</p>
                                <p className="text-2xl font-bold">
                                    {users.filter(user => user.status === 'Active').length}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 p-4 bg-orange-50 rounded-lg">
                            <Users className="h-8 w-8 text-orange-500" />
                            <div>
                                <p className="text-sm text-gray-500">Pending Users</p>
                                <p className="text-2xl font-bold">
                                    {users.filter(user => user.status === 'Pending').length}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Users List</CardTitle>
                        <div className="flex space-x-2">
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Search users..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-8 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <button className="p-2 border rounded-lg hover:bg-gray-50">
                                <Filter className="h-4 w-4" />
                            </button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Name</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Email</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Role</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Location</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map((user) => (
                                        <tr key={user.id} className="border-b">
                                            <td className="px-4 py-3 text-sm">
                                                {`${user.firstname} ${user.lastname}`}
                                            </td>
                                            <td className="px-4 py-3 text-sm">{user.email}</td>
                                            <td className="px-4 py-3 text-sm">{user.role}</td>
                                            <td className="px-4 py-3 text-sm">
                                                <span className={`px-2 py-1 rounded-full text-xs ${
                                                    user.status === 'Active' ? 'bg-green-100 text-green-800' :
                                                    user.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                    {user.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm">
                                                {`${user.location_sector}, ${user.location_district}`}
                                            </td>
                                            <td className="px-4 py-3 text-sm">
                                                <button 
                                                    onClick={() => handleEditUser(user.id, {})}
                                                    className="text-blue-500 border border-2 border-gray-300 p-2 rounded hover:text-blue-700 mr-2"
                                                >
                                                    Edit
                                                </button>
                                                <button className="text-red-500 border border-2 border-gray-300 p-2 rounded hover:text-red-700">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
};

export default UsersPage;