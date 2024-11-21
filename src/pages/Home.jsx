import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Search, Shield, Sparkles, Users, Menu, ArrowRight } from 'lucide-react';

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-2xl font-bold text-blue-600">TopInfo</Link>
        </div>
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/services" className="text-gray-700 hover:text-blue-600 transition-colors">Serivisi</Link>
          <Link to="/become-provider" className="text-gray-700 hover:text-blue-600 transition-colors">Tanga Serivisi</Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">Inyobora</Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link 
            to="/login" 
            className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
          >
            Injira
          </Link>
          <Link 
            to="/signup" 
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Iyandikishe
          </Link>
          <button className="md:hidden">
            <Menu size={24} className="text-gray-700" />
          </button>
        </div>
      </div>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-blue-400">TopInfo</h3>
            <p className="text-gray-400">Duhuza abakeneye serivisi n'abazitanga mu buryo bworoshye</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Serivisi</h4>
            <ul className="space-y-2">
              <li><Link to="/services" className="text-gray-300 hover:text-white">Reba Serivisi</Link></li>
              <li><Link to="/become-provider" className="text-gray-300 hover:text-white">Tanga Serivisi</Link></li>
              <li><Link to="/categories" className="text-gray-300 hover:text-white">Imitungo</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Urubuga</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-white">Inyobora</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white">Twandukuye</Link></li>
              <li><Link to="/help" className="text-gray-300 hover:text-white">Ubufasha</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Twandikire</h4>
            <div className="flex space-x-2">
              <input 
                type="email" 
                placeholder="Andikira amakuru" 
                className="px-4 py-2 bg-gray-800 text-white rounded-l-md flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition-colors">
                <ArrowRight size={20} />
              </button>
            </div>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
              <a href="#" className="text-gray-400 hover:text-white">LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500">© 2024 TopInfo. Amafaranga yose ateganyijwe.</p>
        </div>
      </div>
    </footer>
  );
};

const Home = () => {
  const featuredServices = [
    {
      id: 1,
      title: "Noteri",
      description: "Kwemeza inyandiko zigenwe n'amategeko",
      rating: 4.8,
      icon: Shield
    },
    {
      id: 2,
      title: "Kwamamaza kuri interineti",
      description: "Kumenyekanisha ibikorwa byawe kuri interineti",
      rating: 4.9,
      icon: Sparkles
    },
    {
      id: 3,
      title: "Gushushanya",
      description: "Gutunganya ibishushanyo n'ubugeni",
      rating: 4.7,
      icon: Users
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* <Navigation /> */}
      <div className="flex-1">
        {/* Hero Section with full width */}
        <div className="w-full p-32 bg-gradient-to-r from-blue-50 to-indigo-50">
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
            {featuredServices.map(service => {
              const ServiceIcon = service.icon;
              return (
                <div 
                  key={service.id} 
                  className="p-8 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group"
                >
                  <div className="mb-4 p-3 bg-blue-50 rounded-full inline-block group-hover:bg-blue-100 transition-colors">
                    <ServiceIcon className="text-blue-500 group-hover:text-blue-600 transition-colors" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">★ {service.rating}</span>
                    <Link 
                      to={`/service/${service.id}`} 
                      className="text-blue-500 hover:text-blue-600 flex items-center"
                    >
                      Saba service <ArrowRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
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
                className="px-8 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-lg font-medium shadow-sm hover:shadow-md flex items-center"
              >
                Reba Serivisi <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link 
                to="/become-provider"
                className="px-8 py-4 border-2 border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-lg font-medium flex items-center"
              >
                Ba Umutanga Serivisi <ArrowRight className="ml-2" size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;