import axios from "axios";

export interface RegisterData {
    username: string;
    email: string;
    password: string;
    role: 'CI' | 'MI';
  }

  export const registerUser = async (data: RegisterData) => {
    try {
      const response = await axios.post('http://192.168.1.69:5000/signup', data);
      console.log('User registered:', response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          const errorMessage = error.response.data.message || 'User already exists';
          console.log(errorMessage);
          throw new Error(errorMessage);
        } else {
          console.log('Server error:', error.response?.data || error.message);
          throw new Error('An error occurred while communicating with the server.');
        }
      } else {
        console.log('Unexpected error:', error);
        throw new Error('An unexpected error occurred. Please try again later.');
      }
    }
  };


