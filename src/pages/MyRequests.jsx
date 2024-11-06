import React, { useState, useEffect } from 'react';
import RequestCard from '../components/RequestCard';

const MyRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Fetch user's requests from the backend
    const fetchUserRequests = async () => {
      const response = await fetch('/api/requests');
      const data = await response.json();
      setRequests(data);
    };
    fetchUserRequests();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">My Requests</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {requests.map((request) => (
          <RequestCard key={request.id} request={request} />
        ))}
      </div>
    </div>
  );
};

export default MyRequests;