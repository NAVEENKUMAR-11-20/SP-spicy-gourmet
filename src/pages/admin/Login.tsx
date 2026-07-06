import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChefHat, Lock, Mail } from 'lucide-react';
import { pb } from '../../api/pocketbase';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Authenticate with PocketBase
      await pb.collection('users').authWithPassword(email, password);
      navigate('/admin/dashboard');
    } catch (err: any) {
      console.warn('PocketBase auth failed. Using fallback testing credentials.', err);
      // For review and testing: allow access using demo/demo admin credentials
      if (
        (email === 'admin@spspicy.com' && password === 'admin123') ||
        (email === 'naveenkumar11202006@gmail.com' && password === 'admin123') ||
        (email === 'naveenkumar11202006@gmail.com' && password === 'admin')
      ) {
        localStorage.setItem('sp_mock_logged', 'true');
        navigate('/admin/dashboard');
      } else {
        setError(err.message || 'Invalid credentials. Use admin123 as password.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full bg-white border border-gray-200 rounded-3xl p-8 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="bg-emerald-600 p-4 rounded-2xl text-white w-16 h-16 mx-auto flex items-center justify-center">
            <ChefHat className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-serif font-black text-gray-900">SP Spicy Gourmet</h1>
          <p className="text-gray-500 text-sm font-semibold tracking-wider uppercase">Staff & Admin Login</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-400" /> Email Address
            </label>
            <input
              type="email"
              required
              placeholder="admin@spspicy.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-emerald-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Lock className="w-4 h-4 text-gray-400" /> Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-emerald-500 focus:bg-white"
            />
          </div>

          {error && <p className="text-red-600 font-bold text-sm text-center bg-red-50 py-2 rounded-xl">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-75"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
