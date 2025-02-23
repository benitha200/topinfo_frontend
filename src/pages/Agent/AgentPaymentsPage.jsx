// import React, { useState, useEffect, useMemo } from 'react';
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
//   Users,
//   Search,
//   ChevronLeft,
//   ChevronRight,
//   Clock,
//   HandCoins
// } from 'lucide-react';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import AgentLayout from './AgentLayout';
// import API_URL from '../../constants/Constants';

// const AgentPaymentsPage = () => {
//   const [paymentsData, setPaymentsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [summaryStats, setSummaryStats] = useState({
//     totalPayments: 0,
//     totalCommission: 0,
//     completedPayments: 0
//   });

//   // Pagination and Search States
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState('');
//   const itemsPerPage = 10;


//   useEffect(() => {
//     const fetchPayments = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await fetch(`${API_URL}/requests`, {
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
        
//         // Log the raw data for debugging
//         console.log('Raw data:', data);
  
//         // Modify the filtering logic
//         const completedPayments = data.filter(request => 
//           request.payments && 
//           request.payments.some(payment => payment.status === 'COMPLETED')
//         );
  
//         // Log completed payments for debugging
//         console.log('Completed payments:', completedPayments);
  
//         setPaymentsData(completedPayments);
  
//         // Calculate summary statistics
//         const totalPayments = completedPayments.reduce((sum, request) => {
//           const payment = request.payments.find(p => p.status === 'COMPLETED');
//           return sum + (payment ? parseFloat(payment.amount) : 0);
//         }, 0);
  
//         const transactionFee= totalPayments *0.03;
//         const totalCommission = (totalPayments-transactionFee) * 0.15;
  
//         setSummaryStats({
//           totalPayments,
//           totalCommission,
//           completedPayments: completedPayments.length
//         });
  
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching payments:', err);
//         setError(err.message);
//         setLoading(false);
//       }
//     };
  
//     fetchPayments();
//   }, []);

//   const filteredData = useMemo(() => {
//     return paymentsData?.filter(request => {
//       const searchString = searchTerm.toLowerCase();
//       return (
//         `${request.client.firstname} ${request.client.lastname}`.toLowerCase().includes(searchString) ||
//         request.service_category.name.toLowerCase().includes(searchString) ||
//         request.client.email.toLowerCase().includes(searchString) ||
//         request.client.phone.toLowerCase().includes(searchString)
//       );
//     });
//   }, [paymentsData, searchTerm]);

//   const paginatedData = useMemo(() => {
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     return filteredData.slice(startIndex, startIndex + itemsPerPage);
//   }, [filteredData, currentPage]);

//   const totalPages = Math.ceil(filteredData.length / itemsPerPage);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <AgentLayout>
//       <div className="p-6 space-y-6">
//         {/* Summary Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <Card className="bg-emerald-50 hover:bg-emerald-100 transition-colors rounded border-emerald-200 shadow-md">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium text-emerald-900">Total Payments</CardTitle>
//               <HandCoins className="h-5 w-5 text-emerald-600" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-emerald-800">
//                 {summaryStats.totalPayments.toLocaleString()} RWF
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="bg-sky-50  hover:bg-sky-100 transition-colors rounded border-sky-200 shadow-md">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium text-sky-900">Total Commission</CardTitle>
//               <CreditCard className="h-5 w-5 text-sky-600" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-sky-800">
//                 {summaryStats.totalCommission.toLocaleString()} RWF
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="bg-yellow-50 hover:bg-yellow-100 rounded transition-colors rounded border-yellow-200 shadow-md">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium text-yellow-900">Completed Payments</CardTitle>
//               <Users className="h-5 w-5 text-yellow-600" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-yellow-800">
//                 {summaryStats.completedPayments}
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         <div>
//           <Card className="shadow-lg bg-sky-50">
//               <CardTitle className="p-4 text-bold text-sky-700">
//                 PAYMENT WITHDRAWAL
//               </CardTitle>
//               <CardContent>
//                 <div className='text-sky-900'>
//                   You will only see the payments in the current Month only, other payments will be distributed on your accounts between 1-5 of the new month
//                 </div>
//               </CardContent>
//           </Card>
//         </div>
//         <div>
//           <Button className="bg-sky-600 text-sky-50 rounded gap-2"><Clock size={15}/> Payment History</Button>
//         </div>

