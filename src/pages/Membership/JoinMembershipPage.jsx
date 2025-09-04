import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import {
    Award, ArrowRight, ArrowLeft, CheckCircle, CreditCard,
    User, Mail, Phone, Shield, Calendar, X, Check,
    Star
} from 'lucide-react';

const JoinMembershipPage = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        birthdate: '',
        paymentMethod: 'momo',
        agreeTerms: false,
        cardNumber: '',
        cardExpiry: '',
        cardCvc: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [paymentComplete, setPaymentComplete] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setIsVisible(true);

        // Check if there's a plan in URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const planParam = urlParams.get('plan');
        if (planParam && ['silver', 'gold', 'platinum', 'diamond'].includes(planParam.toLowerCase())) {
            setSelectedPlan(planParam.toLowerCase());
        }
    }, []);

    // const plans = {
    //     silver: {
    //         name: 'Silver',
    //         price: '10,000',
    //         color: 'bg-white',
    //         textColor: 'text-gray-800',
    //         iconColor: 'text-gray-600',
    //         borderColor: 'border-gray-200',
    //         accentColor: 'bg-gray-100',
    //         features: [
    //             "Ikarita y'ubunyamuryango y'ikoranabuhanga",
    //             "Igabanywa ry'ibiciro ahantu hasaga 20",
    //             'Uburenganzira bwo kwinjira mu itsinda rya WhatsApp'
    //         ]
    //     },
    //     gold: {
    //         name: 'Gold',
    //         price: '50,000',
    //         color: 'bg-amber-200',
    //         textColor: 'text-gray-800',
    //         iconColor: 'text-amber-500',
    //         borderColor: 'border-amber-200',
    //         accentColor: 'bg-amber-50',
    //         features: [
    //             "Ibyo Silver yose itanga",
    //             "Igabanywa ry'ibiciro ahantu hasaga 50",
    //             "Igabanywa ry'ibiciro bya buri kwezi",
    //             "Impano 1 buri mwaka"
    //         ]
    //     },
    //     platinum: {
    //         name: 'Platinum',
    //         price: '90,000',
    //         color: 'bg-gray-200',
    //         textColor: 'text-gray-900',
    //         iconColor: 'text-sky-400',
    //         borderColor: 'border-gray-200',
    //         accentColor: 'bg-gray-200',
    //         features: [
    //             'Ibyo Gold yose itanga',
    //             "Igabanywa ry'ibiciro ahantu hasaga 100",
    //             "Igabanywa ry'ibiciro bya buri cyumweru",
    //             'Impano 2 buri mwaka',
    //             'Kugera mbere ku hantu hashya'
    //         ]
    //     },
    //     diamond: {
    //         name: 'Diamond',
    //         price: '140,000',
    //         color: 'bg-sky-500',
    //         textColor: 'text-white',
    //         iconColor: 'text-sky-200',
    //         borderColor: 'border-sky-400',
    //         accentColor: 'bg-sky-700',
    //         features: [
    //             'Ibyo Platinum yose itanga',
    //             "Igabanywa ry'ibiciro ahantu hose",
    //             "Igabanywa ry'ibiciro bya buri munsi",
    //             'Impano 4 buri mwaka',
    //             'Ubufasha bwa VIP amasaha 24/7',
    //             'Uburambe bwihariye bwa VIP'
    //         ]
    //     }
    // };

    const plans = {
        silver: {
            name: 'Silver',
            price: '10,000',
            duration: 'Ukwezi 1', // 1 month
            color: 'bg-white',
            textColor: 'text-gray-800',
            iconColor: 'text-gray-600',
            borderColor: 'border-gray-200',
            accentColor: 'bg-gray-100',
            features: [
                "Ikarita y'ubunyamuryango y'ikoranabuhanga",
                "Igabanywa ry'ibiciro ahantu hasaga 20",
                'Uburenganzira bwo kwinjira mu itsinda rya WhatsApp'
            ]
        },
        gold: {
            name: 'Gold',
            price: '50,000',
            duration: 'Amezi 3', // 3 months
            color: 'bg-amber-200',
            textColor: 'text-gray-800',
            iconColor: 'text-amber-500',
            borderColor: 'border-amber-200',
            accentColor: 'bg-amber-50',
            features: [
                "Ibyo Silver yose itanga",
                "Igabanywa ry'ibiciro ahantu hasaga 50",
                "Igabanywa ry'ibiciro bya buri kwezi",
                "Impano 1 buri mwaka"
            ]
        },
        platinum: {
            name: 'Platinum',
            price: '90,000',
            duration: 'Amezi 6', // 6 months
            color: 'bg-gray-200',
            textColor: 'text-gray-900',
            iconColor: 'text-sky-400',
            borderColor: 'border-gray-200',
            accentColor: 'bg-gray-200',
            features: [
                'Ibyo Gold yose itanga',
                "Igabanywa ry'ibiciro ahantu hasaga 100",
                "Igabanywa ry'ibiciro bya buri cyumweru",
                'Impano 2 buri mwaka',
                'Kugera mbere ku hantu hashya'
            ]
        },
        diamond: {
            name: 'Diamond',
            price: '140,000',
            duration: 'Umwaka', // 1 year
            color: 'bg-sky-500',
            textColor: 'text-white',
            iconColor: 'text-sky-200',
            borderColor: 'border-sky-400',
            accentColor: 'bg-sky-700',
            features: [
                'Ibyo Platinum yose itanga',
                "Igabanywa ry'ibiciro ahantu hose",
                "Igabanywa ry'ibiciro bya buri munsi",
                'Impano 4 buri mwaka',
                'Ubufasha bwa VIP amasaha 24/7',
                'Uburambe bwihariye bwa VIP'
            ]
        }
    };

    const handlePlanSelect = (plan) => {
        setSelectedPlan(plan);
        setStep(2);
        window.scrollTo(0, 0);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });

        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) newErrors.firstName = 'Izina ni ngombwa';
        if (!formData.lastName.trim()) newErrors.lastName = 'Izina ry\'umuryango ni ngombwa';
        if (!formData.email.trim()) newErrors.email = 'Email ni ngombwa';
        else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Email ifite ikosa';

        if (!formData.phone.trim()) newErrors.phone = 'Telefone ni ngombwa';
        else if (!/^07\d{8}$/.test(formData.phone)) newErrors.phone = 'Numero ya telefone igomba gutangira na 07 ikagira imibare 10';

        if (!formData.birthdate) newErrors.birthdate = 'Itariki y\'amavuko ni ngombwa';
        if (!formData.agreeTerms) newErrors.agreeTerms = 'Usabwe kwemera amategeko n\'amabwiriza';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setStep(3);
            window.scrollTo(0, 0);
        }, 1500);
    };

    const handlePaymentSubmit = () => {
        setIsSubmitting(true);

        // Simulate payment processing
        setTimeout(() => {
            setIsSubmitting(false);
            setPaymentComplete(true);
            window.scrollTo(0, 0);
        }, 2000);
    };

    const goToDashboard = () => {
        navigate('/discount-club/dashboard');
    };

    const goBack = () => {
        if (step > 1) {
            setStep(step - 1);
            window.scrollTo(0, 0);
        }
    };

    return (
        <>
            <Helmet>
                <title>Iyandikishe muri TopInfo Membership Club | Rwanda</title>
                <meta name="description" content="Iyandikishe muri TopInfo Membership Club ubone discounts nyinshi mu Rwanda hose" />
            </Helmet>

            <div className="min-h-screen w-full bg-gray-50">
                {/* Header */}
                <div className="bg-gradient-to-br from-sky-600 via-sky-500 to-sky-400 py-12">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between">
                            <Link to="/discount-club" className="flex items-center text-white hover:text-sky-100 transition-colors">
                                <ArrowLeft className="mr-2" size={20} />
                                <span className="font-medium">Gusubira Inyuma</span>
                            </Link>
                            <div>
                                <h1 className="text-3xl font-bold text-white">TopInfo Membership Club</h1>
                            </div>
                            <div className="w-20"></div>
                        </div>
                    </div>
                </div>

                {/* Progress Steps */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                    <div className="bg-white rounded-lg shadow-lg p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className={`rounded-full h-10 w-10 flex items-center justify-center ${step >= 1 ? 'bg-sky-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                                    1
                                </div>
                                <div className="ml-3">
                                    <p className={`font-medium ${step >= 1 ? 'text-sky-500' : 'text-gray-500'}`}>Hitamo</p>
                                </div>
                            </div>

                            <div className={`flex-1 h-1 mx-4 ${step >= 2 ? 'bg-sky-500' : 'bg-gray-200'}`}></div>

                            <div className="flex items-center">
                                <div className={`rounded-full h-10 w-10 flex items-center justify-center ${step >= 2 ? 'bg-sky-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                                    2
                                </div>
                                <div className="ml-3">
                                    <p className={`font-medium ${step >= 2 ? 'text-sky-500' : 'text-gray-500'}`}>Amakuru</p>
                                </div>
                            </div>

                            <div className={`flex-1 h-1 mx-4 ${step >= 3 ? 'bg-sky-500' : 'bg-gray-200'}`}></div>

                            <div className="flex items-center">
                                <div className={`rounded-full h-10 w-10 flex items-center justify-center ${step >= 3 ? 'bg-sky-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                                    3
                                </div>
                                <div className="ml-3">
                                    <p className={`font-medium ${step >= 3 ? 'text-sky-500' : 'text-gray-500'}`}>Kwishyura</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {step === 1 && (
                    <div className="bg-gray-50 py-16">
                        <div className="container mx-auto px-4">
                            <div className="text-center max-w-2xl mx-auto mb-12">
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Ibiciro Byoroshye, Biboneye</h1>
                                <p className="text-lg text-gray-600">Hitamo icyiciro kiberanye n'ibyo ukeneye</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                                {Object.entries(plans).map(([key, plan]) => (
                                    <div
                                        key={key}
                                        className={`${plan.color} rounded-xl shadow-sm p-6 border ${plan.borderColor} transition-all hover:shadow-md hover:-translate-y-1 flex flex-col relative`}
                                    >
                                        {key === 'platinum' && (
                                            <div className={`${plan.accentColor} text-xs font-medium absolute -top-2 -right-2 rounded-full inline-flex items-center px-2 py-1 z-20 bg-white shadow-sm border`}>
                                                <Star className="h-3 w-3 mr-1" fill='green' strokeWidth={0} />
                                                <span className='text-green-600'>IKUNZWE CYANE</span>
                                            </div>
                                        )}

                                        <h2 className={`text-xl font-bold ${plan.textColor} mb-1`}>{plan.name}</h2>
                                        <p className={`text-sm ${key === 'diamond' ? 'text-gray-500' : 'text-gray-500'} mb-4`}>
                                            {key === 'silver' ? 'Ubunyamuryango bw\'ibanze' :
                                                key === 'gold' ? 'Inyungu zikungahaye' :
                                                    key === 'platinum' ? 'Uburambe bwiza' : 'VIP by\'umwihariko'}
                                        </p>

                                        <div className="flex items-baseline my-4">
                                            <span className={`text-2xl font-bold ${plan.textColor}`}>RWF {plan.price}</span>
                                            <span className={`ml-1 text-sm ${key === 'diamond' ? 'text-gray-200' : 'text-gray-500'}`}>/{plan.duration}</span>
                                        </div>

                                        <ul className="mb-6 space-y-3 flex-grow">
                                            {plan.features.map((feature, index) => (
                                                <li key={index} className="flex items-start">
                                                    <Check className={`h-5 w-5 ${plan.iconColor} mr-2 mt-0.5 flex-shrink-0`} />
                                                    <span className={`text-sm ${key === 'platinum' || key === 'diamond' ? 'text-gray-900' : 'text-gray-600'}`}>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <button
                                            onClick={() => handlePlanSelect(key)}
                                            className={`mt-auto w-full py-2 px-4 rounded-lg font-medium transition-colors ${key === 'silver' ? 'bg-gray-800 hover:bg-gray-700 text-white' :
                                                key === 'gold' ? 'bg-amber-500 hover:bg-amber-600 text-white' :
                                                    key === 'platinum' ? 'bg-sky-600 hover:bg-sky-700 text-white' :
                                                        'bg-gray-600 hover:bg-gray-600 text-white'
                                                }`}
                                        >
                                            {`Hitamo ${plan.name}`}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                {/* Step 2: Personal Information */}
                {step === 2 && (
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <div className="flex items-center mb-6">
                                <div className={`p-3 rounded-full mr-4 ${plans[selectedPlan].color}`}>
                                    <Award className={plans[selectedPlan].iconColor} size={24} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">{plans[selectedPlan].name} Membership</h3>
                                    <p className="text-gray-600">{plans[selectedPlan].price}/ {plans[selectedPlan].duration}</p>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-6">Uzuza Amakuru Yawe</h3>

                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">Izina Ryawe</label>
                                        <div className="relative">
                                            <User size={18} className="absolute left-3 top-3 text-gray-400" />
                                            <input
                                                type="text"
                                                id="firstName"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                className={`pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                                                placeholder="Andika izina ryawe"
                                            />
                                        </div>
                                        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">Izina ry'Umuryango</label>
                                        <div className="relative">
                                            <User size={18} className="absolute left-3 top-3 text-gray-400" />
                                            <input
                                                type="text"
                                                id="lastName"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                className={`pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                                                placeholder="Andika izina ry'umuryango"
                                            />
                                        </div>
                                        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                                        <div className="relative">
                                            <Mail size={18} className="absolute left-3 top-3 text-gray-400" />
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className={`pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                                placeholder="email@example.com"
                                            />
                                        </div>
                                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Telefone</label>
                                        <div className="relative">
                                            <Phone size={18} className="absolute left-3 top-3 text-gray-400" />
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className={`pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                                                placeholder="07XX XXX XXX"
                                            />
                                        </div>
                                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="birthdate" className="block text-gray-700 font-medium mb-2">Itariki y'Amavuko</label>
                                    <div className="relative">
                                        <Calendar size={18} className="absolute left-3 top-3 text-gray-400" />
                                        <input
                                            type="date"
                                            id="birthdate"
                                            name="birthdate"
                                            value={formData.birthdate}
                                            onChange={handleInputChange}
                                            className={`pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all ${errors.birthdate ? 'border-red-500' : 'border-gray-300'}`}
                                        />
                                    </div>
                                    {errors.birthdate && <p className="text-red-500 text-sm mt-1">{errors.birthdate}</p>}
                                </div>

                                <div className="mb-6">
                                    <label className="block text-gray-700 font-medium mb-2">Uburyo bwo Kwishyura</label>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div
                                            className={`border rounded-lg p-4 cursor-pointer transition-all ${formData.paymentMethod === 'momo' ? 'bg-sky-50 border-sky-500' : 'hover:bg-gray-50'}`}
                                            onClick={() => handleInputChange({ target: { name: 'paymentMethod', value: 'momo' } })}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="font-medium">MTN MoMo</h4>
                                                {formData.paymentMethod === 'momo' ? (
                                                    <div className="h-5 w-5 rounded-full bg-sky-500 flex items-center justify-center">
                                                        <Check size={12} className="text-white" />
                                                    </div>
                                                ) : (
                                                    <div className="h-5 w-5 rounded-full border-2 border-gray-300"></div>
                                                )}
                                            </div>
                                            <p className="text-gray-600 text-sm">Kwishyura ukoresheje MTN Mobile Money</p>
                                        </div>

                                        <div
                                            className={`border rounded-lg p-4 cursor-pointer transition-all ${formData.paymentMethod === 'airtel' ? 'bg-sky-50 border-sky-500' : 'hover:bg-gray-50'}`}
                                            onClick={() => handleInputChange({ target: { name: 'paymentMethod', value: 'airtel' } })}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="font-medium">Airtel Money</h4>
                                                {formData.paymentMethod === 'airtel' ? (
                                                    <div className="h-5 w-5 rounded-full bg-sky-500 flex items-center justify-center">
                                                        <Check size={12} className="text-white" />
                                                    </div>
                                                ) : (
                                                    <div className="h-5 w-5 rounded-full border-2 border-gray-300"></div>
                                                )}
                                            </div>
                                            <p className="text-gray-600 text-sm">Kwishyura ukoresheje Airtel Money</p>
                                        </div>

                                        <div
                                            className={`border rounded-lg p-4 cursor-pointer transition-all ${formData.paymentMethod === 'card' ? 'bg-sky-50 border-sky-500' : 'hover:bg-gray-50'}`}
                                            onClick={() => handleInputChange({ target: { name: 'paymentMethod', value: 'card' } })}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="font-medium">Visa/Mastercard</h4>
                                                {formData.paymentMethod === 'card' ? (
                                                    <div className="h-5 w-5 rounded-full bg-sky-500 flex items-center justify-center">
                                                        <Check size={12} className="text-white" />
                                                    </div>
                                                ) : (
                                                    <div className="h-5 w-5 rounded-full border-2 border-gray-300"></div>
                                                )}
                                            </div>
                                            <p className="text-gray-600 text-sm">Kwishyura ukoresheje ikarita ya banki</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-6">
                                            <input
                                                id="agreeTerms"
                                                name="agreeTerms"
                                                type="checkbox"
                                                checked={formData.agreeTerms}
                                                onChange={handleInputChange}
                                                className={`h-5 w-5 rounded border-gray-300 text-sky-600 focus:ring-sky-500 ${errors.agreeTerms ? 'border-red-500' : ''}`}
                                            />
                                        </div>
                                        <div className="ml-3">
                                            <label htmlFor="agreeTerms" className="text-gray-700">
                                                Nemera <Link to="/terms" className="text-sky-600 hover:text-sky-800 underline">amategeko n'amabwiriza</Link> ya TopInfo Membership Club
                                            </label>
                                            {errors.agreeTerms && <p className="text-red-500 text-sm mt-1">{errors.agreeTerms}</p>}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row justify-between gap-4">
                                    <button
                                        type="button"
                                        onClick={goBack}
                                        className="py-3 px-6 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center"
                                    >
                                        <ArrowLeft className="mr-2" size={18} />
                                        Gusubira Inyuma
                                    </button>

                                    <button
                                        type="submit"
                                        className="py-3 px-6 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-colors duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <div className="flex items-center">
                                                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                                                Tegereza...
                                            </div>
                                        ) : (
                                            <>
                                                Gukomeza ku Kwishyura
                                                <ArrowRight className="ml-2" size={18} />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Step 3: Payment */}
                {step === 3 && !paymentComplete && (
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <div className="flex items-center mb-8">
                                <div className={`p-3 rounded-full mr-4 ${plans[selectedPlan].color}`}>
                                    <Award className={plans[selectedPlan].iconColor} size={24} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">{plans[selectedPlan].name} Membership</h3>
                                    <p className="text-gray-600">{plans[selectedPlan].price} RWF ku mwaka</p>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-6">Kwishyura</h3>

                            {formData.paymentMethod === 'momo' && (
                                <div className="mb-8">
                                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                        <h4 className="font-bold text-gray-900 mb-4">Amabwiriza yo Kwishyura na MTN MoMo</h4>
                                        <ol className="space-y-4 text-gray-600">
                                            <li className="flex">
                                                <span className="font-bold mr-2">1.</span>
                                                <p>Kanda *182*7*1# kuri telefone yawe ya MTN</p>
                                            </li>
                                            <li className="flex">
                                                <span className="font-bold mr-2">2.</span>
                                                <p>Andika numero ikurikira mu mwanya wa reference: <span className="font-bold text-sky-600">TOP{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</span></p>
                                            </li>
                                            <li className="flex">
                                                <span className="font-bold mr-2">3.</span>
                                                <p>Andika umubare wa <span className="font-bold">{plans[selectedPlan].price}</span> mu mwanya w'amafaranga</p>
                                            </li>
                                            <li className="flex">
                                                <span className="font-bold mr-2">4.</span>
                                                <p>Andika PIN yawe maze wishyure</p>
                                            </li>
                                        </ol>
                                    </div>
                                </div>
                            )}

                            {formData.paymentMethod === 'airtel' && (
                                <div className="mb-8">
                                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                        <h4 className="font-bold text-gray-900 mb-4">Amabwiriza yo Kwishyura na Airtel Money</h4>
                                        <ol className="space-y-4 text-gray-600">
                                            <li className="flex">
                                                <span className="font-bold mr-2">1.</span>
                                                <p>Kanda *500*3# kuri telefone yawe ya Airtel</p>
                                            </li>
                                            <li className="flex">
                                                <span className="font-bold mr-2">2.</span>
                                                <p>Andika numero ikurikira mu mwanya wa reference: <span className="font-bold text-sky-600">TOP{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</span></p>
                                            </li>
                                            <li className="flex">
                                                <span className="font-bold mr-2">3.</span>
                                                <p>Andika umubare wa <span className="font-bold">{plans[selectedPlan].price}</span> mu mwanya w'amafaranga</p>
                                            </li>
                                            <li className="flex">
                                                <span className="font-bold mr-2">4.</span>
                                                <p>Andika PIN yawe maze wishyure</p>
                                            </li>
                                        </ol>
                                    </div>
                                </div>
                            )}

                            {formData.paymentMethod === 'card' && (
                                <div>
                                    <div className="mb-8">
                                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                            <h4 className="font-bold text-gray-900 mb-4">Andika Amakuru y'Ikarita ya Banki</h4>

                                            <div className="mb-4">
                                                <label className="block text-gray-700 font-medium mb-2">Numero y'Ikarita</label>
                                                <div className="relative">
                                                    <CreditCard size={18} className="absolute left-3 top-3 text-gray-400" />
                                                    <input
                                                        type="text"
                                                        name="cardNumber"
                                                        value={formData.cardNumber}
                                                        onChange={handleInputChange}
                                                        className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all border-gray-300"
                                                        placeholder="XXXX XXXX XXXX XXXX"
                                                        maxLength="19"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 mb-4">
                                                <div>
                                                    <label className="block text-gray-700 font-medium mb-2">Itariki Izarangiriraho</label>
                                                    <input
                                                        type="text"
                                                        name="cardExpiry"
                                                        value={formData.cardExpiry}
                                                        onChange={handleInputChange}
                                                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all border-gray-300"
                                                        placeholder="MM/YY"
                                                        maxLength="5"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-700 font-medium mb-2">CVC</label>
                                                    <input
                                                        type="text"
                                                        name="cardCvc"
                                                        value={formData.cardCvc}
                                                        onChange={handleInputChange}
                                                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all border-gray-300"
                                                        placeholder="123"
                                                        maxLength="3"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex items-center mb-2">
                                                <Shield size={18} className="text-gray-500 mr-2" />
                                                <p className="text-gray-600 text-sm">Amakuru yawe arindwa na uburyo bwo kurinda bukomeye</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="mb-6">
                                <div className="bg-sky-50 p-4 rounded-lg border border-sky-200 flex items-start">
                                    <div className="mt-1 mr-3 text-sky-500">
                                        <Shield size={18} />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-sky-700 mb-1">Kugenzura Kwishyura</h4>
                                        <p className="text-sky-600 text-sm">
                                            Amakuru yose ashyizwe muri iyi form akoreshwa gusa mu kwishyura no kuguha ubunyamuryango bwawe.
                                            Ntabwo tuzagurisha cyangwa gusangiza amakuru yawe n'abandi.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row justify-between gap-4">
                                <button
                                    type="button"
                                    onClick={goBack}
                                    className="py-3 px-6 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center"
                                >
                                    <ArrowLeft className="mr-2" size={18} />
                                    Gusubira Inyuma
                                </button>

                                <button
                                    type="button"
                                    onClick={handlePaymentSubmit}
                                    className="py-3 px-6 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-colors duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center">
                                            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                                            Tegereza...
                                        </div>
                                    ) : (
                                        <>
                                            Kwishyura Ubu
                                            <ArrowRight className="ml-2" size={18} />
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Payment Complete */}
                {step === 3 && paymentComplete && (
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle size={40} className="text-green-500" />
                            </div>

                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Kwishyura Byagenze Neza!</h3>
                            <p className="text-gray-600 mb-6">
                                Murakoze kwishyura ubunyamuryango bwa TopInfo {plans[selectedPlan].name}. Ubu ushobora kubona discounts ku bigo byinshi mu Rwanda hose.
                            </p>

                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
                                <h4 className="font-bold text-gray-900 mb-4">Incamake y'Ubunyamuryango</h4>

                                <div className="flex justify-between py-2 border-b border-gray-200">
                                    <span className="text-gray-600">Igiciro</span>
                                    <span className="font-medium">{plans[selectedPlan].price} RWF</span>
                                </div>

                                <div className="flex justify-between py-2 border-b border-gray-200">
                                    <span className="text-gray-600">Ubwoko bw'Ubunyamuryango</span>
                                    <span className="font-medium">{plans[selectedPlan].name}</span>
                                </div>

                                <div className="flex justify-between py-2 border-b border-gray-200">
                                    <span className="text-gray-600">Uburyo bwo Kwishyura</span>
                                    <span className="font-medium">
                                        {formData.paymentMethod === 'momo' ? 'MTN MoMo' :
                                            formData.paymentMethod === 'airtel' ? 'Airtel Money' : 'Visa/Mastercard'}
                                    </span>
                                </div>

                                <div className="flex justify-between py-2">
                                    <span className="text-gray-600">Itariki</span>
                                    <span className="font-medium">{new Date().toLocaleDateString()}</span>
                                </div>
                            </div>

                            <p className="text-gray-600 mb-8">
                                Twohereje email ikubiyemo amakuru y'ubunyamuryango bwawe kuri {formData.email}. Ushobora no kubona ubunyamuryango bwawe kuri dashboard.
                            </p>

                            <button
                                onClick={goToDashboard}
                                className="py-3 px-6 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-colors duration-300 shadow-md hover:shadow-lg flex items-center justify-center mx-auto"
                            >
                                Kujya kuri Dashboard
                                <ArrowRight className="ml-2" size={18} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default JoinMembershipPage;