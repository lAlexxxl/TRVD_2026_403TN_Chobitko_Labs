import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5175/api', // Порт твого .NET API
});

// Автоматично додаємо токен до запитів, якщо він є в пам'яті
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;