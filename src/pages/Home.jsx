// import React, { useState, useEffect } from 'react';
// import { Helmet } from 'react-helmet';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import {
//   Search, Shield, Sparkles, Users, ArrowRight, CheckCircle,
//   Globe, Star, Headphones, BookOpen, MessageCircle,
//   Gift, CreditCard, Award, ChevronRight,
//   XCircle
// } from 'lucide-react';

// import HeroImg from "./../assets/img/kcc.jpg";

// import SearchImg from "./../assets/img/search.jpg";
// import Fill from "./../assets/img/fill.jpg";
// import Shake from "./../assets/img/shake.jpg";

// const Home = () => {
//   const [activeTab, setActiveTab] = useState('service-seekers');
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   return (
//     <>
//       <Helmet>
//         <title>TopInfo Rwanda | Shakisha Serivisi Mu Rwanda</title>
//         <meta name="description" content="TopInfo ni urubuga ruhuza abakeneye na batanga serivisi mu Rwanda. Shakisha cyangwa utange serivisi byoroshye kandi bwihuse." />

//         <meta property="og:title" content="TopInfo Rwanda - Shakisha Serivisi" />
//         <meta property="og:description" content="TopInfo ni urubuga ruhuza abakeneye serivisi n'abazitanga." />
//         <meta property="og:image" content="https://topinfo.rw/logo.jpg" />
//         <meta property="og:url" content="https://topinfo.rw" />

//         {/* Additional meta tags for SEO */}
//         <meta name="keywords" content="serivisi rwanda, gusaba serivisi, gutanga serivisi, urubuga rwa serivisi rwanda, professional services rwanda, service marketplace rwanda, Membership Club rwanda" />
//         <meta name="robots" content="index, follow" />
//         <link rel="canonical" href="https://topinfo.rw" />

//         {/* Structured data for better search results */}
//         <script type="application/ld+json">
//           {JSON.stringify({
//             "@context": "https://schema.org",
//             "@type": "WebApplication",
//             "name": "TopInfo Rwanda",
//             "url": "https://topinfo.rw",
//             "description": "Urubuga ruhuza abakeneye serivisi n'abazitanga mu Rwanda",
//             "applicationCategory": "ServiceMarketplace",
//             "offers": {
//               "@type": "Offer",
//               "category": [
//                 "Gusaba Serivisi",
//                 "Gutanga Serivisi",
//                 "Membership Club"
//               ]
//             }
//           })}
//         </script>
//       </Helmet>
//       <div className="min-h-screen bg-gray-50">
//         {/* Improved Hero Section */}

//         <div className="relative bg-gradient-to-br from-slate-600 via-slate-500 to-slate-400 overflow-hidden py-32">
//           {/* Hero background with enhanced overlay */}
//           <div className="absolute inset-0 z-0">
//             <div className="absolute inset-0 bg-slate-700/70 mix-blend-multiply"></div>
//             <img
//               loading='lazy'
//               src={HeroImg}
//               alt="Background"
//               className="absolute inset-0 w-full h-full object-cover opacity-20 object-center"
//             />
//           </div>

//           {/* Animated gradient blobs - adjusted colors for better blend */}
//           <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-slate-500/40 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob"></div>
//           <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-slate-300/40 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
//           <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-slate-500/30 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

//           {/* Content container with fade-in animation */}
//           <div className={`relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
//             <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
//               <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
//                 TopInfo <span className="block mt-2 text-slate-100">Urubuga ruhuza Abakeneye</span> <span className='mt-2 pt-3'>Serivisi n'abazitanga</span>
//               </h1>

//               <p className="text-xl md:text-2xl text-slate-100 mb-10 max-w-4xl mx-auto">
//                 Duhuza abakeneye serivisi n'abazitanga mu buryo bworoshye, bwihuse kandi bwizewe.
//               </p>

//               <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 flex-wrap">
//                 <Link
//                   to="/services"
//                   className="px-6 md:px-10 py-4 md:py-5 bg-white text-slate-700 rounded-xl hover:bg-slate-50 transition-all duration-300 text-lg font-bold shadow-lg hover:shadow-2xl flex items-center justify-center group"
//                 >
//                   <span>Gusaba Serivisi</span>
//                   <ArrowRight className="ml-2 md:ml-3 transform group-hover:translate-x-1 transition-transform" size={20} />
//                 </Link>

//                 <Link
//                   to="/become-provider"
//                   className="px-6 md:px-10 py-4 md:py-5 bg-slate-500 text-white rounded-xl hover:bg-slate-600 transition-all duration-300 text-lg font-bold shadow-lg hover:shadow-2xl flex items-center justify-center group"
//                 >
//                   <span>Gutanga Serivisi</span>
//                   <ArrowRight className="ml-2 md:ml-3 transform group-hover:translate-x-1 transition-transform" size={20} />
//                 </Link>

//                 <Link
//                   to="/membership-club"
//                   className="px-6 md:px-10 py-4 md:py-5 bg-gradient-to-r from-teal-600 to-teal-600 text-white rounded-xl hover:from-teal-700 hover:to-teal-700 transition-all duration-300 text-lg font-bold shadow-lg hover:shadow-2xl flex items-center justify-center group"
//                 >
//                   <span>Membership Club</span>
//                   <ArrowRight className="ml-2 md:ml-3 transform group-hover:translate-x-1 transition-transform" size={20} />
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>


//         {/* Premium Membership Club Section */}
//         <div className="bg-gradient-to-l from-slate-100 to-slate-200 py-24">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="text-center mb-16">
//               <div className="inline-flex items-center justify-center bg-gradient-to-r from-slate-600 to-slate-400 text-white text-sm font-bold py-2 px-6 rounded-full mb-6 shadow-md">
//                 <Gift className="mr-2" size={20} />
//                 EXCLUSIVE MEMBERSHIP
//               </div>
//               <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
//                 <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-600 to-slate-400">TopInfo Club</span> Benefits
//               </h2>
//               <p className="text-xl text-slate-600 max-w-3xl mx-auto">
//                 "Save more than you pay!" <span className="font-bold text-slate-700">Unbeatable value in Rwanda!</span><br />
//                 Join now for exclusive discounts from our trusted providers!
//               </p>
//             </div>

//             <div className="grid md:grid-cols-4 gap-8">
//               {/* Silver Tier */}
//               <div className="bg-white rounded-3xl shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 group relative overflow-hidden">
//                 <div className="absolute inset-x-0 top-0 h-2 bg-slate-200"></div>
//                 <div className="p-6">
//                   <div className="flex justify-center mb-6">
//                     <div className="bg-gradient-to-br from-slate-100 to-slate-200 p-4 rounded-full shadow-inner group-hover:from-slate-200 group-hover:to-slate-300 transition-all">
//                       <Award className="text-slate-500" size={36} />
//                     </div>
//                   </div>
//                   <h3 className="text-2xl font-bold text-center mb-3 text-slate-700">Silver</h3>
//                   <div className="text-center mb-5">
//                     <span className="text-3xl font-extrabold text-slate-800">RWF 10,000</span>
//                     <span className="block text-slate-500 text-sm">per month</span>
//                   </div>
//                   <ul className="space-y-3 mb-8">
//                     <li className="flex items-start">
//                       <CheckCircle className="text-green-500 mr-3 mt-0.5 flex-shrink-0" size={18} />
//                       <span className="text-slate-600">Basic Services Access</span>
//                     </li>
//                     <li className="flex items-start">
//                       <CheckCircle className="text-green-500 mr-3 mt-0.5 flex-shrink-0" size={18} />
//                       <span className="text-slate-600">Digital Member Card</span>
//                     </li>
//                     <li className="flex items-start opacity-50">
//                       <XCircle className="text-slate-300 mr-3 mt-0.5 flex-shrink-0" size={18} />
//                       <span className="text-slate-400">Premium Services</span>
//                     </li>
//                     <li className="flex items-start opacity-50">
//                       <XCircle className="text-slate-300 mr-3 mt-0.5 flex-shrink-0" size={18} />
//                       <span className="text-slate-400">VIP Support</span>
//                     </li>
//                   </ul>
//                   <Link
//                     to="/discount-club/join"
//                     className="block w-full py-3 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-center font-semibold transition-all duration-300 flex items-center justify-center group-hover:shadow-md"
//                   >
//                     Get Started
//                     <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
//                   </Link>
//                 </div>
//               </div>

//               {/* Gold Tier */}
//               <div className="bg-white rounded-3xl shadow-xl border border-amber-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 group relative overflow-hidden">
//                 <div className="absolute inset-x-0 top-0 h-2 bg-amber-400"></div>
//                 <div className="p-6">
//                   <div className="flex justify-center mb-6">
//                     <div className="bg-gradient-to-br from-amber-100 to-amber-200 p-4 rounded-full shadow-inner group-hover:from-amber-200 group-hover:to-amber-300 transition-all">
//                       <Award className="text-amber-600" size={36} />
//                     </div>
//                   </div>
//                   <h3 className="text-2xl font-bold text-center mb-3 text-slate-700">Gold</h3>
//                   <div className="text-center mb-5">
//                     <span className="text-3xl font-extrabold text-slate-800">RWF 45,000</span>
//                     <span className="block text-slate-500 text-sm">for 3 months</span>
//                   </div>
//                   <ul className="space-y-3 mb-8">
//                     <li className="flex items-start">
//                       <CheckCircle className="text-green-500 mr-3 mt-0.5 flex-shrink-0" size={18} />
//                       <span className="text-slate-600">All Services Access</span>
//                     </li>
//                     <li className="flex items-start">
//                       <CheckCircle className="text-green-500 mr-3 mt-0.5 flex-shrink-0" size={18} />
//                       <span className="text-slate-600">Extra Coupons</span>
//                     </li>
//                     <li className="flex items-start">
//                       <CheckCircle className="text-green-500 mr-3 mt-0.5 flex-shrink-0" size={18} />
//                       <span className="text-slate-600">Members Community</span>
//                     </li>
//                     <li className="flex items-start opacity-50">
//                       <XCircle className="text-slate-300 mr-3 mt-0.5 flex-shrink-0" size={18} />
//                       <span className="text-slate-400">VIP Support</span>
//                     </li>
//                   </ul>
//                   <Link
//                     to="/discount-club/join/gold"
//                     className="block w-full py-3 px-6 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-center font-semibold transition-all duration-300 flex items-center justify-center group-hover:shadow-md"
//                   >
//                     Most Popular
//                     <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
//                   </Link>
//                 </div>
//               </div>

//               {/* Platinum Tier */}
//               <div className="bg-white rounded-3xl shadow-xl border border-slate-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 group relative overflow-hidden">
//                 <div className="absolute inset-x-0 top-0 h-2 bg-slate-500"></div>
//                 <div className="p-6">
//                   <div className="flex justify-center mb-6">
//                     <div className="bg-gradient-to-br from-slate-200 to-slate-300 p-4 rounded-full shadow-inner group-hover:from-slate-300 group-hover:to-slate-400 transition-all">
//                       <Award className="text-slate-700" size={36} />
//                     </div>
//                   </div>
//                   <h3 className="text-2xl font-bold text-center mb-3 text-slate-700">Platinum</h3>
//                   <div className="text-center mb-5">
//                     <span className="text-3xl font-extrabold text-slate-800">RWF 80,000</span>
//                     <span className="block text-slate-500 text-sm">for 6 months</span>
//                   </div>
//                   <ul className="space-y-3 mb-8">
//                     <li className="flex items-start">
//                       <CheckCircle className="text-green-500 mr-3 mt-0.5 flex-shrink-0" size={18} />
//                       <span className="text-slate-600">Premium Services</span>
//                     </li>
//                     <li className="flex items-start">
//                       <CheckCircle className="text-green-500 mr-3 mt-0.5 flex-shrink-0" size={18} />
//                       <span className="text-slate-600">Basic Tech Support</span>
//                     </li>
//                     <li className="flex items-start">
//                       <CheckCircle className="text-green-500 mr-3 mt-0.5 flex-shrink-0" size={18} />
//                       <span className="text-slate-600">Essential Services</span>
//                     </li>
//                     <li className="flex items-start">
//                       <CheckCircle className="text-green-500 mr-3 mt-0.5 flex-shrink-0" size={18} />
//                       <span className="text-slate-600">Priority Booking</span>
//                     </li>
//                   </ul>
//                   <Link
//                     to="/discount-club/join/platinum"
//                     className="block w-full py-3 px-6 bg-slate-700 hover:bg-slate-800 text-white rounded-xl text-center font-semibold transition-all duration-300 flex items-center justify-center group-hover:shadow-md"
//                   >
//                     Upgrade Now
//                     <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
//                   </Link>
//                 </div>
//               </div>

//               {/* Diamond Tier */}
//               <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-3 group relative overflow-hidden">
//                 <div className="absolute top-0 right-0 bg-gradient-to-r from-slate-600 to-gray-600 text-white text-xs font-bold py-1 px-8 transform rotate-45 translate-x-8 translate-y-6 shadow-lg">
//                   BEST VALUE
//                 </div>
//                 <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-slate-500 to-gray-500"></div>
//                 <div className="p-6">
//                   <div className="flex justify-center mb-6">
//                     <div className="bg-gradient-to-br from-slate-100 to-gray-100 p-4 rounded-full shadow-inner group-hover:from-slate-200 group-hover:to-gray-200 transition-all">
//                       <Award className="text-slate-600" size={36} />
//                     </div>
//                   </div>
//                   <h3 className="text-2xl font-bold text-center mb-3 text-slate-700">Diamond</h3>
//                   <div className="text-center mb-5">
//                     <span className="text-3xl font-extrabold text-slate-800">RWF 140,000</span>
//                     <span className="block text-slate-500 text-sm">for 1 year</span>
//                   </div>
//                   <ul className="space-y-3 mb-8">
//                     <li className="flex items-start">
//                       <CheckCircle className="text-green-500 mr-3 mt-0.5 flex-shrink-0" size={18} />
//                       <span className="text-slate-600">VIP Services Access</span>
//                     </li>
//                     <li className="flex items-start">
//                       <CheckCircle className="text-green-500 mr-3 mt-0.5 flex-shrink-0" size={18} />
//                       <span className="text-slate-600">Complete Information</span>
//                     </li>
//                     <li className="flex items-start">
//                       <CheckCircle className="text-green-500 mr-3 mt-0.5 flex-shrink-0" size={18} />
//                       <span className="text-slate-600">VIP Support</span>
//                     </li>
//                     <li className="flex items-start">
//                       <CheckCircle className="text-green-500 mr-3 mt-0.5 flex-shrink-0" size={18} />
//                       <span className="text-slate-600">Exclusive Gifts</span>
//                     </li>
//                   </ul>
//                   <Link
//                     to="/discount-club/join/diamond"
//                     className="block w-full py-3 px-6 bg-gradient-to-r from-slate-600 to-gray-600 hover:from-slate-700 hover:to-gray-700 text-white rounded-xl text-center font-semibold transition-all duration-300 flex items-center justify-center group-hover:shadow-md"
//                   >
//                     Join Elite
//                     <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
//                   </Link>
//                 </div>
//               </div>
//             </div>

//             <div className="text-center mt-16">
//               <Link
//                 to="/discount-club"
//                 className="inline-flex items-center text-slate-600 hover:text-slate-800 font-medium group transition-all duration-300 border-b border-transparent hover:border-slate-400 pb-1"
//               >
//                 Compare all membership benefits
//                 <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Enhanced How It Works Section */}
//         <div className="bg-gradient-to-l from-slate-100 to-slate-200 py-4 mx-auto">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="text-center mb-20">
//               <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Uko Bikorwa</h2>
//               <p className="text-xl text-slate-600 max-w-2xl mx-auto">Uburyo bworoshye bwo gukoresha TopInfo mugihe ushaka service</p>
//             </div>

//             <div className="relative">
//               {/* Progress line */}
//               <div className="hidden md:block absolute top-1/4 left-0 right-0 h-1 bg-slate-200 -z-10"></div>
//               <div className="hidden md:block absolute top-1/4 left-0 h-1 bg-slate-500 -z-10" style={{ width: 'calc(100% / 3 * 2)' }}></div>

//               <div className="grid md:grid-cols-3 gap-8 md:gap-12">
//                 {/* Step 1 */}
//                 <div className="relative group">
//                   <div className="absolute -top-4 -right-4 bg-slate-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold z-10">
//                     1
//                   </div>
//                   <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col">
//                     <div className="mb-6 relative overflow-hidden rounded-xl h-48">
//                       <div className="absolute inset-0 bg-slate-700/30 mix-blend-multiply"></div>
//                       <img
//                         src={SearchImg}
//                         alt="Search for services"
//                         className="w-full h-full object-cover"
//                         loading="lazy"
//                       />
//                       <div className="absolute inset-0 flex items-center justify-center">

//                       </div>
//                     </div>
//                     <h3 className="text-2xl font-bold text-slate-800 mb-4">Shakisha serivisi yose wifuza</h3>
//                     <p className="text-slate-600 mb-6 flex-grow">Shakisha serivisi ukeneye mu buryo bworoshye</p>
//                     <Link
//                       to="/services"
//                       className="mt-auto px-6 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-all duration-300 font-medium shadow-md hover:shadow-lg flex items-center justify-center group"
//                     >
//                       Shakisha serivisi
//                       <ArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" size={18} />
//                     </Link>
//                   </div>
//                 </div>

//                 {/* Step 2 */}
//                 <div className="relative group">
//                   <div className="absolute -top-4 -right-4 bg-slate-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold z-10">
//                     2
//                   </div>
//                   <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col">
//                     <div className="mb-6 relative overflow-hidden rounded-xl h-48">
//                       <div className="absolute inset-0 bg-slate-700/30 mix-blend-multiply"></div>
//                       <img
//                         src={Fill}
//                         alt="Fill information"
//                         className="w-full h-full object-cover"
//                         loading="lazy"
//                       />
//                       <div className="absolute inset-0 flex items-center justify-center">

//                       </div>
//                     </div>
//                     <h3 className="text-2xl font-bold text-slate-800 mb-4">Uzuza amakuru yose usabwa</h3>
//                     <p className="text-slate-600 mb-6 flex-grow">Uzuza amakuru ajyanye na Serivisi usaba muri TopInfo</p>
//                     <div className="mt-auto">
//                       <div className="h-10"></div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Step 3 */}
//                 <div className="relative group">
//                   <div className="absolute -top-4 -right-4 bg-slate-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold z-10">
//                     3
//                   </div>
//                   <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col">
//                     <div className="mb-6 relative overflow-hidden rounded-xl h-48">
//                       <div className="absolute inset-0 bg-slate-700/30 mix-blend-multiply"></div>
//                       <img
//                         src={Shake}
//                         alt="Connect with professional"
//                         className="w-full h-full object-cover"
//                         loading="lazy"
//                       />

//                     </div>
//                     <h3 className="text-2xl font-bold text-slate-800 mb-4">Huzwa n'umunyamwuga</h3>
//                     <p className="text-slate-600 mb-6 flex-grow">Huzwa n'umunyamwuga wizewe utanga servisi ushaka vuba</p>
//                     <div className="mt-auto">
//                       <div className="h-10"></div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Improved Featured Deals Section */}
//         <div className="bg-gradient-to-l from-slate-100 to-slate-200 py-4 w-full justify-items-center">
//           <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 bg-slate-300 py-20 mx-5 rounded-2xl mt-5">
//             <div className="text-center mb-16">
            
//               <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Kugura Bike, Ubona Byinshi</h2>
//               <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//                 Dore zimwe muri serivisi n'ibicuruzwa dufitiye <span className="font-bold text-slate-600">discounts zihambaye</span> kubanyamuryango
//               </p>
//             </div>

//             <div className="grid md:grid-cols-3 gap-8">
//               {/* Featured Deal 1 - Enhanced */}
//               <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
//                 <div className="h-48 bg-gradient-to-r from-slate-50 to-slate-50 relative overflow-hidden">
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300 group-hover:text-slate-400 transition-colors">
//                       <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
//                       <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
//                       <line x1="6" y1="1" x2="6" y2="4"></line>
//                       <line x1="10" y1="1" x2="10" y2="4"></line>
//                       <line x1="14" y1="1" x2="14" y2="4"></line>
//                     </svg>
//                   </div>
//                   <div className="absolute top-0 right-0 bg-gradient-to-r from-slate-500 to-slate-500 text-white text-xs font-bold py-2 px-4 rounded-bl-lg shadow-md">
//                     GOLD & UP
//                   </div>
//                 </div>
//                 <div className="p-6">
//                   <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-slate-600 transition-colors">🏋️ FitZone Gym - 20% off</h3>
//                   <p className="text-gray-600 mb-4">Kugabanyirizwa ikiguzi cya Gym ukwezi kwa 20%. Kuri members ba Gold na Diamond</p>
//                   <div className="flex items-center justify-between">
//                     <span className="text-slate-600 font-medium flex items-center">
//                       <Globe size={16} className="mr-1" />
//                       Kicukiro
//                     </span>
//                     <Link to="/deals/fitzone" className="text-slate-600 hover:text-slate-700 font-medium group-hover:underline flex items-center">
//                       Reba Ibisobanuro
//                       <ChevronRight className="ml-1 transform group-hover:translate-x-1 transition-transform" size={16} />
//                     </Link>
//                   </div>
//                 </div>
//               </div>

//               {/* Featured Deal 2 - Enhanced */}
//               <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
//                 <div className="h-48 bg-gradient-to-r from-green-50 to-teal-50 relative overflow-hidden">
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-300 group-hover:text-green-400 transition-colors">
//                       <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
//                       <path d="M14 2v6h6"></path>
//                       <path d="M16 13H8"></path>
//                       <path d="M16 17H8"></path>
//                       <path d="M10 9H8"></path>
//                     </svg>
//                   </div>
//                   <div className="absolute top-0 right-0 bg-gradient-to-r from-green-500 to-teal-500 text-white text-xs font-bold py-2 px-4 rounded-bl-lg shadow-md">
//                     ALL MEMBERS
//                   </div>
//                 </div>
//                 <div className="p-6">
//                   <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">🍽️ Pizza World - Buy 1 Get 1 Free</h3>
//                   <p className="text-gray-600 mb-4">Gura imwe uhabwe indi ubuntu. Serivisi iboneka ku banyamuryango bose.</p>
//                   <div className="flex items-center justify-between">
//                     <span className="text-green-600 font-medium flex items-center">
//                       <Globe size={16} className="mr-1" />
//                       Kigali City Tower
//                     </span>
//                     <Link to="/deals/pizza-world" className="text-green-600 hover:text-green-700 font-medium group-hover:underline flex items-center">
//                       Reba Ibisobanuro
//                       <ChevronRight className="ml-1 transform group-hover:translate-x-1 transition-transform" size={16} />
//                     </Link>
//                   </div>
//                 </div>
//               </div>

//               {/* Featured Deal 3 - Enhanced */}
//               <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
//                 <div className="h-48 bg-gradient-to-r from-gray-50 to-slate-50 relative overflow-hidden">
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300 group-hover:text-gray-400 transition-colors">
//                       <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
//                       <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
//                     </svg>
//                   </div>
//                   <div className="absolute top-0 right-0 bg-gradient-to-r from-gray-500 to-slate-500 text-white text-xs font-bold py-2 px-4 rounded-bl-lg shadow-md">
//                     PLATINUM & UP
//                   </div>
//                 </div>
//                 <div className="p-6">
//                   <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">👨‍⚕️ City Clinic - 30% off checkup</h3>
//                   <p className="text-gray-600 mb-4">Kugabanyirizwa ku ipimwa rusange 30%. Platinum na Diamond gusa.</p>
//                   <div className="flex items-center justify-between">
//                     <span className="text-gray-600 font-medium flex items-center">
//                       <Globe size={16} className="mr-1" />
//                       Nyarutarama
//                     </span>
//                     <Link to="/deals/city-clinic" className="text-gray-600 hover:text-gray-700 font-medium group-hover:underline flex items-center">
//                       Reba Ibisobanuro
//                       <ChevronRight className="ml-1 transform group-hover:translate-x-1 transition-transform" size={16} />
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="text-center mt-12">
//               <Link to="/all-deals" className="px-8 py-4 bg-gradient-to-r from-slate-500 to-slate-500 text-white rounded-xl hover:from-slate-600 hover:to-slate-600 transition-all duration-300 font-medium inline-flex items-center shadow-lg hover:shadow-xl transform hover:scale-105">
//                 Reba ibicuruzwa byose
//                 <ArrowRight className="ml-2" size={20} />
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Improved FAQ Section */}
//         <div className="bg-gradient-to-l from-slate-100 to-slate-200 py-20">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="text-center mb-16">
              
