import api from './axios';

export const authApi = {
  login: async (credentials) => {
    return await api.post('/auth/login', credentials);
  },
  
  logout: async () => {
    return await api.post('/auth/logout');
  },
  
  getMe: async () => {
    return await api.get('/auth/me');
  },
  
  refresh: async () => {
    return await api.post('/auth/refresh');
  }
};
