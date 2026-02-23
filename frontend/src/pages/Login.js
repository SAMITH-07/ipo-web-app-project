import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import GoogleOAuth from '../components/GoogleOAuth';
import Navbar from '../components/Navbar';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      
      // Store token and user data
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Redirect based on role
      if (response.data.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{backgroundColor: '#F5F7FA'}}>
      {/* Navigation */}
      <Navbar />
      
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full" style={{backgroundColor: '#0B3C5D'}}>
              <div className="text-white text-xl font-bold">IPO</div>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold" style={{color: '#1C1C1C'}}>
              Sign in to IPO Platform
            </h2>
            <p className="mt-2 text-center text-sm" style={{color: '#6B7280'}}>
              Or{' '}
              <Link to="/register" className="font-medium hover:underline" style={{color: '#1F4E79'}}>
                create a new account
              </Link>
            </p>
          </div>
        
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="border rounded px-4 py-3" style={{borderColor: '#FCA5A5', backgroundColor: '#FEE2E2', color: '#991B1B'}}>
                {error}
              </div>
            )}
          
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium" style={{color: '#1C1C1C'}}>
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border rounded-md focus:outline-none focus:z-10 sm:text-sm"
                  style={{borderColor: '#D1D5DB', color: '#1C1C1C'}}
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium" style={{color: '#1C1C1C'}}>
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border rounded-md focus:outline-none focus:z-10 sm:text-sm"
                  style={{borderColor: '#D1D5DB', color: '#1C1C1C'}}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{backgroundColor: '#0B3C5D', color: '#FFFFFF'}}
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>

            <div className="text-center">
              <p className="text-sm" style={{color: '#6B7280'}}>
                Demo Admin: admin@ipo.com / admin123
              </p>
              <p className="text-sm" style={{color: '#6B7280'}}>
                Demo User: user@ipo.com / user123
              </p>
            </div>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t" style={{borderColor: '#E5E7EB'}}></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 rounded" style={{backgroundColor: '#F5F7FA', color: '#6B7280'}}>Or continue with</span>
                </div>
              </div>

              <div className="mt-6">
                <GoogleOAuth 
                  onLoginSuccess={(user) => {
                    navigate('/dashboard');
                  }}
                  buttonText="Sign in with Google"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
