import axios from 'axios';

const API_BASE_URL: string = process.env.NEXT_PUBLIC_ENDPOINT || '';

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/profile`, {
      params: { username, password }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
