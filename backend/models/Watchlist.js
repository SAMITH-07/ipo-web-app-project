const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    ipo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'IPO',
        required: true
    },
    addedAt: {
        type: Date,
        default: Date.now
    },
    notes: {
        type: String,
        maxlength: 500
    }
});

// Compound index to ensure user can't add same IPO twice
watchlistSchema.index({ user: 1, ipo: 1 }, { unique: true });

module.exports = mongoose.model('Watchlist', watchlistSchema);
