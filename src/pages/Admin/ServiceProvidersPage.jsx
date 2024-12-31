import React, { useState, useEffect, useMemo } from 'react';
import { Search, Plus, Pencil, Trash2, CheckCircle, XCircle, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Provinces, Districts, Sectors } from 'rwanda';
import AdminLayout from './AdminLayout';
import API_URL from '../../constants/Constants';
import * as XLSX from 'xlsx';
import OperationLayout from '../operation/OperationLayout';
import { useNavigate } from 'react-router-dom';

const ServiceProvidersPage = () => {
    const [user, setUser] = useState();
    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [providersPerPage] = useState(10);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingProvider, setEditingProvider] = useState(null);

    // Location state for dropdowns
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [sectors, setSectors] = useState([]);

    // Service categories state
    const [serviceCategories, setServiceCategories] = useState([]);
    const [selectedServiceCategory, setSelectedServiceCategory] = useState('');

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        work_email: '',
        phone: '',
        description: '',
        experience: '',
        location_province: '',
        location_district: '',
        location_sector: '',
        location_serve: '',
        additional_info: '',
        service_category_id: '',
        approved: true
    });

    // Fetch service categories
    const fetchServiceCategories = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/service-categories`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) throw new Error('Failed to fetch service categories');
            const data = await response.json();
            setServiceCategories(data);
        } catch (err) {
            setError(err.message);
        }
    };

    // Handle province change
    const handleProvinceChange = (province) => {
        setFormData({
            ...formData,
            location_province: province,
            location_district: '',
            location_sector: ''
        });
        setDistricts(Districts(province));
        setSectors([]);
    };

    // Handle district change
    const handleDistrictChange = (district) => {
        setFormData({
            ...formData,
            location_district: district,
            location_sector: ''
        });
        setSectors(Sectors(formData.location_province, district));
    };

    // Fetch providers
    const fetchProviders = async () => {
        try {
            const token = localStorage.getItem('token');

            // Construct query parameters
            const params = new URLSearchParams();
            if (startDate) params.append('startDate', startDate);
            if (endDate) params.append('endDate', endDate);

            const response = await fetch(`${API_URL}/service-providers?${params.toString()}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) throw new Error('Failed to fetch providers');
            const data = await response.json();
            setProviders(data);
            setCurrentPage(1);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const filteredProviders = useMemo(() => {
        return providers.filter(provider => {
            const matchesSearch =
                provider.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                provider.lastname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                provider.email?.toLowerCase().includes(searchTerm.toLowerCase());

            // Date range filtering
            const providerDate = new Date(provider.createdAt || Date.now());
            const start = startDate ? new Date(startDate) : null;
            const end = endDate ? new Date(endDate) : null;

            const matchesDateRange =
                (!start || providerDate >= start) &&
                (!end || providerDate <= end);

            // Service category filtering
            const matchesServiceCategory =
                !selectedServiceCategory ||
                (provider.service_category &&
                    String(provider.service_category.id) === String(selectedServiceCategory));

            return matchesSearch && matchesDateRange && matchesServiceCategory;
        });
    }, [providers, searchTerm, startDate, endDate, selectedServiceCategory]);

    // Pagination
    const indexOfLastProvider = currentPage * providersPerPage;
    const indexOfFirstProvider = indexOfLastProvider - providersPerPage;
    const currentProviders = filteredProviders.slice(indexOfFirstProvider, indexOfLastProvider);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    // Initial fetch for provinces and service categories
    useEffect(() => {
        setProvinces(Provinces());
        fetchServiceCategories();
        fetchProviders();
    }, []);

    // Create provider
    const createProvider = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/service-providers`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) throw new Error('Failed to create provider');
            fetchProviders();
            setIsAddModalOpen(false);
            resetForm();
        } catch (err) {
            setError(err.message);
        }
    };

    // Update provider
    const updateProvider = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/service-providers/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) throw new Error('Failed to update provider');
            fetchProviders();
            setEditingProvider(null);
            resetForm();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleAddServiceProvider = () => {
        navigate("/agent-dashboard/serviceprovider-agent/create");
    };

    // Delete provider
    const deleteProvider = async (id) => {
        if (window.confirm('Are you sure you want to delete this provider?')) {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${API_URL}/service-providers/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) throw new Error('Failed to delete provider');
                fetchProviders();
            } catch (err) {
                setError(err.message);
            }
        }
    };

    // Toggle approval status
    const toggleApproval = async (provider) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/service-providers/${provider.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...provider,
                    approved: !provider.approved,
                    approved_by: !provider.approved ? JSON.parse(localStorage.getItem('user')).id : null
                })
            });
            if (!response.ok) throw new Error('Failed to update approval status');
            fetchProviders();
        } catch (err) {
            setError(err.message);
        }
    };

    const downloadProviders = () => {
        // Prepare data for download using filtered providers
        const downloadData = filteredProviders.map(provider => ({
            'First Name': provider.firstname || 'N/A',
            'Last Name': provider.lastname || 'N/A',
            'Email': provider.email || 'N/A',
            'Work Email': provider.work_email || 'N/A',
            'Phone': provider.phone || 'N/A',
            'Province': provider.location_province || 'N/A',
            'District': provider.location_district || 'N/A',
            'Sector': provider.location_sector || 'N/A',
            'Service Area': provider.location_serve || 'N/A',
            'Experience': provider.experience || 'N/A',
            'Description': provider.description || 'N/A',
            'Service Category': serviceCategories.find(cat => cat.id === provider.service_category_id)?.name || 'N/A',
            'Status': provider.approved ? 'Approved' : 'Pending',
            'Created At': new Date(provider.createdAt).toLocaleDateString() || 'N/A'
        }));

        // Create worksheet
        const worksheet = XLSX.utils.json_to_sheet(downloadData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Service Providers");

        // Generate and download Excel file
        XLSX.writeFile(workbook, `service_providers_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    // Filter providers based on search term
    useEffect(() => {
        const filtered = providers.filter(provider =>
            provider.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            provider.lastname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            provider.email?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        // setFilteredProviders(filtered);
    }, [searchTerm, providers]);

    const navigate = useNavigate();

    // Initial fetch
    useEffect(() => {
        fetchProviders();
    }, [startDate, endDate]);

    // Reset form
    const resetForm = () => {
        setFormData({
            firstname: '',
            lastname: '',
            email: '',
            work_email: '',
            phone: '',
            description: '',
            experience: '',
            location_province: '',
            location_district: '',
            location_sector: '',
            location_serve: '',
            additional_info: '',
            service_category_id: '',
            approved: true
        });
    };

    // Handle edit click
    const handleEditClick = (provider) => {
        setEditingProvider(provider);
        setFormData({ ...provider });
    };

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

    const Layout = user?.role === "ADMIN" ? AdminLayout : OperationLayout;
    if (loading) return <Layout>
        <div className="p-6 space-y-6">
            {/* Header with title and buttons */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Service Providers</h1>

                <div className="flex items-center space-x-2">
                    <button className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        Download
                    </button>
                    <button className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Add Provider
                    </button>
                </div>
            </div>

            {/* Main card */}
            <Card>
                <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
                    <CardTitle className="text-xl font-bold">Providers List</CardTitle>
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 items-start md:items-center w-full md:w-auto">
                        {/* Service Category Filter */}
                        <select className="w-full md:w-auto p-2 border rounded">
                            <option value="">All Service Categories</option>
                        </select>

                        {/* Date Range Filters */}
                        <div className="flex items-center space-x-2">
                            <input
                                type="date"
                                className="w-full md:w-auto p-2 border rounded"
                            />
                            <input
                                type="date"
                                className="w-full md:w-auto p-2 border rounded"
                            />
                        </div>

                        {/* Search Input */}
                        <div className="relative w-full md:w-auto">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search providers..."
                                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded"
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        {/* Table */}
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Name</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Email</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Phone</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Location</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Service category</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Skeleton loading rows */}
                                {[1, 2, 3].map((i) => (
                                    <tr key={i} className="border-b">
                                        <td className="px-4 py-3">
                                            <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="h-4 bg-gray-200 rounded w-28 animate-pulse"></div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    </Layout>;


    return (
        <Layout>
            <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Service Providers</h1>

                    <div className="flex items-center space-x-2">
                        <button
                            className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 flex items-center gap-2"
                            onClick={downloadProviders}
                        >
                            <Download className="h-4 w-4" />
                            Download
                        </button>
                        <button
                            className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 flex items-center gap-2"
                            onClick={handleAddServiceProvider}
                        >
                            Register Provider
                        </button>
                    </div>
                </div>

                <Card>
                    <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
                        <CardTitle className="text-xl font-bold">Providers List</CardTitle>
                        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 items-start md:items-center w-full md:w-auto">
                            {/* Service Category Filter */}
                            <div className="w-full md:w-auto">
                                <select
                                    className="w-full md:w-auto p-2 border rounded"
                                    value={selectedServiceCategory}
                                    onChange={(e) => setSelectedServiceCategory(e.target.value)}
                                >
                                    <option value="">All Service Categories</option>
                                    {serviceCategories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Date Range Filters */}
                            <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto">
                                <div className="flex items-center space-x-2 w-full md:w-auto">
                                    <label className="text-sm font-medium whitespace-nowrap">From:</label>
                                    <input
                                        type="date"
                                        className="w-full md:w-auto p-2 border rounded"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                </div>
                                <div className="flex items-center space-x-2 w-full md:w-auto">
                                    <label className="text-sm font-medium whitespace-nowrap">To:</label>
                                    <input
                                        type="date"
                                        className="w-full md:w-auto p-2 border rounded"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Search Input */}
                            <div className="relative w-full md:w-auto">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Search providers..."
                                    className="w-full pl-8 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Name</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Email</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Phone</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Location</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Service category</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentProviders.map((provider) => (
                                        <tr key={provider.id} className="border-b">
                                            <td className="px-4 py-3 text-sm">
                                                {provider.firstname} {provider.lastname}
                                            </td>
                                            <td className="px-4 py-3 text-sm">{provider.email}</td>
                                            <td className="px-4 py-3 text-sm">{provider.phone}</td>
                                            <td className="px-4 py-3 text-sm">
                                                {provider.location_sector}, {provider?.location_district}
                                            </td>
                                            <td className="px-4 py-3 text-sm">{provider?.service_category?.name}</td>
                                            <td className="px-4 py-3 text-sm">
                                                <button
                                                    onClick={() => toggleApproval(provider)}
                                                    className={`flex items-center gap-1 px-2 py-1 rounded ${provider.approved
                                                        ? 'text-green-600 bg-green-50 hover:bg-green-100'
                                                        : 'text-red-600 bg-red-50 hover:bg-red-100'
                                                        }`}
                                                >
                                                    {provider.approved ? (
                                                        <><CheckCircle className="h-4 w-4" /> Approved</>
                                                    ) : (
                                                        <><XCircle className="h-4 w-4" /> Pending</>
                                                    )}
                                                </button>
                                            </td>
                                            <td className="px-4 py-3 text-sm">
                                                <button
                                                    className="text-sky-500 p-2 rounded hover:bg-sky-50 mr-2"
                                                    onClick={() => handleEditClick(provider)}
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </button>
                                                <button
                                                    className="text-red-500 p-2 rounded hover:bg-red-50"
                                                    onClick={() => deleteProvider(provider.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Pagination */}
                            <div className="flex justify-between items-center mt-4">
                                <div className="text-sm text-gray-600">
                                    Showing {indexOfFirstProvider + 1} to {Math.min(indexOfLastProvider, filteredProviders.length)} of {filteredProviders.length} providers
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => paginate(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="p-2 border rounded disabled:opacity-50 hover:bg-gray-100"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </button>
                                    {Array.from({
                                        length: Math.ceil(filteredProviders.length / providersPerPage)
                                    }, (_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => paginate(i + 1)}
                                            className={`px-3 py-1 border rounded ${currentPage === i + 1
                                                ? 'bg-sky-500 text-white'
                                                : 'hover:bg-gray-100'
                                                }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => paginate(currentPage + 1)}
                                        disabled={currentPage === Math.ceil(filteredProviders.length / providersPerPage)}
                                        className="p-2 border rounded disabled:opacity-50 hover:bg-gray-100"
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                {/* Add/Edit Modal */}
                {(isAddModalOpen || editingProvider) && (
                    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto transform transition-all">
                            <div className="bg-gray-100 px-6 py-4 border-b border-gray-200 rounded-t-xl">
                                <h2 className="text-2xl font-bold text-gray-800">
                                    {editingProvider ? 'Edit Service Provider' : 'Add New Service Provider'}
                                </h2>
                            </div>

                            <div className="p-6 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                                            value={formData.firstname}
                                            onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Last Name</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border rounded"
                                            value={formData.lastname}
                                            onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Email</label>
                                        <input
                                            type="email"
                                            className="w-full p-2 border rounded"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Work Email</label>
                                        <input
                                            type="email"
                                            className="w-full p-2 border rounded"
                                            value={formData.work_email}
                                            onChange={(e) => setFormData({ ...formData, work_email: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Phone</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border rounded"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Experience</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border rounded"
                                            value={formData.experience}
                                            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                                        />
                                    </div>
                                    {/* Province Dropdown */}
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Province</label>
                                        <select
                                            className="w-full p-2 border rounded"
                                            value={formData.location_province}
                                            onChange={(e) => handleProvinceChange(e.target.value)}
                                        >
                                            <option value="">Select Province</option>
                                            {provinces.map((province, index) => (
                                                <option key={index} value={province}>
                                                    {province}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* District Dropdown */}
                                    <div>
                                        <label className="block text-sm font-medium mb-1">District</label>
                                        <select
                                            className="w-full p-2 border rounded"
                                            value={formData.location_district}
                                            onChange={(e) => handleDistrictChange(e.target.value)}
                                            disabled={!formData.location_province}
                                        >
                                            <option value="">Select District</option>
                                            {districts.map((district, index) => (
                                                <option key={index} value={district}>
                                                    {district}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Sector Dropdown */}
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Sector</label>
                                        <select
                                            className="w-full p-2 border rounded"
                                            value={formData.location_sector}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                location_sector: e.target.value
                                            })}
                                            disabled={!formData.location_district}
                                        >
                                            <option value="">Select Sector</option>
                                            {sectors.map((sector, index) => (
                                                <option key={index} value={sector}>
                                                    {sector}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Service Area</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border rounded"
                                            value={formData.location_serve}
                                            onChange={(e) => setFormData({ ...formData, location_serve: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium mb-1">Description</label>
                                        <textarea
                                            className="w-full p-2 border rounded"
                                            rows="2"
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium mb-1">Additional Information</label>
                                        <textarea
                                            className="w-full p-2 border rounded"
                                            rows="2"
                                            value={formData.additional_info}
                                            onChange={(e) => setFormData({ ...formData, additional_info: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Service Category</label>
                                        <select
                                            className="w-full p-2 border rounded"
                                            value={formData.service_category_id}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                service_category_id: e.target.value
                                            })}
                                        >
                                            <option value="">Select Service Category</option>
                                            {serviceCategories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="flex items-center space-x-2 mt-8 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={formData.approved}
                                                onChange={(e) => setFormData({ ...formData, approved: e.target.checked })}
                                                className="form-checkbox h-4 w-4 text-sky-500"
                                            />
                                            <span className="text-sm font-medium">Approved</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="bg-gray-100 px-6 py-4 border-t border-gray-200 rounded-b-xl flex justify-end space-x-3">
                                    <button
                                        className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                        onClick={() => {
                                            setIsAddModalOpen(false);
                                            setEditingProvider(null);
                                            resetForm();
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-colors"
                                        onClick={() => {
                                            if (editingProvider) {
                                                updateProvider(editingProvider.id);
                                            } else {
                                                createProvider();
                                            }
                                        }}
                                    >
                                        {editingProvider ? 'Update Provider' : 'Create Provider'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default ServiceProvidersPage;


// import React, { useState, useEffect, useMemo } from "react";
// import {
//     Card,
//     CardHeader,
//     CardTitle,
//     CardContent,
//     CardDescription,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//     Table,
//     TableHeader,
//     TableRow,
//     TableHead,
//     TableBody,
//     TableCell,
// } from "@/components/ui/table";
// import { Input } from "@/components/ui/input";
// import {
//     ChevronLeft,
//     ChevronRight,
//     Search,
//     Filter,
//     Eye,
//     Clock,
//     Menu,
//     Download,
//     Plus,
// } from "lucide-react";
// import axios from "axios";
// import { toast } from "sonner";
// import API_URL from "../../constants/Constants";
// import { useLocation, useNavigate } from "react-router-dom";
// import { CheckCircle } from "lucide-react";
// import AdminLayout from "./AdminLayout";

// const ServiceProvidersPage = () => {
//     const [providers, setProviders] = useState([]);
//     const [serviceProviders, setServiceProviders] = useState([]);
//     const [serviceCategories, setServiceCategories] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage] = useState(5);
//     const [approvedFilter, setApprovedFilter] = useState("");
//     const [serviceCategoryFilter, setServiceCategoryFilter] = useState("");
//     const [showMobileFilters, setShowMobileFilters] = useState(false);
//     const [startDate, setStartDate] = useState('');
//     const [endDate, setEndDate] = useState('');
//     const [providersPerPage] = useState(10);
//     const [loading, setLoading] = useState(true);

//     const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//     const [selectedServiceCategory, setSelectedServiceCategory] = useState('');
//     const navigate = useNavigate();

//     // Fetch the token
//     const token = localStorage.getItem("token");
//     const cardGridClasses = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6";

//     // Get user ID from localStorage
//     const userData = JSON.parse(localStorage.getItem("user"));
//     const userId = userData?.id;

//     // Fetch service providers and categories on component mount
//     useEffect(() => {

//         const fetchData = async () => {
//             try {
//                 // Only fetch if both token and userId are available
//                 if (token && userId) {
//                     // Fetch service providers
//                     const serviceProvidersResponse = await axios.get(
//                         `${API_URL}/service-providers`,
//                         {
//                             headers: {
//                                 Authorization: `Bearer ${token}`,
//                             },
//                         }
//                     );

//                     // Fetch service categories
//                     const serviceCategoriesResponse = await axios.get(
//                         `${API_URL}/service-categories`,
//                         {
//                             headers: {
//                                 Authorization: `Bearer ${token}`,
//                             },
//                         }
//                     );

//                     setServiceProviders(serviceProvidersResponse.data);
//                     setServiceCategories(serviceCategoriesResponse.data);
//                     setIsLoading(false);
//                 } else {
//                     toast.error("Authentication failed");
//                     setIsLoading(false);
//                 }
//             } catch (error) {
//                 toast.error("Failed to load service providers");
//                 setIsLoading(false);
//             }
//         };

//         fetchData();
//     }, [token, userId]);

//     const downloadProviders = () => {
//         // Prepare data for download using filtered providers
//         const downloadData = filteredProviders.map(provider => ({
//             'First Name': provider.firstname || 'N/A',
//             'Last Name': provider.lastname || 'N/A',
//             'Email': provider.email || 'N/A',
//             'Work Email': provider.work_email || 'N/A',
//             'Phone': provider.phone || 'N/A',
//             'Province': provider.location_province || 'N/A',
//             'District': provider.location_district || 'N/A',
//             'Sector': provider.location_sector || 'N/A',
//             'Service Area': provider.location_serve || 'N/A',
//             'Experience': provider.experience || 'N/A',
//             'Description': provider.description || 'N/A',
//             'Service Category': serviceCategories.find(cat => cat.id === provider.service_category_id)?.name || 'N/A',
//             'Status': provider.approved ? 'Approved' : 'Pending',
//             'Created At': new Date(provider.createdAt).toLocaleDateString() || 'N/A'
//         }));

//         // Create worksheet
//         const worksheet = XLSX.utils.json_to_sheet(downloadData);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "Service Providers");

//         // Generate and download Excel file
//         XLSX.writeFile(workbook, `service_providers_${new Date().toISOString().split('T')[0]}.xlsx`);
//     };

//     // Filter providers based on search term
//     useEffect(() => {
//         const filtered = providers.filter(provider =>
//             provider.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             provider.lastname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             provider.email?.toLowerCase().includes(searchTerm.toLowerCase())
//         );
//         // setFilteredProviders(filtered);
//     }, [searchTerm, providers]);

//     const fetchProviders = async () => {
//         try {
//             const token = localStorage.getItem('token');

//             // Construct query parameters
//             const params = new URLSearchParams();
//             if (startDate) params.append('startDate', startDate);
//             if (endDate) params.append('endDate', endDate);

//             const response = await fetch(`${API_URL}/service-providers?${params.toString()}`, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'application/json'
//                 }
//             });
//             if (!response.ok) throw new Error('Failed to fetch providers');
//             const data = await response.json();
//             setProviders(data);
//             setCurrentPage(1);
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const filteredProviders = useMemo(() => {
//         return providers.filter(provider => {
//             const matchesSearch =
//                 provider.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 provider.lastname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 provider.email?.toLowerCase().includes(searchTerm.toLowerCase());

//             // Date range filtering
//             const providerDate = new Date(provider.createdAt || Date.now());
//             const start = startDate ? new Date(startDate) : null;
//             const end = endDate ? new Date(endDate) : null;

//             const matchesDateRange =
//                 (!start || providerDate >= start) &&
//                 (!end || providerDate <= end);

//             // Service category filtering
//             const matchesServiceCategory =
//                 !selectedServiceCategory ||
//                 (provider.service_category &&
//                     String(provider.service_category.id) === String(selectedServiceCategory));

//             return matchesSearch && matchesDateRange && matchesServiceCategory;
//         });
//     }, [providers, searchTerm, startDate, endDate, selectedServiceCategory]);

//     // Initial fetch
//     useEffect(() => {
//         fetchProviders();
//     }, [startDate, endDate]);

//     // Calculate service provider insights
//     const serviceProviderInsights = useMemo(() => {
//         const totalServiceProviders = serviceProviders.length;
//         const approvedServiceProviders = serviceProviders.filter(
//             (sp) => sp.approved
//         ).length;
//         const unapprovedServiceProviders = serviceProviders.filter(
//             (sp) => !sp.approved
//         ).length;

//         return {
//             totalServiceProviders,
//             approvedServiceProviders,
//             unapprovedServiceProviders,
//         };
//     }, [serviceProviders]);

//     // Render approval status badge
//     const renderApprovalBadge = (approved) => {
//         const statusColors = {
//             true: "bg-green-100 text-green-800",
//             false: "bg-yellow-100 text-yellow-800",
//         };

//         return (
//             <span className={`px-2 py-1 rounded text-xs ${statusColors[approved]}`}>
//                 {approved ? "Approved" : "Pending"}
//             </span>
//         );
//     };

//     // Filtered and Paginated Service Providers
//     const filteredServiceProviders = useMemo(() => {
//         return serviceProviders.filter(
//             (serviceProvider) =>
//                 (searchTerm === "" ||
//                     serviceProvider.firstname
//                         .toLowerCase()
//                         .includes(searchTerm.toLowerCase()) ||
//                     serviceProvider.lastname
//                         .toLowerCase()
//                         .includes(searchTerm.toLowerCase()) ||
//                     serviceProvider.service_category?.name
//                         .toLowerCase()
//                         .includes(searchTerm.toLowerCase())) &&
//                 (approvedFilter === "" ||
//                     (approvedFilter === "approved" && serviceProvider.approved) ||
//                     (approvedFilter === "unapproved" && !serviceProvider.approved)) &&
//                 (serviceCategoryFilter === "" ||
//                     serviceProvider.service_category_id ===
//                     parseInt(serviceCategoryFilter))
//         );
//     }, [serviceProviders, searchTerm, approvedFilter, serviceCategoryFilter]);

//     // Paginated Service Providers
//     const paginatedServiceProviders = useMemo(() => {
//         const startIndex = (currentPage - 1) * itemsPerPage;
//         return filteredServiceProviders.slice(
//             startIndex,
//             startIndex + itemsPerPage
//         );
//     }, [filteredServiceProviders, currentPage, itemsPerPage]);

//     // Calculate total pages
//     const totalPages = Math.ceil(filteredServiceProviders.length / itemsPerPage);

//     // Handle Page Change
//     const handlePageChange = (pageNumber) => {
//         setCurrentPage(pageNumber);
//     };

//     // Navigate to create service provider page
//     const handleAddServiceProvider = () => {
//         navigate("/agent-dashboard/serviceprovider-agent/create");
//     };

//     // Navigate to service provider detail page
//     const handleViewServiceProvider = (serviceProviderId) => {
//         navigate(
//             `/agent-dashboard/serviceprovider-agent/view/${serviceProviderId}`
//         );
//     };

//     // Approval Filter Options
//     const approvalOptions = [
//         { value: "approved", label: "Approved" },
//         { value: "unapproved", label: "Pending" },
//     ];

//     // Generate page numbers
//     const generatePageNumbers = () => {
//         const pages = [];
//         const maxPagesToShow = 5;
//         let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
//         let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

//         // Adjust start page if we're near the end
//         if (endPage - startPage + 1 < maxPagesToShow) {
//             startPage = Math.max(1, endPage - maxPagesToShow + 1);
//         }

//         for (let i = startPage; i <= endPage; i++) {
//             pages.push(i);
//         }

//         return pages;
//     };

//     const FiltersSection = () => (
//         <div className={`space-y-4 md:space-y-0 md:flex md:items-center md:space-x-4 ${showMobileFilters ? 'block' : 'hidden md:flex'}`}>
//             {/* Search Input */}
//             <div className="relative flex-grow">
//                 <Search
//                     className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                     size={20}
//                 />
//                 <Input
//                     placeholder="Search service providers..."
//                     className="pl-10 w-full"
//                     value={searchTerm}
//                     onChange={(e) => {
//                         setSearchTerm(e.target.value);
//                         setCurrentPage(1);
//                     }}
//                 />
//             </div>

//             {/* Date Range Filters */}
//             <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto">
//                 <div className="flex items-center space-x-2 w-full md:w-auto">
//                     <label className="text-sm font-medium whitespace-nowrap">From:</label>
//                     <input
//                         type="date"
//                         className="w-full md:w-auto p-2 border rounded"
//                         value={startDate}
//                         onChange={(e) => {
//                             setStartDate(e.target.value);
//                             setCurrentPage(1);
//                         }}
//                     />
//                 </div>
//                 <div className="flex items-center space-x-2 w-full md:w-auto">
//                     <label className="text-sm font-medium whitespace-nowrap">To:</label>
//                     <input
//                         type="date"
//                         className="w-full md:w-auto p-2 border rounded"
//                         value={endDate}
//                         onChange={(e) => {
//                             setEndDate(e.target.value);
//                             setCurrentPage(1);
//                         }}
//                     />
//                 </div>
//             </div>

//             {/* Service Category Filter */}
//             <div className="relative w-full md:w-48">
//                 <Filter
//                     className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                     size={20}
//                 />
//                 <select
//                     className="pl-10 pr-4 py-2 border rounded w-full"
//                     value={serviceCategoryFilter}
//                     onChange={(e) => {
//                         setServiceCategoryFilter(e.target.value);
//                         setCurrentPage(1);
//                     }}
//                 >
//                     <option value="">All Categories</option>
//                     {serviceCategories.map((category) => (
//                         <option key={category.id} value={category.id}>
//                             {category.name}
//                         </option>
//                     ))}
//                 </select>
//             </div>

//             {/* Approval Filter */}
//             <div className="relative w-full md:w-48">
//                 <Filter
//                     className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                     size={20}
//                 />
//                 <select
//                     className="pl-10 pr-4 py-2 border rounded w-full"
//                     value={approvedFilter}
//                     onChange={(e) => {
//                         setApprovedFilter(e.target.value);
//                         setCurrentPage(1);
//                     }}
//                 >
//                     <option value="">All Statuses</option>
//                     {approvalOptions.map((option) => (
//                         <option key={option.value} value={option.value}>
//                             {option.label}
//                         </option>
//                     ))}
//                 </select>
//             </div>
//         </div>
//     );

//     const ServiceProvidersList = () => (
//         <div className="w-full overflow-x-auto">
//             {/* Desktop Table View */}
//             <div className="hidden md:block">
//                 <Table>
//                     <TableHeader>
//                         <TableRow>
//                             <TableHead>Name</TableHead>
//                             <TableHead>Email</TableHead>
//                             <TableHead>Phone</TableHead>
//                             <TableHead>Service Category</TableHead>
//                             <TableHead>Experience</TableHead>
//                             <TableHead>Location</TableHead>
//                             <TableHead>Status</TableHead>
//                             <TableHead>Actions</TableHead>
//                         </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                         {paginatedServiceProviders.map((serviceProvider) => (
//                             <TableRow key={serviceProvider.id}>
//                                 <TableCell>
//                                     {serviceProvider.firstname} {serviceProvider.lastname}
//                                 </TableCell>
//                                 <TableCell>{serviceProvider.email}</TableCell>
//                                 <TableCell>{serviceProvider.phone}</TableCell>
//                                 <TableCell>
//                                     {serviceProvider.service_category?.name || "N/A"}
//                                 </TableCell>
//                                 <TableCell>{serviceProvider.experience}</TableCell>
//                                 <TableCell>
//                                     {serviceProvider.location_province}, {serviceProvider.location_district}
//                                 </TableCell>
//                                 <TableCell>
//                                     {renderApprovalBadge(serviceProvider.approved)}
//                                 </TableCell>
//                                 <TableCell>
//                                     <Button
//                                         size="sm"
//                                         onClick={() => handleViewServiceProvider(serviceProvider.id)}
//                                         className="hover:bg-sky-200 bg-sky-100 rounded text-sky-700"
//                                     >
//                                         <Eye className="mr-2" size={16} /> View
//                                     </Button>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </div>

//             {/* Mobile Card View */}
//             <div className="md:hidden space-y-4">
//                 {paginatedServiceProviders.map((serviceProvider) => (
//                     <Card key={serviceProvider.id} className="p-4">
//                         <div className="space-y-2">
//                             <div className="flex justify-between items-start">
//                                 <div>
//                                     <h3 className="font-medium">
//                                         {serviceProvider.firstname} {serviceProvider.lastname}
//                                     </h3>
//                                     <p className="text-sm text-gray-500">{serviceProvider.email}</p>
//                                 </div>
//                                 {renderApprovalBadge(serviceProvider.approved)}
//                             </div>
//                             <div className="grid grid-cols-2 gap-2 text-sm">
//                                 <div>
//                                     <p className="font-medium">Phone</p>
//                                     <p>{serviceProvider.phone}</p>
//                                 </div>
//                                 <div>
//                                     <p className="font-medium">Category</p>
//                                     <p>{serviceProvider.service_category?.name || "N/A"}</p>
//                                 </div>
//                                 <div>
//                                     <p className="font-medium">Experience</p>
//                                     <p>{serviceProvider.experience}</p>
//                                 </div>
//                                 <div>
//                                     <p className="font-medium">Location</p>
//                                     <p>{serviceProvider.location_province}, {serviceProvider.location_district}</p>
//                                 </div>
//                             </div>
//                             <Button
//                                 className="w-full mt-2 hover:bg-sky-200 bg-sky-100 rounded text-sky-700"
//                                 onClick={() => handleViewServiceProvider(serviceProvider.id)}
//                             >
//                                 <Eye className="mr-2" size={16} /> View Details
//                             </Button>
//                         </div>
//                     </Card>
//                 ))}
//             </div>
//         </div>
//     );

//     return (
//         <AdminLayout>
//             <div className="space-y-6 p-4">
//                 {/* Insight Cards */}
//                 <div className={cardGridClasses}>
//                     <Card>
//                         <CardContent className="pt-6 flex items-center">
//                             <div className="mr-4 bg-sky-100 p-3 rounded-full">
//                                 <Eye className="text-sky-600" size={24} />
//                             </div>
//                             <div>
//                                 <p className="text-sm text-gray-500">Total Service Providers</p>
//                                 <p className="text-2xl font-bold">
//                                     {serviceProviderInsights.totalServiceProviders}
//                                 </p>
//                             </div>
//                         </CardContent>
//                     </Card>

//                     <Card>
//                         <CardContent className="pt-6 flex items-center">
//                             <div className="mr-4 bg-green-100 p-3 rounded-full">
//                                 <CheckCircle className="text-green-600" size={24} />
//                             </div>
//                             <div>
//                                 <p className="text-sm text-gray-500">Approved</p>
//                                 <p className="text-2xl font-bold">
//                                     {serviceProviderInsights.approvedServiceProviders}
//                                 </p>
//                             </div>
//                         </CardContent>
//                     </Card>

//                     <Card>
//                         <CardContent className="pt-6 flex items-center">
//                             <div className="mr-4 bg-yellow-100 p-3 rounded-full">
//                                 <Clock className="text-yellow-600" size={24} />
//                             </div>
//                             <div>
//                                 <p className="text-sm text-gray-500">Pending Approval</p>
//                                 <p className="text-2xl font-bold">
//                                     {serviceProviderInsights.unapprovedServiceProviders}
//                                 </p>
//                             </div>
//                         </CardContent>
//                     </Card>
//                 </div>

//                 <Card>
//                     <CardHeader>
//                         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//                             <CardTitle>Service Providers</CardTitle>
//                             {/* <div className="flex gap-2 w-full sm:w-auto">
//                                 <Button
//                                     className="md:hidden"
//                                     variant="outline"
//                                     onClick={() => setShowMobileFilters(!showMobileFilters)}
//                                 >
//                                     <Filter size={20} />
//                                 </Button>
//                                 <Button
//                                     className="bg-emerald-500 rounded text-white hover:bg-emerald-600 flex-1 sm:flex-none"
//                                     onClick={handleAddServiceProvider}
//                                 >
//                                     Register Service Provider
//                                 </Button>
//                             </div> */}

//                             <div className="flex items-center space-x-2">
//                                 <button
//                                     className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 flex items-center gap-2"
//                                     onClick={downloadProviders}
//                                 >
//                                     <Download className="h-4 w-4" />
//                                     Download
//                                 </button>
//                                 <button
//                                     className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 flex items-center gap-2"
//                                     onClick={() => setIsAddModalOpen(true)}
//                                 >
//                                     <Plus className="h-4 w-4" />
//                                     Add Provider
//                                 </button>
//                             </div>
//                         </div>
//                         <CardDescription>
//                             <FiltersSection />
//                         </CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                         {isLoading ? (
//                             <p>Loading service providers...</p>
//                         ) : (
//                             <>
//                                 <ServiceProvidersList />

//                                 {/* Responsive Pagination */}
//                                 {filteredServiceProviders.length > 0 && (
//                                     <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4">
//                                         <p className="text-sm text-gray-500">
//                                             Showing {paginatedServiceProviders.length} of{" "}
//                                             {filteredServiceProviders.length} service providers
//                                         </p>
//                                         <div className="flex items-center space-x-2">
//                                             <button
//                                                 onClick={() => handlePageChange(currentPage - 1)}
//                                                 disabled={currentPage === 1}
//                                                 className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
//                                             >
//                                                 <ChevronLeft size={20} />
//                                             </button>

//                                             <div className="hidden sm:flex space-x-2">
//                                                 {generatePageNumbers().map((pageNumber) => (
//                                                     <button
//                                                         key={pageNumber}
//                                                         onClick={() => handlePageChange(pageNumber)}
//                                                         className={`px-3 py-1 border rounded ${currentPage === pageNumber
//                                                             ? "bg-emerald-500 text-white"
//                                                             : "bg-white text-gray-700 hover:bg-gray-100"
//                                                             }`}
//                                                     >
//                                                         {pageNumber}
//                                                     </button>
//                                                 ))}
//                                             </div>

//                                             <div className="sm:hidden">
//                                                 <span className="px-3 py-1">
//                                                     Page {currentPage} of {totalPages}
//                                                 </span>
//                                             </div>

//                                             <button
//                                                 onClick={() => handlePageChange(currentPage + 1)}
//                                                 disabled={currentPage === totalPages}
//                                                 className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
//                                             >
//                                                 <ChevronRight size={20} />
//                                             </button>
//                                         </div>
//                                     </div>
//                                 )}

//                                 {filteredServiceProviders.length === 0 && (
//                                     <p className="text-center text-gray-500 mt-4">
//                                         No service providers found
//                                     </p>
//                                 )}
//                             </>
//                         )}
//                     </CardContent>
//                 </Card>
//             </div>
//         </AdminLayout>
//     );
// };

// export default ServiceProvidersPage;

