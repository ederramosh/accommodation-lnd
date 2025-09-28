import { apiClient } from '@/lib/api';
import { LoginFormData, RegisterFormData, AuthResponse, User } from '@/lib/types';

export class AuthService {
  async login(data: LoginFormData) {
    return apiClient.post<AuthResponse>('/login', data);
  }

  async register(data: Omit<RegisterFormData, 'confirmPassword'>) {
    return apiClient.post<AuthResponse>('/register', data);
  }

  async logout() {
    return apiClient.post('/logout', {});
  }

  async getCurrentUser() {
    return apiClient.request<{ user: User }>('/user');
  }
}

export const authService = new AuthService();