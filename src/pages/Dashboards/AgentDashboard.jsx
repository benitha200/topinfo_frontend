// import React from 'react';
// import { useState } from 'react';
// import { 
//   Users, 
//   LayoutDashboard, 
//   ClipboardList, 
//   LogOut, 
//   Menu,
//   Bell
// } from 'lucide-react';

// // Define AgentLayout component first since it's used by other components
// const AgentLayout = ({ children }) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   const menuItems = [
//     { title: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
//     { title: 'Requests', icon: <ClipboardList size={20} />, path: '/requests' },
//     { title: 'Users', icon: <Users size={20} />, path: '/users' },
//   ];

//   return (
//     <div className="h-screen flex flex-col">
//       {/* Header */}
//       <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 lg:px-6">
//         <div className="flex items-center gap-4">
//           <button
//             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//             className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
//           >
//             <Menu size={20} />
//           </button>
//           <h1 className="text-xl font-bold">Agent Portal</h1>
//         </div>
//         <div className="flex items-center gap-4">
//           <button className="p-2 hover:bg-gray-100 rounded-lg relative">
//             <Bell size={20} />
//             <span className="absolute top-1 right-1 bg-red-500 rounded-full w-2 h-2"></span>
//           </button>
//           <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
//         </div>
//       </header>

//       <div className="flex flex-1 overflow-hidden">
//         {/* Sidebar */}
//         <aside 
//           className={`
//             ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
//             fixed lg:static lg:translate-x-0 z-20 
//             bg-white border-r border-gray-200 
//             w-64 h-[calc(100vh-4rem)] 
//             transition-transform duration-200 ease-in-out
//           `}
//         >
//           <nav className="h-full flex flex-col p-4">
//             <div className="flex-1 space-y-1">
//               {menuItems.map((item) => (
//                 <button
//                   key={item.title}
//                   className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
//                 >
//                   {item.icon}
//                   <span>{item.title}</span>
//                 </button>
//               ))}
//             </div>
//             <button className="flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg">
//               <LogOut size={20} />
//               <span>Logout</span>
//             </button>
//           </nav>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 overflow-auto bg-gray-50 p-6">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// };

// // Add missing RequestCard component
// const RequestCard = ({ request }) => (
//   <div className="bg-white p-4 rounded-lg shadow">
//     <div className="flex items-center justify-between mb-2">
//       <span className={`px-2 py-1 text-sm rounded-full ${
//         request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
//         request.status === 'active' ? 'bg-green-100 text-green-800' :
//         'bg-gray-100 text-gray-800'
//       }`}>
//         {request.status}
//       </span>
//       <span className="text-sm text-gray-500">{request.date}</span>
//     </div>
//     <h3 className="font-medium mb-1">{request.title}</h3>
//     <p className="text-sm text-gray-600 mb-3">{request.description}</p>
//     <div className="flex items-center gap-2">
//       <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
//       <span className="text-sm">{request.user}</span>
//     </div>
//   </div>
// );

// // Add missing RequestList component
// const RequestList = ({ requests }) => (
//   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//     {requests.map((request) => (
//       <RequestCard key={request.id} request={request} />
//     ))}
//   </div>
// );

// // Add missing Stats component
// const Stats = ({ stats }) => (
//   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//     {stats.map((stat) => (
//       <div key={stat.title} className="bg-white p-4 rounded-lg shadow">
//         <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
//         <p className="text-2xl font-semibold">{stat.value}</p>
//         <div className="flex items-center gap-1 text-sm">
//           <span className={stat.trend > 0 ? 'text-green-600' : 'text-red-600'}>
//             {stat.trend > 0 ? '↑' : '↓'} {Math.abs(stat.trend)}%
//           </span>
//           <span className="text-gray-500">vs last month</span>
//         </div>
//       </div>
//     ))}
//   </div>
// );

// // Dummy data definitions remain the same
// const dummyRequests = [
//   {
//     id: 1,
//     title: "Technical Support Request",
//     description: "User experiencing issues with login authentication",
//     status: "pending",
//     date: "2024-03-15",
//     user: "John Doe"
//   },
//   {
//     id: 2,
//     title: "Account Access Issue",
//     description: "Password reset needed for corporate account",
//     status: "active",
//     date: "2024-03-14",
//     user: "Jane Smith"
//   },
//   {
//     id: 3,
//     title: "Software Integration Problem",
//     description: "API connection failing during data sync",
//     status: "resolved",
//     date: "2024-03-13",
//     user: "Mike Johnson"
//   },
//   {
//     id: 4,
//     title: "Email Configuration",
//     description: "Need to set up custom domain email forwarding",
//     status: "active",
//     date: "2024-03-15",
//     user: "Sarah Wilson"
//   },
//   {
//     id: 5,
//     title: "Database Backup Request",
//     description: "Scheduled backup failed to complete",
//     status: "pending",
//     date: "2024-03-14",
//     user: "Alex Thompson"
//   },
//   {
//     id: 6,
//     title: "VPN Access Setup",
//     description: "New employee needs VPN configuration",
//     status: "active",
//     date: "2024-03-15",
//     user: "Chris Anderson"
//   }
// ];

