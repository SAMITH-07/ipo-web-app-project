import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { LogOut, TrendingUp, Briefcase, DollarSign, Calendar, Star } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Briefcase className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">IPO Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
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

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Investment Overview</h2>
            <p className="mt-1 text-sm text-gray-600">
              Track your IPO investments and portfolio performance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3">
                  <DollarSign className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Investment</p>
                  <p className="text-2xl font-semibold text-gray-900">$25,000</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-100 rounded-lg p-3">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active IPOs</p>
                  <p className="text-2xl font-semibold text-gray-900">8</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-100 rounded-lg p-3">
                  <Briefcase className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Portfolio Value</p>
                  <p className="text-2xl font-semibold text-gray-900">$32,500</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-100 rounded-lg p-3">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Returns</p>
                  <p className="text-2xl font-semibold text-green-600">+30%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Recent IPOs</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="text-sm font-medium text-gray-900">TechCorp Industries</p>
                      <p className="text-xs text-gray-500">Technology Sector</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">$25.00</p>
                      <p className="text-xs text-green-600">+12.5%</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Healthcare Plus</p>
                      <p className="text-xs text-gray-500">Healthcare Sector</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">$18.50</p>
                      <p className="text-xs text-green-600">+8.2%</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Green Energy Solutions</p>
                      <p className="text-xs text-gray-500">Energy Sector</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">$42.00</p>
                      <p className="text-xs text-red-600">-2.1%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Upcoming IPOs</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="text-sm font-medium text-gray-900">FinTech Innovations</p>
                      <p className="text-xs text-gray-500">Financial Services</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">$15.00</p>
                      <p className="text-xs text-gray-500">Dec 15, 2024</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="text-sm font-medium text-gray-900">E-Commerce Giant</p>
                      <p className="text-xs text-gray-500">Retail</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">$28.00</p>
                      <p className="text-xs text-gray-500">Dec 18, 2024</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900">AI Robotics</p>
                      <p className="text-xs text-gray-500">Technology</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">$35.00</p>
                      <p className="text-xs text-gray-500">Dec 22, 2024</p>
                    </div>
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

export default Dashboard;
