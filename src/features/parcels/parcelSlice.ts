/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import api from '../../services/api';

interface Parcel {
  _id: string;
  pickupAddress: string;
  deliveryAddress: string;
  type: string;
  isCOD: boolean;
  status: string;
  createdAt: string;
}

type CreateParcelInput = Omit<Parcel, '_id' | 'status' | 'createdAt'>;

interface ParcelState {
  myParcels: Parcel[];
  loading: boolean;
  error: string | null;
}

const initialState: ParcelState = {
  myParcels: [],
  loading: false,
  error: null,
};

export const createParcel = createAsyncThunk<
  Parcel,                    // Return type
  CreateParcelInput,         // Argument type
  { rejectValue: string }    // Rejected value type
>('parcel/createParcel', async (data, thunkAPI) => {
  try {
    const res = await api.post('/parcel', data);
    return res.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Booking failed');
  }
});

export const getMyParcels = createAsyncThunk<
  Parcel[],                  // Return type
  void,                      // No argument
  { rejectValue: string }    // Rejected value type
>('parcel/getMyParcels', async (_, thunkAPI) => {
  try {
    const res = await api.get('/parcel');
    return res.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue('Error loading bookings');
  }
});

const parcelSlice = createSlice({
  name: 'parcel',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createParcel.fulfilled, (state, action: PayloadAction<Parcel>) => {
        state.myParcels.unshift(action.payload);
      })
      .addCase(getMyParcels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyParcels.fulfilled, (state, action: PayloadAction<Parcel[]>) => {
        state.myParcels = action.payload;
        state.loading = false;
      })
      .addCase(getMyParcels.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Error loading bookings';
      });
  },
});

export default parcelSlice.reducer;
