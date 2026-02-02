const mongoose = require('mongoose');
const IPO = require('./models/IPO');
require('dotenv').config();

async function seedEnhancedIPOs() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing IPOs
    await IPO.deleteMany({});
    console.log('Cleared existing IPOs');

    const enhancedIPOs = [
      {
        company: 'Reliance Retail Ltd',
        symbol: 'RETAIL',
        sector: 'Retail',
        status: 'open',
        description: 'India\'s largest retail chain with over 15,000 stores across 6,700 cities. Leading in food and grocery retail with digital integration.',
        priceBand: { min: 945, max: 950 },
        issuePrice: 947,
        lotSize: 150,
        minInvestment: 142050,
        openDate: new Date('2024-02-01'),
        closeDate: new Date('2024-02-06'),
        issueSize: '₹25,000 Crore',
        issueType: 'Offer for Sale',
        totalShares: 263500000,
        sharesOffered: 263500000,
        peRatio: 28.5,
        eps: 33.24,
        marketCap: '₹12,500 Cr',
        qibSubscription: 4.2,
        niiSubscription: 6.8,
        retailSubscription: 12.5,
        totalSubscription: 7.8,
        promoterHolding: '75%',
        riskLevel: 'low',
        expectedReturn: '15-20%',
        logo: 'https://example.com/logos/reliance-retail.png',
        views: 15420,
        watchlistCount: 892
      },
      {
        company: 'Tata Digital Services',
        symbol: 'TATADIGI',
        sector: 'Technology',
        status: 'open',
        description: 'Digital transformation arm of Tata Group, offering cloud computing, AI solutions, and digital infrastructure services.',
        priceBand: { min: 1250, max: 1280 },
        issuePrice: 1265,
        lotSize: 100,
        minInvestment: 126500,
        openDate: new Date('2024-02-02'),
        closeDate: new Date('2024-02-07'),
        issueSize: '₹18,000 Crore',
        issueType: 'Fresh Issue',
        totalShares: 142000000,
        sharesOffered: 142000000,
        peRatio: 35.8,
        eps: 35.34,
        marketCap: '₹22,500 Cr',
        qibSubscription: 3.8,
        niiSubscription: 5.2,
        retailSubscription: 9.8,
        totalSubscription: 6.3,
        promoterHolding: '68%',
        riskLevel: 'medium',
        expectedReturn: '20-25%',
        logo: 'https://example.com/logos/tata-digital.png',
        views: 12350,
        watchlistCount: 756
      },
      {
        company: 'Mahindra Electric Mobility',
        symbol: 'MAHELEC',
        sector: 'Energy',
        status: 'upcoming',
        description: 'Leading electric vehicle manufacturer focusing on commercial and passenger EVs with advanced battery technology.',
        priceBand: { min: 880, max: 895 },
        lotSize: 175,
        minInvestment: 156625,
        openDate: new Date('2024-02-10'),
        closeDate: new Date('2024-02-14'),
        issueSize: '₹3,500 Crore',
        issueType: 'Fresh Issue',
        totalShares: 40000000,
        sharesOffered: 39100000,
        peRatio: 42.3,
        eps: 20.85,
        marketCap: '₹8,750 Cr',
        promoterHolding: '62%',
        riskLevel: 'high',
        expectedReturn: '25-30%',
        logo: 'https://example.com/logos/mahindra-electric.png',
        views: 8900,
        watchlistCount: 423
      },
      {
        company: 'HDFC Securities',
        symbol: 'HDFCSEC',
        sector: 'Finance',
        status: 'closed',
        description: 'Leading stock brokerage and financial services company with over 5 million active clients.',
        priceBand: { min: 1250, max: 1280 },
        issuePrice: 1265,
        listingPrice: 1420,
        currentPrice: 1485,
        change: 65,
        changePercent: 4.58,
        lotSize: 100,
        minInvestment: 126500,
        openDate: new Date('2024-01-20'),
        closeDate: new Date('2024-01-24'),
        listingDate: new Date('2024-02-01'),
        issueSize: '₹8,000 Crore',
        issueType: 'Both',
        totalShares: 63000000,
        sharesOffered: 63200000,
        peRatio: 28.9,
        eps: 43.77,
        marketCap: '₹22,500 Cr',
        qibSubscription: 5.2,
        niiSubscription: 7.8,
        retailSubscription: 15.6,
        totalSubscription: 9.5,
        promoterHolding: '58%',
        riskLevel: 'low',
        expectedReturn: '8-12%',
        logo: 'https://example.com/logos/hdfc-securities.png',
        views: 18760,
        watchlistCount: 1234
      },
      {
        company: 'Biocon Pharmaceuticals',
        symbol: 'BIOCON',
        sector: 'Healthcare',
        status: 'listed',
        description: 'Biopharmaceutical company specializing in diabetes, oncology, and autoimmune disease treatments.',
        priceBand: { min: 425, max: 435 },
        issuePrice: 430,
        listingPrice: 465,
        currentPrice: 448,
        change: -17,
        changePercent: -3.66,
        lotSize: 300,
        minInvestment: 129000,
        openDate: new Date('2024-01-10'),
        closeDate: new Date('2024-01-14'),
        listingDate: new Date('2024-01-25'),
        issueSize: '₹2,500 Crore',
        issueType: 'Fresh Issue',
        totalShares: 58000000,
        sharesOffered: 58100000,
        peRatio: 32.5,
        eps: 13.23,
        marketCap: '₹11,600 Cr',
        qibSubscription: 3.5,
        niiSubscription: 4.8,
        retailSubscription: 8.2,
        totalSubscription: 5.5,
        promoterHolding: '55%',
        riskLevel: 'medium',
        expectedReturn: '5-8%',
        logo: 'https://example.com/logos/biocon.png',
        views: 9450,
        watchlistCount: 567
      },
      {
        company: 'Adani Green Energy',
        symbol: 'ADANIGRN',
        sector: 'Energy',
        status: 'listed',
        description: 'Renewable energy company with focus on solar and wind power generation across India.',
        priceBand: { min: 210, max: 215 },
        issuePrice: 212,
        listingPrice: 245,
        currentPrice: 268,
        change: 23,
        changePercent: 9.39,
        lotSize: 600,
        minInvestment: 127200,
        openDate: new Date('2024-01-05'),
        closeDate: new Date('2024-01-09'),
        listingDate: new Date('2024-01-20'),
        issueSize: '₹15,000 Crore',
        issueType: 'Fresh Issue',
        totalShares: 700000000,
        sharesOffered: 707000000,
        peRatio: 45.8,
        eps: 4.63,
        marketCap: '₹35,000 Cr',
        qibSubscription: 2.8,
        niiSubscription: 3.5,
        retailSubscription: 6.8,
        totalSubscription: 4.4,
        promoterHolding: '65%',
        riskLevel: 'high',
        expectedReturn: '10-15%',
        logo: 'https://example.com/logos/adani-green.png',
        views: 22100,
        watchlistCount: 1567
      },
      {
        company: 'Zomato Platform Ltd',
        symbol: 'ZOMATO',
        sector: 'IT Services',
        status: 'listed',
        description: 'Food delivery and restaurant discovery platform with presence in over 500 cities.',
        priceBand: { min: 72, max: 76 },
        issuePrice: 74,
        listingPrice: 115,
        currentPrice: 98,
        change: -17,
        changePercent: -14.78,
        lotSize: 1300,
        minInvestment: 96200,
        openDate: new Date('2023-12-20'),
        closeDate: new Date('2023-12-23'),
        listingDate: new Date('2024-01-05'),
        issueSize: '₹9,000 Crore',
        issueType: 'Fresh Issue',
        totalShares: 1200000000,
        sharesOffered: 1215000000,
        peRatio: -85.5,
        eps: -0.87,
        marketCap: '₹24,500 Cr',
        qibSubscription: 6.8,
        niiSubscription: 9.2,
        retailSubscription: 18.5,
        totalSubscription: 11.5,
        promoterHolding: '52%',
        riskLevel: 'high',
        expectedReturn: '-5 to 5%',
        logo: 'https://example.com/logos/zomato.png',
        views: 31200,
        watchlistCount: 2345
      },
      {
        company: 'Paytm Payments Bank',
        symbol: 'PAYTMPB',
        sector: 'Finance',
        status: 'upcoming',
        description: 'Digital payments and banking services platform with over 300 million registered users.',
        priceBand: { min: 1850, max: 1900 },
        lotSize: 75,
        minInvestment: 138750,
        openDate: new Date('2024-02-15'),
        closeDate: new Date('2024-02-19'),
        issueSize: '₹8,500 Crore',
        issueType: 'Offer for Sale',
        totalShares: 45000000,
        sharesOffered: 44700000,
        peRatio: 28.5,
        eps: 65.79,
        marketCap: '₹21,250 Cr',
        promoterHolding: '48%',
        riskLevel: 'medium',
        expectedReturn: '12-18%',
        logo: 'https://example.com/logos/paytm.png',
        views: 28900,
        watchlistCount: 1987
      },
      {
        company: 'Nykaa Fashion',
        symbol: 'NYKAAFASH',
        sector: 'Retail',
        status: 'upcoming',
        description: 'Online fashion and beauty retailer with over 2000 brands and 5 million active customers.',
        priceBand: { min: 1125, max: 1150 },
        lotSize: 130,
        minInvestment: 146250,
        openDate: new Date('2024-02-20'),
        closeDate: new Date('2024-02-24'),
        issueSize: '₹5,500 Crore',
        issueType: 'Fresh Issue',
        totalShares: 48000000,
        sharesOffered: 47800000,
        peRatio: 38.5,
        eps: 29.61,
        marketCap: '₹13,750 Cr',
        promoterHolding: '55%',
        riskLevel: 'medium',
        expectedReturn: '15-20%',
        logo: 'https://example.com/logos/nykaa.png',
        views: 15600,
        watchlistCount: 876
      },
      {
        company: 'Airtel Digital TV',
        symbol: 'AIRTELTV',
        sector: 'Technology',
        status: 'upcoming',
        description: 'Direct-to-home satellite television service with over 16 million subscribers.',
        priceBand: { min: 535, max: 545 },
        lotSize: 275,
        minInvestment: 147125,
        openDate: new Date('2024-02-25'),
        closeDate: new Date('2024-03-01'),
        issueSize: '₹12,000 Crore',
        issueType: 'Both',
        totalShares: 220000000,
        sharesOffered: 220000000,
        peRatio: 22.5,
        eps: 23.78,
        marketCap: '₹30,000 Cr',
        promoterHolding: '70%',
        riskLevel: 'low',
        expectedReturn: '10-15%',
        logo: 'https://example.com/logos/airtel.png',
        views: 11200,
        watchlistCount: 654
      }
    ];

    const createdIPOs = await IPO.insertMany(enhancedIPOs);
    console.log(`✅ Created ${createdIPOs.length} enhanced sample IPOs`);

    // Update listed IPOs with realistic current prices
    const listedIPOs = await IPO.find({ status: 'listed' });
    for (const ipo of listedIPOs) {
      const randomMultiplier = 0.85 + Math.random() * 0.3; // Random between 0.85 and 1.15
      const currentPrice = Math.round(ipo.listingPrice * randomMultiplier);
      const change = currentPrice - ipo.listingPrice;
      const changePercent = ((change / ipo.listingPrice) * 100).toFixed(2);
      
      await IPO.findByIdAndUpdate(ipo._id, {
        currentPrice,
        change,
        changePercent: parseFloat(changePercent)
      });
    }

    console.log('📊 Updated listed IPOs with realistic current prices');

    // Create indexes for better performance
    await IPO.createIndexes([
      { symbol: 1 },
      { status: 1 },
      { sector: 1 },
      { openDate: 1 },
      { closeDate: 1 },
      { 'priceBand.min': 1 },
      { 'priceBand.max': 1 }
    ]);

    console.log('🔍 Created database indexes for optimal performance');

    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding enhanced IPOs:', error);
    process.exit(1);
  }
}

seedEnhancedIPOs();
