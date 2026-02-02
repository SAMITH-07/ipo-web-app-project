const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const authController = {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = generateToken(user._id, user.role);
      
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
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const user = new User({
        name,
        email,
        password,
        role: 'investor'
      });

      await user.save();

      const token = generateToken(user._id, user.role);

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
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async googleSignIn(req, res) {
    try {
      const { token } = req.body;
      
      if (!token) {
        return res.status(400).json({ message: 'Google ID token is required' });
      }

      // For demo purposes, we'll decode the token without verification
      // In production, you would verify the Google ID token using Google's libraries
      // const { OAuth2Client } = require('google-auth-library');
      // const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
      // const ticket = await client.verifyIdToken({
      //   idToken: token,
      //   audience: process.env.GOOGLE_CLIENT_ID,
      // });
      // const payload = ticket.getPayload();

      // Mock Google user data (in production, get from verified token)
      const googleUser = {
        email: 'googleuser@gmail.com', // payload.email
        name: 'Google User', // payload.name
        googleId: 'google-user-id', // payload.sub
        picture: 'https://lh3.googleusercontent.com/a/default-user' // payload.picture
      };

      let user = await User.findOne({ email: googleUser.email });
      
      if (!user) {
        user = new User({
          name: googleUser.name,
          email: googleUser.email,
          password: 'google-oauth-' + Date.now(), // Random password for OAuth users
          role: 'investor',
          googleId: googleUser.googleId,
          picture: googleUser.picture
        });
        await user.save();
      } else if (!user.googleId) {
        // Link existing account to Google
        user.googleId = googleUser.googleId;
        if (googleUser.picture) user.picture = googleUser.picture;
        await user.save();
      }

      const jwtToken = generateToken(user._id, user.role);
      
      res.json({
        token: jwtToken,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          picture: user.picture
        }
      });
    } catch (error) {
      console.error('Google sign-in error:', error);
      res.status(500).json({ message: 'Google sign-in failed' });
    }
  },

  async getProfile(req, res) {
    try {
      const user = await User.findById(req.user.id).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      });
    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async verifyToken(req, res) {
    try {
      const user = await User.findById(req.user.id).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({
        valid: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      console.error('Token verification error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = authController;
