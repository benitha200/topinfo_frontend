import React from 'react';

const RequestCard = ({ request }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-medium mb-2">{request.service.title}</h3>
      <p className="text-gray-600 mb-2">{request.description}</p>
      <p className="font-bold text-green-500">Status: {request.status}</p>
      <div className="flex justify-between mt-4">
        <span className="text-gray-500">Requested on: {request.createdAt}</span>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg">
          View Details
        </button>
      </div>
    </div>
  );
};

export default RequestCard;