/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../services/api';

interface AdminState {
  parcels: any[];
  users: any[];
  metrics: {
    totalParcels: number;
    codAmount: number;
    failedDeliveries: number;
  } | null;
  loading: boolean;
  error: string | null;
}

// Async actions
export const fetchAllParcels = createAsyncThunk('admin/fetchAllParcels', async (_, thunkAPI) => {
  try {
    const res = await api.get('/parcel');
    return res.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch parcels');
  }
});

export const fetchAllUsers = createAsyncThunk('admin/fetchAllUsers', async (_, thunkAPI) => {
  try {
    const res = await api.get('/user');
    return res.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch users');
  }
});

export const assignAgent = createAsyncThunk(
  'admin/assignAgent',
  async ({ parcelId, agentId }: { parcelId: string; agentId: string }, thunkAPI) => {
    try {
      const res = await api.put(`/parcel/${parcelId}/assign`, { agentId });
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to assign agent');
    }
  }
);

export const fetchDashboardMetrics = createAsyncThunk('admin/fetchDashboardMetrics', async (_, thunkAPI) => {
  try {
    const res = await api.get('/reports/summary');
    return res.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch metrics');
  }
});

// Slice
const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    parcels: [],
    users: [],
    metrics: null,
    loading: false,
    error: null,
  } as AdminState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Fetch All Parcels
      .addCase(fetchAllParcels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllParcels.fulfilled, (state, action) => {
        state.loading = false;
        state.parcels = action.payload;
      })
      .addCase(fetchAllParcels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch All Users
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Assign Agent
      .addCase(assignAgent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(assignAgent.fulfilled, (state, action) => {
        state.loading = false;
        // Update the parcel with the new agent
        const updated = action.payload;
        const index = state.parcels.findIndex(p => p._id === updated._id);
        if (index !== -1) {
          state.parcels[index] = updated;
        }
      })
      .addCase(assignAgent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Dashboard Metrics
      .addCase(fetchDashboardMetrics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardMetrics.fulfilled, (state, action) => {
        state.loading = false;
        state.metrics = action.payload;
      })
      .addCase(fetchDashboardMetrics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default adminSlice.reducer;
