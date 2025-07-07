// import React, { useState } from 'react';
// import { Helmet } from 'react-helmet';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import {
//   Search, Shield, Sparkles, Users, ArrowRight, CheckCircle,
//   Globe, Star, Headphones, BookOpen, MessageCircle
// } from 'lucide-react';

// import HeroImg from "./../assets/img/22.png";

// const Home = () => {
//   const [activeTab, setActiveTab] = useState('service-seekers');

//   return (
//     <>

//       <Helmet>
//         {/* <title>TopInfo Rwanda | Urubuga Ruhuza Abakeneye Serivisi n'Abazitanga</title> */}
//         <title>TopInfo Rwanda | Shakisha Serivisi Mu Rwanda</title>
//         <meta name="description" content="TopInfo ni urubuga ruhuza abakeneye na batanga serivisi mu Rwanda. Shakisha cyangwa utange serivisi byoroshye kandi bwihuse." />

//         <meta property="og:title" content="TopInfo Rwanda - Shakisha Serivisi" />
//         <meta property="og:description" content="TopInfo ni urubuga ruhuza abakeneye serivisi n'abazitanga." />
//         <meta property="og:image" content="https://topinfo.rw/logo.jpg" />
//         <meta property="og:url" content="https://topinfo.rw" />


//         {/* Additional meta tags for SEO */}
//         <meta name="keywords" content="serivisi rwanda, gusaba serivisi, gutanga serivisi, urubuga rwa serivisi rwanda, professional services rwanda, service marketplace rwanda" />
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
//                 "Gutanga Serivisi"
//               ]
//             }
//           })}
//         </script>
//       </Helmet>
//       <div className="min-h-screen bg-gray-50">

//         <div className="relative bg-gradient-to-br from-sky-600 via-sky-500 to-sky-400 overflow-hidden py-24">
//           {/* Blended hero image with opacity and overlay */}
//           <div className="absolute inset-0 z-0">
//             <img
//               loading='lazy'
//               src={HeroImg}
//               alt="Background"
//               className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
//             />
//           </div>

//           {/* Grid and gradient overlays */}
//           <div className="absolute inset-0 bg-grid-white/[0.05] -z-1" />
//           <div className="absolute inset-0 bg-gradient-to-r from-sky-700/30 to-sky-500/10 opacity-50 blur-3xl" />

//           {/* Content container */}
//           <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
//             <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 shadow-2xl">
//               <h1 className="text-5xl font-extrabold text-white mb-6 leading-tight">
//                 TopInfo: Urubuga ruhuza Abakeneye Serivisi n'abazitanga
//               </h1>
//               <p className="text-2xl text-sky-100 mb-10 max-w-4xl mx-auto">
//                 Duhuza abakeneye serivisi n'abazitanga mu buryo bworoshye, bwihuse kandi bwizewe.
//               </p>

//               <div className="flex flex-col sm:flex-row justify-center gap-6">
//                 <Link
//                   to="/services"
//                   className="px-10 py-5 bg-white text-sky-600 rounded-xl hover:bg-sky-50 transition-all text-lg font-bold shadow-xl hover:shadow-2xl flex items-center justify-center group"
//                 >
//                   Gusaba Serivisi
//                   <ArrowRight className="ml-3 transform group-hover:translate-x-1 transition-transform" size={24} />
//                 </Link>
//                 <Link
//                   to="/become-provider"
//                   className="px-10 py-5 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-all text-lg font-bold shadow-xl hover:shadow-2xl flex items-center justify-center group"
//                 >
//                   Gutanga Serivisi
//                   <ArrowRight className="ml-3 transform group-hover:translate-x-1 transition-transform" size={24} />
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>


//         {/* How It Works Section */}
//         <div className="bg-gray-100 py-12">
//           <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-6ßßßß">
//             <div className="text-center mb-16">
//               <h2 className="text-4xl font-bold text-gray-900 mb-4">Uko Bikorwa</h2>
//               <p className="text-xl text-gray-600">uko wakoresha TopInfo</p>
//             </div>
//             <div className="grid md:grid-cols-3 gap-12">
//               <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
//                 <div className="mb-6 flex justify-center">
//                   <div className="bg-sky-50 p-4 rounded-full">
//                     <Search className="text-sky-600" size={40} />
//                   </div>
//                 </div>
//                 <h3 className="text-2xl font-bold mb-4">Shakisha Serivisi</h3>
//                 <p className="text-gray-600">Shakisha serivisi ukeneye</p>

