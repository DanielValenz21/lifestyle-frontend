// src/lib/api.ts
import axios, { type AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000', 
  headers: { 'Content-Type': 'application/json' },
});

export default api;
