/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN - SUPABASE AUTH CONTEXT
 * 
 * Directly connects to Supabase Auth:
 * - Session tracking on mount & real-time onAuthStateChange
 * - Email + Password SignUp / SignIn
 * - Google Sign-In via OAuth
 * - Passwordless Magic Link via OTP
 * - Automatic profile sync to Supabase `profiles` table
 * - Logout / SignOut
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabase';
import type { User, Session } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role?: string;
  educationLevel?: string;
  gradeOrProgramme?: string;
  preferredLanguage?: string;
  focusSubjects?: string[];
  isMinor?: boolean;
  guardianEmail?: string;
  guardianConsent?: boolean;
  popiaConsent?: boolean;
  popiaConsentDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  supabaseUser: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signUpWithEmail: (email: string, password: string, fullName?: string, preferredLanguage?: string) => Promise<any>;
  signInWithEmail: (email: string, password: string, rememberMe?: boolean) => Promise<any>;
  signInWithGoogle: () => Promise<any>;
  signInWithMagicLink: (email: string) => Promise<any>;
  resetPassword: (email: string) => Promise<any>;
  logout: () => Promise<void>;
  isApp: boolean;
  // Backwards compatibility methods
  login: (email: string, password?: string) => Promise<any>;
  register: (data: any) => Promise<any>;
  updateProfile: (data: Partial<UserProfile>) => Promise<UserProfile>;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'register';
  setAuthModalMode: (mode: 'login' | 'register') => void;
  passkeySupported: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_USER_KEY = 'nexovian_auth_user_v2';
const REMEMBER_ME_KEY = 'nexovian_remember_me';
const TAB_SESSION_KEY = 'nexovian_tab_session';

/**
 * Detects if the app is running as an installed PWA or native app.
 */
export function checkIsApp(): boolean {
  if (typeof window === 'undefined') return false;
  const isStandalone = window.matchMedia && window.matchMedia('(display-mode: standalone)').matches;
  const isIos = (window.navigator as any).standalone === true;
  const isNative = localStorage.getItem('is_native_app') === 'true';
  return Boolean(isStandalone || isIos || isNative);
}

