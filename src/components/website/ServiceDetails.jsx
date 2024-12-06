import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ServiceDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    // Fetch service details from the backend
    const fetchServiceDetails = async () => {
      const response = await fetch(`/api/services/${id}`);
      const data = await response.json();
      setService(data);
    };
    fetchServiceDetails();
  }, [id]);

  if (!service) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="bg-white rounded shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4">{service.title}</h1>
        <p className="text-gray-600 mb-4">{service.description}</p>
        <p className="font-bold text-green-500 text-2xl mb-4">
          Price: ${service.price}
        </p>
        <button className="bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 px-4 rounded-lg">
          Request Service
        </button>
      </div>
    </div>
  );
};

export default ServiceDetails;