//                 <Link
//                   to="/services"
//                   className="px-5 py-2 mt-4 bg-sky-100 pt-2 text-sky-600 rounded-xl hover:bg-sky-200 transition-all text-lg font-bold shadow-xl hover:shadow-2xl flex items-center justify-center group"
//                 >
//                   Serivisi
//                   <ArrowRight className="ml-3 transform group-hover:translate-x-1 transition-transform" size={24} />
//                 </Link>

//               </div>
//               <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
//                 <div className="mb-6 flex justify-center">
//                   <div className="bg-sky-50 p-4 rounded-full">
//                     <Users className="text-sky-600" size={40} />
//                   </div>
//                 </div>
//                 <h3 className="text-2xl font-bold mb-4">Uzuza amakuru Asabwa</h3>
//                 <p className="text-gray-600">Uzuza amakuru ajyanye na Serivisi usaba</p>
//               </div>
//               <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
//                 <div className="mb-6 flex justify-center">
//                   <div className="bg-sky-50 p-4 rounded-full">
//                     <Star className="text-sky-600" size={40} />
//                   </div>
//                 </div>
//                 <h3 className="text-2xl font-bold mb-4">Huzwa n'umunyamwuga utanga Serivisi wifuza</h3>
//                 <p className="text-gray-600">Huzwa n'umunyamwuga wizewe utanga servisi ushaka</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="bg-gray-100 py-12">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="text-center mb-16">
//               <h2 className="text-4xl font-bold text-gray-900 mb-4">FAQ</h2>
//               <p className="text-xl text-gray-600">Ibibazo bikunze kubazwa</p>
//             </div>
//             <div className="grid md:grid-cols-2 gap-12">
//               <div className="bg-white p-8 rounded-2xl shadow-lg">
//                 <h3 className="text-2xl font-bold mb-4">Nshobora gusaba serivisi gute?</h3>
//                 <p className="text-gray-600">Shakisha serivisi ukeneye, wuzuzemo amakuru usabwa, uhite uhuzwa umunyamwuga.</p>
//               </div>
//               <div className="bg-white p-8 rounded-2xl shadow-lg">
//                 <h3 className="text-2xl font-bold mb-4">Nshobora gutanga serivisi gute?</h3>
//                 <p className="text-gray-600">Fungura konti nk'utanga serivisi, hanyuma uterangire guha serivisi abakiliya binyuze muri topinfo.</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Trust and Security Section */}
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
//           <div className="grid md:grid-cols-2 gap-16 items-center">
//             <div>
//               <h2 className="text-4xl font-bold text-gray-900 mb-6">Umutekano & Icyizere</h2>
//               <p className="text-xl text-gray-600 mb-8">
//                 Dufatanya n'abakora umwuga bemewe kugirango uhabwe serivisi nziza.
//               </p>
//               <ul className="space-y-4">
//                 <li className="flex items-center">
//                   <CheckCircle className="mr-3 text-sky-600" size={24} />
//                   <span>Tugenzura abatanga serivisi ko bemewe</span>
//                 </li>
//                 <li className="flex items-center">
//                   <CheckCircle className="mr-3 text-sky-600" size={24} />
//                   <span>Kurinda amakuru yawe</span>
//                 </li>
//                 <li className="flex items-center">
//                   <CheckCircle className="mr-3 text-sky-600" size={24} />
//                   <span>Serivisi zizewe</span>
//                 </li>
//               </ul>
//             </div>
//             <div className="bg-sky-50 rounded-2xl p-8 shadow-lg">
//               <Shield className="mx-auto text-sky-600 mb-6" size={80} />
//               <h3 className="text-2xl font-bold text-center text-gray-900 mb-4">Umutekano</h3>
//               <p className="text-center text-gray-600">
//                 Amakuru yawe abikwa mu buryo bwizewe.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>

//   );
// };

// export default Home;

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {
  Search, Shield, Sparkles, Users, ArrowRight, CheckCircle,
  Globe, Star, Headphones, BookOpen, MessageCircle,
  Gift, CreditCard, Award, ChevronRight
} from 'lucide-react';