//         {/* Payments Table */}
//         <Card className="shadow-lg">
//           <CardHeader className="flex flex-row justify-between items-center">
//             <CardTitle>Payment Details</CardTitle>
//             <div className="flex items-center space-x-2">
//               <div className="relative">
//                 <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
//                 <Input
//                   placeholder="Search clients, services..."
//                   className="pl-8 w-64  border border-slate-200 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
//                   value={searchTerm}
//                   onChange={(e) => {
//                     setSearchTerm(e.target.value);
//                     setCurrentPage(1); // Reset to first page on search
//                   }}
//                 />
//               </div>
//             </div>
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
//                 {paginatedData.map((request) => {
//                   const successfulPayment = request.payments.find(p => p.status === 'COMPLETED');
//                   return successfulPayment ? (
//                     <TableRow key={request.id} className="hover:bg-gray-50 transition-colors">
//                       <TableCell>{new Date(request.service_date).toLocaleDateString()}</TableCell>
//                       <TableCell>{`${request.client.firstname} ${request.client.lastname}`}</TableCell>
//                       <TableCell>{request.service_category.name}</TableCell>
//                       {/* <TableCell>{request.client.phone}</TableCell>
//                       <TableCell>{request.client.email}</TableCell> */}
//                       <TableCell>{request.client.phone.substring(0, 3) + 'xxxxx' + request.client.phone.slice(-2)}</TableCell>
//                       <TableCell>{request.client.email.split('@')[0].substring(0, 2) + 'xxxxxxxx' + request.client.email.split('@')[0].slice(-2) + '@' + request.client.email.split('@')[1]}</TableCell>
//                       <TableCell>{successfulPayment.amount} RWF</TableCell>
//                       <TableCell>{successfulPayment.request_transaction_id}</TableCell>
//                     </TableRow>
//                   ) : null;
//                 })}
//               </TableBody>
//             </Table>

//             {/* Pagination Controls */}
//             <div className="flex justify-between items-center mt-4">
//               <div className="text-sm text-gray-600">
//                 Showing {Math.min(1 + (currentPage - 1) * itemsPerPage, filteredData.length)}
//                 {' '} to {' '}
//                 {Math.min(currentPage * itemsPerPage, filteredData.length)}
//                 {' '} of {filteredData.length} entries
//               </div>
//               <div className="flex space-x-2">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
//                   disabled={currentPage === 1}
//                 >
//                   <ChevronLeft className="h-4 w-4 mr-1" /> Previous
//                 </Button>
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
//                   disabled={currentPage === totalPages}
//                 >
//                   Next <ChevronRight className="h-4 w-4 ml-1" />
//                 </Button>
//               </div>
//             </div>
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
  ChevronRight,
  Clock,
  HandCoins,
  Calendar
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import AgentLayout from './AgentLayout';
import API_URL from '../../constants/Constants';
import PaymentsSkeletonLoader from './PaymentsSkeletonLoader';

