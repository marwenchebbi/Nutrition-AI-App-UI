'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = isAuthenticated();
      setIsAuth(authenticated);
      setIsLoading(false);

      if (!authenticated) {
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return fallback || (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🥗</div>
          <div className="text-xl font-semibold text-gray-800">Loading...</div>
        </div>
      </div>
    );
  }

  if (!isAuth) {
    return null; // Will redirect to login
  }

  return <>{children}</>;
} 