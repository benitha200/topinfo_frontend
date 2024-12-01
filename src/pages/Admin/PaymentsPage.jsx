// import React, { useState, useEffect } from 'react';
// import { CreditCard, TrendingUp, ArrowUpRight, ArrowDownRight, Search, Filter, Download } from 'lucide-react';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import AdminLayout from './AdminLayout';
// import API_URL from '../../constants/Constants';

// const PaymentsPage = () => {
//     const [dateRange, setDateRange] = useState('all');
//     const [payments, setPayments] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [searchTerm, setSearchTerm] = useState('');

//     // Fetch payments data
//     useEffect(() => {
//         const fetchPayments = async () => {
//             try {
//                 const token = localStorage.getItem('token'); // Assume token is stored in localStorage
//                 const response = await fetch(`${API_URL}/payments`, {
//                     headers: {
//                         'Authorization': `Bearer ${token}`,
//                     }
//                 });
                
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch payments');
//                 }
                
//                 const data = await response.json();
//                 // Transform the data to match our payments structure
//                 const transformedData = data.map(request => ({
//                     id: request.id,
//                     amount: request.request.service_category.client_price || 0, // You might want to get this from service_categories
//                     type: 'Service Request',
//                     status: request.status || 'Pending',
//                     customer: `${request.client.firstname}`, // You might want to fetch client details separately
//                     date: request.service_date,
//                     method: 'Standard',
//                     description: request.request.description,
//                     date_: request.request.service_date,
//                     location: request.request.service_location
//                 }));
//                 setPayments(transformedData);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchPayments();
//     }, []);

//     // Calculate payment statistics
//     const totalRevenue = payments.reduce((sum, payment) =>
//         payment.status === 'Completed' ? sum + payment.amount : sum, 0
//     );

//     const pendingAmount = payments.reduce((sum, payment) =>
//         payment.status === 'Pending' ? sum + payment.amount : sum, 0
//     );

//     const successRate = (payments.filter(p => p.status === 'Completed').length / payments.length * 100).toFixed(1);

//     // Filter payments based on search term
//     const filteredPayments = payments.filter(payment => 
//         payment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         payment.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         payment.location?.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     if (loading) {
//         return (
//             <AdminLayout>
//                 <div className="p-6">Loading payments data...</div>
//             </AdminLayout>
//         );
//     }

//     if (error) {
//         return (
//             <AdminLayout>
//                 <div className="p-6 text-red-500">Error: {error}</div>
//             </AdminLayout>
//         );
//     }

//     return (
//         <AdminLayout>
//             <div className="p-6 space-y-6">

//                 {/* Statistics Cards */}
//                 <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//                     <Card>
//                         <CardContent className="pt-6">
//                             <div className="flex items-center justify-between">
//                                 <div>
//                                     <p className="text-sm font-medium text-gray-500">Total Revenue</p>
//                                     <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
//                                 </div>
//                                 <div className="h-12 w-12 bg-green-50 rounded-full flex items-center justify-center">
//                                     <TrendingUp className="h-6 w-6 text-green-500" />
//                                 </div>
//                             </div>
//                             <div className="mt-4 flex items-center text-sm text-green-500">
//                                 <ArrowUpRight className="h-4 w-4 mr-1" />
//                                 <span>Active Requests</span>
//                             </div>
//                         </CardContent>
//                     </Card>

//                     <Card>
//                         <CardContent className="pt-6">
//                             <div className="flex items-center justify-between">
//                                 <div>
//                                     <p className="text-sm font-medium text-gray-500">Pending Amount</p>
//                                     <p className="text-2xl font-bold">${pendingAmount.toLocaleString()}</p>
//                                 </div>
//                                 <div className="h-12 w-12 bg-yellow-50 rounded-full flex items-center justify-center">
//                                     <CreditCard className="h-6 w-6 text-yellow-500" />
//                                 </div>
//                             </div>
//                             <div className="mt-4 flex items-center text-sm text-yellow-500">
//                                 <ArrowUpRight className="h-4 w-4 mr-1" />
//                                 <span>{payments.filter(p => p.status === 'Pending').length} pending requests</span>
//                             </div>
//                         </CardContent>
//                     </Card>

//                     <Card>
//                         <CardContent className="pt-6">
//                             <div className="flex items-center justify-between">
//                                 <div>
//                                     <p className="text-sm font-medium text-gray-500">Success Rate</p>
//                                     <p className="text-2xl font-bold">{successRate}%</p>
//                                 </div>
//                                 <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center">
//                                     <TrendingUp className="h-6 w-6 text-blue-500" />
//                                 </div>
//                             </div>
//                             <div className="mt-4 flex items-center text-sm text-blue-500">
//                                 <ArrowUpRight className="h-4 w-4 mr-1" />
//                                 <span>Completion Rate</span>
//                             </div>
//                         </CardContent>
//                     </Card>

//                     <Card>
//                         <CardContent className="pt-6">
//                             <div className="flex items-center justify-between">
//                                 <div>
//                                     <p className="text-sm font-medium text-gray-500">Failed Requests</p>
//                                     <p className="text-2xl font-bold">{payments.filter(p => p.status === 'Failed').length}</p>
//                                 </div>
//                                 <div className="h-12 w-12 bg-red-50 rounded-full flex items-center justify-center">
//                                     <ArrowDownRight className="h-6 w-6 text-red-500" />
//                                 </div>
//                             </div>
//                             <div className="mt-4 flex items-center text-sm text-red-500">
//                                 <ArrowDownRight className="h-4 w-4 mr-1" />
//                                 <span>Need attention</span>
//                             </div>
//                         </CardContent>
//                     </Card>
//                 </div>

