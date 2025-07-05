import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { User, AuthResponse, PasswordUpdate, Transaction, Budget, Report, BankAccount } from '../types';

// Create axios instance with base configuration
const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8081', // Default to user-service port
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// User Service API
export const userApi = {
  // Authentication
  signup: (userData: Partial<User>): Promise<AxiosResponse<User>> =>
    api.post('/api/v1/auth/signup', userData),
  
  login: (credentials: { username: string; password: string }): Promise<AxiosResponse<AuthResponse>> =>
    api.post('/api/v1/auth/login', credentials),
  
  // User operations
  getCurrentUser: (): Promise<AxiosResponse<User>> =>
    api.get('/api/v1/user/me'),
  
  updatePassword: (passwordData: PasswordUpdate): Promise<AxiosResponse<User>> =>
    api.put('/api/v1/user/me/password', passwordData),
  
  updateUserDetails: (userData: Partial<User>): Promise<AxiosResponse<User>> =>
    api.put('/api/v1/user/me/update', userData),
  
  // Admin operations
  getAllUsers: (): Promise<AxiosResponse<User[]>> =>
    api.get('/api/v1/admin/users'),
  
  getUserById: (id: string): Promise<AxiosResponse<User>> =>
    api.get(`/api/v1/admin/users/${id}`),
  
  updateUser: (id: string, userData: Partial<User>): Promise<AxiosResponse<User>> =>
    api.put(`/api/v1/admin/users/${id}`, userData),
  
  deleteUser: (id: string): Promise<AxiosResponse<void>> =>
    api.delete(`/api/v1/admin/users/${id}`),
};

// Transaction Service API (for future implementation)
export const transactionApi = {
  getAllTransactions: (): Promise<AxiosResponse<Transaction[]>> =>
    api.get('/api/v1/transactions'),
  
  getTransactionById: (id: string): Promise<AxiosResponse<Transaction>> =>
    api.get(`/api/v1/transactions/${id}`),
  
  createTransaction: (transaction: Partial<Transaction>): Promise<AxiosResponse<Transaction>> =>
    api.post('/api/v1/transactions', transaction),
  
  updateTransaction: (id: string, transaction: Partial<Transaction>): Promise<AxiosResponse<Transaction>> =>
    api.put(`/api/v1/transactions/${id}`, transaction),
  
  deleteTransaction: (id: string): Promise<AxiosResponse<void>> =>
    api.delete(`/api/v1/transactions/${id}`),
  
  getTransactionsByCategory: (category: string): Promise<AxiosResponse<Transaction[]>> =>
    api.get(`/api/v1/transactions/category/${category}`),
  
  getTransactionsByDateRange: (startDate: string, endDate: string): Promise<AxiosResponse<Transaction[]>> =>
    api.get(`/api/v1/transactions/date-range?startDate=${startDate}&endDate=${endDate}`),
};

// Budget Service API (for future implementation)
export const budgetApi = {
  getAllBudgets: (): Promise<AxiosResponse<Budget[]>> =>
    api.get('/api/v1/budgets'),
  
  getBudgetById: (id: string): Promise<AxiosResponse<Budget>> =>
    api.get(`/api/v1/budgets/${id}`),
  
  createBudget: (budget: Partial<Budget>): Promise<AxiosResponse<Budget>> =>
    api.post('/api/v1/budgets', budget),
  
  updateBudget: (id: string, budget: Partial<Budget>): Promise<AxiosResponse<Budget>> =>
    api.put(`/api/v1/budgets/${id}`, budget),
  
  deleteBudget: (id: string): Promise<AxiosResponse<void>> =>
    api.delete(`/api/v1/budgets/${id}`),
  
  getBudgetsByCategory: (category: string): Promise<AxiosResponse<Budget[]>> =>
    api.get(`/api/v1/budgets/category/${category}`),
};

// Reporting Service API (for future implementation)
export const reportingApi = {
  generateReport: (reportType: string, params?: any): Promise<AxiosResponse<Report>> =>
    api.post('/api/v1/reports/generate', { type: reportType, params }),
  
  getReportById: (id: string): Promise<AxiosResponse<Report>> =>
    api.get(`/api/v1/reports/${id}`),
  
  getAllReports: (): Promise<AxiosResponse<Report[]>> =>
    api.get('/api/v1/reports'),
  
  deleteReport: (id: string): Promise<AxiosResponse<void>> =>
    api.delete(`/api/v1/reports/${id}`),
  
  exportReport: (id: string, format: string): Promise<AxiosResponse<Blob>> =>
    api.get(`/api/v1/reports/${id}/export?format=${format}`, { responseType: 'blob' }),
};

// Account Linking Service API (for future implementation)
export const accountApi = {
  getAllAccounts: (): Promise<AxiosResponse<BankAccount[]>> =>
    api.get('/api/v1/accounts'),
  
  getAccountById: (id: string): Promise<AxiosResponse<BankAccount>> =>
    api.get(`/api/v1/accounts/${id}`),
  
  linkAccount: (accountData: Partial<BankAccount>): Promise<AxiosResponse<BankAccount>> =>
    api.post('/api/v1/accounts/link', accountData),
  
  updateAccount: (id: string, accountData: Partial<BankAccount>): Promise<AxiosResponse<BankAccount>> =>
    api.put(`/api/v1/accounts/${id}`, accountData),
  
  deleteAccount: (id: string): Promise<AxiosResponse<void>> =>
    api.delete(`/api/v1/accounts/${id}`),
  
  syncAccount: (id: string): Promise<AxiosResponse<BankAccount>> =>
    api.post(`/api/v1/accounts/${id}/sync`),
};

export default api; 