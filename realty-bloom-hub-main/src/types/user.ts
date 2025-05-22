export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'admin' | 'property_owner' | 'user';
  token: string;
  refreshToken?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}