export async function syncUserProfileToSupabase(
  user: { id: string; email?: string; created_at?: string },
  fullName = '',
  languagePreference = 'en'
) {
  try {
    const { error } = await supabase.from('profiles').upsert(
      {
        id: user.id,
        email: user.email || '',
        full_name: fullName || user.email?.split('@')[0] || '',
        created_at: user.created_at || new Date().toISOString(),
        language_preference: languagePreference,
        updated_at: new Date().toISOString()
      },
      { onConflict: 'id' }
    );
    if (error) {
      console.warn('Note on Supabase profiles sync:', error.message);
    }
  } catch (err) {
    console.warn('Supabase profiles sync error:', err);
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [supabaseUser, setSupabaseUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('register');
  const [passkeySupported] = useState(false);

  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // Initialize Supabase session on mount
  useEffect(() => {
    let mounted = true;
    const isApp = checkIsApp();

    async function initSession() {
      try {
        const { data: { session: initialSession }, error } = await supabase.auth.getSession();
        if (error) {
          console.warn('Error fetching Supabase session:', error.message);
        }

        if (mounted) {
          // If website and Remember Me was not set, and this is a new browser visit (no tab session),
          // clear the session so the user is prompted with login on every visit!
          const isRemembered = localStorage.getItem(REMEMBER_ME_KEY) === 'true';
          const isTabActive = sessionStorage.getItem(TAB_SESSION_KEY) === 'true';

          if (!isApp && !isRemembered && !isTabActive && initialSession) {
            // Website visitor without Remember Me: prompt login on new visit
            await supabase.auth.signOut();
            setSession(null);
            setSupabaseUser(null);
            setUser(null);
            localStorage.removeItem(LOCAL_USER_KEY);
            setIsLoading(false);
            return;
          }

          if (initialSession?.user) {
            setSession(initialSession);
            setSupabaseUser(initialSession.user);

            const profile: UserProfile = {
              id: initialSession.user.id,
              email: initialSession.user.email || '',
              name:
                initialSession.user.user_metadata?.full_name ||
                initialSession.user.email?.split('@')[0] ||
                'Learner',
              preferredLanguage:
                initialSession.user.user_metadata?.language_preference || 'en',
              createdAt: initialSession.user.created_at
            };

            setUser(profile);
            localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(profile));
            sessionStorage.setItem(TAB_SESSION_KEY, 'true');
            // Sync to Supabase profiles table
            syncUserProfileToSupabase(initialSession.user, profile.name, profile.preferredLanguage);
          } else {
            // Check if there was no active supabase session
            setSession(null);
            setSupabaseUser(null);
            // If there was only an old local session without real Supabase session, clear it to ensure genuine auth check
            setUser(null);
            localStorage.removeItem(LOCAL_USER_KEY);
          }
        }
      } catch (err) {
        console.warn('Supabase auth initialization error:', err);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    initSession();

    // Listen to real-time Supabase auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        if (!mounted) return;

        if (currentSession?.user) {
          setSession(currentSession);
          setSupabaseUser(currentSession.user);

          const lang = currentSession.user.user_metadata?.language_preference || 'en';
          const profile: UserProfile = {
            id: currentSession.user.id,
            email: currentSession.user.email || '',
            name:
              currentSession.user.user_metadata?.full_name ||
              currentSession.user.email?.split('@')[0] ||
              'Learner',
            preferredLanguage: lang,
            createdAt: currentSession.user.created_at
          };

          setUser(profile);
          localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(profile));
          setIsAuthModalOpen(false);

          // Save user to Supabase profiles table with email, full_name, created_at, language preference
          await syncUserProfileToSupabase(currentSession.user, profile.name, lang);
        } else {
          setSession(null);
          setSupabaseUser(null);
          setUser(null);
          localStorage.removeItem(LOCAL_USER_KEY);
        }
        setIsLoading(false);
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Listen to beforeunload to sign out unremembered website visitors
  useEffect(() => {
    const handleBeforeUnload = () => {
      const isApp = checkIsApp();
      const isRemembered = localStorage.getItem(REMEMBER_ME_KEY) === 'true';
      if (!isApp && !isRemembered) {
        // Sign out when closing tab/browser on website without Remember Me
        supabase.auth.signOut().catch(() => {});
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Sign up with Email + Password + Full Name + Language preference
  const signUpWithEmail = async (
    email: string,
    password: string,
    fullName = '',
    preferredLanguage = 'en'
  ) => {
    const displayName = fullName.trim() || email.split('@')[0];
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: displayName,
          language_preference: preferredLanguage
        }
      }
    });

    if (error) {
      throw error;
    }

    if (data.user) {
      await syncUserProfileToSupabase(data.user, displayName, preferredLanguage);

      const profile: UserProfile = {
        id: data.user.id,
        email: data.user.email || email,
        name: displayName,
        preferredLanguage,
        createdAt: data.user.created_at
      };
      setUser(profile);
      setSupabaseUser(data.user);
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(profile));
      sessionStorage.setItem(TAB_SESSION_KEY, 'true');
    }

    return data;
  };

  // Sign in with Email + Password
  const signInWithEmail = async (email: string, password: string, rememberMe = false) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      throw error;
    }

    if (rememberMe) {
      localStorage.setItem(REMEMBER_ME_KEY, 'true');
    } else {
      localStorage.removeItem(REMEMBER_ME_KEY);
    }
    sessionStorage.setItem(TAB_SESSION_KEY, 'true');

    if (data.user) {
      const lang = data.user.user_metadata?.language_preference || 'en';
      const name = data.user.user_metadata?.full_name || email.split('@')[0];
      await syncUserProfileToSupabase(data.user, name, lang);

      const profile: UserProfile = {
        id: data.user.id,
        email: data.user.email || email,
        name,
        preferredLanguage: lang,
        createdAt: data.user.created_at
      };
      setUser(profile);
      setSupabaseUser(data.user);
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(profile));
    }

    return data;
  };

  // Reset password
  const resetPassword = async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin
    });

    if (error) {
      throw error;
    }

    return data;
  };

  // Google OAuth Sign In
  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    });

    if (error) {
      throw error;
    }

    return data;
  };

  // Magic Link Sign In (OTP)
  const signInWithMagicLink = async (email: string) => {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin
      }
    });

    if (error) {
      throw error;
    }

    return data;
  };

  // Logout / SignOut
  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.warn('Supabase signOut error:', err);
    } finally {
      setSession(null);
      setSupabaseUser(null);
      setUser(null);
      localStorage.removeItem(LOCAL_USER_KEY);
      localStorage.removeItem(REMEMBER_ME_KEY);
      sessionStorage.removeItem(TAB_SESSION_KEY);
    }
  };

  // Backward-compatible wrappers
  const login = async (email: string, password = ''): Promise<any> => {
    return signInWithEmail(email, password);
  };

  const register = async (data: any): Promise<any> => {
    return signUpWithEmail(data.email, data.password || 'TemporaryPassword123!', data.name || '', data.preferredLanguage || 'en');
  };

  const updateProfile = async (updates: Partial<UserProfile>): Promise<UserProfile> => {
    if (!user) throw new Error('Not authenticated.');
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(updated));
    if (supabaseUser) {
      await syncUserProfileToSupabase(supabaseUser, updated.name || '', updated.preferredLanguage || 'en');
    }
    return updated;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        supabaseUser,
        session,
        isAuthenticated: Boolean(user && user.email),
        isLoading,
        signUpWithEmail,
        signInWithEmail,
        signInWithGoogle,
        signInWithMagicLink,
        resetPassword,
        logout,
        isApp: checkIsApp(),
        login,
        register,
        updateProfile,
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
