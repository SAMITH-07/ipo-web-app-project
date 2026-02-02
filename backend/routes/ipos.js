const express = require('express');
const router = express.Router();
const ipoController = require('../controllers/ipoController');
const { authMiddleware, requireRole } = require('../middleware/auth');

// Public routes
router.get('/', ipoController.getAllIPOs);
router.get('/live', ipoController.getLiveIPOs);
router.get('/upcoming', ipoController.getUpcomingIPOs);
router.get('/listed', ipoController.getListedIPOs);
router.get('/stats', ipoController.getIPOStats);
router.get('/search/:query', async (req, res) => {
    try {
        const ipos = await IPO.find({
            $or: [
                { company: { $regex: req.params.query, $options: 'i' } },
                { symbol: { $regex: req.params.query, $options: 'i' } },
                { sector: { $regex: req.params.query, $options: 'i' } }
            ]
        });
        res.json(ipos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get('/sector/:sector', async (req, res) => {
    try {
        const ipos = await IPO.find({ sector: req.params.sector });
        res.json(ipos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single IPO by ID
router.get('/:id', ipoController.getIPOById);

// Protected routes (Admin/Manager only)
router.post('/', authMiddleware, requireRole('admin', 'manager'), ipoController.createIPO);
router.put('/:id', authMiddleware, requireRole('admin', 'manager'), ipoController.updateIPO);
router.delete('/:id', authMiddleware, requireRole('admin', 'manager'), ipoController.deleteIPO);
router.put('/:id/subscription', authMiddleware, requireRole('admin', 'manager'), ipoController.updateSubscription);

module.exports = router;
