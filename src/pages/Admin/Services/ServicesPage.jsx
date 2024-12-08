import React, { useState, useEffect } from 'react';
import { FileText, Search, Filter, Plus, Pencil, Trash2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import AdminLayout from '../AdminLayout';
import API_URL from '../../../constants/Constants';
import { Link } from 'react-router-dom';

const ServiceCategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
  

    // Fetch categories from the API
    const fetchCategories = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/service-categories`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) throw new Error('Failed to fetch categories');
            const data = await response.json();
            setCategories(data);
            setFilteredCategories(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

 

    // Update category
    const updateCategory = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/service-categories/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) throw new Error('Failed to update category');
            fetchCategories();
            setEditingCategory(null);
            resetForm();
        } catch (err) {
            setError(err.message);
        }
    };

    // Delete category
    const deleteCategory = async (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${API_URL}/service-categories/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) throw new Error('Failed to delete category');
                fetchCategories();
            } catch (err) {
                setError(err.message);
            }
        }
    };

    // Filter categories based on search term
    useEffect(() => {
        const filtered = categories.filter(category =>
            category.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            category.details?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCategories(filtered);
    }, [searchTerm, categories]);

    // Initial fetch
    useEffect(() => {
        fetchCategories();
    }, []);

   
    if (loading) return <div className="p-6">Loading...</div>;
    if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

    return (
        <AdminLayout>
            <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Service Categories </h1>
                    <Link to="/dashboard/service/create" 
                        className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 flex items-center gap-2"
                    >
                        <Plus className="h-4 w-4" />
                        Add Category
                    </Link>
                </div>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Categories List</CardTitle>
                        <div className="flex space-x-2">
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Search categories..."
                                    className="pl-8 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
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
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">#</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Name</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Details</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredCategories.map((category,index) => (
                                        <tr key={category.id} className="border-b">
                                            <td className="px-4 py-3 text-sm">{index + 1}</td>
                                            <td className="px-4 py-3 text-sm">{category.name}</td>
                                            <td className="px-4 py-3 text-sm">{category.details}</td>
                                            <td className="px-4 py-3 text-sm flex">
                                                <Link to={`/dashboard/service/edit/${category.id}`} 
                                                    className="text-sky-500 p-2 rounded hover:bg-sky-50 mr-2"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Link>
                                                <button 
                                                    className="text-red-500 p-2 rounded hover:bg-red-50"
                                                    onClick={() => deleteCategory(category.id)}
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
                {(isAddModalOpen || editingCategory) && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded w-full max-w-md">
                            <h2 className="text-xl font-bold mb-4">
                                {editingCategory ? 'Edit Category' : 'Add New Category'}
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Name</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded"
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Provider Price</label>
                                    <input
                                        type="number"
                                        className="w-full p-2 border rounded"
                                        value={formData.provider_price}
                                        onChange={(e) => setFormData({...formData, provider_price: parseFloat(e.target.value)})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Client Price</label>
                                    <input
                                        type="number"
                                        className="w-full p-2 border rounded"
                                        value={formData.client_price}
                                        onChange={(e) => setFormData({...formData, client_price: parseFloat(e.target.value)})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Details</label>
                                    <textarea
                                        className="w-full p-2 border rounded"
                                        value={formData.details}
                                        onChange={(e) => setFormData({...formData, details: e.target.value})}
                                    />
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <button
                                        className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-50"
                                        onClick={() => {
                                            setIsAddModalOpen(false);
                                            setEditingCategory(null);
                                            resetForm();
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600"
                                        onClick={() => {
                                            if (editingCategory) {
                                                updateCategory(editingCategory.id);
                                            } else {
                                                createCategory();
                                            }
                                        }}
                                    >
                                        {editingCategory ? 'Update' : 'Create'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default ServiceCategoriesPage;