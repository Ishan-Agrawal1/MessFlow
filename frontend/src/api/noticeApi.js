import api from './axios';

export const noticeApi = {
  // Shared
  getActiveNotices: async () => {
    return await api.get('/notices');
  },

  // Admin
  createNotice: async (data) => {
    return await api.post('/admin/notices', data);
  },
  
  updateNotice: async (id, data) => {
    return await api.patch(`/admin/notices/${id}`, data);
  },
  
  deleteNotice: async (id) => {
    return await api.delete(`/admin/notices/${id}`);
  }
};
