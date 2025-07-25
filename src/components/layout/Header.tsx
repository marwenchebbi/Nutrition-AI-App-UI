'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { isAuthenticated, logout, getUser } from '@/lib/auth';

export default function Header() {
  const pathname = usePathname();
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = isAuthenticated();
      const userData = getUser();
      setIsAuth(authenticated);
      setUser(userData);
    };

    checkAuth();
    
    // Listen for storage changes (when user logs in/out in another tab)
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/analyze', label: 'Analyze' },
    { href: '/profile', label: 'Profile' }
  ];

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm border-b relative">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl">🥗</div>
            <span className="text-xl font-bold text-gray-800">Nutrition AI</span>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {isAuth ? (
              <div className="hidden md:flex items-center space-x-4">
                {user && (
                  <span className="text-sm text-gray-700">
                    Welcome, {user.name}
                  </span>
                )}
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-gray-900 font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <Link href="/login" className="text-gray-600 hover:text-gray-900 font-medium">
                  Login
                </Link>
                <Link href="/signup" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors font-medium">
                  Sign Up
                </Link>
              </div>
            )}
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              aria-label="Toggle mobile menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50">
            <div className="px-4 py-2 space-y-1">
              {/* Navigation Links */}
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    pathname === item.href
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Auth Section */}
              <div className="border-t border-gray-200 pt-2 mt-2">
                {isAuth ? (
                  <div className="space-y-2">
                    {user && (
                      <div className="px-3 py-2 text-sm text-gray-700">
                        Welcome, {user.name}
                      </div>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-medium rounded-md"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link 
                      href="/login" 
                      className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-medium rounded-md"
                    >
                      Login
                    </Link>
                    <Link 
                      href="/signup" 
                      className="block px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium text-center"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
} 