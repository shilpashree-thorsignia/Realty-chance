// Create or update this file

import axios from 'axios';

// Create an axios instance
const api = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Property API
export const propertyApi = {
  getAll: () => api.get('/properties/'),
  getById: (id: string) => api.get(`/properties/${id}/`),
  getByOwner: (ownerId: string) => api.get(`/properties/owner/${ownerId}/`),
  getByFilters: (filters = {}, headers = {}) => api.get('/properties/search/', { params: filters, headers }),
  create: (data: any) => api.post('/properties/', data),
  update: (id: string, data: any) => api.put(`/properties/${id}/`, data),
  deleteProperty: (id: string) => api.delete(`/properties/${id}/`),
  verifyProperty: (id: string) => api.post(`/properties/${id}/verify/`),
  restoreProperty: (id: string) => api.post(`/properties/${id}/restore/`),
};

// Inquiry API
export const inquiryApi = {
  getAll: () => api.get('/inquiries/'),
  getByUser: (userId: string) => api.get(`/inquiries/user/${userId}/`),
  getByOwner: (ownerId: string) => api.get(`/inquiries/owner/${ownerId}/`),
  create: (data: any) => api.post('/inquiries/', data),
  approveInquiry: (id: string) => api.post(`/inquiries/${id}/approve/`),
  rejectInquiry: (id: string) => api.post(`/inquiries/${id}/reject/`),
};

// Auth API
export const authApi = {
  login: (phone: string, password: string) => api.post('/api/auth/login/', { phone, password }),
  register: (userData: any) => api.post('/auth/users/', userData),
  verifyPhone: (phone: string, code: string) => api.post('/auth/verify-phone/', { phone, code }),
  sendVerificationCode: (phone: string, purpose = 'registration') => 
    api.post('/auth/send-verification-code/', { phone, purpose }),
  resetPasswordWithPhone: (phone: string, code: string, password: string) => 
    api.post('/auth/reset-password/', { phone, code, password }),
};

export default api;