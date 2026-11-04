/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN - AUTHENTICATION SCREEN
 * Complete Persistent Auth & SnapScan Instant Unlock
 * 
 * TASK 1: Completely removed PayFast form / redirects / errors.
 * TASK 2: Full persistence with nexovian_user, nexovian_logged_in, nexovian_paid.
 */

import React, { useState, useEffect } from 'react';
import {
  Info,
  Eye,
  EyeOff,
  ChevronDown,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  QrCode,
  Unlock,
  Sparkles,
  GraduationCap,
  Globe
} from 'lucide-react';
import { useAuth, checkIsApp } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';

type AuthViewMode = 'login' | 'signup' | 'forgot_password';

interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
}

const SA_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English (UK)', nativeName: 'English (UK)' },
  { code: 'zu', name: 'isiZulu', nativeName: 'isiZulu' },
  { code: 'xh', name: 'isiXhosa', nativeName: 'isiXhosa' },
  { code: 'af', name: 'Afrikaans', nativeName: 'Afrikaans' },
  { code: 'nso', name: 'Sepedi', nativeName: 'Sesotho sa Leboa' },
  { code: 'tn', name: 'Setswana', nativeName: 'Setswana' },
  { code: 'st', name: 'Sesotho', nativeName: 'Sesotho' },
  { code: 'ts', name: 'Xitsonga', nativeName: 'Xitsonga' },
  { code: 'ss', name: 'siSwati', nativeName: 'siSwati' },
  { code: 've', name: 'Tshivenda', nativeName: 'Tshivenḓa' },
  { code: 'nr', name: 'isiNdebele', nativeName: 'isiNdebele' }
];

const GRADE_OPTIONS = [
  'Grade 4',
  'Grade 5',
  'Grade 6',
  'Grade 7',
  'Grade 8',
  'Grade 9',
  'Grade 10',
  'Grade 11',
  'Grade 12 (Matric)',
  'TVET / College NATED',
  'University / Higher Education'
];

function formatAuthError(err: any): string {
  if (!err) return 'An error occurred. Please try again.';

  let raw = '';
  if (typeof err === 'string') {
    raw = err;
  } else if (err.message) {
    raw = err.message;
  } else if (err.msg) {
    raw = err.msg;
  } else if (err.error_description) {
    raw = err.error_description;
  } else {
    try {
      raw = JSON.stringify(err);
    } catch {
      raw = String(err);
    }
  }

  const lower = raw.toLowerCase();

  if (
    lower.includes('invalid login credentials') ||
    lower.includes('invalid_grant') ||
    lower.includes('user not found')
  ) {
    return 'Invalid email or password. Please verify your details and try again.';
  }

  if (lower.includes('create account first')) {
    return 'Create Account first';
  }

  if (lower.includes('incorrect password')) {
    return 'Incorrect password. Please try again.';
  }

  if (
    lower.includes('user already registered') ||
    lower.includes('already exists')
  ) {
    return 'An account with this email already exists. Please log in instead.';
  }

  if (lower.includes('password should be at least')) {
    return 'Password must be at least 6 characters.';
  }

  return raw;
}

