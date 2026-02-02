const mongoose = require('mongoose');
const IPO = require('./models/IPO');
require('dotenv').config();

async function seedIPOs() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing IPOs
    await IPO.deleteMany({});
    console.log('Cleared existing IPOs');

    const sampleIPOs = [
      {
        company: 'TechCorp Solutions Ltd',
        symbol: 'TECHCORP',
        sector: 'Technology',
        status: 'open',
        description: 'Leading technology solutions provider specializing in AI and cloud computing services.',
        priceBand: { min: 850, max: 880 },
        issuePrice: 865,
        lotSize: 150,
        minInvestment: 129750,
        openDate: new Date('2024-02-01'),
        closeDate: new Date('2024-02-05'),
        issueSize: '₹850 Crore',
        issueType: 'Fresh Issue',
        totalShares: 10000000,
        sharesOffered: 9826000,
        peRatio: 25.5,
        eps: 33.92,
        marketCap: '₹4,250 Cr',
        qibSubscription: 2.5,
        niiSubscription: 3.2,
        retailSubscription: 4.8,
        totalSubscription: 3.5,
        promoterHolding: '72%',
        riskLevel: 'medium',
        expectedReturn: '15-20%',
        logo: 'https://example.com/logos/techcorp.png'
      },
      {
        company: 'HealthCare Plus Inc',
        symbol: 'HLTHCARE',
        sector: 'Healthcare',
        status: 'upcoming',
        description: 'Innovative healthcare company focused on pharmaceutical research and medical devices.',
        priceBand: { min: 420, max: 445 },
        lotSize: 300,
        minInvestment: 126000,
        openDate: new Date('2024-02-10'),
        closeDate: new Date('2024-02-14'),
        issueSize: '₹1,200 Crore',
        issueType: 'Offer for Sale',
        totalShares: 28000000,
        sharesOffered: 27000000,
        peRatio: 28.3,
        eps: 15.12,
        marketCap: '₹8,400 Cr',
        promoterHolding: '65%',
        riskLevel: 'low',
        expectedReturn: '12-18%',
        logo: 'https://example.com/logos/healthcare.png'
      },
      {
        company: 'Green Energy Systems',
        symbol: 'GREENEN',
        sector: 'Energy',
        status: 'open',
        description: 'Renewable energy company specializing in solar and wind power solutions.',
        priceBand: { min: 320, max: 340 },
        issuePrice: 330,
        lotSize: 400,
        minInvestment: 132000,
        openDate: new Date('2024-02-03'),
        closeDate: new Date('2024-02-07'),
        issueSize: '₹2,500 Crore',
        issueType: 'Fresh Issue',
        totalShares: 75000000,
        sharesOffered: 75750000,
        peRatio: 22.8,
        eps: 14.47,
        marketCap: '₹15,000 Cr',
        qibSubscription: 1.8,
        niiSubscription: 2.2,
        retailSubscription: 3.5,
        totalSubscription: 2.5,
        promoterHolding: '58%',
        riskLevel: 'high',
        expectedReturn: '20-25%',
        logo: 'https://example.com/logos/greenenergy.png'
      },
      {
        company: 'FinanceHub Technologies',
        symbol: 'FINTECH',
        sector: 'Finance',
        status: 'closed',
        description: 'Digital banking and financial technology platform for modern banking solutions.',
        priceBand: { min: 180, max: 190 },
        issuePrice: 185,
        listingPrice: 210,
        currentPrice: 225,
        change: 15,
        changePercent: 7.14,
        lotSize: 800,
        minInvestment: 148000,
        openDate: new Date('2024-01-25'),
        closeDate: new Date('2024-01-29'),
        listingDate: new Date('2024-02-08'),
        issueSize: '₹900 Crore',
        issueType: 'Both',
        totalShares: 50000000,
        sharesOffered: 48650000,
        peRatio: 18.5,
        eps: 10.27,
        marketCap: '₹4,500 Cr',
        qibSubscription: 4.2,
        niiSubscription: 5.8,
        retailSubscription: 8.5,
        totalSubscription: 6.2,
        promoterHolding: '55%',
        riskLevel: 'medium',
        expectedReturn: '8-12%',
        logo: 'https://example.com/logos/fintech.png'
      },
      {
        company: 'RetailMax India Ltd',
        symbol: 'RETAILMX',
        sector: 'Retail',
        status: 'listed',
        description: 'Leading retail chain with presence in major cities across India.',
        priceBand: { min: 280, max: 295 },
        issuePrice: 290,
        listingPrice: 310,
        currentPrice: 295,
        change: -15,
        changePercent: -4.84,
        lotSize: 500,
        minInvestment: 145000,
        openDate: new Date('2024-01-15'),
        closeDate: new Date('2024-01-19'),
        listingDate: new Date('2024-01-30'),
        issueSize: '₹1,800 Crore',
        issueType: 'Fresh Issue',
        totalShares: 62000000,
        sharesOffered: 62000000,
        peRatio: 35.2,
        eps: 8.24,
        marketCap: '₹12,400 Cr',
        qibSubscription: 3.8,
        niiSubscription: 4.5,
        retailSubscription: 6.2,
        totalSubscription: 4.8,
        promoterHolding: '70%',
        riskLevel: 'low',
        expectedReturn: '5-8%',
        logo: 'https://example.com/logos/retailmax.png'
      },
      {
        company: 'Manufacturing Pro Ltd',
        symbol: 'MANUFPRO',
        sector: 'Manufacturing',
        status: 'upcoming',
        description: 'Advanced manufacturing solutions for automotive and industrial sectors.',
        priceBand: { min: 150, max: 160 },
        lotSize: 1000,
        minInvestment: 150000,
        openDate: new Date('2024-02-15'),
        closeDate: new Date('2024-02-19'),
        issueSize: '₹3,200 Crore',
        issueType: 'Fresh Issue',
        totalShares: 200000000,
        sharesOffered: 200000000,
        peRatio: 20.5,
        eps: 7.32,
        marketCap: '₹16,000 Cr',
        promoterHolding: '68%',
        riskLevel: 'medium',
        expectedReturn: '10-15%',
        logo: 'https://example.com/logos/manufacturing.png'
      }
    ];

    const createdIPOs = await IPO.insertMany(sampleIPOs);
    console.log(`✅ Created ${createdIPOs.length} sample IPOs`);

    // Update some with current prices for listed IPOs
    const listedIPOs = await IPO.find({ status: 'listed' });
    for (const ipo of listedIPOs) {
      const randomMultiplier = 1 + (Math.random() * 0.2 - 0.1); // Random between 0.9 and 1.1
      const currentPrice = Math.round(ipo.issuePrice * randomMultiplier);
      const change = currentPrice - ipo.issuePrice;
      const changePercent = ((change / ipo.issuePrice) * 100).toFixed(2);
      
      await IPO.findByIdAndUpdate(ipo._id, {
        currentPrice,
        change,
        changePercent: parseFloat(changePercent)
      });
    }

    console.log('📊 Updated listed IPOs with current prices');

    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding IPOs:', error);
    process.exit(1);
  }
}

seedIPOs();
