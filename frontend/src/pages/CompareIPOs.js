import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CompareIPOs = () => {
  const [ipos, setIpos] = useState([]);
  const [selectedIPOs, setSelectedIPOs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchIPOs();
    fetchUserData();
  }, []);

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
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      setUser(userData);
    } catch (err) {
      console.error('Error fetching user data:', err);
    }
  };

  const handleAddToComparison = (ipo) => {
    if (selectedIPOs.length >= 4) {
      alert('You can compare maximum 4 IPOs at a time');
      return;
    }
    
    if (!selectedIPOs.find(selected => selected._id === ipo._id)) {
      setSelectedIPOs([...selectedIPOs, ipo]);
    }
  };

  const handleRemoveFromComparison = (ipoId) => {
    setSelectedIPOs(selectedIPOs.filter(ipo => ipo._id !== ipoId));
  };

  const formatCurrency = (value) => {
    if (!value) return 'N/A';
    return `₹${value.toLocaleString()}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'TBA';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getSubscriptionColor = (subscription) => {
    if (!subscription) return 'text-gray-500';
    if (subscription >= 10) return 'text-green-600 font-bold';
    if (subscription >= 5) return 'text-blue-600 font-semibold';
    if (subscription >= 2) return 'text-orange-600';
    return 'text-gray-600';
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Login</h2>
          <p className="text-gray-600 mb-6">You need to login to compare IPOs</p>
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
        <div className="text-xl font-semibold">Loading IPO comparison...</div>
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
              <h1 className="text-2xl font-bold text-gray-900">Compare IPOs</h1>
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
          {/* Selected IPOs */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Selected IPOs ({selectedIPOs.length}/4)
              </h2>
              {selectedIPOs.length > 0 && (
                <button
                  onClick={() => setSelectedIPOs([])}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Clear All
                </button>
              )}
            </div>
            
            {selectedIPOs.length === 0 ? (
              <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded">
                Select 2-4 IPOs below to compare them side by side
              </div>
            ) : (
              <div className="flex flex-wrap gap-3">
                {selectedIPOs.map(ipo => (
                  <div key={ipo._id} className="bg-white border border-gray-200 rounded-lg px-4 py-2 flex items-center space-x-2">
                    <span className="font-medium">{ipo.company}</span>
                    <button
                      onClick={() => handleRemoveFromComparison(ipo._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Comparison Table */}
          {selectedIPOs.length >= 2 && (
            <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">
                        Feature
                      </th>
                      {selectedIPOs.map(ipo => (
                        <th key={ipo._id} className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <div>
                            <div className="font-semibold">{ipo.company}</div>
                            <div className="text-gray-400 normal-case">{ipo.symbol}</div>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Status
                      </td>
                      {selectedIPOs.map(ipo => (
                        <td key={ipo._id} className="px-6 py-4 whitespace-nowrap text-center">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            ipo.status === 'open' ? 'bg-green-100 text-green-800' :
                            ipo.status === 'upcoming' ? 'bg-yellow-100 text-yellow-800' :
                            ipo.status === 'closed' ? 'bg-red-100 text-red-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {ipo.status}
                          </span>
                        </td>
                      ))}
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Sector
                      </td>
                      {selectedIPOs.map(ipo => (
                        <td key={ipo._id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                          {ipo.sector}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Issue Price
                      </td>
                      {selectedIPOs.map(ipo => (
                        <td key={ipo._id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-semibold">
                          {formatCurrency(ipo.issuePrice || ipo.priceBand?.min)}
                        </td>
                      ))}
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Price Band
                      </td>
                      {selectedIPOs.map(ipo => (
                        <td key={ipo._id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                          {ipo.priceBand?.min && ipo.priceBand?.max ? 
                            `${formatCurrency(ipo.priceBand.min)} - ${formatCurrency(ipo.priceBand.max)}` : 
                            'N/A'
                          }
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Lot Size
                      </td>
                      {selectedIPOs.map(ipo => (
                        <td key={ipo._id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                          {ipo.lotSize || 'N/A'}
                        </td>
                      ))}
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Min Investment
                      </td>
                      {selectedIPOs.map(ipo => (
                        <td key={ipo._id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                          {formatCurrency(ipo.minInvestment)}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Open Date
                      </td>
                      {selectedIPOs.map(ipo => (
                        <td key={ipo._id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                          {formatDate(ipo.openDate)}
                        </td>
                      ))}
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Close Date
                      </td>
                      {selectedIPOs.map(ipo => (
                        <td key={ipo._id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                          {formatDate(ipo.closeDate)}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Total Subscription
                      </td>
                      {selectedIPOs.map(ipo => (
                        <td key={ipo._id} className="px-6 py-4 whitespace-nowrap text-sm text-center">
                          <span className={getSubscriptionColor(ipo.totalSubscription)}>
                            {ipo.totalSubscription || 0}x
                          </span>
                        </td>
                      ))}
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Issue Size
                      </td>
                      {selectedIPOs.map(ipo => (
                        <td key={ipo._id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                          {ipo.issueSize || 'N/A'}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        P/E Ratio
                      </td>
                      {selectedIPOs.map(ipo => (
                        <td key={ipo._id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                          {ipo.peRatio || 'N/A'}
                        </td>
                      ))}
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Risk Level
                      </td>
                      {selectedIPOs.map(ipo => (
                        <td key={ipo._id} className="px-6 py-4 whitespace-nowrap text-center">
                          <span className={`px-2 py-1 text-xs font-semibold rounded ${
                            ipo.riskLevel === 'low' ? 'bg-green-100 text-green-800' :
                            ipo.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {ipo.riskLevel?.toUpperCase() || 'MEDIUM'}
                          </span>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Available IPOs for Selection */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Available IPOs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ipos.map(ipo => {
                const isSelected = selectedIPOs.find(selected => selected._id === ipo._id);
                return (
                  <div key={ipo._id} className="bg-white rounded-lg shadow p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{ipo.company}</h3>
                        <span className="text-sm text-gray-600">({ipo.symbol})</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        ipo.status === 'open' ? 'bg-green-100 text-green-800' :
                        ipo.status === 'upcoming' ? 'bg-yellow-100 text-yellow-800' :
                        ipo.status === 'closed' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {ipo.status}
                      </span>
                    </div>
                    
                    <div className="space-y-1 text-sm text-gray-600 mb-3">
                      <div className="flex justify-between">
                        <span>Price:</span>
                        <span className="font-medium">{formatCurrency(ipo.issuePrice || ipo.priceBand?.min)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Subscription:</span>
                        <span className={getSubscriptionColor(ipo.totalSubscription)}>
                          {ipo.totalSubscription || 0}x
                        </span>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleAddToComparison(ipo)}
                      disabled={isSelected || selectedIPOs.length >= 4}
                      className={`w-full py-2 px-3 rounded text-sm font-medium transition-colors ${
                        isSelected
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : selectedIPOs.length >= 4
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {isSelected ? 'Selected' : selectedIPOs.length >= 4 ? 'Max Selected' : 'Add to Compare'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CompareIPOs;
