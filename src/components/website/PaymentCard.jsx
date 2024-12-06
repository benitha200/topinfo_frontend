import React from 'react';

const PaymentCard = ({ payment }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-medium mb-2">{payment.service.title}</h3>
      <p className="text-gray-600 mb-2">Amount: ${payment.amount}</p>
      <p className="font-bold text-green-500">Status: {payment.status}</p>
      <div className="flex justify-between mt-4">
        <span className="text-gray-500">Paid on: {payment.createdAt}</span>
        <button className="bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 px-4 rounded-lg">
          View Receipt
        </button>
      </div>
    </div>
  );
};

export default PaymentCard;