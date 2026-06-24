import api from './axios';

export const studentApi = {
  // Student self-service
  getProfile: async () => {
    return await api.get('/student/profile');
  },
  
  updateProfile: async (data) => {
    return await api.patch('/student/profile', data);
  },

  // Admin student management
  getAllStudents: async () => {
    return await api.get('/admin/students');
  },
  
  getStudentById: async (id) => {
    return await api.get(`/admin/students/${id}`);
  },
  
  registerStudent: async (data) => {
    return await api.post('/admin/students', data);
  },
  
  updateStudent: async (id, data) => {
    return await api.patch(`/admin/students/${id}`, data);
  },
  
  deleteStudent: async (id) => {
    return await api.delete(`/admin/students/${id}`);
  },
  
  getDefaulters: async () => {
    return await api.get('/admin/defaulters');
  },
  
  getPaidStudents: async () => {
    return await api.get('/admin/paid-students');
  }
};
