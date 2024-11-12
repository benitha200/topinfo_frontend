import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Services from './pages/Services';
import BecomeProvider from './pages/BecomeProvider';
import Login from './pages/Login';

const App = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white">
        {/* Navigation Bar */}
        <nav className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center">
                <Link to="/" className="text-xl font-bold text-blue-600">
                  TopInfo
                </Link>
              </div>
              <div className="lg:flex lg:space-x-8 items-center hidden">
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
              <div className="lg:hidden">
                <button
                  type="button"
                  className="bg-white p-2 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => setIsNavOpen(!isNavOpen)}
                >
                  <span className="sr-only">Open menu</span>
                  {isNavOpen ? (
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation Menu */}
        {isNavOpen && (
          <div className="lg:hidden bg-white shadow-sm p-4 space-y-4">
            <Link
              to="/"
              className="block text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Ahabanza
            </Link>
            <Link
              to="/login"
              className="block text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Kwinjira
            </Link>
            <Link
              to="/provider"
              className="block ml-0 px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium"
            >
              Utanga Service
            </Link>
            <Link
              to="/services"
              className="block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
            >
              Uhabwa Service
            </Link>
          </div>
        )}

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
              {/* Footer content */}
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;