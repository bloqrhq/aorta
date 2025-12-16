import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

import axios from 'axios';
import type { AxiosError } from 'axios';


// 1. Types
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

// 2. API Constants (Configurable Placeholders)
const LOGIN_URL = 'http://localhost:5000/api/auth/login';
const REGISTER_URL = 'http://localhost:5000/api/auth/register';
const LOGOUT_URL = '/api/auth/logout';
const ME_URL = '/api/auth/me';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. AuthProvider Component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const checkAuth = async () => {
    try {
      const response = await axios.get(ME_URL);
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError.response) {
        if (axiosError.response.status === 401 || axiosError.response.status === 403) {
          setUser(null);
          setIsAuthenticated(false);
        } else if (axiosError.response.status === 404) {
          // Ignore 404 as per instructions (optional endpoint)
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(LOGIN_URL, { email, password });
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      setError(axiosError.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      await axios.post(REGISTER_URL, { name, email, password });
      // Do NOT set user/isAuthenticated here to avoid auto-login
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      setError(axiosError.response?.data?.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await axios.post(LOGOUT_URL);
    } catch (err) {
      // Ignore errors
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

// 4. useAuth Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