//                 {/* Requests Table */}
//                 <Card>
//                     <CardHeader className="flex flex-row items-center justify-between">
//                         <CardTitle>Payments History</CardTitle>
//                         <div className="flex space-x-2">
//                             <select
//                                 className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 value={dateRange}
//                                 onChange={(e) => setDateRange(e.target.value)}
//                             >
//                                 <option value="all">All Time</option>
//                                 <option value="today">Today</option>
//                                 <option value="week">This Week</option>
//                                 <option value="month">This Month</option>
//                             </select>
//                             <div className="relative">
//                                 <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
//                                 <input
//                                     type="text"
//                                     placeholder="Search requests..."
//                                     className="pl-8 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                     value={searchTerm}
//                                     onChange={(e) => setSearchTerm(e.target.value)}
//                                 />
//                             </div>
//                             <button className="p-2 border rounded-lg hover:bg-gray-50">
//                                 <Filter className="h-4 w-4" />
//                             </button>
//                         </div>
//                     </CardHeader>
//                     <CardContent>
//                         <div className="overflow-x-auto">
//                             <table className="w-full">
//                                 <thead>
//                                     <tr className="border-b">
//                                         <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">ID</th>
//                                         <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Client ID</th>
//                                         <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Amount</th>
//                                         <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Location</th>
//                                         <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Description</th>
//                                         <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
//                                         <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date</th>
//                                         <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {filteredPayments.map((payment) => (
//                                         <tr key={payment.id} className="border-b">
//                                             <td className="px-4 py-3 text-sm">#{payment.id.toString().padStart(5, '0')}</td>
//                                             <td className="px-4 py-3 text-sm">{payment.customer}</td>
//                                             <td className="px-4 py-3 text-sm font-medium">{payment.amount.toLocaleString()} RWF</td>
//                                             <td className="px-4 py-3 text-sm">{payment.location}</td>
//                                             <td className="px-4 py-3 text-sm">{payment.description}</td>
                                           
//                                             <td className="px-4 py-3 text-sm">
//                                                 <span className={`px-2 py-1 rounded-full text-xs ${
//                                                     payment.status === 'SUCCESSFULL' ? 'bg-green-100 text-green-800' :
//                                                     payment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
//                                                     'bg-red-100 text-red-800'
//                                                 }`}>
//                                                     {payment.status}
//                                                 </span>
//                                             </td>
//                                             <td className="px-4 py-3 text-sm">{payment.date_}</td>
//                                             <td className="px-4 py-3 text-sm">
//                                                 <button className="text-blue-500 border-2 border-gray-300 p-2 rounded hover:text-blue-700 mr-2">View</button>
//                                                 <button className="text-red-500 border-2 border-gray-300 p-2 rounded hover:text-red-700">Cancel</button>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </CardContent>
//                 </Card>
//             </div>
//         </AdminLayout>
//     );
// };

// export default PaymentsPage;

import React, { useState, useEffect } from 'react';
import { CreditCard, TrendingUp, ArrowUpRight, ArrowDownRight, Search, Filter, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import AdminLayout from './AdminLayout';
import API_URL from '../../constants/Constants';

const PaymentsPage = () => {
    const [dateRange, setDateRange] = useState('all');
    const [payments, setPayments] = useState([]);
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
                const transformedData = data.map(request => ({
                    id: request.id,
                    amount: request.request.service_category.client_price || 0,
                    type: 'Service Request',
                    status: request.status || 'Pending',
                    customer: `${request.client.firstname}`,
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

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPayments = filteredPayments.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="p-6 flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-blue-500"></div>
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
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                        { 
                            title: 'Total Revenue', 
                            value: `$${totalRevenue.toLocaleString()}`, 
                            icon: TrendingUp, 
                            color: 'green', 
                            subtitle: 'Active Requests' 
                        },
                        { 
                            title: 'Pending Amount', 
                            value: `$${pendingAmount.toLocaleString()}`, 
                            icon: CreditCard, 
                            color: 'yellow', 
                            subtitle: `${payments.filter(p => p.status === 'Pending').length} pending requests` 
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
                            value: payments.filter(p => p.status === 'Failed').length, 
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
                </div>

                {/* Requests Table */}
                <Card className="shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
                        <CardTitle className="text-xl font-semibold text-gray-800">Payments History</CardTitle>
                        <div className="flex space-x-2">
                            <select
                                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
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
                                    className="pl-8 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-64"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <button className="p-2 border rounded-lg hover:bg-gray-50 transition-colors">
                                <Filter className="h-4 w-4" />
                            </button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        {[
                                            'ID', 'Client ID', 'Amount', 'Location', 
                                            'Description', 'Status', 'Date', 'Actions'
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
                                                {payment.description}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                    payment.status === 'SUCCESSFULL' ? 'bg-green-100 text-green-800' :
                                                    payment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                    {payment.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-500">{payment.date_}</td>
                                            <td className="px-4 py-3 flex space-x-2">
                                                <button className="text-blue-500 border border-blue-200 px-3 py-1 rounded hover:bg-blue-50 text-sm transition-colors">
                                                    View
                                                </button>
                                                <button className="text-red-500 border border-red-200 px-3 py-1 rounded hover:bg-red-50 text-sm transition-colors">
                                                    Cancel
                                                </button>
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
                                            className={`w-8 h-8 rounded ${
                                                currentPage === index + 1 
                                                    ? 'bg-blue-500 text-white' 
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