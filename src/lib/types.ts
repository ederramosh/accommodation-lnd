export interface User {
  id: number;
  name: string;
  email: string;
  rol: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  message: string;
  user: User;
}

export interface ErrorResponse {
  error: string;
}

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  status: number;
}