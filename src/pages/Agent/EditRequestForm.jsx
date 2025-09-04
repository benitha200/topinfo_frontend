import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import axios from 'axios';
import { toast } from 'sonner';
import API_URL from '../../constants/Constants';

const EditRequestForm = ({ request, onClose, onUpdate }) => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`${API_URL}/requests/${request.id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                toast.success('Request updated successfully');
                onUpdate(response.data);
                onClose();
            }
        } catch (error) {
            toast.error('Failed to update request');
        }
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
                                    className="mt-1 p-2 block w-full rounded border border-gray-300 focus:ring-2 focus:ring-slate-500 focus:outline-none"
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
                                    className="mt-1 p-2 block w-full rounded border border-gray-300 focus:ring-2 focus:ring-slate-500 focus:outline-none"
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
                                    className="mt-1 p-2 block w-full rounded border border-gray-300 focus:ring-2 focus:ring-slate-500 focus:outline-none"
                                />
                            </div>

                           
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Status
                                </label>
                                <select
                                    value={formData.status}
                                    disabled
                                    className="mt-1 p-2 block w-full rounded border border-gray-300 bg-gray-50 cursor-not-allowed"
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
                                    className="mt-1 p-2 block w-full rounded border border-gray-300 focus:ring-2 focus:ring-slate-500 focus:outline-none"
                                >
                                    <option value="EMAIL">Email</option>
                                    <option value="SMS">SMS</option>
                                </select>
                            </div>
                        </div>

                        {request.service_category?.fields && (
                            <div className="mt-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Fields</h3>
                                <div className="space-y-4">
                                    {request.service_category.fields.map((field) => (
                                        <div key={field.id}>
                                            <label className="block text-sm font-medium text-gray-700">
                                                {field.fieldName}
                                            </label>
                                            {field.inputType === 'textarea' ? (
                                                <textarea
                                                    value={formData.fields[field.id] || ''}
                                                    onChange={(e) => handleFieldChange(field.id, e.target.value)}
                                                    className="mt-1 p-2 block w-full rounded border border-gray-300 focus:ring-2 focus:ring-slate-500 focus:outline-none"
                                                    rows={3}
                                                />
                                            ) : (
                                                <input
                                                    type={field.inputType}
                                                    value={formData.fields[field.id] || ''}
                                                    onChange={(e) => handleFieldChange(field.id, e.target.value)}
                                                    className="mt-1 p-2 block w-full rounded border border-gray-300 focus:ring-2 focus:ring-slate-500 focus:outline-none"
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
                            className="px-4 py-2 bg-slate-500 text-white rounded hover:bg-slate-600"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditRequestForm;