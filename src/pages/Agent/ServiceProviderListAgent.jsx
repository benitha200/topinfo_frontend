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
  CheckCircle
} from 'lucide-react';
import AgentLayout from './AgentLayout';
import axios from 'axios';
import { toast } from 'sonner';
import API_URL from '../../constants/Constants';
import { useNavigate } from 'react-router-dom';

const ServiceProviderListAgent = () => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [statusFilter, setStatusFilter] = useState('');
  const navigate = useNavigate();

  // Fetch the token
  const token = localStorage.getItem('token');

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
      } catch (error) {
        toast.error('Failed to load requests');
        setIsLoading(false);
      }
    };

    if (token) {
      fetchData();
    } else {
      toast.error('No authentication token found');
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
      COMPLETED: 'bg-blue-100 text-blue-800',
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

  // Navigate to create request page
  const handleAddRequest = () => {
    navigate('/agent-dashboard/requests-agent/create');
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
        {/* Insight Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6 flex items-center">
              <div className="mr-4 bg-blue-100 p-3 rounded-full">
                <FileText className="text-blue-600" size={24} />
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
            <CardTitle className="flex justify-between items-center">
              Service Providers registered
              <Button
                className="bg-emerald-500 rounded text-white hover:bg-emerald-600"
                onClick={handleAddRequest}
              >
                Register Service Provider
              </Button>
            </CardTitle>
            <CardDescription>
              <div className="flex items-center space-x-4 mt-4">
                {/* Search Input */}
                <div className="relative flex-grow">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <Input
                    placeholder="Search requests..."
                    className="pl-10 w-full border border-slate-200 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>


                {/* Status Filter */}
                <div className="relative">
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
              <p>Loading service providers...</p>
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
                        <TableCell>
                          <Button
                            // variant="outline" 
                            size="sm"
                            onClick={() => handleViewRequest(request.id)}
                            className="hover:bg-blue-200 bg-blue-100 rounded text-blue-700"
                          >
                            <Eye className="mr-2" size={16} /> View
                          </Button>
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

export default ServiceProviderListAgent;