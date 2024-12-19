// import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import axios from 'axios';
// import {
//   Users,
//   FileText,
//   CreditCard,
//   BarChart2,
//   Settings,
//   LogOut,
//   Menu,
//   X
// } from 'lucide-react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import API_URL from '../../constants/Constants';
// import AdminLayout from '../Admin/AdminLayout';


// const AdminDashboard = () => {
//   // State management
//   const [users, setUsers] = useState([]);
//   const [requests, setRequests] = useState([]);
//   const [serviceProviders, setServiceProviders] = useState([]);
//   const [serviceCategories, setServiceCategories] = useState([]);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   const location = useLocation();

//   // Navigation items
//   const navItems = [
//     { icon: BarChart2, label: 'Overview', path: '/dashboard' },
//     { icon: Users, label: 'Users', path: '/dashboard/users' },
//     { icon: FileText, label: 'Requests', path: '/dashboard/requests' },
//     { icon: CreditCard, label: 'Service Providers', path: '/dashboard/service-providers' },
//     { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
//   ];

//   // Authentication token (replace with your authentication logic)
//   const token = localStorage.getItem('token');
  
//   const axiosConfig = {
//     headers: {
//       'Authorization': `Bearer ${token}`,
//       'Content-Type': 'application/json'
//     }
//   };

//   // Fetch data functions (mock implementations)
//   const fetchData = async () => {
//     try {
//       // Replace these with actual API calls
//       const usersResponse = await axios.get(`${API_URL}/users`, axiosConfig);
//       // const requestsResponse = await axios.get(`${API_URL}/requests`, axiosConfig);
//       const providersResponse = await axios.get(`${API_URL}/service-providers`, axiosConfig);
//       const categoriesResponse = await axios.get(`${API_URL}/service-categories`, axiosConfig);

//       setUsers(usersResponse.data);
//       // setRequests(requestsResponse.data);
//       setServiceProviders(providersResponse.data);
//       setServiceCategories(categoriesResponse.data);
//     } catch (err) {
//       setError('Error fetching dashboard data');
//       console.error('Dashboard fetch error:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Logout handler
//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     window.location.href = '/login';
//   };

//   // Compute dashboard statistics
//   const activeUsers = users.length;
//   // const activeRequests = requests.filter(request => 
//   //   request.status === 'In Progress' || request.status === 'New'
//   // ).length;
//   const approvedProviders = serviceProviders.filter(provider => provider.approved).length;
//   const totalCategories = serviceCategories.length;

//   // Loading state
//   if (isLoading) {
//     return (
//       <div className="flex h-screen items-center justify-center">
//         Loading dashboard...
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className="flex h-screen items-center justify-center text-red-600">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <AdminLayout>
//       <div className="flex h-screen bg-gray-100">
  

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
        
//         {/* Dashboard Content */}
//         <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
//           {/* Stats Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Active Users</CardTitle>
//                 <Users className="h-4 w-4 text-sky-500" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{activeUsers}</div>
//                 <p className="text-xs text-gray-500">Total registered users</p>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Active Requests</CardTitle>
//                 <FileText className="h-4 w-4 text-green-500" />
//               </CardHeader>
//               <CardContent>
//                 {/* <div className="text-2xl font-bold">{activeRequests}</div> */}
//                 <p className="text-xs text-gray-500">Pending and in-progress requests</p>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Service Providers</CardTitle>
//                 <Users className="h-4 w-4 text-purple-500" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{approvedProviders}</div>
//                 <p className="text-xs text-gray-500">Approved service providers</p>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Service Categories</CardTitle>
//                 <BarChart2 className="h-4 w-4 text-orange-500" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{totalCategories}</div>
//                 <p className="text-xs text-gray-500">Available service types</p>
//               </CardContent>
//             </Card>
//           </div>
//         </main>
//       </div>
//     </div>
//     </AdminLayout>
    
//   );
// };

// export default AdminDashboard;

import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer
} from 'recharts';
import {
  Users,
  FileText,
  CreditCard,
  BarChart2,
  Settings,
  TrendingUp
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AdminDashboard = () => {
  // Sample data processing
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const calculateTotalRevenue = (payments) => {
    return payments
      .filter(payment => payment.status === 'COMPLETED')
      .reduce((sum, payment) => sum + Number(payment.amount), 0);
  };

  const calculateLocationDistribution = (users) => {
    const distribution = users.reduce((acc, user) => {
      acc[user.location_province] = (acc[user.location_province] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(distribution).map(([name, value]) => ({
      name,
      value
    }));
  };

  // Mock data based on your API responses
  const locationData = [
    { name: 'Kigali', value: 45 },
    { name: 'East', value: 15 },
    { name: 'West', value: 20 },
    { name: 'North', value: 12 },
    { name: 'South', value: 18 }
  ];

  const revenueData = [
    { name: 'Mon', revenue: 2000 },
    { name: 'Tue', revenue: 3500 },
    { name: 'Wed', revenue: 3000 },
    { name: 'Thu', revenue: 4500 },
    { name: 'Fri', revenue: 4000 },
    { name: 'Sat', revenue: 5000 },
    { name: 'Sun', revenue: 3800 }
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">217</div>
            <p className="text-xs text-gray-500">Active service providers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Super Agents</CardTitle>
            <Users className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-gray-500">Regional supervisors</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">RWF 24,000</div>
            <p className="text-xs text-gray-500">From completed transactions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <BarChart2 className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-gray-500">Transaction completion rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#8884d8" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Agent Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Agent Distribution by Province</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={locationData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {locationData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]} 
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;