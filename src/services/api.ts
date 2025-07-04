// import axios from 'axios';
// import { store } from '../redux/store';

// const 
// api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
// });

// api.interceptors.request.use((config) => {
//   const token = store.getState().auth.token;
//   if (token && config.headers) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default api;



import axios from 'axios';
import { store } from '../redux/store';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
});

api.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  // console.log("AUTH TOKEN:", token); // For debugging
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
