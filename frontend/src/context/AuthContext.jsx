import React, { useState } from 'react';
import { AuthContext } from './authContextInstance.js';

const blockedPasswords = new Set([
  'password',
  'password123',
  '123456',
  '12345678',
  'qwerty',
  'admin123'
]);

const isBlockedPassword = (password = '') =>
  blockedPasswords.has(password.trim().toLowerCase());

const resolveRoleFromEmail = (email = '') => {
  const localPart = email.trim().toLowerCase().split('@')[0] ?? '';
  return localPart.includes('admin') ? 'admin' : 'student';
};

const createMockUser = ({ email, name, role }) => {
  const safeEmail = email.trim();

  return {
    id: `user_${Date.now()}`,
    email: safeEmail,
    name: name?.trim() || safeEmail.split('@')[0],
    role: role ?? resolveRoleFromEmail(safeEmail),
    bio: '',
    createdAt: new Date().toISOString()
  };
};

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
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    if (isBlockedPassword(password)) {
      throw new Error('Use a stronger password (avoid common leaked passwords).');
    }

    const mockToken = `token_${Date.now()}`;
    const mockUser = createMockUser({ email });

    setUser(mockUser);
    setToken(mockToken);
    localStorage.setItem('skyblip_token', mockToken);
    localStorage.setItem('skyblip_user', JSON.stringify(mockUser));
    return mockUser;
  };

  const register = async (name, email, password) => {
    if (!name || !email || !password) {
      throw new Error('All fields are required');
    }
    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters');
    }
    if (isBlockedPassword(password)) {
      throw new Error('Use a stronger password (avoid common leaked passwords).');
    }

    const mockToken = `token_${Date.now()}`;
    const mockUser = createMockUser({ email, name, role: 'student' });

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

  const updateProfile = (patch) => {
    setUser((prev) => {
      if (!prev) return prev;
      const next = {
        ...prev,
        ...(typeof patch === 'function' ? patch(prev) : patch),
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem('skyblip_user', JSON.stringify(next));
      return next;
    });
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

