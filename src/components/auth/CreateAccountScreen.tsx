/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN - AUTHENTICATION SCREEN (FACEBOOK LAYOUT WITH NEXOVIAN BRAND COLORS)
 * 
 * 1. Strictly NEXOVIAN Theme - NO BLUE:
 *    - Background: Cream #F6F5EF
 *    - Primary button: Yellow #facc15 with black text #0F172A
 *    - Accent & Logo: Black #0F172A circle, bold yellow 'N', text below "NEXOVIAN"
 *    - Inputs: White #FFFFFF, rounded 12px, border #ddd, height 52px
 *    - Outline button: White background, black border #0F172A, black text, 48px, rounded 25px
 * 
 * 2. Layout (Facebook mobile/web structure):
 *    - Top center: Language selector "English (UK) ▼" small gray text -> 11 SA languages
 *    - Center: 80px circle #0F172A with yellow "N"
 *    - Small text login: "R60 / learner / month"
 *    - Login mode:
 *      * Mobile number or email address + (i) icon
 *      * Password with visibility toggle
 *      * "Remember me" checkbox (default unchecked on website)
 *      * "Log in" button (yellow #facc15, black text, 48px, rounded 25px)
 *      * "Forgotten password?" link (14px black text)
 *      * 80px gap, then outline button "Create new account" (white, black border #0F172A, black text)
 *    - Create account mode:
 *      * Full name
 *      * Mobile number or email address + (i) icon
 *      * Create password
 *      * "Create new account" button (yellow #facc15, black text)
 *      * Headline: "R60 per learner / month - Learn in your language"
 *      * Subtitle: "We built NEXOVIAN to help every student understand every subject in their own language. No one is rich and no one is poor."
 *      * Features: "✓ 11 SA Languages ✓ Socratic Tutor ✓ CAPS Grade 8-12 ✓ Feedback pipeline that learns from you ✓ 4 day streak tracking"
 *      * Link: "Already have account? Log in"
 *    - Very bottom: "∞ NEXOVIAN (PTY) LTD • Built in Mpumalanga • Level 1 B-BBEE"
 */

import React, { useState } from 'react';
import {
  Info,
  Eye,
  EyeOff,
  ChevronDown,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  X,
  Check
} from 'lucide-react';
import { useAuth, checkIsApp } from '../../context/AuthContext';

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

/**
 * Format auth errors into clean, friendly human messages.
 * Never outputs raw JSON or unhandled exceptions.
 */
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

  // Parse if raw string is JSON format
  try {
    const trimmed = raw.trim();
    if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
      const parsed = JSON.parse(trimmed);
      if (parsed.msg) raw = parsed.msg;
      else if (parsed.message) raw = parsed.message;
      else if (parsed.error_description) raw = parsed.error_description;
    }
  } catch {
    // Keep raw
  }

  const lower = raw.toLowerCase();

  if (
    lower.includes('provider is not enabled') ||
    lower.includes('unsupported provider') ||
    lower.includes('validation_failed')
  ) {
    return 'Login method not available, please use Email';
  }

  if (
    lower.includes('invalid login credentials') ||
    lower.includes('invalid_grant') ||
    lower.includes('user not found')
  ) {
    return 'Invalid email or password. Please verify your details and try again.';
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

  if (lower.includes('rate limit')) {
    return 'Too many attempts. Please wait a moment and try again.';
  }

  if (lower.includes('email not confirmed')) {
    return 'Please check your email to confirm your account before logging in.';
  }

  return raw;
}

export const CreateAccountScreen: React.FC = () => {
  const { signUpWithEmail, signInWithEmail, resetPassword } = useAuth();

  const [mode, setMode] = useState<AuthViewMode>('login');
  const [selectedLang, setSelectedLang] = useState<LanguageOption>(SA_LANGUAGES[0]);
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);

  // Form inputs
  const [fullName, setFullName] = useState('');
  const [identifier, setIdentifier] = useState(''); // Mobile number or email
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [showInfoTooltip, setShowInfoTooltip] = useState(false);

  const isNativeApp = checkIsApp();

  /**
   * Helper to normalize identifier.
   * If user enters a 10-digit South African mobile number (e.g. 0821234567 or +27...),
   * converts to a valid email representation or ensures email format.
   */
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

      const emailToUse = normalizeEmail(identifier);
      await signInWithEmail(emailToUse, password, rememberMe);
    } catch (err: any) {
      console.error('Login error:', err);
      setError(formatAuthError(err));
    } finally {
      setLoading(false);
    }
  };

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

      const emailToUse = normalizeEmail(identifier);

      // STATE 2: New account created -> 1 day free trial!
      // Rule 2: Save email to used_trial_emails DB AFTER trial ends, NOT before!
      const res = await signUpWithEmail(
        emailToUse,
        password,
        fullName.trim(),
        selectedLang.code
      );

      if (res?.user && !res.session) {
        setSignUpSuccess(true);
      }
    } catch (err: any) {
      console.error('Sign up error:', err);
      setError(formatAuthError(err));
    } finally {
      setLoading(false);
    }
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
    <div className="min-h-screen w-full bg-[#F6F5EF] text-slate-900 flex flex-col justify-between items-center py-6 px-4 selection:bg-[#facc15] selection:text-slate-950 font-sans antialiased">
      
      {/* 1. TOP CENTER: Language Selector */}
      <header className="w-full max-w-[420px] flex justify-center pt-1 pb-3">
        <button
          type="button"
          onClick={() => setIsLangModalOpen(true)}
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 font-medium py-1 px-2.5 rounded-md hover:bg-slate-200/60 transition-colors cursor-pointer"
          aria-label="Select language"
        >
          <span>{selectedLang.name}</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
        </button>
      </header>

      {/* 2. MAIN CENTER CONTAINER (Max 420px width Facebook style) */}
      <main className="w-full max-w-[420px] flex-1 flex flex-col justify-center my-auto">
        
        {/* CENTER: NEXOVIAN Logo Circle (80px, #0F172A black circle, yellow 'N', border gray) + Logo below = "NEXOVIAN" */}
        <div className="flex flex-col items-center justify-center mb-6 sm:mb-8">
          <div className="w-20 h-20 rounded-full bg-[#0F172A] border border-gray-300 shadow-md flex items-center justify-center transform transition-transform hover:scale-105">
            <span className="text-[#facc15] font-display font-black text-4xl select-none leading-none tracking-tight">
              N
            </span>
          </div>
          <span className="mt-2 font-display font-black text-xl tracking-wider text-slate-950">
            NEXOVIAN
          </span>
          <span className="text-xs font-bold text-amber-700 mt-0.5">
            R60 / learner / month
          </span>
        </div>

        {/* Global Error Banner */}
        {error && (
          <div className="mb-4 p-3.5 rounded-[12px] bg-red-50 border border-red-300 text-red-700 text-xs flex items-start gap-2.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <span className="leading-relaxed font-medium">{error}</span>
          </div>
        )}

        {/* ========================================================
            VIEW MODE: LOGIN (FACEBOOK LAYOUT WITH NEXOVIAN COLORS)
           ======================================================== */}
        {mode === 'login' && (
          <div className="w-full">
            <form onSubmit={handleLoginSubmit} className="space-y-3">
              
              {/* Input 1: "Mobile number or email address" + (i) icon right */}
              <div className="relative">
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Mobile number or email address"
                  className="w-full h-[52px] bg-white border border-[#ddd] focus:border-slate-800 rounded-[12px] px-4 pr-11 text-[15px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-800 transition-all shadow-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowInfoTooltip(!showInfoTooltip)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer p-1"
                  aria-label="Information about login identifier"
                >
                  <Info className="w-4 h-4" />
                </button>

                {showInfoTooltip && (
                  <div className="absolute z-20 left-0 right-0 -top-12 bg-slate-900 text-white text-[11px] p-2 rounded-lg shadow-lg">
                    Enter your registered email address or mobile number to access your account.
                  </div>
                )}
              </div>

              {/* Input 2: "Password" */}
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full h-[52px] bg-white border border-[#ddd] focus:border-slate-800 rounded-[12px] px-4 pr-11 text-[15px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-800 transition-all shadow-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer p-1"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Remember me checkbox on website */}
              {!isNativeApp && (
                <div className="flex items-center gap-2 pt-1 pb-1">
                  <input
                    id="remember-me-checkbox"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-[#facc15] bg-white border-[#ddd] rounded focus:ring-0 cursor-pointer accent-[#facc15]"
                  />
                  <label
                    htmlFor="remember-me-checkbox"
                    className="text-xs text-slate-600 font-medium select-none cursor-pointer"
                  >
                    Remember me
                  </label>
                </div>
              )}

              {/* Primary Button: "Log in" FULL width, yellow #facc15, black text #0F172A, height 48px, rounded 25px, bold */}
              <div className="pt-1">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-[48px] rounded-[25px] bg-[#facc15] hover:bg-[#eab308] text-[#0F172A] font-bold text-[16px] shadow-sm hover:shadow transition-all transform active:scale-[0.99] flex items-center justify-center cursor-pointer disabled:opacity-60"
                >
                  {loading ? 'Logging in...' : 'Log in'}
                </button>
              </div>

              {/* Below: "Forgotten password?" centered black text 14px */}
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setError(null);
                    setMode('forgot_password');
                  }}
                  className="text-[14px] text-slate-900 font-medium hover:underline cursor-pointer"
                >
                  Forgotten password?
                </button>
              </div>
            </form>

            {/* Bottom gap 80px (mt-20) then outline button: "Create Account - Get 1 Day Free" */}
            <div className="mt-20">
              <button
                type="button"
                onClick={() => {
                  setError(null);
                  setMode('signup');
                }}
                className="w-full h-[48px] rounded-[25px] bg-white border border-[#0F172A] text-[#0F172A] font-bold text-[15px] hover:bg-slate-100 transition-all flex items-center justify-center cursor-pointer shadow-xs active:scale-[0.99]"
              >
                Create Account - Get 1 Day Free
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            VIEW MODE: CREATE ACCOUNT (FACEBOOK LAYOUT WITH NEXOVIAN COLORS)
           ======================================================== */}
        {mode === 'signup' && (
          <div className="w-full">
            
            {/* Title & Mission Header */}
            <div className="text-center mb-5">
              <h1 className="text-2xl font-black text-slate-950 font-display tracking-tight">
                Create Account - Get 1 Day Free
              </h1>
              <p className="text-sm font-black text-amber-700 mt-1">
                R60 per learner / month - Learn in your language
              </p>
              <p className="text-[12px] text-slate-600 mt-1 leading-relaxed">
                We built NEXOVIAN to help every student understand every subject in their own language. No one is rich and no one is poor.
              </p>

              {/* Feature Highlights */}
              <div className="mt-3 flex flex-wrap justify-center gap-1.5 text-[11px] text-slate-700 font-semibold">
                <span className="px-2 py-0.5 rounded-full bg-yellow-100 border border-yellow-300">✓ 11 SA Languages</span>
                <span className="px-2 py-0.5 rounded-full bg-yellow-100 border border-yellow-300">✓ Socratic Tutor</span>
                <span className="px-2 py-0.5 rounded-full bg-yellow-100 border border-yellow-300">✓ Grade 4 to University</span>
                <span className="px-2 py-0.5 rounded-full bg-yellow-100 border border-yellow-300">✓ Feedback pipeline</span>
                <span className="px-2 py-0.5 rounded-full bg-yellow-100 border border-yellow-300">✓ 4 day streak tracking</span>
              </div>
            </div>

            {/* Email Confirmation notice */}
            {signUpSuccess && (
              <div className="mb-4 p-4 rounded-[12px] bg-amber-50 border border-amber-300 text-amber-900 text-xs space-y-1 animate-in fade-in">
                <div className="font-bold flex items-center gap-1.5 text-amber-950">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                  <span>Account created successfully!</span>
                </div>
                <p>
                  Please check <strong>{identifier}</strong> for verification if prompted, or log in with your credentials.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="text-xs font-bold text-[#0F172A] underline cursor-pointer"
                  >
                    Proceed to Log in
                  </button>
                </div>
              </div>
            )}

            <form onSubmit={handleSignUpSubmit} className="space-y-3">
              
              {/* Input 1: "Full name" */}
              <div>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full name"
                  className="w-full h-[52px] bg-white border border-[#ddd] focus:border-slate-800 rounded-[12px] px-4 text-[15px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-800 transition-all shadow-xs"
                />
              </div>

              {/* Input 2: "Mobile number or email address" + (i) icon right */}
              <div className="relative">
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Mobile number or email address"
                  className="w-full h-[52px] bg-white border border-[#ddd] focus:border-slate-800 rounded-[12px] px-4 pr-11 text-[15px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-800 transition-all shadow-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowInfoTooltip(!showInfoTooltip)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer p-1"
                  aria-label="Information about login identifier"
                >
                  <Info className="w-4 h-4" />
                </button>
              </div>

              {/* Input 3: "Create password" */}
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create password - min 6 characters"
                  className="w-full h-[52px] bg-white border border-[#ddd] focus:border-slate-800 rounded-[12px] px-4 pr-11 text-[15px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-800 transition-all shadow-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer p-1"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Button: "Create Account - Get 1 Day Free" yellow #facc15 black text #0F172A, 48px, rounded 25px */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-[48px] rounded-[25px] bg-[#facc15] hover:bg-[#eab308] text-[#0F172A] font-bold text-[16px] shadow-sm hover:shadow transition-all transform active:scale-[0.99] flex items-center justify-center cursor-pointer disabled:opacity-60"
                >
                  {loading ? 'Creating account...' : 'Create Account - Get 1 Day Free'}
                </button>
              </div>

              {/* Small pricing & trial note below button */}
              <div className="pt-1 text-center">
                <p className="text-xs text-slate-500 font-medium">
                  Cancel anytime • 1 day free trial for new learners
                </p>
              </div>

              {/* Link: Already have account? Log in */}
              <div className="pt-4 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setError(null);
                    setMode('login');
                  }}
                  className="text-[14px] text-slate-900 font-medium hover:underline cursor-pointer"
                >
                  Already have account? Log in
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================
            VIEW MODE: FORGOTTEN PASSWORD
           ======================================================== */}
        {mode === 'forgot_password' && (
          <div className="w-full">
            <div className="text-center mb-5">
              <h1 className="text-2xl font-black text-slate-950 font-display tracking-tight">
                Reset your password
              </h1>
              <p className="text-xs text-slate-600 mt-1">
                Enter your registered mobile or email to receive a password reset link.
              </p>
            </div>

            {resetSuccess ? (
              <div className="p-4 rounded-[12px] bg-green-50 border border-green-300 text-green-900 text-xs space-y-2 animate-in fade-in">
                <div className="font-bold flex items-center gap-1.5 text-green-950">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>Reset link sent!</span>
                </div>
                <p>
                  We have dispatched password reset instructions to <strong>{identifier}</strong>. Please check your inbox or messages.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setResetSuccess(false);
                      setMode('login');
                    }}
                    className="w-full h-[44px] rounded-[22px] bg-[#facc15] text-[#0F172A] font-bold text-xs flex items-center justify-center cursor-pointer"
                  >
                    Back to Log in
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="Mobile number or email address"
                    className="w-full h-[52px] bg-white border border-[#ddd] focus:border-slate-800 rounded-[12px] px-4 text-[15px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-800 transition-all shadow-xs"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-[48px] rounded-[25px] bg-[#facc15] hover:bg-[#eab308] text-[#0F172A] font-bold text-[15px] shadow-sm hover:shadow transition-all flex items-center justify-center cursor-pointer disabled:opacity-60"
                  >
                    {loading ? 'Sending link...' : 'Send reset link'}
                  </button>
                </div>

                <div className="pt-3 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setError(null);
                      setMode('login');
                    }}
                    className="inline-flex items-center gap-1.5 text-[14px] text-slate-900 font-medium hover:underline cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Log in</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

      </main>

      {/* 3. VERY BOTTOM FOOTER */}
      <footer className="w-full max-w-[420px] text-center pt-8 pb-2">
        <p className="text-[11px] text-slate-500 font-medium tracking-tight">
          ∞ NEXOVIAN (PTY) LTD • Built in Mpumalanga • Level 1 B-BBEE
        </p>
        <p className="text-[10px] text-slate-400 mt-0.5">
          Reg: 2026/845572/07 · CAPS &amp; TVET Aligned
        </p>
      </footer>

      {/* 4. LANGUAGE SELECTION MODAL (11 South African Official Languages) */}
      {isLangModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-[24px] max-w-sm w-full p-5 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">Select Language</h3>
              <button
                type="button"
                onClick={() => setIsLangModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto mt-2">
              {SA_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => {
                    setSelectedLang(lang);
                    setIsLangModalOpen(false);
                  }}
                  className={`w-full py-2.5 px-3 flex items-center justify-between text-left text-sm rounded-lg hover:bg-slate-50 transition-colors cursor-pointer ${
                    selectedLang.code === lang.code ? 'font-bold text-slate-950 bg-yellow-50' : 'text-slate-700'
                  }`}
                >
                  <div>
                    <span className="block text-sm leading-tight">{lang.name}</span>
                    <span className="block text-[11px] text-slate-400">{lang.nativeName}</span>
                  </div>
                  {selectedLang.code === lang.code && (
                    <div className="w-2 h-2 rounded-full bg-[#facc15]" />
                  )}
                </button>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-center">
              <p className="text-[11px] text-slate-500">
                NEXOVIAN teaches in all 11 official South African languages
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateAccountScreen;
