import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { jwtDecode } from 'jwt-decode';

// Interface for decoded token
interface DecodedToken {
  exp: number;
}

// Extend InternalAxiosRequestConfig to include _retry property
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const IP_ADDRESS = process.env.NEXT_PUBLIC_IP_ADDRESS || 'localhost';

// Track if a refresh is already in progress to prevent multiple simultaneous refresh attempts
let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

// Function to subscribe failed requests to be retried after token refresh
const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

// Function to notify all subscribers that token has been refreshed
const onTokenRefreshed = (token: string) => {
  refreshSubscribers.forEach(cb => cb(token));
  refreshSubscribers = [];
};

// Browser storage helpers
const getStoredToken = (key: string): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(key);
};

const setStoredToken = (key: string, value: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, value);
};

const removeStoredToken = (key: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(key);
};

const isTokenExpired = (token: string): boolean => {
  try {
    const decodedToken: DecodedToken = jwtDecode(token);
    if (!decodedToken.exp) {
      console.warn('Token has no expiration claim');
      return true; // Treat tokens without exp as expired
    }
    const currentTime = Date.now() / 1000;
    // Add a buffer of 30 seconds to prevent edge cases
    return decodedToken.exp < currentTime + 30;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};

// Function to refresh the access token
const refreshAccessToken = async () => {
  // Set refreshing flag to prevent multiple simultaneous refresh attempts
  if (isRefreshing) {
    return new Promise<string>(resolve => {
      subscribeTokenRefresh(token => {
        resolve(token);
      });
    });
  }
  
  isRefreshing = true;
  
  try {
    const refreshToken = getStoredToken('refreshToken');
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    
    console.log('Refreshing token with:', refreshToken);
    
    const response = await axios.post(
      `http://${IP_ADDRESS}:3000/users/refresh`,
      { refreshToken: refreshToken },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const { accessToken, refreshToken: newRefreshToken } = response.data;
    console.log('Token refreshed successfully!');

    // Store the new tokens
    setStoredToken('accessToken', accessToken);
    
    // Always update the refresh token if the server provides a new one
    if (newRefreshToken) {
      setStoredToken('refreshToken', newRefreshToken);
      console.log('New refresh token stored:', newRefreshToken);
    }

    // Notify all subscribers about the new token
    onTokenRefreshed(accessToken);
    isRefreshing = false;

    return accessToken;
  } catch (error) {
    console.error('Error refreshing token:', error);
    isRefreshing = false;
    
    // Clear tokens on refresh failure
    removeStoredToken('accessToken');
    removeStoredToken('refreshToken');
    
    throw error;
  }
};

// Axios instance
const axiosInstance = axios.create({
  baseURL: `http://${IP_ADDRESS}:3000`,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    let token = getStoredToken('accessToken');

    if (!token) {
      console.log('No access token found');
      return config;
    }
    
    if (isTokenExpired(token)) {
      try {
        // Token is expired, attempt to refresh it
        token = await refreshAccessToken();
        console.log('Using refreshed token for request');
      } catch (error) {
        console.log('Failed to refresh token. Please login again.');
        // Redirect to login page
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        throw new Error('Authentication required');
      }
    }
    
    // Set the Authorization header with the current token
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error: AxiosError) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;
    
    // If the error is 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Refresh token and retry the request
        const token = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Handle failed refresh - redirect to login
        console.log('Authentication failed. Redirecting to login...');
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
