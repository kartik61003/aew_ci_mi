import axios from "axios";

export interface LoginData {
  email: string;
  password: string;
}

export const loginService = async (data: LoginData) => {
  try {
    const response = await axios.post('http://192.168.1.69:5000/login', data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        const errorMessage = error.response.data.message || 'Invalid credentials';
        throw new Error(errorMessage);
      } else {
        throw new Error('An error occurred while communicating with the server.');
      }
    } else {
      throw new Error('An unexpected error occurred. Please try again later.');
    }
  }
};

export const logoutService = async (): Promise<void> => {
  try {
    await axios.post('http://192.168.1.69:5000/logout');
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Logout failed');
    } else {
      throw new Error('Logout failed');
    }
  }
};