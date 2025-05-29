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
  getAll: (params = {}) => api.get('/api/properties/', { params }),
  getById: (id: string) => api.get(`/api/properties/${id}/`),
  getFeatured: () => api.get('/api/properties/featured/'),
  getNewProjects: () => api.get('/api/new-projects/'),
  // Add getByFilters if it's a distinct endpoint or logic
  getByFilters: (params: any) => api.get('/api/properties/', { params }), // Or a different endpoint like '/api/properties/filter/'
  create: (data: FormData) => api.post('/api/properties/', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  update: (id: string, data: FormData | any) => api.put(`/api/properties/${id}/`, data), // Consider if update also needs multipart/form-data
  delete: (id: string) => api.delete(`/api/properties/${id}/`),
  search: (params: any) => api.get('/api/properties/search/', { params }),
  addToFavorites: (id: string) => api.post(`/api/properties/${id}/favorite/`),
  removeFromFavorites: (id: string) => api.delete(`/api/properties/${id}/favorite/`),
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
  registerSeeker: (userData: any) => api.post('/api/register-seeker/', userData),
  registerOwner: (userData: any) => api.post('/api/register-owner/', userData),
  verifyPhone: (phone: string, code: string) => api.post('/api/auth/verify-phone/', { phone, code }),
  sendVerificationCode: (phone: string, purpose = 'registration') => 
    api.post('/api/auth/send-verification-code/', { phone, purpose }),
  resetPasswordWithPhone: (phone: string, code: string, password: string) => 
    api.post('/api/auth/reset-password/', { phone, code, password }),
};

export default api;