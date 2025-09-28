export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status?: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const config: RequestInit = {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        credentials: 'include', // Para manejar sesiones
        ...options,
      };

      const response = await fetch(url, config);
      const data = await response.json();

      return {
        data: response.ok ? data : undefined,
        error: !response.ok ? data.error : undefined,
        status: response.status,
      };
    } catch (error) {
      return {
        error: 'Error de conexión',
        status: 0,
      };
    }
  }

  async post<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }
}

export const apiClient = new ApiClient();