import React, { useState, useEffect } from 'react';
import {
    CreditCard, TrendingUp, ArrowUpRight, ArrowDownRight,
    Search, Filter, Download, ChevronLeft, ChevronRight, Calendar,
    Clock,
    CheckCircle,
    User2,
    AlertCircle
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import AdminLayout from './AdminLayout';
import API_URL from '../../constants/Constants';
import * as XLSX from 'xlsx';

const PaymentsPage = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [payments, setPayments] = useState([]);
    const [filteredPayments, setFilteredPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Fetch payments data
    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${API_URL}/payments`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch payments');
                }

                const data = await response.json();
                const transformedData = data.map(payment => ({
                    id: payment.id,
                    requestId: payment.requestId,
                    amount: parseFloat(payment.amount),
                    phone_number: payment.phone_number,
                    transaction_id: payment.transaction_id,
                    status: payment.status,
                    customer: `${payment.client.firstname} ${payment.client.lastname}`,
                    date: new Date(payment.createdAt),
                    location: payment.request.service_location,
                    service: payment.request.service_category.name
                }));

                setPayments(transformedData);
                setFilteredPayments(transformedData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, []);

    // Filter payments based on date range, search term
    useEffect(() => {
        let result = payments;

        // Date range filter
        if (startDate && endDate) {
            result = result.filter(payment =>
                payment.date >= new Date(startDate) && payment.date <= new Date(endDate)
            );
        }

        // Search filter
        if (searchTerm) {
            result = result.filter(payment =>
                payment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                payment.phone_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                payment.location?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredPayments(result);
        setCurrentPage(1);
    }, [startDate, endDate, searchTerm, payments]);

    // Export to Excel
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredPayments.map(payment => ({
            // 'Payment ID': payment.id,
            // 'Request ID': payment.requestId,
            'Date': payment.date.toLocaleDateString(),
            'Customer': payment.customer,
            'Service': payment.service,
            'Amount (RWF)': payment.amount,
            'Location': payment.location,
            'Phone Number': payment.phone_number,
            'Transaction ID': payment.transaction_id,
            'Status': payment.status

        })));
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Payments");
        XLSX.writeFile(workbook, "payments_export.xlsx");
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPayments = filteredPayments.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);

    // Compute statistics
    // const totalRevenue = filteredPayments
    //     .filter(p => p.status === 'SUCCESSFULL' || 'COMPLETED')
    //     .reduce((sum, payment) => sum + payment.amount, 0);

    // const pendingAmount = filteredPayments
    //     .filter(p => p.status === 'PENDING')
    //     .reduce((sum, payment) => sum + payment.amount, 0);

    // const successRate = (filteredPayments.filter(p => p.status === 'COMPLETED').length /
    //     (filteredPayments.length || 1) * 100).toFixed(1);


    const totalRevenue = payments
        .filter(p => p.status === 'COMPLETED' || p.status === 'SUCCESSFULL')
        .reduce((sum, payment) => sum + parseFloat(payment.amount || 0), 0);

    const pendingAmount = payments
        .filter(p => p.status === 'PENDING')
        .reduce((sum, payment) => sum + parseFloat(payment.amount || 0), 0);

    const completedPayments = payments.filter(p => p.status === 'COMPLETED').length;
    const totalPayments = payments.length;
    const successRate = (completedPayments / (totalPayments || 1) * 100).toFixed(1);

    const uniqueCustomers = new Set(payments.map(p => p.client_id)).size;
    const averageTransactionValue = totalRevenue / (completedPayments || 1);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="p-6 flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-sky-500"></div>
                </div>
            </AdminLayout>
        );
    }

    if (error) {
        return (
            <AdminLayout>
                <div className="p-6 text-red-500 text-center">Error: {error}</div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="p-6 space-y-6">
                {/* Statistics Cards */}
                {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                        {
                            title: 'Total Revenue',
                            value: `${totalRevenue.toLocaleString()} RWF`,
                            icon: TrendingUp,
                            color: 'green',
                            subtitle: 'Active Requests'
                        },
                        {
                            title: 'Pending Amount',
                            value: `${pendingAmount.toLocaleString()} RWF`,
                            icon: CreditCard,
                            color: 'yellow',
                            subtitle: `${filteredPayments.filter(p => p.status === 'PENDING').length} pending requests`
                        },
                        {
                            title: 'Success Rate',
                            value: `${successRate}%`,
                            icon: TrendingUp,
                            color: 'blue',
                            subtitle: 'Completion Rate'
                        },
                        {
                            title: 'Failed Requests',
                            value: filteredPayments.filter(p => p.status === 'FAILED').length,
                            icon: ArrowDownRight,
                            color: 'red',
                            subtitle: 'Need attention'
                        }
                    ].map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <Card key={index} className="hover:shadow-md transition-shadow duration-300">
                                <CardContent className="pt-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                                            <p className="text-2xl font-bold">{stat.value}</p>
                                        </div>
                                        <div className={`h-12 w-12 bg-${stat.color}-50 rounded-full flex items-center justify-center`}>
                                            <Icon className={`h-6 w-6 text-${stat.color}-500`} />
                                        </div>
                                    </div>
                                    <div className={`mt-4 flex items-center text-sm text-${stat.color}-500`}>
                                        <ArrowUpRight className="h-4 w-4 mr-1" />
                                        <span>{stat.subtitle}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div> */}

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                        {
                            title: 'Total Revenue',
                            value: `${totalRevenue.toLocaleString()} RWF`,
                            icon: TrendingUp,
                            color: 'green',
                            subtitle: 'Total processed payments'
                        },
                        {
                            title: 'Pending Amount',
                            value: `${pendingAmount.toLocaleString()} RWF`,
                            icon: Clock,
                            color: 'yellow',
                            subtitle: `${payments.filter(p => p.status === 'PENDING').length} pending`
                        },
                        {
                            title: 'Completed Payments',
                            value: completedPayments,
                            icon: CheckCircle,
                            color: 'blue',
                            subtitle: `${successRate}% completion rate`
                        },
                       
                    
                    ].map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <Card key={index} className="hover:shadow-md transition-shadow duration-300">
                                <CardContent className="pt-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                                            <p className="text-2xl font-bold">{stat.value}</p>
                                        </div>
                                        <div className={`h-12 w-12 bg-${stat.color}-100 rounded-full flex items-center justify-center`}>
                                            <Icon className={`h-6 w-6 text-${stat.color}-500`} />
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-center text-sm text-gray-600">
                                        <span>{stat.subtitle}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Requests Table */}
                <Card className="shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
                        <CardTitle className="text-xl font-semibold text-gray-800">
                            Payments History
                        </CardTitle>
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-white shadow-sm rounded border border-gray-100">
                            {/* Date Range Inputs */}
                            <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4 w-full">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-600 mb-1">From</label>
                                    <input
                                        type="date"
                                        value={startDate || ''}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all duration-200"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-600 mb-1">To</label>
                                    <input
                                        type="date"
                                        value={endDate || ''}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all duration-200"
                                    />
                                </div>
                            </div>

                            {/* Search Input */}
                            <div className="w-full md:w-auto relative mt-6">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search requests..."
                                    className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all duration-200"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            {/* Export Button */}
                            <button
                                className="w-full md:w-auto mt-6 px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 flex items-center justify-center gap-2 transition-all duration-200"
                                onClick={exportToExcel}
                            >
                                <Download className="h-4 w-4" />
                                <span>Download</span>
                            </button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        {[
                                            'ID', 'Client', 'Amount', 'Location',
                                            'Phone Number', 'Status', 'Date'
                                        ].map((header, index) => (
                                            <th
                                                key={index}
                                                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {currentPayments.map((payment) => (
                                        <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                                #{payment.id.toString().padStart(5, '0')}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-500">{payment.customer}</td>
                                            <td className="px-4 py-3 text-sm font-semibold text-green-600">
                                                {payment.amount.toLocaleString()} RWF
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-500">{payment.location}</td>
                                            <td className="px-4 py-3 text-sm text-gray-500 truncate max-w-xs">
                                                {payment.phone_number}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${payment.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                                                    payment.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-red-100 text-red-800'
                                                    }`}>
                                                    {payment.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-500">
                                                {payment.date.toLocaleDateString()}
                                            </td>
                                            <td className="px-4 py-3 flex space-x-2">
                                                {/* <button className="text-sky-500 border border-sky-200 px-3 py-1 rounded hover:bg-sky-50 text-sm transition-colors">
                                                    View
                                                </button> */}
                                                {/* <button className="text-red-500 border border-red-200 px-3 py-1 rounded hover:bg-red-50 text-sm transition-colors">
                                                    Cancel
                                                </button> */}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-between items-center p-4 border-t">
                            <div className="text-sm text-gray-500">
                                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredPayments.length)} of {filteredPayments.length} entries
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-3 py-1 border rounded flex items-center disabled:opacity-50 hover:bg-gray-50 transition-colors"
                                >
                                    <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                                </button>
                                <div className="flex space-x-1">
                                    {[...Array(totalPages)].map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handlePageChange(index + 1)}
                                            className={`w-8 h-8 rounded ${currentPage === index + 1
                                                ? 'bg-sky-500 text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}
                                </div>
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="px-3 py-1 border rounded flex items-center disabled:opacity-50 hover:bg-gray-50 transition-colors"
                                >
                                    Next <ChevronRight className="h-4 w-4 ml-1" />
                                </button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
};

export default PaymentsPage;