import api from './axios';

export const paymentApi = {
  // Student payment actions
  createOrder: async (data) => {
    return await api.post('/payments/create-order', data);
  },
  
  verifyPayment: async (data) => {
    return await api.post('/payments/verify', data);
  },
  
  getPaymentHistory: async (page = 1, limit = 10) => {
    return await api.get(`/payments/history?page=${page}&limit=${limit}`);
  },
  
  getPaymentById: async (id) => {
    return await api.get(`/payments/${id}`);
  },

  // Admin fee cycle management
  createFeeCycle: async (data) => {
    return await api.post('/admin/fee-cycles', data);
  },
  
  getAllFeeCycles: async () => {
    return await api.get('/admin/fee-cycles');
  },
  
  getFeeCycleById: async (id) => {
    return await api.get(`/admin/fee-cycles/${id}`);
  },
  
  generateDues: async (feeCycleId) => {
    return await api.post(`/admin/fee-cycles/${feeCycleId}/generate-dues`);
  },

  // Admin all payments
  getAllPayments: async (page = 1, limit = 20) => {
    return await api.get(`/admin/payments?page=${page}&limit=${limit}`);
  }
};
