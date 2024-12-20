// import React, { useState, useEffect } from 'react';
// import { FileText, Search, Filter, X } from 'lucide-react';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import AdminLayout from './AdminLayout';
// import API_URL from '../../constants/Constants';

// const RequestDetailsView = ({ request, onClose }) => {
//     // Ensure we have a request object
//     if (!request) return <div className="p-6 text-center">No request details available</div>;

//     // Helper function to render info row
//     const InfoRow = ({ label, value }) => (
//         <div className="flex justify-between py-2 border-b">
//             <span className="text-gray-500">{label}</span>
//             <span className="font-medium">{value || 'N/A'}</span>
//         </div>
//     );

//     // Determine status color
//     const getStatusColor = (status) => {
//         switch (status) {
//             case 'COMPLETED': return 'bg-green-100 text-green-800';
//             case 'IN_PROGRESS': return 'bg-sky-100 text-sky-800';
//             default: return 'bg-yellow-100 text-yellow-800';
//         }
//     };

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
//             <div className="bg-white rounded w-11/12 max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative">
//                 <button 
//                     onClick={onClose} 
//                     className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//                 >
//                     <X className="h-6 w-6" />
//                 </button>

//                 <h2 className="text-2xl font-bold mb-6 pb-4 border-b">Request Details</h2>

//                 <div className="space-y-6">
//                     {/* Service Information */}
//                     <div>
//                         <h3 className="text-lg font-semibold mb-4">Service Information</h3>
//                         <div className="bg-gray-50 p-4 rounded-lg">
//                             <InfoRow 
//                                 label="Service Category" 
//                                 value={request.service_category?.name || 'N/A'} 
//                             />
//                             <InfoRow 
//                                 label="Service Location" 
//                                 value={request.service_location || 'N/A'} 
//                             />
//                             <InfoRow 
//                                 label="Service Date" 
//                                 value={new Date(request.service_date).toLocaleDateString()} 
//                             />
//                             <div className="flex justify-between py-2">
//                                 <span className="text-gray-500">Status</span>
//                                 <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(request.status)}`}>
//                                     {request.status || 'Pending'}
//                                 </span>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Client Information */}
//                     <div>
//                         <h3 className="text-lg font-semibold mb-4">Client Details</h3>
//                         <div className="bg-gray-50 p-4 rounded-lg">
//                             <InfoRow 
//                                 label="Full Name" 
//                                 value={`${request.client?.firstname || ''} ${request.client?.lastname || ''}`.trim()} 
//                             />
//                             <InfoRow 
//                                 label="Email" 
//                                 value={request.client?.email || 'N/A'} 
//                             />
//                             <InfoRow 
//                                 label="Phone" 
//                                 value={request.client?.phone || 'N/A'} 
//                             />
//                         </div>
//                     </div>

//                     {/* Additional Fields */}
//                     <div>
//                         <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
//                         <div className="bg-gray-50 p-4 rounded-lg">
//                             {request.service_category?.fields?.map((field) => (
//                                 <InfoRow 
//                                     key={field.id}
//                                     label={field.fieldName}
//                                     value={request.fields?.[field.id] || 'N/A'}
//                                 />
//                             ))}
//                         </div>
//                     </div>

//                     {/* Payment Information */}
//                     {request.payments && request.payments.length > 0 && (
//                         <div>
//                             <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
//                             <div className="bg-gray-50 p-4 rounded-lg">
//                                 {request.payments.map((payment) => (
//                                     <React.Fragment key={payment.id}>
//                                         <InfoRow 
//                                             label="Amount" 
//                                             value={`${payment.amount} RWF`} 
//                                         />
//                                         <InfoRow 
//                                             label="Transaction ID" 
//                                             value={payment.transaction_id} 
//                                         />
//                                         <InfoRow 
//                                             label="Payment Status" 
//                                             value={payment.status} 
//                                         />
//                                     </React.Fragment>
//                                 ))}
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// const RequestsPage = () => {
//     const [requests, setRequests] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [filteredRequests, setFilteredRequests] = useState([]);
//     const [selectedRequest, setSelectedRequest] = useState(null);

