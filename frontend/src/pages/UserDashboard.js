import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import WatchlistButton from '../components/WatchlistButton';
import MobileNavigation from '../components/MobileNavigation';
import Navbar from '../components/Navbar';

const UserDashboard = () => {
  const [ipos, setIpos] = useState([]);
  const [filteredIpos, setFilteredIpos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIPO, setSelectedIPO] = useState(null);
  const [userInvestments, setUserInvestments] = useState([]);
  const [portfolio, setPortfolio] = useState(0);
  const [user, setUser] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    sector: 'all',
    sortBy: 'openDate'
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchIPOs();
    fetchUserData();
  }, []);

  useEffect(() => {
    let filtered = ipos.filter(ipo =>
      ipo.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ipo.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Apply status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(ipo => ipo.status === filters.status);
    }

    // Apply sector filter
    if (filters.sector !== 'all') {
      filtered = filtered.filter(ipo => ipo.sector === filters.sector);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'openDate':
          return new Date(a.openDate || '9999-12-31') - new Date(b.openDate || '9999-12-31');
        case 'issuePrice':
          return (a.issuePrice || a.priceBand?.min || 0) - (b.issuePrice || b.priceBand?.min || 0);
        case 'company':
          return a.company.localeCompare(b.company);
        case 'subscription':
          return (b.totalSubscription || 0) - (a.totalSubscription || 0);
        default:
          return 0;
      }
    });

    setFilteredIpos(filtered);
  }, [searchTerm, ipos, filters]);

  const fetchIPOs = async () => {
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
      const token = localStorage.getItem('token');
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      setUser(userData);
    } catch (err) {
      console.error('Error fetching user data:', err);
    }
  };

  const handleInvest = (ipo) => {
    const price = ipo.issuePrice || ipo.priceBand?.min || 0;
    const investment = {
      id: Date.now(),
      ipoId: ipo._id,
      shares: 10,
      pricePerShare: price,
      total: price * 10
    };
    setUserInvestments([...userInvestments, investment]);
    setPortfolio(portfolio + (price * 10));
    setSelectedIPO(ipo);
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-xl font-semibold">Loading dashboard...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navbar />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Search and Filter Bar */}
          <div className="mb-6 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search IPOs by company name or symbol..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <Link
                to="/watchlist"
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold text-center"
              >
                ⭐ My Watchlist
              </Link>
            </div>
            
            {/* Advanced Filters */}
            <div className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-lg shadow">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                  <option value="listed">Listed</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sector</label>
                <select
                  value={filters.sector}
                  onChange={(e) => setFilters(prev => ({ ...prev, sector: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Sectors</option>
                  <option value="Technology">Technology</option>
                  <option value="Finance">Finance</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Energy">Energy</option>
                  <option value="IT Services">IT Services</option>
                  <option value="Agriculture">Agriculture</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Retail">Retail</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="openDate">Open Date</option>
                  <option value="issuePrice">Issue Price</option>
                  <option value="company">Company Name</option>
                  <option value="subscription">Subscription</option>
                </select>
              </div>
            </div>
          </div>

          {/* Portfolio Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Total Invested</h3>
              <p className="text-3xl font-bold">₹{portfolio.toFixed(2)}</p>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Active Investments</h3>
              <p className="text-3xl font-bold">{userInvestments.length}</p>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Available IPOs</h3>
              <p className="text-3xl font-bold">{filteredIpos.filter(ipo => ipo.status === 'open' || ipo.status === 'upcoming').length}</p>
            </div>
          </div>

          {/* IPOs Grid */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {searchTerm ? `Search Results (${filteredIpos.length})` : 'All IPOs'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIpos.map(ipo => (
                <Link key={ipo._id} to={`/ipo/${ipo._id}`} className="block">
                  <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{ipo.company}</h3>
                          <span className="text-gray-600">({ipo.symbol})</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${getStatusColor(ipo.status)}`}>
                            {ipo.status?.toUpperCase() || 'ACTIVE'}
                          </span>
                          <WatchlistButton ipoId={ipo._id} />
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4 text-sm">{ipo.description}</p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between">
                          <span className="font-semibold text-gray-700">Issue Price:</span>
                          <span className="text-gray-900">₹{ipo.issuePrice || ipo.priceBand?.min || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-semibold text-gray-700">Price Range:</span>
                          <span className="text-gray-900">₹{ipo.priceBand?.min || 'N/A'} - ₹{ipo.priceBand?.max || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-semibold text-gray-700">Lot Size:</span>
                          <span className="text-gray-900">{ipo.lotSize || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-semibold text-gray-700">Opens:</span>
                          <span className="text-gray-900">{ipo.openDate ? new Date(ipo.openDate).toLocaleDateString() : 'TBA'}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        {ipo.status === 'open' || ipo.status === 'upcoming' ? (
                          <button 
                            className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${
                              selectedIPO?._id === ipo._id 
                                ? 'bg-green-500 text-white cursor-not-allowed' 
                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleInvest(ipo);
                            }}
                            disabled={selectedIPO?._id === ipo._id}
                          >
                            {selectedIPO?._id === ipo._id ? '✓ Invested' : `Invest ₹${ipo.issuePrice || ipo.priceBand?.min || 'N/A'}`}
                          </button>
                        ) : (
                          <div className="w-full py-2 px-4 bg-gray-300 text-gray-600 rounded-lg text-center font-semibold">
                            IPO {ipo.status?.toUpperCase() || 'CLOSED'}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* My Investments */}
          {userInvestments.length > 0 && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">My Investments</h2>
              <div className="space-y-4">
                {userInvestments.map(investment => (
                  <div key={investment.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-center">
                      <h4 className="text-lg font-semibold text-gray-800">
                        {ipos.find(ipo => ipo._id === investment.ipoId)?.company}
                      </h4>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">
                          {investment.shares} shares @ ₹{investment.pricePerShare}
                        </div>
                        <div className="text-lg font-bold text-green-600">
                          Total: ₹{investment.total}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