//               <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">FAQ</h2>
//               <p className="text-xl text-gray-600">Ibibazo bikunze kubazwa</p>
//             </div>

//             <div className="grid md:grid-cols-2 gap-8">
//               {/* FAQ Item 1 - Enhanced */}
//               <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-slate-500">
//                 <h3 className="text-2xl font-bold mb-4 flex items-center text-gray-900">
//                   <span className="text-slate-500 mr-3">01</span>
//                   Nshobora gusaba serivisi gute?
//                 </h3>
//                 <p className="text-gray-600 pl-9">Shakisha serivisi ukeneye, wuzuzemo amakuru usabwa, uhite uhuzwa umunyamwuga. Byoroshye kandi byihuse!</p>
//               </div>

//               {/* FAQ Item 2 - Enhanced */}
//               <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-slate-500">
//                 <h3 className="text-2xl font-bold mb-4 flex items-center text-gray-900">
//                   <span className="text-slate-500 mr-3">02</span>
//                   Nshobora gutanga serivisi gute?
//                 </h3>
//                 <p className="text-gray-600 pl-9">Fungura konti nk'utanga serivisi, hanyuma uterangire guha serivisi abakiliya binyuze muri TopInfo. Kubona abakiliya byihuse!</p>
//               </div>

//               {/* FAQ Item 3 - Enhanced */}
//               <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-slate-500">
//                 <h3 className="text-2xl font-bold mb-4 flex items-center text-gray-900">
//                   <span className="text-slate-500 mr-3">03</span>
//                   Nshobora kujya muri Membership Club gute?
//                 </h3>
//                 <p className="text-gray-600 pl-9">Toranya uburyo bwo kwiyandikisha wishyura, ugahita ubona ikarita y'umunyamuryango. Urangije ushobora gukoresha discounts zacu amasaha 24/7.</p>
//               </div>

