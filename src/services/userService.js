import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

export const getUsers = async (role) => {
  try {
    const response = await axios.get(
      `${API_URL}/users?role=${role}`,
      getAuthHeader()
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred' };
  }
};

export const createUser = async (userData) => {
  try {
    const response = await axios.post(
      `${API_URL}/users`,
      userData,
      getAuthHeader()
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred' };
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/users/${userId}`,
      getAuthHeader()
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred' };
  }
};

export const updateUser = async (userId, userData) => {
  const response = await axios.put(
    `${API_URL}/users/${userId}`,
    userData,
    getAuthHeader()
  );
  return response.data;
};
