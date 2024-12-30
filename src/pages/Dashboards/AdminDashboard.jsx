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
import axios from 'axios';
import AdminLayout from '../Admin/AdminLayout';
import API_URL from '../../constants/Constants';
import DashboardSkeleton from '../Admin/DashboardSkeleton';

const AdminDashboard = () => {
  const [payments, setPayments] = useState([]);
  const [agents, setAgents] = useState({ users: [], total: 0 });
  const [superAgents, setSuperAgents] = useState({ users: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  const token = localStorage.getItem('token');

  const axiosConfig = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [paymentsRes, agentsRes, superAgentsRes] = await Promise.all([
          axios.get(`${API_URL}/payments`, axiosConfig),
          axios.get(`${API_URL}/users/no-pagination?role=AGENT&isSuperAgent=no`, axiosConfig),
          axios.get(`${API_URL}/users/no-pagination?role=AGENT&isSuperAgent=yes`, axiosConfig)
        ]);
        
        setPayments(paymentsRes.data);
        setAgents({
          users: agentsRes.data.users,
          total: agentsRes.data.users.length
        });
        setSuperAgents({
          users: superAgentsRes.data.users,
          total: superAgentsRes.data.total || superAgentsRes.data.users.length
        });
      } catch (err) {
        setError('Error fetching dashboard data');
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const calculateTotalRevenue = () => {
    return payments
      .filter(payment => payment.status === 'COMPLETED')
      .reduce((sum, payment) => sum + Number(payment.amount), 0);
  };

  const calculateSuccessRate = () => {
    const completedPayments = payments.filter(payment => payment.status === 'COMPLETED').length;
    return payments.length ? ((completedPayments / payments.length) * 100).toFixed(1) : 0;
  };

  const processLocationData = () => {
    const distribution = agents.users.reduce((acc, agent) => {
      acc[agent.location_province] = (acc[agent.location_province] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(distribution).map(([name, value]) => ({
      name,
      value
    }));
  };

  const processRevenueByDate = () => {
    const revenueByDate = payments
      .filter(payment => payment.status === 'COMPLETED')
      .reduce((acc, payment) => {
        const date = new Date(payment.createdAt).toLocaleDateString();
        acc[date] = (acc[date] || 0) + Number(payment.amount);
        return acc;
      }, {});

    return Object.entries(revenueByDate)
      .map(([date, amount]) => ({
        date,
        amount
      }))
      .slice(-7);
  };

  // const processDistrictData = () => {
  //   const distribution = agents.users.reduce((acc, agent) => {
  //     acc[agent.location_district] = (acc[agent.location_district] || 0) + 1;
  //     return acc;
  //   }, {});

  //   return Object.entries(distribution).map(([district, count]) => ({
  //     district,
  //     count
  //   }));
  // };

  const processDistrictData = () => {
    // First, create a case-insensitive aggregation of districts
    const distribution = agents.users.reduce((acc, agent) => {
      // Normalize the district name to prevent duplicates with different cases
      const normalizedDistrict = agent.location_district?.trim().toLowerCase();
      
      if (normalizedDistrict) {
        // Use the original casing for display, but aggregate based on normalized name
        if (!acc[normalizedDistrict]) {
          acc[normalizedDistrict] = {
            count: 1,
            displayName: agent.location_district.trim() // Keep original casing for display
          };
        } else {
          acc[normalizedDistrict].count += 1;
        }
      }
      return acc;
    }, {});
  
    // Convert the aggregated data into the format expected by the chart
    return Object.values(distribution).map(({ displayName, count }) => ({
      district: displayName,
      count
    }));
  };

  if (loading) {
    return <DashboardSkeleton/>;
  }

  return (
    <AdminLayout>
      <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{agents.total}</div>
              <p className="text-xs text-gray-500">Active Agents</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Super Agents</CardTitle>
              <Users className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{superAgents.total}</div>
              <p className="text-xs text-gray-500">Regional supervisors</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">RWF {calculateTotalRevenue().toLocaleString()}</div>
              <p className="text-xs text-gray-500">From completed transactions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <BarChart2 className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{calculateSuccessRate()}%</div>
              <p className="text-xs text-gray-500">Transaction completion rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend (Last 7 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={processRevenueByDate()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="amount"
                      name="Revenue (RWF)"
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
                      data={processLocationData()}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label
                    >
                      {processLocationData().map((entry, index) => (
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

          {/* District Distribution Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Agent Distribution by District</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={processDistrictData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="district" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" name="Number of Agents" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;