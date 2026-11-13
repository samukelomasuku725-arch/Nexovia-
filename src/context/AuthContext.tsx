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
import { syncSubscriptionStatus, clearCachedPaystackFlags } from '../services/paystackService';

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
      const isLogged = localStorage.getItem('nexovian_logged_in') === 'true';
      const rawNexUser = localStorage.getItem('nexovian_user');
      if (isLogged && rawNexUser) {
        const parsed = JSON.parse(rawNexUser);
        return {
          id: parsed.id || `usr_${(parsed.email || parsed.phone || 'learner').replace(/[^a-zA-Z0-9]/g, '_')}`,
          name: parsed.name || 'Learner',
          email: parsed.email || (parsed.phone ? `${parsed.phone}@learner.nexovian.ai` : 'learner@nexovian.group'),
          preferredLanguage: parsed.language || 'en',
          gradeOrProgramme: parsed.grade || 'Grade 10',
          createdAt: new Date().toISOString()
        };
      }
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

          if (!isApp && !isRemembered && !isTabActive && initialSession && localStorage.getItem('nexovian_logged_in') !== 'true') {
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
            localStorage.setItem('nexovian_logged_in', 'true');
            sessionStorage.setItem(TAB_SESSION_KEY, 'true');
            // Sync to Supabase profiles table
            syncUserProfileToSupabase(initialSession.user, profile.name, profile.preferredLanguage);
          } else {
            // Check if there was no active supabase session
            setSession(null);
            setSupabaseUser(null);
            const isLocalLogged = localStorage.getItem('nexovian_logged_in') === 'true';
            const rawUser = localStorage.getItem('nexovian_user');
            if (isLocalLogged && rawUser) {
              try {
                const parsed = JSON.parse(rawUser);
                const localProfile: UserProfile = {
                  id: parsed.id || `usr_${(parsed.email || parsed.phone || 'learner').replace(/[^a-zA-Z0-9]/g, '_')}`,
                  name: parsed.name || 'Learner',
                  email: parsed.email || (parsed.phone ? `${parsed.phone}@learner.nexovian.ai` : 'learner@nexovian.group'),
                  preferredLanguage: parsed.language || 'en',
                  gradeOrProgramme: parsed.grade || 'Grade 10',
                  createdAt: new Date().toISOString()
                };
                setUser(localProfile);
              } catch (_) {
                setUser(null);
              }
            } else {
              setUser(null);
              localStorage.removeItem(LOCAL_USER_KEY);
            }
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

  // Sync Paystack subscription status whenever user email changes
  useEffect(() => {
    if (user?.email) {
      syncSubscriptionStatus(user.email, user.id).catch(() => {});
    }
  }, [user?.email, user?.id]);

  // Sign up with Email + Password + Full Name + Language preference (persists to DB + Supabase)
  const signUpWithEmail = async (
    email: string,
    password: string,
    fullName = '',
    preferredLanguage = 'en'
  ) => {
    const cleanEmail = email.trim().toLowerCase();
    const displayName = fullName.trim() || cleanEmail.split('@')[0];

    let backendUser: UserProfile | null = null;
    try {
      const apiRes = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: displayName,
          email: cleanEmail,
          password,
          preferredLanguage
        })
      });
      const apiData = await apiRes.json();
      if (!apiRes.ok || !apiData?.success) {
        throw new Error(apiData?.message || 'Registration failed.');
      }
      if (apiData.data?.token) {
        localStorage.setItem('nexovian_auth_token', apiData.data.token);
      }
      if (apiData.data?.user) {
        backendUser = {
          id: apiData.data.user.id,
          email: apiData.data.user.email,
          name: apiData.data.user.name,
          preferredLanguage: apiData.data.user.preferredLanguage || preferredLanguage,
          createdAt: apiData.data.user.createdAt
        };
      }
    } catch (backendErr: any) {
      if (backendErr?.message && !backendErr.message.includes('Failed to fetch')) {
        throw backendErr;
      }
    }

    // Attempt Supabase registration alongside backend DB persistence
    let supaData: any = null;
    try {
      const { data, error } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          data: {
            full_name: displayName,
            language_preference: preferredLanguage
          }
        }
      });
      if (!error && data?.user) {
        supaData = data;
        await syncUserProfileToSupabase(data.user, displayName, preferredLanguage);
      }
    } catch {
      // Non-blocking
    }

    const profile: UserProfile = backendUser || {
      id: supaData?.user?.id || `usr_${Date.now()}`,
      email: cleanEmail,
      name: displayName,
      preferredLanguage,
      createdAt: supaData?.user?.created_at || new Date().toISOString()
    };

    setUser(profile);
    if (supaData?.user) setSupabaseUser(supaData.user);
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(profile));
    localStorage.setItem('nexovian_logged_in', 'true');
    localStorage.setItem('nexovian_last_email', cleanEmail);
    sessionStorage.setItem(TAB_SESSION_KEY, 'true');

    await syncSubscriptionStatus(profile.email, profile.id);
    return { user: profile, supabase: supaData };
  };

  // Sign in with Email + Password (verifies against backend DB first, falls back to Supabase)
  const signInWithEmail = async (email: string, password: string, rememberMe = false) => {
    const cleanEmail = email.trim().toLowerCase();
    let backendUser: UserProfile | null = null;
    let backendError: Error | null = null;

    try {
      const apiRes = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, password })
      });
      const apiData = await apiRes.json();
      if (apiRes.ok && apiData?.success && apiData.data?.user) {
        if (apiData.data.token) {
          localStorage.setItem('nexovian_auth_token', apiData.data.token);
        }
        backendUser = {
          id: apiData.data.user.id,
          email: apiData.data.user.email,
          name: apiData.data.user.name,
          preferredLanguage: apiData.data.user.preferredLanguage || 'en',
          createdAt: apiData.data.user.createdAt
        };
      } else if (apiRes.status === 401 || apiRes.status === 400) {
        backendError = new Error(apiData?.message || 'Invalid email or password.');
      }
    } catch {
      // Fallback to Supabase below
    }

    let supaData: any = null;
    if (!backendUser) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password
      });
      if (error || !data?.user) {
        throw backendError || error || new Error('Invalid email or password.');
      }
      supaData = data;
      const lang = data.user.user_metadata?.language_preference || 'en';
      const name = data.user.user_metadata?.full_name || cleanEmail.split('@')[0];
      await syncUserProfileToSupabase(data.user, name, lang);
    }

    if (rememberMe) {
      localStorage.setItem(REMEMBER_ME_KEY, 'true');
    } else {
      localStorage.removeItem(REMEMBER_ME_KEY);
    }
    sessionStorage.setItem(TAB_SESSION_KEY, 'true');

    const profile: UserProfile = backendUser || {
      id: supaData.user.id,
      email: supaData.user.email || cleanEmail,
      name: supaData.user.user_metadata?.full_name || cleanEmail.split('@')[0],
      preferredLanguage: supaData.user.user_metadata?.language_preference || 'en',
      createdAt: supaData.user.created_at
    };

    setUser(profile);
    if (supaData?.user) setSupabaseUser(supaData.user);
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(profile));
    localStorage.setItem('nexovian_logged_in', 'true');
    localStorage.setItem('nexovian_last_email', cleanEmail);

    await syncSubscriptionStatus(profile.email, profile.id);
    return { user: profile, supabase: supaData };
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
    const prevUser = user;
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.warn('Supabase signOut error:', err);
    } finally {
      setSession(null);
      setSupabaseUser(null);
      setUser(null);
      clearCachedPaystackFlags(prevUser?.id, prevUser?.email);
      localStorage.removeItem('nexovian_logged_in');
      localStorage.removeItem('nexovian_auth_token');
      localStorage.removeItem('nexovian_user');
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
    return signUpWithEmail(data.email, data.password || '', data.name || '', data.preferredLanguage || 'en');
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
