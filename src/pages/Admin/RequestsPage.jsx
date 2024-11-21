import React from 'react';
import { FileText, Search, Filter } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import AdminLayout from './AdminLayout';

const RequestsPage = () => {
    const requests = [
        { id: 1, title: 'Technical Support', status: 'In Progress', priority: 'High', requester: 'John Doe', date: '2024-03-15' },
        { id: 2, title: 'Account Access', status: 'Pending', priority: 'Medium', requester: 'Jane Smith', date: '2024-03-14' },
        { id: 3, title: 'Service Upgrade', status: 'Completed', priority: 'Low', requester: 'Mike Johnson', date: '2024-03-13' },
        { id: 4, title: 'Payment Issue', status: 'In Progress', priority: 'High', requester: 'Sarah Wilson', date: '2024-03-12' },
        { id: 5, title: 'Feature Request', status: 'New', priority: 'Medium', requester: 'Tom Brown', date: '2024-03-11' }
    ];

    return (

        <AdminLayout>
            <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Requests Management</h1>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                        Create Request
                    </button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Request Statistics</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                            <FileText className="h-8 w-8 text-blue-500" />
                            <div>
                                <p className="text-sm text-gray-500">Total Requests</p>
                                <p className="text-2xl font-bold">{requests.length}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 p-4 bg-yellow-50 rounded-lg">
                            <FileText className="h-8 w-8 text-yellow-500" />
                            <div>
                                <p className="text-sm text-gray-500">Pending</p>
                                <p className="text-2xl font-bold">
                                    {requests.filter(req => req.status === 'Pending').length}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                            <FileText className="h-8 w-8 text-green-500" />
                            <div>
                                <p className="text-sm text-gray-500">Completed</p>
                                <p className="text-2xl font-bold">
                                    {requests.filter(req => req.status === 'Completed').length}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 p-4 bg-red-50 rounded-lg">
                            <FileText className="h-8 w-8 text-red-500" />
                            <div>
                                <p className="text-sm text-gray-500">High Priority</p>
                                <p className="text-2xl font-bold">
                                    {requests.filter(req => req.priority === 'High').length}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Requests List</CardTitle>
                        <div className="flex space-x-2">
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Search requests..."
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
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Title</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Requester</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Priority</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {requests.map((request) => (
                                        <tr key={request.id} className="border-b">
                                            <td className="px-4 py-3 text-sm">{request.title}</td>
                                            <td className="px-4 py-3 text-sm">{request.requester}</td>
                                            <td className="px-4 py-3 text-sm">
                                                <span className={`px-2 py-1 rounded-full text-xs ${request.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                        request.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                                                            request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                                'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {request.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm">
                                                <span className={`px-2 py-1 rounded-full text-xs ${request.priority === 'High' ? 'bg-red-100 text-red-800' :
                                                        request.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-green-100 text-green-800'
                                                    }`}>
                                                    {request.priority}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm">{request.date}</td>
                                            <td className="px-4 py-3 text-sm">
                                                <button className="text-blue-500 hover:text-blue-700 mr-2">View</button>
                                                <button className="text-green-500 hover:text-green-700 mr-2">Update</button>
                                                <button className="text-red-500 hover:text-red-700">Close</button>
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

export default RequestsPage;