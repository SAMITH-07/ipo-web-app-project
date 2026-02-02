import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { ipoService, IPO } from '../services/ipo';
import LiveIPOCard from '../components/LiveIPOCard';
import AnalyticsDashboard from '../components/AnalyticsDashboard';
import { 
  LogOut, 
  TrendingUp, 
  TrendingDown, 
  Briefcase, 
  DollarSign, 
  Calendar,
  Eye,
  Star,
  Search,
  Filter,
  Plus,
  BarChart3,
  Activity,
  Bell,
  Settings
} from 'lucide-react';

const InvestorDashboard = () => {
  const { user, logout } = useAuth();
  const [liveIPOs, setLiveIPOs] = useState<IPO[]>([]);
  const [upcomingIPOs, setUpcomingIPOs] = useState<IPO[]>([]);
  const [listedIPOs, setListedIPOs] = useState<IPO[]>([]);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [totalReturns, setTotalReturns] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState(3);

  useEffect(() => {
    fetchIPOData();
  }, []);

  const fetchIPOData = async () => {
    try {
      setLoading(true);
      const [live, upcoming, listed] = await Promise.all([
        ipoService.getLiveIPOs(),
        ipoService.getUpcomingIPOs(),
        ipoService.getListedIPOs()
      ]);
      
      setLiveIPOs(live);
      setUpcomingIPOs(upcoming);
      setListedIPOs(listed);
      
      // Calculate mock investment data (in real app, this would come from user's actual investments)
      const mockInvestment = live.length * 15000 + listed.length * 25000;
      const mockReturns = listed.reduce((acc, ipo) => {
        return acc + (ipo.changePercent || 0) * 1000;
      }, 0);
      
      setTotalInvestment(mockInvestment);
      setTotalReturns(mockReturns);
    } catch (error) {
      console.error('Failed to fetch IPO data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  const handleApplyIPO = async (ipoId: string) => {
    try {
      // In real app, this would call an investment service
      alert(`Application submitted for IPO: ${ipoId}`);
    } catch (error) {
      console.error('Failed to apply for IPO:', error);
    }
  };

  const handleAddToWatchlist = async (ipoId: string) => {
    try {
      // In real app, this would call a watchlist service
      alert(`Added to watchlist: ${ipoId}`);
    } catch (error) {
      console.error('Failed to add to watchlist:', error);
    }
  };

  const handleViewDetails = async (ipoId: string) => {
    try {
      const ipo = await ipoService.getIPOById(ipoId);
      // In real app, this would navigate to IPO details page
      console.log('Viewing IPO details:', ipo);
    } catch (error) {
      console.error('Failed to fetch IPO details:', error);
    }
  };

  const filteredLiveIPOs = liveIPOs.filter(ipo => {
    const matchesSearch = ipo.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ipo.symbol.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSector = selectedSector === 'all' || ipo.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  const sectors = ['all', 'Technology', 'Finance', 'Healthcare', 'Energy', 'IT Services'];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Briefcase className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">IPO Investor Portal</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Settings className="w-5 h-5" />
              </button>
              <span className="text-sm text-gray-700">
                Welcome, {user?.name}
              </span>
              <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                {user?.role}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 text-sm text-gray-700 hover:text-gray-900"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Tab Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('live-ipos')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'live-ipos'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Live IPOs
            </button>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'upcoming'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'analytics'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Analytics
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <AnalyticsDashboard isLoading={loading} />
              
              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Search className="w-5 h-5 mr-2 text-gray-600" />
                    <span className="text-gray-700">Search IPOs</span>
                  </button>
                  <button className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Star className="w-5 h-5 mr-2 text-gray-600" />
                    <span className="text-gray-700">Watchlist</span>
                  </button>
                  <button className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Activity className="w-5 h-5 mr-2 text-gray-600" />
                    <span className="text-gray-700">Portfolio</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Live IPOs Tab */}
          {activeTab === 'live-ipos' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Live IPOs</h2>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search IPOs..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <select
                    value={selectedSector}
                    onChange={(e) => setSelectedSector(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {sectors.map(sector => (
                      <option key={sector} value={sector}>
                        {sector === 'all' ? 'All Sectors' : sector}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLiveIPOs.map((ipo) => (
                  <LiveIPOCard
                    key={ipo._id}
                    ipo={ipo}
                    onApply={handleApplyIPO}
                    onWatchlist={handleAddToWatchlist}
                    onView={handleViewDetails}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Upcoming IPOs Tab */}
          {activeTab === 'upcoming' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming IPOs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingIPOs.map((ipo) => (
                  <LiveIPOCard
                    key={ipo._id}
                    ipo={ipo}
                    onApply={handleApplyIPO}
                    onWatchlist={handleAddToWatchlist}
                    onView={handleViewDetails}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <AnalyticsDashboard />
          )}
        </div>
      </main>
    </div>
  );
};

export default InvestorDashboard;
