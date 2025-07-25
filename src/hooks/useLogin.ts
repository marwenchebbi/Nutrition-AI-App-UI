import { useMutation } from '@tanstack/react-query';
import { LoginData, LoginResponse } from '@/app/models/auth';
import { ErrorResponse } from '@/app/models/error';
import axiosInstance from '@/app/interceptors/axios-interceptors';
import axios from 'axios';

const loginUser = async (data: LoginData): Promise<LoginResponse> => {
  const IP_ADDRESS = process.env.NEXT_PUBLIC_IP_ADDRESS || 'localhost';
  const url = `http://${IP_ADDRESS}:3000/users/login`;
  console.log(url);

  try {
    const response = await axios.post<LoginResponse>(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error('Unexpected response status');
    }
  } catch (error: any) {
    if (error.response && error.response.data) {
      const errorData: ErrorResponse = error.response.data;
      const message = errorData.errorDetails?.message || 'Login failed';
      
      throw new Error(message);
    }
    throw new Error('Login failed');
  }
};

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginData>({
    mutationFn: loginUser,
  });
}; 