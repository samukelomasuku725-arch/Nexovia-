import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role?: string;
  educationLevel: string;
  gradeOrProgramme: string;
  preferredLanguage: string;
  popiaConsent?: boolean;
  popiaConsentDate?: string;
  isMinor?: boolean;
  guardianEmail?: string;
  guardianConsent?: boolean;
  createdAt: string;
  updatedAt?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  token: string | null;
  login: (email: string, password?: string) => Promise<UserProfile>;
  register: (data: {
    name: string;
    email: string;
    password?: string;
    educationLevel?: string;
    gradeOrProgramme?: string;
    preferredLanguage?: string;
  }) => Promise<UserProfile>;
  updateProfile: (data: Partial<UserProfile>) => Promise<UserProfile>;
  logout: () => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'register';
  setAuthModalMode: (mode: 'login' | 'register') => void;
  passkeySupported: boolean;
}

const TOKEN_KEY = 'bp_session_token_v1';
const USER_KEY = 'bp_session_user_v1';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem(TOKEN_KEY) || null;
  });

  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const stored = localStorage.getItem(USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [passkeySupported, setPasskeySupported] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.PublicKeyCredential) {
      setPasskeySupported(true);
    }
  }, []);

  // Verify session on mount if token exists
  useEffect(() => {
    if (token && !user) {
      fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.data) {
            setUser(data.data);
            localStorage.setItem(USER_KEY, JSON.stringify(data.data));
          } else {
            logout();
          }
        })
        .catch(() => {
          // keep local fallback if offline
        });
    }
  }, [token]);

  const login = async (email: string, password = ''): Promise<UserProfile> => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.message || 'Login failed.');
    }

    const { token: newToken, user: newUser } = json.data;
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem(TOKEN_KEY, newToken);
    localStorage.setItem(USER_KEY, JSON.stringify(newUser));
    setIsAuthModalOpen(false);
    return newUser;
  };

  const register = async (data: {
    name: string;
    email: string;
    password?: string;
    educationLevel?: string;
    gradeOrProgramme?: string;
    preferredLanguage?: string;
  }): Promise<UserProfile> => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.message || 'Registration failed.');
    }

    const { token: newToken, user: newUser } = json.data;
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem(TOKEN_KEY, newToken);
    localStorage.setItem(USER_KEY, JSON.stringify(newUser));
    setIsAuthModalOpen(false);
    return newUser;
  };

  const updateProfile = async (updates: Partial<UserProfile>): Promise<UserProfile> => {
    if (!token) throw new Error('Not authenticated.');
    const res = await fetch('/api/auth/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(updates)
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.message || 'Profile update failed.');
    }
    const updatedUser = json.data;
    setUser(updatedUser);
    localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
    return updatedUser;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user && token),
        token,
        login,
        register,
        updateProfile,
        logout,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        passkeySupported
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
