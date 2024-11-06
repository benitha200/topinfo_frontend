import React, { useState, useEffect } from 'react';
import RequestList from '../components/RequestList';

const AgentDashboard = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Fetch all requests from the backend
    const fetchRequests = async () => {
      const response = await fetch('/api/requests');
      const data = await response.json();
      setRequests(data);
    };
    fetchRequests();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Agent Dashboard</h1>
      <RequestList requests={requests} />
    </div>
  );
};

export default AgentDashboard;