//     // Fetch requests from the API
//     const fetchRequests = async () => {
//         try {
//             const token = localStorage.getItem('token');
//             const response = await fetch(`${API_URL}/requests`, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'application/json'
//                 }
//             });
//             if (!response.ok) throw new Error('Failed to fetch requests');
//             const data = await response.json();
//             setRequests(data);
//             setFilteredRequests(data);
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Create a new request
//     const createRequest = async (requestData) => {
//         try {
//             const token = localStorage.getItem('token');
//             const response = await fetch(`${API_URL}/requests`, {
//                 method: 'POST',
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(requestData)
//             });
//             if (!response.ok) throw new Error('Failed to create request');
//             fetchRequests(); // Refresh the list
//         } catch (err) {
//             setError(err.message);
//         }
//     };

//     // Update request status
//     const updateRequest = async (id, updateData) => {
//         try {
//             const token = localStorage.getItem('token');
//             const response = await fetch(`${API_URL}/requests/${id}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(updateData)
//             });
//             if (!response.ok) throw new Error('Failed to update request');
//             fetchRequests(); // Refresh the list
//         } catch (err) {
//             setError(err.message);
//         }
//     };

//     // Filter requests based on search term
//     useEffect(() => {
//         const filtered = requests.filter(request =>
//             request.service_location?.toLowerCase().includes(searchTerm.toLowerCase())
//         );
//         setFilteredRequests(filtered);
//     }, [searchTerm, requests]);

//     // Initial fetch
//     useEffect(() => {
//         fetchRequests();
//     }, []);

//     // Calculate statistics
//     const getStatistics = () => {
//         return {
//             total: requests.length,
//             pending: requests.filter(req => req.status === 'Pending').length,
//             completed: requests.filter(req => req.status === 'Completed').length,
//             inProgress: requests.filter(req => req.status === 'IN_PROGRESS').length
//         };
//     };

//     const stats = getStatistics();

//     if (loading) return <div className="p-6">Loading...</div>;
//     if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

//     return (
//         <AdminLayout>
//             {/* Details Modal */}
//             {selectedRequest && (
//                 <RequestDetailsView 
//                     request={selectedRequest} 
//                     onClose={() => setSelectedRequest(null)} 
//                 />
//             )}

//             <div className="p-6 space-y-6">
//                 <div className="flex justify-between items-center">
//                     <h1 className="text-2xl font-bold">Requests</h1>
//                 </div>

//                 <Card>
//                     <CardHeader>
//                         <CardTitle>Request Statistics</CardTitle>
//                     </CardHeader>
//                     <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                         <div className="flex items-center space-x-4 p-4 bg-sky-50 rounded-lg">
//                             <FileText className="h-8 w-8 text-sky-500" />
//                             <div>
//                                 <p className="text-sm text-gray-500">Total Requests</p>
//                                 <p className="text-2xl font-bold">{stats.total}</p>
//                             </div>
//                         </div>
//                         <div className="flex items-center space-x-4 p-4 bg-yellow-50 rounded-lg">
//                             <FileText className="h-8 w-8 text-yellow-500" />
//                             <div>
//                                 <p className="text-sm text-gray-500">Pending</p>
//                                 <p className="text-2xl font-bold">{stats.pending}</p>
//                             </div>
//                         </div>
//                         <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
//                             <FileText className="h-8 w-8 text-green-500" />
//                             <div>
//                                 <p className="text-sm text-gray-500">Completed</p>
//                                 <p className="text-2xl font-bold">{stats.completed}</p>
//                             </div>
//                         </div>
//                         <div className="flex items-center space-x-4 p-4 bg-sky-50 rounded-lg">
//                             <FileText className="h-8 w-8 text-sky-800" />
//                             <div>
//                                 <p className="text-sm text-gray-500">In Progress</p>
//                                 <p className="text-2xl font-bold">{stats.inProgress}</p>
//                             </div>
//                         </div>
//                     </CardContent>
//                 </Card>