// const dummyUsers = [
//   {
//     id: 1,
//     name: "John Doe",
//     email: "john@example.com",
//     role: "Customer",
//     requests: 5,
//     joinDate: "2024-01-15"
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     email: "jane@example.com",
//     role: "Admin",
//     requests: 3,
//     joinDate: "2024-02-01"
//   },
//   {
//     id: 3,
//     name: "Mike Johnson",
//     email: "mike@example.com",
//     role: "Customer",
//     requests: 8,
//     joinDate: "2023-12-10"
//   },
//   {
//     id: 4,
//     name: "Sarah Wilson",
//     email: "sarah@example.com",
//     role: "Customer",
//     requests: 2,
//     joinDate: "2024-03-01"
//   },
//   {
//     id: 5,
//     name: "Alex Thompson",
//     email: "alex@example.com",
//     role: "Support",
//     requests: 0,
//     joinDate: "2024-03-10"
//   }
// ];

// const dummyStats = [
//   { title: "Total Requests", value: "128", trend: 12 },
//   { title: "Active Requests", value: "28", trend: -5 },
//   { title: "Resolved Today", value: "15", trend: 8 },
//   { title: "Avg Response Time", value: "24m", trend: -15 }
// ];

// const AgentDashboard = () => {
//   const [requests, setRequests] = useState(dummyRequests);
  
//   return (
//     <AgentLayout>
//       <div className="max-w-7xl mx-auto">
//         <div className="mb-6">
//           <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
//           <p className="text-gray-500">Welcome back! Here's what's happening today.</p>
//         </div>
        
//         <Stats stats={dummyStats} />
        
//         <div className="mb-6">
//           <h2 className="text-xl font-semibold mb-4">Recent Requests</h2>
//           <RequestList requests={requests} />
//         </div>
//       </div>
//     </AgentLayout>
//   );
// };

// const RequestsPage = () => {
//   const [requests, setRequests] = useState(dummyRequests);

//   return (
//     <AgentLayout>
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-6">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">All Requests</h1>
//             <p className="text-gray-500">Manage and track all support requests</p>
//           </div>
//           <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//             New Request
//           </button>
//         </div>
//         <RequestList requests={requests} />
//       </div>
//     </AgentLayout>
//   );
// };

// const UsersPage = () => {
//   const [users, setUsers] = useState(dummyUsers);

//   return (
//     <AgentLayout>
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-6">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">Users</h1>
//             <p className="text-gray-500">Manage user accounts and permissions</p>
//           </div>
//           <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//             Add User
//           </button>
//         </div>
        
//         <div className="bg-white rounded-lg shadow overflow-hidden">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Requests</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Join Date</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {users.map((user) => (
//                 <tr key={user.id}>
//                   <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{user.requests}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{user.joinDate}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </AgentLayout>
//   );
// };

// export default AgentDashboard;
// export { RequestsPage, UsersPage };

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  LayoutDashboard, 
  ClipboardList, 
  LogOut, 
  Menu,
  Bell
} from 'lucide-react';
import axios from 'axios';
import { apiService } from '../../services/apiService';

// API Configuration
const API_BASE_URL = 'http://localhost:3050/api';
const api = axios.create({
  baseURL: API_BASE_URL
});

// Set auth token for all requests
const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Modified RequestCard with API data structure
const RequestCard = ({ request }) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <div className="flex items-center justify-between mb-2">
      <span className={`px-2 py-1 text-sm rounded-full ${
        request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
        request.status === 'active' ? 'bg-green-100 text-green-800' :
        'bg-gray-100 text-gray-800'
      }`}>
        {request.status || 'New'}
      </span>
      <span className="text-sm text-gray-500">
        {request.service_date ? new Date(request.service_date).toLocaleDateString() : 'No date'}
      </span>
    </div>
    <h3 className="font-medium mb-1">Service Request #{request.id}</h3>
    <p className="text-sm text-gray-600 mb-3">{request.description}</p>
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
      <span className="text-sm">Location: {request.service_location}</span>
    </div>
  </div>
);

