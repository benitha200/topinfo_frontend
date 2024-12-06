import React, { useState, useEffect } from "react";
import {
  Search,
  Scale,
  SlidersHorizontal,
  User,
  Home,
  Car,
  Users,
  Building2,
  Mountain,
  UtensilsCrossed,
  HeartPulse,
  Book,
  Ambulance,
  MessageCircle,
  X,
} from "lucide-react";
import { paymentService } from "../services/payment.service";
import API_URL from "../constants/Constants";
import { useNavigate } from "react-router-dom";

// Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-lg p-6 z-10 w-full max-w-3xl mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
// Service Request Form Component
const ServiceRequestForm = ({ service, onSubmit }) => {
  const [formData, setFormData] = useState({
    amazina: "",
    telefone: "",
    imeyili: "",
    aderesi: "",
    ubutumwa: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Create client
      const clientResponse = await fetch(`${API_URL}/clients`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          firstname: formData.amazina.split(" ")[0],
          lastname: formData.amazina.split(" ").slice(1).join(" "),
          email: formData.imeyili,
          phone: formData.telefone,
          location_sector: formData.aderesi,
          location_province: "Kigali",
          location_district: "Unknown",
        }),
      });

      if (!clientResponse.ok) throw new Error("Failed to create client");
      const clientData = await clientResponse.json();

      // Create service request
      const requestResponse = await fetch(`${API_URL}/requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          client_id: clientData.id,
          description: formData.ubutumwa,
          service_category_id: service.id,
          your_location: formData.aderesi,
          service_location: formData.aderesi,
          service_date: new Date().toISOString().split("T")[0],
        }),
      });

      if (!requestResponse.ok) throw new Error("Failed to create request");
      const requestData = await requestResponse.json();
      const updatedFormData = {
        ...formData,
        clientId: clientData.id,
        requestId: requestData.id,
      };

      onSubmit(updatedFormData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-4xl">
      {error && <span className="text-red-500">{error}</span>}

      <div>
        <label
          htmlFor="amazina"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Amazina yawe yose
        </label>
        <input
          id="amazina"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          value={formData.amazina}
          onChange={(e) =>
            setFormData({ ...formData, amazina: e.target.value })
          }
          required
        />
      </div>

      <div>
        <label
          htmlFor="telefone"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Telefone
        </label>
        <input
          id="telefone"
          type="tel"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          value={formData.telefone}
          onChange={(e) =>
            setFormData({ ...formData, telefone: e.target.value })
          }
          required
        />
      </div>

      <div>
        <label
          htmlFor="imeyili"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Imeyili
        </label>
        <input
          id="imeyili"
          type="email"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          value={formData.imeyili}
          onChange={(e) =>
            setFormData({ ...formData, imeyili: e.target.value })
          }
          required
        />
      </div>

      <div>
        <label
          htmlFor="aderesi"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Aderesi
        </label>
        <input
          id="aderesi"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          value={formData.aderesi}
          onChange={(e) =>
            setFormData({ ...formData, aderesi: e.target.value })
          }
          required
        />
      </div>

      <div>
        <label
          htmlFor="ubutumwa"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Ubutumwa
        </label>
        <textarea
          id="ubutumwa"
          className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          value={formData.ubutumwa}
          onChange={(e) =>
            setFormData({ ...formData, ubutumwa: e.target.value })
          }
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-sky-600 text-white py-2 px-4 rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
      >
        {loading ? "Tegereza..." : "Komeza"}
      </button>
    </form>
  );
};

// Payment Form Component

const PaymentForm = ({ amount, requestInfo, onSubmit }) => {
  const [paymentMethod, setPaymentMethod] = useState("momo");
  const [phoneNumber, setPhoneNumber] = useState(requestInfo.telefone);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [statusCheckInterval, setStatusCheckInterval] = useState(null);
  const origin = window.location.origin;
  useEffect(() => {
    return () => {
      if (statusCheckInterval) {
        clearInterval(statusCheckInterval);
      }
    };
  }, [statusCheckInterval]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Initiate payment
      const paymentResult = await paymentService.initiatePayment({
        name: requestInfo.amazina,
        email: requestInfo.imeyili,
        phone: phoneNumber,
        amount: amount,
        requestId: requestInfo.requestId,
        clientId: requestInfo.clientId,
        currentUrl: `${origin}/payment-callback`,
      });

      console.log(paymentResult);
      console.log(paymentResult.response);
      const response = paymentResult.response;
      if (response.status === "success") {
        window.location.href = response.meta.authorization.redirect;
      }

      setTransactionDetails(paymentResult);

      // Start checking payment status
      // const interval = setInterval(async () => {
      //   try {
      //     const statusResult = await paymentService.checkPaymentStatus(
      //       paymentResult.transactionId,
      //       paymentResult.requestTransactionId
      //     );

      //     if (statusResult.status === 'SUCCESSFUL') {
      //       clearInterval(interval);
      //       onSubmit({
      //         paymentMethod,
      //         phoneNumber,
      //         transactionId: statusResult.transactionId,
      //         status: 'completed'
      //       });
      //     } else if (statusResult.status === 'FAILED') {
      //       clearInterval(interval);
      //       setError('Payment failed. Please try again.');
      //       setLoading(false);
      //     }
      //   } catch (error) {
      //     console.error('Status check error:', error);
      //     // Don't clear interval on network errors
      //   }
      // }, 5000);

      // setStatusCheckInterval(interval);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {transactionDetails && (
        <div className="p-4 bg-sky-50 border border-sky-200 rounded-md">
          <p className="text-sky-600">
            Payment request sent. Please check your phone for the payment
            prompt.
          </p>
        </div>
      )}

      <div>
        <span className="block text-sm font-medium text-gray-700 mb-2">
          Hitamo uburyo bwo kwishyura
        </span>
        <div className="space-y-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              value="momo"
              checked={paymentMethod === "momo"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="form-radio text-sky-600"
              disabled={loading}
            />
            <span className="text-gray-700">MTN Mobile Money</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              value="airtel"
              checked={paymentMethod === "airtel"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="form-radio text-sky-600"
              disabled={loading}
            />
            <span className="text-gray-700">Airtel Money</span>
          </label>
        </div>
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Numero ya telefone
        </label>
        <input
          id="phone"
          type="tel"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          disabled={loading}
        />
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between mb-2">
          <span className="font-medium">Igiciro</span>
          <span>{amount} RWF</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-sky-600 text-white py-2 px-4 rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
      >
        {loading ? "Tegereza..." : "Ishyura"}
      </button>
    </form>
  );
};

// const PaymentForm = ({ amount, onSubmit }) => {
//   const [paymentMethod, setPaymentMethod] = useState('momo');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       // Simulate payment processing
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       onSubmit({ paymentMethod, phoneNumber });
//     } catch (err) {
//       setError('Payment failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       {error && (
//         <>
//         {error}
//         </>
//         // <Alert variant="destructive">
//         //   <AlertDescription>{error}</AlertDescription>
//         // </Alert>
//       )}

//       <div>
//         <span className="block text-sm font-medium text-gray-700 mb-2">
//           Hitamo uburyo bwo kwishyura
//         </span>
//         <div className="space-y-2">
//           <label className="flex items-center space-x-2 cursor-pointer">
//             <input
//               type="radio"
//               value="momo"
//               checked={paymentMethod === 'momo'}
//               onChange={(e) => setPaymentMethod(e.target.value)}
//               className="form-radio text-sky-600"
//             />
//             <span className="text-gray-700">MTN Mobile Money</span>
//           </label>
//           <label className="flex items-center space-x-2 cursor-pointer">
//             <input
//               type="radio"
//               value="airtel"
//               checked={paymentMethod === 'airtel'}
//               onChange={(e) => setPaymentMethod(e.target.value)}
//               className="form-radio text-sky-600"
//             />
//             <span className="text-gray-700">Airtel Money</span>
//           </label>
//         </div>
//       </div>

//       <div>
//         <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
//           Numero ya telefone
//         </label>
//         <input
//           id="phone"
//           type="tel"
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
//           value={phoneNumber}
//           onChange={(e) => setPhoneNumber(e.target.value)}
//           required
//         />
//       </div>

//       <div className="border-t pt-4">
//         <div className="flex justify-between mb-2">
//           <span className="font-medium">Igiciro</span>
//           <span>{amount} RWF</span>
//         </div>
//       </div>

//       <button
//         type="submit"
//         disabled={loading}
//         className="w-full bg-sky-600 text-white py-2 px-4 rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
//       >
//         {loading ? 'Tegereza...' : 'Ishyura'}
//       </button>
//     </form>
//   );
// };

// Service Card Component
const ServiceCard = ({ service }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [requestInfo, setRequestInfo] = useState({});

  

  const handleRequestSubmit = async (formData) => {
    setRequestInfo(formData);
    setShowPaymentForm(true);
  };

  const handlePaymentSubmit = async (paymentData) => {
    // try {
    //   console.log('Payment submitted:', paymentData);
    //   setIsModalOpen(false);
    //   setShowPaymentForm(false);
    // } catch (error) {
    //   console.error('Payment failed:', error);
    // }
  };
  const navigate = useNavigate();

  const handleServiceClick = (service) => {
    navigate(`/client-request/${service}`);
  };


  return (
    <>
      <div
        onClick={() => handleServiceClick(service.id)}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-all"
      >
        <div className="flex flex-col items-center text-center">
          <div className="mb-4">{service.icon}</div>
          <h3 className="font-semibold text-gray-900 mb-1">{service.title}</h3>
          <p className="text-sm text-gray-500">{service.subtitle}</p>
          <button className="m-4 px-4 py-2 border border-sky-500 text-sky-500 rounded-lg hover:bg-sky-50 transition-colors text-sm font-medium">
            Saba Service
          </button>
        </div>
      </div>

      {/* <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setShowPaymentForm(false);
        }}
        title={showPaymentForm ? "Kwishyura" : `Saba ${service.title}`}
      >
        {showPaymentForm ? (
          <PaymentForm
            amount={100}
            requestInfo={requestInfo}
            onSubmit={handlePaymentSubmit}
          />
        ) : (
          <ServiceRequestForm
            service={service}
            onSubmit={handleRequestSubmit}
          />
        )}
      </Modal> */}
    </>
  );
};

// Main Services Component
const Services = () => {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

        const mappedServices = data.map((service) => ({
          id: service.id,
          title: service.name,
          subtitle: service.details,
          icon: getCategoryIcon(service.name),
          category: service.category || "Other",
          price: service.client_price,
        }));

        setServices(mappedServices);
        setFilteredServices(mappedServices);
      } catch (err) {
        setError("Failed to load services. Please try again later.");
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const getCategoryIcon = (name) => {
    const iconMap = {
      lawyer: <Scale size={24} className="text-sky-600" />,
      notary: <User size={24} className="text-sky-600" />,
      bailiff: <Scale size={24} className="text-sky-600" />,
    };

    return (
      iconMap[name.toLowerCase()] || (
        <Users size={24} className="text-sky-600" />
      )
    );
  };

  useEffect(() => {
    let filtered = services;

    if (searchTerm) {
      filtered = filtered.filter(
        (service) =>
          service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredServices(filtered);
  }, [searchTerm, services]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
          <p className="mt-4 text-gray-600">Tegereza gato...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        {/* <Alert variant="destructive" className="max-w-lg">
          <AlertDescription>{error}</AlertDescription>
        </Alert> */}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Saba guhuzwa n'utanga serivisi
          </h1>
          <p className="text-lg text-gray-600">Hitamo serivisi ukeneye</p>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative mb-8">
            <input
              type="text"
              placeholder="Shakisha serivisi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-12 py-4 rounded-xl border border-gray-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 focus:outline-none transition-all duration-200 shadow-sm"
            />
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Nta serivisi zabonetse</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