//                 <Card>
//                     <CardHeader className="flex flex-row items-center justify-between">
//                         <CardTitle>Requests List</CardTitle>
//                         <div className="flex space-x-2">
//                             <div className="relative">
//                                 <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
//                                 <input
//                                     type="text"
//                                     placeholder="Search requests..."
//                                     className="pl-8 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
//                                     value={searchTerm}
//                                     onChange={(e) => setSearchTerm(e.target.value)}
//                                 />
//                             </div>
//                             <button className="p-2 border rounded hover:bg-gray-50">
//                                 <Filter className="h-4 w-4" />
//                             </button>
//                         </div>
//                     </CardHeader>
//                     <CardContent>
//                         <div className="overflow-x-auto">
//                             <table className="w-full">
//                                 <thead>
//                                     <tr className="border-b">
//                                         <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Service Location</th>
//                                         <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Service Category</th>
//                                         <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Service Date</th>
//                                         <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
//                                         <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {filteredRequests.map((request) => (
//                                         <tr key={request.id} className="border-b">
//                                             <td className="px-4 py-3 text-sm">{request.service_location}</td>
//                                             <td className="px-4 py-3 text-sm">{request?.service_category?.name}</td>
//                                             <td className="px-4 py-3 text-sm">{new Date(request.service_date).toLocaleDateString()}</td>
//                                             <td className="px-4 py-3 text-sm">
//                                                 <span className={`px-2 py-1 rounded-full text-xs ${
//                                                     request.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
//                                                     request.status === 'IN_PROGRESS' ? 'bg-sky-100 text-sky-800' :
//                                                     'bg-yellow-100 text-yellow-800'
//                                                 }`}>
//                                                     {request.status || 'Pending'}
//                                                 </span>
//                                             </td>
//                                             <td className="px-4 py-3 text-sm gap-2">
//                                                 <button 
//                                                     className="text-sky-500 border-2 border-gray-300 p-2 rounded hover:text-sky-700 mr-2"
//                                                     onClick={() => setSelectedRequest(request)}
//                                                 >
//                                                     View
//                                                 </button>
//                                                 <button 
//                                                     className="text-red-500 border-2 border-gray-300 p-2 rounded hover:text-red-700"
//                                                     onClick={() => {
//                                                         const updateData = {
//                                                             status: 'COMPLETED'
//                                                         };
//                                                         updateRequest(request.id, updateData);
//                                                     }}
//                                                 >
//                                                     Close
//                                                 </button>
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

// export default RequestsPage;

import React, { useState, useEffect } from 'react';
import { FileText, Search, Filter, X, Edit2, Save } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import AdminLayout from './AdminLayout';
import API_URL from '../../constants/Constants';

// Edit Form Component
// const EditRequestForm = ({ request, onClose, onSave }) => {
//     const [formData, setFormData] = useState({
//         your_location: request.your_location || '',
//         service_location: request.service_location || '',
//         service_date: request.service_date ? new Date(request.service_date).toISOString().split('T')[0] : '',
//         status: request.status || 'PENDING',
//         message_preference: request.message_preference || 'EMAIL',
//         fields: request.fields || {}
//     });

//     const handleFieldChange = (fieldId, value) => {
//         setFormData(prev => ({
//             ...prev,
//             fields: {
//                 ...prev.fields,
//                 [fieldId]: value
//             }
//         }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         onSave(request.id, formData);
//     };

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
//             <div className="bg-white rounded w-11/12 max-w-2xl p-6 relative">
//                 <button
//                     onClick={onClose}
//                     className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//                 >
//                     <X className="h-6 w-6" />
//                 </button>

//                 <h2 className="text-2xl font-bold mb-6">Edit Request</h2>

