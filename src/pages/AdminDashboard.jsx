import React, { useState, useEffect } from 'react';
import UserList from '../components/UserList';
import RequestList from '../components/RequestList';
import PaymentList from '../components/PaymentList';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    // Fetch users, requests, and payments from the backend
    const fetchData = async () => {
      const userResponse = await fetch('/api/users');
      const userData = await userResponse.json();
      setUsers(userData);

      const requestResponse = await fetch('/api/requests');
      const requestData = await requestResponse.json();
      setRequests(requestData);

      const paymentResponse = await fetch('/api/payments');
      const paymentData = await paymentResponse.json();
      setPayments(paymentData);
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <h2 className="text-xl font-bold mb-4">Users</h2>
          <UserList users={users} />
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Requests</h2>
          <RequestList requests={requests} />
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Payments</h2>
          <PaymentList payments={payments} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;