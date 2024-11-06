import React, { useState, useEffect } from 'react';
import PaymentCard from '../components/PaymentCard';

const MyPayments = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    // Fetch user's payments from the backend
    const fetchUserPayments = async () => {
      const response = await fetch('/api/payments');
      const data = await response.json();
      setPayments(data);
    };
    fetchUserPayments();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">My Payments</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {payments.map((payment) => (
          <PaymentCard key={payment.id} payment={payment} />
        ))}
      </div>
    </div>
  );
};

export default MyPayments;