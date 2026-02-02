import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { ipoService, IPO } from '../services/ipo';
import { 
  LogOut, 
  Plus, 
  Edit2, 
  Trash2, 
  Eye, 
  TrendingUp, 
  TrendingDown,
  Search,
  Filter,
  Download,
  Upload,
  Settings,
  BarChart3,
  Users,
  Calendar
} from 'lucide-react';

interface IPOStats {
  byStatus: Array<{
    _id: string;
    count: number;
    totalIssueSize: number;
  }>;
  totalIPOs: number;
  totalIssueSize: number;
}

const AdminIPOManagement = () => {
  const { user, logout } = useAuth();
  const [ipos, setIPOs] = useState<IPO[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedIPO, setSelectedIPO] = useState<IPO | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSector, setFilterSector] = useState('all');
  const [stats, setStats] = useState<IPOStats | null>(null);

  useEffect(() => {
    fetchIPOs();
    fetchStats();
  }, []);

  const fetchIPOs = async () => {
    try {
      setLoading(true);
      const response = await ipoService.getAllIPOs();
      setIPOs(response.ipos);
    } catch (error) {
      console.error('Failed to fetch IPOs:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const statsData = await ipoService.getIPOStats();
      setStats(statsData);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const handleLogout = () => {
    logout();
  };

  const handleAddIPO = () => {
    setSelectedIPO(null);
    setShowAddModal(true);
  };

  const handleEditIPO = (ipo: IPO) => {
    setSelectedIPO(ipo);
    setShowEditModal(true);
  };

  const handleDeleteIPO = async (ipoId: string) => {
    if (window.confirm('Are you sure you want to delete this IPO?')) {
      try {
        await ipoService.deleteIPO(ipoId);
        fetchIPOs();
        fetchStats();
      } catch (error) {
        console.error('Failed to delete IPO:', error);
        alert('Failed to delete IPO');
      }
    }
  };

  const handleSaveIPO = async (ipoData: Partial<IPO>) => {
    try {
      if (selectedIPO) {
        await ipoService.updateIPO(selectedIPO._id, ipoData);
      } else {
        await ipoService.createIPO(ipoData);
      }
      fetchIPOs();
      fetchStats();
      setShowAddModal(false);
      setShowEditModal(false);
    } catch (error) {
      console.error('Failed to save IPO:', error);
      alert('Failed to save IPO');
    }
  };

  const filteredIPOs = ipos.filter(ipo => {
    const matchesSearch = ipo.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ipo.symbol.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || ipo.status === filterStatus;
    const matchesSector = filterSector === 'all' || ipo.sector === filterSector;
    return matchesSearch && matchesStatus && matchesSector;
  });

  const sectors = ['all', 'Technology', 'Finance', 'Healthcare', 'Energy', 'IT Services', 'Manufacturing', 'Retail'];
  const statuses = ['all', 'upcoming', 'open', 'closed', 'listed'];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Settings className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">IPO Admin Panel</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Welcome, {user?.name}
              </span>
              <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
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

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Statistics Overview */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">IPO Management Dashboard</h2>
            <p className="mt-1 text-sm text-gray-600">
              Manage and monitor all IPO listings
            </p>
          </div>

          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3">
                    <BarChart3 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total IPOs</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.totalIPOs}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-100 rounded-lg p-3">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Live IPOs</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {stats.byStatus.find((s: { _id: string; count: number }) => s._id === 'open')?.count || 0}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-yellow-100 rounded-lg p-3">
                    <Calendar className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Upcoming</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {stats.byStatus.find((s: { _id: string; count: number }) => s._id === 'upcoming')?.count || 0}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-purple-100 rounded-lg p-3">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Issue Size</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      ₹{(stats.totalIssueSize / 1000).toFixed(1)}K Cr
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Actions and Filters */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleAddIPO}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add IPO
              </button>
              
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
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>

              <select
                value={filterSector}
                onChange={(e) => setFilterSector(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {sectors.map(sector => (
                  <option key={sector} value={sector}>
                    {sector === 'all' ? 'All Sectors' : sector}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Download className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Upload className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          {/* IPOs Table */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Symbol
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sector
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price Band
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Open Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Close Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredIPOs.map((ipo) => (
                  <tr key={ipo._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-600">
                              {ipo.company.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{ipo.company}</div>
                          <div className="text-sm text-gray-500">{ipo.views || 0} views</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {ipo.symbol}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {ipo.sector}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        ipo.status === 'open' ? 'bg-green-100 text-green-800' :
                        ipo.status === 'upcoming' ? 'bg-yellow-100 text-yellow-800' :
                        ipo.status === 'closed' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {ipo.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {ipo.priceBand ? `₹${ipo.priceBand.min} - ₹${ipo.priceBand.max}` : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {ipo.openDate ? new Date(ipo.openDate).toLocaleDateString() : 'TBD'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {ipo.closeDate ? new Date(ipo.closeDate).toLocaleDateString() : 'TBD'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEditIPO(ipo)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteIPO(ipo._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Add/Edit Modal */}
      {(showAddModal || showEditModal) && (
        <IPOFormModal
          ipo={selectedIPO}
          isOpen={showAddModal || showEditModal}
          onClose={() => {
            setShowAddModal(false);
            setShowEditModal(false);
          }}
          onSave={handleSaveIPO}
        />
      )}
    </div>
  );
};

// IPO Form Modal Component
const IPOFormModal = ({ ipo, isOpen, onClose, onSave }: any) => {
  const [formData, setFormData] = useState({
    company: ipo?.company || '',
    symbol: ipo?.symbol || '',
    sector: ipo?.sector || 'Technology',
    status: ipo?.status || 'upcoming',
    description: ipo?.description || '',
    priceBand: {
      min: ipo?.priceBand?.min || '',
      max: ipo?.priceBand?.max || ''
    },
    issuePrice: ipo?.issuePrice || '',
    lotSize: ipo?.lotSize || '',
    minInvestment: ipo?.minInvestment || '',
    openDate: ipo?.openDate ? new Date(ipo.openDate).toISOString().split('T')[0] : '',
    closeDate: ipo?.closeDate ? new Date(ipo.closeDate).toISOString().split('T')[0] : '',
    issueSize: ipo?.issueSize || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-lg bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            {ipo ? 'Edit IPO' : 'Add New IPO'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Company Name</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Symbol</label>
              <input
                type="text"
                value={formData.symbol}
                onChange={(e) => setFormData({...formData, symbol: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Sector</label>
              <select
                value={formData.sector}
                onChange={(e) => setFormData({...formData, sector: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Technology">Technology</option>
                <option value="Finance">Finance</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Energy">Energy</option>
                <option value="IT Services">IT Services</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Retail">Retail</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="upcoming">Upcoming</option>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
                <option value="listed">Listed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={3}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Price Band (Min)</label>
              <input
                type="number"
                value={formData.priceBand.min}
                onChange={(e) => setFormData({...formData, priceBand: {...formData.priceBand, min: e.target.value}})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price Band (Max)</label>
              <input
                type="number"
                value={formData.priceBand.max}
                onChange={(e) => setFormData({...formData, priceBand: {...formData.priceBand, max: e.target.value}})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Lot Size</label>
              <input
                type="number"
                value={formData.lotSize}
                onChange={(e) => setFormData({...formData, lotSize: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Min Investment</label>
              <input
                type="number"
                value={formData.minInvestment}
                onChange={(e) => setFormData({...formData, minInvestment: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Open Date</label>
              <input
                type="date"
                value={formData.openDate}
                onChange={(e) => setFormData({...formData, openDate: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Close Date</label>
              <input
                type="date"
                value={formData.closeDate}
                onChange={(e) => setFormData({...formData, closeDate: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              {ipo ? 'Update' : 'Create'} IPO
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminIPOManagement;
