// Check if user is authenticated by verifying tokens exist
export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  
  return !!(accessToken && refreshToken);
};

// Get user data from localStorage
export const getUser = () => {
  if (typeof window === 'undefined') return null;
  
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

// Clear all authentication data
export const logout = () => {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
  
  // Redirect to login page
  window.location.href = '/login';
};

// Get access token
export const getAccessToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('accessToken');
};

// Get refresh token
export const getRefreshToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('refreshToken');
}; 