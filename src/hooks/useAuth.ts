'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';
import { User, LoginFormData, RegisterFormData } from '@/lib/types';

interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  login: (data: LoginFormData) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterFormData) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await authService.getCurrentUser();
      if (response.data && response.data.user) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error('Error checking auth:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (data: LoginFormData) => {
    setLoading(true);
    try {
      const response = await authService.login(data);
      
      if (response.data) {
        setUser(response.data.user);
        router.push('/dashboard');
        return { success: true };
      } else {
        return { success: false, error: response.error || 'Error en el login' };
      }
    } catch (error) {
      return { success: false, error: 'Error de conexión' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterFormData) => {
    if (data.password !== data.confirmPassword) {
      return { success: false, error: 'Las contraseñas no coinciden' };
    }

    setLoading(true);
    try {
      const { confirmPassword, ...registerData } = data;
      const response = await authService.register(registerData);
      
      if (response.data) {
        setUser(response.data.user);
        router.push('/dashboard');
        return { success: true };
      } else {
        return { success: false, error: response.error || 'Error en el registro' };
      }
    } catch (error) {
      return { success: false, error: 'Error de conexión' };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      router.push('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };
};