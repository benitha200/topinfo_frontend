// import React, { useState, useEffect } from 'react';
// import { LayoutDashboard } from 'lucide-react';
// import axios from 'axios';
// import AgentLayout from '../Agent/AgentLayout';
// import API_URL from '../../constants/Constants';

// // Axios instance
// const api = axios.create({
//   baseURL: API_URL,
// });

// // Function to set Authorization token
// const setAuthToken = (token) => {
//   if (token) {
//     api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//   } else {
//     delete api.defaults.headers.common['Authorization'];
//   }
// };

// // Components

// const RequestCard = ({ request }) => {
//   const { id, service_location, service_date, description, status, client, service_category } = request;
//   return (
//     <div className="bg-white p-4 rounded shadow">
//       <div className="flex items-center justify-between mb-2">
//         <span className={`px-2 py-1 text-sm rounded-full ${
//           status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
//         }`}>
//           {status}
//         </span>
//         <span className="text-sm text-gray-500">
//           {service_date ? new Date(service_date).toLocaleDateString() : 'No date'}
//         </span>
//       </div>
//       <h3 className="font-medium mb-1">Service Request #{id}</h3>
//       <p className="text-sm text-gray-600 mb-2">{description}</p>
//       <p className="text-sm text-gray-600 mb-2">
//         Service: {service_category?.name} <br />
//         Location: {service_location}
//       </p>
//       <p className="text-sm text-gray-600">
//         Client: {client?.firstname} {client?.lastname} ({client?.phone})
//       </p>
//     </div>
//   );
// };

// const RequestList = ({ requests = [] }) => (
//   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//     {requests.length > 0 ? (
//       requests.map((request) => (
//         <RequestCard key={request.id} request={request} />
//       ))
//     ) : (
//       <div className="col-span-full text-center py-8 text-gray-500">
//         No requests found
//       </div>
//     )}
//   </div>
// );

// const Stats = ({ stats = [] }) => (
//   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//     {stats.map((stat, index) => (
//       <div key={index} className="bg-white p-4 rounded shadow">
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

// const AgentDashboard = () => {
//   const [requests, setRequests] = useState([]);
//   const [stats, setStats] = useState([
//     { title: "Total Requests", value: "0", trend: 0 },
//     { title: "Completed Requests", value: "0", trend: 0 },
//     { title: "Service Categories", value: "0", trend: 0 },
//     { title: "Avg Response Time", value: "0m", trend: 0 },
//   ]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Retrieve token from storage or context
//     const token = localStorage.getItem('token'); // Replace with your token retrieval method
//     setAuthToken(token);
  
//     const fetchDashboardData = async () => {
//       try {
//         setLoading(true);
//         const response = await api.get('/requests'); // Replace with the correct endpoint
  
//         // Assuming the response is an array of requests
//         const requests = response.data; // No need to destructure further
  
//         const completedRequests = requests.filter((req) => req.status === 'COMPLETED').length;
  
//         // Assuming you have predefined service categories for now
//         const uniqueCategories = Array.from(
//           new Set(requests.map((req) => req.service_category?.id))
//         );
  
//         setRequests(requests);
//         setStats([
//           { title: "Total Requests", value: requests.length.toString(), trend: 5 },
//           { title: "Completed Requests", value: completedRequests.toString(), trend: 3 },
//           { title: "Service Categories", value: uniqueCategories.length.toString(), trend: 2 },
//           { title: "Avg Response Time", value: "24m", trend: -1 },
//         ]);
//       } catch (err) {
//         setError('Failed to load dashboard data');
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchDashboardData();
//   }, []);
  

//   if (loading) {
//     return (
//       <AgentLayout>
//         <div className="flex items-center justify-center h-full">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto mb-4"></div>
//             <p className="text-gray-500">Loading dashboard data...</p>
//           </div>
//         </div>
//       </AgentLayout>
//     );
//   }

//   if (error) {
//     return (
//       <AgentLayout>
//         <div className="max-w-7xl mx-auto">
//           <div className="bg-red-50 border border-red-200 rounded p-4 mb-6">
//             <p className="text-red-600">{error}</p>
//           </div>
//         </div>
//       </AgentLayout>
//     );
//   }

