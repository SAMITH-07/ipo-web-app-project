import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import PublicHome from './pages/PublicHome';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import IPODetail from './pages/IPODetail';
import Analytics from './pages/Analytics';
import Watchlist from './pages/Watchlist';
import CompareIPOs from './pages/CompareIPOs';
import WatchlistButton from './components/WatchlistButton';
import MobileNavigation from './components/MobileNavigation';
import { Link } from 'react-router-dom';

// Public home page component
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

  const getStatusColor = (status) => {
    switch(status) {
      case 'open': return 'bg-green-500';
      case 'upcoming': return 'bg-orange-500';
      case 'closed': return 'bg-gray-500';
      case 'listed': return 'bg-blue-500';
      default: return 'bg-gray-400';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-xl font-semibold text-gray-700">Loading amazing IPOs...</div>
        </div>
      </div>
    );
  }

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
                    style={{backgroundColor: '#1F4E79'}}
                  >
                    Start Investing Free
                  </Link>
                  <Link
                    to="/login"
                    className="border-2 text-white px-8 py-4 rounded-lg font-bold transition-all"
                    style={{borderColor: '#2ECC71', color: '#2ECC71'}}
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-20 h-20 bg-white/5 rounded-full animate-bounce"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-white/5 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-white/5 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-40 right-1/3 w-12 h-12 bg-white/5 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
      </section>

      {/* Live Stats Section */}
      <section className="py-16 bg-white border-b" style={{borderColor: '#E5E7EB'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{color: '#1C1C1C'}}>Live Market Data</h2>
            <p style={{color: '#6B7280'}}>Real-time IPO market statistics and trends</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl border" style={{background: 'linear-gradient(135deg, #F0F4F8 0%, #E8EEF4 100%)', borderColor: '#D1D5DB'}}>
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{backgroundColor: '#0B3C5D'}}>
                  <div className="text-white text-sm font-bold">T</div>
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded" style={{color: '#0B3C5D', backgroundColor: '#EBF5FF'}}>LIVE</span>
              </div>
              <div className="text-3xl font-bold mb-1" style={{color: '#0B3C5D'}}>{ipos.length}</div>
              <div className="font-medium" style={{color: '#1C1C1C'}}>Total IPOs</div>
              <div className="text-xs mt-2" style={{color: '#6B7280'}}>Tracked this month</div>
            </div>
            
            <div className="p-6 rounded-xl border" style={{background: 'linear-gradient(135deg, #F0FDF4 0%, #E8F5E8 100%)', borderColor: '#D1D5DB'}}>
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{backgroundColor: '#2ECC71'}}>
                  <div className="text-white text-sm font-bold">O</div>
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded" style={{color: '#2ECC71', backgroundColor: '#F0FDF4'}}>OPEN</span>
              </div>
              <div className="text-3xl font-bold mb-2" style={{color: '#2ECC71'}}>
                {ipos.filter(ipo => ipo.status === 'open').length}
              </div>
              <div className="font-medium" style={{color: '#1C1C1C'}}>Currently Open</div>
              <div className="text-xs mt-2" style={{color: '#6B7280'}}>Investment opportunities</div>
            </div>
            
            <div className="p-6 rounded-xl border" style={{background: 'linear-gradient(135deg, #F0F9FF 0%, #E8F4F8 100%)', borderColor: '#D1D5DB'}}>
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{backgroundColor: '#1F4E79'}}>
                  <div className="text-white text-sm font-bold">U</div>
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded" style={{color: '#1F4E79', backgroundColor: '#F0F9FF'}}>UPCOMING</span>
              </div>
              <div className="text-3xl font-bold mb-2" style={{color: '#1F4E79'}}>
                {ipos.filter(ipo => ipo.status === 'upcoming').length}
              </div>
              <div className="font-medium" style={{color: '#1C1C1C'}}>Upcoming IPOs</div>
              <div className="text-xs mt-2" style={{color: '#6B7280'}}>Next 30 days</div>
            </div>
            
            <div className="p-6 rounded-xl border" style={{background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)', borderColor: '#D1D5DB'}}>
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{backgroundColor: '#F59E0B'}}>
                  <div className="text-white text-sm font-bold">H</div>
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded" style={{color: '#F59E0B', backgroundColor: '#FEF3C7'}}>HOT</span>
              </div>
              <div className="text-3xl font-bold mb-2" style={{color: '#F59E0B'}}>
                {ipos.filter(ipo => ipo.totalSubscription && ipo.totalSubscription > 5).length}
              </div>
              <div className="font-medium" style={{color: '#1C1C1C'}}>High Demand</div>
              <div className="text-xs mt-2" style={{color: '#6B7280'}}>5x+ subscription</div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features Showcase */}
      <section className="py-20" style={{backgroundColor: '#F5F7FA'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{color: '#1C1C1C'}}>
              Powerful Investment Tools
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{color: '#6B7280'}}>
              Everything you need to make informed IPO investment decisions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{background: 'linear-gradient(135deg, #EBF5FF 0%, #DBEAFE 100%)'}}>
                <div className="text-2xl font-bold" style={{color: '#0B3C5D'}}>A</div>
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{color: '#1C1C1C'}}>Advanced Analytics</h3>
              <p className="mb-4" style={{color: '#6B7280'}}>
                Interactive charts, market trends, and comprehensive IPO statistics with real-time data visualization.
              </p>
              <ul className="text-sm space-y-2" style={{color: '#6B7280'}}>
                <li className="flex items-center"><span className="mr-2" style={{color: '#2ECC71'}}>✓</span> Interactive charts & graphs</li>
                <li className="flex items-center"><span className="mr-2" style={{color: '#2ECC71'}}>✓</span> Market trend analysis</li>
                <li className="flex items-center"><span className="mr-2" style={{color: '#2ECC71'}}>✓</span> Performance metrics</li>
              </ul>
              <Link to="/analytics" className="inline-flex items-center font-semibold mt-4 hover:underline" style={{color: '#1F4E79'}}>
                Explore Analytics →
              </Link>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{background: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)'}}>
                <div className="text-2xl font-bold" style={{color: '#2ECC71'}}>C</div>
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{color: '#1C1C1C'}}>Smart Comparison</h3>
              <p className="mb-4" style={{color: '#6B7280'}}>
                Compare multiple IPOs side-by-side with detailed metrics, risk analysis, and investment recommendations.
              </p>
              <ul className="text-sm space-y-2" style={{color: '#6B7280'}}>
                <li className="flex items-center"><span className="mr-2" style={{color: '#2ECC71'}}>✓</span> Side-by-side comparison</li>
                <li className="flex items-center"><span className="mr-2" style={{color: '#2ECC71'}}>✓</span> Risk assessment</li>
                <li className="flex items-center"><span className="mr-2" style={{color: '#2ECC71'}}>✓</span> Investment metrics</li>
              </ul>
              <Link to="/compare" className="inline-flex items-center font-semibold mt-4 hover:underline" style={{color: '#1F4E79'}}>
                Compare IPOs →
              </Link>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{background: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)'}}>
                <div className="text-2xl font-bold" style={{color: '#1F4E79'}}>W</div>
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{color: '#1C1C1C'}}>Personal Watchlist</h3>
              <p className="mb-4" style={{color: '#6B7280'}}>
                Create and manage your personal watchlist with notes, alerts, and tracking for IPOs you're interested in.
              </p>
              <ul className="text-sm space-y-2" style={{color: '#6B7280'}}>
                <li className="flex items-center"><span className="mr-2" style={{color: '#2ECC71'}}>✓</span> Custom watchlists</li>
                <li className="flex items-center"><span className="mr-2" style={{color: '#2ECC71'}}>✓</span> Personal notes</li>
                <li className="flex items-center"><span className="mr-2" style={{color: '#2ECC71'}}>✓</span> Price alerts</li>
              </ul>
              <Link to="/watchlist" className="inline-flex items-center font-semibold mt-4 hover:underline" style={{color: '#1F4E79'}}>
                Manage Watchlist →
              </Link>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)'}}>
                <div className="text-2xl font-bold" style={{color: '#F59E0B'}}>S</div>
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{color: '#1C1C1C'}}>Smart Search</h3>
              <p className="mb-4" style={{color: '#6B7280'}}>
                Advanced search and filtering capabilities to find IPOs that match your investment criteria perfectly.
              </p>
              <ul className="text-sm space-y-2" style={{color: '#6B7280'}}>
                <li className="flex items-center"><span className="mr-2" style={{color: '#2ECC71'}}>✓</span> Multi-criteria search</li>
                <li className="flex items-center"><span className="mr-2" style={{color: '#2ECC71'}}>✓</span> Sector filtering</li>
                <li className="flex items-center"><span className="mr-2" style={{color: '#2ECC71'}}>✓</span> Smart sorting</li>
              </ul>
              <Link to="/dashboard" className="inline-flex items-center font-semibold mt-4 hover:underline" style={{color: '#1F4E79'}}>
                Search IPOs →
              </Link>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{background: 'linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%)'}}>
                <div className="text-2xl font-bold" style={{color: '#6B7280'}}>M</div>
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{color: '#1C1C1C'}}>Mobile Responsive</h3>
              <p className="mb-4" style={{color: '#6B7280'}}>
                Full-featured mobile experience with responsive design and touch-optimized interface for investing on the go.
              </p>
              <ul className="text-sm space-y-2" style={{color: '#6B7280'}}>
                <li className="flex items-center"><span className="mr-2" style={{color: '#2ECC71'}}>✓</span> Mobile-first design</li>
                <li className="flex items-center"><span className="mr-2" style={{color: '#2ECC71'}}>✓</span> Touch optimized</li>
                <li className="flex items-center"><span className="mr-2" style={{color: '#2ECC71'}}>✓</span> Progressive web app</li>
              </ul>
              <Link to="/dashboard" className="inline-flex items-center font-semibold mt-4 hover:underline" style={{color: '#1F4E79'}}>
                Mobile Experience →
              </Link>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{background: 'linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)'}}>
                <div className="text-2xl font-bold" style={{color: '#DC2626'}}>S</div>
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{color: '#1C1C1C'}}>Secure Authentication</h3>
              <p className="mb-4" style={{color: '#6B7280'}}>
                Enterprise-grade security with JWT tokens, Gmail OAuth integration, and role-based access control.
              </p>
              <ul className="text-sm space-y-2" style={{color: '#6B7280'}}>
                <li className="flex items-center"><span className="mr-2" style={{color: '#2ECC71'}}>✓</span> Gmail OAuth</li>
                <li className="flex items-center"><span className="mr-2" style={{color: '#2ECC71'}}>✓</span> JWT security</li>
                <li className="flex items-center"><span className="mr-2" style={{color: '#2ECC71'}}>✓</span> Role-based access</li>
              </ul>
              <Link to="/login" className="inline-flex items-center font-semibold mt-4 hover:underline" style={{color: '#1F4E79'}}>
                Secure Login →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured IPOs Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Investment Opportunities
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Don't miss out on these hot investment opportunities
            </p>
            <div className="flex justify-center gap-4 mb-8">
              <Link to="/dashboard" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                View All IPOs
              </Link>
              <Link to="/compare" className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                Compare IPOs
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ipos.slice(0, 6).map(ipo => (
              <Link key={ipo._id} to={`/ipo/${ipo._id}`} className="group block">
                <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:border-blue-300 hover:-translate-y-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {ipo.company}
                      </h3>
                      <span className="text-gray-600">({ipo.symbol})</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${getStatusColor(ipo.status)}`}>
                      {ipo.status?.toUpperCase()}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">{ipo.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Issue Price:</span>
                      <span className="font-semibold text-gray-900">₹{ipo.issuePrice || ipo.priceBand?.min || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subscription:</span>
                      <span className="font-semibold text-green-600">{ipo.totalSubscription || 0}x</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Opens:</span>
                      <span className="font-semibold text-gray-900">
                        {ipo.openDate ? new Date(ipo.openDate).toLocaleDateString() : 'TBA'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {ipo.sector} • {ipo.issueType}
                    </span>
                    <span className="text-blue-600 font-semibold group-hover:text-blue-700">
                      View Details →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Start investing in IPOs in 3 simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Create Account</h3>
              <p className="text-gray-600">
                Sign up with email or Gmail OAuth in seconds. Verify your account and set up your investment profile.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Research & Analyze</h3>
              <p className="text-gray-600">
                Use our advanced tools to analyze IPOs, compare opportunities, and create your personalized watchlist.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Invest & Track</h3>
              <p className="text-gray-600">
                Invest in promising IPOs and track your portfolio performance with real-time updates and analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{background: 'linear-gradient(135deg, #0B3C5D 0%, #1F4E79 100%)'}}>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Start Your IPO Investment Journey?
          </h2>
          <p className="text-xl mb-8" style={{color: '#E5E7EB'}}>
            Join thousands of investors who trust our platform for their IPO investments
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-white px-8 py-4 rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg"
                  style={{backgroundColor: '#1F4E79'}}
                >
                  Go to Dashboard
                </Link>
                <Link
                  to="/analytics"
                  className="border-2 px-8 py-4 rounded-lg font-bold transition-all"
                  style={{borderColor: '#2ECC71', color: '#2ECC71'}}
                >
                  View Analytics
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="text-white px-8 py-4 rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg"
                  style={{backgroundColor: '#1F4E79'}}
                >
                  Start Investing Free
                </Link>
                <Link
                  to="/login"
                  className="border-2 px-8 py-4 rounded-lg font-bold transition-all"
                  style={{borderColor: '#2ECC71', color: '#2ECC71'}}
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2" style={{color: '#2ECC71'}}>100%</div>
              <div style={{color: '#E5E7EB'}}>Free to Use</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2" style={{color: '#2ECC71'}}>24/7</div>
              <div style={{color: '#E5E7EB'}}>Real-time Updates</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2" style={{color: '#2ECC71'}}>Bank-level</div>
              <div style={{color: '#E5E7EB'}}>Security</div>
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

// Protected Route component
const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<PublicHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ipo/:id" element={<IPODetail />} />
        
        {/* Protected user routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        } />
        <Route path="/watchlist" element={
          <ProtectedRoute>
            <Watchlist />
          </ProtectedRoute>
        } />
        <Route path="/analytics" element={
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>
        } />
        <Route path="/compare" element={
          <ProtectedRoute>
            <CompareIPOs />
          </ProtectedRoute>
        } />
        
        {/* Protected admin routes */}
        <Route path="/admin/dashboard" element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
