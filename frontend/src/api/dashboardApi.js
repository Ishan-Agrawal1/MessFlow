import api from './axios';

export const dashboardApi = {
  getStudentDashboard: async () => {
    return await api.get('/student/dashboard');
  },
  
  getAdminDashboard: async () => {
    return await api.get('/admin/dashboard');
  }
};