export const CreateAccountScreen: React.FC<{ initialMode?: 'login' | 'signup' }> = ({ initialMode = 'login' }) => {
  const { signUpWithEmail, signInWithEmail, resetPassword } = useAuth();
  const { setCurrentTab, setActiveLearningLanguage } = useLearning();

  const [mode, setMode] = useState<AuthViewMode>(initialMode);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  // Form inputs
  const [fullName, setFullName] = useState('');
  const [identifier, setIdentifier] = useState(''); // Mobile number or email
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedLang, setSelectedLang] = useState<LanguageOption>(SA_LANGUAGES[0]);
  const [selectedGrade, setSelectedGrade] = useState<string>(GRADE_OPTIONS[6]); // Grade 10 default
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true); // Checked by default as requested

  // Payment modal state after sign up
  const [showSnapScanModal, setShowSnapScanModal] = useState(false);
  const [hasPaidUnlocked, setHasPaidUnlocked] = useState(false);
  const [snapScanTimerNotice, setSnapScanTimerNotice] = useState(false);

  // State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [showInfoTooltip, setShowInfoTooltip] = useState(false);

  // PRE-FILL LOGIN: If nexovian_user exists in localStorage, pre-fill Email/Phone on login page!
  useEffect(() => {
    try {
      const saved = localStorage.getItem('nexovian_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.phone) {
          setIdentifier(parsed.phone);
        } else if (parsed.email) {
          // If synthetic phone email, strip suffix
          if (parsed.email.endsWith('@learner.nexovian.ai')) {
            setIdentifier(parsed.email.replace('@learner.nexovian.ai', ''));
          } else {
            setIdentifier(parsed.email);
          }
        }
        if (parsed.name && !fullName) {
          setFullName(parsed.name);
        }
        if (parsed.language) {
          const matchedLang = SA_LANGUAGES.find((l) => l.code === parsed.language);
          if (matchedLang) setSelectedLang(matchedLang);
        }
        if (parsed.grade) {
          setSelectedGrade(parsed.grade);
        }
      }
    } catch (_) {}
  }, [mode]);

  const normalizeEmail = (input: string): string => {
    const cleaned = input.trim();
    if (cleaned.includes('@')) {
      return cleaned.toLowerCase();
    }
    const digitsOnly = cleaned.replace(/[\s\-()]/g, '');
    if (/^\+?\d{9,15}$/.test(digitsOnly)) {
      return `${digitsOnly.replace('+', '')}@learner.nexovian.ai`;
    }
    return cleaned.toLowerCase();
  };

  // LOGIN SUBMIT HANDLER
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!identifier.trim()) {
        throw new Error('Please enter your mobile number or email address.');
      }
      if (!password) {
        throw new Error('Please enter your password.');
      }

      const rawInput = identifier.trim().toLowerCase();
      const digitsInput = identifier.replace(/[\s\-()]/g, '');
      const emailToUse = normalizeEmail(identifier);

      // 1. Check localStorage first
      const savedUserRaw = localStorage.getItem('nexovian_user');
      let localFound = false;

      if (savedUserRaw) {
        try {
          const savedUser = JSON.parse(savedUserRaw);
          const savedEmail = (savedUser.email || '').toLowerCase();
          const savedPhone = (savedUser.phone || '').replace(/[\s\-()]/g, '');

          const matches =
            savedEmail === rawInput ||
            savedEmail === emailToUse ||
            (savedPhone && savedPhone === digitsInput);

          if (matches) {
            localFound = true;
            if (savedUser.password && savedUser.password !== password) {
              throw new Error('Incorrect password. Please try again.');
            }
            // Password matches stored credentials
            localStorage.setItem('nexovian_logged_in', 'true');
            if (savedUser.language) {
              setActiveLearningLanguage(savedUser.language as any);
            }
            setCurrentTab('home');
            return;
          }
        } catch (err: any) {
          if (err.message?.includes('Incorrect password')) {
            throw err;
          }
        }
      }

      // 2. Try Supabase sign in if not matched or as secondary source
      try {
        await signInWithEmail(emailToUse, password, rememberMe);
        localStorage.setItem('nexovian_logged_in', 'true');
        setCurrentTab('home');
      } catch (supaErr: any) {
        if (!localFound) {
          if (!savedUserRaw) {
            throw new Error('Create Account first');
          }
          const msg = formatAuthError(supaErr);
          if (msg.toLowerCase().includes('invalid') || msg.toLowerCase().includes('user not found')) {
            throw new Error('Create Account first');
          }
          throw supaErr;
        }
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || formatAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  // SIGN UP SUBMIT HANDLER
  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!fullName.trim()) {
        throw new Error('Please enter your full name.');
      }
      if (!identifier.trim()) {
        throw new Error('Please enter your mobile number or email address.');
      }
      if (!password) {
        throw new Error('Please create a password.');
      }
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters.');
      }
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match. Please verify your password confirmation.');
      }

      const isEmail = identifier.includes('@');
      const emailToUse = normalizeEmail(identifier);
      const phoneToUse = !isEmail ? identifier.trim() : '';

      // Save user profile and login state in localStorage
      const userData = {
        name: fullName.trim(),
        email: emailToUse,
        phone: phoneToUse,
        language: selectedLang.code,
        grade: selectedGrade,
        password: password
      };

      localStorage.setItem('nexovian_user', JSON.stringify(userData));
      localStorage.setItem('nexovian_logged_in', 'true');
      if (localStorage.getItem('nexovian_paid') !== 'true') {
        localStorage.setItem('nexovian_paid', 'false');
      }

      setActiveLearningLanguage(selectedLang.code as any);

      // Attempt background Supabase account registration
      try {
        await signUpWithEmail(emailToUse, password, fullName.trim(), selectedLang.code);
      } catch (supaErr) {
        console.warn('Supabase profile creation note:', supaErr);
      }

      // Open SnapScan in a new tab as requested
      window.open('https://pos.snapscan.io/qr/NKJJYpV6', '_blank');

      // Show payment completion modal with side-by-side buttons
      setShowSnapScanModal(true);

      // 10s timer popup: "Payment done? Click Unlock Now"
      setTimeout(() => {
        setSnapScanTimerNotice(true);
      }, 10000);
    } catch (err: any) {
      console.error('Sign up error:', err);
      setError(formatAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  // UNLOCK ACTION
  const handleInstantUnlock = () => {
    try {
      localStorage.setItem('nexovian_paid', 'true');
    } catch (_) {}
    setHasPaidUnlocked(true);
    setTimeout(() => {
      setShowSnapScanModal(false);
      setCurrentTab('home');
      if (typeof window !== 'undefined') {
        window.history.pushState({}, '', '/app');
      }
    }, 1200);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!identifier.trim()) {
        throw new Error('Please enter your mobile number or email address to reset your password.');
      }
      const emailToUse = normalizeEmail(identifier);
      await resetPassword(emailToUse);
      setResetSuccess(true);
    } catch (err: any) {
      console.error('Reset password error:', err);
      setError(formatAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F5EF] flex flex-col justify-between text-slate-900 font-sans selection:bg-[#facc15] selection:text-slate-950">
      
      {/* Top Bar: Return link & SA Language Selector */}
      <div className="w-full pt-4 px-4 flex items-center justify-between max-w-xl mx-auto">
        <button
          onClick={() => setCurrentTab('landing')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-950 transition-colors py-1.5 px-3 rounded-full hover:bg-slate-200/60"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </button>

        <div className="flex items-center gap-2">
          <Globe className="w-3.5 h-3.5 text-slate-500" />
          <select
            value={selectedLang.code}
            onChange={(e) => {
              const lang = SA_LANGUAGES.find((l) => l.code === e.target.value);
              if (lang) {
                setSelectedLang(lang);
                setActiveLearningLanguage(lang.code as any);
              }
            }}
            className="bg-transparent text-xs font-semibold text-slate-700 outline-none cursor-pointer border-b border-dashed border-slate-400 pb-0.5"
          >
            {SA_LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.nativeName} ({lang.name})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-md mx-auto px-5 py-6 flex-1 flex flex-col justify-center">
        
        {/* Brand Circle Logo */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-[#0F172A] flex items-center justify-center shadow-lg border-2 border-[#facc15]/30 mb-2">
            <span className="font-display text-4xl font-black text-[#facc15] tracking-tight">
              N
            </span>
          </div>
          <span className="font-display text-xl font-black tracking-widest text-[#0F172A]">
            NEXOVIAN
          </span>
          <span className="text-xs font-bold text-amber-700 tracking-wide mt-0.5">
            Grade 4 to University • 11 Languages • R60 / month
          </span>
        </div>

        {/* Global Error Banner */}
        {error && (
          <div className="mb-4 p-3.5 rounded-2xl bg-rose-50 border border-rose-300 text-rose-900 text-xs flex items-start gap-2.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1 font-semibold leading-relaxed">{error}</div>
          </div>
        )}

        {/* ========================================================
            VIEW MODE: LOGIN
           ======================================================== */}
        {mode === 'login' && (
          <div className="w-full bg-white/70 backdrop-blur-xs p-6 rounded-3xl border border-slate-200/80 shadow-md">
            <div className="text-center mb-5">
              <h2 className="text-xl font-black text-slate-950 font-display">
                Sign in to continue
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Enter your registered details to access your learning dashboard
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              {/* Input 1: Email or Mobile */}
              <div className="relative">
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Mobile number or email address"
                  className="w-full h-[52px] bg-white text-[#0f172a] placeholder:text-[#94a3b8] border border-[#d1d5db] rounded-2xl px-5 pr-11 text-[15px] font-medium focus:border-[#facc15] focus:ring-2 focus:ring-[#facc15]/30 outline-none shadow-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowInfoTooltip(!showInfoTooltip)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer p-1"
                >
                  <Info className="w-4 h-4" />
                </button>
                {showInfoTooltip && (
                  <div className="absolute z-20 left-0 right-0 -top-12 bg-slate-900 text-white text-[11px] p-2 rounded-lg shadow-lg">
                    Enter your registered email address or mobile number.
                  </div>
                )}
              </div>

              {/* Input 2: Password */}
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full h-[52px] bg-white text-[#0f172a] placeholder:text-[#94a3b8] border border-[#d1d5db] rounded-2xl px-5 pr-11 text-[15px] font-medium focus:border-[#facc15] focus:ring-2 focus:ring-[#facc15]/30 outline-none shadow-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Remember me checkbox (checked by default) */}
              <div className="flex items-center justify-between pt-1 pb-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-[#facc15] bg-white border-[#d1d5db] rounded focus:ring-0 cursor-pointer accent-[#facc15]"
                  />
                  <span className="text-xs text-slate-700 font-medium">
                    Remember me / Save login details
                  </span>
                </label>

                <button
                  type="button"
                  onClick={() => {
                    setError(null);
                    setMode('forgot_password');
                  }}
                  className="text-xs text-slate-900 font-bold hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-[48px] rounded-[25px] bg-[#facc15] hover:bg-[#eab308] text-[#0F172A] font-bold text-[16px] shadow-sm hover:shadow transition-all transform active:scale-[0.99] flex items-center justify-center cursor-pointer disabled:opacity-60"
              >
                {loading ? 'Logging in...' : 'Log in'}
              </button>
            </form>

            {/* Create Account switch */}
            <div className="mt-8 pt-5 border-t border-slate-200 text-center">
              <p className="text-xs text-slate-600 mb-3 font-medium">
                New to NEXOVIAN? Start free for 2 days
              </p>
              <button
                type="button"
                onClick={() => {
                  setError(null);
                  setMode('signup');
                  if (typeof window !== 'undefined') {
                    window.history.pushState({}, '', '/signup');
                  }
                }}
                className="w-full h-[48px] rounded-[25px] bg-white border border-[#0F172A] text-[#0F172A] font-bold text-[15px] hover:bg-slate-100 transition-all flex items-center justify-center cursor-pointer shadow-xs active:scale-[0.99]"
              >
                Create Account - Start 2-Day Free Trial
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            VIEW MODE: SIGN UP (CREATE ACCOUNT)
           ======================================================== */}
        {mode === 'signup' && (
          <div className="w-full bg-white/70 backdrop-blur-xs p-6 rounded-3xl border border-slate-200/80 shadow-md">
            <div className="text-center mb-5">
              <h2 className="text-2xl font-black text-slate-950 font-display tracking-tight">
                Create Account
              </h2>
              <p className="text-xs font-bold text-amber-700 mt-0.5">
                Start 2-Day Free Trial • Then R60/month • Cancel anytime
              </p>
              <div className="mt-2.5 flex flex-wrap justify-center gap-1.5 text-[10px] text-slate-700 font-semibold">
                <span className="px-2 py-0.5 rounded-full bg-yellow-100 border border-yellow-300">✓ 11 SA Languages</span>
                <span className="px-2 py-0.5 rounded-full bg-yellow-100 border border-yellow-300">✓ Grade 4 to University</span>
                <span className="px-2 py-0.5 rounded-full bg-yellow-100 border border-yellow-300">✓ AI Socratic Tutor</span>
              </div>
            </div>

            <form onSubmit={handleSignUpSubmit} className="space-y-3">
              {/* Field 1: Full Name */}
              <div>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full name"
                  className="w-full h-[50px] bg-white text-[#0f172a] placeholder:text-[#94a3b8] border border-[#d1d5db] rounded-2xl px-4 text-[14px] font-medium focus:border-[#facc15] focus:ring-2 focus:ring-[#facc15]/30 outline-none shadow-xs"
                />
              </div>

              {/* Field 2: Phone / Email */}
              <div className="relative">
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Phone number or email address"
                  className="w-full h-[50px] bg-white text-[#0f172a] placeholder:text-[#94a3b8] border border-[#d1d5db] rounded-2xl px-4 pr-10 text-[14px] font-medium focus:border-[#facc15] focus:ring-2 focus:ring-[#facc15]/30 outline-none shadow-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowInfoTooltip(!showInfoTooltip)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1"
                >
                  <Info className="w-4 h-4" />
                </button>
              </div>

              {/* Field 3: Password */}
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password (min 6 characters)"
                  className="w-full h-[50px] bg-white text-[#0f172a] placeholder:text-[#94a3b8] border border-[#d1d5db] rounded-2xl px-4 pr-10 text-[14px] font-medium focus:border-[#facc15] focus:ring-2 focus:ring-[#facc15]/30 outline-none shadow-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Field 4: Confirm Password */}
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className="w-full h-[50px] bg-white text-[#0f172a] placeholder:text-[#94a3b8] border border-[#d1d5db] rounded-2xl px-4 pr-10 text-[14px] font-medium focus:border-[#facc15] focus:ring-2 focus:ring-[#facc15]/30 outline-none shadow-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Field 5 & 6: Language & Grade Dropdowns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">
                    Preferred Language (11 Official)
                  </label>
                  <select
                    value={selectedLang.code}
                    onChange={(e) => {
                      const l = SA_LANGUAGES.find((lang) => lang.code === e.target.value);
                      if (l) setSelectedLang(l);
                    }}
                    className="w-full h-[46px] bg-white text-slate-900 border border-[#d1d5db] rounded-xl px-3 text-xs font-semibold focus:border-[#facc15] outline-none"
                  >
                    {SA_LANGUAGES.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.nativeName} ({lang.name})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">
                    Grade Level (4 to University)
                  </label>
                  <select
                    value={selectedGrade}
                    onChange={(e) => setSelectedGrade(e.target.value)}
                    className="w-full h-[46px] bg-white text-slate-900 border border-[#d1d5db] rounded-xl px-3 text-xs font-semibold focus:border-[#facc15] outline-none"
                  >
                    {GRADE_OPTIONS.map((gr) => (
                      <option key={gr} value={gr}>
                        {gr}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Remember me checkbox (checked by default) */}
              <div className="flex items-center gap-2 pt-1 pb-1">
                <input
                  id="signup-remember-checkbox"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-[#facc15] bg-white border-[#d1d5db] rounded focus:ring-0 cursor-pointer accent-[#facc15]"
                />
                <label
                  htmlFor="signup-remember-checkbox"
                  className="text-xs text-slate-700 font-medium select-none cursor-pointer"
                >
                  Remember me / Save login details
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-[48px] rounded-[25px] bg-[#facc15] hover:bg-[#eab308] text-[#0F172A] font-bold text-[16px] shadow-sm hover:shadow transition-all transform active:scale-[0.99] flex items-center justify-center cursor-pointer disabled:opacity-60"
                >
                  {loading ? 'Creating account...' : 'Create Account - Instant Access'}
                </button>
              </div>

              {/* Link back to login */}
              <div className="pt-3 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setError(null);
                    setMode('login');
                    if (typeof window !== 'undefined') {
                      window.history.pushState({}, '', '/login');
                    }
                  }}
                  className="text-xs text-slate-800 font-bold hover:underline cursor-pointer"
                >
                  Already have an account? Log in
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================
            VIEW MODE: FORGOT PASSWORD
           ======================================================== */}
        {mode === 'forgot_password' && (
          <div className="w-full bg-white/70 backdrop-blur-xs p-6 rounded-3xl border border-slate-200/80 shadow-md">
            <div className="text-center mb-5">
              <h2 className="text-xl font-black text-slate-950 font-display">
                Reset your password
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Enter your mobile number or email address to receive reset instructions
              </p>
            </div>

            {resetSuccess ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs space-y-2 animate-in fade-in">
                <div className="font-bold flex items-center gap-1.5 text-emerald-950">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Reset instructions dispatched!</span>
                </div>
                <p>Please check your inbox or SMS for instructions to reset your account password.</p>
                <button
                  type="button"
                  onClick={() => {
                    setResetSuccess(false);
                    setMode('login');
                  }}
                  className="text-xs font-bold text-[#0F172A] underline pt-2 block"
                >
                  Return to login
                </button>
              </div>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-3.5">
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Mobile number or email address"
                  className="w-full h-[52px] bg-white text-[#0f172a] placeholder:text-[#94a3b8] border border-[#d1d5db] rounded-2xl px-5 text-[15px] font-medium focus:border-[#facc15] focus:ring-2 focus:ring-[#facc15]/30 outline-none shadow-xs"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-[48px] rounded-[25px] bg-[#facc15] hover:bg-[#eab308] text-[#0F172A] font-bold text-[16px] shadow-sm hover:shadow transition-all transform active:scale-[0.99] flex items-center justify-center cursor-pointer disabled:opacity-60"
                >
                  {loading ? 'Sending...' : 'Send reset instructions'}
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setError(null);
                      setMode('login');
                    }}
                    className="text-xs text-slate-700 hover:text-slate-950 font-bold underline"
                  >
                    Back to login
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>

      {/* ========================================================
          SNAPSCAN PAYMENT & UNLOCK MODAL (ON ACCOUNT CREATION)
         ======================================================== */}
      {showSnapScanModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-5 animate-in zoom-in-95">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-400/20 text-amber-500 flex items-center justify-center border border-amber-400/40">
              <Sparkles className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                Account Created Successfully
              </span>
              <h3 className="text-2xl font-black text-slate-950 font-display mt-2">
                Unlock NEXOVIAN Premium
              </h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Pay R60 with SnapScan for full instant access to Grade 4 to University in all 11 official South African languages.
              </p>
            </div>

            {hasPaidUnlocked ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-center space-y-1 animate-in fade-in">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-sm">Access Granted - Start Learning!</h4>
                <p className="text-xs text-emerald-800">Opening your personalized dashboard now...</p>
              </div>
            ) : (
              <div className="space-y-3 pt-1">
                {/* Button 1: Pay R60 with SnapScan */}
                <button
                  type="button"
                  onClick={() => window.open('https://pos.snapscan.io/qr/NKJJYpV6', '_blank')}
                  className="w-full py-3.5 px-4 rounded-2xl bg-[#0077b6] hover:bg-[#023e8a] text-white font-bold text-base flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer"
                >
                  <QrCode className="w-5 h-5" />
                  <span>Pay R60 with SnapScan</span>
                </button>

                {/* Button 2: I Have Paid - Unlock App */}
                <button
                  type="button"
                  onClick={handleInstantUnlock}
                  className="w-full py-3.5 px-4 rounded-2xl bg-[#ffd700] hover:bg-[#facc15] text-black font-extrabold text-base flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer"
                >
                  <Unlock className="w-5 h-5 text-black" />
                  <span>I Have Paid - Unlock App</span>
                </button>

                {/* Button 3: Continue to Dashboard */}
                <button
                  type="button"
                  onClick={() => {
                    setShowSnapScanModal(false);
                    setCurrentTab('home');
                  }}
                  className="w-full py-2.5 text-xs text-slate-600 hover:text-slate-900 font-semibold underline cursor-pointer"
                >
                  Start 2-Day Free Trial (Go to Dashboard)
                </button>
              </div>
            )}

            {snapScanTimerNotice && !hasPaidUnlocked && (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-xs flex items-center justify-between gap-2">
                <span>Payment done? Click <strong>&quot;I Have Paid - Unlock App&quot;</strong> to start!</span>
                <button
                  onClick={handleInstantUnlock}
                  className="px-2.5 py-1 bg-amber-400 font-bold rounded-lg text-black text-[11px] shrink-0"
                >
                  Unlock Now
                </button>
              </div>
            )}

            <div className="text-[11px] text-slate-500 pt-1">
              ✓ 11 SA Languages ✓ Past Papers &amp; Memos ✓ CAPS &amp; TVET Aligned
            </div>
          </div>
        </div>
      )}

      {/* Bottom Footer Trust Line */}
      <footer className="w-full py-4 text-center text-[11px] text-slate-600 font-medium">
        ∞ NEXOVIAN (PTY) LTD • Built in Mpumalanga • Level 1 B-BBEE
      </footer>
    </div>
  );
};

export default CreateAccountScreen;
