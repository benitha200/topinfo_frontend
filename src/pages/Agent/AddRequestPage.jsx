
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import axios from 'axios';
import API_URL from '../../constants/Constants';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import AgentLayout from './AgentLayout';
import { ArrowLeft, ArrowRight, CheckCircle, XCircle } from 'lucide-react';

const AddRequestPage = () => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [paymentPolling, setPaymentPolling] = useState(false);
    const [paymentResult, setPaymentResult] = useState(null);

    const [clientData, setClientData] = useState({
        amazina: '',
        telefone: '',
        imeyili: '',
        aderesi: ''
    });

    const [requestData, setRequestData] = useState({
        serviceCategories: [],
        selectedCategory: '',
        serviceDate: null,
        service_location: "Kigali",
        ubutumwa: '',
        showCalendar: false
    });

    const [paymentData, setPaymentData] = useState({
        amount: '',
        paymentMethod: 'momo',
        phoneNumber: '',
        transactionId: '',
        requestTransactionId: ''
    });

    useEffect(() => {
        const fetchServiceCategories = async () => {
            try {
                const response = await axios.get(`${API_URL}/service-categories`);
                setRequestData((prev) => ({
                    ...prev,
                    serviceCategories: response.data
                }));
            } catch (error) {
                toast.error('Failed to load service categories. Please try again later.');
            }
        };
        fetchServiceCategories();
    }, []);

    const checkPaymentStatus = async (transactionId, requestTransactionId) => {
        try {
            const response = await axios.post(
                `${API_URL}/payments/status`,
                {
                    transactionId: transactionId,
                    requestTransactionId: requestTransactionId
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            return response.data;
        } catch (error) {
            console.error('Payment status check error:', error);
            return { success: false, status: 'ERROR', message: 'Error checking payment status' };
        }
    };

    const pollPaymentStatus = async (transactionId, requestTransactionId) => {
        setPaymentPolling(true);
        const maxAttempts = 40;
        let attempts = 0;

        const pollInterval = setInterval(async () => {
            attempts++;

            const statusResponse = await checkPaymentStatus(transactionId, requestTransactionId);

            if (statusResponse.success) {
                switch (statusResponse.status) {
                    case 'SUCCESSFULL':
                        clearInterval(pollInterval);
                        setPaymentPolling(false);
                        setPaymentResult({
                            status: 'success',
                            message: 'Payment successful! Your request has been processed.'
                        });
                        break;
                    case 'FAILED':
                        clearInterval(pollInterval);
                        setPaymentPolling(false);
                        setPaymentResult({
                            status: 'failed',
                            message: 'Payment failed. Please try again.'
                        });
                        break;
                    case 'PENDING':
                    default:
                        if (attempts >= maxAttempts) {
                            clearInterval(pollInterval);
                            setPaymentPolling(false);
                            setPaymentResult({
                                status: 'timeout',
                                message: 'Payment status check timed out. Please contact support.'
                            });
                        }
                        break;
                }
            }
        }, 5000); // Check every 5 seconds
    };

    const handleClientInfoSubmit = (e) => {
        e.preventDefault();
        if (!clientData.amazina || !clientData.telefone || !clientData.imeyili || !clientData.aderesi) {
            toast.error('All client information fields are required.');
            return;
        }
        setStep(2);
    };

    const handleRequestDetailsSubmit = (e) => {
        e.preventDefault();
        if (!requestData.selectedCategory || !requestData.serviceDate) {
            toast.error('Service category and date must be selected.');
            return;
        }
        setStep(3);
    };

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setPaymentResult(null);
        try {
            // Create Client
            const clientResponse = await axios.post(
                `${API_URL}/clients`,
                {
                    firstname: clientData.amazina.split(' ')[0],
                    lastname: clientData.amazina.split(' ').slice(1).join(' ') || '',
                    email: clientData.imeyili,
                    phone: clientData.telefone,
                    location_sector: clientData.aderesi
                },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );

            const clientId = clientResponse.data.id;
            const userData = JSON.parse(localStorage.getItem('user'));
            const userId = userData.id;

            // Create Request
            const requestResponse = await axios.post(
                `${API_URL}/requests`,
                {
                    client_id: clientId,
                    description: requestData.ubutumwa || 'No additional description',
                    service_category_id: parseInt(requestData.selectedCategory),
                    your_location: clientData.aderesi,
                    service_date: format(requestData.serviceDate, 'yyyy-MM-dd'),
                    service_location: "Kigali",
                    agent_id: userId
                },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );

            const requestId = requestResponse.data.id;

            // Process Payment
            const paymentResponse = await axios.post(
                `${API_URL}/payments/initiate`,
                {
                    requestId: requestId,
                    amount: paymentData.amount.toString() || "100",
                    phone: paymentData.phoneNumber,
                    payment_method: paymentData.paymentMethod,
                    clientId: clientId,
                },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );

            // Extract transaction IDs
            const { transactionId, requestTransactionId } = paymentResponse.data;

            // Start polling payment status
            await pollPaymentStatus(transactionId, requestTransactionId);
        } catch (error) {
            toast.error('An error occurred. Please try again.');
            console.error(error);
            setPaymentResult({
                status: 'error',
                message: 'Please try again.'
            });
        } finally {
            setLoading(false);
        }
    };

    // Reset form and payment result to start over
    const handleReset = () => {
        setClientData({
            amazina: '',
            telefone: '',
            imeyili: '',
            aderesi: ''
        });
        setRequestData({
            serviceCategories: requestData.serviceCategories,
            selectedCategory: '',
            serviceDate: null,
            service_location: "Kigali",
            ubutumwa: '',
            showCalendar: false
        });
        setPaymentData({
            amount: '',
            paymentMethod: 'momo',
            phoneNumber: ''
        });
        setPaymentResult(null);
        setStep(1);
    };

    // Render Payment Result
    // const renderPaymentResult = () => {
    //     if (!paymentResult) return null;

    //     return (
    //         <div className={`p-4 rounded-lg text-center ${paymentResult.status === 'SUCCESSFULL'
    //             ? 'bg-green-100 text-green-800'
    //             : 'bg-red-100 text-red-800'
    //             }`}>
    //             {paymentResult.status === 'SUCCESSFULL' ? (
    //                 <CheckCircle className="mx-auto mb-4 text-green-600" size={48} />
    //             ) : (
    //                 <XCircle className="mx-auto mb-4 text-red-600" size={48} />
    //             )}
    //             <p className="text-lg font-semibold">{paymentResult.message}</p>
    //             {paymentResult.status !== 'SUCCESSFULL' && (
    //                 <Button
    //                     onClick={handleReset}
    //                     className="mt-4 bg-blue-500 text-white hover:bg-blue-600"
    //                 >
    //                     Try Again
    //                 </Button>
    //             )}
    //         </div>
    //     );
    // };

    const renderPaymentResult = () => {
        if (!paymentResult) return null;
      
        return (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            {paymentResult.status === 'success' ? (
              <>
                <div className="text-emerald-500">
                  <CheckCircle className="mx-auto mb-4" size={48} />
                </div>
                <h3 className="text-2xl font-bold mb-2">Payment Successful</h3>
                <p className="text-gray-700 mb-4">{paymentResult.message}</p>
                <a href="/agent-dashboard" className="bg-emerald-500 hover:bg-emerald-700 text-white py-3 px-4 rounded">
                  Return to Dashboard
                </a>
              </>
            ) : (
              <>
                <div className="text-red-500">
                  <XCircle className="mx-auto mb-4" size={48} />
                </div>
                <h3 className="text-2xl font-bold mb-2">Payment Failed</h3>
                <p className="text-gray-700 mb-4">{paymentResult.message}</p>
                <Button
                  onClick={handleReset}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Try Again
                </Button>
              </>
            )}
          </div>
        );
      };

    // Render Client Information Step
    const renderClientInfoStep = () => (
        <form onSubmit={handleClientInfoSubmit} className="space-y-4">
            <div>
                <label htmlFor="amazina" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                </label>
                <Input
                    id="amazina"
                    value={clientData.amazina}
                    onChange={(e) => setClientData(prev => ({
                        ...prev,
                        amazina: e.target.value
                    }))}
                    placeholder="Enter your full name"
                    required
                />
            </div>

            <div>
                <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                </label>
                <Input
                    id="telefone"
                    type="tel"
                    value={clientData.telefone}
                    onChange={(e) => setClientData(prev => ({
                        ...prev,
                        telefone: e.target.value
                    }))}
                    placeholder="Enter your phone number"
                    required
                />
            </div>

            <div>
                <label htmlFor="imeyili" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                </label>
                <Input
                    id="imeyili"
                    type="email"
                    value={clientData.imeyili}
                    onChange={(e) => setClientData(prev => ({
                        ...prev,
                        imeyili: e.target.value
                    }))}
                    placeholder="Enter your email"
                    required
                />
            </div>

            <div>
                <label htmlFor="aderesi" className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                </label>
                <Input
                    id="aderesi"
                    value={clientData.aderesi}
                    onChange={(e) => setClientData(prev => ({
                        ...prev,
                        aderesi: e.target.value
                    }))}
                    placeholder="Enter your address"
                    required
                />
            </div>

            <div className="flex justify-end">
                <Button type="submit" className="w-1/2 bg-blue-500 text-white hover:bg-blue-600">
                    Next: Request Details
                </Button>
            </div>
        </form>
    );

    // Render Request Details Step
    const renderRequestDetailsStep = () => (
        <form onSubmit={handleRequestDetailsSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Service Date
                </label>
                <div className="relative">
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full justify-start text-left"
                        onClick={() => setRequestData(prev => ({
                            ...prev,
                            showCalendar: !prev.showCalendar
                        }))}
                    >
                        {requestData.serviceDate ? format(requestData.serviceDate, 'PPP') : 'Pick a date'}
                    </Button>
                    {requestData.showCalendar && (
                        <div className="absolute mt-2 bg-white shadow-md p-4 rounded z-10">
                            <Calendar
                                onChange={(date) => setRequestData(prev => ({
                                    ...prev,
                                    serviceDate: date,
                                    showCalendar: false
                                }))}
                                value={requestData.serviceDate}
                                minDate={new Date()}
                            />
                        </div>
                    )}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Service Category
                </label>
                <Select
                    value={requestData.selectedCategory}
                    onValueChange={(value) => setRequestData(prev => ({
                        ...prev,
                        selectedCategory: value
                    }))}
                    required
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select service category" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                        {requestData.serviceCategories.map(category => (
                            <SelectItem
                                key={category.id}
                                value={String(category.id)}
                            >
                                {category.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div>
                <label htmlFor="ubutumwa" className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Description (Optional)
                </label>
                <Input
                    id="ubutumwa"
                    className="min-h-[100px]"
                    placeholder="Provide additional details about the service"
                    value={requestData.ubutumwa}
                    onChange={(e) => setRequestData(prev => ({
                        ...prev,
                        ubutumwa: e.target.value
                    }))}
                />
            </div>



            <div className="flex justify-between items-center gap-4">
                <Button
                    type="button"
                    variant="outline"
                    className="flex items-center justify-center px-4 py-2 bg-slate-500 text-white hover:bg-slate-600 rounded-md transition-colors"
                    onClick={() => setStep(1)}
                >
                    <ArrowLeft className="mr-2" size={16} />
                    Previous
                </Button>
                <Button
                    type="submit"
                    className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-md transition-colors"
                >
                    Next: Payment
                    <ArrowRight className="ml-2" size={16} />
                </Button>
            </div>
        </form>
    );

    // Render Payment Step
    const renderPaymentStep = () => (
        <form onSubmit={handlePaymentSubmit} className="space-y-4">
            <div>
                <span className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Method
                </span>
                <div className="space-y-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                            type="radio"
                            value="momo"
                            checked={paymentData.paymentMethod === 'momo'}
                            onChange={(e) => setPaymentData(prev => ({
                                ...prev,
                                paymentMethod: e.target.value
                            }))}
                            className="form-radio text-blue-600"
                            disabled={loading}
                        />
                        <span className="text-gray-700">MTN Mobile Money</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                            type="radio"
                            value="airtel"
                            checked={paymentData.paymentMethod === 'airtel'}
                            onChange={(e) => setPaymentData(prev => ({
                                ...prev,
                                paymentMethod: e.target.value
                            }))}
                            className="form-radio text-blue-600"
                            disabled={loading}
                        />
                        <span className="text-gray-700">Airtel Money</span>
                    </label>
                </div>
            </div>

            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                </label>
                <input
                    id="phone"
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={paymentData.phoneNumber}
                    onChange={(e) => setPaymentData(prev => ({
                        ...prev,
                        phoneNumber: e.target.value
                    }))}
                    required
                    disabled={loading}
                />
            </div>

            <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Amount
                </label>
                <input
                    id="amount"
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={paymentData.amount || 100 }
                    onChange={(e) => setPaymentData(prev => ({
                        ...prev,
                        amount: parseFloat(e.target.value)
                    }))}
                    required
                    disabled={loading}
                />
            </div>

            <div className="flex justify-between">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(2)}
                >
                    Previous
                </Button>
                <Button
                    type="submit"
                    className="bg-emerald-500 text-white hover:bg-emerald-600"
                    disabled={loading}
                >
                    {loading ? 'Processing...' : 'Complete Payment'}
                </Button>
            </div>
        </form>
    );

    return (
        <AgentLayout>
            <div className="max-w-2xl mx-auto">
                <Card>
                    {paymentResult ? (
                        <CardContent className="pt-6">
                            {renderPaymentResult()}
                        </CardContent>
                    ) : (
                        <>
                            <CardHeader>
                                <CardTitle>
                                    {step === 1 && 'Client Information'}
                                    {step === 2 && 'Request Details'}
                                    {step === 3 && 'Payment'}
                                </CardTitle>
                                <CardDescription>
                                    {step === 1 && 'Enter your personal details'}
                                    {step === 2 && 'Provide service request information'}
                                    {step === 3 && 'Complete your payment'}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {step === 1 && renderClientInfoStep()}
                                {step === 2 && renderRequestDetailsStep()}
                                {step === 3 && renderPaymentStep()}
                            </CardContent>
                        </>
                    )}
                </Card>
            </div>
        </AgentLayout>
    );
};

export default AddRequestPage;