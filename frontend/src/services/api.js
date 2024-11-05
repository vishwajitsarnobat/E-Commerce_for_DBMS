import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:3001/api';

// Add request interceptor for debugging
axios.interceptors.request.use(request => {
  console.log('Starting Request:', request.method, request.url);
  return request;
});

// Add response interceptor for debugging
axios.interceptors.response.use(
  response => {
    console.log('Response:', response.status, response.data);
    return response;
  },
  error => {
    console.error('Response Error:', {
      status: error.response?.status,
      data: error.response?.data,
      config: error.config
    });
    return Promise.reject(error);
  }
);

const createApiService = (resource) => ({
  getAll: async () => {
    console.log(`Fetching all ${resource}`);
    const response = await axios.get(`${API_URL}/${resource}`);
    return response.data;
  },
  getById: async (id) => {
    const response = await axios.get(`${API_URL}/${resource}/${id}`);
    return response.data;
  },
  create: async (data) => {
    const response = await axios.post(`${API_URL}/${resource}`, data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await axios.put(`${API_URL}/${resource}/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await axios.delete(`${API_URL}/${resource}/${id}`);
    return response.data;
  }
});

// Update service names to match backend routes exactly
export const customerService = createApiService('customers');
export const productCategoryService = createApiService('product_categories');
export const offerService = createApiService('offers');
export const supplierService = createApiService('suppliers');
export const employeeService = createApiService('employees');
export const warehouseService = createApiService('warehouses');
export const productService = createApiService('products');
export const reviewService = createApiService('reviews');
export const orderService = createApiService('orders');
export const transactionService = createApiService('transactions');

export const dashboardService = {
  getStats: async () => {
    const response = await axios.get(`${API_URL}/dashboard/stats`);
    return response.data;
  }
};