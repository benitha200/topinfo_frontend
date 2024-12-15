import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import API_URL from '../../constants/Constants';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset previous messages
    setError('');
    setSuccess('');
    
    // Enhanced email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      setIsLoading(true);
      
      // Make API call to forget password endpoint
      const response = await axios.post(`${API_URL}/auth/forget-password`, { email });
      
      // Show success message
      setSuccess('Password reset link has been sent to your email');
      
      // Optional: Redirect to login after a few seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);

    } catch (err) {
      // Handle error response
      setError(
        err.response?.data?.message || 
        'Failed to send password reset link. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-sky-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all hover:scale-[1.02] duration-300">
        <div className="p-8 space-y-6">
          <div className="text-center">
            <Mail className="mx-auto h-16 w-16 text-sky-600 mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Forgot Password
            </h2>
            <p className="text-gray-500 text-sm">
              Enter your email to receive a password reset link
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 
                    transition-all duration-300"
                  placeholder="your-email@gmail.com"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center bg-red-50 p-3 rounded-lg border border-red-200 text-red-600">
                <AlertCircle className="mr-2 h-5 w-5" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {success && (
              <div className="flex items-center bg-green-50 p-3 rounded-lg border border-green-200 text-green-600">
                <CheckCircle className="mr-2 h-5 w-5" />
                <span className="text-sm">{success}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center items-center py-3 px-4 border border-transparent 
                rounded-lg text-sm font-semibold text-white transition-all duration-300 
                ${isLoading 
                  ? 'bg-gray-500 cursor-not-allowed' 
                  : 'bg-sky-600 hover:bg-sky-700 active:bg-sky-800'
                }`}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4"
                    ></circle>
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </div>
              ) : (
                <div className="flex items-center">
                  Send Reset Link
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Remember your password?{' '}
              <a 
                href="/login" 
                className="font-medium text-sky-600 hover:text-sky-500 
                  transition-colors duration-300"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;