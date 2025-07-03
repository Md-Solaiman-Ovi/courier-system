import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../services/api';

  
export const fetchAllParcels = createAsyncThunk('admin/fetchAllParcels', async () => {
  const res = await api.get('/parcel/all');
  return res.data;
});

export const fetchAllUsers = createAsyncThunk('admin/fetchAllUsers', async () => {
  const res = await api.get('/users');
  return res.data;
});

export const assignAgent = createAsyncThunk(
  'admin/assignAgent',
  async ({ parcelId, agentId }: { parcelId: string; agentId: string }) => {
    const res = await api.put(`/parcel/${parcelId}/assign`, { agentId });
    return res.data;
  }
);

export const fetchDashboardMetrics = createAsyncThunk('admin/metrics', async () => {
  const res = await api.get('/reports/summary');
  return res.data;
});

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    parcels: [],
    users: [],
    metrics: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllParcels.fulfilled, (state, action) => {
        state.parcels = action.payload;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(fetchDashboardMetrics.fulfilled, (state, action) => {
        state.metrics = action.payload;
      });
  },
});

export default adminSlice.reducer;