//               {/* FAQ Item 4 - Enhanced */}
//               <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-slate-500">
//                 <h3 className="text-2xl font-bold mb-4 flex items-center text-gray-900">
//                   <span className="text-slate-500 mr-3">04</span>
//                   Nyuma yo kuba umunyamuryango ni iki gikurikira?
//                 </h3>
//                 <p className="text-gray-600 pl-9">Ufite ikarita y'umunyamuryango igendanwa kuri telefone, uyerekana kugirango ubone discounts ku bicuruzwa cyangwa serivisi wifuza. Uhita ubona agaciro kuri buri serivisi!</p>
//               </div>
//             </div>

//           </div>
//         </div>

//         {/* Improved Trust and Security Section */}
//         <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-gradient-to-l from-slate-100 to-slate-200">
//           <div className="grid md:grid-cols-2 gap-16 px-20 items-center">
//             <div className="order-2 md:order-1">
//               <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Umutekano & Icyizere</h2>
//               <p className="text-xl text-gray-600 mb-8">
//                 Dufatanya n'abakora umwuga bemewe kugirango uhabwe serivisi nziza kandi zizahajwe.
//               </p>
//               <ul className="space-y-6">
//                 <li className="flex items-start">
//                   <div className="bg-slate-100 p-2 rounded-full mr-4 mt-1">
//                     <CheckCircle className="text-slate-600" size={20} />
//                   </div>
//                   <div>
//                     <h3 className="font-bold text-gray-900 mb-1">Tugenzura abatanga serivisi</h3>
//                     <p className="text-gray-600">Abatanga serivisi bose bagenzurwa mbere yo gutangira gukora</p>
//                   </div>
//                 </li>
//                 <li className="flex items-start">
//                   <div className="bg-slate-100 p-2 rounded-full mr-4 mt-1">
//                     <Shield className="text-slate-600" size={20} />
//                   </div>
//                   <div>
//                     <h3 className="font-bold text-gray-900 mb-1">Kurinda amakuru yawe</h3>
//                     <p className="text-gray-600">Amakuru yawe yose abikwa mu buryo butekanye kandi bwizewe</p>
//                   </div>
//                 </li>
//                 <li className="flex items-start">
//                   <div className="bg-slate-100 p-2 rounded-full mr-4 mt-1">
//                     <Star className="text-slate-600" size={20} />
//                   </div>
//                   <div>
//                     <h3 className="font-bold text-gray-900 mb-1">Serivisi zizewe</h3>
//                     <p className="text-gray-600">Abanyamwuga badufasha ni beza kandi bizigamye mu mirimo yabo</p>
//                   </div>
//                 </li>
//                 <li className="flex items-start">
//                   <div className="bg-slate-100 p-2 rounded-full mr-4 mt-1">
//                     <Gift className="text-slate-600" size={20} />
//                   </div>
//                   <div>
//                     <h3 className="font-bold text-gray-900 mb-1">Discounts zinewe cyane</h3>
//                     <p className="text-gray-600">Urabona ibiciro byiza ku bazana serivisi bakorana natwe</p>
//                   </div>
//                 </li>
//               </ul>
//             </div>

