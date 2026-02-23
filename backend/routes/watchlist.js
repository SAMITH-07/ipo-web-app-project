const express = require('express');
const router = express.Router();
const watchlistController = require('../controllers/watchlistController');
const { authMiddleware } = require('../middleware/auth');

// All watchlist routes require authentication
router.use(authMiddleware);

// Get user's watchlist
router.get('/', watchlistController.getWatchlist);

// Add IPO to watchlist
router.post('/', watchlistController.addToWatchlist);

// Remove IPO from watchlist
router.delete('/:ipoId', watchlistController.removeFromWatchlist);

// Update watchlist notes
router.put('/:ipoId/notes', watchlistController.updateWatchlistNotes);

// Check if IPO is in watchlist
router.get('/:ipoId/check', watchlistController.checkWatchlist);

module.exports = router;
