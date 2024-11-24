import React from 'react';

const RequestCard = ({ request }) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <div className="flex items-center justify-between mb-2">
      <span className={`px-2 py-1 text-sm rounded-full ${
        request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
        request.status === 'active' ? 'bg-green-100 text-green-800' :
        'bg-gray-100 text-gray-800'
      }`}>
        {request.status || 'New'}
      </span>
      <span className="text-sm text-gray-500">
        {new Date(request.service_date).toLocaleDateString()}
      </span>
    </div>
    <h3 className="font-medium mb-1">Service Request #{request.id}</h3>
    <p className="text-sm text-gray-600 mb-3">{request.description}</p>
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
      <span className="text-sm">Location: {request.service_location}</span>
    </div>
  </div>
);

export const RequestList = ({ requests }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {requests.map((request) => (
      <RequestCard key={request.id} request={request} />
    ))}
  </div>
);