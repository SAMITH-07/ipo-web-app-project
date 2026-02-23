import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import WatchlistButton from '../components/WatchlistButton';

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchWatchlist();
    fetchUserData();
  }, []);

  const fetchWatchlist = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to view your watchlist');
        setLoading(false);
        return;
      }

      const response = await axios.get('http://localhost:5000/api/watchlist', {
        headers: { Authorization: `Bearer ${token}` }
      });

      setWatchlist(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch watchlist');
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

  const handleWatchlistChange = (ipoId, added) => {
    if (!added) {
      setWatchlist(prev => prev.filter(item => item.ipo._id !== ipoId));
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

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Login</h2>
          <p className="text-gray-600 mb-6">You need to login to view your watchlist</p>
          <Link
            to="/login"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl font-semibold">Loading watchlist...</div>
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
              <Link to="/dashboard" className="text-2xl mr-3">📈</Link>
              <h1 className="text-2xl font-bold text-gray-900">My Watchlist</h1>
            </div>
            <Link
              to="/dashboard"
              className="text-blue-600 hover:underline"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          ) : watchlist.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">⭐</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your watchlist is empty</h2>
              <p className="text-gray-600 mb-6">
                Start adding IPOs to your watchlist to track them here
              </p>
              <Link
                to="/dashboard"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Browse IPOs
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  {watchlist.length} IPO{watchlist.length !== 1 ? 's' : ''} in your watchlist
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {watchlist.map((item) => (
                  <div key={item._id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <Link to={`/ipo/${item.ipo._id}`} className="block">
                            <h3 className="text-xl font-bold text-gray-800 hover:text-blue-600">
                              {item.ipo.company}
                            </h3>
                            <span className="text-gray-600">({item.ipo.symbol})</span>
                          </Link>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${getStatusColor(item.ipo.status)}`}>
                            {item.ipo.status?.toUpperCase()}
                          </span>
                          <WatchlistButton
                            ipoId={item.ipo._id}
                            onWatchlistChange={(added) => !added && handleWatchlistChange(item.ipo._id, added)}
                          />
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4 text-sm">{item.ipo.description}</p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between">
                          <span className="font-semibold text-gray-700">Issue Price:</span>
                          <span className="text-gray-900">₹{item.ipo.issuePrice || item.ipo.priceBand?.min || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-semibold text-gray-700">Price Range:</span>
                          <span className="text-gray-900">₹{item.ipo.priceBand?.min || 'N/A'} - ₹{item.ipo.priceBand?.max || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-semibold text-gray-700">Opens:</span>
                          <span className="text-gray-900">
                            {item.ipo.openDate ? new Date(item.ipo.openDate).toLocaleDateString() : 'TBA'}
                          </span>
                        </div>
                      </div>
                      
                      {item.notes && (
                        <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                          <h4 className="text-sm font-semibold text-yellow-800 mb-1">Notes:</h4>
                          <p className="text-sm text-yellow-700">{item.notes}</p>
                        </div>
                      )}
                      
                      <div className="mt-4">
                        <Link
                          to={`/ipo/${item.ipo._id}`}
                          className="w-full block text-center py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Watchlist;
