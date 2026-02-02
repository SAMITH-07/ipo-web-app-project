const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function createTestUser() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB Atlas');

    // Create test admin user
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin'
    });

    await adminUser.save();
    console.log('✅ Test admin user created:');
    console.log('   Email: admin@example.com');
    console.log('   Password: admin123');
    console.log('   Role: admin');

    // Create test investor user
    const investorUser = new User({
      name: 'John Investor',
      email: 'investor@example.com',
      password: 'investor123',
      role: 'investor'
    });

    await investorUser.save();
    console.log('✅ Test investor user created:');
    console.log('   Email: investor@example.com');
    console.log('   Password: investor123');
    console.log('   Role: investor');

    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error creating test users:', error);
    process.exit(1);
  }
}

createTestUser();
