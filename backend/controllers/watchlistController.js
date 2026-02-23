const Watchlist = require('../models/Watchlist');
const IPO = require('../models/IPO');

const watchlistController = {
    // Get user's watchlist
    async getWatchlist(req, res) {
        try {
            const watchlist = await Watchlist.find({ user: req.user.id })
                .populate('ipo')
                .sort({ addedAt: -1 });
            
            res.json(watchlist);
        } catch (error) {
            console.error('Get watchlist error:', error);
            res.status(500).json({ message: 'Failed to fetch watchlist' });
        }
    },

    // Add IPO to watchlist
    async addToWatchlist(req, res) {
        try {
            const { ipoId, notes } = req.body;

            // Check if IPO exists
            const ipo = await IPO.findById(ipoId);
            if (!ipo) {
                return res.status(404).json({ message: 'IPO not found' });
            }

            // Check if already in watchlist
            const existing = await Watchlist.findOne({ 
                user: req.user.id, 
                ipo: ipoId 
            });
            
            if (existing) {
                return res.status(400).json({ message: 'IPO already in watchlist' });
            }

            // Add to watchlist
            const watchlistItem = new Watchlist({
                user: req.user.id,
                ipo: ipoId,
                notes: notes || ''
            });

            await watchlistItem.save();
            await watchlistItem.populate('ipo');

            res.status(201).json({
                message: 'Added to watchlist',
                watchlistItem
            });
        } catch (error) {
            console.error('Add to watchlist error:', error);
            res.status(500).json({ message: 'Failed to add to watchlist' });
        }
    },

    // Remove from watchlist
    async removeFromWatchlist(req, res) {
        try {
            const { ipoId } = req.params;

            const result = await Watchlist.findOneAndDelete({
                user: req.user.id,
                ipo: ipoId
            });

            if (!result) {
                return res.status(404).json({ message: 'Watchlist item not found' });
            }

            res.json({ message: 'Removed from watchlist' });
        } catch (error) {
            console.error('Remove from watchlist error:', error);
            res.status(500).json({ message: 'Failed to remove from watchlist' });
        }
    },

    // Update watchlist notes
    async updateWatchlistNotes(req, res) {
        try {
            const { ipoId } = req.params;
            const { notes } = req.body;

            const watchlistItem = await Watchlist.findOneAndUpdate(
                { user: req.user.id, ipo: ipoId },
                { notes },
                { new: true }
            ).populate('ipo');

            if (!watchlistItem) {
                return res.status(404).json({ message: 'Watchlist item not found' });
            }

            res.json({
                message: 'Notes updated',
                watchlistItem
            });
        } catch (error) {
            console.error('Update watchlist notes error:', error);
            res.status(500).json({ message: 'Failed to update notes' });
        }
    },

    // Check if IPO is in watchlist
    async checkWatchlist(req, res) {
        try {
            const { ipoId } = req.params;

            const watchlistItem = await Watchlist.findOne({
                user: req.user.id,
                ipo: ipoId
            });

            res.json({ 
                isInWatchlist: !!watchlistItem,
                watchlistItem 
            });
        } catch (error) {
            console.error('Check watchlist error:', error);
            res.status(500).json({ message: 'Failed to check watchlist' });
        }
    }
};

module.exports = watchlistController;
