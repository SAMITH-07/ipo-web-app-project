import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';

const PublicHome = () => {
  const [ipos, setIpos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchPublicIPOs();
    fetchUserData();
  }, []);

  const fetchPublicIPOs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/ipos');
      const iposData = response.data.ipos || response.data;
      setIpos(Array.isArray(iposData) ? iposData : []);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching IPOs:', err);
      setLoading(false);
    }
  };

  const fetchUserData = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      setUser(userData);
    } catch (err) {
      console.error('Error fetching user data:', err);
    }
  };

  return (
    <div className="min-h-screen" style={{backgroundColor: '#F5F7FA'}}>
      {/* Navigation */}
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{background: 'linear-gradient(135deg, #0B3C5D 0%, #1F4E79 100%)'}}>
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4">
                <div className="text-5xl font-bold text-white">IPO</div>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              India's Premier
              <span className="block" style={{color: '#2ECC71'}}>IPO Investment Platform</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
              Track, analyze, and invest in upcoming IPOs with real-time data, 
              advanced analytics, and intelligent portfolio management tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {user ? (
                <>
                  <div className="bg-white/10 backdrop-blur-lg text-white px-6 py-3 rounded-lg">
                    Welcome back, {user.name}!
                  </div>
                  <Link
                    to="/dashboard"
                    className="text-white px-8 py-4 rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg"
                    style={{backgroundColor: '#1F4E79'}}
                  >
                    View Dashboard
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="text-white px-8 py-4 rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg"
                    style={{backgroundColor: '#2ECC71'}}
                  >
                    Get Started
                  </Link>
                  <Link
                    to="/login"
                    className="text-white px-8 py-4 rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg border-2 border-white/20"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Live Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold" style={{color: '#1C1C1C'}}>Live IPO Statistics</h2>
            <p className="text-lg mt-2" style={{color: '#6B7280'}}>Real-time data from Indian stock markets</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl border" style={{background: 'linear-gradient(135deg, #F0F4F8 0%, #E8EEF4 100%)', borderColor: '#D1D5DB'}}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{backgroundColor: '#0B3C5D'}}>
                <div className="text-white text-sm font-bold">T</div>
              </div>
              <span className="text-xs font-semibold px-2 py-1 rounded" style={{color: '#0B3C5D', backgroundColor: '#EBF5FF'}}>LIVE</span>
              <h3 className="text-2xl font-bold mt-2" style={{color: '#1C1C1C'}}>156</h3>
              <p className="text-sm" style={{color: '#6B7280'}}>Total IPOs This Year</p>
            </div>
            
            <div className="p-6 rounded-xl border" style={{background: 'linear-gradient(135deg, #F0F4F8 0%, #E8EEF4 100%)', borderColor: '#D1D5DB'}}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{backgroundColor: '#2ECC71'}}>
                <div className="text-white text-sm font-bold">O</div>
              </div>
              <span className="text-xs font-semibold px-2 py-1 rounded" style={{color: '#2ECC71', backgroundColor: '#F0FDF4'}}>OPEN</span>
              <h3 className="text-2xl font-bold mt-2" style={{color: '#1C1C1C'}}>12</h3>
              <p className="text-sm" style={{color: '#6B7280'}}>Currently Open</p>
            </div>
            
            <div className="p-6 rounded-xl border" style={{background: 'linear-gradient(135deg, #F0F4F8 0%, #E8EEF4 100%)', borderColor: '#D1D5DB'}}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{backgroundColor: '#1F4E79'}}>
                <div className="text-white text-sm font-bold">U</div>
              </div>
              <span className="text-xs font-semibold px-2 py-1 rounded" style={{color: '#1F4E79', backgroundColor: '#EFF6FF'}}>UPCOMING</span>
              <h3 className="text-2xl font-bold mt-2" style={{color: '#1C1C1C'}}>8</h3>
              <p className="text-sm" style={{color: '#6B7280'}}>Upcoming IPOs</p>
            </div>
            
            <div className="p-6 rounded-xl border" style={{background: 'linear-gradient(135deg, #F0F4F8 0%, #E8EEF4 100%)', borderColor: '#D1D5DB'}}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{backgroundColor: '#F59E0B'}}>
                <div className="text-white text-sm font-bold">H</div>
              </div>
              <span className="text-xs font-semibold px-2 py-1 rounded" style={{color: '#F59E0B', backgroundColor: '#FEF3C7'}}>HOT</span>
              <h3 className="text-2xl font-bold mt-2" style={{color: '#1C1C1C'}}>3</h3>
              <p className="text-sm" style={{color: '#6B7280'}}>Hot IPOs This Week</p>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold" style={{color: '#1C1C1C'}}>Platform Features</h2>
            <p className="text-lg mt-2" style={{color: '#6B7280'}}>Everything you need for successful IPO investing</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-white shadow-lg border" style={{borderColor: '#E5E7EB'}}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{backgroundColor: '#0B3C5D'}}>
                <div className="text-white text-lg font-bold">A</div>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{color: '#1C1C1C'}}>Advanced Analytics</h3>
              <p className="text-gray-600">Deep insights and performance metrics for informed investment decisions</p>
            </div>
            
            <div className="p-6 rounded-xl bg-white shadow-lg border" style={{borderColor: '#E5E7EB'}}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{backgroundColor: '#2ECC71'}}>
                <div className="text-white text-lg font-bold">C</div>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{color: '#1C1C1C'}}>Comparison Tools</h3>
              <p className="text-gray-600">Compare IPOs side-by-side to find the best investment opportunities</p>
            </div>
            
            <div className="p-6 rounded-xl bg-white shadow-lg border" style={{borderColor: '#E5E7EB'}}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{backgroundColor: '#1F4E79'}}>
                <div className="text-white text-lg font-bold">W</div>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{color: '#1C1C1C'}}>Watchlist Management</h3>
              <p className="text-gray-600">Track and monitor IPOs that interest you with personalized watchlists</p>
            </div>
            
            <div className="p-6 rounded-xl bg-white shadow-lg border" style={{borderColor: '#E5E7EB'}}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{backgroundColor: '#DC2626'}}>
                <div className="text-white text-lg font-bold">S</div>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{color: '#1C1C1C'}}>Secure Platform</h3>
              <p className="text-gray-600">Bank-level security for your personal and financial information</p>
            </div>
            
            <div className="p-6 rounded-xl bg-white shadow-lg border" style={{borderColor: '#E5E7EB'}}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{backgroundColor: '#7C3AED'}}>
                <div className="text-white text-lg font-bold">M</div>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{color: '#1C1C1C'}}>Mobile Ready</h3>
              <p className="text-gray-600">Access your IPO investments anytime, anywhere with our mobile-friendly platform</p>
            </div>
            
            <div className="p-6 rounded-xl bg-white shadow-lg border" style={{borderColor: '#E5E7EB'}}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{backgroundColor: '#059669'}}>
                <div className="text-white text-lg font-bold">S</div>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{color: '#1C1C1C'}}>Smart Alerts</h3>
              <p className="text-gray-600">Get notified about important IPO events and market updates</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16" style={{background: 'linear-gradient(135deg, #0B3C5D 0%, #1F4E79 100%)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your IPO Journey?</h2>
          <p className="text-xl text-gray-200 mb-8">Join thousands of investors who trust our platform for IPO investments</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link
              to="/register"
              className="text-white px-8 py-4 rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg"
              style={{backgroundColor: '#2ECC71'}}
            >
              Get Started Free
            </Link>
            <Link
              to="/dashboard"
              className="text-white px-8 py-4 rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg border-2 border-white/20"
            >
              View Dashboard
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2" style={{color: '#2ECC71'}}>50K+</div>
              <div style={{color: '#E5E7EB'}}>Active Investors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2" style={{color: '#2ECC71'}}>₹500Cr+</div>
              <div style={{color: '#E5E7EB'}}>Investments Processed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2" style={{color: '#2ECC71'}}>98%</div>
              <div style={{color: '#E5E7EB'}}>Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-white py-12" style={{backgroundColor: '#0B3C5D'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-3 font-bold">IPO</div>
                <span className="text-xl font-bold">Platform</span>
              </div>
              <p style={{color: '#E5E7EB'}}>
                Your trusted partner for IPO investments in India
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2" style={{color: '#E5E7EB'}}>
                <li><Link to="/dashboard" className="hover:text-white">Dashboard</Link></li>
                <li><Link to="/watchlist" className="hover:text-white">Watchlist</Link></li>
                <li><Link to="/compare" className="hover:text-white">Compare IPOs</Link></li>
                <li><Link to="/analytics" className="hover:text-white">Analytics</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2" style={{color: '#E5E7EB'}}>
                <li><Link to="#" className="hover:text-white">IPO Guide</Link></li>
                <li><Link to="#" className="hover:text-white">Investment Tips</Link></li>
                <li><Link to="#" className="hover:text-white">Market Analysis</Link></li>
                <li><Link to="#" className="hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2" style={{color: '#E5E7EB'}}>
                <li>support@ipoplatform.com</li>
                <li>+91 8247879073</li>
                <li>Hyderabad, India</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center" style={{borderColor: '#1F4E79', color: '#E5E7EB'}}>
            <p>&copy; 2025 IPO Investment Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicHome;
