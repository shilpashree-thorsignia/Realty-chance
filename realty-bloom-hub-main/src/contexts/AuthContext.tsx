import { Phone } from 'lucide-react';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../services/api';

interface User {
  role: string;
  id: string;
  name: string;
  email: string;
  phone?: string;
  token?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (password: string, phone: string) => Promise<any>;
  register: (name: string, email: string, password: string, phone: string, role?: 'seeker' | 'owner') => Promise<void>;
  logout: () => void;
  loading: boolean;
  updateUserRole: (newRole: string) => Promise<void>;
  verifyOtp: (otp: string) => Promise<boolean>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('auth_token');
    
    if (savedUser && token) {
      // Attach token to user object when loading from localStorage
      const parsedUser = JSON.parse(savedUser);
      setUser({
        ...parsedUser,
        token
      });
    }
    setLoading(false);
  }, []);

  const updateUserRole = async (newRole: string) => {
    setLoading(true);
    try {
      if (user) {
        // Here you would typically make an API call to update the user's role on the backend
        // For now, we'll update it in the local state and localStorage
        // Example: await api.updateUserRole(user.id, newRole);
        
        const updatedUser = { ...user, role: newRole };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        console.log(`User role updated to: ${newRole}`); // For debugging
      } else {
        throw new Error("User not authenticated to update role");
      }
    } catch (error) {
      console.error('Error updating user role:', error);
      // Potentially show a toast notification to the user
      throw error; // Re-throw so the calling component can handle it if needed
    } finally {
      setLoading(false);
    }
  };

  const login = async (password: string, phone: string) => {
    setLoading(true);
    try {
      const response = await authApi.login(phone, password);
      const { user: userData, access, refresh } = response.data;
      
      // Create a complete user object with token attached
      const authenticatedUser = {
        ...userData,
        token: access
      };
      
      // Save user with token
      setUser(authenticatedUser);
      localStorage.setItem('user', JSON.stringify(authenticatedUser));
      localStorage.setItem('auth_token', access);
      localStorage.setItem('refresh_token', refresh);
      
      return authenticatedUser;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, phone: string, role: 'seeker' | 'owner' = 'seeker') => {
    setLoading(true);
    try {
      const userData = {
        phone: phone,
        email: email,
        full_name: name,
        password: password,
        password2: password
      };

      console.log('Sending registration data:', userData);

      const response = role === 'owner' 
        ? await authApi.registerOwner(userData)
        : await authApi.registerSeeker(userData);
      
      return response.data;
    } catch (error: any) {
      console.error('Registration error:', error);
      console.error('Error response:', error.response?.data);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  const verifyOtp = async (otp: string): Promise<boolean> => {
    setLoading(true);
    try {
      // Mock OTP verification
      return true;
    } catch (error) {
      console.error('OTP verification error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
    // Redirect to home page after logout
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{
      user, 
      isAuthenticated: !!user, 
      login, 
      register,
      logout,
      loading,
      updateUserRole,
      verifyOtp,
      isLoading: loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};