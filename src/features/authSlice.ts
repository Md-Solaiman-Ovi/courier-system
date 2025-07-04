/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, createAction, type PayloadAction } from '@reduxjs/toolkit';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer' | 'agent';
}

interface AuthResponse {
  user: User;
  token: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

// ✅ Safe user parsing from localStorage
let parsedUser: User | null = null;
try {
  const rawUser = localStorage.getItem('user');
  parsedUser = rawUser && rawUser !== 'undefined' ? JSON.parse(rawUser) : null;
} catch (err) {
  parsedUser = null;
  console.error("Error parsing user from localStorage", err);
}

// ✅ Initial state
const initialState: AuthState = {
  user: parsedUser,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
  success: false,
};

// ✅ Clear auth state flags
const clearAuthState = createAction("auth/clearState");

// ✅ Login thunk
export const loginUser = createAsyncThunk<
  AuthResponse,
  { email: string; password: string },
  { rejectValue: string }
>('/api/auth/loginUser', async (credentials, thunkAPI) => {
  try {
    const response = await api.post('/api/auth/login', credentials);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Login failed');
  }
});

// ✅ Register thunk
export const registerUser = createAsyncThunk<
  AuthResponse,
  { name: string; email: string; password: string; role: string },
  { rejectValue: string }
>('/api/auth/registerUser', async (formData, thunkAPI) => {
  try {
    const response = await api.post('/api/auth/register', formData);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Registration failed');
  }
});

// ✅ Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      state.success = false;

      // Clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.loading = false;
        state.success = true;

        // Save to localStorage
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
        state.success = false;
      });

    // Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.loading = false;
        state.success = true;

        // Save to localStorage
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Registration failed';
        state.success = false;
      });

    // Clear flags
    builder.addCase(clearAuthState, (state) => {
      state.success = false;
      state.error = null;
    });
  },
});

// ✅ Exports
export const { logout } = authSlice.actions;
export { clearAuthState };
export default authSlice.reducer;
