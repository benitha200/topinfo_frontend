import React, { useState, useEffect } from 'react';
// import ServiceCard from '../components/ServiceCard';
import { Search, Scale, SlidersHorizontal , User, Home, Car, Users, Building2, Mountain, UtensilsCrossed, HeartPulse, Book, Ambulance, MessageCircle, X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
        <div className="bg-white rounded-lg p-6 z-10 w-full max-w-3xl mx-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{title}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  };
  
  const ServiceRequestForm = ({ service, onSubmit }) => {
    const [formData, setFormData] = useState({
      amazina: '',
      telefone: '',
      imeyili: '',
      aderesi: '',
      ubutumwa: ''
    });
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
    };
  
    return (
      <form onSubmit={handleSubmit} className="space-y-4 max-w-4xl">
        <div>
          <label htmlFor="amazina" className="block text-sm font-medium text-gray-700 mb-1">
            Amazina yawe yose
          </label>
          <input
            id="amazina"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.amazina}
            onChange={(e) => setFormData({ ...formData, amazina: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-1">
            Telefone
          </label>
          <input
            id="telefone"
            type="tel"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.telefone}
            onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="imeyili" className="block text-sm font-medium text-gray-700 mb-1">
            Imeyili
          </label>
          <input
            id="imeyili"
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.imeyili}
            onChange={(e) => setFormData({ ...formData, imeyili: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="aderesi" className="block text-sm font-medium text-gray-700 mb-1">
            Aderesi
          </label>
          <input
            id="aderesi"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.aderesi}
            onChange={(e) => setFormData({ ...formData, aderesi: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="ubutumwa" className="block text-sm font-medium text-gray-700 mb-1">
            Ubutumwa
          </label>
          <textarea
            id="ubutumwa"
            className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.ubutumwa}
            onChange={(e) => setFormData({ ...formData, ubutumwa: e.target.value })}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Komeza
        </button>
      </form>
    );
  };
  
  const PaymentForm = ({ amount, onSubmit }) => {
    const [paymentMethod, setPaymentMethod] = useState('momo');
    const [phoneNumber, setPhoneNumber] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit({ paymentMethod, phoneNumber });
    };
  
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <span className="block text-sm font-medium text-gray-700 mb-2">
            Hitamo uburyo bwo kwishyura
          </span>
          <div className="space-y-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                value="momo"
                checked={paymentMethod === 'momo'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="form-radio text-blue-600"
              />
              <span className="text-gray-700">MTN Mobile Money</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                value="airtel"
                checked={paymentMethod === 'airtel'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="form-radio text-blue-600"
              />
              <span className="text-gray-700">Airtel Money</span>
            </label>
          </div>
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Numero ya telefone
          </label>
          <input
            id="phone"
            type="tel"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
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
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Ishyura
        </button>
      </form>
    );
  };
  
  const ServiceCard = ({ service }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showPaymentForm, setShowPaymentForm] = useState(false);
  
    const handleRequestSubmit = (formData) => {
      setShowPaymentForm(true);
    };
  
    const handlePaymentSubmit = (paymentData) => {
      console.log('Payment submitted:', paymentData);
      setIsModalOpen(false);
      setShowPaymentForm(false);
      // Handle payment processing here
    };
  
    return (
      <>
        <div
          onClick={() => setIsModalOpen(true)}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-all"
        >
          <div className="flex flex-col items-center text-center">
            <div className="mb-4">{service.icon}</div>
            <h3 className="font-semibold text-gray-900 mb-1">{service.title}</h3>
            <p className="text-sm text-gray-500">{service.subtitle}</p>
            <button  className="m-4 px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium">
              Saba Service
            </button>
          </div>
        </div>
  
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setShowPaymentForm(false);
          }}
          title={showPaymentForm ? 'Kwishyura' : `Saba ${service.title}`}
        >
          {showPaymentForm ? (
            <PaymentForm amount={5000} onSubmit={handlePaymentSubmit} />
          ) : (
            <ServiceRequestForm service={service} onSubmit={handleRequestSubmit} />
          )}
        </Modal>
      </>
    );
  };


const Services = () => {
  // Dummy data for services
  const servicesData = [
    {
      id: 1,
      title: "Umwunganizi mu by'amategeko",
      subtitle: "Lawyer",
      icon: <Scale size={24} className="text-blue-600" />,
      category: "Legal"
    },
    {
      id: 2,
      title: "Noteri",
      subtitle: "Notary",
      icon: <User size={24} className="text-blue-600" />,
      category: "Legal"
    },
    {
      id: 3,
      title: "Umuhesha w'inkiko",
      subtitle: "Bailiff",
      icon: <Scale size={24} className="text-blue-600" />,
      category: "Legal"
    },
    {
      id: 4,
      title: "Umugenagaciro",
      subtitle: "Real Property Valuer",
      icon: <Home size={24} className="text-blue-600" />,
      category: "Property"
    },
    {
      id: 5,
      title: "Inguzanyo zihuse",
      subtitle: "Quick Loan",
      icon: <Users size={24} className="text-blue-600" />,
      category: "Finance"
    },
    {
      id: 6,
      title: "Garage",
      subtitle: "Garage",
      icon: <Car size={24} className="text-blue-600" />,
      category: "Automotive"
    },
    {
      id: 7,
      title: "Gukodesha imodoka",
      subtitle: "Car rental",
      icon: <Car size={24} className="text-blue-600" />,
      category: "Automotive"
    },
    {
      id: 8,
      title: "Upima butaka",
      subtitle: "Land Surveyor",
      icon: <Users size={24} className="text-blue-600" />,
      category: "Property"
    },
    {
      id: 9,
      title: "Hotel",
      subtitle: "Hotel",
      icon: <Building2 size={24} className="text-blue-600" />,
      category: "Hospitality"
    },
    {
      id: 10,
      title: "Ubukerarugendo",
      subtitle: "Travel & Tourism",
      icon: <Mountain size={24} className="text-blue-600" />,
      category: "Hospitality"
    },
    {
      id: 11,
      title: "Umujyanama mu mirire",
      subtitle: "Nutritionist",
      icon: <UtensilsCrossed size={24} className="text-blue-600" />,
      category: "Health"
    },
    {
      id: 12,
      title: "Umutoza ngororamubiri",
      subtitle: "Personal Fitness Trainer",
      icon: <Users size={24} className="text-blue-600" />,
      category: "Health"
    },
    {
      id: 13,
      title: "Ambulance",
      subtitle: "Imbangukiragutabara",
      icon: <Ambulance size={24} className="text-blue-600" />,
      category: "Health"
    },
    {
      id: 14,
      title: "Umujyanama",
      subtitle: "Therapist",
      icon: <MessageCircle size={24} className="text-blue-600" />,
      category: "Health"
    },
    {
      id: 15,
      title: "Amasomo y'igihe gito",
      subtitle: "Short Course",
      icon: <Book size={24} className="text-blue-600" />,
      category: "Education"
    }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredServices, setFilteredServices] = useState(servicesData);

  // Extract unique categories
  const categories = [...new Set(servicesData.map(service => service.category))];

  // Category icon mapping
  const categoryIcons = {
    Legal: <Scale size={18} />,
    Property: <Home size={18} />,
    Finance: <Users size={18} />,
    Automotive: <Car size={18} />,
    Hospitality: <Building2 size={18} />,
    Health: <HeartPulse size={18} />,
    Education: <Book size={18} />
  };

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      }
      return [...prev, category];
    });
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSearchTerm('');
  };

  useEffect(() => {
    let filtered = servicesData;

    if (searchTerm) {
      filtered = filtered.filter(
        (service) =>
          service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(service => 
        selectedCategories.includes(service.category)
      );
    }

    setFilteredServices(filtered);
  }, [searchTerm, selectedCategories]);

return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Saba guhuzwa n'utanga serivisi
          </h1>
          <p className="text-lg text-gray-600">
            Hitamo serivisi ukeneye
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative mb-8">
            <input
              type="text"
              placeholder="Shakisha serivisi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-12 py-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all duration-200 shadow-sm"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Nta serivisi zabonetse
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;