//             <div className="order-1 md:order-2 bg-gradient-to-br from-slate-50 to-slate-50 rounded-2xl p-10 shadow-lg transform hover:rotate-1 transition-all duration-500 hover:shadow-xl">
//               <div className="bg-white/70 backdrop-blur-md rounded-xl p-8 shadow-inner flex flex-col items-center">
//                 <div className="bg-slate-100 p-4 rounded-full mb-6 shadow-md">
//                   <Shield className="text-slate-600" size={64} />
//                 </div>
//                 <h3 className="text-2xl font-bold text-center text-gray-900 mb-4">Umutekano Wawe ni Ingenzi</h3>
//                 <p className="text-center text-gray-600 mb-6">
//                   Amakuru yawe abikwa mu buryo bwizewe. Tugenzura buri serivisi n'utanga serivisi.
//                 </p>
//                 <Link to="/security" className="px-6 py-3 bg-slate-500 text-white rounded-xl hover:bg-slate-600 transition-all duration-300 font-medium flex items-center shadow-md hover:shadow-lg">
//                   Menya byinshi
//                   <ArrowRight className="ml-2" size={18} />
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>

      

//         {/* New Call to Action Section */}
//         <div className="bg-gradient-to-r from-slate-500 to-slate-600 py-20">
//           <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//             <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Tangira Nonaha!</h2>
//             <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
//               Tega amatwi muri TopInfo maze ubundi ufate uburyo budasanzwe bwo gusaba no gutanga serivisi mu Rwanda.
//             </p>

