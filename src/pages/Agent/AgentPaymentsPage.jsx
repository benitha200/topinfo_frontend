// import React, { useState, useEffect } from 'react';
// import { 
//   Card, 
//   CardContent, 
//   CardHeader, 
//   CardTitle 
// } from '@/components/ui/card';
// import { 
//   Table, 
//   TableBody, 
//   TableCell, 
//   TableHead, 
//   TableHeader, 
//   TableRow 
// } from '@/components/ui/table';
// import { 
//   DollarSign, 
//   CreditCard, 
//   Users 
// } from 'lucide-react';
// import AgentLayout from './AgentLayout';

// const AgentPaymentsPage = () => {
//   const [paymentsData, setPaymentsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [summaryStats, setSummaryStats] = useState({
//     totalPayments: 0,
//     totalCommission: 0,
//     completedPayments: 0
//   });

//   useEffect(() => {
//     const fetchPayments = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await fetch('http://localhost:3050/api/requests', {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch payments');
//         }

//         const data = await response.json();
        
//         // Filter only completed payments
//         const completedPayments = data.filter(request => 
//           request.payments.length > 0 && 
//           request.payments.some(payment => payment.status === 'SUCCESSFULL')
//         );

//         setPaymentsData(completedPayments);

//         // Calculate summary statistics
//         const totalPayments = completedPayments.reduce((sum, request) => {
//           const payment = request.payments.find(p => p.status === 'SUCCESSFULL');
//           return sum + (payment ? parseFloat(payment.amount) : 0);
//         }, 0);

//         const totalCommission = totalPayments * 0.15;

//         setSummaryStats({
//           totalPayments,
//           totalCommission,
//           completedPayments: completedPayments.length
//         });

//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchPayments();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <AgentLayout>
//       <div className="p-6 space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <Card className="bg-emerald-50 rounded border-0">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Total Payments</CardTitle>
//               <DollarSign className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">
//                 {summaryStats.totalPayments.toLocaleString()} RWF
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="bg-blue-50 rounded border-0">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Total Commission</CardTitle>
//               <CreditCard className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">
//                 {summaryStats.totalCommission.toLocaleString()} RWF
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="bg-yellow-50 rounded border-0">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Completed Payments</CardTitle>
//               <Users className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">
//                 {summaryStats.completedPayments}
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         <Card>
//           <CardHeader>
//             <CardTitle>Payment Details</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Date</TableHead>
//                   <TableHead>Client Name</TableHead>
//                   <TableHead>Service Category</TableHead>
//                   <TableHead>Phone Number</TableHead>
//                   <TableHead>Email</TableHead>
//                   <TableHead>Amount</TableHead>
//                   <TableHead>Transaction ID</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {paymentsData.map((request) => {
//                   const successfulPayment = request.payments.find(p => p.status === 'SUCCESSFULL');
//                   return successfulPayment ? (
//                     <TableRow key={request.id}>
//                       <TableCell>{new Date(request.service_date).toLocaleDateString()}</TableCell>
//                       <TableCell>{`${request.client.firstname} ${request.client.lastname}`}</TableCell>
//                       <TableCell>{request.service_category.name}</TableCell>
//                       <TableCell>{request.client.phone}</TableCell>
//                       <TableCell>{request.client.email}</TableCell>
//                       <TableCell>{successfulPayment.amount} RWF</TableCell>
//                       <TableCell>{successfulPayment.request_transaction_id}</TableCell>
//                     </TableRow>
//                   ) : null;
//                 })}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>
//       </div>
//     </AgentLayout>
//   );
// };

// export default AgentPaymentsPage;

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

const AgentPaymentsPage = () => {
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
        const response = await fetch('http://localhost:3050/api/requests', {
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
        
        // Filter only completed payments
        const completedPayments = data.filter(request => 
          request.payments.length > 0 && 
          request.payments.some(payment => payment.status === 'SUCCESSFULL')
        );

        setPaymentsData(completedPayments);

        // Calculate summary statistics
        const totalPayments = completedPayments.reduce((sum, request) => {
          const payment = request.payments.find(p => p.status === 'SUCCESSFULL');
          return sum + (payment ? parseFloat(payment.amount) : 0);
        }, 0);

        const totalCommission = totalPayments * 0.15;

        setSummaryStats({
          totalPayments,
          totalCommission,
          completedPayments: completedPayments.length
        });

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  // Filtered and Paginated Data
  const filteredData = useMemo(() => {
    return paymentsData.filter(request => {
      const searchString = searchTerm.toLowerCase();
      return (
        `${request.client.firstname} ${request.client.lastname}`.toLowerCase().includes(searchString) ||
        request.service_category.name.toLowerCase().includes(searchString) ||
        request.client.email.toLowerCase().includes(searchString) ||
        request.client.phone.toLowerCase().includes(searchString)
      );
    });
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
          <Card className="bg-emerald-50 rounded hover:bg-emerald-100 transition-colors rounded-lg border-emerald-200 shadow-md">
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

          <Card className="bg-blue-50 rounded hover:bg-blue-100 transition-colors rounded-lg border-blue-200 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-900">Total Commission</CardTitle>
              <CreditCard className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-800">
                {summaryStats.totalCommission.toLocaleString()} RWF
              </div>
            </CardContent>
          </Card>

          <Card className="bg-yellow-50 hover:bg-yellow-100 rounded transition-colors rounded-lg border-yellow-200 shadow-md">
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
                  const successfulPayment = request.payments.find(p => p.status === 'SUCCESSFULL');
                  return successfulPayment ? (
                    <TableRow key={request.id} className="hover:bg-gray-50 transition-colors">
                      <TableCell>{new Date(request.service_date).toLocaleDateString()}</TableCell>
                      <TableCell>{`${request.client.firstname} ${request.client.lastname}`}</TableCell>
                      <TableCell>{request.service_category.name}</TableCell>
                      <TableCell>{request.client.phone}</TableCell>
                      <TableCell>{request.client.email}</TableCell>
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

export default AgentPaymentsPage;