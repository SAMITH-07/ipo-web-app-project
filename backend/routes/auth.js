const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authMiddleware, requireRole } = require('../middleware/auth');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/google', authController.googleSignIn);
router.get('/profile', authMiddleware, authController.getProfile);
router.get('/verify', authMiddleware, authController.verifyToken);

module.exports = router;
