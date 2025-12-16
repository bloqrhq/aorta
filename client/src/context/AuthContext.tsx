import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

import {
  loginUser,
  registerUser,
  logoutUser,
  // getMe,
} from "../api/auth.api";

   //Types

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

//   Context

const AuthContext = createContext<AuthContextType | undefined>(undefined);

   //Provider

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Optional session check (professional behavior)
  useEffect(() => {
    // const checkAuth = async () => {
    //   try {
    //     const res = await getMe();
    //     setUser(res.data);
    //     setIsAuthenticated(true);
    //   } catch {
    //     // Either not logged in OR endpoint not available
    //     setUser(null);
    //     setIsAuthenticated(false);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // checkAuth();
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await loginUser({
        email: email.trim(),
        password,
      });

      setUser(res.data);
      setIsAuthenticated(true);
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ) => {
    setLoading(true);
    setError(null);

    try {
      await registerUser({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      // IMPORTANT: no auto-login here
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);

    try {
      await logoutUser();
    } catch {
      // ignore
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

   //Hook


export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
};
