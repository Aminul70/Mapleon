import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Store, Eye, EyeOff, Mail, Lock, UserCircle, MapPin, Building2, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/Button';

type AuthScreen = 'account-type' | 'login' | 'register-personal' | 'register-business';
type AccountType = 'personal' | 'business' | null;

// Business categories with subcategories
const businessCategories = [
  {
    name: 'Beauty & Personal Care',
    subcategories: ['Salon', 'Barber Shop', 'Spa', 'Nail Studio', 'Makeup Studio', 'Beauty Clinic', 'Skincare Studio', 'Tattoo Studio', 'Massage Center'],
  },
  {
    name: 'Fitness & Wellness',
    subcategories: ['Gym', 'Yoga Studio', 'Fitness Center', 'Dance Studio', 'Martial Arts Academy', 'CrossFit Box', 'Physiotherapy Center'],
  },
  {
    name: 'Food & Beverage',
    subcategories: ['Café', 'Restaurant', 'Fast Food', 'Dessert Shop', 'Juice Bar', 'Bakery', 'Tea House', 'Cloud Kitchen'],
  },
  {
    name: 'Retail & Shops',
    subcategories: ['Boutique', 'Clothing Store', 'Shoe Store', 'Electronics Shop', 'Gadget Repair Shop', 'Gift Shop', 'Mobile Store', 'Bookstore'],
  },
  {
    name: 'Home & Local Services',
    subcategories: ['Cleaning Service', 'Laundry/Dry Cleaning', 'Home Repair', 'Carpenter', 'Electrician', 'Plumber', 'Pest Control'],
  },
  {
    name: 'Professional Services',
    subcategories: ['Photography Studio', 'Videography Studio', 'Consultancy', 'Event Management', 'Print Shop', 'Travel Agency'],
  },
  {
    name: 'Health Services',
    subcategories: ['Clinic', 'Diagnostic Center', 'Pharmacy', 'Dental Clinic', 'Eye Care Center'],
  },
  {
    name: 'Education & Training',
    subcategories: ['Coaching Center', 'Tuition Center', 'Skill Training Institute', 'Art School', 'Music School'],
  },
  {
    name: 'Tech & Digital',
    subcategories: ['IT Service', 'Web Agency', 'Software Developer', 'Digital Marketing Agency', 'Computer Training Center'],
  },
];

