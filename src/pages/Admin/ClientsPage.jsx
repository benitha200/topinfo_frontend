import React, { useState, useEffect } from 'react';
import { Users, Search, Filter, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import AdminLayout from './AdminLayout';
import API_URL from '../../constants/Constants';
import CustomersSupportLayout from '../customerSupport/CustomersSupportLayout';
import AgentsSkeleton from '../Agent/AgentsSkeleton';

const ClientsPage = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        province: '',
        district: '',
        sector: ''
    });
    const itemsPerPage = 10;

    // Fetch users data
    const fetchUsers = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            
            const clientsResponse = await fetch(`${API_URL}/clients`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            const clients = await clientsResponse.json();
    
            const formattedUsers = clients.map(client => ({
                ...client,
                name: `${client.firstname} ${client.lastname}`
            }));
    
            setUsers(formattedUsers);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch users');
            setLoading(false);
        }
    };

    // CSV Download function
    const downloadCSV = () => {
        // Define CSV headers
        const headers = [
            'Name',
            'Email',
            'Province',
            'District',
            'Sector'
        ];

        // Convert filtered users to CSV format
        const csvData = filteredUsers.map(user => [
            `${user.firstname} ${user.lastname}`,
            user.email || '',
            user.location_province || '',
            user.location_district || '',
            user.location_sector || ''
        ]);

        // Combine headers and data
        const csvContent = [
            headers.join(','),
            ...csvData.map(row => row.join(','))
        ].join('\n');

        // Create and trigger download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'clients.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Comprehensive filter function
    const filteredUsers = users.filter(user => {
        const matchesSearch = 
            user.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.lastname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesProvince = !filters.province || 
            user.location_province?.toLowerCase() === filters.province.toLowerCase();
        
        const matchesDistrict = !filters.district || 
            user.location_district?.toLowerCase() === filters.district.toLowerCase();
        
        const matchesSector = !filters.sector || 
            user.location_sector?.toLowerCase() === filters.sector.toLowerCase();
        
        return matchesSearch && matchesProvince && matchesDistrict && matchesSector;
    });

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

    // Pagination change handler
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Get unique filter options
    const uniqueProvinces = [...new Set(users.map(user => user.location_province).filter(Boolean))];
    const uniqueDistricts = [...new Set(users.map(user => user.location_district).filter(Boolean))];
    const uniqueSectors = [...new Set(users.map(user => user.location_sector).filter(Boolean))];

    // Fetch users on component mount
    useEffect(() => {
        fetchUsers();
    }, []);

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, filters]);


    useEffect(() => {
        try {
          const userString = localStorage.getItem("user");
          if (userString) {
            const userData = JSON.parse(userString);
            setUser(userData);
          }
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }, []);

    const Layout = user?.role === "ADMIN" ? AdminLayout : CustomersSupportLayout;
    // if (loading) return <Layout><div className="p-6">Loading...</div></Layout>;

    // Render loading or error states
    if (loading) return (
        <Layout>
            <AgentsSkeleton/>
        </Layout>
    );

    return (
        <Layout>
            <div className="p-6 space-y-6">
                {/* Client Statistics Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Client Statistics</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg">
                            <Users className="h-8 w-8 text-slate-500" />
                            <div>
                                <p className="text-sm text-gray-500">Total Clients</p>
                                <p className="text-2xl font-bold">{users.length}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                            <Users className="h-8 w-8 text-green-500" />
                            <div>
                                <p className="text-sm text-gray-500">Filtered Clients</p>
                                <p className="text-2xl font-bold">{filteredUsers.length}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Users List Card */}
                <Card>
                    <CardHeader className="flex flex-col space-y-4">
                        <div className="flex justify-between items-center">
                            <CardTitle>Clients List</CardTitle>
                            <div className="flex space-x-2">
                                <button
                                    onClick={downloadCSV}
                                    className="flex items-center space-x-2 px-4 py-2 bg-slate-500 text-white rounded hover:bg-slate-600 transition-colors"
                                >
                                    <Download className="h-4 w-4" />
                                    <span>Download CSV</span>
                                </button>
                                <div className="relative">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-8 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-slate-500"
                                    />
                                </div>
                            </div>
                        </div>
                        
                        {/* Filters */}
                        <div className="flex space-x-2">
                            <select 
                                value={filters.province} 
                                onChange={(e) => setFilters(prev => ({...prev, province: e.target.value}))}
                                className="px-2 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-slate-500"
                            >
                                <option value="">All Provinces</option>
                                {uniqueProvinces.map(province => (
                                    <option key={province} value={province}>{province}</option>
                                ))}
                            </select>
                            <select 
                                value={filters.district} 
                                onChange={(e) => setFilters(prev => ({...prev, district: e.target.value}))}
                                className="px-2 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-slate-500"
                            >
                                <option value="">All Districts</option>
                                {uniqueDistricts.map(district => (
                                    <option key={district} value={district}>{district}</option>
                                ))}
                            </select>
                            <select 
                                value={filters.sector} 
                                onChange={(e) => setFilters(prev => ({...prev, sector: e.target.value}))}
                                className="px-2 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-slate-500"
                            >
                                <option value="">All Sectors</option>
                                {uniqueSectors.map(sector => (
                                    <option key={sector} value={sector}>{sector}</option>
                                ))}
                            </select>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {currentUsers.length > 0 ? (
                            <>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Name</th>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Email</th>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Province</th>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">District</th>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Sector</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentUsers.map((user) => (
                                                <tr key={user.id} className="border-b hover:bg-gray-50 transition-colors">
                                                    <td className="px-4 py-3 text-sm">
                                                        {`${user.firstname} ${user.lastname}`}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm">{user.email || "-"}</td>
                                                    <td className="px-4 py-3 text-sm">{user.location_province}</td>
                                                    <td className="px-4 py-3 text-sm">{user.location_district}</td>
                                                    <td className="px-4 py-3 text-sm">{user.location_sector}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                
                                {/* Pagination Controls */}
                                <div className="flex justify-between items-center mt-4">
                                    <div className="text-sm text-gray-500">
                                        Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredUsers.length)} of {filteredUsers.length} results
                                    </div>
                                    <div className="flex space-x-2">
                                        <button 
                                            onClick={() => paginate(currentPage - 1)} 
                                            disabled={currentPage === 1}
                                            className="p-2 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                        </button>
                                        <button 
                                            onClick={() => paginate(currentPage + 1)} 
                                            disabled={indexOfLastItem >= filteredUsers.length}
                                            className="p-2 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <ChevronRight className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="text-center text-gray-500 py-4">
                                No users found
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </Layout>
    );
};

export default ClientsPage;