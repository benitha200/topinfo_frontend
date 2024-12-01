import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import { useParams, useNavigate } from 'react-router-dom';
import API_URL from '../../constants/Constants';
import AgentLayout from './AgentLayout';

const RequestDetailPage = () => {
  const [request, setRequest] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // Status badge colors
  const getStatusBadgeColor = (status) => {
    const statusColors = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      ACCEPTED: 'bg-green-100 text-green-800',
      COMPLETED: 'bg-blue-100 text-blue-800',
      CANCELLED: 'bg-red-100 text-red-800'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  // Fetch request details
  useEffect(() => {
    const fetchRequestDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/requests/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        
        setRequest(response.data);
        setIsLoading(false);
      } catch (error) {
        toast.error('Failed to load request details');
        setIsLoading(false);
        navigate('/agent-dashboard/requests-agent');
      }
    };

    if (token) {
      fetchRequestDetails();
    } else {
      toast.error('No authentication token found');
      navigate('/login');
    }
  }, [id, token, navigate]);

  // Back to list handler
  const handleBackToList = () => {
    navigate('/agent-dashboard/requests-agent');
  };

  if (isLoading) {
    return (
      <AgentLayout>
        <div className="flex justify-center items-center h-full">
          <p>Loading request details...</p>
        </div>
      </AgentLayout>
    );
  }

  if (!request) {
    return null;
  }

  return (
    <AgentLayout>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Button 
                variant="outline" 
                onClick={handleBackToList} 
                className="mb-4"
              >
                <ArrowLeft className="mr-2" size={20} /> Back to Requests
              </Button>
              <CardTitle>Request Details</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Client Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Client Information</h3>
                <div className="space-y-2 bg-gray-50 p-4 rounded-md">
                  <p><strong>Name:</strong> {request.client.firstname} {request.client.lastname}</p>
                  <p><strong>Email:</strong> {request.client.email}</p>
                  <p><strong>Phone:</strong> {request.client.phone}</p>
                  <p><strong>Location:</strong> {request.client.location_sector}</p>
                </div>
              </div>

              {/* Request Details */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Request Information</h3>
                <div className="space-y-2 bg-gray-50 p-4 rounded-md">
                  <p><strong>Description:</strong> {request.description}</p>
                  <p><strong>Service Category:</strong> {request.service_category.name}</p>
                  <p>
                    <strong>Status:</strong> 
                    <span className={`ml-2 px-2 py-1 rounded text-xs ${getStatusBadgeColor(request.status)}`}>
                      {request.status}
                    </span>
                  </p>
                  <p><strong>Created At:</strong> {new Date(request.createdAt).toLocaleString()}</p>
                  <p><strong>Service Location:</strong> {request.service_location}</p>
                </div>
              </div>

              {/* Payment Information */}
              {request.payments && request.payments.length > 0 && (
                <div className="md:col-span-2">
                  <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p><strong>Amount:</strong> {request.payments[0].amount}</p>
                    <p><strong>Phone Number:</strong> {request.payments[0].phone_number}</p>
                    <p>
                      <strong>Status:</strong> 
                      <span className={`ml-2 px-2 py-1 rounded text-xs ${
                        request.payments[0].status === 'SUCCESSFULL' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {request.payments[0].status}
                      </span>
                    </p>
                    <p><strong>Transaction ID:</strong> {request.payments[0].request_transaction_id || 'N/A'}</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AgentLayout>
  );
};

export default RequestDetailPage;