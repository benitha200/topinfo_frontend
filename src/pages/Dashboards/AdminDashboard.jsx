import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  Users,
  FileText,
  CreditCard,
  BarChart2,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import API_URL from '../../constants/Constants';
import AdminLayout from '../Admin/AdminLayout';


const AdminDashboard = () => {
  // State management
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [serviceProviders, setServiceProviders] = useState([]);
  const [serviceCategories, setServiceCategories] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const location = useLocation();

  // Navigation items
  const navItems = [
    { icon: BarChart2, label: 'Overview', path: '/dashboard' },
    { icon: Users, label: 'Users', path: '/dashboard/users' },
    { icon: FileText, label: 'Requests', path: '/dashboard/requests' },
    { icon: CreditCard, label: 'Service Providers', path: '/dashboard/service-providers' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ];

  // Authentication token (replace with your authentication logic)
  const token = localStorage.getItem('token');
  
  const axiosConfig = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };

  // Fetch data functions (mock implementations)
  const fetchData = async () => {
    try {
      // Replace these with actual API calls
      const usersResponse = await axios.get(`${API_URL}/users`, axiosConfig);
      const requestsResponse = await axios.get(`${API_URL}/requests`, axiosConfig);
      const providersResponse = await axios.get(`${API_URL}/service-providers`, axiosConfig);
      const categoriesResponse = await axios.get(`${API_URL}/service-categories`, axiosConfig);

      setUsers(usersResponse.data);
      setRequests(requestsResponse.data);
      setServiceProviders(providersResponse.data);
      setServiceCategories(categoriesResponse.data);
    } catch (err) {
      setError('Error fetching dashboard data');
      console.error('Dashboard fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  // Compute dashboard statistics
  const activeUsers = users.length;
  const activeRequests = requests.filter(request => 
    request.status === 'In Progress' || request.status === 'New'
  ).length;
  const approvedProviders = serviceProviders.filter(provider => provider.approved).length;
  const totalCategories = serviceCategories.length;

  // Loading state
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading dashboard...
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex h-screen items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="flex h-screen bg-gray-100">
  

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <Users className="h-4 w-4 text-sky-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeUsers}</div>
                <p className="text-xs text-gray-500">Total registered users</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Requests</CardTitle>
                <FileText className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeRequests}</div>
                <p className="text-xs text-gray-500">Pending and in-progress requests</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Service Providers</CardTitle>
                <Users className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{approvedProviders}</div>
                <p className="text-xs text-gray-500">Approved service providers</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Service Categories</CardTitle>
                <BarChart2 className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalCategories}</div>
                <p className="text-xs text-gray-500">Available service types</p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
    </AdminLayout>
    
  );
};

export default AdminDashboard;