import React from 'react';
import PaymentCard from './PaymentCard';

const PaymentList = ({ payments }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {payments.map((payment) => (
        <PaymentCard key={payment.id} payment={payment} />
      ))}
    </div>
  );
};

export default PaymentList;