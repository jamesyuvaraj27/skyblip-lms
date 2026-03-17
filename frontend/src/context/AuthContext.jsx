import React, { useState } from 'react';
import { AuthContext } from './authContextInstance.js';

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('skyblip_token'));
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('skyblip_user');
    if (!storedUser) return null;
    try {
      return JSON.parse(storedUser);
    } catch {
      return null;
    }
  });
  const loading = false;

  const login = async (email, password) => {
    // Local authentication - no backend call
    // Simple validation: any email/password combination works
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    
    // Generate a mock token
    const mockToken = `token_${Date.now()}`;
    const mockUser = {
      id: `user_${Date.now()}`,
      email,
      name: email.split('@')[0],
      role: 'student',
      bio: '',
      createdAt: new Date().toISOString()
    };
    
    setUser(mockUser);
    setToken(mockToken);
    localStorage.setItem('skyblip_token', mockToken);
    localStorage.setItem('skyblip_user', JSON.stringify(mockUser));
    return mockUser;
  };

  const register = async (name, email, password) => {
    // Local registration - no backend call
    if (!name || !email || !password) {
      throw new Error('All fields are required');
    }
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }
    
    // Generate a mock token
    const mockToken = `token_${Date.now()}`;
    const mockUser = {
      id: `user_${Date.now()}`,
      email,
      name,
      role: 'student',
      bio: '',
      createdAt: new Date().toISOString()
    };
    
    setUser(mockUser);
    setToken(mockToken);
    localStorage.setItem('skyblip_token', mockToken);
    localStorage.setItem('skyblip_user', JSON.stringify(mockUser));
    return mockUser;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('skyblip_token');
    localStorage.removeItem('skyblip_user');
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

