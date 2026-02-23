import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const AdminDashboard = () => {
  const [ipos, setIpos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingIPO, setEditingIPO] = useState(null);
  const [formData, setFormData] = useState({
    company: '',
    symbol: '',
    sector: '',
    status: 'upcoming',
    description: '',
    priceBand: { min: '', max: '' },
    issuePrice: '',
    openDate: '',
    closeDate: '',
    lotSize: '',
    minInvestment: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchIPOs();
  }, []);

  const fetchIPOs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/ipos', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const iposData = response.data.ipos || response.data;
      setIpos(Array.isArray(iposData) ? iposData : []);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching IPOs:', err);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const data = { ...formData };
      
      // Convert numeric fields
      if (data.priceBand.min) data.priceBand.min = parseFloat(data.priceBand.min);
      if (data.priceBand.max) data.priceBand.max = parseFloat(data.priceBand.max);
      if (data.issuePrice) data.issuePrice = parseFloat(data.issuePrice);
      if (data.lotSize) data.lotSize = parseInt(data.lotSize);
      if (data.minInvestment) data.minInvestment = parseFloat(data.minInvestment);

      if (editingIPO) {
        await axios.put(`http://localhost:5000/api/ipos/${editingIPO._id}`, data, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('http://localhost:5000/api/ipos', data, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      resetForm();
      fetchIPOs();
    } catch (err) {
      console.error('Error saving IPO:', err);
    }
  };

  const handleEdit = (ipo) => {
    setEditingIPO(ipo);
    setFormData({
      company: ipo.company,
      symbol: ipo.symbol,
      sector: ipo.sector,
      status: ipo.status,
      description: ipo.description,
      priceBand: ipo.priceBand || { min: '', max: '' },
      issuePrice: ipo.issuePrice || '',
      openDate: ipo.openDate ? new Date(ipo.openDate).toISOString().split('T')[0] : '',
      closeDate: ipo.closeDate ? new Date(ipo.closeDate).toISOString().split('T')[0] : '',
      lotSize: ipo.lotSize || '',
      minInvestment: ipo.minInvestment || ''
    });
    setShowAddForm(true);
  };

  const handleDelete = async (ipoId) => {
    if (window.confirm('Are you sure you want to delete this IPO?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/ipos/${ipoId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchIPOs();
      } catch (err) {
        console.error('Error deleting IPO:', err);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      company: '',
      symbol: '',
      sector: '',
      status: 'upcoming',
      description: '',
      priceBand: { min: '', max: '' },
      issuePrice: '',
      openDate: '',
      closeDate: '',
      lotSize: '',
      minInvestment: ''
    });
    setEditingIPO(null);
    setShowAddForm(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-xl font-semibold">Loading admin dashboard...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navbar />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">IPO Management</h2>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Add New IPO
            </button>
          </div>

          {/* Add/Edit Form */}
          {showAddForm && (
            <div className="bg-white shadow rounded-lg mb-6 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {editingIPO ? 'Edit IPO' : 'Add New IPO'}
                </h3>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Company Name</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Symbol</label>
                    <input
                      type="text"
                      name="symbol"
                      value={formData.symbol}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Sector</label>
                    <select
                      name="sector"
                      value={formData.sector}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    >
                      <option value="">Select Sector</option>
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
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    >
                      <option value="upcoming">Upcoming</option>
                      <option value="open">Open</option>
                      <option value="closed">Closed</option>
                      <option value="listed">Listed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Price Band Min</label>
                    <input
                      type="number"
                      name="priceBand.min"
                      value={formData.priceBand.min}
                      onChange={handleChange}
                      step="0.01"
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Price Band Max</label>
                    <input
                      type="number"
                      name="priceBand.max"
                      value={formData.priceBand.max}
                      onChange={handleChange}
                      step="0.01"
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Issue Price</label>
                    <input
                      type="number"
                      name="issuePrice"
                      value={formData.issuePrice}
                      onChange={handleChange}
                      step="0.01"
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Lot Size</label>
                    <input
                      type="number"
                      name="lotSize"
                      value={formData.lotSize}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Open Date</label>
                    <input
                      type="date"
                      name="openDate"
                      value={formData.openDate}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Close Date</label>
                    <input
                      type="date"
                      name="closeDate"
                      value={formData.closeDate}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="3"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    {editingIPO ? 'Update IPO' : 'Add IPO'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* IPOs List */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">All IPOs</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sector</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price Range</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {ipos.map((ipo) => (
                      <tr key={ipo._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ipo.company}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ipo.symbol}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ipo.sector}</td>
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ₹{ipo.priceBand?.min || 'N/A'} - ₹{ipo.priceBand?.max || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleEdit(ipo)}
                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(ipo._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
