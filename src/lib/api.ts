// src/lib/api.ts
import axios, { type AxiosInstance } from 'axios';
import { store } from '../app/store';
import { logout } from '../features/auth/authSlice';

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000', 
  headers: { 'Content-Type': 'application/json' },
});

// ► Añade token a cada request
api.interceptors.request.use((config) => {
  const token = store.getState().auth.token
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// ► Manejo global 401
api.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err.response?.status === 401) {
      store.dispatch(logout())
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export default api;
