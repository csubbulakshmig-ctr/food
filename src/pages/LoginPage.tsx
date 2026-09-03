import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { Page, User } from '../types';

interface LoginPageProps {
  onNavigate: (page: Page) => void;
  onLoginSuccess: (user: User) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: { email?: string; password?: string } = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      errs.email = 'Please enter a valid email address';
    }

    if (!password || password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});

    // Demo login success
    const mockUser: User = {
      fullName: email.split('@')[0].replace(/[._]/g, ' '),
      email: email.trim(),
      phone: '+91 98400 12345',
    };

    setSuccessMessage('Welcome back to Brindha Cloud Kitchen!');
    setTimeout(() => {
      onLoginSuccess(mockUser);
      onNavigate('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 900);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 sm:py-20">
      <div className="bg-white rounded-3xl border border-stone-200/80 shadow-md p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto shadow-xs">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-stone-900">
            Welcome Back
          </h1>
          <p className="text-stone-500 text-xs sm:text-sm">
            Log in to track orders, save favorite dishes, and enjoy fast checkout
          </p>
        </div>

        {successMessage && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-emerald-800 text-xs font-bold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        <form id="login-form" onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-700 block">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="login-email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className={`w-full pl-10 pr-3.5 py-2.5 bg-stone-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all ${
                  errors.email ? 'border-rose-500 bg-rose-50/20' : 'border-stone-200'
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-[11px] font-medium text-rose-600">{errors.email}</p>
            )}
          </div>

          {/* Password with Show/Hide Toggle */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-700 block">Password</label>
              <button
                type="button"
                onClick={() => alert('For this frontend demo, use any password with 6+ characters.')}
                className="text-[11px] text-orange-600 hover:text-orange-700 font-medium cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="login-password-input"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full pl-10 pr-10 py-2.5 bg-stone-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all ${
                  errors.password ? 'border-rose-500 bg-rose-50/20' : 'border-stone-200'
                }`}
              />
              <button
                type="button"
                id="toggle-login-password-btn"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1 cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-[11px] font-medium text-rose-600">{errors.password}</p>
            )}
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-stone-700">
              <input
                id="login-remember-checkbox"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-stone-300 text-orange-600 focus:ring-orange-500"
              />
              <span>Remember me on this browser</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            id="login-submit-btn"
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Log In to Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo credential tip */}
        <div className="bg-amber-50/70 border border-amber-200/60 p-3 rounded-xl text-[11px] text-amber-900 space-y-1">
          <span className="font-bold flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-600" />
            Frontend Demo Account:
          </span>
          <p>You can enter any valid email and 6+ character password to test the login experience.</p>
        </div>

        {/* Switch to Signup */}
        <div className="pt-2 text-center text-xs text-stone-600 border-t border-stone-100">
          <span>Don't have an account yet? </span>
          <button
            id="switch-to-signup-btn"
            onClick={() => onNavigate('signup')}
            className="font-bold text-orange-600 hover:text-orange-700 underline cursor-pointer"
          >
            Create an Account
          </button>
        </div>
      </div>
    </div>
  );
};
