import axios from 'axios';

const API_BASE_URL: string = process.env.NEXT_PUBLIC_ENDPOINT || '';

export const loginUser = async (data: { username: string; password: string }) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/profile`, {
      params: { username: data.username, password: data.password }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchExpenses = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/expenses`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addExpense = async (expense: { title: string; quantity: number; price: number }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/expenses`, expense);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteExpense = async (id: number) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/expenses/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
