// import React, { useState, useEffect } from 'react';
// import { Users, Search, Filter } from 'lucide-react';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import AdminLayout from './AdminLayout';
// import API_URL from '../../constants/Constants';

// const ClientsPage = () => {
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [searchTerm, setSearchTerm] = useState('');


//     // Fetch users data combining both clients and service providers
//     const fetchUsers = async () => {
//         try {
//             setLoading(true);
//             const token = localStorage.getItem('token');
            
//             // Fetch only clients
//             const clientsResponse = await fetch(`${API_URL}/clients`, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });
    
//             const clients = await clientsResponse.json();
    
//             // Format the clients data
//             const formattedUsers = clients.map(client => ({
//                 ...client,
//                 role: 'Client',
//                 status: 'Active', 
//                 name: `${client.firstname} ${client.lastname}`
//             }));
    
//             setUsers(formattedUsers);
//             setLoading(false);
//         } catch (err) {
//             setError('Failed to fetch users');
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchUsers();
//     }, []);


//     const handleEditUser = async (id, userData) => {
//         try {
//             const token = localStorage.getItem('token');
//             const response = await fetch(`${API_URL}/clients/${id}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(userData)
//             });

//             if (response.ok) {
//                 setAlertMessage('User updated successfully');
//                 setShowAlert(true);
//                 fetchUsers(); // Refresh the users list
//             } else {
//                 throw new Error('Failed to update user');
//             }
//         } catch (err) {
//             setAlertMessage('Failed to update user');
//             setShowAlert(true);
//         }
//     };

//     // Filter users based on search term
//     const filteredUsers = users.filter(user => 
//         user.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         user.lastname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         user.email?.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     if (loading) return <div className="p-6">Loading...</div>;
//     if (error) return <div className="p-6 text-red-500">{error}</div>;

//     return (
//         <AdminLayout>
//             <div className="p-6 space-y-6">
//                 <Card>
//                     <CardHeader>
//                         <CardTitle>Client Statistics</CardTitle>
//                     </CardHeader>
//                     <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                         <div className="flex items-center space-x-4 p-4 bg-sky-50 rounded-lg">
//                             <Users className="h-8 w-8 text-sky-500" />
//                             <div>
//                                 <p className="text-sm text-gray-500">Total Clients</p>
//                                 <p className="text-2xl font-bold">{users.length}</p>
//                             </div>
//                         </div>
//                         <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
//                             <Users className="h-8 w-8 text-green-500" />
//                             <div>
//                                 <p className="text-sm text-gray-500">New Clients</p>
//                                 <p className="text-2xl font-bold">
//                                     {users.filter(user => user.status === 'Active').length}
//                                 </p>
//                             </div>
//                         </div>
                 
//                     </CardContent>
//                 </Card>

//                 <Card>
//                     <CardHeader className="flex flex-row items-center justify-between">
//                         <CardTitle>Users List</CardTitle>
//                         <div className="flex space-x-2">
//                             <div className="relative">
//                                 <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
//                                 <input
//                                     type="text"
//                                     placeholder="Search users..."
//                                     value={searchTerm}
//                                     onChange={(e) => setSearchTerm(e.target.value)}
//                                     className="pl-8 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
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
//                                         <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Name</th>
//                                         <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Email</th>
//                                         <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Role</th>
//                                         <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
//                                         <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Location</th>
//                                         <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {filteredUsers.map((user) => (
//                                         <tr key={user.id} className="border-b">
//                                             <td className="px-4 py-3 text-sm">
//                                                 {`${user.firstname} ${user.lastname}`}
//                                             </td>
//                                             <td className="px-4 py-3 text-sm">{user.email}</td>
//                                             <td className="px-4 py-3 text-sm">{user.role}</td>
//                                             <td className="px-4 py-3 text-sm">
//                                                 <span className={`px-2 py-1 rounded-full text-xs ${
//                                                     user.status === 'Active' ? 'bg-green-100 text-green-800' :
//                                                     user.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
//                                                     'bg-red-100 text-red-800'
//                                                 }`}>
//                                                     {user.status}
//                                                 </span>
//                                             </td>
//                                             <td className="px-4 py-3 text-sm">
//                                                 {`${user.location_sector}, ${user.location_district}`}
//                                             </td>
//                                             <td className="px-4 py-3 text-sm">
//                                                 <button 
//                                                     onClick={() => handleEditUser(user.id, {})}
//                                                     className="text-sky-500 border border-2 border-gray-300 p-2 rounded hover:text-sky-700 mr-2"
//                                                 >
//                                                     Edit
//                                                 </button>
//                                                 <button className="text-red-500 border border-2 border-gray-300 p-2 rounded hover:text-red-700">
//                                                     Delete
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

// export default ClientsPage;

import React, { useState, useEffect } from 'react';
import { Users, Search, Filter, Edit, Trash2, X, Save } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import AdminLayout from './AdminLayout';
import API_URL from '../../constants/Constants';

const ClientsPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    
    // Edit card state
    const [isEditCardOpen, setIsEditCardOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    
    // Alert state
    const [alert, setAlert] = useState({
        show: false,
        type: 'success',
        message: ''
    });

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
                role: 'Client',
                status: client.status || 'Active', 
                name: `${client.firstname} ${client.lastname}`
            }));
    
            setUsers(formattedUsers);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch users');
            setLoading(false);
            showAlert('error', 'Failed to fetch users');
        }
    };

    // Show alert
    const showAlert = (type, message) => {
        setAlert({
            show: true,
            type,
            message
        });
        setTimeout(() => {
            setAlert({ show: false, type: 'success', message: '' });
        }, 3000);
    };

    // Open edit card
    const openEditCard = (user) => {
        setCurrentUser({ ...user });
        setIsEditCardOpen(true);
    };

    // Handle user edit
    const handleEditUser = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/clients/${currentUser.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(currentUser)
            });

            if (response.ok) {
                showAlert('success', 'User updated successfully');
                fetchUsers();
                setIsEditCardOpen(false);
            } else {
                throw new Error('Failed to update user');
            }
        } catch (err) {
            showAlert('error', 'Failed to update user');
        }
    };

    // Handle user delete
    const handleDeleteUser = async (userId) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/clients/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                showAlert('success', 'User deleted successfully');
                fetchUsers();
            } else {
                throw new Error('Failed to delete user');
            }
        } catch (err) {
            showAlert('error', 'Failed to delete user');
        }
    };

    // Filter users based on search term
    const filteredUsers = users.filter(user => 
        user.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Fetch users on component mount
    useEffect(() => {
        fetchUsers();
    }, []);

    // Render loading or error states
    if (loading) return (
        <AdminLayout>
            <div className="flex justify-center items-center h-full p-6">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
            </div>
        </AdminLayout>
    );

    if (error) return (
        <AdminLayout>
            <div className="p-6 text-red-500">{error}</div>
        </AdminLayout>
    );

    return (
        <AdminLayout>
            {/* Alert Component */}
            {alert.show && (
                <Alert 
                    variant={alert.type === 'success' ? 'default' : 'destructive'} 
                    className="mb-4 absolute top-4 right-4 z-50 w-96"
                >
                    <AlertTitle>{alert.type === 'success' ? 'Success' : 'Error'}</AlertTitle>
                    <AlertDescription>{alert.message}</AlertDescription>
                </Alert>
            )}

            <div className="p-6 space-y-6">
                {/* Client Statistics Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Client Statistics</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-4 p-4 bg-sky-50 rounded-lg">
                            <Users className="h-8 w-8 text-sky-500" />
                            <div>
                                <p className="text-sm text-gray-500">Total Clients</p>
                                <p className="text-2xl font-bold">{users.length}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                            <Users className="h-8 w-8 text-green-500" />
                            <div>
                                <p className="text-sm text-gray-500">Active Clients</p>
                                <p className="text-2xl font-bold">
                                    {users.filter(user => user.status === 'Active').length}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Users List Card */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Users List</CardTitle>
                        <div className="flex space-x-2">
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Search users..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-8 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
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
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Name</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Email</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Role</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Location</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map((user) => (
                                        <tr key={user.id} className="border-b hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-3 text-sm">
                                                {`${user.firstname} ${user.lastname}`}
                                            </td>
                                            <td className="px-4 py-3 text-sm">{user.email}</td>
                                            <td className="px-4 py-3 text-sm">{user.role}</td>
                                            <td className="px-4 py-3 text-sm">
                                                <span className={`px-2 py-1 rounded-full text-xs ${
                                                    user.status === 'Active' ? 'bg-green-100 text-green-800' :
                                                    user.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                    {user.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm">
                                                {`${user.location_sector}, ${user.location_district}`}
                                            </td>
                                            <td className="px-4 py-3 text-sm flex space-x-2">
                                                <button 
                                                    onClick={() => openEditCard(user)}
                                                    className="text-sky-500 hover:bg-sky-50 p-2 rounded-full"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                                <button 
                                                    onClick={() => handleDeleteUser(user.id)}
                                                    className="text-red-500 hover:bg-red-50 p-2 rounded-full"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {filteredUsers.length === 0 && (
                                <div className="text-center text-gray-500 py-4">
                                    No users found
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Edit User Card */}
                {isEditCardOpen && currentUser && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <Card className="w-full max-w-[600px] bg-white">
                            <CardHeader>
                                <CardTitle>Edit User</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                        <Input 
                                            value={currentUser.firstname}
                                            onChange={(e) => setCurrentUser({...currentUser, firstname: e.target.value})}
                                            placeholder="First Name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                        <Input 
                                            value={currentUser.lastname}
                                            onChange={(e) => setCurrentUser({...currentUser, lastname: e.target.value})}
                                            placeholder="Last Name"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                    <Input 
                                        value={currentUser.email}
                                        onChange={(e) => setCurrentUser({...currentUser, email: e.target.value})}
                                        placeholder="Email"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                        <Select 
                                            value={currentUser.status}
                                            onValueChange={(value) => setCurrentUser({...currentUser, status: value})}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Active">Active</SelectItem>
                                                <SelectItem value="Pending">Pending</SelectItem>
                                                <SelectItem value="Inactive">Inactive</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                                        <Input 
                                            value={`${currentUser.location_sector}, ${currentUser.location_district}`}
                                            onChange={(e) => {
                                                const [sector, district] = e.target.value.split(', ');
                                                setCurrentUser({...currentUser, location_sector: sector, location_district: district});
                                            }}
                                            placeholder="Sector, District"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-end space-x-2">
                                <Button 
                                    variant="outline" 
                                    onClick={() => setIsEditCardOpen(false)}
                                >
                                    <X className="mr-2 h-4 w-4" /> Cancel
                                </Button>
                                <Button onClick={handleEditUser}>
                                    <Save className="mr-2 h-4 w-4" /> Save Changes
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default ClientsPage;