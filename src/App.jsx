import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Services from './pages/Services';
import BecomeProvider from './pages/BecomeProvider';
import Login from './pages/Login';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white">
        {/* Navigation Bar */}
        <nav className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="text-xl font-bold text-blue-600">
                  TopInfo
                </Link>
              </div>
              <div className="flex space-x-8 items-center">
                <Link
                  to="/"
                  className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Ahabanza
                </Link>
                <Link
                  to="/login"
                  className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Kwinjira
                </Link>
                <Link
                  to="/provider"
                  className="ml-4 px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium"
                >
                  Utanga Service
                </Link>
                <Link
                  to="/services"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                >
                  Uhabwa Service
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/services" element={<Services/>} />
            <Route path="/provider" element={<BecomeProvider/>} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gray-50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Company</h3>
                <ul className="space-y-3">
                  <li><Link to="/about" className="text-gray-600 hover:text-gray-900">About</Link></li>
                  <li><Link to="/careers" className="text-gray-600 hover:text-gray-900">Careers</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Services</h3>
                <ul className="space-y-3">
                  <li><Link to="/services" className="text-gray-600 hover:text-gray-900">Browse All</Link></li>
                  <li><Link to="/providers" className="text-gray-600 hover:text-gray-900">Find Providers</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Support</h3>
                <ul className="space-y-3">
                  <li><Link to="/help" className="text-gray-600 hover:text-gray-900">Help Center</Link></li>
                  <li><Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact Us</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Legal</h3>
                <ul className="space-y-3">
                  <li><Link to="/privacy" className="text-gray-600 hover:text-gray-900">Privacy</Link></li>
                  <li><Link to="/terms" className="text-gray-600 hover:text-gray-900">Terms</Link></li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-center text-gray-500 text-sm">
                © 2024 ServiceHub. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;