export function Login() {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  
  // Screen state
  const [currentScreen, setCurrentScreen] = useState<AuthScreen>('account-type');
  const [accountType, setAccountType] = useState<AccountType>(null);
  
  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  
  // Personal registration state
  const [personalName, setPersonalName] = useState('');
  const [personalEmail, setPersonalEmail] = useState('');
  const [personalPassword, setPersonalPassword] = useState('');
  const [showPersonalPassword, setShowPersonalPassword] = useState(false);
  const [personalError, setPersonalError] = useState('');
  
  // Business registration state
  const [businessName, setBusinessName] = useState('');
  const [businessCategory, setBusinessCategory] = useState('');
  const [businessSubcategory, setBusinessSubcategory] = useState('');
  const [businessCustomCategory, setBusinessCustomCategory] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [businessPassword, setBusinessPassword] = useState('');
  const [showBusinessPassword, setShowBusinessPassword] = useState(false);
  const [businessError, setBusinessError] = useState('');

  // Email validation
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Password validation
  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    
    if (!validateEmail(loginEmail)) {
      setLoginError('Please enter a valid email address');
      return;
    }
    
    setLoginLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const success = login(loginEmail, loginPassword);
      
      if (success) {
        navigate('/home');
      } else {
        setLoginError('Invalid email or password');
      }
      setLoginLoading(false);
    }, 500);
  };

  const handlePersonalRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setPersonalError('');
    
    if (!validateEmail(personalEmail)) {
      setPersonalError('Please enter a valid email address');
      return;
    }
    
    if (!validatePassword(personalPassword)) {
      setPersonalError('Password must be at least 6 characters');
      return;
    }
    
    // Register user
    const success = register({
      name: personalName,
      email: personalEmail,
      password: personalPassword,
      accountType: 'personal',
    });
    
    if (success) {
      // Navigate to interest selection
      navigate('/interests');
    } else {
      setPersonalError('Registration failed. Please try again.');
    }
  };

  const handleBusinessRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusinessError('');
    
    if (!validateEmail(businessEmail)) {
      setBusinessError('Please enter a valid email address');
      return;
    }
    
    if (!validatePassword(businessPassword)) {
      setBusinessError('Password must be at least 6 characters');
      return;
    }
    
    if (!businessCategory) {
      setBusinessError('Please select a business category');
      return;
    }
    
    // Register business
    const success = register({
      name: businessName,
      email: businessEmail,
      password: businessPassword,
      accountType: 'business',
      category: businessCategory,
      subcategory: businessSubcategory,
      customCategory: businessCustomCategory,
      address: businessAddress,
    });
    
    if (success) {
      // Navigate to business onboarding
      navigate('/business-onboarding');
    } else {
      setBusinessError('Registration failed. Please try again.');
    }
  };

  // ⚠️ TEMPORARY MOCK SOCIAL LOGIN - REMOVE WHEN OAUTH IS INTEGRATED ⚠️
  const handleSocialLogin = (provider: string) => {
    // Generate a random mock user based on provider and account type
    const timestamp = Date.now();
    const providerName = provider.charAt(0).toUpperCase() + provider.slice(1);
    
    const mockUserData = {
      name: `${providerName} User ${Math.floor(Math.random() * 1000)}`,
      email: `${provider}user${timestamp}@temp.demo`,
      password: 'temp123', // Not actually used for social login
      accountType: accountType || 'personal' as 'personal' | 'business',
    };

    // Register the mock user
    const success = register(mockUserData);
    
    if (success) {
      // Navigate based on account type
      if (mockUserData.accountType === 'business') {
        navigate('/business-onboarding');
      } else {
        navigate('/interests');
      }
    }
  };
  // ⚠️ END OF TEMPORARY MOCK CODE ⚠️

  const getSubcategories = () => {
    const category = businessCategories.find(cat => cat.name === businessCategory);
    return category ? category.subcategories : [];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-mapleon-teal via-mapleon-gray to-mapleon-teal-tint flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <img 
            src="/44077014651.png" 
            alt="Mapleon" 
            className="w-20 h-20 mx-auto mb-4 rounded-full shadow-glow"
          />
          <h1 className="text-3xl font-bold text-mapleon-slate mb-2">Mapleon</h1>
          <p className="text-mapleon-slate/60">Discover what's nearby</p>
        </div>

        {/* Screen 1: Account Type Selection */}
        {currentScreen === 'account-type' && (
          <div className="space-y-4 animate-slide-up">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-mapleon-slate mb-2">Choose Account Type</h2>
              <p className="text-mapleon-slate/60 text-sm">Select the option that best describes you</p>
            </div>

            {/* Personal Account */}
            <button
              onClick={() => {
                setAccountType('personal');
                setCurrentScreen('login');
              }}
              className="w-full bg-white/70 backdrop-blur-lg border-2 border-white/40 hover:border-secondary-teal rounded-2xl p-6 text-left transition-all hover:shadow-lg active:scale-95"
              data-testid="personal-account-button"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary-teal to-secondary-blue rounded-xl flex items-center justify-center flex-shrink-0">
                  <User size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-mapleon-slate mb-1">Personal Account</h3>
                  <p className="text-sm text-mapleon-slate/60">For regular users who want to explore, follow businesses, and book services.</p>
                </div>
              </div>
            </button>

            {/* Business Account */}
            <button
              onClick={() => {
                setAccountType('business');
                setCurrentScreen('login');
              }}
              className="w-full bg-white/70 backdrop-blur-lg border-2 border-white/40 hover:border-business-badge rounded-2xl p-6 text-left transition-all hover:shadow-lg active:scale-95"
              data-testid="business-account-button"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-business-badge to-primary-brand rounded-xl flex items-center justify-center flex-shrink-0">
                  <Store size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-mapleon-slate mb-1">Business Account</h3>
                  <p className="text-sm text-mapleon-slate/60">For salons, gyms, cafés, restaurants, boutiques, and service providers.</p>
                </div>
              </div>
            </button>
          </div>
        )}

        {/* Screen 2: Login */}
        {currentScreen === 'login' && (
          <div className="bg-white/70 backdrop-blur-lg border-2 border-white/40 rounded-3xl p-8 animate-slide-up shadow-lg">
            <button
              onClick={() => setCurrentScreen('account-type')}
              className="flex items-center gap-2 text-mapleon-slate/60 hover:text-mapleon-slate mb-6 transition-colors"
              data-testid="back-to-account-type"
            >
              <ArrowLeft size={20} />
              <span className="text-sm">Back</span>
            </button>

            <h2 className="text-2xl font-bold text-mapleon-slate mb-6">Login</h2>

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-mapleon-slate/80 mb-2">
                  <Mail size={16} className="inline mr-2" />
                  Email
                </label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white border-2 border-mapleon-gray rounded-xl text-mapleon-slate placeholder-mapleon-slate/40 focus:outline-none focus:ring-2 focus:ring-mapleon-teal focus:border-transparent transition-all"
                  placeholder="Enter your email"
                  required
                  data-testid="login-email-input"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-mapleon-slate/80 mb-2">
                  <Lock size={16} className="inline mr-2" />
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-mapleon-gray rounded-xl text-mapleon-slate placeholder-mapleon-slate/40 focus:outline-none focus:ring-2 focus:ring-mapleon-teal focus:border-transparent transition-all"
                    placeholder="Enter your password"
                    required
                    data-testid="login-password-input"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-mapleon-slate/60 hover:text-mapleon-slate transition-colors"
                  >
                    {showLoginPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {loginError && (
                <div className="bg-semantic-error/10 border border-semantic-error/20 text-semantic-error text-sm px-4 py-3 rounded-xl">
                  {loginError}
                </div>
              )}

              {/* Login Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                disabled={loginLoading}
                data-testid="login-submit-button"
              >
                {loginLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-mapleon-slate/20" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white/70 text-mapleon-slate/60">or continue with</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => handleSocialLogin('google')}
                className="w-full px-4 py-3 bg-white hover:bg-gray-50 text-neutral-900 rounded-xl text-sm font-medium transition-all active:scale-95 flex items-center justify-center gap-3 border-2 border-gray-200"
                data-testid="google-login-button"
              >
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>

              <button
                type="button"
                onClick={() => handleSocialLogin('facebook')}
                className="w-full px-4 py-3 bg-[#1877F2] hover:bg-[#166FE5] text-white rounded-xl text-sm font-medium transition-all active:scale-95 flex items-center justify-center gap-3"
                data-testid="facebook-login-button"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Continue with Facebook
              </button>
            </div>

            {/* Register Link */}
            <div className="text-center mt-6">
              <p className="text-mapleon-slate/60 text-sm">
                Don't have an account?{' '}
                <button
                  onClick={() => setCurrentScreen(accountType === 'business' ? 'register-business' : 'register-personal')}
                  className="text-mapleon-teal font-semibold hover:underline"
                  data-testid="register-instead-button"
                >
                  Register Instead
                </button>
              </p>
            </div>
          </div>
        )}

        {/* Screen 3: Personal Registration */}
        {currentScreen === 'register-personal' && (
          <div className="bg-white/70 backdrop-blur-lg border-2 border-white/40 rounded-3xl p-8 animate-slide-up shadow-lg">
            <button
              onClick={() => setCurrentScreen('login')}
              className="flex items-center gap-2 text-mapleon-slate/60 hover:text-mapleon-slate mb-6 transition-colors"
              data-testid="back-to-login"
            >
              <ArrowLeft size={20} />
              <span className="text-sm">Back to Login</span>
            </button>

            <h2 className="text-2xl font-bold text-mapleon-slate mb-2">Create Personal Account</h2>
            <p className="text-mapleon-slate/60 text-sm mb-6">Join and start exploring local businesses</p>

            <form onSubmit={handlePersonalRegister} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-mapleon-slate/80 mb-2">
                  <UserCircle size={16} className="inline mr-2" />
                  Full Name
                </label>
                <input
                  type="text"
                  value={personalName}
                  onChange={(e) => setPersonalName(e.target.value)}
                  className="w-full px-4 py-3 bg-white border-2 border-mapleon-gray rounded-xl text-mapleon-slate placeholder-mapleon-slate/40 focus:outline-none focus:ring-2 focus:ring-mapleon-teal focus:border-transparent transition-all"
                  placeholder="Enter your full name"
                  required
                  data-testid="personal-name-input"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-mapleon-slate/80 mb-2">
                  <Mail size={16} className="inline mr-2" />
                  Email
                </label>
                <input
                  type="email"
                  value={personalEmail}
                  onChange={(e) => setPersonalEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white border-2 border-mapleon-gray rounded-xl text-mapleon-slate placeholder-mapleon-slate/40 focus:outline-none focus:ring-2 focus:ring-mapleon-teal focus:border-transparent transition-all"
                  placeholder="Enter your email"
                  required
                  data-testid="personal-email-input"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-mapleon-slate/80 mb-2">
                  <Lock size={16} className="inline mr-2" />
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPersonalPassword ? 'text' : 'password'}
                    value={personalPassword}
                    onChange={(e) => setPersonalPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-mapleon-gray rounded-xl text-mapleon-slate placeholder-mapleon-slate/40 focus:outline-none focus:ring-2 focus:ring-mapleon-teal focus:border-transparent transition-all"
                    placeholder="Create a password (min 6 characters)"
                    required
                    data-testid="personal-password-input"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPersonalPassword(!showPersonalPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-mapleon-slate/60 hover:text-mapleon-slate transition-colors"
                  >
                    {showPersonalPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {personalError && (
                <div className="bg-semantic-error/10 border border-semantic-error/20 text-semantic-error text-sm px-4 py-3 rounded-xl">
                  {personalError}
                </div>
              )}

              {/* Register Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                data-testid="personal-register-button"
              >
                Create Account
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-mapleon-slate/20" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white/70 text-mapleon-slate/60">or register with</span>
              </div>
            </div>

            {/* Social Registration */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => handleSocialLogin('google')}
                className="w-full px-4 py-3 bg-white hover:bg-gray-50 text-neutral-900 rounded-xl text-sm font-medium transition-all active:scale-95 flex items-center justify-center gap-3 border-2 border-gray-200"
              >
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Register with Google
              </button>

              <button
                type="button"
                onClick={() => handleSocialLogin('facebook')}
                className="w-full px-4 py-3 bg-[#1877F2] hover:bg-[#166FE5] text-white rounded-xl text-sm font-medium transition-all active:scale-95 flex items-center justify-center gap-3"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Register with Facebook
              </button>
            </div>

            {/* Login Link */}
            <div className="text-center mt-6">
              <p className="text-mapleon-slate/60 text-sm">
                Already have an account?{' '}
                <button
                  onClick={() => setCurrentScreen('login')}
                  className="text-mapleon-teal font-semibold hover:underline"
                >
                  Login
                </button>
              </p>
            </div>
          </div>
        )}

        {/* Screen 4: Business Registration */}
        {currentScreen === 'register-business' && (
          <div className="bg-white/70 backdrop-blur-lg border-2 border-white/40 rounded-3xl p-8 animate-slide-up max-h-[90vh] overflow-y-auto hide-scrollbar shadow-lg">
            <button
              onClick={() => setCurrentScreen('login')}
              className="flex items-center gap-2 text-mapleon-slate/60 hover:text-mapleon-slate mb-6 transition-colors"
              data-testid="back-to-login-business"
            >
              <ArrowLeft size={20} />
              <span className="text-sm">Back to Login</span>
            </button>

            <h2 className="text-2xl font-bold text-mapleon-slate mb-2">Create Business Account</h2>
            <p className="text-mapleon-slate/60 text-sm mb-6">Set up your business profile</p>

            <form onSubmit={handleBusinessRegister} className="space-y-4">
              {/* Business Name */}
              <div>
                <label className="block text-sm font-medium text-mapleon-slate/80 mb-2">
                  <Building2 size={16} className="inline mr-2" />
                  Business Name
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full px-4 py-3 bg-white border-2 border-mapleon-gray rounded-xl text-mapleon-slate placeholder-mapleon-slate/40 focus:outline-none focus:ring-2 focus:ring-mapleon-teal focus:border-transparent transition-all"
                  placeholder="Enter your business name"
                  required
                  data-testid="business-name-input"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-mapleon-slate/80 mb-2">
                  <Store size={16} className="inline mr-2" />
                  Category
                </label>
                <select
                  value={businessCategory}
                  onChange={(e) => {
                    setBusinessCategory(e.target.value);
                    setBusinessSubcategory('');
                    setBusinessCustomCategory('');
                  }}
                  className="w-full px-4 py-3 bg-white border-2 border-mapleon-gray rounded-xl text-mapleon-slate focus:outline-none focus:ring-2 focus:ring-mapleon-teal focus:border-transparent transition-all"
                  required
                  data-testid="business-category-select"
                >
                  <option value="">Select a category</option>
                  {businessCategories.map((cat) => (
                    <option key={cat.name} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                  <option value="Other">Other (Please specify your business)</option>
                </select>
              </div>

              {/* Subcategory (Optional) */}
              {businessCategory && businessCategory !== 'Other' && (
                <div>
                  <label className="block text-sm font-medium text-mapleon-slate/80 mb-2">
                    Subcategory <span className="text-mapleon-slate/40">(Optional)</span>
                  </label>
                  <select
                    value={businessSubcategory}
                    onChange={(e) => setBusinessSubcategory(e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-mapleon-gray rounded-xl text-mapleon-slate focus:outline-none focus:ring-2 focus:ring-mapleon-teal focus:border-transparent transition-all"
                    data-testid="business-subcategory-select"
                  >
                    <option value="">Select a subcategory (optional)</option>
                    {getSubcategories().map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Custom Category */}
              {businessCategory === 'Other' && (
                <div>
                  <label className="block text-sm font-medium text-mapleon-slate/80 mb-2">
                    Specify Your Business Type
                  </label>
                  <input
                    type="text"
                    value={businessCustomCategory}
                    onChange={(e) => setBusinessCustomCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-mapleon-gray rounded-xl text-mapleon-slate placeholder-mapleon-slate/40 focus:outline-none focus:ring-2 focus:ring-mapleon-teal focus:border-transparent transition-all"
                    placeholder="E.g., Pet Grooming, Car Wash, etc."
                    required
                    data-testid="business-custom-category-input"
                  />
                </div>
              )}

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-mapleon-slate/80 mb-2">
                  <MapPin size={16} className="inline mr-2" />
                  Address
                </label>
                <input
                  type="text"
                  value={businessAddress}
                  onChange={(e) => setBusinessAddress(e.target.value)}
                  className="w-full px-4 py-3 bg-white border-2 border-mapleon-gray rounded-xl text-mapleon-slate placeholder-mapleon-slate/40 focus:outline-none focus:ring-2 focus:ring-mapleon-teal focus:border-transparent transition-all"
                  placeholder="Enter your business address"
                  required
                  data-testid="business-address-input"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-mapleon-slate/80 mb-2">
                  <Mail size={16} className="inline mr-2" />
                  Email
                </label>
                <input
                  type="email"
                  value={businessEmail}
                  onChange={(e) => setBusinessEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white border-2 border-mapleon-gray rounded-xl text-mapleon-slate placeholder-mapleon-slate/40 focus:outline-none focus:ring-2 focus:ring-mapleon-teal focus:border-transparent transition-all"
                  placeholder="Enter your business email"
                  required
                  data-testid="business-email-input"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-mapleon-slate/80 mb-2">
                  <Lock size={16} className="inline mr-2" />
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showBusinessPassword ? 'text' : 'password'}
                    value={businessPassword}
                    onChange={(e) => setBusinessPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-mapleon-gray rounded-xl text-mapleon-slate placeholder-mapleon-slate/40 focus:outline-none focus:ring-2 focus:ring-mapleon-teal focus:border-transparent transition-all"
                    placeholder="Create a password (min 6 characters)"
                    required
                    data-testid="business-password-input"
                  />
                  <button
                    type="button"
                    onClick={() => setShowBusinessPassword(!showBusinessPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-mapleon-slate/60 hover:text-mapleon-slate transition-colors"
                  >
                    {showBusinessPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {businessError && (
                <div className="bg-semantic-error/10 border border-semantic-error/20 text-semantic-error text-sm px-4 py-3 rounded-xl">
                  {businessError}
                </div>
              )}

              {/* Register Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                data-testid="business-register-button"
              >
                Create Business Account
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-mapleon-slate/20" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white/70 text-mapleon-slate/60">or register with</span>
              </div>
            </div>

            {/* Social Registration */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => handleSocialLogin('google')}
                className="w-full px-4 py-3 bg-white hover:bg-gray-50 text-neutral-900 rounded-xl text-sm font-medium transition-all active:scale-95 flex items-center justify-center gap-3 border-2 border-gray-200"
              >
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Register with Google
              </button>

              <button
                type="button"
                onClick={() => handleSocialLogin('facebook')}
                className="w-full px-4 py-3 bg-[#1877F2] hover:bg-[#166FE5] text-white rounded-xl text-sm font-medium transition-all active:scale-95 flex items-center justify-center gap-3"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Register with Facebook
              </button>
            </div>

            {/* Login Link */}
            <div className="text-center mt-6">
              <p className="text-mapleon-slate/60 text-sm">
                Already have an account?{' '}
                <button
                  onClick={() => setCurrentScreen('login')}
                  className="text-mapleon-teal font-semibold hover:underline"
                >
                  Login
                </button>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
