import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/Button';

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const success = login(username, password);
      
      if (success) {
        navigate('/home');
      } else {
        setError('Invalid username or password');
      }
      setLoading(false);
    }, 500);
  };

  const fillDemoCredentials = (type: 'user' | 'business') => {
    if (type === 'user') {
      setUsername('user_demo');
      setPassword('demo123');
    } else {
      setUsername('business_demo');
      setPassword('demo123');
    }
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-brand via-primary-dark to-secondary-purple flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-white rounded-full mx-auto mb-4 flex items-center justify-center shadow-2xl">
            <LogIn size={40} className="text-primary-brand" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome to Mapleon</h1>
          <p className="text-white/80">Discover amazing local businesses</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-brand focus:border-transparent transition-all"
                placeholder="Enter username"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-brand focus:border-transparent transition-all"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-error/10 border border-error/20 text-error text-sm px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            {/* Login Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Log In'}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-neutral-500">Demo Accounts</span>
            </div>
          </div>

          {/* Demo Credentials */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => fillDemoCredentials('user')}
              className="w-full px-4 py-3 bg-secondary-blue/10 hover:bg-secondary-blue/20 text-secondary-blue rounded-xl text-sm font-medium transition-all active:scale-95"
            >
              Try User Account
            </button>
            <button
              type="button"
              onClick={() => fillDemoCredentials('business')}
              className="w-full px-4 py-3 bg-business-badge/10 hover:bg-business-badge/20 text-business-badge rounded-xl text-sm font-medium transition-all active:scale-95"
            >
              Try Business Account
            </button>
          </div>

          {/* Demo Info */}
          <div className="mt-6 p-4 bg-neutral-50 rounded-xl">
            <p className="text-xs text-neutral-600 mb-2 font-medium">Demo Credentials:</p>
            <div className="space-y-1 text-xs text-neutral-500">
              <div className="flex justify-between">
                <span>User:</span>
                <span className="font-mono">user_demo / demo123</span>
              </div>
              <div className="flex justify-between">
                <span>Business:</span>
                <span className="font-mono">business_demo / demo123</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-white/60 text-sm">
            Don't have an account?{' '}
            <button className="text-white font-semibold hover:underline">
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
