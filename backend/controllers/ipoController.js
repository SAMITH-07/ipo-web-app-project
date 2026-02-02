const IPO = require('../models/IPO');

const ipoController = {
  // Get all IPOs with filtering
  async getAllIPOs(req, res) {
    try {
      const { status, sector, sort, page = 1, limit = 10 } = req.query;
      
      let query = {};
      if (status) query.status = status;
      if (sector) query.sector = sector;
      
      let sortOptions = {};
      if (sort === 'latest') {
        sortOptions = { createdAt: -1 };
      } else if (sort === 'price-high') {
        sortOptions = { issuePrice: -1 };
      } else if (sort === 'price-low') {
        sortOptions = { issuePrice: 1 };
      } else {
        sortOptions = { openDate: 1 };
      }
      
      const ipos = await IPO.find(query)
        .sort(sortOptions)
        .limit(limit * 1)
        .skip((page - 1) * limit);
      
      const total = await IPO.countDocuments(query);
      
      res.json({
        ipos,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      console.error('Get IPOs error:', error);
      res.status(500).json({ message: 'Failed to fetch IPOs' });
    }
  },

  // Get single IPO by ID
  async getIPOById(req, res) {
    try {
      const ipo = await IPO.findById(req.params.id);
      if (!ipo) {
        return res.status(404).json({ message: 'IPO not found' });
      }
      
      // Increment views
      ipo.views += 1;
      await ipo.save();
      
      res.json(ipo);
    } catch (error) {
      console.error('Get IPO error:', error);
      res.status(500).json({ message: 'Failed to fetch IPO' });
    }
  },

  // Create new IPO (Admin only)
  async createIPO(req, res) {
    try {
      const ipoData = req.body;
      
      // Check if symbol already exists
      const existingIPO = await IPO.findOne({ symbol: ipoData.symbol });
      if (existingIPO) {
        return res.status(400).json({ message: 'IPO with this symbol already exists' });
      }
      
      const ipo = new IPO(ipoData);
      await ipo.save();
      
      res.status(201).json({
        message: 'IPO created successfully',
        ipo
      });
    } catch (error) {
      console.error('Create IPO error:', error);
      res.status(500).json({ message: 'Failed to create IPO' });
    }
  },

  // Update IPO (Admin only)
  async updateIPO(req, res) {
    try {
      const ipo = await IPO.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      
      if (!ipo) {
        return res.status(404).json({ message: 'IPO not found' });
      }
      
      res.json({
        message: 'IPO updated successfully',
        ipo
      });
    } catch (error) {
      console.error('Update IPO error:', error);
      res.status(500).json({ message: 'Failed to update IPO' });
    }
  },

  // Delete IPO (Admin only)
  async deleteIPO(req, res) {
    try {
      const ipo = await IPO.findByIdAndDelete(req.params.id);
      
      if (!ipo) {
        return res.status(404).json({ message: 'IPO not found' });
      }
      
      res.json({
        message: 'IPO deleted successfully',
        ipo
      });
    } catch (error) {
      console.error('Delete IPO error:', error);
      res.status(500).json({ message: 'Failed to delete IPO' });
    }
  },

  // Get live IPOs (currently open)
  async getLiveIPOs(req, res) {
    try {
      const liveIPOs = await IPO.find({ 
        status: 'open',
        openDate: { $lte: new Date() },
        closeDate: { $gte: new Date() }
      }).sort({ closeDate: 1 });
      
      res.json(liveIPOs);
    } catch (error) {
      console.error('Get live IPOs error:', error);
      res.status(500).json({ message: 'Failed to fetch live IPOs' });
    }
  },

  // Get upcoming IPOs
  async getUpcomingIPOs(req, res) {
    try {
      const upcomingIPOs = await IPO.find({ 
        status: 'upcoming',
        openDate: { $gt: new Date() }
      }).sort({ openDate: 1 });
      
      res.json(upcomingIPOs);
    } catch (error) {
      console.error('Get upcoming IPOs error:', error);
      res.status(500).json({ message: 'Failed to fetch upcoming IPOs' });
    }
  },

  // Get listed IPOs (past IPOs with listing data)
  async getListedIPOs(req, res) {
    try {
      const listedIPOs = await IPO.find({ 
        status: 'listed',
        listingDate: { $lte: new Date() }
      }).sort({ listingDate: -1 });
      
      res.json(listedIPOs);
    } catch (error) {
      console.error('Get listed IPOs error:', error);
      res.status(500).json({ message: 'Failed to fetch listed IPOs' });
    }
  },

  // Update subscription data (Admin only)
  async updateSubscription(req, res) {
    try {
      const { qibSubscription, niiSubscription, retailSubscription } = req.body;
      
      const ipo = await IPO.findByIdAndUpdate(
        req.params.id,
        {
          qibSubscription,
          niiSubscription,
          retailSubscription,
          totalSubscription: qibSubscription + niiSubscription + retailSubscription
        },
        { new: true }
      );
      
      if (!ipo) {
        return res.status(404).json({ message: 'IPO not found' });
      }
      
      res.json({
        message: 'Subscription data updated successfully',
        ipo
      });
    } catch (error) {
      console.error('Update subscription error:', error);
      res.status(500).json({ message: 'Failed to update subscription data' });
    }
  },

  // Get IPO statistics
  async getIPOStats(req, res) {
    try {
      const stats = await IPO.aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 },
            totalIssueSize: { $sum: { $toDouble: '$issueSize' } }
          }
        }
      ]);
      
      const totalIPOs = await IPO.countDocuments();
      const totalIssueSize = await IPO.aggregate([
        { $group: { _id: null, total: { $sum: { $toDouble: '$issueSize' } } } }
      ]);
      
      res.json({
        byStatus: stats,
        totalIPOs,
        totalIssueSize: totalIssueSize[0]?.total || 0
      });
    } catch (error) {
      console.error('Get IPO stats error:', error);
      res.status(500).json({ message: 'Failed to fetch IPO statistics' });
    }
  }
};

module.exports = ipoController;
