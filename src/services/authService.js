import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/admin/login`, credentials);
    console.log('Auth Service Response:', response.data); // Debug log
    return response.data;
  } catch (error) {
    console.error('Auth Service Error:', error.response?.data || error); // Debug log
    throw error.response?.data || { message: 'An error occurred' };
  }
};
