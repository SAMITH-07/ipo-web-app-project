const mongoose = require('mongoose');
const IPO = require('./models/IPO');
const User = require('./models/User');
require('dotenv').config({ path: './backend/.env' });

const seedIPOs = [
    // Existing IPOs
    {
        company: 'TechNova Solutions',
        symbol: 'TNOVA',
        sector: 'Technology',
        status: 'open',
        description: 'Leading provider of AI-driven enterprise software solutions.',
        listingDate: new Date('2024-01-15'),
        openDate: new Date('2024-01-10'),
        closeDate: new Date('2024-01-14'),
        listingPrice: 45.00,
        currentPrice: 52.30,
        change: 7.30,
        changePercent: 16.22,
        highPrice52w: 55.00,
        lowPrice52w: 42.00,
        volume: '2.5M',
        marketCap: '1.2B',
        minInvestment: 1000,
        peRatio: 28.5,
        dividend: '2.5%',
        expectedReturn: '15-20%',
        boardStrength: 'Strong',
        promoterHolding: '65%',
        riskLevel: 'medium',
        news: ['TechNova announces Q4 earnings beat expectations', 'Partnership with major cloud provider'],
        subscriptions: 1250
    },
    {
        company: 'GreenEnergy Corp',
        symbol: 'GREN',
        sector: 'Energy',
        status: 'upcoming',
        description: 'Renewable energy company specializing in solar and wind power.',
        listingDate: new Date('2024-03-01'),
        openDate: new Date('2024-02-25'),
        closeDate: new Date('2024-02-28'),
        listingPrice: 38.00,
        currentPrice: null,
        change: null,
        changePercent: null,
        highPrice52w: null,
        lowPrice52w: null,
        volume: null,
        marketCap: '850M',
        minInvestment: 500,
        peRatio: null,
        dividend: '3.2%',
        expectedReturn: '12-18%',
        boardStrength: 'Excellent',
        promoterHolding: '70%',
        riskLevel: 'low',
        news: ['GreenEnergy secures major government contract', 'Expansion into European markets'],
        subscriptions: 890
    },
    {
        company: 'MediCare Innovations',
        symbol: 'MEDI',
        sector: 'Healthcare',
        status: 'closed',
        description: 'Biotech company developing breakthrough treatments for chronic diseases.',
        listingDate: new Date('2023-11-20'),
        openDate: new Date('2023-11-15'),
        closeDate: new Date('2023-11-19'),
        listingPrice: 55.00,
        currentPrice: 48.75,
        change: -6.25,
        changePercent: -11.36,
        highPrice52w: 58.50,
        lowPrice52w: 45.20,
        volume: '1.8M',
        marketCap: '950M',
        minInvestment: 2000,
        peRatio: 32.1,
        dividend: '1.8%',
        expectedReturn: '10-15%',
        boardStrength: 'Strong',
        promoterHolding: '60%',
        riskLevel: 'medium',
        news: ['FDA approval for new drug candidate', 'Clinical trials show promising results'],
        subscriptions: 2100
    },
    {
        company: 'FinTech Global',
        symbol: 'FTGL',
        sector: 'Finance',
        status: 'open',
        description: 'Digital banking platform revolutionizing financial services.',
        listingDate: new Date('2024-02-01'),
        openDate: new Date('2024-01-28'),
        closeDate: new Date('2024-01-31'),
        listingPrice: 42.00,
        currentPrice: 47.80,
        change: 5.80,
        changePercent: 13.81,
        highPrice52w: 50.00,
        lowPrice52w: 40.50,
        volume: '3.2M',
        marketCap: '1.8B',
        minInvestment: 1500,
        peRatio: 25.8,
        dividend: '2.1%',
        expectedReturn: '18-25%',
        boardStrength: 'Excellent',
        promoterHolding: '55%',
        riskLevel: 'medium',
        news: ['FinTech Global acquires competitor', 'Mobile app reaches 5M downloads'],
        subscriptions: 1750
    },
    {
        company: 'CloudServices Pro',
        symbol: 'CSPRO',
        sector: 'IT Services',
        status: 'upcoming',
        description: 'Cloud infrastructure and managed services provider.',
        listingDate: new Date('2024-04-15'),
        openDate: new Date('2024-04-10'),
        closeDate: new Date('2024-04-14'),
        listingPrice: 35.00,
        currentPrice: null,
        change: null,
        changePercent: null,
        highPrice52w: null,
        lowPrice52w: null,
        volume: null,
        marketCap: '650M',
        minInvestment: 750,
        peRatio: null,
        dividend: '2.8%',
        expectedReturn: '14-20%',
        boardStrength: 'Strong',
        promoterHolding: '68%',
        riskLevel: 'low',
        news: ['CloudServices Pro wins AWS partnership', 'Data center expansion completed'],
        subscriptions: 650
    },
    {
        company: 'BioPharm Labs',
        symbol: 'BIOL',
        sector: 'Healthcare',
        status: 'open',
        description: 'Pharmaceutical research company focused on oncology treatments.',
        listingDate: new Date('2023-12-10'),
        openDate: new Date('2023-12-05'),
        closeDate: new Date('2023-12-09'),
        listingPrice: 48.00,
        currentPrice: 53.40,
        change: 5.40,
        changePercent: 11.25,
        highPrice52w: 56.00,
        lowPrice52w: 46.80,
        volume: '950K',
        marketCap: '1.1B',
        minInvestment: 1000,
        peRatio: 29.7,
        dividend: '1.5%',
        expectedReturn: '12-16%',
        boardStrength: 'Strong',
        promoterHolding: '62%',
        riskLevel: 'medium',
        news: ['BioPharm Labs receives patent approval', 'Phase 3 trials initiated'],
        subscriptions: 1400
    },
    {
        company: 'Quantum Computing Inc',
        symbol: 'QCOMP',
        sector: 'Technology',
        status: 'upcoming',
        description: 'Pioneer in quantum computing hardware and software solutions.',
        listingDate: new Date('2024-05-20'),
        openDate: new Date('2024-05-15'),
        closeDate: new Date('2024-05-19'),
        listingPrice: 65.00,
        currentPrice: null,
        change: null,
        changePercent: null,
        highPrice52w: null,
        lowPrice52w: null,
        volume: null,
        marketCap: '2.1B',
        minInvestment: 2500,
        peRatio: null,
        dividend: '0.5%',
        expectedReturn: '20-30%',
        boardStrength: 'Excellent',
        promoterHolding: '58%',
        riskLevel: 'high',
        news: ['Quantum breakthrough announced', 'Government research grant awarded'],
        subscriptions: 3200
    },
    {
        company: 'RetailTech Solutions',
        symbol: 'RTLS',
        sector: 'IT Services',
        status: 'closed',
        description: 'E-commerce platform and retail technology solutions provider.',
        listingDate: new Date('2023-10-25'),
        openDate: new Date('2023-10-20'),
        closeDate: new Date('2023-10-24'),
        listingPrice: 40.00,
        currentPrice: 37.20,
        change: -2.80,
        changePercent: -7.00,
        highPrice52w: 42.50,
        lowPrice52w: 35.00,
        volume: '1.3M',
        marketCap: '780M',
        minInvestment: 800,
        peRatio: 24.3,
        dividend: '2.2%',
        expectedReturn: '8-12%',
        boardStrength: 'Good',
        promoterHolding: '72%',
        riskLevel: 'low',
        news: ['RetailTech Solutions acquires logistics startup', 'Q3 revenue growth of 25%'],
        subscriptions: 980
    },
    {
        company: 'DataTech Systems',
        symbol: 'DATA',
        sector: 'IT Services',
        status: 'open',
        description: 'Big data analytics and BI solutions for enterprise clients',
        listingDate: new Date('2025-01-20'),
        listingPrice: 180,
        currentPrice: 198,
        change: 18,
        changePercent: 10,
        highPrice52w: 210,
        lowPrice52w: 160,
        volume: '3.2M',
        marketCap: '₹9,800 Cr',
        minInvestment: 8000,
        peRatio: 28.5,
        dividend: '1.5%',
        boardStrength: 'Strong',
        promoterHolding: '58%',
        riskLevel: 'medium',
        news: [],
        subscriptions: 0
    },
    {
        company: 'HealthPlus Pharma',
        symbol: 'HPLUS',
        sector: 'Healthcare',
        status: 'upcoming',
        description: 'Pharmaceutical and healthcare products manufacturer with global reach',
        openDate: new Date('2025-02-10'),
        closeDate: new Date('2025-02-15'),
        marketCap: '₹7,500 Cr',
        minInvestment: 11000,
        expectedReturn: '18-22%',
        boardStrength: 'Strong',
        promoterHolding: '75%',
        riskLevel: 'low',
        news: [],
        subscriptions: 0
    },
    {
        company: 'SolarTech Innovations',
        symbol: 'SOLAR',
        sector: 'Energy',
        status: 'open',
        description: 'Next-gen solar panel manufacturing and installation services.',
        listingDate: new Date('2025-03-05'),
        openDate: new Date('2025-02-28'),
        closeDate: new Date('2025-03-03'),
        listingPrice: 120.00,
        currentPrice: 135.50,
        change: 15.50,
        changePercent: 12.92,
        highPrice52w: 140.00,
        lowPrice52w: 110.00,
        volume: '1.5M',
        marketCap: '₹3,200 Cr',
        minInvestment: 12000,
        peRatio: 22.4,
        dividend: '1.8%',
        expectedReturn: '15-20%',
        boardStrength: 'Good',
        promoterHolding: '60%',
        riskLevel: 'medium',
        news: ['SolarTech wins government contract', 'Expansion into residential market'],
        subscriptions: 450
    },
    {
        company: 'CyberGuard Security',
        symbol: 'CYBER',
        sector: 'Technology',
        status: 'upcoming',
        description: 'Cybersecurity solutions for enterprise and government clients.',
        listingDate: new Date('2025-04-10'),
        openDate: new Date('2025-04-01'),
        closeDate: new Date('2025-04-05'),
        listingPrice: 250.00,
        currentPrice: null,
        change: null,
        changePercent: null,
        highPrice52w: null,
        lowPrice52w: null,
        volume: null,
        marketCap: '₹5,800 Cr',
        minInvestment: 15000,
        peRatio: null,
        dividend: '0.5%',
        expectedReturn: '25-30%',
        boardStrength: 'Excellent',
        promoterHolding: '55%',
        riskLevel: 'high',
        news: ['CyberGuard launches AI-driven threat detection', 'Partnership with major bank'],
        subscriptions: 1200
    },
    {
        company: 'AgriGrow Solutions',
        symbol: 'AGRI',
        sector: 'Agriculture',
        status: 'closed',
        description: 'Sustainable agriculture technology and organic farming products.',
        listingDate: new Date('2024-12-15'),
        openDate: new Date('2024-12-10'),
        closeDate: new Date('2024-12-13'),
        listingPrice: 85.00,
        currentPrice: 92.40,
        change: 7.40,
        changePercent: 8.71,
        highPrice52w: 95.00,
        lowPrice52w: 80.00,
        volume: '800K',
        marketCap: '₹1,500 Cr',
        minInvestment: 8500,
        peRatio: 18.5,
        dividend: '2.5%',
        expectedReturn: '10-15%',
        boardStrength: 'Strong',
        promoterHolding: '70%',
        riskLevel: 'low',
        news: ['AgriGrow reports record harvest yields', 'New organic certification received'],
        subscriptions: 600
    }
];