//             <div className="flex flex-col md:flex-row justify-center gap-6">
//               <Link
//                 to="/services"
//                 className="px-10 py-5 bg-white text-slate-600 rounded-xl hover:bg-slate-50 transition-all duration-300 text-lg font-bold shadow-xl hover:shadow-2xl flex items-center justify-center group transform hover:scale-105"
//               >
//                 Gusaba Serivisi
//                 <ArrowRight className="ml-3 transform group-hover:translate-x-1 transition-transform" size={24} />
//               </Link>
//               <Link
//                 to="/become-provider"
//                 className="px-10 py-5 bg-slate-800 text-white rounded-xl hover:bg-slate-900 transition-all duration-300 text-lg font-bold shadow-xl hover:shadow-2xl flex items-center justify-center group transform hover:scale-105"
//               >
//                 Gutanga Serivisi
//                 <ArrowRight className="ml-3 transform group-hover:translate-x-1 transition-transform" size={24} />
//               </Link>
//               <Link
//                 to="/discount-club/join"
//                 className="px-10 py-5 bg-slate-800 text-white rounded-xl hover:bg-slate-900 transition-all duration-300 text-lg font-bold shadow-xl hover:shadow-2xl flex items-center justify-center group transform hover:scale-105"
//               >
//                 Jyamo Muri Membership Club
//                 <ArrowRight className="ml-3 transform group-hover:translate-x-1 transition-transform" size={24} />
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Add animations */}
//         <style jsx>{`
//           @keyframes blob {
//             0%, 100% { transform: translate(0, 0) scale(1); }
//             25% { transform: translate(20px, -30px) scale(1.1); }
//             50% { transform: translate(-20px, 20px) scale(0.9); }
//             75% { transform: translate(30px, 30px) scale(1.05); }
//           }
          
//           .animate-blob {
//             animation: blob 15s infinite;
//           }
          
//           .animation-delay-2000 {
//             animation-delay: 2000ms;
//           }
          
//           .animation-delay-4000 {
//             animation-delay: 4000ms;
//           }
//         `}</style>
//       </div>
//     </>
//   );
// };

// export default Home;

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Search, Shield, Sparkles, Users, ArrowRight, CheckCircle,
  Globe, Star, Headphones, BookOpen, MessageCircle,
  Gift, CreditCard, Award, ChevronRight,
  XCircle
} from 'lucide-react';