//   return (
//     <AgentLayout>
//       <div className="max-w-7xl mx-auto">
//         <div className="mb-6">
//           <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
//           <p className="text-gray-500">Welcome back! Here's what's happening today.</p>
//         </div>
//         <Stats stats={stats} />
//         <div className="mb-6">
//           <h2 className="text-xl font-semibold mb-4">Recent Requests</h2>
//           <RequestList requests={requests.slice(0, 6)} />
//         </div>
//       </div>
//     </AgentLayout>
//   );
// };

// export default AgentDashboard;


import React, { useState, useEffect } from "react";
import { LayoutDashboard } from "lucide-react";
import axios from "axios";
import AgentLayout from "../Agent/AgentLayout";
import API_URL from "../../constants/Constants";

// Axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Function to set Authorization token
const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// Components
const RequestCard = ({ request }) => {
  const { id, service_location, service_date, description, status, client, service_category } = request;
  const statusColor = {
    COMPLETED: "bg-emerald-100 text-slate-800",
    PENDING: "bg-amber-100 text-slate-800",
    CANCELLED: "bg-red-100 text-slate-800",
  };

  return (
    <div className="bg-gradient-to-r from-white to-slate-50 p-4 rounded shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between mb-2">
        <span className={`px-2 py-1 text-sm tracking-wide rounded-full ${statusColor[status] || "bg-gray-300 text-gray-800"}`}>
          {status}
        </span>
        <span className="text-sm text-gray-500 tracking-wide">
          {service_date ? new Date(service_date).toLocaleDateString() : "No date"}
        </span>
      </div>
      <h3 className="font-semibold text-sky-700 mb-1">Service Request #{id}</h3>
      <p className="text-sm text-gray-700 mb-2 tracking-wide">{description}</p>
      <p className="text-sm text-gray-600 mb-2 tracking-wide">
        <strong>Service:</strong> {service_category?.name} <br />
        <strong>Location:</strong> {service_location}
      </p>
      <p className="text-sm text-gray-600">
        <strong>Client:</strong> {client?.firstname} {client?.lastname} ({client?.phone})
      </p>
    </div>
  );
};

const RequestList = ({ requests = [] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {requests.length > 0 ? (
      requests.map((request) => <RequestCard key={request.id} request={request} />)
    ) : (
      <div className="col-span-full text-center py-8 text-gray-500">
        No requests found
      </div>
    )}
  </div>
);

const Stats = ({ stats = [] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
    {stats.map((stat, index) => (
      <div key={index} className="bg-white rounded text-gray-700 p-6 rounded shadow-lg hover:shadow-xl transition-shadow duration-300">
        <p className="text-sm mb-1">{stat.title}</p>
        <p className="text-3xl font-bold">{stat.value}</p>
        <div className="flex items-center gap-1 text-sm mt-2">
          <span className={stat.trend > 0 ? "text-green-300" : "text-red-300"}>
            {stat.trend > 0 ? "▲" : "▼"} {Math.abs(stat.trend)}%
          </span>
          <span className="text-gray-800">vs last month</span>
        </div>
      </div>
    ))}
  </div>
);

const AgentDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [stats, setStats] = useState([
    { title: "Total Requests", value: "0", trend: 0 },
    { title: "Completed Requests", value: "0", trend: 0 },
    { title: "Service Categories", value: "0", trend: 0 },
    { title: "Avg Response Time", value: "0m", trend: 0 },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Replace with your token retrieval method
    setAuthToken(token);

    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await api.get("/requests"); // Replace with the correct endpoint
        const requests = response.data;

        const completedRequests = requests.filter((req) => req.status === "COMPLETED").length;

        const uniqueCategories = Array.from(new Set(requests.map((req) => req.service_category?.id)));

        setRequests(requests);
        setStats([
          { title: "Total Requests", value: requests.length.toString(), trend: 5 },
          { title: "Completed Requests", value: completedRequests.toString(), trend: 3 },
          { title: "Service Categories", value: uniqueCategories.length.toString(), trend: 2 },
          { title: "Avg Response Time", value: "24m", trend: -1 },
        ]);
      } catch (err) {
        setError("Failed to load dashboard data");
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
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto mb-4"></div>
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
          <div className="bg-red-100 border border-red-300 rounded p-4 mb-6">
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
          <h1 className="text-3xl font-bold text-slate-600">Dashboard</h1>
          <p className="text-gray-500">Welcome back! Here's what's happening today.</p>
        </div>
        <Stats stats={stats} />
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Recent Requests</h2>
          <RequestList requests={requests.slice(0, 6)} />
        </div>
      </div>
    </AgentLayout>
  );
};

export default AgentDashboard;
