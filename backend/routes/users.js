const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Register (public) - force 'investor' role regardless of client input
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Basic validation
        if (!name || !email || !password) return res.status(400).json({ message: 'Missing required fields' });

        // Check if user exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists' });

        // Always create public registrations as 'investor'
        user = new User({
            name,
            email,
            password,
            role: 'investor'
        });

        await user.save();

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(201).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Admin-only create user (allows setting role)
const { authMiddleware, requireRole } = require('../middleware/auth');

router.post('/create', authMiddleware, requireRole('admin', 'manager'), async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password || !role) return res.status(400).json({ message: 'Missing required fields' });

        if (!['investor', 'admin', 'manager'].includes(role)) return res.status(400).json({ message: 'Invalid role' });

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists' });

        user = new User({ name, email, password, role });
        await user.save();

        res.status(201).json({ message: 'User created', user: { id: user._id, email: user.email, role: user.role } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });
        
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
        
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
        
        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get user profile
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update portfolio
router.put('/:id/portfolio', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { portfolio: req.body },
            { new: true }
        );
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Add to watchlist
router.post('/:id/watchlist/:ipoId', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user.watchlist.includes(req.params.ipoId)) {
            user.watchlist.push(req.params.ipoId);
            await user.save();
        }
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Subscribe to IPO
router.post('/:id/subscribe', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const subscription = {
            ipoId: req.body.ipoId,
            appliedAmount: req.body.appliedAmount,
            appliedDate: new Date(),
            status: 'pending'
        };
        user.subscriptions.push(subscription);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
