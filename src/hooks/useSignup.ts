import { useMutation } from '@tanstack/react-query';
import { SignupData, SignupResponse } from '@/app/models/auth';
import { ErrorResponse } from '@/app/models/error';
import axios from 'axios';

const signupUser = async (data: SignupData): Promise<SignupResponse> => {
  const IP_ADDRESS = process.env.NEXT_PUBLIC_IP_ADDRESS || 'localhost';
  const url = `http://${IP_ADDRESS}:3000/users/signup`;
  console.log(url);

  try {
    const response = await axios.post<SignupResponse>(url, data, {
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
      const message = errorData.errorDetails?.message || 'Signup failed';
      
      throw new Error(message);
    }
    throw new Error('Signup failed');
  }
};

export const useSignup = () => {
  return useMutation<SignupResponse, Error, SignupData>({
    mutationFn: signupUser,
  });
}; 