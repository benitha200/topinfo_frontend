import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Search, Shield, Sparkles, Users, Menu, ArrowRight, X, Bell, ChevronDown } from 'lucide-react';


const Home = () => {
  const featuredServices = [
    {
      id: 1,
      title: "Noteri",
      description: "Kwemeza inyandiko zigenwe n'amategeko",
      rating: 4.8,
      users: "2,400+",
      icon: Shield
    },
    {
      id: 2,
      title: "Umuhesha w'inkiko",
      description: "Umuhesha w'inkiko",
      rating: 4.9,
      users: "3,200+",
      icon: Sparkles
    },
    {
      id: 3,
      title: "Upima butaka",
      description: "Upima butaka",
      rating: 4.7,
      users: "1,800+",
      icon: Users
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-blue-500 overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.05] -z-1" />
        <div className="absolute inset-y-0 right-0 -mr-48 w-1/2 bg-gradient-to-l from-blue-500/20 transform rotate-12 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-40">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
              Urubuga ruhuza abashaka serivisi n'abazitanga
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-12">
              Duhuza abakeneye serivisi n'abazitanga mu buryo bworoshye
            </p>
            <div className="relative max-w-2xl mx-auto">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Shakisha serivisi ukeneye..."
                  className="w-full px-8 py-6 rounded-2xl text-lg border-0 ring-1 ring-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-blue-100 focus:ring-2 focus:ring-white/30 focus:outline-none shadow-xl"
                />
                <button className="absolute right-3 p-3 bg-white rounded-xl text-blue-600 hover:bg-blue-50 transition-colors">
                  <Search size={24} />
                </button>
              </div>
              <div className="mt-4 flex justify-center space-x-4 text-sm text-blue-100">
                <span>Ibishakwa cyane:</span>
                <a href="#" className="hover:text-white">Noteri</a>
                <span>•</span>
                <a href="#" className="hover:text-white">Ubutaka</a>
                <span>•</span>
                <a href="#" className="hover:text-white">Umunyamategeko</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Services */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredServices.map(service => {
            const ServiceIcon = service.icon;
            return (
              <div 
                key={service.id} 
                className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 group hover:scale-105"
              >
                <div className="mb-6 p-4 bg-blue-50 rounded-xl inline-block group-hover:bg-blue-100 transition-colors">
                  <ServiceIcon className="text-blue-600 group-hover:text-blue-700 transition-colors" size={36} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-yellow-500 flex items-center">
                      ★ {service.rating}
                    </span>
                    <span className="text-sm text-gray-500">{service.users} abakoresha</span>
                  </div>
                  <Link 
                    to={`/service/${service.id}`} 
                    className="flex items-center text-blue-600 hover:text-blue-700 font-medium group"
                  >
                    Saba service 
                    <ArrowRight size={20} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Impamvu wakwihitiramo TopInfo</h2>
          <p className="text-xl text-gray-600">Serivisi z'umwuga kandi zizewe</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center p-8 rounded-2xl hover:bg-white hover:shadow-xl transition-all text-center group">
            <div className="mb-6 p-4 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
              <Shield className="text-blue-600 group-hover:text-blue-700 transition-colors" size={40} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Umutekano & Icyizere</h3>
            <p className="text-gray-600">Abakora umwuga bemewe gusa</p>
          </div>
          <div className="flex flex-col items-center p-8 rounded-2xl hover:bg-white hover:shadow-xl transition-all text-center group">
            <div className="mb-6 p-4 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
              <Sparkles className="text-blue-600 group-hover:text-blue-700 transition-colors" size={40} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Ireme Mbere</h3>
            <p className="text-gray-600">Twizerako muzishima</p>
          </div>
          <div className="flex flex-col items-center p-8 rounded-2xl hover:bg-white hover:shadow-xl transition-all text-center group">
            <div className="mb-6 p-4 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
              <Users className="text-blue-600 group-hover:text-blue-700 transition-colors" size={40} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Ubufasha bw'Inzobere</h3>
            <p className="text-gray-600">Turi hano kubafasha</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-500 rounded-3xl p-12">
            <div className="absolute inset-0 bg-grid-white/[0.05] -z-1" />
            <div className="relative text-center">
              <h2 className="text-4xl font-bold text-white mb-6">Witegure gutangira?</h2>
              <p className="text-xl text-blue-100 mb-12">Injira mu muryango w'abanyamwuga</p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link 
                  to="/services"
                  className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-all text-lg font-bold shadow-lg hover:shadow-xl flex items-center justify-center group"
                >
                  Reba Serivisi 
                  <ArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" size={24} />
                </Link>
                <Link 
                  to="/become-provider"
                  className="px-8 py-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all text-lg font-bold shadow-lg hover:shadow-xl flex items-center justify-center group"
                >
                  Ba Umutanga Serivisi 
                  <ArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" size={24} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;