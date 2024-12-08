import React, { useState, useEffect } from 'react';
import {
    User,
    Bell,
    Shield,
    Globe,
    Mail,
    Smartphone,
    Key,
    Save,
    DollarSign,
    Mail as MailIcon,
    CheckCircle2,
    Coins
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import AdminLayout from './AdminLayout';
import { toast } from 'sonner';
import API_URL from '../../constants/Constants';

const SettingsPage = () => {
    const [settings, setSettings] = useState({
        client_price: 2000,
        provider_price: 3000,
        support_email: 'support@topinfo.rw'
    });

    const [isEdited, setIsEdited] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    // Fetch initial settings
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const myHeaders = new Headers();
                myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);
                
                const requestOptions = {
                    method: "GET",
                    headers: myHeaders,
                    redirect: "follow"
                };

                const response = await fetch(`${API_URL}/settings`, requestOptions);
                const result = await response.json();
                
                setSettings(result);
            } catch (error) {
                console.error('Failed to fetch settings:', error);
                toast.error('Failed to load settings');
            }
        };

        fetchSettings();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: name.includes('price') ? Number(value) : value
        }));
        setIsEdited(true);
    };

    const handleSaveSettings = async () => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsImlhdCI6MTczMzY3MTY3NCwiZXhwIjoxNzMzNzU4MDc0fQ.4bSz_QQ4lq1QSQiCXI5IZFzBXoqdhrv-mmjKkOQCKgw");
            
            const raw = JSON.stringify({
                client_price: settings.client_price,
                provider_price: settings.provider_price,
                support_email: settings.support_email
            });

            const requestOptions = {
                method: "PUT",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            const response = await fetch(`${API_URL}/settings`, requestOptions);
            const result = await response.json();
            
            // Show success message
            setShowSuccessMessage(true);
            
            // Hide success message after 3 seconds
            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 3000);

            toast.success('Settings updated successfully');
            setIsEdited(false);
            setSettings(result);
        } catch (error) {
            console.error('Failed to update settings:', error);
            toast.error('Failed to update settings');
        }
    };

    return (
        <AdminLayout>
            {/* Success Message */}
            {showSuccessMessage && (
                <div className="fixed top-4 right-4 z-50">
                    <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center">
                        <CheckCircle2 className="mr-2 h-5 w-5" />
                        Settings updated successfully!
                    </div>
                </div>
            )}

            <div className="p-6 space-y-6">
                {/* Page Header */}
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Settings</h1>
                    <button 
                        onClick={handleSaveSettings}
                        disabled={!isEdited}
                        className={`px-4 py-2 rounded flex items-center 
                            ${isEdited 
                                ? 'bg-sky-500 text-white hover:bg-sky-600' 
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                    >
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Pricing Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Coins className="h-5 w-5 mr-2 text-green-500" />
                                Pricing Settings
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Client Price</label>
                                <input
                                    type="number"
                                    name="client_price"
                                    value={settings.client_price}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Provider Price</label>
                                <input
                                    type="number"
                                    name="provider_price"
                                    value={settings.provider_price}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Support Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <MailIcon className="h-5 w-5 mr-2 text-blue-500" />
                                Support Settings
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Support Email</label>
                                <input
                                    type="email"
                                    name="support_email"
                                    value={settings.support_email}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
};

export default SettingsPage;