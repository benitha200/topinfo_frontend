// import React, { useState, useEffect, useMemo } from 'react';
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
//   CardDescription
// } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import {
//   Table,
//   TableHeader,
//   TableRow,
//   TableHead,
//   TableBody,
//   TableCell
// } from '@/components/ui/table';
// import { Input } from '@/components/ui/input';
// import {
//   ChevronLeft,
//   ChevronRight,
//   Search,
//   Filter,
//   Eye,
//   FileText,
//   Clock,
//   CheckCircle,
//   Edit2
// } from 'lucide-react';
// import AgentLayout from './AgentLayout';
// import axios from 'axios';
// import { toast } from 'sonner';
// import API_URL from '../../constants/Constants';
// import { useLocation, useNavigate } from 'react-router-dom';
// import EditRequestForm from './EditRequestForm';


import React, { useState, useEffect, useMemo } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  Eye,
  FileText,
  Clock,
  CheckCircle,
  Edit2
} from 'lucide-react';
import AgentLayout from './AgentLayout';
import axios from 'axios';
import { toast } from 'sonner';
import API_URL from '../../constants/Constants';
import { useLocation, useNavigate } from 'react-router-dom';
import EditRequestForm from './EditRequestForm';

const RequestListSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    {/* Insight Cards Skeleton */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <Card key={i}>
          <CardContent className="pt-6 flex items-center">
            <div className="mr-4 bg-gray-200 p-3 rounded-full w-12 h-12" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-24" />
              <div className="h-6 bg-gray-200 rounded w-12" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>

    {/* Main Content Skeleton */}
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="h-8 bg-gray-200 rounded w-32" />
          <div className="h-10 bg-gray-200 rounded w-40" />
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-4">
          <div className="flex-grow h-10 bg-gray-200 rounded" />
          <div className="w-full sm:w-48 h-10 bg-gray-200 rounded" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead><div className="h-4 bg-gray-200 rounded w-20" /></TableHead>
                <TableHead><div className="h-4 bg-gray-200 rounded w-32" /></TableHead>
                <TableHead><div className="h-4 bg-gray-200 rounded w-24" /></TableHead>
                <TableHead><div className="h-4 bg-gray-200 rounded w-20" /></TableHead>
                <TableHead><div className="h-4 bg-gray-200 rounded w-24" /></TableHead>
                <TableHead><div className="h-4 bg-gray-200 rounded w-20" /></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell><div className="h-4 bg-gray-200 rounded w-24" /></TableCell>
                  <TableCell><div className="h-4 bg-gray-200 rounded w-40" /></TableCell>
                  <TableCell><div className="h-4 bg-gray-200 rounded w-28" /></TableCell>
                  <TableCell><div className="h-4 bg-gray-200 rounded w-20" /></TableCell>
                  <TableCell><div className="h-4 bg-gray-200 rounded w-24" /></TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <div className="h-8 bg-gray-200 rounded w-20" />
                      <div className="h-8 bg-gray-200 rounded w-20" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  </div>
);


