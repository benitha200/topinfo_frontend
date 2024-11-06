import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Search, Shield, Sparkles, Users } from 'lucide-react';

const Home = () => {
    const featuredServices = [
      {
        id: 1,
        title: "Noteri",
        description: "Kwemeza inyandiko zigenwa n'amategeko",
        rating: 4.8,
      },
      {
        id: 2,
        title: "Kwamamaza kuri interineti",
        description: "Kumenyekanisha ibikorwa byawe kuri interineti",
        rating: 4.9,
      },
      {
        id: 3,
        title: "Gushushanya",
        description: "Gutunganya ibishushanyo n'ubugeni",
        rating: 4.7,
      }
    ];
  
    return (
      <div className="flex-1">
        {/* Hero Section with full width */}
        <div className="w-full bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Urubuga ruhuza abashaka serivisi n'abazitanga
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Duhuza abakeneye serivisi n'abazitanga mu buryo bworoshye
              </p>
              <div className="relative max-w-xl mx-auto">
                <input
                  type="text"
                  placeholder="Shakisha serivisi ukeneye..."
                  className="w-full px-6 py-4 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none shadow-sm"
                />
                <Search className="absolute right-6 top-4 text-gray-400" size={24} />
              </div>
            </div>
          </div>
        </div>
  
        {/* Featured Services */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-3xl font-semibold text-gray-900 mb-12 text-center">Serivisi zikunzwe</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredServices.map(service => (
              <div key={service.id} className="p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <div className="flex justify-between items-center">
                  {/* <span className="text-2xl font-medium text-blue-600">{service.price} Frw</span> */}
                  <span className="text-sm text-gray-500">★ {service.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
  
        {/* Benefits Section */}
        <div className="bg-gray-50 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="flex items-center space-x-4">
                <Shield className="text-blue-500 flex-shrink-0" size={32} />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Umutekano & Icyizere</h3>
                  <p className="text-gray-600">Abakora umwuga bemewe gusa</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Sparkles className="text-blue-500 flex-shrink-0" size={32} />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Ireme Mbere</h3>
                  <p className="text-gray-600">Twizerako muzishima</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Users className="text-blue-500 flex-shrink-0" size={32} />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Ubufasha bw'Inzobere</h3>
                  <p className="text-gray-600">Turi hano kubafasha</p>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* CTA Section */}
        <div className="w-full bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">Witegure gutangira?</h2>
            <p className="text-xl text-gray-600 mb-8">Injira mu muryango w'abanyamwuga</p>
            <div className="flex justify-center gap-6">
              <Link 
                to="/services"
                className="px-8 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-lg font-medium shadow-sm hover:shadow-md"
              >
                Reba Serivisi
              </Link>
              <Link 
                to="/become-provider"
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors text-lg font-medium"
              >
                Ba Umutanga Serivisi
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default Home;