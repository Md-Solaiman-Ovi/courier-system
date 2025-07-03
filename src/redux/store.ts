import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import parcelReducer from "../features/parcelSlice"
import adminReducer from "../features/adminSlice"
import agentReducer from "../features/agentSlice"

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
