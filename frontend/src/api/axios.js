import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  withCredentials: true, // Crucial for sending HTTP-only cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response Interceptor for global error handling
api.interceptors.response.use(
  (response) => {
    return response.data; // Backend returns { success, message, data }
  },
  (error) => {
    // We can handle global 401s here if needed (e.g., redirect to login)
    // But since authStore will be checking `/me`, we can also handle it at the app level.
    
    const customError = new Error(
      error.response?.data?.message || 'An unexpected error occurred'
    );
    customError.status = error.response?.status;
    customError.data = error.response?.data;
    
    return Promise.reject(customError);
  }
);

export default api;
