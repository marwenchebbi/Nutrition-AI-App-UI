import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getAccessToken } from '@/lib/auth';
import axiosInstance from '@/app/interceptors/axios-interceptors';

interface MeResponse {
  name: string;
  email: string;
}

const fetchMe = async (): Promise<MeResponse> => {
  const IP_ADDRESS = process.env.NEXT_PUBLIC_IP_ADDRESS || 'localhost';
  const url = `http://${IP_ADDRESS}:3000/users/me`;
  const token = getAccessToken();

  if (!token) {
    throw new Error('No access token found');
  }

  const response = await axiosInstance.get<MeResponse>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const useMe = () => {
  return useQuery<MeResponse, Error>({
    queryKey: ['me'],
    queryFn: fetchMe,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
