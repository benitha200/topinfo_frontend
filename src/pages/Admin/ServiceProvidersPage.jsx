import React, { useState, useEffect } from 'react';
import { Search, Plus, Pencil, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import AdminLayout from './AdminLayout';

const ServiceProvidersPage = () => {
    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProviders, setFilteredProviders] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingProvider, setEditingProvider] = useState(null);
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
        approved: false
    });

    // API base URL
    const API_BASE_URL = 'http://localhost:3050/api';

    // Fetch providers
    const fetchProviders = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/service-providers`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) throw new Error('Failed to fetch providers');
            const data = await response.json();
            setProviders(data);
            setFilteredProviders(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Create provider
    const createProvider = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/service-providers`, {
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
            const response = await fetch(`${API_BASE_URL}/service-providers/${id}`, {
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

    // Delete provider
    const deleteProvider = async (id) => {
        if (window.confirm('Are you sure you want to delete this provider?')) {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${API_BASE_URL}/service-providers/${id}`, {
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
            const response = await fetch(`${API_BASE_URL}/service-providers/${provider.id}`, {
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

    // Filter providers based on search term
    useEffect(() => {
        const filtered = providers.filter(provider =>
            provider.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            provider.lastname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            provider.email?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProviders(filtered);
    }, [searchTerm, providers]);

    // Initial fetch
    useEffect(() => {
        fetchProviders();
    }, []);

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
            approved: false
        });
    };

    // Handle edit click
    const handleEditClick = (provider) => {
        setEditingProvider(provider);
        setFormData({ ...provider });
    };

    if (loading) return <div className="p-6">Loading...</div>;
    if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

    return (
        <AdminLayout>
            <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Service Providers</h1>
                    
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
                        onClick={() => setIsAddModalOpen(true)}
                    >
                        <Plus className="h-4 w-4" />
                        Add Provider
                    </button>
                </div>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Providers List</CardTitle>
                        <div className="flex space-x-2">
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Search providers..."
                                    className="pl-8 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredProviders.map((provider) => (
                                        <tr key={provider.id} className="border-b">
                                            <td className="px-4 py-3 text-sm">
                                                {provider.firstname} {provider.lastname}
                                            </td>
                                            <td className="px-4 py-3 text-sm">{provider.email}</td>
                                            <td className="px-4 py-3 text-sm">{provider.phone}</td>
                                            <td className="px-4 py-3 text-sm">
                                                {provider.location_sector}, {provider.location_district}
                                            </td>
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
                                                    className="text-blue-500 p-2 rounded hover:bg-blue-50 mr-2"
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
                        </div>
                    </CardContent>
                </Card>

                {/* Add/Edit Modal */}
                {(isAddModalOpen || editingProvider) && (
                    <div className="fixed overflow-y-scroll inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
                            <h2 className="text-xl font-bold mb-4">
                                {editingProvider ? 'Edit Provider' : 'Add New Provider'}
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">First Name</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded"
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
                                <div>
                                    <label className="block text-sm font-medium mb-1">Province</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded"
                                        value={formData.location_province}
                                        onChange={(e) => setFormData({ ...formData, location_province: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">District</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded"
                                        value={formData.location_district}
                                        onChange={(e) => setFormData({ ...formData, location_district: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Sector</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded"
                                        value={formData.location_sector}
                                        onChange={(e) => setFormData({ ...formData, location_sector: e.target.value })}
                                    />
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
                                        rows="3"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium mb-1">Additional Information</label>
                                    <textarea
                                        className="w-full p-2 border rounded"
                                        rows="3"
                                        value={formData.additional_info}
                                        onChange={(e) => setFormData({ ...formData, additional_info: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Service Category ID</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded"
                                        value={formData.service_category_id}
                                        onChange={(e) => setFormData({ ...formData, service_category_id: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.approved}
                                            onChange={(e) => setFormData({ ...formData, approved: e.target.checked })}
                                            className="form-checkbox h-4 w-4 text-blue-500"
                                        />
                                        <span className="text-sm font-medium">Approved</span>
                                    </label>
                                </div>
                            </div>
                            <div className="flex justify-end space-x-4 mt-6">
                                <button
                                    className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
                                    onClick={() => {
                                        setIsAddModalOpen(false);
                                        setEditingProvider(null);
                                        resetForm();
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    onClick={() => {
                                        if (editingProvider) {
                                            updateProvider(editingProvider.id);
                                        } else {
                                            createProvider();
                                        }
                                    }}
                                >
                                    {editingProvider ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default ServiceProvidersPage;
