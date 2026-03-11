import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginRequest = error.config?.url?.includes('/auth/login');
    if (error.response?.status === 401 && !isLoginRequest) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth
export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  sendRegisterOtp: (data) => api.post('/auth/register/send-otp', data),
  verifyRegisterOtp: (data) => api.post('/auth/register/verify', data),
  getProfile: () => api.get('/auth/profile'),
  forgotPassword: (data) => api.post('/auth/forgot-password', data),
  resetPassword: (data) => api.post('/auth/reset-password', data),
};

// Leaves
export const leaveAPI = {
  apply: (data) => api.post('/leaves', data),
  getMyLeaves: (params) => api.get('/leaves/my', { params }),
  cancel: (id) => api.delete(`/leaves/${id}`),
  getAll: (params) => api.get('/leaves/all', { params }),
  approve: (id) => api.patch(`/leaves/${id}/approve`),
  reject: (id) => api.patch(`/leaves/${id}/reject`),
};

// Attendance
export const attendanceAPI = {
  mark: (data) => api.post('/attendance', data),
  getMy: (params) => api.get('/attendance/my', { params }),
  getAll: (params) => api.get('/attendance/all', { params }),
};

// Users (Admin)
export const userAPI = {
  create: (data) => api.post('/users', data),
  getAll: (params) => api.get('/users', { params }),
  update: (id, data) => api.put(`/users/${id}`, data),
  delete: (id) => api.delete(`/users/${id}`),
};

export default api;
