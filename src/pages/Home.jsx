// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import { Search, Shield, Sparkles, Users, ArrowRight } from 'lucide-react';

// const Home = () => {

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Enhanced CTA Section as Hero */}
//       <div className="relative bg-gradient-to-br from-sky-500 via-sky-500 to-sky-400 overflow-hidden py-24">
//         <div className="absolute inset-0 bg-grid-white/[0.05] -z-1" />
//         <div className="absolute inset-0 bg-gradient-to-r from-sky-600/30 to-sky-500/10 opacity-50 blur-3xl" />

//         <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 shadow-2xl">
//             <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
//               Urubuga ruhuza Abakeneye  Serivisi n'abazitanga
//             </h1>
//             <p className="text-2xl text-sky-100 mb-10 max-w-3xl mx-auto">
//               Duhuza abakeneye serivisi n'abazitanga mu buryo bworoshye, kandi bwihuse.
//             </p>

//             <div className="flex flex-col sm:flex-row justify-center gap-6">
//               <Link 
//                 to="/services"
//                 className="px-10 py-5 bg-white text-sky-600 rounded-xl hover:bg-sky-50 transition-all text-lg font-bold shadow-xl hover:shadow-2xl flex items-center justify-center group"
//               >
//                 Ba Usaba Serivisi 
//                 <ArrowRight className="ml-3 transform group-hover:translate-x-1 transition-transform" size={24} />
//               </Link>
//               <Link 
//                 to="/become-provider"
//                 className="px-10 py-5 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-all text-lg font-bold shadow-xl hover:shadow-2xl flex items-center justify-center group"
//               >
//                 Ba Utanga Serivisi 
//                 <ArrowRight className="ml-3 transform group-hover:translate-x-1 transition-transform" size={24} />
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Benefits Section */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">Impamvu wakwihitiramo TopInfo</h2>
//           <p className="text-xl text-gray-600">Serivisi z'umwuga kandi zizewe</p>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
//           <div className="flex flex-col items-center p-8 rounded-2xl hover:bg-white hover:shadow-xl transition-all text-center group">
//             <div className="mb-6 p-4 bg-sky-50 rounded-xl group-hover:bg-sky-100 transition-colors">
//               <Shield className="text-sky-600 group-hover:text-sky-700 transition-colors" size={40} />
//             </div>
//             <h3 className="text-xl font-bold text-gray-900 mb-4">Umutekano & Icyizere</h3>
//             <p className="text-gray-600">Abakora umwuga bemewe gusa</p>
//           </div>
//           <div className="flex flex-col items-center p-8 rounded-2xl hover:bg-white hover:shadow-xl transition-all text-center group">
//             <div className="mb-6 p-4 bg-sky-50 rounded-xl group-hover:bg-sky-100 transition-colors">
//               <Sparkles className="text-sky-600 group-hover:text-sky-700 transition-colors" size={40} />
//             </div>
//             <h3 className="text-xl font-bold text-gray-900 mb-4">Ireme Mbere</h3>
//             <p className="text-gray-600">Twizerako muzishima</p>
//           </div>
//           <div className="flex flex-col items-center p-8 rounded-2xl hover:bg-white hover:shadow-xl transition-all text-center group">
//             <div className="mb-6 p-4 bg-sky-50 rounded-xl group-hover:bg-sky-100 transition-colors">
//               <Users className="text-sky-600 group-hover:text-sky-700 transition-colors" size={40} />
//             </div>
//             <h3 className="text-xl font-bold text-gray-900 mb-4">Ubufasha bw'Inzobere</h3>
//             <p className="text-gray-600">Turi hano kubafasha</p>
//           </div>
//         </div>
//       </div>

//       {/* CTA Section */}
//       <div className="bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
//           <div className="relative overflow-hidden bg-gradient-to-br from-sky-500 to-sky-500 rounded-3xl p-12">
//             <div className="absolute inset-0 bg-grid-white/[0.05] -z-1" />
//             <div className="relative text-center">
//               <h2 className="text-4xl font-bold text-white mb-6">Witeguye gutangira?</h2>
//               <p className="text-xl text-sky-100 mb-12">Injira mu muryango w'abanyamwuga</p>
//               <div className="flex flex-col sm:flex-row justify-center gap-6">
//                 <Link 
//                   to="/services"
//                   className="px-8 py-4 bg-white text-sky-600 rounded-xl hover:bg-sky-50 transition-all text-lg font-bold shadow-lg hover:shadow-xl flex items-center justify-center group"
//                 >
//                   Reba Serivisi 
//                   <ArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" size={24} />
//                 </Link>
//                 <Link 
//                   to="/become-provider"
//                   className="px-8 py-4 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-all text-lg font-bold shadow-lg hover:shadow-xl flex items-center justify-center group"
//                 >
//                   Ba Utanga Serivisi 
//                   <ArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" size={24} />
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {
  Search, Shield, Sparkles, Users, ArrowRight, CheckCircle,
  Globe, Star, Headphones, BookOpen, MessageCircle
} from 'lucide-react';

import HeroImg from "./../assets/img/22.png";

