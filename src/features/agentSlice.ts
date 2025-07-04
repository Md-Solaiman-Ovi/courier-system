/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
// import api from '../services/api';


// export interface Parcel {
//   _id: string;
//   pickupAddress: string;
//   deliveryAddress: string;
//   type: string;
//   isCOD: boolean;
//   status: string;
//   createdAt: string;
// }

// interface AgentState {
//   parcels: Parcel[];
//   loading: boolean;
//   error: string | null;
// }

// const initialState: AgentState = {
//   parcels: [],
//   loading: false,
//   error: null,
// };

// export const fetchAssignedParcels = createAsyncThunk<Parcel[], void, { rejectValue: string }>(
//   'agent/fetchAssigned',
//   async (_, thunkAPI) => {
//     try {
//       const res = await api.get('/parcel/assigned');
//       return res.data;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch parcels');
//     }
//   }
// );

// export const updateParcelStatus = createAsyncThunk<
//   Parcel,
//   { parcelId: string; status: string },
//   { rejectValue: string }
// >('agent/updateParcelStatus', async ({ parcelId, status }, thunkAPI) => {
//   try {
//     const res = await api.put(`/parcel/${parcelId}/status`, { status });
//     return res.data;
//   } catch (error: any) {
//     return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to update status');
//   }
// });

// const agentSlice = createSlice({
//   name: 'agent',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAssignedParcels.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchAssignedParcels.fulfilled, (state, action: PayloadAction<Parcel[]>) => {
//         state.parcels = action.payload;
//         state.loading = false;
//       })
//       .addCase(fetchAssignedParcels.rejected, (state, action: PayloadAction<string | undefined>) => {
//         state.loading = false;
//         state.error = action.payload || 'Failed to load parcels';
//       })
//       .addCase(updateParcelStatus.fulfilled, (state, action: PayloadAction<Parcel>) => {
//         const updated = action.payload;
//         const index = state.parcels.findIndex((p) => p._id === updated._id);
//         if (index !== -1) {
//           state.parcels[index] = updated;
//         }
//       });
//   },
// });

// export default agentSlice.reducer;




import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

export const fetchParcelsByAgent = createAsyncThunk(
  "agent/fetchParcelsByAgent",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/api/agent/parcels");
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch parcels");
    }
  }
);

interface Parcel {
  _id: string;
  pickupAddress: string;
  deliveryAddress: string;
  status: string;
  customer: {
    email: string;
  };
}

interface AgentState {
  assignedParcels: Parcel[];
  loading: boolean;
  error: string | null;
}

const initialState: AgentState = {
  assignedParcels: [],
  loading: false,
  error: null,
};

const agentSlice = createSlice({
  name: "agent",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchParcelsByAgent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchParcelsByAgent.fulfilled, (state, action) => {
        state.loading = false;
        state.assignedParcels = action.payload;
      })
      .addCase(fetchParcelsByAgent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default agentSlice.reducer;
