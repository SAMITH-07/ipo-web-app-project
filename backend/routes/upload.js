const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { authMiddleware, requireRole } = require('../middleware/auth');
const path = require('path');

// Upload company logo
router.post('/logo', authMiddleware, requireRole('admin'), upload.single('logo'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const logoUrl = `/uploads/logos/${req.file.filename}`;
    res.json({
      message: 'Logo uploaded successfully',
      logoUrl: logoUrl,
      filename: req.file.filename
    });
  } catch (error) {
    console.error('Logo upload error:', error);
    res.status(500).json({ message: 'Failed to upload logo' });
  }
});

// Upload PDF document (RHP/DRHP)
router.post('/document', authMiddleware, requireRole('admin'), upload.single('document'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const documentUrl = `/uploads/documents/${req.file.filename}`;
    res.json({
      message: 'Document uploaded successfully',
      documentUrl: documentUrl,
      filename: req.file.filename
    });
  } catch (error) {
    console.error('Document upload error:', error);
    res.status(500).json({ message: 'Failed to upload document' });
  }
});

// Serve uploaded files
router.get('/uploads/:type/:filename', (req, res) => {
  const { type, filename } = req.params;
  const filePath = path.join(__dirname, '../uploads', type, filename);
  
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('File serving error:', err);
      res.status(404).json({ message: 'File not found' });
    }
  });
});

module.exports = router;
