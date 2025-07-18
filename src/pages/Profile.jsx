import React, { useState, useEffect } from 'react';
import { User, Upload, Mail, Phone, MapPin, CreditCard, Save, CheckCircle2, Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import AgentLayout from './Agent/AgentLayout';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import API_URL from '../constants/Constants';

const Profile = () => {
    const [userData, setUserData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        location_province: '',
        location_district: '',
        location_sector: '',
        profileImage: null,
        nationalIdImage: null
    });
    const [loading, setLoading] = useState(false);
    const [isEdited, setIsEdited] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const user = JSON.parse(localStorage.getItem('user'));

    // Function to get complete image URL with correct path separators
    const getImageUrl = (imagePath) => {
        if (!imagePath) return null;
        if (imagePath instanceof File) return URL.createObjectURL(imagePath);
        if (imagePath.startsWith('http')) return imagePath;

        // Replace all backslashes with forward slashes and ensure no double slashes
        const normalizedPath = imagePath.replace(/\\/g, '/').replace(/\/+/g, '/');
        return `${API_URL}/${normalizedPath}`;
    };

    useEffect(() => {
        if (user) {
            setUserData({
                firstname: user.firstname || '',
                lastname: user.lastname || '',
                email: user.email || '',
                phone: user.phone || '',
                location_province: user.location_province || '',
                location_district: user.location_district || '',
                location_sector: user.location_sector || '',
                profileImage: user.profileImage || null,
                nationalIdImage: user.nationalIdImage || null
            });
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
        setIsEdited(true);
    };


    const downloadProfileCard = async () => {
        // First make the card visible
        const card = document.getElementById('downloadable-card');
        if (!card) return;

        // Temporarily show the card
        card.style.display = 'block';
        card.style.position = 'fixed';
        card.style.top = '0';
        card.style.left = '0';
        card.style.zIndex = '-1000';

        try {
            const canvas = await html2canvas(card, {
                backgroundColor: '#ffffff',
                scale: 2, // Increase quality
                logging: false,
                useCORS: true,
                allowTaint: true,
            });

            // Convert to blob
            canvas.toBlob((blob) => {
                if (blob) {
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.download = `${userData.firstname}-${userData.lastname}-profile-card.png`;
                    link.href = url;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);
                    toast.success('Profile card downloaded successfully');
                }
            }, 'image/png', 1.0);
        } catch (error) {
            console.error('Download error:', error);
            toast.error('Failed to download profile card');
        } finally {
            // Hide the card again
            card.style.display = 'none';
            card.style.position = 'static';
        }
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            setUserData(prev => ({
                ...prev,
                [name]: files[0]
            }));
            setIsEdited(true);
        }
    };

    const handleSubmit = async () => {
        setLoading(true);

        try {
            const formData = new FormData();

            Object.keys(userData).forEach(key => {
                if (userData[key] && key !== 'profileImage' && key !== 'nationalIdImage') {
                    formData.append(key, userData[key]);
                }
            });

            if (userData.profileImage instanceof File) {
                formData.append('profileImage', userData.profileImage);
            }
            if (userData.nationalIdImage instanceof File) {
                formData.append('nationalIdImage', userData.nationalIdImage);
            }

            const response = await fetch(`${API_URL}/users/${user.id}`, {
                method: 'PUT',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });

            if (!response.ok) throw new Error('Update failed');

            const result = await response.json();
            localStorage.setItem('user', JSON.stringify({ ...user, ...result }));

            setShowSuccessMessage(true);
            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 3000);

            toast.success('Profile updated successfully');
            setIsEdited(false);
        } catch (error) {
            toast.error('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AgentLayout>
            {showSuccessMessage && (
                <div className="fixed top-4 right-4 z-50">
                    <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center">
                        <CheckCircle2 className="mr-2 h-5 w-5" />
                        Profile updated successfully!
                    </div>
                </div>
            )}

            <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h1 className="text-xl lg:text-2xl font-bold">Profile Settings</h1>
                    <div className="flex gap-2 w-full sm:w-auto">
                        <button
                            onClick={downloadProfileCard}
                            className="px-4 py-2 rounded bg-sky-500 text-white hover:bg-sky-600 flex items-center justify-center"
                        >
                            <Download className="h-4 w-4 mr-2" />
                            Download Card
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={!isEdited || loading}
                            className={`px-4 py-2 rounded flex items-center justify-center
                                ${isEdited && !loading
                                    ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            <Save className="h-4 w-4 mr-2" />
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>

                {/* Downloadable Card */}
                <div id="downloadable-card" style={{ display: 'none' }}>
                    <div className="w-[300px] h-[400px] bg-white rounded-lg shadow-lg p-6 relative overflow-hidden" style={{ backgroundColor: 'white' }}>
                        {/* Background decoration */}
                        <div
                            className="absolute top-0 right-0 w-40 h-40 rounded-full transform translate-x-20 -translate-y-20"
                            style={{ backgroundColor: '#0EA5E9' }}
                        />

                        {/* Content Container - Flex Column */}
                        <div className="flex flex-col items-center gap-4">
                            {/* Profile Image */}
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4" style={{ borderColor: '#0EA5E9' }}>
                                {userData.profileImage ? (
                                    <img
                                        src={getImageUrl(userData.profileImage)}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                        crossOrigin="anonymous"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-50">
                                        <User className="w-16 h-16 text-gray-400" />
                                    </div>
                                )}
                            </div>

                            {/* User Details */}
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-gray-800" style={{ color: '#1F2937' }}>
                                    {`${userData.firstname} ${userData.lastname}`}
                                </h2>
                                <p className="font-semibold text-lg" style={{ color: '#0EA5E9' }}>TopInfo Agent</p>
                            </div>

                            {/* Contact Information */}
                            <div className="mt-4 space-y-3 text-sm w-full" style={{ color: '#4B5563' }}>
                                <p className="flex items-center">
                                    <Mail className="w-5 h-5 mr-2" style={{ color: '#0EA5E9' }} />
                                    {userData.email}
                                </p>
                                <p className="flex items-center">
                                    <Phone className="w-5 h-5 mr-2" style={{ color: '#0EA5E9' }} />
                                    {userData.phone}
                                </p>
                                <p className="flex items-center">
                                    <MapPin className="w-5 h-5 mr-2" style={{ color: '#0EA5E9' }} />
                                    {`${userData.location_sector}, ${userData.location_district}`}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* </div> */}


                <div className="grid grid-cols-1 gap-4 lg:gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <User className="h-5 w-5 mr-2 text-sky-500" />
                                Profile Picture
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center space-y-4">
                            <div className="relative group">
                                <div className="w-40 h-40 rounded-full overflow-hidden bg-gradient-to-r from-sky-400 to-sky-500 p-1">
                                    <div className="w-full h-full bg-white rounded-full overflow-hidden">
                                        {userData.profileImage ? (
                                            <img
                                                src={getImageUrl(userData.profileImage)}
                                                alt="Profile"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-50">
                                                <User className="w-20 h-20 text-gray-400" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <label className="absolute bottom-0 right-0 bg-white rounded-full p-3 shadow-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                    <Upload className="w-5 h-5 text-gray-600" />
                                    <input
                                        type="file"
                                        name="profileImage"
                                        onChange={handleFileChange}
                                        accept="image/*"
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <User className="h-5 w-5 mr-2 text-purple-500" />
                                Personal Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>First Name</Label>
                                    <Input
                                        name="firstname"
                                        value={userData.firstname}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Last Name</Label>
                                    <Input
                                        name="lastname"
                                        value={userData.lastname}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Mail className="h-5 w-5 mr-2 text-sky-500" />
                                Contact Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>Email Address</Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        value={userData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Phone Number</Label>
                                    <Input
                                        name="phone"
                                        value={userData.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <MapPin className="h-5 w-5 mr-2 text-green-500" />
                                Location Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <Label>Province</Label>
                                    <Input
                                        name="location_province"
                                        value={userData.location_province}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>District</Label>
                                    <Input
                                        name="location_district"
                                        value={userData.location_district}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Sector</Label>
                                    <Input
                                        name="location_sector"
                                        value={userData.location_sector}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <CreditCard className="h-5 w-5 mr-2 text-yellow-500" />
                                Identity Documents
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex flex-col items-center space-y-4">
                                    <div className="relative w-full max-w-md">
                                        <div className="aspect-[16/10] rounded-lg overflow-hidden bg-gradient-to-r from-yellow-400 to-yellow-500 p-1">
                                            <div className="w-full h-full bg-white rounded-lg overflow-hidden">
                                                {userData.nationalIdImage ? (
                                                    <img
                                                        src={getImageUrl(userData.nationalIdImage)}
                                                        alt="National ID"
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-gray-50">
                                                        <CreditCard className="w-20 h-20 text-gray-400" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <label className="absolute bottom-2 right-2 bg-white rounded-full p-3 shadow-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                            <Upload className="w-5 h-5 text-gray-600" />
                                            <input
                                                type="file"
                                                name="nationalIdImage"
                                                onChange={handleFileChange}
                                                accept="image/*"
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                    <p className="text-sm text-gray-500">Upload a clear image of your National ID</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AgentLayout>
    );
};

export default Profile;