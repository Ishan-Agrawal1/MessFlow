import api from './axios';

export const contactApi = {
  submit: async (formData) => {
    return await api.post('/contact', formData);
  },
};
