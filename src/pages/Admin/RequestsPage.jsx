import React, { useState, useEffect } from 'react';
import { FileText, Search, Filter, X, Edit2, Save, Eye, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import AdminLayout from './AdminLayout';
import API_URL from '../../constants/Constants';
import OperationLayout from '../operation/OperationLayout';
import { Button } from '@/components/ui/button';
import CustomersSupportLayout from '../customerSupport/CustomersSupportLayout';

const EditRequestForm = ({ request, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        your_location: request.your_location || '',
        service_location: request.service_location || '',
        service_date: request.service_date ? new Date(request.service_date).toISOString().split('T')[0] : '',
        status: request.status || 'PENDING',
        message_preference: request.message_preference || 'EMAIL',
        fields: request.fields || {}
    });

    const handleFieldChange = (fieldId, value) => {
        setFormData(prev => ({
            ...prev,
            fields: {
                ...prev.fields,
                [fieldId]: value
            }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(request.id, formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded w-11/12 max-w-2xl max-h-[90vh] flex flex-col relative">
                <div className="p-6 border-b">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    >
                        <X className="h-6 w-6" />
                    </button>
                    <h2 className="text-2xl font-bold">Edit Request</h2>
                </div>

                <div className="p-6 overflow-y-auto flex-1">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Your Location
                                </label>
                                <input
                                    type="text"
                                    value={formData.your_location}
                                    onChange={(e) => setFormData({ ...formData, your_location: e.target.value })}
                                    className="mt-1 p-2 block w-full rounded border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Service Location
                                </label>
                                <input
                                    type="text"
                                    value={formData.service_location}
                                    onChange={(e) => setFormData({ ...formData, service_location: e.target.value })}
                                    className="mt-1 block p-2 w-full rounded border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Service Date
                                </label>
                                <input
                                    type="date"
                                    value={formData.service_date}
                                    onChange={(e) => setFormData({ ...formData, service_date: e.target.value })}
                                    className="mt-1 block p-2 w-full rounded border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Status
                                </label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    className="mt-1 p-2 block w-full rounded border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                                >
                                    <option value="PENDING">Pending</option>
                                    <option value="IN_PROGRESS">In Progress</option>
                                    <option value="COMPLETED">Completed</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Message Preference
                                </label>
                                <select
                                    value={formData.message_preference}
                                    onChange={(e) => setFormData({ ...formData, message_preference: e.target.value })}
                                    className="mt-1 p-2 block w-full rounded border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                                >
                                    <option value="EMAIL">Email</option>
                                    <option value="SMS">SMS</option>
                                </select>
                            </div>
                        </div>

                        {request.service_category?.fields && (
                            <div className="mt-6">
                                <h3 className="text-lg p-2 font-medium text-gray-900 mb-4">Additional Fields</h3>
                                <div className="space-y-4">
                                    {request.service_category.fields.map((field) => (
                                        <div key={field.id}>
                                            <label className="block p-2 text-sm font-medium text-gray-700">
                                                {field.fieldName}
                                            </label>
                                            {field.inputType === 'textarea' ? (
                                                <textarea
                                                    value={formData.fields[field.id] || ''}
                                                    onChange={(e) => handleFieldChange(field.id, e.target.value)}
                                                    className="mt-1 p-2 block w-full rounded border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                                                    rows={3}
                                                />
                                            ) : (
                                                <input
                                                    type={field.inputType}
                                                    value={formData.fields[field.id] || ''}
                                                    onChange={(e) => handleFieldChange(field.id, e.target.value)}
                                                    className="mt-1 p-2 block w-full rounded border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </form>
                </div>

                <div className="p-6 border-t bg-gray-50">
                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


const RequestDetailsView = ({ request, onClose }) => {
    if (!request) return <div className="p-6 text-center">No request details available</div>;

    const InfoRow = ({ label, value }) => (
        <div className="flex justify-between py-2 border-b">
            <span className="text-gray-500">{label}</span>
            <span className="font-medium">{value || 'N/A'}</span>
        </div>
    );

    const getStatusColor = (status) => {
        switch (status) {
            case 'COMPLETED': return 'bg-green-100 text-green-800';
            case 'IN_PROGRESS': return 'bg-sky-100 text-sky-800';
            default: return 'bg-yellow-100 text-yellow-800';
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <X className="h-6 w-6" />
                </button>

                <h2 className="text-2xl font-bold mb-6 pb-4 border-b">Request Details</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="p-4">
                        <h3 className="text-lg font-semibold mb-4">Service Information</h3>
                        <div className="space-y-2">
                            <InfoRow label="Request ID" value={request.id} />
                            <InfoRow label="Service Category" value={request.service_category?.name} />
                            <InfoRow label="Your Location" value={request.your_location} />
                            <InfoRow label="Service Location" value={request.service_location} />
                            <InfoRow label="Service Date" value={new Date(request.service_date).toLocaleDateString()} />
                            <InfoRow label="Message Preference" value={request.message_preference} />
                            <div className="flex justify-between py-2">
                                <span className="text-gray-500">Status</span>
                                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(request.status)}`}>
                                    {request.status}
                                </span>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-4">
                        <h3 className="text-lg font-semibold mb-4">Client Information</h3>
                        <div className="space-y-2">
                            <InfoRow label="Name" value={`${request.client?.firstname} ${request.client?.lastname}`} />
                            <InfoRow label="Email" value={request.client?.email} />
                            <InfoRow label="Phone" value={request.client?.phone} />
                            <InfoRow label="Province" value={request.client?.location_province} />
                            <InfoRow label="District" value={request.client?.location_district} />
                            <InfoRow label="Sector" value={request.client?.location_sector} />
                        </div>
                    </Card>

                    <Card className="p-4">
                        <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
                        <div className="space-y-2">
                            {request.service_category?.fields?.map((field) => (
                                <InfoRow
                                    key={field.id}
                                    label={field.fieldName}
                                    value={request.fields?.[field.id]}
                                />
                            ))}
                        </div>
                    </Card>

                    <Card className="p-4">
                        <h3 className="text-lg font-semibold mb-4">System Information</h3>
                        <div className="space-y-2">
                            <InfoRow label="Created At" value={new Date(request.createdAt).toLocaleString()} />
                            <InfoRow label="Updated At" value={new Date(request.updatedAt).toLocaleString()} />
                            <InfoRow label="Agent ID" value={request.agent_id || 'Not Assigned'} />
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};


const RequestsPage = () => {
    const [user, setUser] = useState(null);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [editingRequest, setEditingRequest] = useState(null);
    const [statusFilter, setStatusFilter] = useState('COMPLETED'); // Default status filter

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);

    // Status options
    const statusOptions = [
        { value: 'ALL', label: 'All Statuses' },
        { value: 'COMPLETED', label: 'Completed' },
        { value: 'PENDING', label: 'Pending' },
        { value: 'IN_PROGRESS', label: 'In Progress' }
    ];

    // Fetch requests from the API
    const fetchRequests = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/requests`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) throw new Error('Failed to fetch requests');
            const data = await response.json();
            setRequests(data);
            filterRequests(data, searchTerm, statusFilter);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleRetryPayment = async (request) => {
        try {
          const paymentResponse = await fetch(`${API_URL}/payments/initiate`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              service_location: request.service_location,
              paymentNumber: request.client.phone,
              request_id: request.id,
              client_id: request.client_id,
              type: "client",
            }),
          });
    
          if (!paymentResponse.ok) {
            throw new Error("Failed to initiate payment");
          }
    
          const result = await paymentResponse.json();
          if (!result.success) {
            showErrorToast(result.message || 'Payment initiation failed');
          } else {
            showSuccessToast('Payment request sent. Please check your phone.');
          }
    
        } catch (error) {
          showErrorToast('Failed to initiate payment');
          console.error('Payment retry error:', error);
        }
      };

    // Filter requests based on search term and status
    const filterRequests = (requestsData, search, status) => {
        let filtered = requestsData.filter(request =>
        (request.service_location?.toLowerCase().includes(search.toLowerCase()) ||
            request.service_category?.name?.toLowerCase().includes(search.toLowerCase()))
        );

        if (status !== 'ALL') {
            filtered = filtered.filter(request => request.status === status);
        }

        setFilteredRequests(filtered);
        setCurrentPage(1);
        setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    };

    // Update filters when search term or status changes
    useEffect(() => {
        filterRequests(requests, searchTerm, statusFilter);
    }, [searchTerm, statusFilter, requests]);

    // Initial fetch
    useEffect(() => {
        fetchRequests();
    }, []);


    // Update request
    const updateRequest = async (id, updateData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/requests/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateData)
            });
            if (!response.ok) throw new Error('Failed to update request');
            await fetchRequests();
            setEditingRequest(null);
        } catch (err) {
            setError(err.message);
        }
    };

    // Filter requests based on search term
    useEffect(() => {
        const filtered = requests.filter(request =>
            request.service_location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.service_category?.name?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredRequests(filtered);
        setCurrentPage(1); // Reset to first page when filtering
        setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    }, [searchTerm, requests, itemsPerPage]);

    // Calculate current page items
    const getCurrentPageItems = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredRequests.slice(startIndex, endIndex);
    };

    // Pagination controls
    const goToPage = (page) => {
        setCurrentPage(page);
    };

    const PaginationControls = () => (
        <div className="flex flex-col space-y-4 sm:space-y-0 w-full border-t border-gray-200 px-4 py-3 sm:px-6">
            {/* Mobile and Desktop Stats */}
            <div className="flex justify-center sm:justify-start">
                <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{((currentPage - 1) * itemsPerPage) + 1}</span> to{' '}
                    <span className="font-medium">
                        {Math.min(currentPage * itemsPerPage, filteredRequests.length)}
                    </span>{' '}
                    of <span className="font-medium">{filteredRequests.length}</span> results
                </p>
            </div>

            {/* Pagination Controls - Responsive for both Mobile and Desktop */}
            <div className="flex justify-center sm:justify-end">
                <nav className="inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                    <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>

                    {[...Array(totalPages)].map((_, idx) => {
                        const pageNum = idx + 1;
                        // Only show first page, last page, and pages around current page
                        if (
                            pageNum === 1 ||
                            pageNum === totalPages ||
                            (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                        ) {
                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => goToPage(pageNum)}
                                    className={`relative hidden sm:inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === pageNum
                                        ? 'z-10 bg-sky-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600'
                                        : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                                        }`}
                                >
                                    {pageNum}
                                </button>
                            );
                        }
                        // Show ellipsis
                        if (
                            (pageNum === currentPage - 2 && pageNum > 2) ||
                            (pageNum === currentPage + 2 && pageNum < totalPages - 1)
                        ) {
                            return (
                                <span
                                    key={`ellipsis-${pageNum}`}
                                    className="relative hidden sm:inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300"
                                >
                                    ...
                                </span>
                            );
                        }
                        return null;
                    })}

                    <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </nav>
            </div>
        </div>
    );

    // Initial fetch
    useEffect(() => {
        fetchRequests();
    }, []);

    // Calculate statistics
    const getStatistics = () => {
        return {
            total: requests.length,
            pending: requests.filter(req => req.status === 'Pending').length,
            completed: requests.filter(req => req.status === 'COMPLETED').length,
            inProgress: requests.filter(req => req.status === 'IN_PROGRESS').length
        };
    };

    const stats = getStatistics();

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

    // if (loading) return <AdminLayout><div className="p-6">Loading...</div></AdminLayout>;
    // if (error) return <AdminLayout><div className="p-6 text-red-500">Error: {error}</div></AdminLayout>;

    const Layout = user?.role === "ADMIN"
        ? AdminLayout
        : user?.role === "CUSTOMER_SUPPORT"
            ? CustomersSupportLayout
            : OperationLayout;

    if (loading) return <Layout><div className="p-6">Loading...</div></Layout>;


    return (
        <Layout>
            {/* Details Modal */}
            {selectedRequest && (
                <RequestDetailsView
                    request={selectedRequest}
                    onClose={() => setSelectedRequest(null)}
                />
            )}

            {editingRequest && (
                <EditRequestForm
                    request={editingRequest}
                    onClose={() => setEditingRequest(null)}
                    onSave={updateRequest}
                />
            )}

            <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Requests</h1>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Request Statistics</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="flex items-center space-x-4 p-4 bg-sky-50 rounded-lg">
                            <FileText className="h-8 w-8 text-sky-500" />
                            <div>
                                <p className="text-sm text-gray-500">Total Requests</p>
                                <p className="text-2xl font-bold">{stats.total}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 p-4 bg-yellow-50 rounded-lg">
                            <FileText className="h-8 w-8 text-yellow-500" />
                            <div>
                                <p className="text-sm text-gray-500">Pending</p>
                                <p className="text-2xl font-bold">{stats.pending}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                            <FileText className="h-8 w-8 text-green-500" />
                            <div>
                                <p className="text-sm text-gray-500">Completed</p>
                                <p className="text-2xl font-bold">{stats.completed}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 p-4 bg-sky-50 rounded-lg">
                            <FileText className="h-8 w-8 text-sky-800" />
                            <div>
                                <p className="text-sm text-gray-500">In Progress</p>
                                <p className="text-2xl font-bold">{stats.inProgress}</p>
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
                                    className="pl-8 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="relative">
                                <button
                                    className="p-2 border rounded hover:bg-gray-50 flex items-center gap-2"
                                    onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                                >
                                    <Filter className="h-4 w-4" />
                                    <span>{statusOptions.find(opt => opt.value === statusFilter)?.label}</span>
                                </button>
                                {showFilterDropdown && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
                                        {statusOptions.map((option) => (
                                            <button
                                                key={option.value}
                                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                                onClick={() => {
                                                    setStatusFilter(option.value);
                                                    setShowFilterDropdown(false);
                                                }}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Service Location</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Service Category</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Service Date</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {getCurrentPageItems().map((request) => (
                                        <tr key={request.id} className="border-b">
                                            <td className="px-4 py-3 text-sm">{request.service_location}</td>
                                            <td className="px-4 py-3 text-sm">{request?.service_category?.name}</td>
                                            <td className="px-4 py-3 text-sm">{new Date(request.service_date).toLocaleDateString()}</td>
                                            <td className="px-4 py-3 text-sm">
                                                <span className={`px-2 py-1 rounded-full text-xs ${request.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                                                    request.status === 'IN_PROGRESS' ? 'bg-sky-100 text-sky-800' :
                                                        'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {request.status || 'Pending'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm">
                                                <div className="flex gap-2">
                                                    <button
                                                        className="text-sky-500 border-2 flex gap-1 border-gray-300 p-2 rounded hover:text-sky-700"
                                                        onClick={() => setSelectedRequest(request)}
                                                    >
                                                        <Eye className="h-4 w-4" /> <span>View</span>
                                                    </button>
                                                    <button
                                                        className="text-yellow-500 border-2 flex gap-1 border-gray-300 p-2 rounded hover:text-yellow-700"
                                                        onClick={() => setEditingRequest(request)}
                                                    >
                                                        <Edit2 className="h-4 w-4" /> <span>Edit</span>
                                                    </button>
                                                    {request.status === 'PENDING' && (
                                                        <Button
                                                            size="sm"
                                                            onClick={() => handleRetryPayment(request)}
                                                            className="hover:bg-purple-200 bg-purple-100 rounded text-purple-700"
                                                        >
                                                            <Clock className="mr-2" size={16} /> Retry Payment
                                                        </Button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <PaginationControls />
                    </CardContent>
                </Card>
            </div>
        </Layout>
    );
};

export default RequestsPage;