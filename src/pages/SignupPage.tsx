import React, { useState } from 'react';
import { UserPlus, User, Mail, Phone, Lock, Eye, EyeOff, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Page, User as UserType } from '../types';

interface SignupPageProps {
  onNavigate: (page: Page) => void;
  onSignupSuccess: (user: UserType) => void;
}

export const SignupPage: React.FC<SignupPageProps> = ({ onNavigate, onSignupSuccess }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const [successMessage, setSuccessMessage] = useState('');

  const validate = () => {
    const errs: typeof errors = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      errs.fullName = 'Please enter your full name';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      errs.email = 'Please enter a valid email address';
    }

    const cleanPhone = phoneNumber.trim().replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.phone = 'Please enter a valid 10-digit mobile number';
    }

    if (!password || password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }

    if (password !== confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }

    return errs;
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    const newUser: UserType = {
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phoneNumber.trim(),
    };

    setSuccessMessage('Account created successfully! Logging you in...');
    setTimeout(() => {
      onSignupSuccess(newUser);
      onNavigate('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 900);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-10 sm:py-16">
      <div className="bg-white rounded-3xl border border-stone-200/80 shadow-md p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto shadow-xs">
            <UserPlus className="w-6 h-6" />
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-stone-900">
            Create Your Account
          </h1>
          <p className="text-stone-500 text-xs sm:text-sm">
            Join Brindha Cloud Kitchen for exclusive discounts, seamless re-ordering, and fast
            checkout
          </p>
        </div>

        {successMessage && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-emerald-800 text-xs font-bold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        <form id="signup-form" onSubmit={handleSignup} className="space-y-4">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-700 block">Full Name *</label>
            <div className="relative">
              <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="signup-name-input"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Brindha Sundaram"
                className={`w-full pl-10 pr-3.5 py-2.5 bg-stone-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all ${
                  errors.fullName ? 'border-rose-500 bg-rose-50/20' : 'border-stone-200'
                }`}
              />
            </div>
            {errors.fullName && (
              <p className="text-[11px] font-medium text-rose-600">{errors.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-700 block">Email Address *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="signup-email-input"
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

          {/* Phone Number */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-700 block">Phone Number *</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="signup-phone-input"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="10-digit mobile number"
                className={`w-full pl-10 pr-3.5 py-2.5 bg-stone-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all ${
                  errors.phone ? 'border-rose-500 bg-rose-50/20' : 'border-stone-200'
                }`}
              />
            </div>
            {errors.phone && (
              <p className="text-[11px] font-medium text-rose-600">{errors.phone}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-700 block">Password *</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="signup-password-input"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className={`w-full pl-10 pr-10 py-2.5 bg-stone-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all ${
                  errors.password ? 'border-rose-500 bg-rose-50/20' : 'border-stone-200'
                }`}
              />
              <button
                type="button"
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

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-700 block">Confirm Password *</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="signup-confirm-password-input"
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
                className={`w-full pl-10 pr-3.5 py-2.5 bg-stone-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all ${
                  errors.confirmPassword ? 'border-rose-500 bg-rose-50/20' : 'border-stone-200'
                }`}
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-[11px] font-medium text-rose-600">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Submit */}
          <button
            id="signup-submit-btn"
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer pt-3"
          >
            <span>Complete Registration</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Switch to Login */}
        <div className="pt-2 text-center text-xs text-stone-600 border-t border-stone-100">
          <span>Already have an account? </span>
          <button
            id="switch-to-login-btn"
            onClick={() => onNavigate('login')}
            className="font-bold text-orange-600 hover:text-orange-700 underline cursor-pointer"
          >
            Log In Here
          </button>
        </div>
      </div>
    </div>
  );
};
