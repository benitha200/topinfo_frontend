import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Search, Shield, Sparkles, Users, Menu, ArrowRight, X, Bell, ChevronDown } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-lg border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              TopInfo
            </Link>
            <div className="hidden md:flex space-x-1">
              <Link to="/services" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                Serivisi
              </Link>
              <Link to="/become-Agent" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                Ba Agent
              </Link>
              <Link to="/about" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                Inyobora
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Bell size={20} className="text-gray-600" />
            </button>
            <Link to="/login" className="hidden md:block px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors">
              Injira
            </Link>
            <Link to="/signup" className="hidden md:block px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30">
              Iyandikishe
            </Link>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-2 space-y-1">
            <Link to="/services" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              Serivisi
            </Link>
            <Link to="/become-agent" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              Ba Agent
            </Link>
            <Link to="/about" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              Inyobora
            </Link>
            <div className="pt-4 space-y-2">
              <Link to="/login" className="block px-4 py-2 text-center text-gray-600 hover:bg-gray-100 rounded-lg">
                Injira
              </Link>
              <Link to="/signup" className="block px-4 py-2 text-center bg-blue-600 text-white rounded-lg">
                Iyandikishe
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-4">
              TopInfo
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Duhuza abakeneye serivisi n'abazitanga mu buryo bworoshye
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Serivisi</h4>
            <ul className="space-y-3">
              <li><Link to="/services" className="text-gray-400 hover:text-white transition-colors">Reba Serivisi</Link></li>
              <li><Link to="/become-provider" className="text-gray-400 hover:text-white transition-colors">Tanga Serivisi</Link></li>
              <li><Link to="/categories" className="text-gray-400 hover:text-white transition-colors">Imitungo</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Urubuga</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">Inyobora</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Twandukuye</Link></li>
              <li><Link to="/help" className="text-gray-400 hover:text-white transition-colors">Ubufasha</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Twandikire</h4>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Andikira amakuru" 
                className="px-4 py-3 bg-gray-800 text-white rounded-l-lg flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500 border-0"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-r-lg transition-colors">
                <ArrowRight size={20} />
              </button>
            </div>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
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