import React from 'react';
import { IPO } from '../services/ipo';
import { Eye, Star, Clock, TrendingUp, TrendingDown, Calendar, DollarSign } from 'lucide-react';

interface LiveIPOCardProps {
  ipo: IPO;
  onApply: (ipoId: string) => void;
  onWatchlist: (ipoId: string) => void;
  onView: (ipoId: string) => void;
}

const LiveIPOCard: React.FC<LiveIPOCardProps> = ({ ipo, onApply, onWatchlist, onView }) => {
  const daysToClose = ipo.closeDate 
    ? Math.ceil((new Date(ipo.closeDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-800';
      case 'upcoming': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-red-100 text-red-800';
      case 'listed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSubscriptionColor = (subscription: number) => {
    if (subscription >= 10) return 'text-green-600 font-bold';
    if (subscription >= 5) return 'text-blue-600 font-semibold';
    if (subscription >= 2) return 'text-yellow-600';
    return 'text-gray-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Header */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
              {ipo.company}
            </h3>
            <p className="text-sm text-gray-500 font-medium">{ipo.symbol}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(ipo.status)}`}>
                {ipo.status.charAt(0).toUpperCase() + ipo.status.slice(1)}
              </span>
              <span className="text-xs text-gray-500">{ipo.sector}</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="text-right">
              <div className="text-xs text-gray-500">Views</div>
              <div className="text-sm font-semibold text-gray-700">{ipo.views || 0}</div>
            </div>
            <button
              onClick={() => onWatchlist(ipo._id)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title="Add to Watchlist"
            >
              <Star className="w-4 h-4 text-gray-400 hover:text-yellow-500" />
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs text-gray-500 mb-1">Price Band</div>
            <div className="text-lg font-bold text-gray-900">
              {ipo.priceBand ? `₹${ipo.priceBand.min} - ₹${ipo.priceBand.max}` : `₹${ipo.issuePrice}`}
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs text-gray-500 mb-1">Subscription</div>
            <div className={`text-lg font-bold ${getSubscriptionColor(ipo.totalSubscription || 0)}`}>
              {ipo.totalSubscription || 0}x
            </div>
          </div>
        </div>

        {/* Additional Details */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Lot Size:</span>
            <span className="font-medium">{ipo.lotSize} shares</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Min Investment:</span>
            <span className="font-medium">₹{ipo.minInvestment.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Issue Size:</span>
            <span className="font-medium">{ipo.issueSize || 'N/A'}</span>
          </div>
          {ipo.closeDate && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {daysToClose > 0 ? `${daysToClose} days left` : 'Closing today'}
              </span>
              <span className="font-medium text-red-600">
                {ipo.closeDate ? new Date(ipo.closeDate).toLocaleDateString() : 'TBD'}
              </span>
            </div>
          )}
        </div>

        {/* Subscription Breakdown */}
        {ipo.totalSubscription && ipo.totalSubscription > 0 && (
          <div className="bg-blue-50 rounded-lg p-3 mb-4">
            <div className="text-xs text-gray-600 mb-2">Subscription Status</div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="text-center">
                <div className="font-semibold text-blue-600">{ipo.qibSubscription || 0}x</div>
                <div className="text-gray-500">QIB</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-blue-600">{ipo.niiSubscription || 0}x</div>
                <div className="text-gray-500">NII</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-blue-600">{ipo.retailSubscription || 0}x</div>
                <div className="text-gray-500">Retail</div>
              </div>
            </div>
          </div>
        )}

        {/* Listed IPO Performance */}
        {ipo.status === 'listed' && ipo.currentPrice && (
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-xs text-gray-500">Listing Price</div>
                <div className="font-medium">₹{ipo.listingPrice}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500">Current Price</div>
                <div className="font-bold text-lg">₹{ipo.currentPrice}</div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-gray-500">Returns</span>
              <div className={`flex items-center text-sm font-bold ${
                (ipo.changePercent || 0) >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {(ipo.changePercent || 0) >= 0 ? (
                  <TrendingUp className="w-4 h-4 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 mr-1" />
                )}
                {(ipo.changePercent || 0) >= 0 ? '+' : ''}{ipo.changePercent?.toFixed(2)}%
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onView(ipo._id)}
            className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </button>
          {ipo.status === 'open' && (
            <button
              onClick={() => onApply(ipo._id)}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Apply Now
            </button>
          )}
          {ipo.status === 'upcoming' && (
            <button
              disabled
              className="flex-1 bg-gray-200 text-gray-500 px-4 py-2 rounded-lg text-sm font-medium"
            >
              Coming Soon
            </button>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-6 py-3 border-t">
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>Expected Return: {ipo.expectedReturn || 'N/A'}</span>
          <span>Risk Level: {ipo.riskLevel || 'Medium'}</span>
        </div>
      </div>
    </div>
  );
};

export default LiveIPOCard;
