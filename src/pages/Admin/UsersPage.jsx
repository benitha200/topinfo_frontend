import React from 'react';
import { Users, Search, Filter } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import AdminLayout from './AdminLayout';

const UsersPage = () => {
    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', role: 'User', joinDate: '2024-03-01' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Active', role: 'Admin', joinDate: '2024-02-15' },
        { id: 3, name: 'Mike Johnson', email: 'mike@example.com', status: 'Pending', role: 'User', joinDate: '2024-03-10' },
        { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', status: 'Active', role: 'User', joinDate: '2024-01-20' },
        { id: 5, name: 'Tom Brown', email: 'tom@example.com', status: 'Inactive', role: 'User', joinDate: '2024-02-28' },
        { id: 6, name: 'Emily Davis', email: 'emily@example.com', status: 'Active', role: 'Agent', joinDate: '2024-03-05' }
    ];

    return (
        <AdminLayout>
            <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Users Management</h1>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
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
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Join Date</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.id} className="border-b">
                                            <td className="px-4 py-3 text-sm">{user.name}</td>
                                            <td className="px-4 py-3 text-sm">{user.email}</td>
                                            <td className="px-4 py-3 text-sm">{user.role}</td>
                                            <td className="px-4 py-3 text-sm">
                                                <span className={`px-2 py-1 rounded-full text-xs ${user.status === 'Active' ? 'bg-green-100 text-green-800' :
                                                        user.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-red-100 text-red-800'
                                                    }`}>
                                                    {user.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm">{user.joinDate}</td>
                                            <td className="px-4 py-3 text-sm">
                                                <button className="text-blue-500 hover:text-blue-700 mr-2">Edit</button>
                                                <button className="text-red-500 hover:text-red-700">Delete</button>
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