import React, { useState, useEffect } from 'react';
import { Search, Plus, Pencil, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Provinces, Districts, Sectors } from 'rwanda';
import AgentLayout from './AgentLayout';
import API_URL from '../../constants/Constants';

const ServiceProvidersPageAgent = () => {
    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProviders, setFilteredProviders] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingProvider, setEditingProvider] = useState(null);

    // Location state for dropdowns
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [sectors, setSectors] = useState([]);

    const [serviceCategories, setServiceCategories] = useState([]);

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

    const fetchProvidersAddedByMe = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/service-providers/added-by-me`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) throw new Error('Failed to fetch providers added by me');
            const data = await response.json();
            setProviders(data);
            setFilteredProviders(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Initial fetch for provinces and service categories
    useEffect(() => {
        setProvinces(Provinces());
        fetchServiceCategories();
        fetchProvidersAddedByMe();
    }, []);

    const createProvider = async () => {
        try {
            const token = localStorage.getItem('token');
            const userData = JSON.parse(localStorage.getItem('user'));
            
            const providerData = {
                ...formData,
                added_by: userData ? userData.id : null  // Add agent_id/added_by
            };
    
            const response = await fetch(`${API_URL}/service-providers`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(providerData)
            });
            if (!response.ok) throw new Error('Failed to create provider');
            fetchProvidersAddedByMe();
            setIsAddModalOpen(false);
            resetForm();
        } catch (err) {
            setError(err.message);
        }
    };
    
    const updateProvider = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const userData = JSON.parse(localStorage.getItem('user'));
            
            const providerData = {
                ...formData,
                added_by: userData ? userData.id : null  // Add agent_id/added_by
            };
    
            const response = await fetch(`${API_URL}/service-providers/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(providerData)
            });
            if (!response.ok) throw new Error('Failed to update provider');
            fetchProvidersAddedByMe();
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
                const response = await fetch(`${API_URL}/service-providers/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) throw new Error('Failed to delete provider');
                fetchProvidersAddedByMe();
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
            fetchProvidersAddedByMe();
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
        fetchProvidersAddedByMe();
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
        <AgentLayout>
            <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Service Providers</h1>

                    <button
                        className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 flex items-center gap-2"
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
                                    className="pl-8 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
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
        </AgentLayout>
    );
};

export default ServiceProvidersPageAgent;
