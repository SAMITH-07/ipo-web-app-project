import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const IPODetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ipo, setIpo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchIPODetail();
    fetchUserData();
  }, [id]);

  const fetchIPODetail = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/ipos/${id}`);
      setIpo(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch IPO details');
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

  const handleInvest = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    // Navigate to investment page or show investment modal
    navigate('/dashboard', { state: { investInIPO: ipo } });
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

  const formatDate = (dateString) => {
    if (!dateString) return 'TBA';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl font-semibold">Loading IPO details...</div>
      </div>
    );
  }

  if (error || !ipo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-semibold text-red-600 mb-4">{error || 'IPO not found'}</div>
          <Link to="/" className="text-blue-600 hover:underline">Back to IPOs</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link to="/" className="text-2xl mr-3">📈</Link>
              <h1 className="text-2xl font-bold text-gray-900">IPO Details</h1>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <span className="text-sm text-gray-600">Welcome, {user.name}</span>
                  <Link to="/dashboard" className="text-blue-600 hover:underline">Dashboard</Link>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
                  <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium">Sign Up</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* IPO Header */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center">
                {ipo.logo && (
                  <img 
                    src={`http://localhost:5000${ipo.logo}`} 
                    alt={ipo.company}
                    className="w-16 h-16 rounded-lg mr-4"
                  />
                )}
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{ipo.company}</h1>
                  <p className="text-xl text-gray-600">({ipo.symbol})</p>
                </div>
              </div>
              <span className={`px-4 py-2 rounded-full text-white font-semibold ${getStatusColor(ipo.status)}`}>
                {ipo.status?.toUpperCase()}
              </span>
            </div>

            <p className="text-gray-700 mb-6">{ipo.description}</p>

            {/* Key Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-blue-800 mb-1">Issue Price</h3>
                <p className="text-2xl font-bold text-blue-900">₹{ipo.issuePrice || ipo.priceBand?.min || 'N/A'}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-green-800 mb-1">Price Band</h3>
                <p className="text-2xl font-bold text-green-900">
                  ₹{ipo.priceBand?.min || 'N/A'} - ₹{ipo.priceBand?.max || 'N/A'}
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-purple-800 mb-1">Lot Size</h3>
                <p className="text-2xl font-bold text-purple-900">{ipo.lotSize || 'N/A'}</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-orange-800 mb-1">Min Investment</h3>
                <p className="text-2xl font-bold text-orange-900">₹{ipo.minInvestment || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Important Dates */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Important Dates</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Open Date:</span>
                    <span className="font-semibold">{formatDate(ipo.openDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Close Date:</span>
                    <span className="font-semibold">{formatDate(ipo.closeDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Allotment Date:</span>
                    <span className="font-semibold">{formatDate(ipo.allotmentDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Refund Date:</span>
                    <span className="font-semibold">{formatDate(ipo.refundDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Listing Date:</span>
                    <span className="font-semibold">{formatDate(ipo.listingDate)}</span>
                  </div>
                </div>
              </div>

              {/* Company Information */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Company Information</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sector:</span>
                    <span className="font-semibold">{ipo.sector}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Issue Type:</span>
                    <span className="font-semibold">{ipo.issueType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Face Value:</span>
                    <span className="font-semibold">₹{ipo.faceValue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Issue Size:</span>
                    <span className="font-semibold">{ipo.issueSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Market Cap:</span>
                    <span className="font-semibold">{ipo.marketCap}</span>
                  </div>
                </div>
              </div>

              {/* Financial Metrics */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Financial Metrics</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">P/E Ratio:</span>
                    <span className="font-semibold">{ipo.peRatio || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">EPS:</span>
                    <span className="font-semibold">{ipo.eps || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">ROE:</span>
                    <span className="font-semibold">{ipo.roe || 'N/A'}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Debt:</span>
                    <span className="font-semibold">{ipo.debt || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Documents</h2>
                <div className="space-y-3">
                  {ipo.brochure && (
                    <a 
                      href={`http://localhost:5000${ipo.brochure}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                    >
                      <span className="text-blue-600">📄 IPO Brochure</span>
                      <span className="text-gray-500">View →</span>
                    </a>
                  )}
                  {ipo.news && ipo.news.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="font-semibold text-gray-700">Latest News</h3>
                      {ipo.news.map((news, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <h4 className="font-medium text-gray-800">{news.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{news.content}</p>
                          <p className="text-xs text-gray-500 mt-2">
                            {news.source} • {formatDate(news.date)}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Subscription Status */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Subscription Status</h2>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">QIB</span>
                      <span className="text-sm font-semibold">{ipo.qibSubscription || 0}x</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${Math.min((ipo.qibSubscription || 0) * 10, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">NII</span>
                      <span className="text-sm font-semibold">{ipo.niiSubscription || 0}x</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${Math.min((ipo.niiSubscription || 0) * 10, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Retail</span>
                      <span className="text-sm font-semibold">{ipo.retailSubscription || 0}x</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-orange-600 h-2 rounded-full" 
                        style={{ width: `${Math.min((ipo.retailSubscription || 0) * 10, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="pt-3 border-t">
                    <div className="flex justify-between">
                      <span className="text-sm font-semibold">Total</span>
                      <span className="text-sm font-bold">{ipo.totalSubscription || 0}x</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Investment Action */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Investment</h2>
                {ipo.status === 'open' || ipo.status === 'upcoming' ? (
                  <button
                    onClick={handleInvest}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                  >
                    {user ? 'Invest Now' : 'Login to Invest'}
                  </button>
                ) : (
                  <div className="w-full bg-gray-300 text-gray-600 font-semibold py-3 px-4 rounded-lg text-center">
                    IPO {ipo.status?.toUpperCase()}
                  </div>
                )}
                <p className="text-sm text-gray-600 mt-3 text-center">
                  Min Investment: ₹{ipo.minInvestment || 'N/A'}
                </p>
              </div>

              {/* Risk Level */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Risk Analysis</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Risk Level:</span>
                    <span className={`font-semibold ${
                      ipo.riskLevel === 'low' ? 'text-green-600' :
                      ipo.riskLevel === 'medium' ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {ipo.riskLevel?.toUpperCase() || 'MEDIUM'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Expected Return:</span>
                    <span className="font-semibold">{ipo.expectedReturn || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Promoter Holding:</span>
                    <span className="font-semibold">{ipo.promoterHolding || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Board Strength:</span>
                    <span className="font-semibold">{ipo.boardStrength || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default IPODetail;
