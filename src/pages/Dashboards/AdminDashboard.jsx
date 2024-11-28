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


  const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
  
  const axiosConfig = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };

  // Fetch data functions
  const fetchClients = async () => {
    try {
      const response = await axios.get(`${API_URL}/clients`, axiosConfig);
      setUsers(response.data);
    } catch (err) {
      setError('Error fetching clients');
      console.error('Error fetching clients:', err);
    }
  };

  const fetchRequests = async () => {
    try {
      const response = await axios.get(`${API_URL}/requests`, axiosConfig);
      setRequests(response.data);
    } catch (err) {
      setError('Error fetching requests');
      console.error('Error fetching requests:', err);
    }
  };

  const fetchServiceProviders = async () => {
    try {
      const response = await axios.get(`${API_URL}/service-providers`, axiosConfig);
      setServiceProviders(response.data);
    } catch (err) {
      setError('Error fetching service providers');
      console.error('Error fetching service providers:', err);
    }
  };

  const fetchServiceCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/service-categories`, axiosConfig);
      setServiceCategories(response.data);
    } catch (err) {
      setError('Error fetching service categories');
      console.error('Error fetching service categories:', err);
    }
  };

  // Load data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await Promise.all([
          fetchClients(),
          fetchRequests(),
          fetchServiceProviders(),
          fetchServiceCategories()
        ]);
      } catch (err) {
        setError('Error fetching data');
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const navItems = [
    { icon: BarChart2, label: 'Overview', path: '/dashboard' },
    { icon: Users, label: 'Users', path: '/dashboard/users' },
    { icon: FileText, label: 'Requests', path: '/dashboard/requests' },
    { icon: CreditCard, label: 'Service Providers', path: '/dashboard/service-providers' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ];

  // Calculate statistics
  const activeUsers = users.length;
  const activeRequests = requests.filter(request => 
    request.status === 'In Progress' || request.status === 'New'
  ).length;
  const approvedProviders = serviceProviders.filter(provider => provider.approved).length;
  const totalCategories = serviceCategories.length;

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="flex h-screen items-center justify-center text-red-600">{error}</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0`}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between px-4 py-6">
            <Link to="/dashboard" className="text-xl font-bold text-blue-600">
              TopInfo Admin
            </Link>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                    location.pathname === item.path
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="border-t border-gray-200 p-4">
            <button
              onClick={handleLogout}
              className="flex w-full items-center px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, Admin</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <Users className="h-4 w-4 text-blue-500" />
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

          {/* Lists Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Users List */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.slice(0, 5).map((user) => (
                    <div key={user.id} className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Users className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium">{`${user.firstname} ${user.lastname}`}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Requests List */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {requests.slice(0, 5).map((request) => (
                    <div key={request.id} className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <FileText className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium">{request.description.substring(0, 30)}...</p>
                        <p className="text-xs text-gray-500">Service Date: {new Date(request.service_date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Service Providers List */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Service Providers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {serviceProviders.slice(0, 5).map((provider) => (
                    <div key={provider.id} className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                        <Users className="h-4 w-4 text-purple-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium">{`${provider.firstname} ${provider.lastname}`}</p>
                        <p className="text-xs text-gray-500">{provider.experience} • {provider.location_district}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;