//                 <form onSubmit={handleSubmit} className="space-y-6">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700">
//                                 Your Location
//                             </label>
//                             <input
//                                 type="text"
//                                 value={formData.your_location}
//                                 onChange={(e) => setFormData({ ...formData, your_location: e.target.value })}
//                                 className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
//                             />
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700">
//                                 Service Location
//                             </label>
//                             <input
//                                 type="text"
//                                 value={formData.service_location}
//                                 onChange={(e) => setFormData({ ...formData, service_location: e.target.value })}
//                                 className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
//                             />
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700">
//                                 Service Date
//                             </label>
//                             <input
//                                 type="date"
//                                 value={formData.service_date}
//                                 onChange={(e) => setFormData({ ...formData, service_date: e.target.value })}
//                                 className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
//                             />
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700">
//                                 Status
//                             </label>
//                             <select
//                                 value={formData.status}
//                                 onChange={(e) => setFormData({ ...formData, status: e.target.value })}
//                                 className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
//                             >
//                                 <option value="PENDING">Pending</option>
//                                 <option value="IN_PROGRESS">In Progress</option>
//                                 <option value="COMPLETED">Completed</option>
//                             </select>
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700">
//                                 Message Preference
//                             </label>
//                             <select
//                                 value={formData.message_preference}
//                                 onChange={(e) => setFormData({ ...formData, message_preference: e.target.value })}
//                                 className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
//                             >
//                                 <option value="EMAIL">Email</option>
//                                 <option value="SMS">SMS</option>
//                             </select>
//                         </div>
//                     </div>

//                     {request.service_category?.fields && (
//                         <div className="mt-6">
//                             <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Fields</h3>
//                             <div className="space-y-4">
//                                 {request.service_category.fields.map((field) => (
//                                     <div key={field.id}>
//                                         <label className="block text-sm font-medium text-gray-700">
//                                             {field.fieldName}
//                                         </label>
//                                         {field.inputType === 'textarea' ? (
//                                             <textarea
//                                                 value={formData.fields[field.id] || ''}
//                                                 onChange={(e) => handleFieldChange(field.id, e.target.value)}
//                                                 className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
//                                                 rows={3}
//                                             />
//                                         ) : (
//                                             <input
//                                                 type={field.inputType}
//                                                 value={formData.fields[field.id] || ''}
//                                                 onChange={(e) => handleFieldChange(field.id, e.target.value)}
//                                                 className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
//                                             />
//                                         )}
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     )}

//                     <div className="flex justify-end space-x-3 mt-6">
//                         <button
//                             type="button"
//                             onClick={onClose}
//                             className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-50"
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             type="submit"
//                             className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600"
//                         >
//                             Save Changes
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };
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
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [editingRequest, setEditingRequest] = useState(null);

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
            setFilteredRequests(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

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
            await fetchRequests(); // Refresh the list
            setEditingRequest(null); // Close the edit form
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
    }, [searchTerm, requests]);

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

    if (loading) return <div className="p-6">Loading...</div>;
    if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

    return (
        <AdminLayout>
            {/* Details Modal */}
            {selectedRequest && (
                <RequestDetailsView
                    request={selectedRequest}
                    onClose={() => setSelectedRequest(null)}
                />
            )}

            {/* Edit Modal */}
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
                            <button className="p-2 border rounded hover:bg-gray-50">
                                <Filter className="h-4 w-4" />
                            </button>
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
                                    {filteredRequests.map((request) => (
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
                                                        className="text-sky-500 border-2 border-gray-300 p-2 rounded hover:text-sky-700"
                                                        onClick={() => setSelectedRequest(request)}
                                                    >
                                                        View
                                                    </button>
                                                    <button
                                                        className="text-yellow-500 border-2 border-gray-300 p-2 rounded hover:text-yellow-700"
                                                        onClick={() => setEditingRequest(request)}
                                                    >
                                                        <Edit2 className="h-4 w-4" /> Edit
                                                    </button>
                                                   
                                                </div>
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

export default RequestsPage;