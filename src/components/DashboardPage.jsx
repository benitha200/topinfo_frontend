import React, { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';
import { Stats } from './Stats';
import { RequestList } from './RequestList';

const DashboardPage = () => {
  const [requests, setRequests] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [requestsData, categoriesData] = await Promise.all([
          apiService.getRequests(),
          apiService.getServiceCategories()
        ]);

        const activeRequests = requestsData.filter(r => r.status === 'active').length;
        
        setRequests(requestsData);
        setStats([
          { 
            title: "Total Requests", 
            value: requestsData.length.toString(), 
            trend: 12,
            icon: <ClipboardList className="h-4 w-4 text-blue-500" />
          },
          { 
            title: "Active Requests", 
            value: activeRequests.toString(), 
            trend: -5,
            icon: <Users className="h-4 w-4 text-green-500" />
          },
          { 
            title: "Service Categories", 
            value: categoriesData.length.toString(), 
            trend: 8,
            icon: <LayoutDashboard className="h-4 w-4 text-purple-500" />
          },
          { 
            title: "Avg Response Time", 
            value: "24m", 
            trend: -15,
            icon: <Bell className="h-4 w-4 text-orange-500" />
          }
        ]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div className="flex items-center justify-center h-full">
    <div className="text-lg text-gray-600">Loading dashboard data...</div>
  </div>;

  if (error) return <div className="flex items-center justify-center h-full">
    <div className="text-lg text-red-600">Error: {error}</div>
  </div>;

  return (
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
  );
};