const seedUsers = [
    {
        name: 'Admin Manager',
        email: 'admin@company.com',
        password: 'admin@123',
        role: 'manager',
        portfolio: {
            totalInvested: 500000,
            currentValue: 580000,
            holdings: []
        },
        watchlist: [],
        subscriptions: []
    },
    {
        name: 'John Investor',
        email: 'john@investor.com',
        password: 'john@123',
        role: 'investor',
        portfolio: {
            totalInvested: 250000,
            currentValue: 285000,
            holdings: []
        },
        watchlist: [],
        subscriptions: []
    },
    {
        name: 'Priya Sharma',
        email: 'priya@investor.com',
        password: 'priya@123',
        role: 'investor',
        portfolio: {
            totalInvested: 150000,
            currentValue: 168000,
            holdings: []
        },
        watchlist: [],
        subscriptions: []
    },
    {
        name: 'Rajesh Patel',
        email: 'rajesh@investor.com',
        password: 'rajesh@123',
        role: 'investor',
        portfolio: {
            totalInvested: 320000,
            currentValue: 345000,
            holdings: []
        },
        watchlist: [],
        subscriptions: []
    },
    {
        name: 'Ananya Gupta',
        email: 'ananya@investor.com',
        password: 'ananya@123',
        role: 'investor',
        portfolio: {
            totalInvested: 100000,
            currentValue: 112000,
            holdings: []
        },
        watchlist: [],
        subscriptions: []
    },
    {
        name: 'Rohit Palodhi',
        email: 'rohitpalodhi14@gmail.com',
        password: '1234',
        role: 'admin',
        portfolio: {
            totalInvested: 0,
            currentValue: 0,
            holdings: []
        },
        watchlist: [],
        subscriptions: []
    }
];

async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        await IPO.deleteMany({});
        await User.deleteMany({});
        console.log('🗑️  Cleared existing IPO and User data');

        // Insert IPO data
        const insertedIPOs = await IPO.insertMany(seedIPOs);
        console.log(`✅ Successfully inserted ${insertedIPOs.length} IPOs`);

        // Insert User data
        const insertedUsers = await User.insertMany(seedUsers);
        console.log(`✅ Successfully inserted ${insertedUsers.length} Users`);

        console.log('\n📊 Seeded IPOs:');
        insertedIPOs.forEach(ipo => {
            console.log(`  - ${ipo.company} (${ipo.symbol}) - ${ipo.status}`);
        });

        console.log('\n👥 Seeded Users:');
        insertedUsers.forEach(user => {
            console.log(`  - ${user.name} (${user.email}) - ${user.role}`);
        });

        await mongoose.connection.close();
        console.log('\n✅ Database seeding completed successfully!');
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
