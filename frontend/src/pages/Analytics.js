import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const Analytics = () => {
  const [ipos, setIpos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [timeRange, setTimeRange] = useState('all');

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

  const getStatusData = () => {
    const statusCounts = ipos.reduce((acc, ipo) => {
      acc[ipo.status] = (acc[ipo.status] || 0) + 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(statusCounts).map(status => 
        status.charAt(0).toUpperCase() + status.slice(1)
      ),
      datasets: [{
        label: 'IPOs by Status',
        data: Object.values(statusCounts),
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(251, 146, 60, 0.8)',
          'rgba(107, 114, 128, 0.8)'
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(16, 185, 129)',
          'rgb(251, 146, 60)',
          'rgb(107, 114, 128)'
        ],
        borderWidth: 1
      }]
    };
  };

  const getSectorData = () => {
    const sectorCounts = ipos.reduce((acc, ipo) => {
      acc[ipo.sector] = (acc[ipo.sector] || 0) + 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(sectorCounts),
      datasets: [{
        label: 'IPOs by Sector',
        data: Object.values(sectorCounts),
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(147, 51, 234, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(14, 165, 233, 0.8)',
          'rgba(168, 85, 247, 0.8)'
        ],
        borderWidth: 1
      }]
    };
  };

  const getSubscriptionTrend = () => {
    const sortedIPOs = ipos
      .filter(ipo => ipo.openDate)
      .sort((a, b) => new Date(a.openDate) - new Date(b.openDate))
      .slice(-10);

    return {
      labels: sortedIPOs.map(ipo => 
        new Date(ipo.openDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      ),
      datasets: [{
        label: 'Total Subscription (x)',
        data: sortedIPOs.map(ipo => ipo.totalSubscription || 0),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4
      }]
    };
  };

  const getPriceRangeData = () => {
    const priceRanges = {
      '0-500': 0,
      '500-1000': 0,
      '1000-2000': 0,
      '2000+': 0
    };

    ipos.forEach(ipo => {
      const price = ipo.issuePrice || ipo.priceBand?.min || 0;
      if (price <= 500) priceRanges['0-500']++;
      else if (price <= 1000) priceRanges['500-1000']++;
      else if (price <= 2000) priceRanges['1000-2000']++;
      else priceRanges['2000+']++;
    });

    return {
      labels: Object.keys(priceRanges),
      datasets: [{
        label: 'IPOs by Price Range',
        data: Object.values(priceRanges),
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 1
      }]
    };
  };

  const getTopSubscribedIPOs = () => {
    return ipos
      .filter(ipo => ipo.totalSubscription)
      .sort((a, b) => (b.totalSubscription || 0) - (a.totalSubscription || 0))
      .slice(0, 5);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Login</h2>
          <p className="text-gray-600 mb-6">You need to login to view analytics</p>
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
        <div className="text-xl font-semibold">Loading analytics...</div>
      </div>
    );
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'IPO Analytics Dashboard'
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link to="/dashboard" className="text-2xl mr-3">📈</Link>
              <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
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
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Total IPOs</h3>
              <p className="text-3xl font-bold text-gray-900">{ipos.length}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Open IPOs</h3>
              <p className="text-3xl font-bold text-green-600">
                {ipos.filter(ipo => ipo.status === 'open').length}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Upcoming</h3>
              <p className="text-3xl font-bold text-orange-600">
                {ipos.filter(ipo => ipo.status === 'upcoming').length}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Listed</h3>
              <p className="text-3xl font-bold text-blue-600">
                {ipos.filter(ipo => ipo.status === 'listed').length}
              </p>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Status Distribution */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">IPOs by Status</h2>
              <Pie data={getStatusData()} options={chartOptions} />
            </div>

            {/* Sector Distribution */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">IPOs by Sector</h2>
              <Bar data={getSectorData()} options={chartOptions} />
            </div>

            {/* Price Range Distribution */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">IPOs by Price Range</h2>
              <Bar data={getPriceRangeData()} options={chartOptions} />
            </div>

            {/* Subscription Trend */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Subscription Trend</h2>
              <Line data={getSubscriptionTrend()} options={chartOptions} />
            </div>
          </div>

          {/* Top Subscribed IPOs */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Subscribed IPOs</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscription</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {getTopSubscribedIPOs().map((ipo, index) => (
                    <tr key={ipo._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {ipo.company}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {ipo.symbol}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          ipo.status === 'open' ? 'bg-green-100 text-green-800' :
                          ipo.status === 'upcoming' ? 'bg-yellow-100 text-yellow-800' :
                          ipo.status === 'closed' ? 'bg-red-100 text-red-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {ipo.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {ipo.totalSubscription || 0}x
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₹{ipo.issuePrice || ipo.priceBand?.min || 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
