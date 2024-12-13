import React, { useState, useEffect, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  DollarSign,
  CreditCard,
  Users,
  Search,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import AgentLayout from './AgentLayout';
import API_URL from '../../constants/Constants';

const SuperAgentPaymentsPage = () => {
  const [paymentsData, setPaymentsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [summaryStats, setSummaryStats] = useState({
    totalPayments: 0,
    totalCommission: 0,
    completedPayments: 0
  });

  // Pagination and Search States
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/requests`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch payments');
        }
  
        const data = await response.json();
        
        // Log the raw data for debugging
        console.log('Raw data:', data);
  
        // Add robust error checking for data type and structure
        const completedPayments = Array.isArray(data) 
          ? data.filter(request => 
              request && 
              request.payments && 
              Array.isArray(request.payments) &&
              request.payments.some(payment => payment && payment.status === 'COMPLETED')
            )
          : [];
  
        // Log completed payments for debugging
        console.log('Completed payments:', completedPayments);
  
        setPaymentsData(completedPayments);
  
        // Calculate summary statistics with additional checks
        const totalPayments = completedPayments.reduce((sum, request) => {
          const payment = request.payments.find(p => p.status === 'COMPLETED');
          return sum + (payment && !isNaN(parseFloat(payment.amount)) ? parseFloat(payment.amount) : 0);
        }, 0);
  
        const totalCommission = totalPayments * 0.05;
  
        setSummaryStats({
          totalPayments,
          totalCommission,
          completedPayments: completedPayments.length
        });
  
        setLoading(false);
      } catch (err) {
        console.error('Error fetching payments:', err);
        setError(err.message);
        setLoading(false);
      }
    };
  
    fetchPayments();
  }, []);

  const filteredData = useMemo(() => {
    return Array.isArray(paymentsData) 
      ? paymentsData.filter(request => {
          const searchString = searchTerm.toLowerCase();
          return (
            request.client && 
            `${request.client.firstname} ${request.client.lastname}`.toLowerCase().includes(searchString) ||
            (request.service_category && request.service_category.name.toLowerCase().includes(searchString)) ||
            (request.client.email && request.client.email.toLowerCase().includes(searchString)) ||
            (request.client.phone && request.client.phone.toLowerCase().includes(searchString))
          );
        })
      : [];
  }, [paymentsData, searchTerm]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <AgentLayout>
      <div className="p-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-emerald-50 hover:bg-emerald-100 transition-colors rounded border-emerald-200 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-emerald-900">Total Payments</CardTitle>
              <DollarSign className="h-5 w-5 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-800">
                {summaryStats.totalPayments.toLocaleString()} RWF
              </div>
            </CardContent>
          </Card>

          <Card className="bg-sky-50  hover:bg-sky-100 transition-colors rounded border-sky-200 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-sky-900">Total Commission</CardTitle>
              <CreditCard className="h-5 w-5 text-sky-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-sky-800">
                {summaryStats.totalCommission.toLocaleString()} RWF
              </div>
            </CardContent>
          </Card>

          <Card className="bg-yellow-50 hover:bg-yellow-100 rounded transition-colors rounded border-yellow-200 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-yellow-900">Completed Payments</CardTitle>
              <Users className="h-5 w-5 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-800">
                {summaryStats.completedPayments}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payments Table */}
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Payment Details</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search clients, services..."
                  className="pl-8 w-64  border border-slate-200 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // Reset to first page on search
                  }}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Agent</TableHead>
                  <TableHead>Client Name</TableHead>
                  <TableHead>Service Category</TableHead>
                  <TableHead>Phone Number</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Transaction ID</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((request) => {
                  const successfulPayment = request.payments.find(p => p.status === 'COMPLETED');
                  return successfulPayment ? (
                    <TableRow key={request.id} className="hover:bg-gray-50 transition-colors">
                      <TableCell>{new Date(request.service_date).toLocaleDateString()}</TableCell>
                      <TableCell>{`${request.agent.firstname} ${request.agent.lastname}`}</TableCell>
                      <TableCell>{`${request.client.firstname} ${request.client.lastname}`}</TableCell>
                      <TableCell>{request.service_category.name}</TableCell>
                      {/* <TableCell>{request.client.phone}</TableCell>
                      <TableCell>{request.client.email}</TableCell> */}
                      <TableCell>{request.client.phone.substring(0, 3) + 'xxxxx' + request.client.phone.slice(-2)}</TableCell>
                      <TableCell>{request.client.email.split('@')[0].substring(0, 2) + 'xxxxxxxx' + request.client.email.split('@')[0].slice(-2) + '@' + request.client.email.split('@')[1]}</TableCell>
                      <TableCell>{successfulPayment.amount} RWF</TableCell>
                      <TableCell>{successfulPayment.request_transaction_id}</TableCell>
                    </TableRow>
                  ) : null;
                })}
              </TableBody>
            </Table>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-600">
                Showing {Math.min(1 + (currentPage - 1) * itemsPerPage, filteredData.length)}
                {' '} to {' '}
                {Math.min(currentPage * itemsPerPage, filteredData.length)}
                {' '} of {filteredData.length} entries
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AgentLayout>
  );
};

export default SuperAgentPaymentsPage;