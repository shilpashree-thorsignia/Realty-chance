import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Index from './pages/Index';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import DashboardPage from './pages/DashboardPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import SearchPage from './pages/SearchPage';
import AdminPropertyManagementPage from './pages/AdminPropertyManagementPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import PostPropertyPage from "./pages/PostPropertyPage"; // Make sure this import is correct
// import { Routes, Route } from 'react-router-dom'; // Removed redundant import
// Import your NewProjectsPage component
// import NewProjectsPage from './pages/NewProjectsPage'; 

function App() {
  return (
    <Router>
      <AuthProvider>
        <FavoritesProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/properties/:id" element={<PropertyDetailPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/properties" element={<SearchPage />} />
            
            {/* Redirect verify-phone to login since OTP verification is not implemented */}
            <Route path="/verify-phone" element={<Navigate to="/login" replace />} />
            
            {/* Protected routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } 
            />
            
            {/* Admin routes */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminPropertyManagementPage />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/admin/properties" 
              element={
                <ProtectedRoute>
                  <AdminPropertyManagementPage />
                </ProtectedRoute>
              } 
            />
            <Route path="/post-property" element={<PostPropertyPage />} />
            {/* <Route path="/new-projects" element={<NewProjectsPage />} /> */}
            {/* Add other routes as needed */}
          </Routes>
        </FavoritesProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;