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
            <button className="mt-4 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors">
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