const RequestListAgent = () => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [statusFilter, setStatusFilter] = useState('');
  const [editingRequest, setEditingRequest] = useState(null);
  const navigate = useNavigate();

  // Fetch the token
  const token = localStorage.getItem('token');

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const resp = queryParams.get("resp");
  if (resp) {
    const response = JSON.parse(resp);

    if (response.status === "success") {
      const tx_ref = response.data.txRef;
      fetch(`${API_URL}/payments/callback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ tx_ref }),
      });
    }
  }

  const showSuccessToast = (message) => {
    toast(message, {
      duration: 4000,
      className: "bg-green-50",
      style: {
        padding: "16px",
        borderRadius: "8px",
        border: "1px solid rgb(34, 197, 94)",
      },
      description: new Date().toLocaleTimeString(),
      icon: <CheckCircle className="text-green-500 w-5 h-5" />,
    });
  };

  const showErrorToast = (message) => {
    toast.error(message, {
      duration: 5000,
      className: "bg-red-50",
      style: {
        padding: "16px",
        borderRadius: "8px",
        border: "1px solid rgb(239, 68, 68)",
      },
      description: new Date().toLocaleTimeString(),
    });
  };

  // Fetch requests on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestsResponse = await axios.get(`${API_URL}/requests`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });

        setRequests(requestsResponse.data);
        setIsLoading(false);
        showSuccessToast('Requests loaded successfully');
      } catch (error) {
        showErrorToast('Failed to load requests');
        setIsLoading(false);
      }
    };

    if (token) {
      fetchData();
    } else {
      showErrorToast('No authentication token found');
      setIsLoading(false);
    }
  }, [token]);

  // Calculate request insights
  const requestInsights = useMemo(() => {
    const totalRequests = requests.length;
    const pendingRequests = requests.filter(req => req.status === 'PENDING').length;
    const completedRequests = requests.filter(req => req.status === 'COMPLETED').length;
    const inProgressRequests = requests.filter(req => req.status === 'IN_PROGRESS').length;

    return {
      totalRequests,
      pendingRequests,
      completedRequests,
      inProgressRequests
    };
  }, [requests]);

  // Render request status badge
  const renderStatusBadge = (status) => {
    const statusColors = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      ACCEPTED: 'bg-green-100 text-green-800',
      COMPLETED: 'bg-sky-100 text-sky-800',
      CANCELLED: 'bg-red-100 text-red-800'
    };

    return (
      <span className={`px-2 py-1 rounded text-xs ${statusColors[status] || 'bg-gray-100'}`}>
        {status}
      </span>
    );
  };


  // Filtered and Paginated Requests
  const filteredRequests = useMemo(() => {
    return requests.filter(request =>
      (searchTerm === '' ||
        request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.service_category?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.client?.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.client?.lastname.toLowerCase().includes(searchTerm.toLowerCase())
      ) &&
      (statusFilter === '' || request.status === statusFilter)
    );
  }, [requests, searchTerm, statusFilter]);

  // Paginated Requests
  const paginatedRequests = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredRequests.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredRequests, currentPage, itemsPerPage]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

  // Handle Page Change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleUpdateRequest = async (updatedRequest) => {
    const updatedRequests = requests.map(req =>
      req.id === updatedRequest.id ? updatedRequest : req
    );
    setRequests(updatedRequests);
    showSuccessToast('Request updated successfully');
  };

  const handleRetryPayment = async (request) => {
    try {
      const paymentResponse = await fetch(`${API_URL}/payments/initiate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          service_location: request.service_location,
          paymentNumber: request.client.phone,
          request_id: request.id,
          client_id: request.client_id,
          type: "client",
        }),
      });

      if (!paymentResponse.ok) {
        throw new Error("Failed to initiate payment");
      }

      const result = await paymentResponse.json();
      if (!result.success) {
        showErrorToast(result.message || 'Payment initiation failed');
      } else {
        showSuccessToast('Payment request sent. Please check your phone.');
      }

    } catch (error) {
      showErrorToast('Failed to initiate payment');
      console.error('Payment retry error:', error);
    }
  };


  // Navigate to create request page
  const handleAddRequest = () => {
    navigate('/agent-dashboard/requests-agent/select-services');
  };

  // Navigate to request detail page
  const handleViewRequest = (requestId) => {
    navigate(`/agent-dashboard/requests-agent/view/${requestId}`);
  };

  // Status Filter Options
  const statusOptions = ['PENDING', 'COMPLETED', 'IN_PROGRESS'];

  // Generate page numbers
  const generatePageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <AgentLayout>
      <div className="space-y-6">
        {editingRequest && (
          <EditRequestForm
            request={editingRequest}
            onClose={() => setEditingRequest(null)}
            onUpdate={handleUpdateRequest}
          />
        )}
        {/* Insight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6 flex items-center">
              <div className="mr-4 bg-sky-100 p-3 rounded-full">
                <FileText className="text-sky-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Requests</p>
                <p className="text-2xl font-bold">{requestInsights.totalRequests}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 flex items-center">
              <div className="mr-4 bg-yellow-100 p-3 rounded-full">
                <Clock className="text-yellow-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Pending Requests</p>
                <p className="text-2xl font-bold">{requestInsights.pendingRequests}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 flex items-center">
              <div className="mr-4 bg-green-100 p-3 rounded-full">
                <CheckCircle className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Completed Requests</p>
                <p className="text-2xl font-bold">{requestInsights.completedRequests}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 flex items-center">
              <div className="mr-4 bg-purple-100 p-3 rounded-full">
                <Eye className="text-purple-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">In Progress</p>
                <p className="text-2xl font-bold">{requestInsights.inProgressRequests}</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <span>My Requests</span>
              <Button
                className="bg-emerald-500 w-full sm:w-auto rounded text-white hover:bg-emerald-600"
                onClick={handleAddRequest}
              >
                Add New Request
              </Button>
            </CardTitle>
            <CardDescription>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-4">
                {/* Search Input */}
                <div className="relative flex-grow">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <Input
                    placeholder="Search requests..."
                    className="pl-10 w-full"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>

                {/* Status Filter */}
                <div className="relative w-full sm:w-48">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <select
                    className="pl-10 pr-4 py-2 border rounded w-full"
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    <option value="">All Statuses</option>
                    {statusOptions.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p>Loading requests...</p>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created At</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedRequests.map(request => (
                      <TableRow key={request.id}>
                        <TableCell>{request.client?.firstname} {request.client?.lastname} </TableCell>
                        <TableCell>{request.description}</TableCell>
                        <TableCell>{request.service_category?.name || 'N/A'}</TableCell>
                        <TableCell>
                          {renderStatusBadge(request.status)}
                        </TableCell>
                        <TableCell>
                          {new Date(request.createdAt).toLocaleDateString()}
                        </TableCell>
                        {/* <TableCell>
                          <Button
                            // variant="outline" 
                            size="sm"
                            onClick={() => handleViewRequest(request.id)}
                            className="hover:bg-sky-200 bg-sky-100 rounded text-sky-700"
                          >
                            <Eye className="mr-2" size={16} /> View
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => setEditingRequest(request)}
                            className="hover:bg-yellow-200 bg-yellow-100 rounded text-yellow-700 ml-2"
                          >
                            <Edit2 className="mr-2" size={16} /> Edit
                          </Button>


                        </TableCell> */}
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleViewRequest(request.id)}
                              className="hover:bg-sky-200 bg-sky-100 rounded text-sky-700"
                            >
                              <Eye className="mr-2" size={16} /> View
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => setEditingRequest(request)}
                              className="hover:bg-yellow-200 bg-yellow-100 rounded text-yellow-700"
                            >
                              <Edit2 className="mr-2" size={16} /> Edit
                            </Button>
                            {request.status === 'PENDING' && (
                              <Button
                                size="sm"
                                onClick={() => handleRetryPayment(request)}
                                className="hover:bg-purple-200 bg-purple-100 rounded text-purple-700"
                              >
                                <Clock className="mr-2" size={16} /> Retry Payment
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* Custom Pagination */}
                {filteredRequests.length > 0 && (
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-sm text-gray-500">
                      Showing {paginatedRequests.length} of {filteredRequests.length} requests
                    </p>
                    <div className="flex items-center space-x-2">
                      {/* Previous Button */}
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft size={20} />
                      </button>

                      {/* Page Numbers */}
                      {generatePageNumbers().map(pageNumber => (
                        <button
                          key={pageNumber}
                          onClick={() => handlePageChange(pageNumber)}
                          className={`px-3 py-1 border rounded ${currentPage === pageNumber
                            ? 'bg-emerald-500 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                          {pageNumber}
                        </button>
                      ))}

                      {/* Next Button */}
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>
                )}

                {/* No Results Message */}
                {filteredRequests.length === 0 && (
                  <p className="text-center text-gray-500 mt-4">
                    No requests found
                  </p>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </AgentLayout>
  );

};

export default RequestListAgent;