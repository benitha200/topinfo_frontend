import React, { useState, useEffect } from 'react';
import { CreditCard, TrendingUp, ArrowUpRight, ArrowDownRight, Search, Filter, Download } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import AdminLayout from './AdminLayout';

const PaymentsPage = () => {
    const [dateRange, setDateRange] = useState('all');
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch payments data
    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const token = localStorage.getItem('token'); // Assume token is stored in localStorage
                const response = await fetch('http://localhost:3050/api/payments', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                
                if (!response.ok) {
                    throw new Error('Failed to fetch payments');
                }
                
                const data = await response.json();
                // Transform the data to match our payments structure
                const transformedData = data.map(request => ({
                    id: request.id,
                    amount: request.request.service_category.client_price || 0, // You might want to get this from service_categories
                    type: 'Service Request',
                    status: request.status || 'Pending',
                    customer: `${request.client.firstname}`, // You might want to fetch client details separately
                    date: request.service_date,
                    method: 'Standard',
                    description: request.request.description,
                    date_: request.request.service_date,
                    location: request.request.service_location
                }));
                setPayments(transformedData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, []);

    // Calculate payment statistics
    const totalRevenue = payments.reduce((sum, payment) =>
        payment.status === 'Completed' ? sum + payment.amount : sum, 0
    );

    const pendingAmount = payments.reduce((sum, payment) =>
        payment.status === 'Pending' ? sum + payment.amount : sum, 0
    );

    const successRate = (payments.filter(p => p.status === 'Completed').length / payments.length * 100).toFixed(1);

    // Filter payments based on search term
    const filteredPayments = payments.filter(payment => 
        payment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.location?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <AdminLayout>
                <div className="p-6">Loading payments data...</div>
            </AdminLayout>
        );
    }

    if (error) {
        return (
            <AdminLayout>
                <div className="p-6 text-red-500">Error: {error}</div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Service Requests & Payments</h1>
                    <div className="flex space-x-3">
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
                            <Download className="h-4 w-4" />
                            <span>Export</span>
                        </button>
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                            New Request
                        </button>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                                    <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
                                </div>
                                <div className="h-12 w-12 bg-green-50 rounded-full flex items-center justify-center">
                                    <TrendingUp className="h-6 w-6 text-green-500" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-sm text-green-500">
                                <ArrowUpRight className="h-4 w-4 mr-1" />
                                <span>Active Requests</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Pending Amount</p>
                                    <p className="text-2xl font-bold">${pendingAmount.toLocaleString()}</p>
                                </div>
                                <div className="h-12 w-12 bg-yellow-50 rounded-full flex items-center justify-center">
                                    <CreditCard className="h-6 w-6 text-yellow-500" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-sm text-yellow-500">
                                <ArrowUpRight className="h-4 w-4 mr-1" />
                                <span>{payments.filter(p => p.status === 'Pending').length} pending requests</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Success Rate</p>
                                    <p className="text-2xl font-bold">{successRate}%</p>
                                </div>
                                <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center">
                                    <TrendingUp className="h-6 w-6 text-blue-500" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-sm text-blue-500">
                                <ArrowUpRight className="h-4 w-4 mr-1" />
                                <span>Completion Rate</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Failed Requests</p>
                                    <p className="text-2xl font-bold">{payments.filter(p => p.status === 'Failed').length}</p>
                                </div>
                                <div className="h-12 w-12 bg-red-50 rounded-full flex items-center justify-center">
                                    <ArrowDownRight className="h-6 w-6 text-red-500" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-sm text-red-500">
                                <ArrowDownRight className="h-4 w-4 mr-1" />
                                <span>Need attention</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Requests Table */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Service Requests History</CardTitle>
                        <div className="flex space-x-2">
                            <select
                                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={dateRange}
                                onChange={(e) => setDateRange(e.target.value)}
                            >
                                <option value="all">All Time</option>
                                <option value="today">Today</option>
                                <option value="week">This Week</option>
                                <option value="month">This Month</option>
                            </select>
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Search requests..."
                                    className="pl-8 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
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
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">ID</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Client ID</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Amount</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Location</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Description</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredPayments.map((payment) => (
                                        <tr key={payment.id} className="border-b">
                                            <td className="px-4 py-3 text-sm">#{payment.id.toString().padStart(5, '0')}</td>
                                            <td className="px-4 py-3 text-sm">{payment.customer}</td>
                                            <td className="px-4 py-3 text-sm font-medium">{payment.amount.toLocaleString()} RWF</td>
                                            <td className="px-4 py-3 text-sm">{payment.location}</td>
                                            <td className="px-4 py-3 text-sm">{payment.description}</td>
                                           
                                            <td className="px-4 py-3 text-sm">
                                                <span className={`px-2 py-1 rounded-full text-xs ${
                                                    payment.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                    payment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                    {payment.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm">{payment.date_}</td>
                                            <td className="px-4 py-3 text-sm">
                                                <button className="text-blue-500 border-2 border-gray-300 p-2 rounded hover:text-blue-700 mr-2">View</button>
                                                <button className="text-red-500 border-2 border-gray-300 p-2 rounded hover:text-red-700">Cancel</button>
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

export default PaymentsPage;