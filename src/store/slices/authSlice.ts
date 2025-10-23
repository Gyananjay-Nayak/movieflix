import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User, LoginCredentials } from '../../types/auth.types';
import { saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage } from '../../utils/localStorage';

const initialState: AuthState = {
  user: getFromLocalStorage('user'),
  isAuthenticated: !!getFromLocalStorage('user'),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      saveToLocalStorage('user', action.payload);
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      removeFromLocalStorage('user');
    },
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      saveToLocalStorage('user', action.payload);
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, clearError, setLoading, setUser } = authSlice.actions;

// Simple login action (you can add API call later)
export const loginUser = (credentials: LoginCredentials ) => (dispatch: any) => {
  dispatch(loginStart());
  
  // Simulate API call
  setTimeout(() => {
    // Simple validation
    if (credentials.email && credentials.password.length >= 6) {
      const user: User = {
        id: credentials.email,
        email: credentials.email,
        name: credentials.email.split('@')[0],
        loginType: 'email'
      };
      dispatch(loginSuccess(user));
    } else {
      dispatch(loginFailure('Invalid email or password'));
    }
  }, 800);
};

export default authSlice.reducer;
