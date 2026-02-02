export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'investor' | 'manager';
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}
