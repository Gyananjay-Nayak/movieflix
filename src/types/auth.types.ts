export interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
  loginType: 'email' | 'google' | 'facebook' | 'apple';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