// Modified RequestList with API integration and empty state
const RequestList = ({ requests = [] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {requests.length > 0 ? (
      requests.map((request) => (
        <RequestCard key={request.id} request={request} />
      ))
    ) : (
      <div className="col-span-full text-center py-8 text-gray-500">
        No requests found
      </div>
    )}
  </div>
);

// Modified Stats component with default values
const Stats = ({ stats = [] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    {stats.map((stat) => (
      <div key={stat.title} className="bg-white p-4 rounded-lg shadow">
        <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
        <p className="text-2xl font-semibold">{stat.value}</p>
        <div className="flex items-center gap-1 text-sm">
          <span className={stat.trend > 0 ? 'text-green-600' : 'text-red-600'}>
            {stat.trend > 0 ? '↑' : '↓'} {Math.abs(stat.trend)}%
          </span>
          <span className="text-gray-500">vs last month</span>
        </div>
      </div>
    ))}
  </div>
);

// Modified AgentLayout with authentication
const AgentLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState([]);

  const menuItems = [
    { title: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { title: 'Requests', icon: <ClipboardList size={20} />, path: '/agent-dashboard/requests-agent' },
    { title: 'Users', icon: <Users size={20} />, path: '/users' },
  ];

  const handleLogout = () => {
    setAuthToken(null);
    // Add your logout logic here
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
          >
            <Menu size={20} />
          </button>
          <h1 className="text-xl font-bold">Agent Portal</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg relative">
            <Bell size={20} />
            {notifications.length > 0 && (
              <span className="absolute top-1 right-1 bg-red-500 rounded-full w-2 h-2"></span>
            )}
          </button>
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside 
          className={`
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            fixed lg:static lg:translate-x-0 z-20 
            bg-white border-r border-gray-200 
            w-64 h-[calc(100vh-4rem)] 
            transition-transform duration-200 ease-in-out
          `}
        >
          <nav className="h-full flex flex-col p-4">
            <div className="flex-1 space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.title}
                  className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  {item.icon}
                  <span>{item.title}</span>
                </button>
              ))}
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </nav>
        </aside>

        <main className="flex-1 overflow-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

// Modified AgentDashboard with proper error handling
const AgentDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [stats, setStats] = useState([
    { title: "Total Requests", value: "0", trend: 0 },
    { title: "Active Requests", value: "0", trend: 0 },
    { title: "Service Categories", value: "0", trend: 0 },
    { title: "Avg Response Time", value: "0m", trend: 0 }
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Get requests data
        const requestsData = await apiService.getRequests();
        const requests = Array.isArray(requestsData) ? requestsData : [];
        setRequests(requests);

        // Get categories data
        const categoriesData = await apiService.getServiceCategories();
        const categories = Array.isArray(categoriesData) ? categoriesData : [];

        // Calculate stats
        const activeRequests = requests.filter(r => r.status === 'active').length;
        
        setStats([
          { title: "Total Requests", value: requests.length.toString(), trend: 12 },
          { title: "Active Requests", value: activeRequests.toString(), trend: -5 },
          { title: "Service Categories", value: categories.length.toString(), trend: 8 },
          { title: "Avg Response Time", value: "24m", trend: -15 }
        ]);

      } catch (err) {
        console.error('Dashboard data fetch error:', err);
        setError(err.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <AgentLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-500">Loading dashboard data...</p>
          </div>
        </div>
      </AgentLayout>
    );
  }

  if (error) {
    return (
      <AgentLayout>
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </AgentLayout>
    );
  }

  return (
    <AgentLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Welcome back! Here's what's happening today.</p>
        </div>
        
        <Stats stats={stats} />
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Recent Requests</h2>
          <RequestList requests={requests.slice(0, 6)} />
        </div>
      </div>
    </AgentLayout>
  );
};


const RequestsPage = () => {
  const [requests, setRequests] = useState(dummyRequests);

  return (
    <AgentLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">All Requests</h1>
            <p className="text-gray-500">Manage and track all support requests</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            New Request
          </button>
        </div>
        <RequestList requests={requests} />
      </div>
    </AgentLayout>
  );
};

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  return (
    <AgentLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Users</h1>
            <p className="text-gray-500">Manage user accounts and permissions</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Add User
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Requests</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Join Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.requests}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.joinDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AgentLayout>
  );
};

export default AgentDashboard;
export { RequestsPage, UsersPage };