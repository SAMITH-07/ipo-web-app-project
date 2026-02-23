import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WatchlistButton = ({ ipoId, onWatchlistChange }) => {
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    checkWatchlistStatus();
  }, [ipoId]);

  const checkWatchlistStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await axios.get(`http://localhost:5000/api/watchlist/${ipoId}/check`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setIsInWatchlist(response.data.isInWatchlist);
      if (response.data.watchlistItem) {
        setNotes(response.data.watchlistItem.notes || '');
      }
    } catch (error) {
      console.error('Error checking watchlist status:', error);
    }
  };

  const handleAddToWatchlist = async (e) => {
    e.stopPropagation();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to add to watchlist');
        return;
      }

      await axios.post('http://localhost:5000/api/watchlist', {
        ipoId,
        notes
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setIsInWatchlist(true);
      setShowNotesModal(false);
      if (onWatchlistChange) onWatchlistChange(true);
    } catch (error) {
      console.error('Error adding to watchlist:', error);
      alert('Failed to add to watchlist');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromWatchlist = async (e) => {
    e.stopPropagation();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      await axios.delete(`http://localhost:5000/api/watchlist/${ipoId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setIsInWatchlist(false);
      setNotes('');
      if (onWatchlistChange) onWatchlistChange(false);
    } catch (error) {
      console.error('Error removing from watchlist:', error);
      alert('Failed to remove from watchlist');
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (e) => {
    e.stopPropagation();
    if (!isInWatchlist) {
      setShowNotesModal(true);
    } else {
      handleRemoveFromWatchlist(e);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        disabled={loading}
        className={`p-2 rounded-lg transition-colors ${
          isInWatchlist
            ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        } disabled:opacity-50`}
        title={isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
      >
        {loading ? (
          <span className="text-sm">...</span>
        ) : (
          <span className="text-lg">
            {isInWatchlist ? '⭐' : '☆'}
          </span>
        )}
      </button>

      {/* Notes Modal */}
      {showNotesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Add to Watchlist</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes (optional)..."
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="3"
            />
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => {
                  setShowNotesModal(false);
                  setNotes('');
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleAddToWatchlist}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Adding...' : 'Add to Watchlist'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WatchlistButton;
