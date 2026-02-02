import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { User, AuthResponse, LoginCredentials, RegisterData } from '../types/auth';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  async login(credentials: LoginCredentials): Promise<User> {
    try {
      const response = await api.post<AuthResponse>('/auth/login', credentials);
      
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('authUser', JSON.stringify(response.data.user));
        return response.data.user;
      }
      throw new Error('Login failed');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },

  async register(data: RegisterData): Promise<User> {
    try {
      const response = await api.post<AuthResponse>('/auth/register', data);
      
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('authUser', JSON.stringify(response.data.user));
        return response.data.user;
      }
      throw new Error('Registration failed');
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  },

  async googleSignIn(token: string): Promise<User> {
    try {
      const response = await api.post<AuthResponse>('/auth/google', { token });
      
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('authUser', JSON.stringify(response.data.user));
        return response.data.user;
      }
      throw new Error('Google sign-in failed');
    } catch (error) {
      console.error('Google sign-in failed:', error);
      throw error;
    }
  },

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    window.location.href = '/login';
  },

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('authUser');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  },

  getToken(): string | null {
    return localStorage.getItem('authToken');
  },

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    
    try {
      const decoded: any = jwtDecode(token);
      return decoded.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  },

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  },

  isAdmin(): boolean {
    return this.hasRole('admin');
  },

  isManager(): boolean {
    return this.hasRole('manager');
  },

  isInvestor(): boolean {
    return this.hasRole('investor');
  }
};