import HeroImg from "./../assets/img/kcc.jpg";
import SearchImg from "./../assets/img/search.jpg";
import Fill from "./../assets/img/fill.jpg";
import Shake from "./../assets/img/shake.jpg";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const fadeInUp = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 0.77, 0.47, 0.97]
    }
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const scaleUp = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const AnimatedSection = ({ children, className = "", variants = fadeInUp, ...props }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

const Home = () => {
  const [activeTab, setActiveTab] = useState('service-seekers');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <Helmet>
        <title>TopInfo Rwanda | Shakisha Serivisi Mu Rwanda</title>
        <meta name="description" content="TopInfo ni urubuga ruhuza abakeneye na batanga serivisi mu Rwanda. Shakisha cyangwa utange serivisi byoroshye kandi bwihuse." />

        <meta property="og:title" content="TopInfo Rwanda - Shakisha Serivisi" />
        <meta property="og:description" content="TopInfo ni urubuga ruhuza abakeneye serivisi n'abazitanga." />
        <meta property="og:image" content="https://topinfo.rw/logo.jpg" />
        <meta property="og:url" content="https://topinfo.rw" />

        {/* Additional meta tags for SEO */}
        <meta name="keywords" content="serivisi rwanda, gusaba serivisi, gutanga serivisi, urubuga rwa serivisi rwanda, professional services rwanda, service marketplace rwanda, Membership Club rwanda" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://topinfo.rw" />

        {/* Structured data for better search results */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "TopInfo Rwanda",
            "url": "https://topinfo.rw",
            "description": "Urubuga ruhuza abakeneye serivisi n'abazitanga mu Rwanda",
            "applicationCategory": "ServiceMarketplace",
            "offers": {
              "@type": "Offer",
              "category": [
                "Gusaba Serivisi",
                "Gutanga Serivisi",
                "Membership Club"
              ]
            }
          })}
        </script>
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        {/* Improved Hero Section */}
        <div className="relative bg-gradient-to-br from-slate-600 via-slate-500 to-slate-400 overflow-hidden py-32">
          {/* Hero background with enhanced overlay */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-slate-700/70 mix-blend-multiply"></div>
            <motion.img
              loading='lazy'
              src={HeroImg}
              alt="Background"
              className="absolute inset-0 w-full h-full object-cover opacity-20 object-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              transition={{ duration: 1.5 }}
            />
          </div>

          {/* Animated gradient blobs - adjusted colors for better blend */}
          <motion.div 
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-slate-500/40 rounded-full mix-blend-overlay filter blur-3xl opacity-20"
            animate={{
              x: [0, 20, 0],
              y: [0, -30, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute top-1/3 right-1/4 w-96 h-96 bg-slate-300/40 rounded-full mix-blend-overlay filter blur-3xl opacity-20"
            animate={{
              x: [0, -20, 0],
              y: [0, 20, 0],
              scale: [1, 0.9, 1]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              delay: 2,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-slate-500/30 rounded-full mix-blend-overlay filter blur-3xl opacity-20"
            animate={{
              x: [0, 30, 0],
              y: [0, 30, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              delay: 4,
              ease: "easeInOut"
            }}
          />

          {/* Content container with fade-in animation */}
          <AnimatedSection className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
            <motion.div 
              className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl"
              whileHover={{ scale: 1.01 }}
            >
              <motion.h1 
                className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                TopInfo <span className="block mt-2 text-slate-100">Urubuga ruhuza Abakeneye</span> <span className='mt-2 pt-3'>Serivisi n'abazitanga</span>
              </motion.h1>

              <motion.p 
                className="text-xl md:text-2xl text-slate-100 mb-10 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Duhuza abakeneye serivisi n'abazitanga mu buryo bworoshye, bwihuse kandi bwizewe.
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 flex-wrap"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={itemVariants}>
                  <Link
                    to="/services"
                    className="px-6 md:px-10 py-4 md:py-5 bg-white text-slate-700 rounded-xl hover:bg-slate-50 transition-all duration-300 text-lg font-bold shadow-lg hover:shadow-2xl flex items-center justify-center group"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span>Gusaba Serivisi</span>
                    <ArrowRight className="ml-2 md:ml-3 transform group-hover:translate-x-1 transition-transform" size={20} />
                  </Link>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Link
                    to="/become-provider"
                    className="px-6 md:px-10 py-4 md:py-5 bg-slate-500 text-white rounded-xl hover:bg-slate-600 transition-all duration-300 text-lg font-bold shadow-lg hover:shadow-2xl flex items-center justify-center group"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span>Gutanga Serivisi</span>
                    <ArrowRight className="ml-2 md:ml-3 transform group-hover:translate-x-1 transition-transform" size={20} />
                  </Link>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Link
                    to="/membership-club"
                    className="px-6 md:px-10 py-4 md:py-5 bg-gradient-to-r from-teal-600 to-teal-600 text-white rounded-xl hover:from-teal-700 hover:to-teal-700 transition-all duration-300 text-lg font-bold shadow-lg hover:shadow-2xl flex items-center justify-center group"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span>Membership Club</span>
                    <ArrowRight className="ml-2 md:ml-3 transform group-hover:translate-x-1 transition-transform" size={20} />
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatedSection>
        </div>

        {/* Premium Membership Club Section */}
        <AnimatedSection className="bg-gradient-to-l from-slate-100 to-slate-200 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="inline-flex items-center justify-center bg-gradient-to-r from-slate-600 to-slate-400 text-white text-sm font-bold py-2 px-6 rounded-full mb-6 shadow-md"
                whileHover={{ scale: 1.05 }}
              >
                <Gift className="mr-2" size={20} />
                EXCLUSIVE MEMBERSHIP
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-600 to-slate-400">TopInfo Club</span> Benefits
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                "Save more than you pay!" <span className="font-bold text-slate-700">Unbeatable value in Rwanda!</span><br />
                Join now for exclusive discounts from our trusted providers!
              </p>
            </motion.div>

            <motion.div 
              className="grid md:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* Silver Tier */}
              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <div className="bg-white rounded-3xl shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                  <div className="absolute inset-x-0 top-0 h-2 bg-slate-200"></div>
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex justify-center mb-6">
                      <motion.div 
                        className="bg-gradient-to-br from-slate-100 to-slate-200 p-4 rounded-full shadow-inner hover:from-slate-200 hover:to-slate-300 transition-all"
                        whileHover={{ rotate: 10 }}
                      >
                        <Award className="text-slate-500" size={36} />
                      </motion.div>
                    </div>
                    <h3 className="text-2xl font-bold text-center mb-3 text-slate-700">Silver</h3>
                    <div className="text-center mb-5">
                      <span className="text-3xl font-extrabold text-slate-800">RWF 10,000</span>
                      <span className="block text-slate-500 text-sm">per month</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-start">
                        <CheckCircle className="text-green-500 mr-3 mt-0.5 flex-shrink-0" size={18} />
                        <span className="text-slate-600">Basic Services Access</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="text-green-500 mr-3 mt-0.5 flex-shrink-0" size={18} />
                        <span className="text-slate-600">Digital Member Card</span>
                      </li>
                      <li className="flex items-start opacity-50">
                        <XCircle className="text-slate-300 mr-3 mt-0.5 flex-shrink-0" size={18} />
                        <span className="text-slate-400">Premium Services</span>
                      </li>
                      <li className="flex items-start opacity-50">
                        <XCircle className="text-slate-300 mr-3 mt-0.5 flex-shrink-0" size={18} />
                        <span className="text-slate-400">VIP Support</span>
                      </li>
                    </ul>
                    <div className="mt-auto">
                      <Link
                        to="/discount-club/join"
                        className="block w-full py-3 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-center font-semibold transition-all duration-300 flex items-center justify-center hover:shadow-md"
                      >
                        Get Started
                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Gold Tier */}
              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <div className="bg-white rounded-3xl shadow-xl border border-amber-100 hover:shadow-2xl transition-all duration-300 h-full flex flex-col relative">
                  <div className="absolute inset-x-0 top-0 h-2 bg-amber-400"></div>
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex justify-center mb-6">
                      <motion.div 
                        className="bg-gradient-to-br from-amber-100 to-amber-200 p-4 rounded-full shadow-inner hover:from-amber-200 hover:to-amber-300 transition-all"
                        whileHover={{ rotate: 10 }}
                      >
                        <Award className="text-amber-600" size={36} />
                      </motion.div>
                    </div>
                    <h3 className="text-2xl font-bold text-center mb-3 text-slate-700">Gold</h3>
                    <div className="text-center mb-5">
                      <span className="text-3xl font-extrabold text-slate-800">RWF 45,000</span>
                      <span className="block text-slate-500 text-sm">for 3 months</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-start">
                        <CheckCircle className="text-green-500 mr-3 mt-0.5 flex-shrink-0" size={18} />
                        <span className="text-slate-600">All Services Access</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="text-green-500 mr-3 mt-0.5 flex-shrink-0" size={18} />
                        <span className="text-slate-600">Extra Coupons</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="text-green-500 mr-3 mt-0.5 flex-shrink-0" size={18} />
                        <span className="text-slate-600">Members Community</span>
                      </li>
                      <li className="flex items-start opacity-50">
                        <XCircle className="text-slate-300 mr-3 mt-0.5 flex-shrink-0" size={18} />
                        <span className="text-slate-400">VIP Support</span>
                      </li>
                    </ul>
                    <div className="mt-auto">
                      <Link
                        to="/discount-club/join/gold"
                        className="block w-full py-3 px-6 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-center font-semibold transition-all duration-300 flex items-center justify-center hover:shadow-md"
                      >
                        Most Popular
                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Platinum Tier */}
              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <div className="bg-white rounded-3xl shadow-xl border border-slate-200 hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                  <div className="absolute inset-x-0 top-0 h-2 bg-slate-500"></div>
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex justify-center mb-6">
                      <motion.div 
                        className="bg-gradient-to-br from-slate-200 to-slate-300 p-4 rounded-full shadow-inner hover:from-slate-300 hover:to-slate-400 transition-all"
                        whileHover={{ rotate: 10 }}
                      >
                        <Award className="text-slate-700" size={36} />
                      </motion.div>
                    </div>
                    <h3 className="text-2xl font-bold text-center mb-3 text-slate-700">Platinum</h3>
                    <div className="text-center mb-5">
                      <span className="text-3xl font-extrabold text-slate-800">RWF 80,000</span>
                      <span className="block text-slate-500 text-sm">for 6 months</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-start">
                        <CheckCircle className="text-green-500 mr-3 mt-0.5 flex-shrink-0" size={18} />
                        <span className="text-slate-600">Premium Services</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="text-green-500 mr-3 mt-0.5 flex-shrink-0" size={18} />
                        <span className="text-slate-600">Basic Tech Support</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="text-green-500 mr-3 mt-0.5 flex-shrink-0" size={18} />
                        <span className="text-slate-600">Essential Services</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="text-green-500 mr-3 mt-0.5 flex-shrink-0" size={18} />
                        <span className="text-slate-600">Priority Booking</span>
                      </li>
                    </ul>
                    <div className="mt-auto">
                      <Link
                        to="/discount-club/join/platinum"
                        className="block w-full py-3 px-6 bg-slate-700 hover:bg-slate-800 text-white rounded-xl text-center font-semibold transition-all duration-300 flex items-center justify-center hover:shadow-md"
                      >
                        Upgrade Now
                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Diamond Tier */}
              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 hover:shadow-3xl transition-all duration-300 h-full flex flex-col relative">
                  <motion.div 
                    className="absolute top-0 right-0 bg-gradient-to-r from-slate-600 to-gray-600 text-white text-xs font-bold py-1 px-8 transform rotate-45 translate-x-8 translate-y-6 shadow-lg"
                    whileHover={{ rotate: 50 }}
                  >
                    BEST VALUE
                  </motion.div>
                  <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-slate-500 to-gray-500"></div>
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex justify-center mb-6">
                      <motion.div 
                        className="bg-gradient-to-br from-slate-100 to-gray-100 p-4 rounded-full shadow-inner hover:from-slate-200 hover:to-gray-200 transition-all"
                        whileHover={{ rotate: 10 }}
                      >
                        <Award className="text-slate-600" size={36} />
                      </motion.div>
                    </div>
                    <h3 className="text-2xl font-bold text-center mb-3 text-slate-700">Diamond</h3>
                    <div className="text-center mb-5">
                      <span className="text-3xl font-extrabold text-slate-800">RWF 140,000</span>
                      <span className="block text-slate-500 text-sm">for 1 year</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-start">
                        <CheckCircle className="text-green-500 mr-3 mt-0.5 flex-shrink-0" size={18} />
                        <span className="text-slate-600">VIP Services Access</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="text-green-500 mr-3 mt-0.5 flex-shrink-0" size={18} />
                        <span className="text-slate-600">Complete Information</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="text-green-500 mr-3 mt-0.5 flex-shrink-0" size={18} />
                        <span className="text-slate-600">VIP Support</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="text-green-500 mr-3 mt-0.5 flex-shrink-0" size={18} />
                        <span className="text-slate-600">Exclusive Gifts</span>
                      </li>
                    </ul>
                    <div className="mt-auto">
                      <Link
                        to="/discount-club/join/diamond"
                        className="block w-full py-3 px-6 bg-gradient-to-r from-slate-600 to-gray-600 hover:from-slate-700 hover:to-gray-700 text-white rounded-xl text-center font-semibold transition-all duration-300 flex items-center justify-center hover:shadow-md"
                      >
                        Join Elite
                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div 
              className="text-center mt-16"
              whileHover={{ scale: 1.02 }}
            >
              <Link
                to="/discount-club"
                className="inline-flex items-center text-slate-600 hover:text-slate-800 font-medium group transition-all duration-300 border-b border-transparent hover:border-slate-400 pb-1"
              >
                Compare all membership benefits
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </Link>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Enhanced How It Works Section */}
        <AnimatedSection className="bg-gradient-to-l from-slate-100 to-slate-200 py-4 mx-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Uko Bikorwa</h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">Uburyo bworoshye bwo gukoresha TopInfo mugihe ushaka service</p>
            </motion.div>

            <div className="relative">
              {/* Progress line */}
              <div className="hidden md:block absolute top-1/4 left-0 right-0 h-1 bg-slate-200 -z-10"></div>
              <motion.div 
                className="hidden md:block absolute top-1/4 left-0 h-1 bg-slate-500 -z-10" 
                style={{ width: 'calc(100% / 3 * 2)' }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1.5 }}
                viewport={{ once: true }}
              />

              <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                {/* Step 1 */}
                <motion.div 
                  className="relative group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="absolute -top-4 -right-4 bg-slate-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold z-10">
                    1
                  </div>
                  <motion.div 
                    className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col"
                    whileHover={{ y: -5 }}
                  >
                    <div className="mb-6 relative overflow-hidden rounded-xl h-48">
                      <div className="absolute inset-0 bg-slate-700/30 mix-blend-multiply"></div>
                      <motion.img
                        src={SearchImg}
                        alt="Search for services"
                        className="w-full h-full object-cover"
                        loading="lazy"
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">Shakisha serivisi yose wifuza</h3>
                    <p className="text-slate-600 mb-6 flex-grow">Shakisha serivisi ukeneye mu buryo bworoshye</p>
                    <Link
                      to="/services"
                      className="mt-auto px-6 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-all duration-300 font-medium shadow-md hover:shadow-lg flex items-center justify-center group"
                    >
                      Shakisha serivisi
                      <ArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" size={18} />
                    </Link>
                  </motion.div>
                </motion.div>

                {/* Step 2 */}
                <motion.div 
                  className="relative group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div className="absolute -top-4 -right-4 bg-slate-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold z-10">
                    2
                  </div>
                  <motion.div 
                    className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col"
                    whileHover={{ y: -5 }}
                  >
                    <div className="mb-6 relative overflow-hidden rounded-xl h-48">
                      <div className="absolute inset-0 bg-slate-700/30 mix-blend-multiply"></div>
                      <motion.img
                        src={Fill}
                        alt="Fill information"
                        className="w-full h-full object-cover"
                        loading="lazy"
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">Uzuza amakuru yose usabwa</h3>
                    <p className="text-slate-600 mb-6 flex-grow">Uzuza amakuru ajyanye na Serivisi usaba muri TopInfo</p>
                    <div className="mt-auto">
                      <div className="h-10"></div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Step 3 */}
                <motion.div 
                  className="relative group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="absolute -top-4 -right-4 bg-slate-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold z-10">
                    3
                  </div>
                  <motion.div 
                    className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col"
                    whileHover={{ y: -5 }}
                  >
                    <div className="mb-6 relative overflow-hidden rounded-xl h-48">
                      <div className="absolute inset-0 bg-slate-700/30 mix-blend-multiply"></div>
                      <motion.img
                        src={Shake}
                        alt="Connect with professional"
                        className="w-full h-full object-cover"
                        loading="lazy"
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">Huzwa n'umunyamwuga</h3>
                    <p className="text-slate-600 mb-6 flex-grow">Huzwa n'umunyamwuga wizewe utanga servisi ushaka vuba</p>
                    <div className="mt-auto">
                      <div className="h-10"></div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Improved Featured Deals Section */}
        <AnimatedSection className="bg-gradient-to-l from-slate-100 to-slate-200 py-4 w-full justify-items-center">
          <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 bg-slate-300 py-20 mx-5 rounded-2xl mt-5">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Kugura Bike, Ubona Byinshi</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Dore zimwe muri serivisi n'ibicuruzwa dufitiye <span className="font-bold text-slate-600">discounts zihambaye</span> kubanyamuryango
              </p>
            </motion.div>

            <motion.div 
              className="grid md:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* Featured Deal 1 - Enhanced */}
              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  <div className="h-48 bg-gradient-to-r from-slate-50 to-slate-50 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="64" 
                        height="64" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="text-slate-300 hover:text-slate-400 transition-colors"
                        whileHover={{ scale: 1.1 }}
                      >
                        <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                        <line x1="6" y1="1" x2="6" y2="4"></line>
                        <line x1="10" y1="1" x2="10" y2="4"></line>
                        <line x1="14" y1="1" x2="14" y2="4"></line>
                      </motion.svg>
                    </div>
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-slate-500 to-slate-500 text-white text-xs font-bold py-2 px-4 rounded-bl-lg shadow-md">
                      GOLD & UP
                    </div>
                  </div>
                  <div className="p-6 flex flex-col h-full">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-slate-600 transition-colors">🏋️ FitZone Gym - 20% off</h3>
                    <p className="text-gray-600 mb-4">Kugabanyirizwa ikiguzi cya Gym ukwezi kwa 20%. Kuri members ba Gold na Diamond</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-slate-600 font-medium flex items-center">
                        <Globe size={16} className="mr-1" />
                        Kicukiro
                      </span>
                      <Link to="/deals/fitzone" className="text-slate-600 hover:text-slate-700 font-medium hover:underline flex items-center">
                        Reba Ibisobanuro
                        <ChevronRight className="ml-1 transform hover:translate-x-1 transition-transform" size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Featured Deal 2 - Enhanced */}
              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  <div className="h-48 bg-gradient-to-r from-green-50 to-teal-50 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="64" 
                        height="64" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="text-green-300 hover:text-green-400 transition-colors"
                        whileHover={{ scale: 1.1 }}
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <path d="M14 2v6h6"></path>
                        <path d="M16 13H8"></path>
                        <path d="M16 17H8"></path>
                        <path d="M10 9H8"></path>
                      </motion.svg>
                    </div>
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-green-500 to-teal-500 text-white text-xs font-bold py-2 px-4 rounded-bl-lg shadow-md">
                      ALL MEMBERS
                    </div>
                  </div>
                  <div className="p-6 flex flex-col h-full">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-green-600 transition-colors">🍽️ Pizza World - Buy 1 Get 1 Free</h3>
                    <p className="text-gray-600 mb-4">Gura imwe uhabwe indi ubuntu. Serivisi iboneka ku banyamuryango bose.</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-green-600 font-medium flex items-center">
                        <Globe size={16} className="mr-1" />
                        Kigali City Tower
                      </span>
                      <Link to="/deals/pizza-world" className="text-green-600 hover:text-green-700 font-medium hover:underline flex items-center">
                        Reba Ibisobanuro
                        <ChevronRight className="ml-1 transform hover:translate-x-1 transition-transform" size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Featured Deal 3 - Enhanced */}
              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  <div className="h-48 bg-gradient-to-r from-gray-50 to-slate-50 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="64" 
                        height="64" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="text-gray-300 hover:text-gray-400 transition-colors"
                        whileHover={{ scale: 1.1 }}
                      >
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                      </motion.svg>
                    </div>
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-gray-500 to-slate-500 text-white text-xs font-bold py-2 px-4 rounded-bl-lg shadow-md">
                      PLATINUM & UP
                    </div>
                  </div>
                  <div className="p-6 flex flex-col h-full">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-gray-600 transition-colors">👨‍⚕️ City Clinic - 30% off checkup</h3>
                    <p className="text-gray-600 mb-4">Kugabanyirizwa ku ipimwa rusange 30%. Platinum na Diamond gusa.</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-gray-600 font-medium flex items-center">
                        <Globe size={16} className="mr-1" />
                        Nyarutarama
                      </span>
                      <Link to="/deals/city-clinic" className="text-gray-600 hover:text-gray-700 font-medium hover:underline flex items-center">
                        Reba Ibisobanuro
                        <ChevronRight className="ml-1 transform hover:translate-x-1 transition-transform" size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            <motion.div 
              className="text-center mt-12"
              whileHover={{ scale: 1.05 }}
            >
              <Link to="/all-deals" className="px-8 py-4 bg-gradient-to-r from-slate-500 to-slate-500 text-white rounded-xl hover:from-slate-600 hover:to-slate-600 transition-all duration-300 font-medium inline-flex items-center shadow-lg hover:shadow-xl transform hover:scale-105">
                Reba ibicuruzwa byose
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Improved FAQ Section */}
        <AnimatedSection className="bg-gradient-to-l from-slate-100 to-slate-200 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">FAQ</h2>
              <p className="text-xl text-gray-600">Ibibazo bikunze kubazwa</p>
            </motion.div>

            <motion.div 
              className="grid md:grid-cols-2 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* FAQ Item 1 - Enhanced */}
              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 h-full border-l-4 border-slate-500">
                  <h3 className="text-2xl font-bold mb-4 flex items-center text-gray-900">
                    <span className="text-slate-500 mr-3">01</span>
                    Nshobora gusaba serivisi gute?
                  </h3>
                  <p className="text-gray-600 pl-9">Shakisha serivisi ukeneye, wuzuzemo amakuru usabwa, uhite uhuzwa umunyamwuga. Byoroshye kandi byihuse!</p>
                </div>
              </motion.div>

              {/* FAQ Item 2 - Enhanced */}
              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 h-full border-l-4 border-slate-500">
                  <h3 className="text-2xl font-bold mb-4 flex items-center text-gray-900">
                    <span className="text-slate-500 mr-3">02</span>
                    Nshobora gutanga serivisi gute?
                  </h3>
                  <p className="text-gray-600 pl-9">Fungura konti nk'utanga serivisi, hanyuma uterangire guha serivisi abakiliya binyuze muri TopInfo. Kubona abakiliya byihuse!</p>
                </div>
              </motion.div>

              {/* FAQ Item 3 - Enhanced */}
              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 h-full border-l-4 border-slate-500">
                  <h3 className="text-2xl font-bold mb-4 flex items-center text-gray-900">
                    <span className="text-slate-500 mr-3">03</span>
                    Nshobora kujya muri Membership Club gute?
                  </h3>
                  <p className="text-gray-600 pl-9">Toranya uburyo bwo kwiyandikisha wishyura, ugahita ubona ikarita y'umunyamuryango. Urangije ushobora gukoresha discounts zacu amasaha 24/7.</p>
                </div>
              </motion.div>

              {/* FAQ Item 4 - Enhanced */}
              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 h-full border-l-4 border-slate-500">
                  <h3 className="text-2xl font-bold mb-4 flex items-center text-gray-900">
                    <span className="text-slate-500 mr-3">04</span>
                    Nyuma yo kuba umunyamuryango ni iki gikurikira?
                  </h3>
                  <p className="text-gray-600 pl-9">Ufite ikarita y'umunyamuryango igendanwa kuri telefone, uyerekana kugirango ubone discounts ku bicuruzwa cyangwa serivisi wifuza. Uhita ubona agaciro kuri buri serivisi!</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Improved Trust and Security Section */}
        <AnimatedSection className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-gradient-to-l from-slate-100 to-slate-200">
          <div className="grid md:grid-cols-2 gap-16 px-20 items-center">
            <motion.div 
              className="order-2 md:order-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Umutekano & Icyizere</h2>
              <p className="text-xl text-gray-600 mb-8">
                Dufatanya n'abakora umwuga bemewe kugirango uhabwe serivisi nziza kandi zizahajwe.
              </p>
              <motion.ul 
                className="space-y-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.li 
                  className="flex items-start"
                  variants={itemVariants}
                >
                  <div className="bg-slate-100 p-2 rounded-full mr-4 mt-1">
                    <CheckCircle className="text-slate-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Tugenzura abatanga serivisi</h3>
                    <p className="text-gray-600">Abatanga serivisi bose bagenzurwa mbere yo gutangira gukora</p>
                  </div>
                </motion.li>
                <motion.li 
                  className="flex items-start"
                  variants={itemVariants}
                >
                  <div className="bg-slate-100 p-2 rounded-full mr-4 mt-1">
                    <Shield className="text-slate-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Kurinda amakuru yawe</h3>
                    <p className="text-gray-600">Amakiru yawe yose abikwa mu buryo butekanye kandi bwizewe</p>
                  </div>
                </motion.li>
                <motion.li 
                  className="flex items-start"
                  variants={itemVariants}
                >
                  <div className="bg-slate-100 p-2 rounded-full mr-4 mt-1">
                    <Star className="text-slate-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Serivisi zizewe</h3>
                    <p className="text-gray-600">Abanyamwuga badufasha ni beza kandi bizigamye mu mirimo yabo</p>
                  </div>
                </motion.li>
                <motion.li 
                  className="flex items-start"
                  variants={itemVariants}
                >
                  <div className="bg-slate-100 p-2 rounded-full mr-4 mt-1">
                    <Gift className="text-slate-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Discounts zinewe cyane</h3>
                    <p className="text-gray-600">Urabona ibiciro byiza ku bazana serivisi bakorana natwe</p>
                  </div>
                </motion.li>
              </motion.ul>
            </motion.div>

            <motion.div 
              className="order-1 md:order-2 bg-gradient-to-br from-slate-50 to-slate-50 rounded-2xl p-10 shadow-lg transform hover:rotate-1 transition-all duration-500 hover:shadow-xl"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="bg-white/70 backdrop-blur-md rounded-xl p-8 shadow-inner flex flex-col items-center"
                whileHover={{ scale: 1.02 }}
              >
                <motion.div 
                  className="bg-slate-100 p-4 rounded-full mb-6 shadow-md"
                  animate={{
                    rotate: [0, 10, -10, 0],
                    y: [0, -5, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Shield className="text-slate-600" size={64} />
                </motion.div>
                <h3 className="text-2xl font-bold text-center text-gray-900 mb-4">Umutekano Wawe ni Ingenzi</h3>
                <p className="text-center text-gray-600 mb-6">
                  Amakuru yawe abikwa mu buryo bwizewe. Tugenzura buri serivisi n'utanga serivisi.
                </p>
                <Link to="/security" className="px-6 py-3 bg-slate-500 text-white rounded-xl hover:bg-slate-600 transition-all duration-300 font-medium flex items-center shadow-md hover:shadow-lg">
                  Menya byinshi
                  <ArrowRight className="ml-2" size={18} />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* New Call to Action Section */}
        <AnimatedSection className="bg-gradient-to-r from-slate-500 to-slate-600 py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Tangira Nonaha!
            </motion.h2>
            <motion.p 
              className="text-xl text-white/90 mb-10 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Tega amatwi muri TopInfo maze ubundi ufate uburyo budasanzwe bwo gusaba no gutanga serivisi mu Rwanda.
            </motion.p>

            <motion.div 
              className="flex flex-col md:flex-row justify-center gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={itemVariants}>
                <Link
                  to="/services"
                  className="px-10 py-5 bg-white text-slate-600 rounded-xl hover:bg-slate-50 transition-all duration-300 text-lg font-bold shadow-xl hover:shadow-2xl flex items-center justify-center group transform hover:scale-105"
                >
                  Gusaba Serivisi
                  <ArrowRight className="ml-3 transform group-hover:translate-x-1 transition-transform" size={24} />
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link
                  to="/become-provider"
                  className="px-10 py-5 bg-slate-800 text-white rounded-xl hover:bg-slate-900 transition-all duration-300 text-lg font-bold shadow-xl hover:shadow-2xl flex items-center justify-center group transform hover:scale-105"
                >
                  Gutanga Serivisi
                  <ArrowRight className="ml-3 transform group-hover:translate-x-1 transition-transform" size={24} />
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link
                  to="/discount-club/join"
                  className="px-10 py-5 bg-slate-800 text-white rounded-xl hover:bg-slate-900 transition-all duration-300 text-lg font-bold shadow-xl hover:shadow-2xl flex items-center justify-center group transform hover:scale-105"
                >
                  Jyamo Muri Membership Club
                  <ArrowRight className="ml-3 transform group-hover:translate-x-1 transition-transform" size={24} />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </AnimatedSection>
      </div>
    </>
  );
};

export default Home;