const AgentPaymentsPage = () => {
  const [paymentsData, setPaymentsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [summaryStats, setSummaryStats] = useState({
    totalPayments: 0,
    totalCommission: 0,
    completedPayments: 0
  });

  // Pagination and Search States
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 10;

  const isCurrentMonth = (date) => {
    const paymentDate = new Date(date);
    const now = new Date();
    return paymentDate.getMonth() === now.getMonth() && 
           paymentDate.getFullYear() === now.getFullYear();
  };

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
        
        // Filter completed payments
        const completedPayments = data.filter(request => 
          request.payments && 
          request.payments.some(payment => payment.status === 'COMPLETED')
        );
        
        // Separate current month and historical payments
        const currentMonthPayments = completedPayments.filter(request => 
          isCurrentMonth(request.service_date)
        );
        
        // Calculate summary statistics based on view mode
        const paymentsToShow = showHistory ? completedPayments : currentMonthPayments;
        
        const totalPayments = paymentsToShow.reduce((sum, request) => {
          const payment = request.payments.find(p => p.status === 'COMPLETED');
          return sum + (payment ? parseFloat(payment.amount) : 0);
        }, 0);
  
        const transactionFee = totalPayments * 0.03;
        const totalCommission = (totalPayments - transactionFee) * 0.15;
  
        setSummaryStats({
          totalPayments,
          totalCommission,
          completedPayments: paymentsToShow.length
        });
  
        setPaymentsData(paymentsToShow);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching payments:', err);
        setError(err.message);
        setLoading(false);
      }
    };
  
    fetchPayments();
  }, [showHistory]);

  const filteredData = useMemo(() => {
    return paymentsData?.filter(request => {
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

  if (loading) return <PaymentsSkeletonLoader/>;
  if (error) return <div>Error: {error}</div>;

  return (
    <AgentLayout>
      <div className="p-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-emerald-50 hover:bg-emerald-100 transition-colors rounded border-emerald-200 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-emerald-900">
                {showHistory ? 'All-Time Payments' : 'Current Month Payments'}
              </CardTitle>
              <HandCoins className="h-5 w-5 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-800">
                {summaryStats.totalPayments.toLocaleString()} RWF
              </div>
            </CardContent>
          </Card>

          <Card className="bg-sky-50 hover:bg-sky-100 transition-colors rounded border-sky-200 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-sky-900">
                {showHistory ? 'All-Time Commission' : 'Current Month Commission'}
              </CardTitle>
              <CreditCard className="h-5 w-5 text-sky-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-sky-800">
                {summaryStats.totalCommission.toLocaleString()} RWF
              </div>
            </CardContent>
          </Card>

          <Card className="bg-yellow-50 hover:bg-yellow-100 rounded transition-colors border-yellow-200 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-yellow-900">
                {showHistory ? 'All-Time Completed' : 'Current Month Completed'}
              </CardTitle>
              <Users className="h-5 w-5 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-800">
                {summaryStats.completedPayments}
              </div>
            </CardContent>
          </Card>
        </div>

        {!showHistory && (
          <Card className="shadow-lg bg-sky-50">
            <CardTitle className="p-4 text-bold text-sky-700">
              PAYMENT WITHDRAWAL
            </CardTitle>
            <CardContent>
              <div className="text-sky-900">
                You will only see the payments in the current Month only, other payments will be distributed on your accounts between 1-5 day(s) of the new month
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex gap-2">
          <Button
            className={`gap-2 ${showHistory ? 'bg-sky-100 text-sky-900' : 'bg-sky-600 text-sky-50'}`}
            onClick={() => setShowHistory(false)}
          >
            <Calendar size={15}/> Current Month
          </Button>
          <Button
            className={`gap-2 ${!showHistory ? 'bg-sky-100 text-sky-900' : 'bg-sky-600 text-sky-50'}`}
            onClick={() => setShowHistory(true)}
          >
            <Clock size={15}/> Payment History
          </Button>
        </div>

        {/* Payments Table */}
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>
              {showHistory ? 'Payment History' : 'Current Month Payments'}
            </CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search clients, services..."
                  className="pl-8 w-64 border border-slate-200 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
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
                  const successfulPayment = request.payments.find(p => p.status === 'COMPLETED');
                  return successfulPayment ? (
                    <TableRow key={request.id} className="hover:bg-gray-50 transition-colors">
                      <TableCell>{new Date(request.service_date).toLocaleDateString()}</TableCell>
                      <TableCell>{`${request.client.firstname} ${request.client.lastname}`}</TableCell>
                      <TableCell>{request.service_category.name}</TableCell>
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

export default AgentPaymentsPage;