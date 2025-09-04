// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { ArrowRight } from "lucide-react";
// import API_URL from "../../constants/Constants";
// import AgentLayout from "./AgentLayout";

// // Service Selection Component
// const ServiceSelectionPage = () => {
//     const [services, setServices] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchServices = async () => {
//             try {
//                 const response = await fetch(`${API_URL}/service-categories`, {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem("token")}`,
//                     },
//                 });

//                 if (!response.ok) throw new Error("Failed to fetch services");
//                 const data = await response.json();
//                 setServices(data);
//             } catch (err) {
//                 setError("Failed to load services. Please try again later.");
//                 console.error("Error fetching services:", err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchServices();
//     }, []);

//     const handleServiceSelect = (serviceId) => {
//         navigate(`/agent-dashboard/requests-agent/create/${serviceId}`);
//     };

//     if (loading) return <p>Loading services...</p>;
//     if (error) return <p className="text-red-500">{error}</p>;

//     return (
//         <AgentLayout>
//             <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//                 <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8">
//                     <h1 className="text-2xl font-bold mb-6">Select a Service</h1>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         {services.map((service) => (
//                             <div 
//                                 key={service.id} 
//                                 onClick={() => handleServiceSelect(service.id)}
//                                 className="border rounded p-4 cursor-pointer hover:bg-gray-100 transition-colors"
//                             >
//                                 <h2 className="text-lg font-semibold mb-2">{service.name}</h2>
//                                 <p className="text-sm text-gray-600">{service.description}</p>
//                                 <div className="flex justify-end mt-4">
//                                     <button 
//                                         className="px-4 py-2 flex bg-slate-500 text-white rounded hover:bg-slate-600"
//                                     >
//                                         <span className="font-semibold">Select </span>
//                                         <ArrowRight size={20} className="mt-1 ml-2" />
//                                     </button>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </AgentLayout>
//     );
// };

// export default ServiceSelectionPage;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import API_URL from "../../constants/Constants";
import AgentLayout from "./AgentLayout";

// Skeleton Loading Component
const ServiceSkeleton = () => (
    <div className="border rounded p-4 animate-pulse">
        <div className="h-6 w-3/4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 w-full bg-gray-200 rounded mb-4"></div>
        <div className="flex justify-end mt-4">
            <div className="h-10 w-24 bg-gray-200 rounded"></div>
        </div>
    </div>
);

// Service Selection Component
const ServiceSelectionPage = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch(`${API_URL}/service-categories`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (!response.ok) throw new Error("Failed to fetch services");
                const data = await response.json();
                setServices(data);
            } catch (err) {
                setError("Failed to load services. Please try again later.");
                console.error("Error fetching services:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    const handleServiceSelect = (serviceId) => {
        navigate(`/agent-dashboard/requests-agent/create/${serviceId}`);
    };

    return (
        <AgentLayout>
            <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8">
                    <h1 className="text-2xl font-bold mb-6">Select a Service</h1>
                    {error ? (
                        <p className="text-red-500">{error}</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {loading ? (
                                <>
                                    <ServiceSkeleton />
                                    <ServiceSkeleton />
                                    <ServiceSkeleton />
                                    <ServiceSkeleton />
                                </>
                            ) : (
                                services.map((service) => (
                                    <div
                                        key={service.id}
                                        onClick={() => handleServiceSelect(service.id)}
                                        className="border rounded p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                                    >
                                        <h2 className="text-lg font-semibold mb-2">{service.name}</h2>
                                        <p className="text-sm text-gray-600">{service.description}</p>
                                        <div className="flex justify-end mt-4">
                                            <button
                                                className="px-4 py-2 flex bg-slate-500 text-white rounded hover:bg-slate-600"
                                            >
                                                <span className="font-semibold">Select </span>
                                                <ArrowRight size={20} className="mt-1 ml-2" />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        </AgentLayout>
    );
};

export default ServiceSelectionPage;