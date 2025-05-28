import { useState, useEffect } from 'react';
import { UseLocalStorage } from './useLocalStorage';

export function useAuth() {
  const [token, setToken] = UseLocalStorage('auth_token', '');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!token);
  }, [token]);

  const login = (newToken: string) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken('');
  };

  return {
    token,
    isAuthenticated,
    login,
    logout,
  };
}