import HeroImg from "./../assets/img/22.png";

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
        <div className="relative bg-gradient-to-br from-sky-600 via-sky-500 to-sky-400 overflow-hidden py-32">
          {/* Hero background with animated gradient */}
          <div className="absolute inset-0 z-0">
            <img
              loading='lazy'
              src={HeroImg}
              alt="Background"
              className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
            />
          </div>

          {/* Animated gradient blob */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-sky-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

          {/* Grid and gradient overlays */}
          <div className="absolute inset-0 bg-grid-white/[0.05] -z-1" />
          <div className="absolute inset-0 bg-gradient-to-r from-sky-700/30 to-sky-500/10 opacity-50 blur-3xl" />

          {/* Content container with fade-in animation */}
          <div className={`relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
                TopInfo <span className="block mt-2 text-sky-100">Urubuga ruhuza Abakeneye Serivisi n'abazitanga</span>
              </h1>

              <p className="text-xl md:text-2xl text-sky-100 mb-10 max-w-4xl mx-auto">
                Duhuza abakeneye serivisi n'abazitanga mu buryo bworoshye, bwihuse kandi bwizewe.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 flex-wrap">
                <Link
                  to="/services"
                  className="px-6 md:px-10 py-4 md:py-5 bg-white text-sky-700 rounded-xl hover:bg-sky-50 transition-all duration-300 text-lg font-bold shadow-lg hover:shadow-2xl flex items-center justify-center group"
                >
                  <span>Gusaba Serivisi</span>
                  <ArrowRight className="ml-2 md:ml-3 transform group-hover:translate-x-1 transition-transform" size={20} />
                </Link>

                <Link
                  to="/become-provider"
                  className="px-6 md:px-10 py-4 md:py-5 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-all duration-300 text-lg font-bold shadow-lg hover:shadow-2xl flex items-center justify-center group"
                >
                  <span>Gutanga Serivisi</span>
                  <ArrowRight className="ml-2 md:ml-3 transform group-hover:translate-x-1 transition-transform" size={20} />
                </Link>

                <Link
                  to="/membership-club"
                  className="px-6 md:px-10 py-4 md:py-5 bg-gradient-to-r from-teal-600 to-teal-600 text-white rounded-xl hover:from-teal-700 hover:to-teal-700 transition-all duration-300 text-lg font-bold shadow-lg hover:shadow-2xl flex items-center justify-center group"
                >
                  <span>Membership Club</span>
                  <ArrowRight className="ml-2 md:ml-3 transform group-hover:translate-x-1 transition-transform" size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Membership Club Promo Section */}
        <div className="bg-gradient-to-r from-sky-50 to-indigo-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-block p-3 bg-sky-100 rounded-full mb-6 shadow-md transform hover:rotate-12 transition-transform duration-300">
                <Gift className="text-sky-600" size={36} />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">TopInfo Membership Club</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                "Save more than you pay!" <span className="font-bold text-sky-600">Izere ibiciro bidasanzwe mu Rwanda!</span><br />
                Jyamo uhabwe discounts nyinshi kubaserivisi bacu!
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {/* Silver Tier Card - Improved */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-200 transition-all">
                  <Award className="text-gray-500" size={32} />
                </div>
                <h3 className="text-xl font-bold text-center mb-2">🥈 Silver</h3>
                <p className="text-center text-sky-600 font-bold text-2xl mb-2">RWF 10,000</p>
                <p className="text-center text-gray-500 mb-4">Ukwezi 1</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-2 flex-shrink-0" size={18} />
                    <span className="text-gray-600 text-sm">Serivisi za Basic</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-2 flex-shrink-0" size={18} />
                    <span className="text-gray-600 text-sm">Digital Member Card</span>
                  </li>
                </ul>
                <Link to="/discount-club/join" className="block w-full py-3 px-4 bg-gray-200 text-gray-800 rounded-lg text-center font-medium hover:bg-gray-300 transition-all duration-300 flex items-center justify-center group">
                  Jyamo
                  <ChevronRight className="ml-1 transform group-hover:translate-x-1 transition-transform" size={16} />
                </Link>
              </div>

              {/* Gold Tier Card - Improved */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-200 transition-all">
                  <Award className="text-yellow-500" size={32} />
                </div>
                <h3 className="text-xl font-bold text-center mb-2">🥇 Gold</h3>
                <p className="text-center text-sky-600 font-bold text-2xl mb-2">RWF 45,000</p>
                <p className="text-center text-gray-500 mb-4">Amezi 3</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-2 flex-shrink-0" size={18} />
                    <span className="text-gray-600 text-sm">Serivisi zose</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-2 flex-shrink-0" size={18} />
                    <span className="text-gray-600 text-sm">Coupons z'inyongera</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-2 flex-shrink-0" size={18} />
                    <span className="text-gray-600 text-sm">Itsinda ry'abanyamuryango</span>
                  </li>
                </ul>
                <Link to="/discount-club/join/gold" className="block w-full py-3 px-4 bg-yellow-500 text-white rounded-lg text-center font-medium hover:bg-yellow-600 transition-all duration-300 flex items-center justify-center group">
                  Jyamo
                  <ChevronRight className="ml-1 transform group-hover:translate-x-1 transition-transform" size={16} />
                </Link>
              </div>

              {/* Platinum Tier Card - Improved */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="bg-gray-200 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-300 transition-all">
                  <Award className="text-gray-700" size={32} />
                </div>
                <h3 className="text-xl font-bold text-center mb-2">💎 Platinum</h3>
                <p className="text-center text-sky-600 font-bold text-2xl mb-2">RWF 80,000</p>
                <p className="text-center text-gray-500 mb-4">Amezi 6</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-2 flex-shrink-0" size={18} />
                    <span className="text-gray-600 text-sm">Serivisi zidasanzwe</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-2 flex-shrink-0" size={18} />
                    <span className="text-gray-600 text-sm">Amatiki y'ibanze</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-2 flex-shrink-0" size={18} />
                    <span className="text-gray-600 text-sm">Servisi z'ibanze</span>
                  </li>
                </ul>
                <Link to="/discount-club/join/platinum" className="block w-full py-3 px-4 bg-gray-700 text-white rounded-lg text-center font-medium hover:bg-gray-800 transition-all duration-300 flex items-center justify-center group">
                  Jyamo
                  <ChevronRight className="ml-1 transform group-hover:translate-x-1 transition-transform" size={16} />
                </Link>
              </div>

              {/* Diamond Tier Card - Improved */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group relative overflow-hidden">
                {/* Best Value Tag - Enhanced */}
                <div className="absolute top-0 right-0 bg-gradient-to-r from-sky-500 to-sky-600 text-white text-xs font-bold py-1 px-6 transform rotate-45 translate-x-8 translate-y-4 shadow-md">
                  BEST VALUE
                </div>

                <div className="bg-sky-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-sky-200 transition-all">
                  <Award className="text-sky-500" size={32} />
                </div>
                <h3 className="text-xl font-bold text-center mb-2">👑 Diamond</h3>
                <p className="text-center text-sky-600 font-bold text-2xl mb-2">RWF 140,000</p>
                <p className="text-center text-gray-500 mb-4">Umwaka 1</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-2 flex-shrink-0" size={18} />
                    <span className="text-gray-600 text-sm">Serivisi za VIP</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-2 flex-shrink-0" size={18} />
                    <span className="text-gray-600 text-sm">Amakuru yose</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-2 flex-shrink-0" size={18} />
                    <span className="text-gray-600 text-sm">Ubufasha bwa VIP</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-2 flex-shrink-0" size={18} />
                    <span className="text-gray-600 text-sm">Impano zidasanzwe</span>
                  </li>
                </ul>
                <Link to="/discount-club/join/diamond" className="block w-full py-3 px-4 bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-lg text-center font-medium hover:from-sky-600 hover:to-sky-700 transition-all duration-300 flex items-center justify-center group">
                  Jyamo
                  <ChevronRight className="ml-1 transform group-hover:translate-x-1 transition-transform" size={16} />
                </Link>
              </div>
            </div>

            <div className="text-center mt-10">
              <Link to="/discount-club" className="inline-flex items-center text-sky-600 font-medium hover:text-sky-700 group transition-all duration-300">
                Reba ibindi bijyanye na Membership Club
                <ArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" size={18} />
              </Link>
            </div>
          </div>
        </div>

        {/* Improved How It Works Section with Animation */}
        <div className="bg-gray-100 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Uko Bikorwa</h2>
              <p className="text-xl text-gray-600">uko wakoresha TopInfo</p>
            </div>
            <div className="grid md:grid-cols-3 gap-12">
              {/* Step 1 - Enhanced */}
              <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="mb-6 flex justify-center">
                  <div className="bg-sky-50 p-5 rounded-full hover:bg-sky-100 transition-all">
                    <Search className="text-sky-600" size={46} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">Shakisha Serivisi</h3>
                <p className="text-gray-600 mb-6">Shakisha serivisi ukeneye mu buryo bworoshye</p>

                <Link
                  to="/services"
                  className="px-6 py-3 bg-sky-100 text-sky-600 rounded-xl hover:bg-sky-200 transition-all duration-300 font-bold shadow-lg hover:shadow-xl flex items-center justify-center group"
                >
                  Serivisi
                  <ArrowRight className="ml-3 transform group-hover:translate-x-1 transition-transform" size={20} />
                </Link>
              </div>

              {/* Step 2 - Enhanced */}
              <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="mb-6 flex justify-center">
                  <div className="bg-sky-50 p-5 rounded-full hover:bg-sky-100 transition-all">
                    <Users className="text-sky-600" size={46} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">Uzuza amakuru Asabwa</h3>
                <p className="text-gray-600 mb-6">Uzuza amakuru ajyanye na Serivisi usaba muri TopInfo</p>

                <div className="h-10"></div> {/* Spacer to align with buttons in other cards */}
              </div>

              {/* Step 3 - Enhanced */}
              <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="mb-6 flex justify-center">
                  <div className="bg-sky-50 p-5 rounded-full hover:bg-sky-100 transition-all">
                    <Star className="text-sky-600" size={46} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">Huzwa n'umunyamwuga utanga Serivisi</h3>
                <p className="text-gray-600 mb-6">Huzwa n'umunyamwuga wizewe utanga servisi ushaka vuba</p>

                <div className="h-10"></div> {/* Spacer to align with buttons in other cards */}
              </div>
            </div>
          </div>
        </div>

        {/* Improved Featured Deals Section */}
        <div className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-block p-3 bg-sky-100 rounded-full mb-6 shadow-md transform hover:rotate-12 transition-transform duration-300">
                <Gift className="text-sky-600" size={36} />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Kugura Bike, Ubona Byinshi</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Dore zimwe muri serivisi n'ibicuruzwa dufitiye <span className="font-bold text-sky-600">discounts zihambaye</span> kubanyamuryango
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Featured Deal 1 - Enhanced */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="h-48 bg-gradient-to-r from-sky-50 to-sky-50 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sky-300 group-hover:text-sky-400 transition-colors">
                      <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                      <line x1="6" y1="1" x2="6" y2="4"></line>
                      <line x1="10" y1="1" x2="10" y2="4"></line>
                      <line x1="14" y1="1" x2="14" y2="4"></line>
                    </svg>
                  </div>
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-sky-500 to-sky-500 text-white text-xs font-bold py-2 px-4 rounded-bl-lg shadow-md">
                    GOLD & UP
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-sky-600 transition-colors">🏋️ FitZone Gym - 20% off</h3>
                  <p className="text-gray-600 mb-4">Kugabanyirizwa ikiguzi cya Gym ukwezi kwa 20%. Kuri members ba Gold na Diamond</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sky-600 font-medium flex items-center">
                      <Globe size={16} className="mr-1" />
                      Kicukiro
                    </span>
                    <Link to="/deals/fitzone" className="text-sky-600 hover:text-sky-700 font-medium group-hover:underline flex items-center">
                      Reba Ibisobanuro
                      <ChevronRight className="ml-1 transform group-hover:translate-x-1 transition-transform" size={16} />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Featured Deal 2 - Enhanced */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="h-48 bg-gradient-to-r from-green-50 to-teal-50 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-300 group-hover:text-green-400 transition-colors">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <path d="M14 2v6h6"></path>
                      <path d="M16 13H8"></path>
                      <path d="M16 17H8"></path>
                      <path d="M10 9H8"></path>
                    </svg>
                  </div>
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-green-500 to-teal-500 text-white text-xs font-bold py-2 px-4 rounded-bl-lg shadow-md">
                    ALL MEMBERS
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">🍽️ Pizza World - Buy 1 Get 1 Free</h3>
                  <p className="text-gray-600 mb-4">Gura imwe uhabwe indi ubuntu. Serivisi iboneka ku banyamuryango bose.</p>
                  <div className="flex items-center justify-between">
                    <span className="text-green-600 font-medium flex items-center">
                      <Globe size={16} className="mr-1" />
                      Kigali City Tower
                    </span>
                    <Link to="/deals/pizza-world" className="text-green-600 hover:text-green-700 font-medium group-hover:underline flex items-center">
                      Reba Ibisobanuro
                      <ChevronRight className="ml-1 transform group-hover:translate-x-1 transition-transform" size={16} />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Featured Deal 3 - Enhanced */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="h-48 bg-gradient-to-r from-purple-50 to-indigo-50 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-300 group-hover:text-purple-400 transition-colors">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                  </div>
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs font-bold py-2 px-4 rounded-bl-lg shadow-md">
                    PLATINUM & UP
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">👨‍⚕️ City Clinic - 30% off checkup</h3>
                  <p className="text-gray-600 mb-4">Kugabanyirizwa ku ipimwa rusange 30%. Platinum na Diamond gusa.</p>
                  <div className="flex items-center justify-between">
                    <span className="text-purple-600 font-medium flex items-center">
                      <Globe size={16} className="mr-1" />
                      Nyarutarama
                    </span>
                    <Link to="/deals/city-clinic" className="text-purple-600 hover:text-purple-700 font-medium group-hover:underline flex items-center">
                      Reba Ibisobanuro
                      <ChevronRight className="ml-1 transform group-hover:translate-x-1 transition-transform" size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-12">
              <Link to="/all-deals" className="px-8 py-4 bg-gradient-to-r from-sky-500 to-sky-500 text-white rounded-xl hover:from-sky-600 hover:to-sky-600 transition-all duration-300 font-medium inline-flex items-center shadow-lg hover:shadow-xl transform hover:scale-105">
                Reba ibicuruzwa byose
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* Improved FAQ Section */}
        <div className="bg-gradient-to-b from-gray-100 to-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-block p-3 bg-sky-100 rounded-full mb-6 shadow-md">
                <MessageCircle className="text-sky-600" size={36} />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">FAQ</h2>
              <p className="text-xl text-gray-600">Ibibazo bikunze kubazwa</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* FAQ Item 1 - Enhanced */}
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-sky-500">
                <h3 className="text-2xl font-bold mb-4 flex items-center text-gray-900">
                  <span className="text-sky-500 mr-3">01</span>
                  Nshobora gusaba serivisi gute?
                </h3>
                <p className="text-gray-600 pl-9">Shakisha serivisi ukeneye, wuzuzemo amakuru usabwa, uhite uhuzwa umunyamwuga. Byoroshye kandi byihuse!</p>
              </div>

              {/* FAQ Item 2 - Enhanced */}
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-sky-500">
                <h3 className="text-2xl font-bold mb-4 flex items-center text-gray-900">
                  <span className="text-sky-500 mr-3">02</span>
                  Nshobora gutanga serivisi gute?
                </h3>
                <p className="text-gray-600 pl-9">Fungura konti nk'utanga serivisi, hanyuma uterangire guha serivisi abakiliya binyuze muri TopInfo. Kubona abakiliya byihuse!</p>
              </div>

              {/* FAQ Item 3 - Enhanced */}
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-sky-500">
                <h3 className="text-2xl font-bold mb-4 flex items-center text-gray-900">
                  <span className="text-sky-500 mr-3">03</span>
                  Nshobora kujya muri Membership Club gute?
                </h3>
                <p className="text-gray-600 pl-9">Toranya uburyo bwo kwiyandikisha wishyura, ugahita ubona ikarita y'umunyamuryango. Urangije ushobora gukoresha discounts zacu amasaha 24/7.</p>
              </div>

              {/* FAQ Item 4 - Enhanced */}
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-sky-500">
                <h3 className="text-2xl font-bold mb-4 flex items-center text-gray-900">
                  <span className="text-sky-500 mr-3">04</span>
                  Nyuma yo kuba umunyamuryango ni iki gikurikira?
                </h3>
                <p className="text-gray-600 pl-9">Ufite ikarita y'umunyamuryango igendanwa kuri telefone, uyerekana kugirango ubone discounts ku bicuruzwa cyangwa serivisi wifuza. Uhita ubona agaciro kuri buri serivisi!</p>
              </div>
            </div>

            {/* Additional FAQ button */}
            <div className="text-center mt-10">
              <Link to="/faq" className="inline-flex items-center text-sky-600 font-medium hover:text-sky-700 transition-all duration-300 group">
                Reba andi mabwiriza yose
                <ArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" size={18} />
              </Link>
            </div>
          </div>
        </div>

        {/* Improved Trust and Security Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Umutekano & Icyizere</h2>
              <p className="text-xl text-gray-600 mb-8">
                Dufatanya n'abakora umwuga bemewe kugirango uhabwe serivisi nziza kandi zizahajwe.
              </p>
              <ul className="space-y-6">
                <li className="flex items-start">
                  <div className="bg-sky-100 p-2 rounded-full mr-4 mt-1">
                    <CheckCircle className="text-sky-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Tugenzura abatanga serivisi</h3>
                    <p className="text-gray-600">Abatanga serivisi bose bagenzurwa mbere yo gutangira gukora</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-sky-100 p-2 rounded-full mr-4 mt-1">
                    <Shield className="text-sky-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Kurinda amakuru yawe</h3>
                    <p className="text-gray-600">Amakuru yawe yose abikwa mu buryo butekanye kandi bwizewe</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-sky-100 p-2 rounded-full mr-4 mt-1">
                    <Star className="text-sky-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Serivisi zizewe</h3>
                    <p className="text-gray-600">Abanyamwuga badufasha ni beza kandi bizigamye mu mirimo yabo</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-sky-100 p-2 rounded-full mr-4 mt-1">
                    <Gift className="text-sky-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Discounts zinewe cyane</h3>
                    <p className="text-gray-600">Urabona ibiciro byiza ku bazana serivisi bakorana natwe</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="order-1 md:order-2 bg-gradient-to-br from-sky-50 to-sky-50 rounded-2xl p-10 shadow-lg transform hover:rotate-1 transition-all duration-500 hover:shadow-xl">
              <div className="bg-white/70 backdrop-blur-md rounded-xl p-8 shadow-inner flex flex-col items-center">
                <div className="bg-sky-100 p-4 rounded-full mb-6 shadow-md">
                  <Shield className="text-sky-600" size={64} />
                </div>
                <h3 className="text-2xl font-bold text-center text-gray-900 mb-4">Umutekano Wawe ni Ingenzi</h3>
                <p className="text-center text-gray-600 mb-6">
                  Amakuru yawe abikwa mu buryo bwizewe. Tugenzura buri serivisi n'utanga serivisi.
                </p>
                <Link to="/security" className="px-6 py-3 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-all duration-300 font-medium flex items-center shadow-md hover:shadow-lg">
                  Menya byinshi
                  <ArrowRight className="ml-2" size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* New Testimonials Section */}
        <div className="bg-gradient-to-b from-white to-sky-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-block p-3 bg-sky-100 rounded-full mb-6 shadow-md">
                <MessageCircle className="text-sky-600" size={36} />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Ibyo Abakiliya Bavuga</h2>
              <p className="text-xl text-gray-600">Icyo abakoresheje serivisi zacu bavuga</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 relative">
                <div className="absolute -top-5 -left-5 bg-sky-500 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 11H6C5.46957 11 4.96086 10.7893 4.58579 10.4142C4.21071 10.0391 4 9.53043 4 9V7C4 6.46957 4.21071 5.96086 4.58579 5.58579C4.96086 5.21071 5.46957 5 6 5H8C8.53043 5 9.03914 5.21071 9.41421 5.58579C9.78929 5.96086 10 6.46957 10 7V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M20 11H16C15.4696 11 14.9609 10.7893 14.5858 10.4142C14.2107 10.0391 14 9.53043 14 9V7C14 6.46957 14.2107 5.96086 14.5858 5.58579C14.9609 5.21071 15.4696 5 16 5H18C18.5304 5 19.0391 5.21071 19.4142 5.58579C19.7893 5.96086 20 6.46957 20 7V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "Nkoresheje TopInfo nashoboye kubona umunyamwuga wanyubakiye inzu mu gihe gito cyane! Serivisi nziza cyane, kandi byihuse!"
                </p>
                <div className="flex items-center">
                  <div className="bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                    <Users className="text-gray-500" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Kamana Jean</h4>
                    <p className="text-gray-500 text-sm">Kigali, Gasabo</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 relative">
                <div className="absolute -top-5 -left-5 bg-sky-500 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 11H6C5.46957 11 4.96086 10.7893 4.58579 10.4142C4.21071 10.0391 4 9.53043 4 9V7C4 6.46957 4.21071 5.96086 4.58579 5.58579C4.96086 5.21071 5.46957 5 6 5H8C8.53043 5 9.03914 5.21071 9.41421 5.58579C9.78929 5.96086 10 6.46957 10 7V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M20 11H16C15.4696 11 14.9609 10.7893 14.5858 10.4142C14.2107 10.0391 14 9.53043 14 9V7C14 6.46957 14.2107 5.96086 14.5858 5.58579C14.9609 5.21071 15.4696 5 16 5H18C18.5304 5 19.0391 5.21071 19.4142 5.58579C19.7893 5.96086 20 6.46957 20 7V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "Membership Club ya TopInfo yampaye agaciro kanini! Nabonye discount ya 30% kwa muganga - nabonye serivisi nziza ku giciro gito!"
                </p>
                <div className="flex items-center">
                  <div className="bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                    <Users className="text-gray-500" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Uwase Marie</h4>
                    <p className="text-gray-500 text-sm">Kigali, Nyarugenge</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 relative">
                <div className="absolute -top-5 -left-5 bg-sky-500 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 11H6C5.46957 11 4.96086 10.7893 4.58579 10.4142C4.21071 10.0391 4 9.53043 4 9V7C4 6.46957 4.21071 5.96086 4.58579 5.58579C4.96086 5.21071 5.46957 5 6 5H8C8.53043 5 9.03914 5.21071 9.41421 5.58579C9.78929 5.96086 10 6.46957 10 7V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M20 11H16C15.4696 11 14.9609 10.7893 14.5858 10.4142C14.2107 10.0391 14 9.53043 14 9V7C14 6.46957 14.2107 5.96086 14.5858 5.58579C14.9609 5.21071 15.4696 5 16 5H18C18.5304 5 19.0391 5.21071 19.4142 5.58579C19.7893 5.96086 20 6.46957 20 7V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "Ndi professional utanga serivisi za plumbing. TopInfo yampaye abakiliya benshi, ndetse neza kuri business yanjye! Ndabashimira!"
                </p>
                <div className="flex items-center">
                  <div className="bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                    <Users className="text-gray-500" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Ndayisaba Eric</h4>
                    <p className="text-gray-500 text-sm">Kigali, Kicukiro</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* New Call to Action Section */}
        <div className="bg-gradient-to-r from-sky-500 to-sky-600 py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Tangira Nonaha!</h2>
            <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
              Tega amatwi muri TopInfo maze ubundi ufate uburyo budasanzwe bwo gusaba no gutanga serivisi mu Rwanda.
            </p>

            <div className="flex flex-col md:flex-row justify-center gap-6">
              <Link
                to="/services"
                className="px-10 py-5 bg-white text-sky-600 rounded-xl hover:bg-sky-50 transition-all duration-300 text-lg font-bold shadow-xl hover:shadow-2xl flex items-center justify-center group transform hover:scale-105"
              >
                Gusaba Serivisi
                <ArrowRight className="ml-3 transform group-hover:translate-x-1 transition-transform" size={24} />
              </Link>
              <Link
                to="/become-provider"
                className="px-10 py-5 bg-sky-800 text-white rounded-xl hover:bg-sky-900 transition-all duration-300 text-lg font-bold shadow-xl hover:shadow-2xl flex items-center justify-center group transform hover:scale-105"
              >
                Gutanga Serivisi
                <ArrowRight className="ml-3 transform group-hover:translate-x-1 transition-transform" size={24} />
              </Link>
              <Link
                to="/discount-club/join"
                className="px-10 py-5 bg-sky-800 text-white rounded-xl hover:bg-sky-900 transition-all duration-300 text-lg font-bold shadow-xl hover:shadow-2xl flex items-center justify-center group transform hover:scale-105"
              >
                Jyamo Muri Membership Club
                <ArrowRight className="ml-3 transform group-hover:translate-x-1 transition-transform" size={24} />
              </Link>
            </div>
          </div>
        </div>

        {/* Add animations */}
        <style jsx>{`
          @keyframes blob {
            0%, 100% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(20px, -30px) scale(1.1); }
            50% { transform: translate(-20px, 20px) scale(0.9); }
            75% { transform: translate(30px, 30px) scale(1.05); }
          }
          
          .animate-blob {
            animation: blob 15s infinite;
          }
          
          .animation-delay-2000 {
            animation-delay: 2000ms;
          }
          
          .animation-delay-4000 {
            animation-delay: 4000ms;
          }
        `}</style>
      </div>
    </>
  );
};

export default Home;