const Home = () => {
  const [activeTab, setActiveTab] = useState('service-seekers');



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Dynamic Background */}
      {/* <div className="relative bg-gradient-to-br from-sky-600 via-sky-500 to-sky-400 overflow-hidden py-24">
        <img src={HeroImg} />
        <div className="absolute inset-0 bg-grid-white/[0.05] -z-1" />
        <div className="absolute inset-0 bg-gradient-to-r from-sky-700/30 to-sky-500/10 opacity-50 blur-3xl" />
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 shadow-2xl">
            <h1 className="text-5xl font-extrabold text-white mb-6 leading-tight">
              TopInfo:  Urubuga ruhuza Abakeneye  Serivisi n'abazitanga
            </h1>
            <p className="text-2xl text-sky-100 mb-10 max-w-4xl mx-auto">
              Duhuza abakeneye serivisi n'abazitanga mu buryo bworoshye, bwihuse kandi bwizewe.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link 
                to="/services"
                className="px-10 py-5 bg-white text-sky-600 rounded-xl hover:bg-sky-50 transition-all text-lg font-bold shadow-xl hover:shadow-2xl flex items-center justify-center group"
              >
                Gusaba Serivisi 
                <ArrowRight className="ml-3 transform group-hover:translate-x-1 transition-transform" size={24} />
              </Link>
              <Link 
                to="/become-provider"
                className="px-10 py-5 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-all text-lg font-bold shadow-xl hover:shadow-2xl flex items-center justify-center group"
              >
                Gutanga Serivisi 
                <ArrowRight className="ml-3 transform group-hover:translate-x-1 transition-transform" size={24} />
              </Link>
            </div>
          </div>
        </div>
      </div> */}

      <div className="relative bg-gradient-to-br from-sky-600 via-sky-500 to-sky-400 overflow-hidden py-24">
        {/* Blended hero image with opacity and overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={HeroImg}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
        </div>

        {/* Grid and gradient overlays */}
        <div className="absolute inset-0 bg-grid-white/[0.05] -z-1" />
        <div className="absolute inset-0 bg-gradient-to-r from-sky-700/30 to-sky-500/10 opacity-50 blur-3xl" />

        {/* Content container */}
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 shadow-2xl">
            <h1 className="text-5xl font-extrabold text-white mb-6 leading-tight">
              TopInfo: Urubuga ruhuza Abakeneye Serivisi n'abazitanga
            </h1>
            <p className="text-2xl text-sky-100 mb-10 max-w-4xl mx-auto">
              Duhuza abakeneye serivisi n'abazitanga mu buryo bworoshye, bwihuse kandi bwizewe.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link
                to="/services"
                className="px-10 py-5 bg-white text-sky-600 rounded-xl hover:bg-sky-50 transition-all text-lg font-bold shadow-xl hover:shadow-2xl flex items-center justify-center group"
              >
                Gusaba Serivisi
                <ArrowRight className="ml-3 transform group-hover:translate-x-1 transition-transform" size={24} />
              </Link>
              <Link
                to="/become-provider"
                className="px-10 py-5 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-all text-lg font-bold shadow-xl hover:shadow-2xl flex items-center justify-center group"
              >
                Gutanga Serivisi
                <ArrowRight className="ml-3 transform group-hover:translate-x-1 transition-transform" size={24} />
              </Link>
            </div>
          </div>
        </div>
      </div>


      {/* How It Works Section */}
      <div className="bg-gray-100 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Uko Bikorwa</h2>
            <p className="text-xl text-gray-600">uko wakoresha TopInfo</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="mb-6 flex justify-center">
                <div className="bg-sky-50 p-4 rounded-full">
                  <Search className="text-sky-600" size={40} />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Shakisha Serivisi</h3>
              <p className="text-gray-600">Shakisha serivisi ukeneye</p>

              <Link
                to="/services"
                className="px-10 py-5 bg-white text-sky-600 rounded-xl hover:bg-sky-50 transition-all text-lg font-bold shadow-xl hover:shadow-2xl flex items-center justify-center group"
              >
                Serivisi
                <ArrowRight className="ml-3 transform group-hover:translate-x-1 transition-transform" size={24} />
              </Link>

            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="mb-6 flex justify-center">
                <div className="bg-sky-50 p-4 rounded-full">
                  <Users className="text-sky-600" size={40} />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Uzuza amakuru Asabwa</h3>
              <p className="text-gray-600">Uzuza amakuru ajyanye na Serivisi usaba</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="mb-6 flex justify-center">
                <div className="bg-sky-50 p-4 rounded-full">
                  <Star className="text-sky-600" size={40} />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Huzwa n'umunyamwuga utanga Serivisi wifuza</h3>
              <p className="text-gray-600">Huzwa n'umunyamwuga wizewe utanga servisi ushaka</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trust and Security Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Umutekano & Icyizere</h2>
            <p className="text-xl text-gray-600 mb-8">
              Dufatanya n'abakora umwuga bemewe kugirango uhabwe serivisi nziza.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center">
                <CheckCircle className="mr-3 text-sky-600" size={24} />
                <span>Tugenzura abatanga serivisi ko bemewe</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="mr-3 text-sky-600" size={24} />
                <span>Kurinda amakuru yawe</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="mr-3 text-sky-600" size={24} />
                <span>Serivisi zizewe</span>
              </li>
            </ul>
          </div>
          <div className="bg-sky-50 rounded-2xl p-8 shadow-lg">
            <Shield className="mx-auto text-sky-600 mb-6" size={80} />
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-4">Umutekano</h3>
            <p className="text-center text-gray-600">
              Amakuru yawe abikwa mu buryo bwizewe.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;