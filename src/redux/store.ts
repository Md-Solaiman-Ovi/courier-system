import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import parcelReducer from "../features/parcels/parcelSlice"
import adminReducer from "../features/admin/adminSlice"
import agentReducer from "../features/agent/agentSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    parcel: parcelReducer,
    admin: adminReducer,
    agent: agentReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
