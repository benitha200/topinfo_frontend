import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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

const AdminDashboard = () => {
  // Dummy data instead of API calls
  const dummyUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Active' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', status: 'Pending' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', status: 'Active' },
    { id: 5, name: 'Tom Brown', email: 'tom@example.com', status: 'Inactive' },
    { id: 6, name: 'Emily Davis', email: 'emily@example.com', status: 'Active' }
  ];

  const dummyRequests = [
    { id: 1, title: 'Technical Support', status: 'In Progress', date: '2024-03-15' },
    { id: 2, title: 'Account Access', status: 'Pending', date: '2024-03-14' },
    { id: 3, title: 'Service Upgrade', status: 'Completed', date: '2024-03-13' },
    { id: 4, title: 'Payment Issue', status: 'In Progress', date: '2024-03-12' },
    { id: 5, title: 'Feature Request', status: 'New', date: '2024-03-11' }
  ];

  const dummyPayments = [
    { id: 1, amount: 299.99, date: '2024-03-15', status: 'Completed' },
    { id: 2, amount: 199.50, date: '2024-03-14', status: 'Completed' },
    { id: 3, amount: 499.99, date: '2024-03-13', status: 'Pending' },
    { id: 4, amount: 149.99, date: '2024-03-12', status: 'Completed' },
    { id: 5, amount: 399.99, date: '2024-03-11', status: 'Failed' }
  ];

  const [users] = useState(dummyUsers);
  const [requests] = useState(dummyRequests);
  const [payments] = useState(dummyPayments);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const navItems = [
    { icon: BarChart2, label: 'Overview', path: '/dashboard' },
    { icon: Users, label: 'Users', path: '/dashboard/users' },
    { icon: FileText, label: 'Requests', path: '/dashboard/requests' },
    { icon: CreditCard, label: 'Payments', path: '/dashboard/payments' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  // Calculate total revenue from payments
  const totalRevenue = payments.reduce((sum, payment) => sum + payment.amount, 0);

  // Calculate active requests
  const activeRequests = requests.filter(request => 
    request.status === 'In Progress' || request.status === 'New'
  ).length;

  // Calculate active users
  const activeUsers = users.filter(user => user.status === 'Active').length;

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
                <p className="text-xs text-gray-500">+20% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Requests</CardTitle>
                <FileText className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeRequests}</div>
                <p className="text-xs text-gray-500">+15% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <CreditCard className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${totalRevenue.toLocaleString()}
                </div>
                <p className="text-xs text-gray-500">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                <BarChart2 className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">32%</div>
                <p className="text-xs text-gray-500">+8% from last month</p>
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
                        <p className="text-sm font-medium">{user.name}</p>
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
                  {requests.map((request) => (
                    <div key={request.id} className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <FileText className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium">{request.title}</p>
                        <p className="text-xs text-gray-500">{request.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Payments List */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {payments.map((payment) => (
                    <div key={payment.id} className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                        <CreditCard className="h-4 w-4 text-purple-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium">${payment.amount.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">{payment.date} • {payment.status}</p>
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