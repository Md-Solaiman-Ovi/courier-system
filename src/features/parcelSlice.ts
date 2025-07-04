// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
// import api from '../services/api';

// interface Parcel {
//   _id: string;
//   pickupAddress: string;
//   deliveryAddress: string;
//   type: string;
//   isCOD: boolean;
//   status: string;
//   createdAt: string;
// }

// type CreateParcelInput = Omit<Parcel, '_id' | 'status' | 'createdAt'>;

// interface ParcelState {
//   myParcels: Parcel[];
//   loading: boolean;
//   error: string | null;
// }

// const initialState: ParcelState = {
//   myParcels: [],
//   loading: false,
//   error: null,
// };

// export const createParcel = createAsyncThunk<
//   Parcel,                    // Return type
//   CreateParcelInput,         // Argument type
//   { rejectValue: string }    // Rejected value type
// >('parcel/createParcel', async (data, thunkAPI) => {
//   try {
//     const res = await api.post('/parcel', data);
//     return res.data;
//   } catch (err: any) {
//     return thunkAPI.rejectWithValue(err.response?.data?.message || 'Booking failed');
//   }
// });

// export const getMyParcels = createAsyncThunk<
//   Parcel[],                  // Return type
//   void,                      // No argument
//   { rejectValue: string }    // Rejected value type
// >('parcel/getMyParcels', async (_, thunkAPI) => {
//   try {
//     const res = await api.get('/parcel');
//     return res.data;
//   } catch (err: any) {
//     return thunkAPI.rejectWithValue('Error loading bookings');
//   }
// });

// const parcelSlice = createSlice({
//   name: 'parcel',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(createParcel.fulfilled, (state, action: PayloadAction<Parcel>) => {
//         state.myParcels.unshift(action.payload);
//       })
//       .addCase(getMyParcels.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getMyParcels.fulfilled, (state, action: PayloadAction<Parcel[]>) => {
//         state.myParcels = action.payload;
//         state.loading = false;
//       })
//       .addCase(getMyParcels.rejected, (state, action: PayloadAction<string | undefined>) => {
//         state.loading = false;
//         state.error = action.payload || 'Error loading bookings';
//       });
//   },
// });

// export default parcelSlice.reducer;


/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import api from '../services/api';

interface Parcel {
  _id: string;
  pickupAddress: string;
  deliveryAddress: string;
  parcelType: 'document' | 'box' | 'fragile'; // ✅ renamed
  isCOD: boolean;
  status: string;
  createdAt: string;
 
}

type CreateParcelInput = Omit<Parcel, '_id' | 'status' | 'createdAt'>;
type UpdateParcelInput = Partial<CreateParcelInput> & { id: string };

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

// ✅ Create Parcel
export const createParcel = createAsyncThunk<
  Parcel,
  CreateParcelInput,
  { rejectValue: string }
>('parcel/createParcel', async (data, thunkAPI) => {
  try {
    console.log("dispatch function", data)
    const res = await api.post('/parcel', data);
    return res.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Booking failed');
  }
});

// ✅ Get My Parcels
export const getParcelsByUser = createAsyncThunk<Parcel[], void, { rejectValue: string }>(
  'parcel/getParcelsByUser',
  async (_, thunkAPI) => {
    try {
      const res = await api.get('/parcel/my-parcels');
      // console.log("my parcels: ", res)
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Error loading bookings');
    }
  }
);

// ✅ Get All Parcels
export const getMyParcels = createAsyncThunk<
  Parcel[],
  void,
  { rejectValue: string }
>('parcel/getMyParcels', async (_, thunkAPI) => {
  try {
    const res = await api.get('/parcel');
    return res.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Error loading bookings');
  }
});

// ✅ Optional: Update Parcel
export const updateParcel = createAsyncThunk<
  Parcel,
  UpdateParcelInput,
  { rejectValue: string }
>('parcel/updateParcel', async ({ id, ...data }, thunkAPI) => {
  try {
    const res = await api.patch(`/parcel/${id}`, data);
    return res.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Update failed');
  }
});

// ✅ Optional: Delete Parcel
export const deleteParcel = createAsyncThunk<
  string, // returning deleted parcel id
  string, // parcel id to delete
  { rejectValue: string }
>('parcel/deleteParcel', async (id, thunkAPI) => {
  try {
    await api.delete(`/parcel/${id}`);
    return id;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Delete failed');
  }
});

// ✅ Slice
const parcelSlice = createSlice({
  name: 'parcel',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createParcel.fulfilled, (state, action: PayloadAction<Parcel>) => {
        state.myParcels.unshift(action.payload);
      })

      // Add case for getParcelsByUser thunk:
      .addCase(getParcelsByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getParcelsByUser.fulfilled, (state, action: PayloadAction<Parcel[]>) => {
        state.myParcels = action.payload;
        state.loading = false;
      })
      .addCase(getParcelsByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load parcels';
      })

      // Get All
      .addCase(getMyParcels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyParcels.fulfilled, (state, action: PayloadAction<Parcel[]>) => {
        state.myParcels = action.payload;
        state.loading = false;
      })
      .addCase(getMyParcels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error loading bookings';
      })

      // Update
      .addCase(updateParcel.fulfilled, (state, action: PayloadAction<Parcel>) => {
        const index = state.myParcels.findIndex(p => p._id === action.payload._id);
        if (index !== -1) {
          state.myParcels[index] = action.payload;
        }
      })

      // Delete
      .addCase(deleteParcel.fulfilled, (state, action: PayloadAction<string>) => {
        state.myParcels = state.myParcels.filter(p => p._id !== action.payload);
      });
  },
});

export default parcelSlice.reducer;
