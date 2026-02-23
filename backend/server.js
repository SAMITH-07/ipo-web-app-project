const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Fallback for Windows PowerShell issues
if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = 'supersecretjwtkeyforipowebapp2024makeitlongandsecureenoughforproduction';
}

console.log('JWT_SECRET loaded:', process.env.JWT_SECRET ? '✅' : '❌');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
const mongoUri = 'mongodb://localhost:27017/ipo_db';
mongoose.connect(mongoUri)
    .then(() => {
        console.log('✅ MongoDB connected successfully');
        console.log('📊 Database: ipo_db');
    })
    .catch((err) => {
        console.error('❌ MongoDB connection error:', err.message);
        process.exit(1);
    });

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/ipos', require('./routes/ipos'));
app.use('/api/users', require('./routes/users'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/watchlist', require('./routes/watchlist'));

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'Backend API is running ✅', timestamp: new Date() });
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'IPO Web App Backend API',
        version: '1.0.0',
        endpoints: {
            health: '/api/health',
            ipos: '/api/ipos',
            users: '/api/users'
        }
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Endpoint not found' });
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 API base: http://localhost:${PORT}/api`);
    console.log(`💾 Database: MongoDB Atlas (ipo_db)`);
});
