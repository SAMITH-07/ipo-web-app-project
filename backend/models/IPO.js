const mongoose = require('mongoose');

const ipoSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true,
        trim: true
    },
    symbol: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    sector: {
        type: String,
        required: true,
        enum: ['Technology', 'Finance', 'Healthcare', 'Energy', 'IT Services', 'Agriculture', 'Manufacturing', 'Retail']
    },
    status: {
        type: String,
        enum: ['upcoming', 'open', 'closed', 'listed'],
        default: 'upcoming'
    },
    description: {
        type: String,
        required: true
    },
    
    // Pricing Information
    priceBand: {
        min: Number,
        max: Number
    },
    issuePrice: Number,
    listingPrice: Number,
    currentPrice: Number,
    change: Number,
    changePercent: Number,
    highPrice52w: Number,
    lowPrice52w: Number,
    
    // Dates
    openDate: Date,
    closeDate: Date,
    listingDate: Date,
    allotmentDate: Date,
    refundDate: Date,
    
    // Issue Details
    issueSize: String, // Total issue size in crores
    issueType: {
        type: String,
        enum: ['Fresh Issue', 'Offer for Sale', 'Both'],
        default: 'Fresh Issue'
    },
    faceValue: {
        type: Number,
        default: 10
    },
    
    // Market Information
    lotSize: {
        type: Number,
        required: true
    },
    minInvestment: {
        type: Number,
        required: true
    },
    totalShares: Number,
    sharesOffered: Number,
    
    // Financial Metrics
    peRatio: Number,
    eps: Number,
    roe: Number,
    debt: String,
    marketCap: String,
    
    // Subscription Details
    qibSubscription: {
        type: Number,
        default: 0
    },
    niiSubscription: {
        type: Number,
        default: 0
    },
    retailSubscription: {
        type: Number,
        default: 0
    },
    totalSubscription: {
        type: Number,
        default: 0
    },
    
    // Company Details
    promoterHolding: String,
    boardStrength: String,
    riskLevel: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    
    // Performance
    expectedReturn: String,
    dividend: String,
    
    // Media & News
    logo: String,
    brochure: String,
    news: [{
        title: String,
        content: String,
        date: Date,
        source: String
    }],
    
    // Analytics
    views: {
        type: Number,
        default: 0
    },
    watchlistCount: {
        type: Number,
        default: 0
    },
    
    // Timestamps
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('IPO', ipoSchema);
