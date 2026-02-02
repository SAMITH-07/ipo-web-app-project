import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Briefcase, 
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Zap,
  Shield
} from 'lucide-react';

interface AnalyticsData {
  totalInvestment: number;
  totalReturns: number;
  totalIPOs: number;
  activeIPOs: number;
  successRate: number;
  averageReturn: number;
  sectorPerformance: Array<{
    sector: string;
    investment: number;
    returns: number;
    ipoCount: number;
  }>;
  monthlyPerformance: Array<{
    month: string;
    investment: number;
    returns: number;
  }>;
  topPerformers: Array<{
    company: string;
    symbol: string;
    returns: number;
    investment: number;
  }>;
}

interface AnalyticsDashboardProps {
  data?: AnalyticsData;
  isLoading?: boolean;
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ data, isLoading }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('1M');
  const [animatedValues, setAnimatedValues] = useState({
    totalInvestment: 0,
    totalReturns: 0,
    successRate: 0
  });

  useEffect(() => {
    if (data) {
      // Animate values on mount
      const duration = 1000;
      const steps = 20;
      const stepDuration = duration / steps;
      
      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setAnimatedValues({
          totalInvestment: Math.floor(data.totalInvestment * progress),
          totalReturns: Math.floor(data.totalReturns * progress),
          successRate: Math.floor(data.successRate * progress)
        });
        
        if (currentStep >= steps) {
          clearInterval(interval);
        }
      }, stepDuration);
      
      return () => clearInterval(interval);
    }
  }, [data]);

  const mockData: AnalyticsData = {
    totalInvestment: 2500000,
    totalReturns: 325000,
    totalIPOs: 15,
    activeIPOs: 3,
    successRate: 87,
    averageReturn: 13.5,
    sectorPerformance: [
      { sector: 'Technology', investment: 850000, returns: 145000, ipoCount: 4 },
      { sector: 'Healthcare', investment: 620000, returns: 89000, ipoCount: 3 },
      { sector: 'Energy', investment: 480000, returns: 62000, ipoCount: 2 },
      { sector: 'Finance', investment: 350000, returns: 29000, ipoCount: 3 },
      { sector: 'Retail', investment: 200000, returns: 18000, ipoCount: 2 },
      { sector: 'Manufacturing', investment: 150000, returns: 12000, ipoCount: 1 }
    ],
    monthlyPerformance: [
      { month: 'Jan', investment: 450000, returns: 58000 },
      { month: 'Feb', investment: 620000, returns: 85000 },
      { month: 'Mar', investment: 380000, returns: 42000 },
      { month: 'Apr', investment: 550000, returns: 78000 },
      { month: 'May', investment: 500000, returns: 62000 }
    ],
    topPerformers: [
      { company: 'Reliance Retail', symbol: 'RETAIL', returns: 28.5, investment: 142050 },
      { company: 'Tata Digital', symbol: 'TATADIGI', returns: 22.3, investment: 126500 },
      { company: 'Adani Green', symbol: 'ADANIGRN', returns: 18.7, investment: 127200 },
      { company: 'HDFC Securities', symbol: 'HDFCSEC', returns: 15.2, investment: 126500 }
    ]
  };

  const analyticsData = data || mockData;
  const returnPercentage = analyticsData.totalInvestment > 0 
    ? (analyticsData.totalReturns / analyticsData.totalInvestment * 100).toFixed(2)
    : '0.00';

  const MetricCard = ({ 
    title, 
    value, 
    icon, 
    change, 
    color = 'blue',
    isLoading = false 
  }: {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    change?: number;
    color?: string;
    isLoading?: boolean;
  }) => {
    const colorClasses: { [key: string]: string } = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      yellow: 'bg-yellow-100 text-yellow-600'
    };

    if (isLoading) {
      return (
        <div className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
            {icon}
          </div>
          {change !== undefined && (
            <div className={`flex items-center text-sm font-medium ${
              change >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {change >= 0 ? (
                <TrendingUp className="w-4 h-4 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 mr-1" />
              )}
              {change >= 0 ? '+' : ''}{change}%
            </div>
          )}
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Investment"
          value={`₹${animatedValues.totalInvestment.toLocaleString()}`}
          icon={<DollarSign className="w-6 h-6" />}
          color="blue"
        />
        <MetricCard
          title="Total Returns"
          value={`₹${animatedValues.totalReturns.toLocaleString()}`}
          icon={<TrendingUp className="w-6 h-6" />}
          change={parseFloat(returnPercentage)}
          color="green"
        />
        <MetricCard
          title="Active IPOs"
          value={analyticsData.activeIPOs}
          icon={<Briefcase className="w-6 h-6" />}
          change={12.5}
          color="purple"
        />
        <MetricCard
          title="Success Rate"
          value={`${animatedValues.successRate}%`}
          icon={<Target className="w-6 h-6" />}
          change={5.2}
          color="yellow"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sector Performance */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Sector Performance</h3>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {analyticsData.sectorPerformance.map((sector, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">{sector.sector}</span>
                    <span className="text-sm text-gray-500">{sector.ipoCount} IPOs</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(sector.investment / analyticsData.totalInvestment) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="ml-4 text-right">
                  <div className="text-sm font-semibold text-gray-900">₹{(sector.investment / 1000).toFixed(0)}K</div>
                  <div className="text-xs text-green-600">₹{(sector.returns / 1000).toFixed(0)}K</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Performance */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Monthly Performance</h3>
            <Activity className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {analyticsData.monthlyPerformance.map((month, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 w-12">{month.month}</span>
                <div className="flex-1 mx-4">
                  <div className="flex items-center">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(month.investment / 620000) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${(month.returns / 85000) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="text-right text-sm">
                  <div className="text-gray-600">₹{(month.investment / 1000).toFixed(0)}K</div>
                  <div className="text-green-600">₹{(month.returns / 1000).toFixed(0)}K</div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center mt-4 space-x-4 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-600 rounded-full mr-1"></div>
              <span className="text-gray-600">Investment</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-600 rounded-full mr-1"></div>
              <span className="text-gray-600">Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Performers */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Top Performing IPOs</h3>
          <Zap className="w-5 h-5 text-yellow-500" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Company</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Symbol</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Returns</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Investment</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Value</th>
              </tr>
            </thead>
            <tbody>
              {analyticsData.topPerformers.map((performer, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="font-medium text-gray-900">{performer.company}</div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-sm font-medium text-gray-600">{performer.symbol}</span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-green-600 font-semibold">+{performer.returns}%</span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-gray-600">₹{performer.investment.toLocaleString()}</span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="font-semibold text-gray-900">
                      ₹{Math.round(performer.investment * (1 + performer.returns / 100)).toLocaleString()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
