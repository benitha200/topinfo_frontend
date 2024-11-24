// File: services/apiService.js
import axios from 'axios';

// Constants
const API_BASE_URL = typeof window !== 'undefined'
  ? (window.ENV?.NEXT_PUBLIC_API_URL || 'http://localhost:3050/api')
  : (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3050/api');

const TOKEN_KEY = 'token';

// Debug logging function
const debugLog = (message, data) => {
  console.log(`[API Service Debug] ${message}:`, data);
};

// Data validation helper
const validateResponseData = (data, endpoint) => {
  if (!data) {
    throw new Error(`Empty response data from ${endpoint}`);
  }
  
  if (!Array.isArray(data) && typeof data === 'object') {
    return data;
  }
  
  if (Array.isArray(data)) {
    return data;
  }
  
  throw new Error(`Invalid response data format from ${endpoint}`);
};

class ApiService {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
    });
    
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => this.handleApiError(error)
    );

    this.axiosInstance.interceptors.request.use(
      (config) => this.addAuthorizationHeader(config),
      (error) => Promise.reject(error)
    );
  }

  init() {
    try {
      const token = this.getToken();
      debugLog('Initializing API Service with token', token ? 'Token exists' : 'No token found');
      
      if (token) {
        this.setAuthorizationHeader(token);
        debugLog('Authorization header set', this.axiosInstance.defaults.headers.common['Authorization']);
      }
    } catch (error) {
      console.error('Failed to initialize API service:', error);
    }
  }

  getToken() {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      debugLog('Retrieved token from localStorage', token ? 'Token exists' : 'No token');
      return token;
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      return null;
    }
  }

  setToken(token) {
    try {
      localStorage.setItem(TOKEN_KEY, token);
      this.setAuthorizationHeader(token);
      debugLog('Token saved and header set', 'Success');
    } catch (error) {
      console.error('Error saving token:', error);
    }
  }

  clearToken() {
    try {
      localStorage.removeItem(TOKEN_KEY);
      delete this.axiosInstance.defaults.headers.common['Authorization'];
      debugLog('Token cleared', 'Success');
    } catch (error) {
      console.error('Error clearing token:', error);
    }
  }

  setAuthorizationHeader(token) {
    if (token) {
      this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }

  addAuthorizationHeader(config) {
    const token = this.getToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }

  handleApiError(error) {
    debugLog('API Error', {
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers,
      config: error.config
    });

    if (error.response?.status === 401) {
      debugLog('Unauthorized access detected', '401 error');
      this.clearToken();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }

    return Promise.reject({
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      error: error
    });
  }

  async getRequests() {
    try {
      debugLog('Fetching requests', 'Starting request');
      const response = await this.axiosInstance.get('/requests');
      
      // Validate response data
      const validatedData = validateResponseData(response.data, '/requests');
      debugLog('Requests fetched successfully', validatedData);
      
      // Return empty array if data is null/undefined
      return Array.isArray(validatedData) ? validatedData : [];
    } catch (error) {
      debugLog('Failed to fetch requests', error);
      // Return empty array on error to prevent filter issues
      return [];
    }
  }

  async getServiceCategories() {
    try {
      debugLog('Fetching service categories', 'Starting request');
      const response = await this.axiosInstance.get('/service-categories');
      
      // Validate response data
      const validatedData = validateResponseData(response.data, '/service-categories');
      debugLog('Service categories fetched successfully', validatedData);
      
      // Return empty array if data is null/undefined
      return Array.isArray(validatedData) ? validatedData : [];
    } catch (error) {
      debugLog('Failed to fetch service categories', error);
      // Return empty array on error to prevent filter issues
      return [];
    }
  }

  async validateToken() {
    try {
      debugLog('Validating token', 'Starting validation');
      const response = await this.axiosInstance.get('/validate-token');
      return !!response.data;
    } catch (error) {
      debugLog('Token validation failed', error);
      return false;
    }
  }
}

// Create and export a singleton instance
export const apiService = new ApiService();