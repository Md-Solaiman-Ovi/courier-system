// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { createSlice, createAsyncThunk, createAction, type PayloadAction } from '@reduxjs/toolkit';
// import api from '../services/api';

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: 'admin' | 'customer' | 'agent';
// }

// interface AuthResponse {
//   user: User;
//   token: string;
// }

// interface AuthState {
//   user: User | null;
//   token: string | null;
//   loading: boolean;
//   error: string | null;
//   success: boolean;
// }

// const initialState: AuthState = {
//   user: null,
//   token: null,
//   loading: false,
//   error: null,
//   success: false,
// };

// // Action to reset success/error flags
// const clearAuthState = createAction("auth/clearState");

// // Login Thunk
// export const loginUser = createAsyncThunk<
//   AuthResponse,
//   { email: string; password: string },
//   { rejectValue: string }
// >('auth/loginUser', async (credentials, thunkAPI) => {
//   try {
//     const response = await api.post('/auth/login', credentials);
//     return response.data;
//   } catch (error: any) {
//     return thunkAPI.rejectWithValue(error.response?.data?.message || 'Login failed');
//   }
// });

// // Register Thunk
// export const registerUser = createAsyncThunk<
//   AuthResponse,
//   { name: string; email: string; password: string },
//   { rejectValue: string }
// >('auth/registerUser', async (formData, thunkAPI) => {
//   try {
//     const response = await api.post('/auth/register', formData);
//     return response.data;
//   } catch (error: any) {
//     return thunkAPI.rejectWithValue(error.response?.data?.message || 'Registration failed');
//   }
// });

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     logout(state) {
//       state.user = null;
//       state.token = null;
//       state.loading = false;
//       state.error = null;
//       state.success = false;
//     },
//   },
//   extraReducers: (builder) => {
//     // Login
//     builder
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.success = false;
//       })
//       .addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         state.loading = false;
//         state.success = true;
//       })
//       .addCase(loginUser.rejected, (state, action: PayloadAction<string | undefined>) => {
//         state.loading = false;
//         state.error = action.payload || 'Login failed';
//         state.success = false;
//       });

//     // Register
//     builder
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.success = false;
//       })
//       .addCase(registerUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         state.loading = false;
//         state.success = true;
//       })
//       .addCase(registerUser.rejected, (state, action: PayloadAction<string | undefined>) => {
//         state.loading = false;
//         state.error = action.payload || 'Registration failed';
//         state.success = false;
//       });

//     // Clear toast states
//     builder.addCase(clearAuthState, (state) => {
//       state.success = false;
//       state.error = null;
//     });
//   },
// });

// export const { logout } = authSlice.actions;
// export { clearAuthState };
// export default authSlice.reducer;




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

// ✅ Load initial state from localStorage
const token = localStorage.getItem('token');
const user = localStorage.getItem('user');

const initialState: AuthState = {
  user: user ? JSON.parse(user) : null,
  token: token || null,
  loading: false,
  error: null,
  success: false,
};

// ✅ Action to reset success/error flags
const clearAuthState = createAction("auth/clearState");

// ✅ Login Thunk
export const loginUser = createAsyncThunk<
  AuthResponse,
  { email: string; password: string },
  { rejectValue: string }
>('auth/loginUser', async (credentials, thunkAPI) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Login failed');
  }
});

// ✅ Register Thunk
export const registerUser = createAsyncThunk<
  AuthResponse,
  { name: string; email: string; password: string; role: string },
  { rejectValue: string }
>('auth/registerUser', async (formData, thunkAPI) => {
  try {
    const response = await api.post('/auth/register', formData);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Registration failed');
  }
});

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

      // Clear from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    // ✅ Login
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

    // ✅ Register
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

    // ✅ Reset flags
    builder.addCase(clearAuthState, (state) => {
      state.success = false;
      state.error = null;
    });
  },
});

export const { logout } = authSlice.actions;
export { clearAuthState };
export default authSlice.reducer;
