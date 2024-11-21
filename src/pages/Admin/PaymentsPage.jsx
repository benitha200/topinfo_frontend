import React, { useState } from 'react';
import { CreditCard, TrendingUp, ArrowUpRight, ArrowDownRight, Search, Filter, Download } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import AdminLayout from './AdminLayout';

const PaymentsPage = () => {
    const [dateRange, setDateRange] = useState('all');

    const payments = [
        { id: 1, amount: 299.99, type: 'Subscription', status: 'Completed', customer: 'John Doe', date: '2024-03-15', method: 'Credit Card' },
        { id: 2, amount: 199.50, type: 'One-time', status: 'Completed', customer: 'Jane Smith', date: '2024-03-14', method: 'PayPal' },
        { id: 3, amount: 499.99, type: 'Subscription', status: 'Pending', customer: 'Mike Johnson', date: '2024-03-13', method: 'Bank Transfer' },
        { id: 4, amount: 149.99, type: 'One-time', status: 'Completed', customer: 'Sarah Wilson', date: '2024-03-12', method: 'Credit Card' },
        { id: 5, amount: 399.99, type: 'Subscription', status: 'Failed', customer: 'Tom Brown', date: '2024-03-11', method: 'Credit Card' },
        { id: 6, amount: 799.99, type: 'One-time', status: 'Completed', customer: 'Emily Davis', date: '2024-03-10', method: 'PayPal' },
    ];

    // Calculate payment statistics
    const totalRevenue = payments.reduce((sum, payment) =>
        payment.status === 'Completed' ? sum + payment.amount : sum, 0
    );

    const pendingAmount = payments.reduce((sum, payment) =>
        payment.status === 'Pending' ? sum + payment.amount : sum, 0
    );

    const successRate = (payments.filter(p => p.status === 'Completed').length / payments.length * 100).toFixed(1);

    return (
        <AdminLayout>
            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Payments Management</h1>
                    <div className="flex space-x-3">
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
                            <Download className="h-4 w-4" />
                            <span>Export</span>
                        </button>
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                            New Payment
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
                                <span>12% from last month</span>
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
                                <span>{payments.filter(p => p.status === 'Pending').length} pending transactions</span>
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
                                <span>2.5% increase</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Failed Payments</p>
                                    <p className="text-2xl font-bold">{payments.filter(p => p.status === 'Failed').length}</p>
                                </div>
                                <div className="h-12 w-12 bg-red-50 rounded-full flex items-center justify-center">
                                    <ArrowDownRight className="h-6 w-6 text-red-500" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-sm text-red-500">
                                <ArrowDownRight className="h-4 w-4 mr-1" />
                                <span>3 in last 24 hours</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Payments Table */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Payments History</CardTitle>
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
                                    placeholder="Search payments..."
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
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">ID</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Customer</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Amount</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Type</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Method</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {payments.map((payment) => (
                                        <tr key={payment.id} className="border-b">
                                            <td className="px-4 py-3 text-sm">#{payment.id.toString().padStart(5, '0')}</td>
                                            <td className="px-4 py-3 text-sm">{payment.customer}</td>
                                            <td className="px-4 py-3 text-sm font-medium">${payment.amount.toLocaleString()}</td>
                                            <td className="px-4 py-3 text-sm">{payment.type}</td>
                                            <td className="px-4 py-3 text-sm">{payment.method}</td>
                                            <td className="px-4 py-3 text-sm">
                                                <span className={`px-2 py-1 rounded-full text-xs ${payment.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                        payment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-red-100 text-red-800'
                                                    }`}>
                                                    {payment.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm">{payment.date}</td>
                                            <td className="px-4 py-3 text-sm">
                                                <button className="text-blue-500 hover:text-blue-700 mr-2">View</button>
                                                <button className="text-red-500 hover:text-red-700">Refund</button>
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